import { Prediction } from '../types';
import { mockPredictions } from '../data/mockData';

export const predictionService = {
  async getPredictions(): Promise<Prediction[]> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return mockPredictions;
  }
};
