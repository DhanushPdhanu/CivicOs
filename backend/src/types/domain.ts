export const CATEGORIES = [
  'Roads',
  'Drainage',
  'Water',
  'Waste',
  'Public Transport',
  'Healthcare',
  'Education',
  'Electricity',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const FRONTEND_ROLES = ['Citizen', 'Government', 'Admin'] as const;
export type FrontendRole = (typeof FRONTEND_ROLES)[number];
export type CanonicalRole = 'citizen' | 'government' | 'admin';

export const FRONTEND_STATUSES = ['Pending', 'Analyzing', 'Reviewed', 'Resolved'] as const;
export type FrontendStatus = (typeof FRONTEND_STATUSES)[number];

export type BackendStatus =
  | 'submitted'
  | 'analyzing'
  | 'verified'
  | 'assigned'
  | 'in_progress'
  | 'resolved'
  | 'rejected';

export const SEVERITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
export type Severity = (typeof SEVERITIES)[number];

export function toFrontendRole(role: CanonicalRole): FrontendRole {
  if (role === 'government') return 'Government';
  if (role === 'admin') return 'Admin';
  return 'Citizen';
}

export function toCanonicalRole(role: string): CanonicalRole | null {
  const normalized = role.trim().toLowerCase();
  if (normalized === 'citizen') return 'citizen';
  if (normalized === 'government') return 'government';
  if (normalized === 'admin') return 'admin';
  return null;
}

export function toFrontendStatus(status: BackendStatus): FrontendStatus {
  switch (status) {
    case 'submitted':
      return 'Pending';
    case 'analyzing':
      return 'Analyzing';
    case 'resolved':
      return 'Resolved';
    default:
      return 'Reviewed';
  }
}

export function toBackendStatus(status: string): BackendStatus | null {
  const map: Record<string, BackendStatus> = {
    submitted: 'submitted',
    analyzing: 'analyzing',
    verified: 'verified',
    assigned: 'assigned',
    in_progress: 'in_progress',
    resolved: 'resolved',
    rejected: 'rejected',
    pending: 'submitted',
    reviewed: 'verified',
  };
  return map[status.trim().toLowerCase()] ?? null;
}

export const STATUS_TRANSITIONS: Record<BackendStatus, BackendStatus[]> = {
  submitted: ['analyzing', 'rejected'],
  analyzing: ['verified', 'rejected', 'submitted'],
  verified: ['assigned', 'rejected'],
  assigned: ['in_progress', 'rejected'],
  in_progress: ['resolved', 'rejected'],
  resolved: [],
  rejected: [],
};

export function canTransition(from: BackendStatus, to: BackendStatus): boolean {
  if (from === to) return true;
  return STATUS_TRANSITIONS[from].includes(to);
}
