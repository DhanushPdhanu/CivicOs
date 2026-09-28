import { prisma } from '../config/prisma.js';
import { errors } from '../utils/errors.js';
import { toHotspotDto } from '../utils/mappers.js';
import { toBackendStatus } from '../types/domain.js';

export const hotspotService = {
  async list(query: Record<string, string | undefined>) {
    const where: Record<string, unknown> = {};
    if (query.category) where.category = query.category;
    if (query.severity) where.severity = query.severity;
    if (query.district) where.district = query.district;
    const hotspots = await prisma.hotspot.findMany({
      where,
      include: { reports: { select: { id: true, status: true, createdAt: true, severity: true } } },
      orderBy: { reportCount: 'desc' },
    });
    let filtered = hotspots;
    if (query.status) {
      const backend = toBackendStatus(query.status);
      if (backend) {
        filtered = hotspots.filter((h) => h.reports.some((r) => r.status === backend));
      }
    }
    if (query.from) {
      const from = new Date(query.from);
      filtered = filtered.filter((h) => h.reports.some((r) => r.createdAt >= from));
    }
    return filtered.map(toHotspotDto);
  },

  async getById(id: string) {
    const hotspot = await prisma.hotspot.findUnique({
      where: { id },
      include: { reports: { select: { id: true } } },
    });
    if (!hotspot) throw errors.notFound('Hotspot not found');
    return toHotspotDto(hotspot);
  },

  async mapReports(query: Record<string, string | undefined>) {
    const where: Record<string, unknown> = {};
    if (query.category) where.category = query.category;
    if (query.severity) where.severity = query.severity;
    if (query.district) where.district = query.district;
    const reports = await prisma.citizenReport.findMany({
      where,
      select: {
        id: true,
        category: true,
        status: true,
        severity: true,
        latitude: true,
        longitude: true,
        address: true,
        district: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 500,
    });
    return reports.map((r) => ({
      id: r.id,
      category: r.category,
      status: r.status,
      severity: r.severity,
      location: { lat: r.latitude, lng: r.longitude, address: r.address, district: r.district },
      createdAt: r.createdAt.toISOString(),
    }));
  },
};
