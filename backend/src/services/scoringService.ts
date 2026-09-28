import type { Severity } from '../types/domain.js';
import { severityToScore } from '../utils/mappers.js';

export const PRIORITY_WEIGHTS = {
  demand: 0.2,
  severity: 0.2,
  urgency: 0.2,
  infrastructureGap: 0.15,
  populationImpact: 0.15,
  costEfficiency: 0.1,
} as const;

export interface ScoreInput {
  demand: number;
  severity: Severity | number;
  urgency: Severity | number;
  infrastructureGap: Severity | number;
  populationImpact: number;
  costEfficiency: number;
}

function clamp(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function factor(value: Severity | number): number {
  return typeof value === 'number' ? clamp(value) : severityToScore(value);
}

export function calculatePriorityScore(input: ScoreInput) {
  const demand = clamp(input.demand);
  const severity = factor(input.severity);
  const urgency = factor(input.urgency);
  const infrastructureGap = factor(input.infrastructureGap);
  const populationImpact = clamp(input.populationImpact);
  const costEfficiency = clamp(input.costEfficiency);

  const priorityScore = clamp(
    demand * PRIORITY_WEIGHTS.demand +
      severity * PRIORITY_WEIGHTS.severity +
      urgency * PRIORITY_WEIGHTS.urgency +
      infrastructureGap * PRIORITY_WEIGHTS.infrastructureGap +
      populationImpact * PRIORITY_WEIGHTS.populationImpact +
      costEfficiency * PRIORITY_WEIGHTS.costEfficiency,
  );

  return {
    demand,
    severity,
    urgency,
    infrastructureGap,
    populationImpact,
    costEfficiency,
    priorityScore,
  };
}
