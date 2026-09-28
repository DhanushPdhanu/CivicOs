// ============================================================
// CivicOS Type Definitions
// ============================================================

export type Role = 'Citizen' | 'Government' | 'Admin';
export type Category = 'Roads' | 'Drainage' | 'Water' | 'Waste' | 'Public Transport' | 'Healthcare' | 'Education' | 'Electricity' | 'Other';
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type Status = 'Pending' | 'Analyzing' | 'Reviewed' | 'Resolved';

export interface Location {
  lat: number;
  lng: number;
  address: string;
  district: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface CitizenReport {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: Category;
  location: Location;
  images: string[];
  audioUrl?: string;
  status: Status;
  timestamp: string;
  aiAnalysis?: {
    severity: Severity;
    urgency: Severity;
    confidence: number;
    summary: string;
    detectedCategory: Category;
  };
}

export interface Hotspot {
  id: string;
  category: Category;
  location: Location;
  reportIds: string[];
  reportCount: number;
  trendPercentage: number;
  severity: Severity;
  populationAffected: number;
}

export interface Prediction {
  id: string;
  title: string;
  location: Location;
  riskLevel: Severity;
  predictionWindow: string;
  confidence: number;
  contributingFactors: string[];
}

export interface ScoreBreakdown {
  demand: number;
  severity: number;
  urgency: number;
  populationImpact: number;
  costEfficiency: number;
}

export interface Recommendation {
  id: string;
  title: string;
  location: Location;
  priorityScore: number;
  estimatedCost: number;
  populationImpact: number;
  urgency: Severity;
  expectedImpact: Severity;
  evidenceId: string;
}

export interface Evidence {
  id: string;
  recommendationId: string;
  reportCount: number;
  trendPercentage: number;
  infrastructureGap: Severity;
  populationImpact: number;
  urgency: Severity;
  scoreBreakdown: ScoreBreakdown;
  calculationMethodology: string;
  confidence: number;
  dataSources: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'Planned' | 'In Progress' | 'Completed';
  budget: number;
  location: Location;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
  type: 'system' | 'user' | 'ai';
}

export interface DashboardMetrics {
  totalReports: number;
  activeHotspots: number;
  highRiskAreas: number;
  resolvedReports: number;
  pendingReports: number;
  analyzingReports: number;
  populationAffected: number;
  avgResponseTime: string;
}

export interface AdminStats {
  totalUsers: number;
  totalCitizens: number;
  totalGovUsers: number;
  totalAdmins: number;
  reportsToday: number;
  reportsThisWeek: number;
  systemUptime: string;
  apiCalls: number;
}
