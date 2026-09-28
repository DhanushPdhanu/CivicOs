import { prisma } from '../config/prisma.js';
import { errors } from '../utils/errors.js';
import { calculatePriorityScore } from './scoringService.js';
import { toEvidenceDto, toRecommendationDto, severityToScore } from '../utils/mappers.js';
import type { Severity } from '../types/domain.js';

const METHODOLOGY =
  'priorityScore = 0.20*demand + 0.20*severity + 0.20*urgency + 0.15*infrastructureGap + 0.15*populationImpact + 0.10*costEfficiency. Same inputs always yield the same score. Values come from stored reports/hotspots/projects, not fabricated official statistics.';

function demandFrom(reportCount: number, trend: number) {
  return Math.min(100, Math.round(40 + reportCount * 8 + trend * 0.3));
}

function costEfficiency(budgetCrore: number, population: number) {
  if (budgetCrore <= 0) return 50;
  const peoplePerCrore = population / budgetCrore;
  return Math.min(100, Math.round(40 + Math.log10(Math.max(peoplePerCrore, 1)) * 20));
}

export const copilotService = {
  async generateFromData(question: string) {
    const [hotspots, projects, reports] = await Promise.all([
      prisma.hotspot.findMany({ include: { reports: true } }),
      prisma.project.findMany(),
      prisma.citizenReport.findMany(),
    ]);

    const recs = [];
    for (const hotspot of hotspots) {
      const project = projects.find(
        (p) => p.district === hotspot.district && p.title.toLowerCase().includes(hotspot.category.toLowerCase()),
      );
      const budget = project?.budget ?? Math.max(8, Math.round((hotspot.populationAffected / 4000) * 10) / 10);
      const avgSeverity = hotspot.severity;
      const breakdown = calculatePriorityScore({
        demand: demandFrom(hotspot.reportCount, hotspot.trendPercentage),
        severity: avgSeverity,
        urgency: avgSeverity,
        infrastructureGap: avgSeverity,
        populationImpact: Math.min(100, Math.round(hotspot.populationAffected / 1000)),
        costEfficiency: costEfficiency(budget, hotspot.populationAffected),
      });

      const existing = await prisma.recommendation.findFirst({
        where: { title: `${hotspot.category} Upgrade`, district: hotspot.district },
      });

      const rec = existing
        ? await prisma.recommendation.update({
            where: { id: existing.id },
            data: {
              priorityScore: breakdown.priorityScore,
              estimatedCost: budget,
              populationImpact: hotspot.populationAffected,
              urgency: hotspot.severity,
              expectedImpact: hotspot.severity,
              projectId: project?.id,
            },
            include: { evidence: true },
          })
        : await prisma.recommendation.create({
            data: {
              title: `${hotspot.category} Upgrade`,
              address: hotspot.address,
              district: hotspot.district,
              latitude: hotspot.latitude,
              longitude: hotspot.longitude,
              priorityScore: breakdown.priorityScore,
              estimatedCost: budget,
              populationImpact: hotspot.populationAffected,
              urgency: hotspot.severity,
              expectedImpact: hotspot.severity,
              projectId: project?.id,
            },
            include: { evidence: true },
          });

      const evidence = await prisma.evidence.upsert({
        where: { recommendationId: rec.id },
        create: {
          recommendationId: rec.id,
          reportCount: hotspot.reportCount,
          trendPercentage: hotspot.trendPercentage,
          infrastructureGap: hotspot.severity,
          populationImpact: hotspot.populationAffected,
          urgency: hotspot.severity,
          demand: breakdown.demand,
          severityScore: breakdown.severity,
          urgencyScore: breakdown.urgency,
          populationImpactScore: breakdown.populationImpact,
          costEfficiency: breakdown.costEfficiency,
          calculationMethodology: METHODOLOGY,
          confidence: Math.min(96, 70 + Math.min(20, hotspot.reportCount)),
          dataSources: ['Citizen Report Aggregation', 'Grid Hotspot Clustering', 'Seeded Project Budgets'],
          items: {
            create: [
              {
                sourceType: 'citizen_reports',
                metric: 'reportCount',
                value: String(hotspot.reportCount),
                calculation: 'Count of reports in the hotspot grid cell',
                limitations: 'Counts reflect stored CivicOS records only; not a census.',
              },
              {
                sourceType: 'scoring',
                metric: 'priorityScore',
                value: String(breakdown.priorityScore),
                calculation: METHODOLOGY,
                limitations: 'Transparent heuristic, not an official government index.',
              },
            ],
          },
        },
        update: {
          reportCount: hotspot.reportCount,
          trendPercentage: hotspot.trendPercentage,
          demand: breakdown.demand,
          severityScore: breakdown.severity,
          urgencyScore: breakdown.urgency,
          populationImpactScore: breakdown.populationImpact,
          costEfficiency: breakdown.costEfficiency,
          populationImpact: hotspot.populationAffected,
        },
      });

      recs.push({ ...rec, evidence });
    }

    recs.sort((a, b) => b.priorityScore - a.priorityScore);
    const q = question.toLowerCase();
    const filtered = q.includes('flood') || q.includes('drain') || q.includes('100 crore')
      ? recs
      : recs;

    const top = filtered.slice(0, 5);
    await prisma.auditEvent.create({
      data: {
        action: 'Recommendation Generated',
        actorName: 'Policy Copilot',
        details: `Generated ${top.length} recommendations for query`,
        type: 'ai',
      },
    });

    const totalReports = reports.length;
    return {
      question,
      recommendations: top.map(toRecommendationDto),
      evidence: top
        .filter((r) => r.evidence)
        .map((r) => toEvidenceDto(r.evidence!)),
      scoreBreakdown: top[0]?.evidence
        ? toEvidenceDto(top[0].evidence).scoreBreakdown
        : {},
      limitations: [
        'Requires human review before any government decision.',
        'Scores are deterministic heuristics over CivicOS stored data.',
        'Not a claim of official statistics, census figures, or guaranteed outcomes.',
        'AI/copilot output is decision support only.',
      ],
      requiresHumanReview: true,
      metrics: { totalReports, hotspotCount: hotspots.length },
    };
  },

  async query(question: string) {
    if (question.trim().length < 5) throw errors.validation('Invalid request data', { question: 'Too short' });
    return this.generateFromData(question);
  },

  async listRecommendations() {
    const rows = await prisma.recommendation.findMany({ include: { evidence: true }, orderBy: { priorityScore: 'desc' } });
    if (rows.length === 0) {
      const generated = await this.generateFromData('Prioritize civic infrastructure');
      return generated.recommendations;
    }
    return rows.map(toRecommendationDto);
  },

  async getRecommendation(id: string) {
    const row = await prisma.recommendation.findUnique({ where: { id }, include: { evidence: true } });
    if (!row) throw errors.notFound('Recommendation not found');
    return toRecommendationDto(row);
  },

  async getEvidence(id: string) {
    const rec = await prisma.recommendation.findUnique({
      where: { id },
      include: { evidence: { include: { items: true } } },
    });
    if (!rec?.evidence) throw errors.notFound('Evidence not found');
    return {
      ...toEvidenceDto(rec.evidence),
      items: rec.evidence.items.map((item) => ({
        sourceType: item.sourceType,
        metric: item.metric,
        value: item.value,
        timestamp: item.timestamp.toISOString(),
        calculation: item.calculation,
        limitations: item.limitations,
      })),
    };
  },

  async review(id: string, actorId: string, decision: 'approved' | 'rejected') {
    const rec = await prisma.recommendation.update({
      where: { id },
      data: { reviewStatus: decision, reviewedById: actorId },
      include: { evidence: true },
    });
    await prisma.auditEvent.create({
      data: {
        action: decision === 'approved' ? 'Recommendation Approved' : 'Recommendation Returned',
        actorId,
        actorName: 'Government reviewer',
        details: `${id} marked ${decision}`,
        type: 'user',
        recommendationId: id,
      },
    });
    return toRecommendationDto(rec);
  },
};

void severityToScore;
void calculatePriorityScore;
