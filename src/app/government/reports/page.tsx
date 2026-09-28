// src/app/government/reports/page.tsx
'use client'

import { useState } from 'react'
import { useAppState } from '@/contexts/AppStateContext'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { StatusBadge, SeverityBadge } from '@/components/ui/Badge'
import Link from 'next/link'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

export default function GovernmentReports() {
  const { reports } = useAppState()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [severityFilter, setSeverityFilter] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter
    const matchesSeverity = severityFilter === 'ALL' || r.severity === severityFilter
    return matchesSearch && matchesStatus && matchesSeverity
  })

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / itemsPerPage))
  const paginatedReports = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">All Citizen Reports</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and review all submitted civic issues</p>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 bg-slate-50/50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <Input 
              placeholder="Search reports by ID or title..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex h-10 w-full md:w-48 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
          <select 
            value={severityFilter} 
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="flex h-10 w-full md:w-48 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          >
            <option value="ALL">All Severities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Severity</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">District</th>
                <th className="py-4 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedReports.length > 0 ? (
                paginatedReports.map(report => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-slate-900">
                      <Link href={`/citizen/reports/${report.id}`} className="text-primary-600 hover:text-primary-800 hover:underline">
                        {report.id.substring(0, 8).toUpperCase()}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-800 max-w-[200px] truncate" title={report.title}>{report.title}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{report.category}</td>
                    <td className="py-4 px-6"><SeverityBadge severity={report.severity} /></td>
                    <td className="py-4 px-6"><StatusBadge status={report.status} /></td>
                    <td className="py-4 px-6 text-sm text-slate-600">{report.location.district}</td>
                    <td className="py-4 px-6 text-sm text-slate-500">{new Date(report.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="text-slate-300 mb-2" size={32} />
                      <p>No reports found matching your filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-700">{filteredReports.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-slate-700">{Math.min(currentPage * itemsPerPage, filteredReports.length)}</span> of <span className="font-medium text-slate-700">{filteredReports.length}</span> results
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
