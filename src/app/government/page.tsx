// src/app/government/page.tsx
'use client'

import { useAppState } from '@/contexts/AppStateContext'
import { Card, CardContent, CardHeader, MetricCard } from '@/components/ui/Card'
import { SeverityBadge } from '@/components/ui/Badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Link from 'next/link'
import { MapPin, AlertTriangle, CheckCircle, BrainCircuit } from 'lucide-react'

export default function GovernmentDashboard() {
  const { metrics, hotspots, lastUpdated } = useAppState()

  const chartData = [
    { name: 'Jan', reports: 120 },
    { name: 'Feb', reports: 150 },
    { name: 'Mar', reports: 180 },
    { name: 'Apr', reports: 220 },
    { name: 'May', reports: 200 },
    { name: 'Jun', reports: 250 },
  ]

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Government Command Center</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Loading...'}</p>
        </div>
        <Link 
          href="/government/copilot"
          className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-lg hover:bg-primary-700 transition-colors w-fit font-medium shadow-sm"
        >
          <BrainCircuit size={18} />
          <span>Ask AI Copilot</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard 
          title="Total Reports" 
          value={metrics.totalReports} 
          icon={<AlertTriangle size={20} className="text-slate-400" />} 
        />
        <MetricCard 
          title="Active Hotspots" 
          value={metrics.activeHotspots} 
          icon={<MapPin size={20} className="text-orange-500" />} 
        />
        <MetricCard 
          title="High-Risk Areas" 
          value={metrics.highRiskAreas} 
          icon={<AlertTriangle size={20} className="text-red-500" />} 
        />
        <MetricCard 
          title="Resolved Reports" 
          value={metrics.resolvedReports} 
          icon={<CheckCircle size={20} className="text-primary-600" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><span className="font-bold text-lg text-slate-800">Reports by Month</span></CardHeader>
            <CardContent>
              <div className="h-72 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="reports" fill="#16a34a" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">Civic Need Map Preview</h3>
              <Link href="/government/map" className="text-primary-600 text-sm font-semibold hover:text-primary-700">
                View Full Map →
              </Link>
            </div>
            <CardContent className="p-0">
              <div className="relative h-64 bg-slate-50 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
                <div className="relative w-full h-full max-w-md mx-auto">
                  {hotspots.slice(0, 5).map((hotspot, i) => (
                    <div 
                      key={hotspot.id}
                      className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-md ${hotspot.severity === 'CRITICAL' ? 'bg-red-500 animate-pulse' : hotspot.severity === 'HIGH' ? 'bg-orange-500' : 'bg-yellow-500'}`}
                      style={{ 
                        top: `${30 + (i * 12)}%`, 
                        left: `${20 + (i * 15)}%`,
                        transform: 'translate(-50%, -50%)' 
                      }}
                      title={hotspot.category}
                    ></div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm text-xs font-medium text-slate-600 border border-slate-200">
                  Interactive visualization demo
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><span className="font-bold text-lg text-slate-800">Top Civic Hotspots</span></CardHeader>
            <div className="divide-y divide-slate-100">
              {hotspots.slice(0, 5).map(hotspot => (
                <div key={hotspot.id} className="p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{hotspot.category}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><MapPin size={12}/> {hotspot.location?.district ?? hotspot.location?.address ?? 'Unknown'}</p>
                    </div>
                    <SeverityBadge severity={hotspot.severity} />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                      {hotspot.reportCount} reports
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${hotspot.trendPercentage > 0 ? 'bg-red-50 text-red-700' : hotspot.trendPercentage < 0 ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-700'}`}>
                      {hotspot.trendPercentage > 0 ? '↑ Rising' : hotspot.trendPercentage < 0 ? '↓ Falling' : '→ Stable'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100 text-center bg-slate-50">
              <Link href="/government/map" className="text-primary-600 text-sm font-semibold hover:text-primary-700">
                View all hotspots
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
