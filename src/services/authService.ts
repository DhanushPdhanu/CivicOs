import type { User, Role } from '../types';

// This service is a frontend-only mock.
// Tomorrow's backend should replace this with real auth endpoints.
export const authService = {
  async login(email: string, password: string): Promise<{ user: User } | { error: string }> {
    await new Promise(r => setTimeout(r, 800));
    // In production: POST /api/auth/login
    return { error: 'Backend not connected. Use AuthContext mock login.' };
  },

  async register(name: string, email: string, password: string, role: Role): Promise<{ user: User } | { error: string }> {
    await new Promise(r => setTimeout(r, 800));
    // In production: POST /api/auth/register
    return { error: 'Backend not connected. Use AuthContext mock register.' };
  },

  async logout(): Promise<void> {
    // In production: POST /api/auth/logout
  },

  async getCurrentUser(): Promise<User | null> {
    // In production: GET /api/auth/me
    return null;
  },
};
