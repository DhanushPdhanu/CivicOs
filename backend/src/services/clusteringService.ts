import type { Severity } from '../types/domain.js';

const GRID_SIZE = 0.02;

export function gridKey(category: string, lat: number, lng: number): string {
  const latCell = Math.floor(lat / GRID_SIZE);
  const lngCell = Math.floor(lng / GRID_SIZE);
  return `${category}:${latCell}:${lngCell}`;
}

export function cellCenter(lat: number, lng: number) {
  const latCell = Math.floor(lat / GRID_SIZE);
  const lngCell = Math.floor(lng / GRID_SIZE);
  return {
    latitude: (latCell + 0.5) * GRID_SIZE,
    longitude: (lngCell + 0.5) * GRID_SIZE,
  };
}

export function dominantSeverity(values: Severity[]): Severity {
  const rank = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
  let best: Severity = 'LOW';
  for (const v of values) {
    if (rank[v] > rank[best]) best = v;
  }
  return best;
}

export function estimatePopulation(reportCount: number): number {
  return reportCount * 1700;
}

export const CLUSTERING_NOTE =
  'Hotspots are produced by deterministic ~2km grid clustering grouped by category. This is not advanced geospatial intelligence.';
