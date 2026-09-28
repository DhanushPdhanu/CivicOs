'use client';

import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
}

export interface ToastFunction {
  (messageOrOptions: string | ToastOptions, typeOrVariant?: ToastType): void;
  success?: (message: string) => void;
  error?: (message: string) => void;
  info?: (message: string) => void;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  addToast: (message: string, type?: ToastType) => void;
  toast: ToastFunction;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    showToast(message, type);
  }, [showToast]);

  const toastHandler = useCallback((messageOrOptions: string | ToastOptions, typeOrVariant?: ToastType) => {
    if (typeof messageOrOptions === 'string') {
      showToast(messageOrOptions, typeOrVariant || 'success');
    } else if (messageOrOptions && typeof messageOrOptions === 'object') {
      const msg = [messageOrOptions.title, messageOrOptions.description].filter(Boolean).join(': ') || 'Notification';
      const type: ToastType = messageOrOptions.variant === 'destructive' ? 'error' : 'success';
      showToast(msg, type);
    }
  }, [showToast]);

  const toastCallable: ToastFunction = Object.assign(toastHandler, {
    success: (msg: string) => showToast(msg, 'success'),
    error: (msg: string) => showToast(msg, 'error'),
    info: (msg: string) => showToast(msg, 'info'),
  });

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, addToast, toast: toastCallable }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm" role="status" aria-live="polite">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, 4000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-fade-in ${bgColors[toast.type]}`}>
      {icons[toast.type]}
      <p className="text-sm font-medium text-foreground flex-1">{toast.message}</p>
      <button onClick={onRemove} className="p-1 hover:bg-black/5 rounded" aria-label="Dismiss">
        <X className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
}
