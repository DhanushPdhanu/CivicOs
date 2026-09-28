// src/app/government/evidence/page.tsx
'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Database, Activity, Target, Lightbulb, UserCheck, Check, ArrowRight, ShieldCheck, FileBarChart } from 'lucide-react'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function EvidenceContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  // Mock score breakdown data
  const scoreData = [
    { name: 'Demand', score: 85 },
    { name: 'Severity', score: 92 },
    { name: 'Urgency', score: 78 },
    { name: 'Impact', score: 88 },
    { name: 'Efficiency', score: 75 },
  ]

  const flowSteps = [
    { icon: Database, label: 'Data Source', desc: '450+ Reports', active: true },
    { icon: Activity, label: 'Analysis', desc: 'Pattern Match', active: true },
    { icon: Target, label: 'Scoring', desc: 'Risk Assessed', active: true },
    { icon: Lightbulb, label: 'Recommendation', desc: 'Generated', active: true },
    { icon: UserCheck, label: 'Human Review', desc: 'Pending Authorization', active: false },
  ]

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">AI Decision Evidence</h1>
            <Badge className="bg-slate-100 text-slate-600 border-slate-200 shadow-sm font-mono text-xs">ID: {id || 'EVD-9284'}</Badge>
          </div>
          <p className="text-slate-500 font-medium">Transparent audit trail for AI-generated policy recommendations.</p>
        </div>
        <Badge className="bg-amber-100 text-amber-800 border-amber-300 font-bold px-3 py-1.5 shadow-sm text-xs">
          DEMO DATA — NOT REAL STATISTICS
        </Badge>
      </div>

      {/* Audit Trail Flow */}
      <Card className="border-primary-100 shadow-md overflow-hidden bg-white">
        <div className="bg-primary-50 p-4 border-b border-primary-100 flex items-center gap-2">
          <ShieldCheck size={20} className="text-primary-700" />
          <h3 className="font-bold text-primary-900 tracking-wide uppercase text-sm">Decision Audit Trail</h3>
        </div>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
            {/* Background connecting lines */}
            <div className="hidden md:block absolute left-[10%] right-[10%] top-6 h-1 bg-slate-100 -z-10 rounded-full"></div>
            <div className="hidden md:block absolute left-[10%] right-[30%] top-6 h-1 bg-primary-400 -z-10 rounded-full"></div>
            
            {flowSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="flex flex-col items-center gap-3 z-10 w-full md:w-40 relative group">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 shadow-sm transition-transform group-hover:scale-110 ${step.active ? 'bg-primary-600 border-primary-100 text-white shadow-primary-200' : 'bg-white border-slate-200 text-slate-400'}`}>
                    <Icon size={24} />
                  </div>
                  <div className="text-center">
                    <p className={`text-[15px] font-bold ${step.active ? 'text-slate-900' : 'text-slate-500'}`}>{step.label}</p>
                    <p className={`text-xs font-medium mt-1 ${step.active ? 'text-primary-600' : 'text-slate-400'}`}>{step.desc}</p>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="md:hidden h-10 w-1 bg-slate-100 my-2 rounded-full relative">
                       {step.active && flowSteps[i+1].active && <div className="absolute inset-0 bg-primary-400 rounded-full"></div>}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-slate-200 shadow-sm h-full flex flex-col">
          <CardHeader title="Why This Recommendation?" icon={<FileBarChart className="text-primary-600" size={20} />} className="border-b border-slate-100" />
          <CardContent className="p-6 flex-1 flex flex-col justify-center space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 shadow-inner">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Report Count</p>
                <p className="text-3xl font-black text-slate-800">452</p>
                <p className="text-sm text-red-600 font-bold mt-2 flex items-center gap-1">↑ +45% this month</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 shadow-inner">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Population Impact</p>
                <p className="text-3xl font-black text-slate-800">12.5k</p>
                <p className="text-sm text-orange-600 font-bold mt-2">High density area</p>
              </div>
              <div className="col-span-2 p-5 bg-primary-50 rounded-xl border border-primary-100">
                <p className="text-xs text-primary-700 uppercase font-bold tracking-wider mb-2 flex items-center gap-2"><Lightbulb size={14}/> Key Finding</p>
                <p className="text-[15px] font-medium text-slate-800 leading-relaxed">Significant infrastructure gap detected by combining historical maintenance records with a sudden 45% spike in citizen reports concerning structural integrity in District 4.</p>
              </div>
            </div>
            
            <div className="pt-2 text-xs text-slate-400 font-medium">
              Data source: CivicOS Citizen Reports API, Demographics DB (Updated: 2h ago)
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm h-full flex flex-col">
          <CardHeader title="Priority Score Breakdown" className="border-b border-slate-100" />
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="h-64 w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#334155', fontWeight: 700 }} width={80} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="score" fill="#16a34a" radius={[0, 6, 6, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 pt-5 border-t border-slate-100 flex justify-between items-center bg-slate-50 p-4 rounded-xl">
              <span className="text-slate-600 font-bold uppercase text-xs tracking-wider">Overall AI Confidence</span>
              <span className="font-black text-primary-700 text-2xl">91.4%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
        <Link href="/government/review">
          <Button className="bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-2 px-6 py-6 h-auto text-[15px] font-bold shadow-md hover:shadow-lg transition-all rounded-xl">
            Proceed to Human Review <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function GovernmentEvidence() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
        <div className="text-slate-500 font-medium">Loading evidence package...</div>
      </div>
    }>
      <EvidenceContent />
    </Suspense>
  )
}
