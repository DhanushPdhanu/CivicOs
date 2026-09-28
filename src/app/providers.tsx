'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { AppStateProvider } from '@/contexts/AppStateContext';
import { ToastProvider } from '@/components/ui/Toast';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppStateProvider>
        <ToastProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </AppStateProvider>
    </AuthProvider>
  );
}
