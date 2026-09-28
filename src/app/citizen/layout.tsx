'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'

export default function CitizenLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-bold mb-2">Authentication Required</h2>
            <p className="text-slate-600 mb-6">Please log in to access the citizen portal.</p>
            <Link href="/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (user?.role !== 'Citizen') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-bold mb-2 text-destructive">Access Denied</h2>
            <p className="text-slate-600 mb-6">You do not have permission to access the citizen portal.</p>
            <Link href={user?.role === 'Government' ? '/government' : '/admin'}>
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <div className="min-h-screen bg-slate-50">{children}</div>
}
