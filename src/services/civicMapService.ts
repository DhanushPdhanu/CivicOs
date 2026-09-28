import { Hotspot } from '../types';
import { mockHotspots } from '../data/mockData';

export const civicMapService = {
  async getHotspots(): Promise<Hotspot[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return mockHotspots;
  },
  
  async getHotspotById(id: string): Promise<Hotspot | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockHotspots.find(h => h.id === id);
  }
};
