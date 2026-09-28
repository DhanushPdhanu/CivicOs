import type { CitizenReport, Hotspot, Prediction, Recommendation, Evidence, User, ReportImage } from '@prisma/client';
import { toFrontendRole, toFrontendStatus, type BackendStatus } from '../types/domain.js';

const publicOrigin = () => process.env.PUBLIC_API_URL || `http://localhost:${process.env.PORT ?? 5000}`;

export function fileUrl(fileId: string) {
  return `${publicOrigin()}/api/files/${fileId}`;
}

export function toUserDto(user: Pick<User, 'id' | 'name' | 'email' | 'role' | 'avatarUrl'>) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: toFrontendRole(user.role),
    avatarUrl: user.avatarUrl ?? undefined,
  };
}

export function toReportDto(
  report: CitizenReport & { images?: ReportImage[] },
) {
  const images = (report.images ?? []).map((img) => fileUrl(img.fileId));
  return {
    id: report.id,
    userId: report.userId,
    title: report.title,
    description: report.description,
    category: report.category,
    location: {
      lat: report.latitude,
      lng: report.longitude,
      address: report.address,
      district: report.district,
    },
    latitude: report.latitude,
    longitude: report.longitude,
    images,
    audioUrl: report.audioUrl ?? undefined,
    status: toFrontendStatus(report.status as BackendStatus),
    backendStatus: report.status,
    severity: report.severity,
    urgency: report.urgency,
    timestamp: report.createdAt.toISOString(),
    createdAt: report.createdAt.toISOString(),
    updatedAt: report.updatedAt.toISOString(),
    aiSummary: report.aiSummary,
    aiCategory: report.aiCategory,
    aiConfidence: report.aiConfidence,
    aiAnalysis: report.aiSummary
      ? {
          severity: report.severity ?? 'MEDIUM',
          urgency: report.urgency ?? 'MEDIUM',
          confidence: report.aiConfidence ?? 0,
          summary: report.aiSummary,
          detectedCategory: report.aiCategory ?? report.category,
          recommendedAction: report.recommendedAction,
          reasoning: report.aiReasoning,
          mode: report.aiMode,
        }
      : undefined,
  };
}

export function toHotspotDto(hotspot: Hotspot & { reports?: { id: string }[] }) {
  return {
    id: hotspot.id,
    category: hotspot.category,
    location: {
      lat: hotspot.latitude,
      lng: hotspot.longitude,
      address: hotspot.address,
      district: hotspot.district,
    },
    reportIds: hotspot.reports?.map((r) => r.id) ?? [],
    reportCount: hotspot.reportCount,
    trendPercentage: hotspot.trendPercentage,
    severity: hotspot.severity,
    populationAffected: hotspot.populationAffected,
    clustering: 'grid-based geographic grouping (~2km cells by category). Not advanced geospatial intelligence.',
  };
}

export function toPredictionDto(prediction: Prediction) {
  return {
    id: prediction.id,
    title: prediction.title,
    category: prediction.category,
    location: {
      lat: prediction.latitude,
      lng: prediction.longitude,
      address: prediction.address,
      district: prediction.district,
    },
    riskLevel: prediction.riskLevel,
    trend: prediction.trend,
    timeHorizon: prediction.timeHorizon,
    predictionWindow: prediction.timeHorizon,
    confidence: prediction.confidence,
    contributingFactors: prediction.contributingFactors,
    supportingEvidence: prediction.contributingFactors,
    recommendedAction: prediction.recommendedAction,
    sourceLabel: prediction.sourceLabel,
    createdAt: prediction.createdAt.toISOString(),
  };
}

export function toRecommendationDto(
  rec: Recommendation & { evidence?: Evidence | null },
) {
  return {
    id: rec.id,
    title: rec.title,
    location: {
      lat: rec.latitude,
      lng: rec.longitude,
      address: rec.address,
      district: rec.district,
    },
    priorityScore: rec.priorityScore,
    estimatedCost: rec.estimatedCost,
    populationImpact: rec.populationImpact,
    urgency: rec.urgency,
    expectedImpact: rec.expectedImpact,
    evidenceId: rec.evidence?.id ?? '',
    reviewStatus: rec.reviewStatus,
    requiresHumanReview: rec.reviewStatus === 'pending_review',
  };
}

export function toEvidenceDto(evidence: Evidence) {
  return {
    id: evidence.id,
    recommendationId: evidence.recommendationId,
    reportCount: evidence.reportCount,
    trendPercentage: evidence.trendPercentage,
    infrastructureGap: evidence.infrastructureGap,
    populationImpact: evidence.populationImpact,
    urgency: evidence.urgency,
    scoreBreakdown: {
      demand: evidence.demand,
      severity: evidence.severityScore,
      urgency: evidence.urgencyScore,
      populationImpact: evidence.populationImpactScore,
      costEfficiency: evidence.costEfficiency,
      priorityScore: Math.round(
        evidence.demand * 0.2 +
          evidence.severityScore * 0.2 +
          evidence.urgencyScore * 0.2 +
          evidence.populationImpactScore * 0.15 +
          evidence.costEfficiency * 0.1 +
          severityToScore(evidence.infrastructureGap) * 0.15,
      ),
    },
    calculationMethodology: evidence.calculationMethodology,
    confidence: evidence.confidence,
    dataSources: evidence.dataSources,
  };
}

export function severityToScore(severity: string): number {
  switch (severity) {
    case 'CRITICAL':
      return 100;
    case 'HIGH':
      return 80;
    case 'MEDIUM':
      return 55;
    default:
      return 30;
  }
}
