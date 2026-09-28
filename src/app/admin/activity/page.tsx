'use client'

import React, { useEffect, useState } from 'react'
import { adminService } from '@/services/adminService'
import type { AuditLog } from '@/services/adminService'

export default function AdminActivity() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await adminService.getAuditLogs()
      setLogs(data)
    }
    fetchLogs()
  }, [])

  const filteredLogs = logs.filter(log => filter === 'All' || log.type.toLowerCase() === filter.toLowerCase())

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">Platform Activity</h1>

      <div className="flex gap-2">
        {['All', 'User', 'AI', 'System'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${filter === f ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4 pl-2">
        {filteredLogs.map((log) => {
          const borderColor = log.type === 'user' ? 'border-green-500' 
                            : log.type === 'ai' ? 'border-blue-500' 
                            : 'border-gray-500'
          
          return (
            <div key={log.id} className={`pl-4 border-l-4 ${borderColor} py-2 bg-white rounded-r-md shadow-sm pr-4`}>
              <div className="flex justify-between items-start">
                <div className="font-medium text-gray-900">{log.action}</div>
                <div className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</div>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <span className="font-semibold text-gray-800">{log.actor}</span> — {log.details}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
