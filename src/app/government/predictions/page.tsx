// src/app/government/predictions/page.tsx
'use client'

import { useAppState } from '@/contexts/AppStateContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TrendingUp, AlertTriangle, Info, Calendar, ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export default function GovernmentPredictions() {
  const { predictions } = useAppState()

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-50 text-red-700 border-red-200'
      case 'HIGH': return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'MEDIUM': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      default: return 'bg-green-50 text-green-700 border-green-200'
    }
  }

  const getProgressColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-500'
      case 'HIGH': return 'bg-orange-500'
      case 'MEDIUM': return 'bg-yellow-500'
      default: return 'bg-green-500'
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3 mb-2">
            <TrendingUp className="text-primary-600" />
            Future Civic Risk Intelligence
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl">
            AI-powered forecasting based on historical citizen reports, infrastructure age, and demographic data. Use these insights for proactive resource allocation.
          </p>
        </div>
        <Badge className="bg-primary-50 text-primary-700 border-primary-200 font-bold px-3 py-1 shadow-sm shrink-0">
          DEMO FORECAST
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictions.map(prediction => (
          <Card key={prediction.id} className="bg-white border-slate-200 hover:shadow-lg hover:border-primary-200 transition-all group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-5">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getRiskColor(prediction.riskLevel)} flex items-center gap-1.5`}>
                  {prediction.riskLevel === 'CRITICAL' ? <ShieldAlert size={14} /> : <AlertTriangle size={14} />}
                  {prediction.riskLevel} RISK
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <Calendar size={14} />
                  {prediction.predictionWindow}
                </span>
              </div>
              
              <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight group-hover:text-primary-700 transition-colors">{prediction.title}</h3>
              <p className="text-sm font-medium text-slate-500 mb-5">{prediction.location.district} · {prediction.location.address}</p>

              <div className="mb-5 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-bold text-slate-700 uppercase tracking-wide">AI Confidence</span>
                  <span className="font-bold text-slate-900">{prediction.confidence}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getProgressColor(prediction.riskLevel)}`}
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Key Contributing Factors</p>
                <ul className="space-y-2">
                  {prediction.contributingFactors.slice(0, 3).map((factor, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2.5">
                      <span className="text-primary-500 font-bold mt-0.5">•</span>
                      <span className="leading-snug">{factor}</span>
                    </li>
                  ))}
                  {prediction.contributingFactors.length > 3 && (
                    <li className="text-xs font-medium text-slate-400 pl-4 mt-2">+ {prediction.contributingFactors.length - 3} more minor factors</li>
                  )}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link href={`/government/evidence?id=${prediction.id}`} className="block">
                  <Button variant="outline" className="w-full text-primary-600 border-primary-200 hover:bg-primary-50 hover:border-primary-300 font-medium group/btn">
                    <Info size={16} className="mr-2 text-primary-500 group-hover/btn:text-primary-600" />
                    Why this prediction?
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {predictions.length === 0 && (
          <div className="col-span-full p-16 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
            <TrendingUp size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700 mb-2">No Active Forecasts</h3>
            <p className="text-slate-500 max-w-md mx-auto">There are currently no significant civic risks forecasted for the upcoming periods based on our data models.</p>
          </div>
        )}
      </div>
    </div>
  )
}
