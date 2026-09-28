'use client'

import React, { useEffect, useState } from 'react'
import { adminService } from '@/services/adminService'
import type { AuditLog } from '@/services/adminService'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await adminService.getAuditLogs()
      const sorted = [...data].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      setLogs(sorted)
    }
    fetchLogs()
  }, [])

  const handleExport = () => {
    toast({
      title: 'Export Failed',
      description: 'Export feature requires backend connection',
      variant: 'destructive'
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Audit Trail</h1>
          <Badge variant="warning">DEMO DATA</Badge>
        </div>
        <Button onClick={handleExport}>Export Logs</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={
                    log.type === 'user' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                    log.type === 'ai' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                    'bg-gray-100 text-gray-800 hover:bg-gray-100'
                  }>
                    {log.type}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.action}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.actor}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate" title={log.details}>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
