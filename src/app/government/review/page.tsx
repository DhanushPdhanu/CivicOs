// src/app/government/review/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { CheckSquare, Check, X, ExternalLink, ShieldAlert, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { policyCopilotService } from '@/services/policyCopilotService'

export default function GovernmentReview() {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const recs = await policyCopilotService.generateRecommendation('critical civic issues needing attention')
        setRecommendations(recs)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchRecs()
  }, [])

  const handleApprove = (id: string) => {
    setRecommendations(prev => prev.filter(r => r.id !== id))
    addToast('Recommendation approved for implementation', 'success')
  }

  const handleReject = (id: string) => {
    setRecommendations(prev => prev.filter(r => r.id !== id))
    addToast('Recommendation returned for further review', 'info')
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3 mb-2">
            <CheckSquare className="text-primary-600" />
            Human Review & Decisions
          </h1>
          <p className="text-slate-500 font-medium">Final authorization gateway for AI-proposed civic policies.</p>
        </div>
        <Badge className="bg-amber-100 text-amber-800 border-amber-300 font-bold px-3 py-1 shadow-sm shrink-0">Demo Mode Active</Badge>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
        <div className="bg-blue-100 p-2 rounded-lg shrink-0 mt-0.5">
          <ShieldAlert className="text-blue-700" size={24} />
        </div>
        <div>
          <h4 className="font-bold text-blue-900">Human-in-the-Loop Required</h4>
          <p className="text-sm font-medium text-blue-800 mt-1 max-w-3xl">
            AI recommendations require human authorization before any government action. 
            Review the evidence, priority scores, and estimated impact before approving or returning proposals.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-5">
          {[1, 2].map(i => (
            <Card key={i} className="border-slate-200 animate-pulse">
              <CardContent className="h-48 bg-slate-50 rounded-xl"></CardContent>
            </Card>
          ))}
        </div>
      ) : recommendations.length === 0 ? (
        <Card className="text-center py-24 border-2 border-dashed border-slate-300 bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Check className="text-green-600" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">All Caught Up!</h3>
            <p className="text-slate-500 font-medium max-w-sm">No pending recommendations require review at this time. Great job keeping the city moving forward.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {recommendations.map(rec => (
            <Card key={rec.id || Math.random().toString()} className="border-slate-200 shadow-sm hover:shadow-md hover:border-primary-200 transition-all overflow-hidden bg-white">
              <CardContent className="p-0 flex flex-col md:flex-row">
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {rec.priorityScore >= 85 && (
                        <span className="flex items-center gap-1 text-xs font-bold bg-red-50 text-red-700 px-2.5 py-1 rounded-md border border-red-100">
                          <AlertTriangle size={12} /> HIGH PRIORITY
                        </span>
                      )}
                      <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">{typeof rec.location === 'string' ? rec.location : (rec.location?.district || rec.location?.address || 'Citywide')}</span>
                      <span className="text-xs font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-md border border-green-200">Score: {rec.priorityScore || 85}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{rec.title}</h3>
                    <p className="text-[15px] font-medium text-slate-600 leading-relaxed">{rec.description || 'Implement comprehensive infrastructure upgrades based on localized reporting trends.'}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <Link href={`/government/evidence?id=${rec.id}`} className="text-sm font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1.5 group">
                      <ExternalLink size={16} className="group-hover:scale-110 transition-transform" /> View Full Evidence Package
                    </Link>
                  </div>
                </div>
                
                <div className="bg-slate-50 flex md:flex-col justify-center gap-4 shrink-0 md:w-56 p-6 border-t md:border-t-0 md:border-l border-slate-100">
                  <div className="hidden md:block text-center mb-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Action Required</p>
                    <p className="text-sm font-medium text-slate-700">Approve to implement</p>
                  </div>
                  <Button 
                    onClick={() => handleApprove(rec.id)}
                    className="flex-1 md:flex-none bg-primary-600 hover:bg-primary-700 text-white font-bold h-12 shadow-sm flex items-center justify-center gap-2"
                  >
                    <Check size={18} /> Approve Policy
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleReject(rec.id)}
                    className="flex-1 md:flex-none border-slate-300 text-slate-700 hover:bg-slate-200 font-bold h-12 flex items-center justify-center gap-2"
                  >
                    <X size={18} /> Return for Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
