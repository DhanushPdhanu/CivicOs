'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, Role } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role: Role) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo users for mock authentication
const DEMO_USERS: { email: string; password: string; user: User }[] = [
  {
    email: 'citizen@demo.com',
    password: 'demo123',
    user: { id: 'USR-1', name: 'Rahul Sharma', email: 'citizen@demo.com', role: 'Citizen' },
  },
  {
    email: 'gov@demo.com',
    password: 'demo123',
    user: { id: 'USR-GOV-1', name: 'Dr. Priya Patel', email: 'gov@demo.com', role: 'Government' },
  },
  {
    email: 'admin@demo.com',
    password: 'demo123',
    user: { id: 'USR-ADMIN-1', name: 'System Admin', email: 'admin@demo.com', role: 'Admin' },
  },
];

const STORAGE_KEY = 'civicos_auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const user = JSON.parse(stored) as User;
        setState({ user, isAuthenticated: true, isLoading: false });
      } else {
        setState(s => ({ ...s, isLoading: false }));
      }
    } catch {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    const found = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found.user));
      setState({ user: found.user, isAuthenticated: true, isLoading: false });
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password. Try the demo credentials shown below.' };
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, role: Role) => {
    await new Promise(r => setTimeout(r, 800));

    // Check if email already exists
    if (DEMO_USERS.find(u => u.email === email)) {
      return { success: false, error: 'This email is already registered. Please log in instead.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // Create a new demo user
    const newUser: User = {
      id: `USR-NEW-${Date.now()}`,
      name,
      email,
      role,
    };

    DEMO_USERS.push({ email, password, user: newUser });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setState({ user: newUser, isAuthenticated: true, isLoading: false });
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
