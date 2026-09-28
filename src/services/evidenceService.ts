import { Evidence } from '../types';
import { mockEvidences } from '../data/mockData';

export const evidenceService = {
  async getEvidence(recommendationId: string): Promise<Evidence | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockEvidences.find(e => e.recommendationId === recommendationId);
  }
};
