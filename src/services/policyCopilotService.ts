import { Recommendation } from '../types';
import { mockRecommendations } from '../data/mockData';

export const policyCopilotService = {
  async generateRecommendation(query: string): Promise<Recommendation[]> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Deterministic response based on the hero feature question
    if (query.toLowerCase().includes('where should we invest ₹100 crore')) {
      const demoRec = mockRecommendations.find(r => r.id === 'REC-DEMO-1');
      if (demoRec) {
        return [demoRec, ...mockRecommendations.filter(r => r.id !== 'REC-DEMO-1').slice(0, 2)];
      }
    }
    
    // Return random top 3 recommendations for other queries
    return mockRecommendations.slice(0, 3);
  }
};
