import { prisma } from '../config/prisma.js';
import { errors } from '../utils/errors.js';
import { canTransition, toBackendStatus, type BackendStatus, type CanonicalRole } from '../types/domain.js';
import { toReportDto, toHotspotDto } from '../utils/mappers.js';
import { aiService } from '../ai/aiService.js';
import { cellCenter, dominantSeverity, estimatePopulation, gridKey } from './clusteringService.js';
import { realtime } from '../sockets/index.js';
import type { CreateReportInput } from '../validators/schemas.js';
import type { Severity } from '../types/domain.js';
import { logger } from '../utils/logger.js';

function resolveLocation(input: CreateReportInput) {
  if (input.location) {
    return {
      latitude: input.location.lat,
      longitude: input.location.lng,
      address: input.location.address,
      district: input.location.district ?? 'Unknown',
    };
  }
  return {
    latitude: input.latitude ?? 28.6139,
    longitude: input.longitude ?? 77.209,
    address: input.address ?? 'Unknown',
    district: input.district ?? 'Unknown',
  };
}

async function writeAudit(data: {
  action: string;
  actorName: string;
  actorId?: string;
  details: string;
  type: 'system' | 'user' | 'ai';
  reportId?: string;
  recommendationId?: string;
  predictionId?: string;
}) {
  await prisma.auditEvent.create({ data });
}

async function notify(userId: string, type: string, title: string, message: string, reportId?: string) {
  await prisma.notification.create({ data: { userId, type, title, message, reportId } });
}

async function upsertHotspot(report: {
  id: string;
  category: string;
  latitude: number;
  longitude: number;
  address: string;
  district: string;
  severity: Severity | null;
}) {
  const key = gridKey(report.category, report.latitude, report.longitude);
  const center = cellCenter(report.latitude, report.longitude);
  const existing = await prisma.hotspot.findUnique({
    where: { gridKey: key },
    include: { reports: { select: { id: true, severity: true, createdAt: true } } },
  });

  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const priorCount = existing?.reports.length ?? 0;
  const recent = (existing?.reports ?? []).filter((r) => r.createdAt.getTime() >= weekAgo).length;
  const trendPercentage = priorCount === 0 ? 100 : Math.round((recent / Math.max(priorCount, 1)) * 100);
  const severities = [
    ...(existing?.reports.map((r) => r.severity).filter(Boolean) as Severity[]),
    ...(report.severity ? [report.severity] : []),
  ];
  const severity = dominantSeverity(severities.length ? severities : ['MEDIUM']);
  const reportCount = priorCount + (existing?.reports.some((r) => r.id === report.id) ? 0 : 1);

  const hotspot = await prisma.hotspot.upsert({
    where: { gridKey: key },
    create: {
      category: report.category,
      address: report.address,
      district: report.district,
      latitude: center.latitude,
      longitude: center.longitude,
      gridKey: key,
      reportCount,
      trendPercentage,
      severity,
      populationAffected: estimatePopulation(reportCount),
    },
    update: {
      reportCount,
      trendPercentage,
      severity,
      populationAffected: estimatePopulation(reportCount),
    },
  });

  await prisma.citizenReport.update({ where: { id: report.id }, data: { hotspotId: hotspot.id } });
  realtime.hotspotUpdated(toHotspotDto(hotspot));
  return hotspot;
}

export const reportService = {
  async create(userId: string, input: CreateReportInput, imageFileIds: string[] = []) {
    const loc = resolveLocation(input);
    const title = input.title?.trim() || input.description.slice(0, 80);
    const report = await prisma.citizenReport.create({
      data: {
        userId,
        title,
        description: input.description,
        category: input.category,
        address: loc.address,
        district: loc.district,
        latitude: loc.latitude,
        longitude: loc.longitude,
        status: 'analyzing',
        audioUrl: input.audioUrl,
        images: imageFileIds.length
          ? {
              create: await Promise.all(
                imageFileIds.map(async (fileId) => {
                  const file = await prisma.storedFile.findUnique({ where: { id: fileId } });
                  if (!file) throw errors.validation('Invalid report data', { images: 'Unknown image id' });
                  return { fileId, mimeType: file.mimeType, size: file.size };
                }),
              ),
            }
          : undefined,
      },
      include: { images: true },
    });

    await writeAudit({
      action: 'Report Submitted',
      actorName: 'Citizen',
      actorId: userId,
      details: `Submitted report ${report.id}`,
      type: 'user',
      reportId: report.id,
    });
    await notify(userId, 'report_submitted', 'Report submitted', 'Your civic report was received and is being analyzed.', report.id);
    realtime.reportCreated({ id: report.id, status: 'Analyzing' }, userId);

    try {
      const analysis = await aiService.analyzeCitizenReport({
        description: input.description,
        category: input.category,
        location: loc.address,
        imageCount: imageFileIds.length,
      });
      const updated = await prisma.citizenReport.update({
        where: { id: report.id },
        data: {
          status: 'verified',
          severity: analysis.severity,
          urgency: analysis.urgency,
          aiSummary: analysis.summary,
          aiCategory: analysis.category,
          aiConfidence: analysis.confidence,
          aiReasoning: analysis.reasoning,
          recommendedAction: analysis.recommendedAction,
          aiMode: analysis.mode,
          aiFailed: analysis.summary.includes('unavailable'),
        },
        include: { images: true },
      });
      await writeAudit({
        action: 'AI Analysis Complete',
        actorName: analysis.mode === 'real' ? 'CivicOS AI' : 'CivicOS Demo AI',
        details: `${report.id} classified as ${analysis.severity} ${analysis.category}`,
        type: 'ai',
        reportId: report.id,
      });
      await notify(userId, 'report_analyzed', 'Report analyzed', 'Decision-support analysis is ready for review.', report.id);
      await upsertHotspot({
        id: updated.id,
        category: updated.category,
        latitude: updated.latitude,
        longitude: updated.longitude,
        address: updated.address,
        district: updated.district,
        severity: updated.severity,
      });
      const dto = toReportDto(updated);
      realtime.reportAnalyzed(dto, userId);
      return dto;
    } catch (err) {
      logger.error({ err, reportId: report.id }, 'ai analysis failed');
      const fallback = await prisma.citizenReport.update({
        where: { id: report.id },
        data: {
          status: 'submitted',
          aiFailed: true,
          aiMode: 'demo',
          aiSummary: 'Analysis could not be completed. The original report was saved.',
          severity: 'MEDIUM',
          urgency: 'MEDIUM',
          aiConfidence: 0,
        },
        include: { images: true },
      });
      await writeAudit({
        action: 'AI Analysis Failed',
        actorName: 'System',
        details: `Analysis failed for ${report.id}; report retained`,
        type: 'system',
        reportId: report.id,
      });
      return toReportDto(fallback);
    }
  },

  async list(actor: { id: string; role: CanonicalRole }, query: Record<string, string | undefined>) {
    const where: Record<string, unknown> = {};
    if (actor.role === 'citizen') where.userId = actor.id;
    if (query.category) where.category = query.category;
    if (query.severity) where.severity = query.severity;
    if (query.district) where.district = query.district;
    if (query.status) {
      const backend = toBackendStatus(query.status);
      if (backend) where.status = backend;
    }
    if (query.from || query.to) {
      where.createdAt = {
        ...(query.from ? { gte: new Date(query.from) } : {}),
        ...(query.to ? { lte: new Date(query.to) } : {}),
      };
    }
    const reports = await prisma.citizenReport.findMany({
      where,
      include: { images: true },
      orderBy: { createdAt: 'desc' },
    });
    return reports.map(toReportDto);
  },

  async getById(actor: { id: string; role: CanonicalRole }, id: string) {
    const report = await prisma.citizenReport.findUnique({ where: { id }, include: { images: true } });
    if (!report) throw errors.notFound('Report not found');
    if (actor.role === 'citizen' && report.userId !== actor.id) throw errors.forbidden();
    return toReportDto(report);
  },

  async update(actor: { id: string; role: CanonicalRole }, id: string, body: { status?: string; title?: string; description?: string }) {
    const report = await prisma.citizenReport.findUnique({ where: { id } });
    if (!report) throw errors.notFound('Report not found');

    if (actor.role === 'citizen') {
      if (report.userId !== actor.id) throw errors.forbidden();
      if (body.status) throw errors.forbidden('Citizens cannot change report status');
      const updated = await prisma.citizenReport.update({
        where: { id },
        data: { title: body.title, description: body.description },
        include: { images: true },
      });
      return toReportDto(updated);
    }

    const data: { status?: BackendStatus } = {};
    if (body.status) {
      const next = toBackendStatus(body.status);
      if (!next) throw errors.validation('Invalid report data', { status: 'Unknown status' });
      if (!canTransition(report.status as BackendStatus, next)) {
        throw errors.validation('Invalid report data', { status: `Cannot transition from ${report.status} to ${next}` });
      }
      data.status = next;
    }
    const updated = await prisma.citizenReport.update({ where: { id }, data, include: { images: true } });
    if (data.status) {
      await writeAudit({
        action: 'Report Status Changed',
        actorName: actor.role,
        actorId: actor.id,
        details: `${id} status changed from ${report.status} to ${data.status}`,
        type: 'user',
        reportId: id,
      });
      await notify(report.userId, 'report_status_changed', 'Report status updated', `Your report is now ${data.status}.`, id);
      realtime.reportStatusUpdated(toReportDto(updated), report.userId);
    }
    return toReportDto(updated);
  },

  async remove(actor: { id: string; role: CanonicalRole }, id: string) {
    const report = await prisma.citizenReport.findUnique({ where: { id } });
    if (!report) throw errors.notFound('Report not found');
    if (actor.role === 'citizen' && report.userId !== actor.id) throw errors.forbidden();
    if (actor.role === 'government' && actor.role !== 'admin') {
      // government may not delete; admin and owner can
      if (actor.role !== 'admin') throw errors.forbidden();
    }
    if (actor.role === 'government') throw errors.forbidden();
    await prisma.citizenReport.delete({ where: { id } });
    return { deleted: true };
  },
};
