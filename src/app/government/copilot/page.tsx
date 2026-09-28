// src/app/government/copilot/page.tsx
'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import {
  BrainCircuit, Send, User, Sparkles, Activity, Map,
  FileText, RefreshCw, Zap
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────────

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// ── Suggested prompts ──────────────────────────────────────────────────────────

const SUGGESTED_PROMPTS = [
  { text: 'What are the most urgent infrastructure issues right now?',         icon: Activity },
  { text: 'Recommend flood risk mitigation policies for Demo District A.',     icon: Map      },
  { text: 'Where should we invest ₹100 crore for maximum citizen impact?',    icon: Sparkles },
  { text: 'Which civic categories have seen the biggest increase in reports?', icon: FileText },
  { text: 'Suggest a 6-month action plan for waste management in District B.', icon: Zap      },
]

// ── Smart response engine ──────────────────────────────────────────────────────

function generateResponse(query: string): string {
  const q = query.toLowerCase()

  // ── Urgent / infrastructure issues ──
  if (q.includes('urgent') || q.includes('infrastructure') || q.includes('most') && q.includes('issue')) {
    return `URGENT INFRASTRUCTURE ISSUES — CURRENT SNAPSHOT

Based on 1,050+ citizen reports across all districts, here are the top priority concerns:

1. Drainage Overload — Demo District A (CRITICAL)
   • 4,821 reports in the last 30 days, 38% month-over-month spike
   • Affecting ~82,000 residents during monsoon season
   • Estimated repair cost: ₹25–30 Crore

2. Waste Management Failure — Demo District B (CRITICAL)
   • Overflow at 12 collection points, 44% rise in complaints
   • Impacting ~42,000 residents; disease risk elevated
   • Estimated cost: ₹14–18 Crore

3. Healthcare Access Gap — Demo District C (HIGH)
   • 2,494 reports flagging overcrowded clinics and medicine shortages
   • Affects ~17,000 residents; elderly population most at risk
   • Estimated cost: ₹19 Crore for new facility

4. Electricity Outages — Demo District D (HIGH)
   • Frequent power cuts reported; 3,026 reports
   • Affecting ~15,600 residents including small businesses

RECOMMENDED IMMEDIATE ACTION:
• Deploy emergency drainage pumps in District A within 48 hours
• Increase waste collection frequency in District B to daily pickups
• Fast-track healthcare procurement for District C
• Coordinate with DISCOM for grid reinforcement in District D`
  }

  // ── Flood risk / District A ──
  if (q.includes('flood') || (q.includes('district a') && q.includes('drainage'))) {
    return `FLOOD RISK MITIGATION POLICY — DEMO DISTRICT A

Current Risk Level: CRITICAL | Confidence: 82% | Window: 1–3 months

SITUATION ANALYSIS:
• 4,821 drainage-related reports in the last month (38% spike)
• Main Street near Central Park is the primary flood-prone zone
• 82,000 residents at risk; 6 schools and 2 hospitals in the affected corridor

RECOMMENDED POLICY ACTIONS:

Immediate (0–2 weeks):
• Deploy 8 high-capacity drainage pumps at identified bottleneck points
• Clear all storm drains — estimated 3 days with 2 crews
• Issue public advisory for low-lying areas

Short-Term (1–3 months):
• Widen drainage channels along Main Street — ₹8 Crore
• Install 4 automated rain sensors for real-time flood alerts
• Create a temporary emergency shelter at Community Hall

Medium-Term (3–6 months):
• Commission full drainage master plan for District A — ₹25 Crore total
• Build retention pond at northern end of Central Park
• Partner with NDMA for flood-proofing grants

EXPECTED OUTCOME:
65% reduction in flood incidents within 6 months.
Population directly protected: 82,000 residents.`
  }

  // ── ₹100 crore investment ──
  if (q.includes('100 crore') || q.includes('invest') || q.includes('₹100')) {
    return `OPTIMAL ₹100 CRORE INVESTMENT PLAN — MAXIMUM CITIZEN IMPACT

Analysis based on population impact, urgency scores, and cost-efficiency across all districts.

RECOMMENDED ALLOCATION:

1. Drainage Infrastructure — District A  →  ₹30 Crore  (Priority Score: 94/100)
   • Affects 82,000 residents
   • Expected: 65% reduction in flood incidents
   • ROI: Highest — prevents ₹80Cr annual disaster losses

2. Waste Management Overhaul — District B  →  ₹20 Crore  (Score: 83/100)
   • Affects 42,000 residents
   • New smart bins, 3 new collection centres
   • Expected: 70% reduction in overflow complaints

3. Healthcare Capacity — District C  →  ₹25 Crore  (Score: 80/100)
   • New 50-bed community health centre
   • Affects 17,000 residents directly; entire district indirectly
   • Reduces emergency referrals by 40%

4. Electricity Grid Upgrade — District D  →  ₹15 Crore  (Score: 86/100)
   • Smart grid sensors + transformer replacement
   • Reduces outages by 80% for 15,600 residents

5. Reserve / Emergency Fund  →  ₹10 Crore
   • For rapid response to new hotspots

TOTAL POPULATION BENEFITED: ~520,000 residents
EXPECTED REPORT REDUCTION: 55% within 12 months
PRIORITY: Start with Drainage (District A) — highest urgency.`
  }

  // ── Category trends / increase in reports ──
  if (q.includes('categor') || q.includes('increase') || q.includes('trend') || q.includes('biggest')) {
    return `CIVIC CATEGORY TREND ANALYSIS — LAST 30 DAYS

Based on 1,050+ reports, here is the growth breakdown by category:

FASTEST GROWING (Month-over-Month):

1. Drainage  →  +38% spike  🔴 CRITICAL
   • 4,821 new reports — highest volume category
   • Concentrated in District A and District D

2. Waste Management  →  +44% spike  🔴 CRITICAL
   • 4,691 new reports — second highest
   • Districts B and C most affected

3. Water Supply  →  +22% rise  🟠 HIGH
   • 4,130 reports — contamination and shortage complaints
   • District C and B primary hotspots

4. Electricity  →  +27% rise  🟠 HIGH
   • 3,026 reports — power cuts and transformer failures
   • District A and D

5. Roads  →  +18% rise  🟡 MEDIUM
   • 2,108 reports — potholes and road damage post-monsoon

6. Healthcare  →  +14% rise  🟡 MEDIUM
   • 2,494 reports — clinic overcrowding, medicine shortages

INSIGHT: Drainage and Waste have seen the sharpest rises — both correlate with monsoon season and population growth in Districts A and B. Immediate intervention recommended.`
  }

  // ── Waste management action plan ──
  if (q.includes('waste') || q.includes('6-month') || q.includes('action plan')) {
    return `6-MONTH WASTE MANAGEMENT ACTION PLAN — DEMO DISTRICT B

Current Status: CRITICAL | 4,691 reports | 44% monthly spike

PHASE 1 — IMMEDIATE STABILISATION (Month 1–2)
• Increase waste collection frequency from 3x to 7x per week
• Deploy 6 additional garbage trucks (₹3 Crore lease)
• Emergency deep-clean of 12 overflow hotspots
• Set up 3 temporary waste transfer stations
• Launch citizen awareness campaign via SMS + WhatsApp

PHASE 2 — INFRASTRUCTURE UPGRADE (Month 3–4)
• Install 200 smart sensor-equipped bins across District B (₹4 Crore)
• Build 1 new waste processing facility — capacity 80 tonnes/day (₹8 Crore)
• Partner with 2 NGOs for door-to-door segregation training
• Introduce wet/dry waste segregation with penalty enforcement

PHASE 3 — SUSTAINABLE SYSTEMS (Month 5–6)
• Launch composting program for organic waste — reduces landfill by 40%
• Introduce waste-to-energy pilot for 10% of collected waste (₹3 Crore)
• Monthly public dashboard showing district cleanliness score
• Train 50 local waste management workers

BUDGET SUMMARY:
• Total estimated cost: ₹18–20 Crore
• Expected complaint reduction: 70% by Month 6
• Population benefited: 42,000 directly, ~120,000 indirectly

SUCCESS METRICS: Report volume, collection efficiency %, citizen satisfaction score.`
  }

  // ── Cost implications ──
  if (q.includes('cost') || q.includes('implication') || q.includes('budget')) {
    return `COST IMPLICATIONS ANALYSIS

Based on the current civic data and recommended interventions:

SHORT-TERM COSTS (0–3 months):
• Emergency drainage pumps & clearing — ₹3–5 Crore
• Additional waste collection trucks — ₹2–4 Crore
• Electricity emergency repairs — ₹1–2 Crore
• Total immediate outlay: ~₹6–11 Crore

MEDIUM-TERM INVESTMENTS (3–12 months):
• Drainage infrastructure upgrades — ₹25–30 Crore
• Waste management overhaul — ₹14–20 Crore
• Healthcare facility expansion — ₹19–25 Crore
• Smart grid electricity upgrade — ₹15 Crore
• Total: ~₹73–90 Crore

COST OF INACTION (estimated annual losses):
• Flood damage to property/roads — ₹80 Crore/year
• Healthcare burden from poor sanitation — ₹15 Crore/year
• Productivity loss from power cuts — ₹10 Crore/year
• Total inaction cost: ~₹105 Crore/year

CONCLUSION: Investing ₹100 Crore now saves ~₹105 Crore/year in losses.
ROI turns positive within 11–14 months.`
  }

  // ── District risk ──
  if (q.includes('district') && (q.includes('risk') || q.includes('affected'))) {
    return `DISTRICT RISK ASSESSMENT — CURRENT RANKINGS

🔴 CRITICAL RISK:
• Demo District A — Drainage & Flooding
  Reports: 4,821 | Population at risk: 82,000 | Trend: +38%

• Demo District B — Waste Management
  Reports: 4,691 | Population at risk: 42,000 | Trend: +44%

🟠 HIGH RISK:
• Demo District C — Healthcare & Water Supply
  Reports: 6,624 combined | Population at risk: 58,000 | Trend: +18%

• Demo District D — Electricity & Roads
  Reports: 5,134 combined | Population at risk: 96,000 | Trend: +27%

OVERALL RANKING (worst to best):
1. District A — Drainage crisis is most immediately dangerous
2. District B — Waste overflow poses significant public health risk
3. District D — Electricity issues affect largest population
4. District C — Healthcare gap is serious but slower-developing

RECOMMENDATION: Focus emergency resources on Districts A and B immediately.`
  }

  // ── 3-month plan ──
  if (q.includes('3-month') || q.includes('three month') || q.includes('quarterly')) {
    return `3-MONTH CIVIC IMPROVEMENT PLAN — ALL DISTRICTS

MONTH 1 — EMERGENCY RESPONSE:
• District A: Deploy drainage pumps, clear storm drains (₹5 Crore)
• District B: Daily waste collection, emergency deep-clean (₹3 Crore)
• District C: Procure medicines, add 10 temporary healthcare staff (₹2 Crore)
• District D: Emergency transformer repairs, 24/7 maintenance crew (₹2 Crore)

MONTH 2 — STABILISATION:
• District A: Begin channel widening at 3 critical points (₹8 Crore)
• District B: Install smart bins, open transfer stations (₹4 Crore)
• District C: Launch mobile health clinic for 5 underserved areas (₹3 Crore)
• District D: Smart meter rollout for 5,000 households (₹3 Crore)

MONTH 3 — SUSTAINABLE PROGRESS:
• All districts: Launch citizen feedback dashboard
• District A: Retention pond construction begins (₹10 Crore)
• District B: Waste-to-compost pilot launched (₹2 Crore)
• District C: Telehealth kiosk installation (₹1 Crore)
• District D: Grid load balancing system installed (₹2 Crore)

TOTAL 3-MONTH BUDGET: ~₹45 Crore
EXPECTED REPORT REDUCTION: 35% by end of Month 3`
  }

  // ── General / fallback ──
  return `CIVIC INTELLIGENCE SUMMARY — CivicOS AI COPILOT

Based on your query: "${query}"

Here is what the current civic data shows:

KEY FINDINGS:
• 1,050+ active citizen reports across 4 districts
• Top 3 problem categories: Drainage (28%), Waste (22%), Water Supply (18%)
• 3 CRITICAL risk zones identified — Districts A, B, and C
• ~520,000 residents currently affected by ongoing civic issues

IMMEDIATE PRIORITIES:
1. Demo District A — Drainage infrastructure (82,000 affected)
2. Demo District B — Waste management overhaul (42,000 affected)
3. Demo District C — Healthcare capacity expansion (17,000 affected)

RECOMMENDED NEXT STEPS:
• Review the Risk Intelligence dashboard for detailed forecasts
• Check the Hotspot Map for geographic concentration of issues
• Use the Evidence Centre for data-backed justification of budget proposals

For more specific guidance, try asking:
• "Where should we invest ₹100 crore?"
• "Suggest a 6-month action plan for waste management"
• "What are the most urgent infrastructure issues?"`
}

// ── Text formatter ─────────────────────────────────────────────────────────────

function FormattedText({ text }: { text: string }) {
  return (
    <div className="space-y-1.5">
      {text.split('\n').map((line, i) => {
        const t = line.trim()
        if (!t) return <div key={i} className="h-1" />
        if (/^\d+\.\s/.test(t))
          return <p key={i} className="text-[15px] text-slate-700 leading-relaxed pl-3">{t}</p>
        if (/^[•\-\*]\s/.test(t))
          return (
            <p key={i} className="text-[15px] text-slate-700 leading-relaxed pl-3 flex gap-2">
              <span className="text-primary-500 shrink-0 font-bold">•</span>
              <span>{t.replace(/^[•\-\*]\s/, '')}</span>
            </p>
          )
        if (t === t.toUpperCase() && t.length > 4 && t.length < 80)
          return <p key={i} className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-4 first:mt-0">{t}</p>
        if (t.endsWith(':') && t.length < 60)
          return <p key={i} className="text-sm font-bold text-slate-800 mt-3 first:mt-0">{t}</p>
        return <p key={i} className="text-[15px] text-slate-700 leading-relaxed">{t}</p>
      })}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function GovernmentCopilot() {
  const [query,     setQuery]     = useState('')
  const [messages,  setMessages]  = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendQuery = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return

    setMessages(prev => [...prev, { role: 'user', content: text.trim(), timestamp: new Date() }])
    setQuery('')
    setIsLoading(true)

    // Simulate AI thinking delay
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600))

    const reply = generateResponse(text)
    setMessages(prev => [...prev, { role: 'assistant', content: reply, timestamp: new Date() }])
    setIsLoading(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [isLoading])

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendQuery(query) }
  const clearChat = () => { setMessages([]); setQuery(''); inputRef.current?.focus() }

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">

      {/* Header */}
      <div className="px-5 md:px-6 py-4 bg-white border-b border-slate-200 shrink-0 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="bg-primary-100 p-2 rounded-lg shrink-0">
            <BrainCircuit className="text-primary-600" size={22} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-900 truncate">AI Policy Copilot</h1>
            <p className="text-xs text-slate-500 hidden sm:block">Civic intelligence · Data-driven policy recommendations</p>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </span>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearChat}
            className="shrink-0 text-slate-500 flex items-center gap-1.5">
            <RefreshCw size={14} />
            <span className="hidden sm:inline">New Chat</span>
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto text-center space-y-8 py-8">
            <div className="space-y-3">
              <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-primary-100">
                <BrainCircuit size={40} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">How can I assist your civic planning?</h2>
              <p className="text-slate-500 max-w-lg mx-auto text-sm">
                I analyse 1,050+ citizen reports across 4 districts and generate actionable policy recommendations for government officials.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {SUGGESTED_PROMPTS.map((q, i) => {
                const Icon = q.icon
                return (
                  <button key={i} onClick={() => sendQuery(q.text)} disabled={isLoading}
                    className="flex items-start gap-3 p-4 text-left bg-white border border-slate-200 rounded-xl hover:border-primary-400 hover:shadow-md hover:-translate-y-0.5 transition-all group disabled:opacity-50 disabled:cursor-not-allowed">
                    <div className="bg-primary-50 p-2 rounded-lg group-hover:bg-primary-100 transition-colors shrink-0">
                      <Icon size={16} className="text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 mt-0.5 group-hover:text-slate-900 leading-snug">{q.text}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6 pb-4 pt-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 border border-primary-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <BrainCircuit size={18} />
                  </div>
                )}
                <div className={`max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-1`}>
                  {msg.role === 'user' ? (
                    <div className="bg-primary-600 text-white px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-md">
                      <p className="text-[15px] font-medium leading-relaxed">{msg.content}</p>
                    </div>
                  ) : (
                    <div className="px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm border bg-white border-slate-100 w-full">
                      <FormattedText text={msg.content} />
                    </div>
                  )}
                  <span className="text-[11px] text-slate-400 px-1">{formatTime(msg.timestamp)}</span>
                </div>
                {msg.role === 'user' && (
                  <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 shadow-sm border border-slate-300 mt-1">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 border border-primary-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <BrainCircuit size={18} />
                </div>
                <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 flex items-center gap-2">
                  <span className="text-sm text-slate-500 font-medium">Analysing civic data</span>
                  <div className="flex gap-1.5 ml-1">
                    {[0, 150, 300].map(d => (
                      <div key={d} className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Follow-up chips */}
            {!isLoading && messages.length >= 2 && messages[messages.length - 1].role === 'assistant' && (
              <div className="flex flex-wrap gap-2 pt-1">
                {['What are the cost implications?', 'Which district is most at risk?', 'Show a 3-month action plan'].map(s => (
                  <button key={s} onClick={() => sendQuery(s)}
                    className="text-xs font-medium text-primary-700 bg-primary-50 border border-primary-200 px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 md:px-6 py-4 bg-white border-t border-slate-200 shrink-0 shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.05)]">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3 items-center">
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ask the AI Copilot for policy recommendations…"
            disabled={isLoading}
            className="flex-1 rounded-2xl px-5 bg-slate-50 border border-slate-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 focus:outline-none py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 transition-colors disabled:opacity-60"
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendQuery(query) } }}
          />
          <Button type="submit" disabled={!query.trim() || isLoading}
            className="shrink-0 rounded-xl w-11 h-11 p-0 bg-primary-600 hover:bg-primary-700 flex items-center justify-center shadow-sm disabled:opacity-50">
            <Send size={18} className="text-white translate-x-[1px]" />
          </Button>
        </form>
        <p className="text-center text-[11px] text-slate-400 mt-2.5">
          AI recommendations are based on demo civic data · Always verify before implementation
        </p>
      </div>
    </div>
  )
}
