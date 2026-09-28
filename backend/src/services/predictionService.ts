import { prisma } from '../config/prisma.js';
import { errors } from '../utils/errors.js';
import { toPredictionDto } from '../utils/mappers.js';
import type { Severity } from '../types/domain.js';

function riskFrom(count: number, severity: Severity, trend: number): Severity {
  if (severity === 'CRITICAL' || (count >= 4 && trend >= 50)) return 'CRITICAL';
  if (severity === 'HIGH' || count >= 3 || trend >= 35) return 'HIGH';
  if (count >= 2) return 'MEDIUM';
  return 'LOW';
}

function horizon(risk: Severity) {
  if (risk === 'CRITICAL') return '1-3 months';
  if (risk === 'HIGH') return '3-6 months';
  return '6-12 months';
}

export const predictionService = {
  async generatePredictions() {
    const hotspots = await prisma.hotspot.findMany({ include: { reports: true } });
    const created = [];
    for (const hotspot of hotspots) {
      const highSeverity = hotspot.reports.filter((r) => r.severity === 'HIGH' || r.severity === 'CRITICAL').length;
      const riskLevel = riskFrom(hotspot.reportCount, hotspot.severity, hotspot.trendPercentage);
      const trend = hotspot.trendPercentage >= 35 ? 'increasing' : hotspot.trendPercentage >= 15 ? 'stable' : 'decreasing';
      const confidence = Math.min(95, 55 + hotspot.reportCount * 5 + (highSeverity > 0 ? 10 : 0));
      const existing = await prisma.prediction.findFirst({
        where: { hotspotId: hotspot.id, category: hotspot.category },
        orderBy: { createdAt: 'desc' },
      });
      const data = {
        title: `${hotspot.category} Stress`,
        category: hotspot.category,
        address: hotspot.address,
        district: hotspot.district,
        latitude: hotspot.latitude,
        longitude: hotspot.longitude,
        riskLevel,
        trend,
        timeHorizon: horizon(riskLevel),
        confidence,
        recommendedAction: `Human review required: inspect ${hotspot.category.toLowerCase()} capacity in ${hotspot.district}. DEMO / ANALYTICAL ESTIMATE only.`,
        contributingFactors: [
          hotspot.trendPercentage >= 35 ? 'Increasing citizen reports' : 'Existing report volume',
          highSeverity ? 'High or critical severity reports' : 'Mixed severity reports',
          'Grid-based hotspot aggregation',
          'Historical trend within seeded/demo window',
        ],
        sourceLabel: 'DEMO / ANALYTICAL ESTIMATE',
        hotspotId: hotspot.id,
      };
      const prediction = existing
        ? await prisma.prediction.update({ where: { id: existing.id }, data })
        : await prisma.prediction.create({ data });
      created.push(prediction);
    }
    return created.map(toPredictionDto);
  },

  async list() {
    const count = await prisma.prediction.count();
    if (count === 0) return this.generatePredictions();
    const rows = await prisma.prediction.findMany({ orderBy: { confidence: 'desc' } });
    return rows.map(toPredictionDto);
  },

  async getById(id: string) {
    const row = await prisma.prediction.findUnique({
      where: { id },
      include: { evidence: true },
    });
    if (!row) throw errors.notFound('Prediction not found');
    return {
      ...toPredictionDto(row),
      supportingEvidence: row.evidence.map((e) => ({
        sourceType: e.sourceType,
        metric: e.metric,
        value: e.value,
        timestamp: e.timestamp.toISOString(),
        calculation: e.calculation,
        limitations: e.limitations,
      })),
    };
  },
};
