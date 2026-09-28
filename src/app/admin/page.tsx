'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, MetricCard } from '@/components/ui/Card'
import { adminService } from '@/services/adminService'
import type { AdminStats, ActivityFeedItem } from '@/services/adminService'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Users, FileText, Activity as ActivityIcon, Server } from 'lucide-react'

type AdminStatsWithStatus = AdminStats & { reportsByStatus: { pending: number; analyzing: number; reviewed: number; resolved: number } };

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStatsWithStatus | null>(null)
  const [activity, setActivity] = useState<ActivityFeedItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, activityData] = await Promise.all([
          adminService.getStats(),
          adminService.getActivityFeed()
        ])
        setStats(statsData)
        setActivity(activityData)
      } catch (error) {
        console.error('Failed to fetch admin data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading || !stats) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">System Administration</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}><CardContent className="h-24 animate-pulse bg-gray-100" /></Card>
          ))}
        </div>
      </div>
    )
  }

  const chartData = [
    { name: 'Pending', value: stats.reportsByStatus.pending, color: '#f59e0b' },
    { name: 'Analyzing', value: stats.reportsByStatus.analyzing, color: '#3b82f6' },
    { name: 'Reviewed', value: stats.reportsByStatus.reviewed, color: '#16a34a' },
    { name: 'Resolved', value: stats.reportsByStatus.resolved, color: '#0ea5e9' }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">System Administration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Users" value={stats.totalUsers.toString()} icon={<Users className="w-5 h-5 text-gray-400" />} />
        <MetricCard title="Reports Today" value={stats.reportsToday.toString()} icon={<FileText className="w-5 h-5 text-gray-400" />} />
        <MetricCard title="System Uptime" value={stats.systemUptime} icon={<Server className="w-5 h-5 text-gray-400" />} />
        <MetricCard title="API Calls" value={stats.apiCalls.toString()} icon={<ActivityIcon className="w-5 h-5 text-gray-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><h3 className="font-semibold text-lg">Reports Breakdown</h3></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              {chartData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><h3 className="font-semibold text-lg">Recent Activity</h3></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activity.slice(0, 5).map((item) => (
                <div key={item.id} className="flex gap-4 items-start pb-4 border-b border-border last:border-0">
                  <div className="bg-primary-50 p-2 rounded-full text-primary-600 mt-1">
                    <ActivityIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-slate-500">{item.actor} • {item.details}</p>
                    <p className="text-xs text-slate-400 mt-1">{new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
