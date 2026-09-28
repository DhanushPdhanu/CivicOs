'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { CitizenReport, Hotspot, Prediction, DashboardMetrics } from '@/types';
import { citizenService } from '@/services/citizenService';
import { civicMapService } from '@/services/civicMapService';
import { predictionService } from '@/services/predictionService';

interface AppState {
  reports: CitizenReport[];
  hotspots: Hotspot[];
  predictions: Prediction[];
  metrics: DashboardMetrics;
  isLoading: boolean;
  lastUpdated: string | null;
}

interface AppStateContextType extends AppState {
  addReport: (report: CitizenReport) => void;
  updateReportStatus: (id: string, status: CitizenReport['status']) => void;
  refreshData: () => Promise<void>;
}

const defaultMetrics: DashboardMetrics = {
  totalReports: 0,
  activeHotspots: 0,
  highRiskAreas: 0,
  resolvedReports: 0,
  pendingReports: 0,
  analyzingReports: 0,
  populationAffected: 0,
  avgResponseTime: '2.4 days',
};

const AppStateContext = createContext<AppStateContextType | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    reports: [],
    hotspots: [],
    predictions: [],
    metrics: defaultMetrics,
    isLoading: true,
    lastUpdated: null,
  });

  const computeMetrics = useCallback((reports: CitizenReport[], hotspots: Hotspot[], predictions: Prediction[]): DashboardMetrics => {
    return {
      totalReports: reports.length,
      activeHotspots: hotspots.length,
      highRiskAreas: predictions.filter(p => p.riskLevel === 'CRITICAL' || p.riskLevel === 'HIGH').length,
      resolvedReports: reports.filter(r => r.status === 'Resolved').length,
      pendingReports: reports.filter(r => r.status === 'Pending').length,
      analyzingReports: reports.filter(r => r.status === 'Analyzing').length,
      populationAffected: hotspots.reduce((acc, h) => acc + h.populationAffected, 0),
      avgResponseTime: '2.4 days',
    };
  }, []);

  const refreshData = useCallback(async () => {
    try {
      const [reports, hotspots, predictions] = await Promise.all([
        citizenService.getReports(),
        civicMapService.getHotspots(),
        predictionService.getPredictions(),
      ]);
      const metrics = computeMetrics(reports, hotspots, predictions);
      setState({
        reports,
        hotspots,
        predictions,
        metrics,
        isLoading: false,
        lastUpdated: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to load data:', error);
      setState(s => ({ ...s, isLoading: false }));
    }
  }, [computeMetrics]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const addReport = useCallback((report: CitizenReport) => {
    setState(prev => {
      const newReports = [report, ...prev.reports];
      const metrics = computeMetrics(newReports, prev.hotspots, prev.predictions);
      return {
        ...prev,
        reports: newReports,
        metrics,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, [computeMetrics]);

  const updateReportStatus = useCallback((id: string, status: CitizenReport['status']) => {
    setState(prev => {
      const newReports = prev.reports.map(r => r.id === id ? { ...r, status } : r);
      const metrics = computeMetrics(newReports, prev.hotspots, prev.predictions);
      return {
        ...prev,
        reports: newReports,
        metrics,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, [computeMetrics]);

  return (
    <AppStateContext.Provider value={{ ...state, addReport, updateReportStatus, refreshData }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
}
