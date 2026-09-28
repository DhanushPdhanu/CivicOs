// src/app/government/map/page.tsx
'use client'

import { useState } from 'react'
import { useAppState } from '@/contexts/AppStateContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SeverityBadge } from '@/components/ui/Badge'
import { Search, RefreshCw, PanelRightClose, PanelRightOpen, MapPin, Users, Info } from 'lucide-react'

export default function GovernmentMap() {
  const { hotspots } = useAppState()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [severityFilter, setSeverityFilter] = useState('ALL')
  const [showSidebar, setShowSidebar] = useState(true)

  const filteredHotspots = hotspots.filter(h => {
    const matchesSearch = h.category.toLowerCase().includes(searchTerm.toLowerCase()) || h.district.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'ALL' || h.category === categoryFilter
    const matchesSeverity = severityFilter === 'ALL' || h.severity === severityFilter
    return matchesSearch && matchesCategory && matchesSeverity
  })

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] relative bg-slate-50">
      <div className="hidden md:flex p-4 bg-white border-b border-slate-200 z-10 items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="text-primary-600" /> Civic Need Map
        </h1>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
          <Info size={14} /> DEMO DATA — Mock Map Visualization
        </div>
      </div>
      
      <div className="flex p-3 bg-white border-b border-slate-200 z-10 gap-3 overflow-x-auto items-center shadow-sm">
        <div className="relative min-w-[200px] flex-1 md:flex-none md:w-64">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <Input 
            placeholder="Search districts or categories..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-9 rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 focus:ring-1 focus:ring-primary-500 outline-none min-w-[140px]"
        >
          <option value="ALL">All Categories</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Public Safety">Public Safety</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Transport">Transport</option>
        </select>
        
        <select 
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="h-9 rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 focus:ring-1 focus:ring-primary-500 outline-none min-w-[140px]"
        >
          <option value="ALL">All Severities</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            setSearchTerm(''); setCategoryFilter('ALL'); setSeverityFilter('ALL');
          }}
          className="h-9 whitespace-nowrap text-slate-600"
        >
          <RefreshCw size={14} className="mr-2" /> Reset
        </Button>

        <div className="ml-auto flex items-center shrink-0">
          <button 
            className="hidden md:flex p-2 hover:bg-slate-100 rounded-md text-slate-600 transition-colors"
            onClick={() => setShowSidebar(!showSidebar)}
            title="Toggle Sidebar"
          >
            {showSidebar ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 relative overflow-hidden bg-slate-100">
          {/* Mock Map Background */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            opacity: 0.3
          }}></div>
          
          <div className="absolute inset-0">
            {filteredHotspots.map((hotspot, i) => {
              // Pseudo-random but deterministic positions for demo map based on index
              const top = 15 + ((i * 37) % 70)
              const left = 15 + ((i * 53) % 70)
              
              const isCritical = hotspot.severity === 'CRITICAL'
              const color = isCritical ? 'bg-red-500' : hotspot.severity === 'HIGH' ? 'bg-orange-500' : hotspot.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'
              
              return (
                <div 
                  key={hotspot.id} 
                  className="absolute group cursor-pointer"
                  style={{ top: `${top}%`, left: `${left}%` }}
                >
                  <div className={`w-5 h-5 rounded-full ${color} border-2 border-white shadow-md z-10 relative ${isCritical ? 'animate-pulse' : 'hover:scale-110 transition-transform'}`}></div>
                  {isCritical && (
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-60"></div>
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-white p-4 rounded-xl shadow-xl border border-slate-200 z-50 text-sm">
                    <div className="flex justify-between items-start mb-2">
                      <strong className="text-slate-900 font-bold">{hotspot.category}</strong>
                      <SeverityBadge severity={hotspot.severity} />
                    </div>
                    <p className="text-slate-600 text-xs mb-3 flex items-center gap-1"><MapPin size={12}/> {hotspot.district}</p>
                    <div className="flex justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                      <span className="font-medium bg-slate-100 px-2 py-1 rounded">{hotspot.reportCount} reports</span>
                      <span className={`px-2 py-1 rounded font-medium ${hotspot.trend === 'up' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                        {hotspot.trend === 'up' ? '↑ Rising' : '↓ Falling'}
                      </span>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-slate-200 transform rotate-45"></div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-200 text-xs z-20 w-40">
            <h4 className="font-bold text-slate-800 mb-3 uppercase tracking-wider">Severity</h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-red-500 shadow-sm animate-pulse"></div><span className="font-medium text-slate-700">Critical</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm"></div><span className="font-medium text-slate-700">High</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div><span className="font-medium text-slate-700">Medium</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div><span className="font-medium text-slate-700">Low</span></div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`
          hidden md:block bg-white border-l border-slate-200 w-80 lg:w-96 overflow-y-auto transition-transform duration-300 ease-in-out shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)]
          ${showSidebar ? 'translate-x-0' : 'translate-x-full absolute right-0 top-0 bottom-0 opacity-0'}
        `}>
          <div className="p-4 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10">
            <h3 className="font-bold text-slate-800 flex items-center justify-between">
              Active Hotspots
              <span className="bg-primary-100 text-primary-700 py-0.5 px-2 rounded-full text-xs">{filteredHotspots.length}</span>
            </h3>
          </div>
          <div className="p-3 space-y-3">
            {filteredHotspots.length > 0 ? (
              filteredHotspots.map(hotspot => (
                <div key={hotspot.id} className="p-4 border border-slate-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all cursor-pointer bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-slate-900 text-sm">{hotspot.category}</span>
                    <SeverityBadge severity={hotspot.severity} />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                    <MapPin size={14} className="text-slate-400" /> {hotspot.district}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium"><Users size={14} className="text-slate-400" /> {hotspot.populationAffected?.toLocaleString() || '12,500'} affected</span>
                    <span className="font-bold bg-slate-100 px-2 py-1 rounded text-slate-700">{hotspot.reportCount} reports</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 flex flex-col items-center justify-center">
                <MapPin size={32} className="text-slate-300 mb-2" />
                <p className="text-sm">No hotspots found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
