'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, FileText, Activity, ScrollText, Settings, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="mb-6">You must be logged in to access the admin area.</p>
          <Link href="/login" className="text-primary-600 hover:underline">Go to Login</Link>
        </div>
      </div>
    )
  }

  if (user?.role !== 'Admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6">You do not have permission to view this page.</p>
          <Link href={user?.role === 'Government' ? '/government' : user?.role === 'Citizen' ? '/citizen' : '/'} className="text-primary-600 hover:underline">Return to Dashboard</Link>
        </div>
      </div>
    )
  }

  const links = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/reports', label: 'Reports', icon: FileText },
    { href: '/admin/activity', label: 'Activity', icon: Activity },
    { href: '/admin/audit-logs', label: 'Audit Logs', icon: ScrollText },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-border
        transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <h1 className="text-xl font-bold text-primary-600">Admin Portal</h1>
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900'}
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-border flex items-center px-4 lg:hidden">
          <Button variant="ghost" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </Button>
          <span className="ml-4 font-semibold">Admin Portal</span>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
