import { prisma } from '../config/prisma.js';

export const dashboardService = {
  async government() {
    const [reports, hotspots, predictions, recs] = await Promise.all([
      prisma.citizenReport.findMany({ include: { images: true }, orderBy: { createdAt: 'desc' } }),
      prisma.hotspot.findMany({ include: { reports: { select: { id: true } } }, orderBy: { reportCount: 'desc' } }),
      prisma.prediction.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
      prisma.recommendation.findMany({ include: { evidence: true }, orderBy: { priorityScore: 'desc' }, take: 5 }),
    ]);

    const pending = reports.filter((r) => r.status === 'submitted' || r.status === 'analyzing').length;
    const active = reports.filter((r) => ['verified', 'assigned', 'in_progress', 'analyzing'].includes(r.status)).length;
    const resolved = reports.filter((r) => r.status === 'resolved').length;
    const highSeverity = reports.filter((r) => r.severity === 'HIGH' || r.severity === 'CRITICAL').length;

    return {
      totalReports: reports.length,
      pendingReports: pending,
      activeReports: active,
      resolvedReports: resolved,
      highSeverityReports: highSeverity,
      hotspots: hotspots.slice(0, 10),
      predictions,
      recentReports: reports.slice(0, 8),
      priorityRecommendations: recs,
    };
  },

  async admin() {
    const [users, reports, audits] = await Promise.all([
      prisma.user.findMany(),
      prisma.citizenReport.findMany(),
      prisma.auditEvent.findMany({ orderBy: { timestamp: 'desc' }, take: 20 }),
    ]);
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    return {
      totalUsers: users.length,
      citizenCount: users.filter((u) => u.role === 'citizen').length,
      governmentCount: users.filter((u) => u.role === 'government').length,
      adminCount: users.filter((u) => u.role === 'admin').length,
      totalCitizens: users.filter((u) => u.role === 'citizen').length,
      totalGovUsers: users.filter((u) => u.role === 'government').length,
      totalAdmins: users.filter((u) => u.role === 'admin').length,
      totalReports: reports.length,
      activeReports: reports.filter((r) => r.status !== 'resolved' && r.status !== 'rejected').length,
      resolvedReports: reports.filter((r) => r.status === 'resolved').length,
      reportsToday: reports.filter((r) => now - r.createdAt.getTime() < day).length,
      reportsThisWeek: reports.filter((r) => now - r.createdAt.getTime() < 7 * day).length,
      systemUptime: 'n/a',
      apiCalls: audits.length,
      reportsByStatus: {
        pending: reports.filter((r) => r.status === 'submitted').length,
        analyzing: reports.filter((r) => r.status === 'analyzing').length,
        reviewed: reports.filter((r) => ['verified', 'assigned', 'in_progress'].includes(r.status)).length,
        resolved: reports.filter((r) => r.status === 'resolved').length,
      },
      systemActivity: audits.slice(0, 8).map(toAuditDto),
      recentAuditEvents: audits.map(toAuditDto),
    };
  },
};

export function toAuditDto(event: {
  id: string;
  timestamp: Date;
  action: string;
  actorName: string;
  details: string;
  type: string;
}) {
  return {
    id: event.id,
    timestamp: event.timestamp.toISOString(),
    action: event.action,
    actor: event.actorName,
    details: event.details,
    type: event.type,
  };
}

export const adminService = {
  async users() {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    return users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role === 'government' ? 'Government' : u.role === 'admin' ? 'Admin' : 'Citizen',
    }));
  },

  async patchUser(id: string, data: { role?: string; name?: string }) {
    const roleMap: Record<string, 'citizen' | 'government' | 'admin'> = {
      citizen: 'citizen',
      Citizen: 'citizen',
      government: 'government',
      Government: 'government',
      admin: 'admin',
      Admin: 'admin',
    };
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role ? roleMap[data.role] : undefined,
      },
    });
    await prisma.auditEvent.create({
      data: {
        action: 'User Updated',
        actorName: 'Admin',
        details: `Updated user ${id}`,
        type: 'user',
        actorId: undefined,
      },
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role === 'government' ? 'Government' : user.role === 'admin' ? 'Admin' : 'Citizen',
    };
  },

  async activity() {
    const events = await prisma.auditEvent.findMany({ orderBy: { timestamp: 'desc' }, take: 50 });
    return events.map(toAuditDto);
  },

  async auditLogs() {
    const events = await prisma.auditEvent.findMany({ orderBy: { timestamp: 'desc' }, take: 200 });
    return events.map(toAuditDto);
  },
};
