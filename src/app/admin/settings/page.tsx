'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

export default function AdminSettings() {
  const { toast } = useToast()

  const handleClearData = () => {
    toast({
      title: 'Action Failed',
      description: 'Clear demo data requires backend implementation',
      variant: 'destructive'
    })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold">System Settings</h1>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md text-sm">
        Settings are in demo mode. Real configuration will be managed through the backend.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><h3 className="font-semibold">General Settings</h3></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-600">Platform Name</span>
              <span className="font-medium">CivicOS</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-600">Version</span>
              <span className="font-medium">0.1.0</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Environment</span>
              <span className="font-medium">Demo</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><h3 className="font-semibold">AI Configuration</h3></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-600">Model</span>
              <span className="font-medium">Demo Mode</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-600">Confidence Threshold</span>
              <span className="font-medium">75%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Auto-classify</span>
              <span className="text-primary-600 font-medium">Enabled</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><h3 className="font-semibold">Notifications</h3></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Email Notifications</span>
              <div className="w-10 h-6 bg-primary-600 rounded-full relative cursor-not-allowed opacity-70">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">SMS Alerts</span>
              <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-not-allowed opacity-70">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><h3 className="font-semibold">Data Management</h3></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-500 mb-4">Manage system data and demo state.</p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleClearData} className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                Clear demo data
              </Button>
              <Button variant="outline" className="w-full">
                Reset to defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
