'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useAppState } from '@/contexts/AppStateContext'
import { Card, CardHeader, CardContent, MetricCard } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/Badge'
import Link from 'next/link'
import { MapPin, Calendar, FileText, ChevronRight, PlusCircle, Heart, Users, Activity } from 'lucide-react'

export default function CitizenDashboard() {
  const { user } = useAuth()
  const { reports } = useAppState()

  const myReports = reports.filter(r => r.userId === 'USR-1').slice(0, 3)
  const recentCommunityReports = reports.slice(0, 6)

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name}</h1>
          <p className="text-slate-600 mt-1">Here's what's happening in your community today.</p>
        </div>
        <Link href="/citizen/report">
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Report a Problem
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">My Recent Reports</h2>
              <Link href="/citizen/reports" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            {myReports.length > 0 ? (
              <div className="grid gap-4">
                {myReports.map(report => (
                  <Card key={report.id} className="hover:border-primary-200 transition-colors">
                    <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900">{report.title || report.category} Issue</h3>
                          <StatusBadge status={report.status} />
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {report.address || report.location?.address}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(report.createdAt || report.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Link href={`/citizen/reports/${report.id}`}>
                        <Button variant="outline" size="sm">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-slate-50 border-dashed">
                <CardContent className="p-8 text-center text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p>You haven't submitted any reports yet.</p>
                </CardContent>
              </Card>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Community Issues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentCommunityReports.map(report => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <StatusBadge status={report.status} />
                      <span className="text-xs text-slate-400">{new Date(report.createdAt || report.timestamp).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 truncate">{report.title || report.category}</h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">{report.description}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{report.address || report.location?.address}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b bg-slate-50/50 pb-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Community Impact
              </h2>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <MetricCard 
                title="Issues Resolved" 
                value="1,248" 
                trend={{ value: 12, isPositive: true }}
                icon={<Activity className="w-5 h-5" />}
              />
              <MetricCard 
                title="Active Citizens" 
                value="452" 
                trend={{ value: 5, isPositive: true }}
                icon={<Users className="w-5 h-5" />}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
