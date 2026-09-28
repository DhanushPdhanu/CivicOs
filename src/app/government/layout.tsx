// src/app/government/layout.tsx
'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Map, TrendingUp, BrainCircuit, ShieldCheck, CheckSquare, Menu, X } from 'lucide-react'

export default function GovernmentLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading...</div>

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Access Denied</h2>
        <p className="mb-4 text-slate-600">You must be logged in to access this area.</p>
        <Link href="/login" className="bg-primary-600 text-white px-5 py-2.5 rounded-md hover:bg-primary-700 transition-colors">
          Go to Login
        </Link>
      </div>
    )
  }

  if (user?.role !== 'Government' && user?.role !== 'Admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-destructive">Restricted Area</h2>
        <p className="mb-4 text-slate-600">You do not have permission to view this page. Government role required.</p>
        <Link href="/" className="bg-slate-200 text-slate-800 px-5 py-2.5 rounded-md hover:bg-slate-300 transition-colors">
          Return Home
        </Link>
      </div>
    )
  }

  const navLinks = [
    { href: '/government', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/government/reports', label: 'Reports', icon: FileText },
    { href: '/government/map', label: 'Civic Map', icon: Map },
    { href: '/government/predictions', label: 'Risk Intel', icon: TrendingUp },
    { href: '/government/copilot', label: 'AI Copilot', icon: BrainCircuit },
    { href: '/government/evidence', label: 'Evidence', icon: ShieldCheck },
    { href: '/government/review', label: 'Review', icon: CheckSquare },
  ]

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-50 relative">
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed bottom-6 right-6 z-50 bg-primary-600 text-white p-3.5 rounded-full shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        absolute md:relative inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Command Center</h2>
          <p className="text-sm text-slate-500 font-medium">Government Portal</p>
        </div>
        <nav className="p-4 space-y-1.5 overflow-y-auto h-[calc(100%-80px)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/government')
            const Icon = link.icon
            return (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-primary-600' : 'text-slate-400'} />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-slate-50">
        {children}
      </div>
    </div>
  )
}
