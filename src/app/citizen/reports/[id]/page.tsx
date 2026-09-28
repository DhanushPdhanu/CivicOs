'use client'

import { usePathname } from 'next/navigation'
import { useAppState } from '@/contexts/AppStateContext'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge, StatusBadge, SeverityBadge } from '@/components/ui/Badge'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, CheckCircle2, AlertTriangle, Sparkles, Map } from 'lucide-react'

export default function ReportDetail() {
  const pathname = usePathname()
  const id = pathname.split('/').pop()
  const { reports } = useAppState()

  const report = reports.find(r => r.id === id)

  if (!report) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Report not found</h2>
        <Link href="/citizen/reports">
          <Button variant="outline">Back to Reports</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <Link href="/citizen/reports" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to My Reports
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{report.title || report.category}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {report.location?.address ?? 'Unknown location'}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(report.timestamp).toLocaleString()}</span>
          </div>
        </div>
        <StatusBadge status={report.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b bg-slate-50/50">
              <h2 className="font-semibold text-slate-800">Description</h2>
            </CardHeader>
            <CardContent className="pt-6 text-slate-700 whitespace-pre-wrap">
              {report.description}
            </CardContent>
          </Card>

          {report.aiAnalysis && (
            <Card className="border-primary-100 bg-primary-50/30 overflow-hidden">
              <div className="bg-primary-100/50 px-4 py-2 border-b border-primary-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-600" />
                <span className="text-xs font-bold text-primary-700 tracking-wider">DEMO AI ANALYSIS</span>
              </div>
              <CardContent className="pt-5 space-y-4">
                <p className="text-sm text-slate-700">{report.aiAnalysis.summary}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{report.aiAnalysis.detectedCategory}</Badge>
                  <SeverityBadge severity={report.aiAnalysis.severity} />
                  {(report.aiAnalysis.urgency === 'HIGH' || report.aiAnalysis.urgency === 'CRITICAL') && (
                    <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200">High Urgency</Badge>
                  )}
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Confidence Score</span>
                    <span>{report.aiAnalysis.confidence}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${report.aiAnalysis.confidence}%` }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Link href="/government/map" className="flex-1">
              <Button className="w-full flex items-center justify-center gap-2" variant="outline">
                <Map className="w-4 h-4" /> View on Map
              </Button>
            </Link>
            <Link href="/citizen/report" className="flex-1">
              <Button className="w-full flex items-center justify-center gap-2">
                Submit Another Report
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b bg-slate-50/50">
              <h2 className="font-semibold text-slate-800">Status Updates</h2>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="w-0.5 h-full bg-slate-200 my-1"></div>
                  </div>
                  <div className="pb-6">
                    <p className="font-medium text-slate-900 text-sm">Report Submitted</p>
                    <p className="text-xs text-slate-500 mt-1">{new Date(report.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                {report.status !== 'Pending' && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">Status Updated to {report.status}</p>
                      <p className="text-xs text-slate-500 mt-1">Recently</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
