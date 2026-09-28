'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { adminService } from '@/services/adminService'
import type { User } from '@/types'

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await adminService.getUsers()
      setUsers(data)
    }
    fetchUsers()
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'All' || user.role === roleFilter.toLowerCase()
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Badge variant="warning">DEMO MODE</Badge>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md text-sm">
        User management is in demo mode. Real user management will be available with the backend.
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="border border-border rounded-md px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary-500"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Citizen">Citizen</option>
          <option value="Government">Government</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'government' ? 'warning' : 'default'}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
                <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'government' ? 'warning' : 'default'}>
                  {user.role}
                </Badge>
              </div>
              <div><Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
