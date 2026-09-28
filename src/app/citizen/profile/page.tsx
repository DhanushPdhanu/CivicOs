'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useAppState } from '@/contexts/AppStateContext'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Settings, Bell, Lock, User as UserIcon, Info } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()
  const { reports } = useAppState()
  
  const myReportsCount = reports.filter(r => r.userId === 'USR-1').length
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'U'

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="text-center">
            <CardContent className="pt-8 pb-6">
              <div className="w-24 h-24 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                {initials}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
              <p className="text-slate-500 text-sm mb-4">{user?.email}</p>
              <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium mb-6">
                {user?.role}
              </div>
              
              <div className="border-t pt-4 text-left">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-slate-600">Total Reports</span>
                  <span className="font-bold text-slate-900">{myReportsCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50/50 border-blue-100">
            <CardContent className="p-4 flex gap-3">
              <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                <strong>Demo Mode:</strong> You are using a demo account. Settings updates will not be saved permanently.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b bg-slate-50/50">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <UserIcon className="w-5 h-5" /> Personal Information
              </h2>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" disabled value={user?.name || ''} className="w-full px-3 py-2 border rounded-md bg-slate-50 text-slate-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input type="email" disabled value={user?.email || ''} className="w-full px-3 py-2 border rounded-md bg-slate-50 text-slate-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input type="tel" disabled value="+1 (555) 123-4567" className="w-full px-3 py-2 border rounded-md bg-slate-50 text-slate-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Home Address</label>
                  <input type="text" disabled value="123 Demo Street, City" className="w-full px-3 py-2 border rounded-md bg-slate-50 text-slate-500" />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button disabled variant="outline">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b bg-slate-50/50">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <Bell className="w-5 h-5" /> Notifications
              </h2>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {[
                { label: 'Email updates when my report status changes', checked: true },
                { label: 'SMS alerts for urgent community issues', checked: false },
                { label: 'Weekly digest of resolved problems', checked: true }
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">{setting.label}</span>
                  <div className={`w-10 h-5 rounded-full relative cursor-not-allowed ${setting.checked ? 'bg-primary-600' : 'bg-slate-200'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${setting.checked ? 'left-5' : 'left-0.5'}`}></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
