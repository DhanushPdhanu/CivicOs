'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, MetricCard } from '@/components/ui/Card'
import { StatusBadge, SeverityBadge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { adminService } from '@/services/adminService'
import type { ReportStats } from '@/services/adminService'
import { useAppState } from '@/contexts/AppStateContext'

export default function AdminReports() {
  const [stats, setStats] = useState<ReportStats | null>(null)
  const { reports } = useAppState()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      const data = await adminService.getReportStats()
      setStats(data)
    }
    fetchStats()
  }, [])

  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.district.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Report Management</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard title="Total" value={stats?.total?.toString() || '0'} />
        <MetricCard title="Pending" value={stats?.pending?.toString() || '0'} />
        <MetricCard title="Analyzing" value={stats?.analyzing?.toString() || '0'} />
        <MetricCard title="Reviewed" value={stats?.reviewed?.toString() || '0'} />
        <MetricCard title="Resolved" value={stats?.resolved?.toString() || '0'} />
      </div>

      <div className="flex gap-4">
        <Input 
          placeholder="Search reports by title, category, or district..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">District</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.id.substring(0, 8)}...</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{report.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.category}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={report.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap"><SeverityBadge severity={report.severity} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.district}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(report.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-4 space-y-2">
              <div className="font-medium">{report.title}</div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                <span>{report.category}</span>
                <span>•</span>
                <span>{report.district}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <StatusBadge status={report.status} />
                <SeverityBadge severity={report.severity} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
