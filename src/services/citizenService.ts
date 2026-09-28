import { CitizenReport } from '../types';
import { mockReports } from '../data/mockData';

export const citizenService = {
  async submitReport(reportData: Partial<CitizenReport>): Promise<CitizenReport> {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Simulate deterministic demo path
    if (reportData.description?.includes('Every time it rains, our road gets flooded')) {
      const demoReport = mockReports.find(r => r.id === 'RPT-DEMO-1');
      if (demoReport) return demoReport;
    }

    const category = reportData.category ?? 'Other';

    // Return a fully-formed CitizenReport using submitted data
    return {
      id:          `RPT-NEW-${Date.now()}`,
      userId:      reportData.userId ?? 'USR-1',
      title:       reportData.title  ?? `${category} Issue`,
      description: reportData.description ?? '',
      category,
      location:    reportData.location ?? { lat: 28.6139, lng: 77.2090, address: 'Unknown', district: 'Unknown' },
      images:      reportData.images  ?? [],
      status:      'Analyzing',
      timestamp:   new Date().toISOString(),
      aiAnalysis: {
        severity:         'MEDIUM',
        urgency:          'MEDIUM',
        confidence:       82,
        summary:          `${category} issue logged. AI analysis underway — initial severity assessed as MEDIUM.`,
        detectedCategory: category,
      },
    };
  },

  async getReports(): Promise<CitizenReport[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockReports;
  },

  async getReportById(id: string): Promise<CitizenReport | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockReports.find(r => r.id === id);
  }
};
