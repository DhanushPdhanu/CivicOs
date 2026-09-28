'use client'

import { useState } from 'react'
import { useAppState } from '@/contexts/AppStateContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import Link from 'next/link'
import { MapPin, Calendar, FileText, Search, Filter } from 'lucide-react'

export default function MyReports() {
  const { reports, isLoading } = useAppState()
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')

  const myReports = reports.filter(r => r.userId === 'USR-1')

  const filteredReports = myReports.filter(r => {
    const matchesSearch = (r.title || r.category).toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = filterCategory ? r.category === filterCategory : true
    const matchesStatus = filterStatus ? r.status === filterStatus : true
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = Array.from(new Set(myReports.map(r => r.category)))
  const statuses = Array.from(new Set(myReports.map(r => r.status)))

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-slate-900">My Reports</h1>
        <Link href="/citizen/report">
          <Button>New Report</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <Input 
              placeholder="Search reports..." 
              className="pl-10"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select 
              value={filterCategory} 
              onChange={e => setFilterCategory(e.target.value)}
              options={[{ value: '', label: 'All Categories' }, ...categories.map(c => ({ value: c, label: c }))]}
            />
          </div>
          <div className="w-full md:w-48">
            <Select 
              value={filterStatus} 
              onChange={e => setStatusFilter(e.target.value)}
              options={[{ value: '', label: 'All Statuses' }, ...statuses.map(s => ({ value: s, label: s }))]}
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredReports.length > 0 ? (
        <div className="grid gap-4">
          {filteredReports.map(report => (
            <Card key={report.id} className="hover:border-primary-200 transition-colors">
              <CardContent className="p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-lg text-slate-900">{report.title || report.category}</h3>
                    <Badge variant="outline">{report.category}</Badge>
                    <StatusBadge status={report.status} />
                  </div>
                  <p className="text-slate-600 line-clamp-2 text-sm">{report.description}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {report.location?.address ?? 'Unknown location'}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(report.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Link href={`/citizen/reports/${report.id}`} className="w-full md:w-auto mt-2 md:mt-0">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-slate-50 border-dashed">
          <CardContent className="p-12 text-center text-slate-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No reports found</h3>
            <p>We couldn't find any reports matching your filters.</p>
            {(search || filterCategory || filterStatus) && (
              <Button 
                variant="ghost" 
                className="mt-4"
                onClick={() => { setSearch(''); setFilterCategory(''); setStatusFilter(''); }}
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
