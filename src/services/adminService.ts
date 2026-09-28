import type { User, AuditEvent, AdminStats } from '../types';
import { mockReports } from '../data/mockData';

// Export types used by admin/page.tsx
export type ActivityFeedItem = AuditEvent;
export type { AdminStats };

const mockUsers: User[] = [
  { id: 'USR-1', name: 'Rahul Sharma', email: 'citizen@demo.com', role: 'Citizen' },
  { id: 'USR-2', name: 'Anita Verma', email: 'anita@demo.com', role: 'Citizen' },
  { id: 'USR-3', name: 'Vikram Singh', email: 'vikram@demo.com', role: 'Citizen' },
  { id: 'USR-4', name: 'Meera Joshi', email: 'meera@demo.com', role: 'Citizen' },
  { id: 'USR-5', name: 'Suresh Kumar', email: 'suresh@demo.com', role: 'Citizen' },
  { id: 'USR-GOV-1', name: 'Dr. Priya Patel', email: 'gov@demo.com', role: 'Government' },
  { id: 'USR-GOV-2', name: 'Rajesh Gupta', email: 'rajesh@demo.com', role: 'Government' },
  { id: 'USR-ADMIN-1', name: 'System Admin', email: 'admin@demo.com', role: 'Admin' },
];

const mockAuditEvents: AuditEvent[] = [
  { id: 'AUD-1', timestamp: '2026-09-25T10:30:00Z', action: 'Report Submitted', actor: 'Rahul Sharma', details: 'Submitted report RPT-DEMO-1 — Drainage issue', type: 'user' },
  { id: 'AUD-2', timestamp: '2026-09-25T10:30:05Z', action: 'AI Analysis Started', actor: 'CivicOS AI', details: 'Began analysis of RPT-DEMO-1', type: 'ai' },
  { id: 'AUD-3', timestamp: '2026-09-25T10:30:15Z', action: 'AI Analysis Complete', actor: 'CivicOS AI', details: 'RPT-DEMO-1 classified as HIGH severity Drainage issue', type: 'ai' },
  { id: 'AUD-4', timestamp: '2026-09-25T10:35:00Z', action: 'Hotspot Updated', actor: 'System', details: 'Demo District A drainage hotspot updated with new report', type: 'system' },
  { id: 'AUD-5', timestamp: '2026-09-25T11:00:00Z', action: 'Policy Query', actor: 'Dr. Priya Patel', details: 'Queried AI Copilot: Where should we invest ₹100 crore?', type: 'user' },
  { id: 'AUD-6', timestamp: '2026-09-25T11:00:10Z', action: 'Recommendation Generated', actor: 'CivicOS AI', details: 'Generated 3 infrastructure recommendations', type: 'ai' },
  { id: 'AUD-7', timestamp: '2026-09-25T11:15:00Z', action: 'Report Status Changed', actor: 'Rajesh Gupta', details: 'RPT-1002 status changed from Analyzing to Reviewed', type: 'user' },
  { id: 'AUD-8', timestamp: '2026-09-25T12:00:00Z', action: 'User Login', actor: 'System Admin', details: 'Admin user logged in', type: 'system' },
  { id: 'AUD-9', timestamp: '2026-09-25T14:30:00Z', action: 'Report Resolved', actor: 'Dr. Priya Patel', details: 'RPT-1005 marked as Resolved', type: 'user' },
  { id: 'AUD-10', timestamp: '2026-09-25T15:00:00Z', action: 'System Health Check', actor: 'System', details: 'All services operational', type: 'system' },
];

export const adminService = {
  async getUsers(): Promise<User[]> {
    await new Promise(r => setTimeout(r, 500));
    return mockUsers;
  },

  async getStats(): Promise<AdminStats & { reportsByStatus: { pending: number; analyzing: number; reviewed: number; resolved: number } }> {
    await new Promise(r => setTimeout(r, 400));
    const reports = mockReports;
    return {
      totalUsers: mockUsers.length,
      totalCitizens: mockUsers.filter(u => u.role === 'Citizen').length,
      totalGovUsers: mockUsers.filter(u => u.role === 'Government').length,
      totalAdmins: mockUsers.filter(u => u.role === 'Admin').length,
      reportsToday: 24,
      reportsThisWeek: 156,
      systemUptime: '99.9%',
      apiCalls: 12482,
      reportsByStatus: {
        pending:   reports.filter(r => r.status === 'Pending').length,
        analyzing: reports.filter(r => r.status === 'Analyzing').length,
        reviewed:  reports.filter(r => r.status === 'Reviewed').length,
        resolved:  reports.filter(r => r.status === 'Resolved').length,
      },
    };
  },

  async getAuditLogs(): Promise<AuditEvent[]> {
    await new Promise(r => setTimeout(r, 500));
    return mockAuditEvents;
  },

  async getActivityFeed(): Promise<AuditEvent[]> {
    await new Promise(r => setTimeout(r, 400));
    return mockAuditEvents.slice(0, 6);
  },

  async getReportStats() {
    await new Promise(r => setTimeout(r, 300));
    const reports = mockReports;
    return {
      total: reports.length,
      pending: reports.filter(r => r.status === 'Pending').length,
      analyzing: reports.filter(r => r.status === 'Analyzing').length,
      reviewed: reports.filter(r => r.status === 'Reviewed').length,
      resolved: reports.filter(r => r.status === 'Resolved').length,
    };
  },
};
