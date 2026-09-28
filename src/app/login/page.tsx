'use client'

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

// ── Helpers ──────────────────────────────────────────────────────────────────

function validateEmail(v: string) {
  if (!v.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address';
  return '';
}

function validatePassword(v: string) {
  if (!v) return 'Password is required';
  if (v.length < 6) return 'Password must be at least 6 characters';
  return '';
}

// ── Demo accounts ─────────────────────────────────────────────────────────────

const DEMO_ACCOUNTS = [
  { role: 'Citizen',     label: 'Rahul Sharma',    email: 'citizen@demo.com', pass: 'demo123', color: 'emerald' },
  { role: 'Government',  label: 'Dr. Priya Patel', email: 'gov@demo.com',     pass: 'demo123', color: 'blue'    },
  { role: 'Admin',       label: 'System Admin',    email: 'admin@demo.com',   pass: 'demo123', color: 'violet'  },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router   = useRouter();
  const { login, user: authUser } = useAuth();

  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [touched,     setTouched]     = useState({ email: false, password: false });
  const [filledDemo,  setFilledDemo]  = useState<number | null>(null);

  // Derived field errors (only shown after field is touched)
  const emailErr    = touched.email    ? validateEmail(email)       : '';
  const passwordErr = touched.password ? validatePassword(password)  : '';
  const formValid   = !validateEmail(email) && !validatePassword(password);

  // ── Fill demo credentials ─────────────────────────────────────────────────

  const fillDemo = useCallback((idx: number) => {
    const acc = DEMO_ACCOUNTS[idx];
    setEmail(acc.email);
    setPassword(acc.pass);
    setFilledDemo(idx);
    setTouched({ email: true, password: true });
    setGlobalError('');
  }, []);

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!formValid || loading) return;

    setGlobalError('');
    setLoading(true);

    try {
      const result = await login(email.trim().toLowerCase(), password);

      if (!result.success) {
        setGlobalError(result.error ?? 'Login failed. Please check your credentials.');
        return;
      }

      // Read role from authUser after successful login — AuthContext updates state
      // Use a short re-read via the result-path. Role comes from DEMO_USERS lookup.
      // We push based on the email used (fastest; avoids stale closure on authUser).
      const lower = email.trim().toLowerCase();
      if (lower === 'gov@demo.com')   { router.push('/government'); return; }
      if (lower === 'admin@demo.com') { router.push('/admin');      return; }
      router.push('/citizen');
    } catch {
      setGlobalError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-8 sm:py-12">

      {/* ── Brand header ── */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-600 shadow-md mb-3">
          <span className="text-white font-extrabold text-xl tracking-tight">C</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Sign in to <span className="text-primary-600">CivicOS</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">Civic Intelligence Platform — frontend demo</p>
      </div>

      {/* ── Login card ── */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">

        {/* Global error */}
        {globalError && (
          <div
            role="alert"
            className="flex items-start gap-2.5 mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-in"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{globalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* Email */}
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setGlobalError(''); }}
                onBlur={() => setTouched(t => ({ ...t, email: true }))}
                placeholder="you@example.com"
                disabled={loading}
                aria-invalid={!!emailErr}
                aria-describedby={emailErr ? 'login-email-error' : undefined}
                className={[
                  'w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400',
                  'focus:outline-none focus:ring-2 transition-colors',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  emailErr
                    ? 'border-red-400 focus:ring-red-200 bg-red-50/40'
                    : 'border-slate-300 focus:ring-primary-200 focus:border-primary-500 bg-white',
                ].join(' ')}
              />
            </div>
            {emailErr && (
              <p id="login-email-error" role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 animate-fade-in">
                <AlertCircle className="w-3 h-3 shrink-0" />{emailErr}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={e => { setPassword(e.target.value); setGlobalError(''); }}
                onBlur={() => setTouched(t => ({ ...t, password: true }))}
                placeholder="Enter your password"
                disabled={loading}
                aria-invalid={!!passwordErr}
                aria-describedby={passwordErr ? 'login-password-error' : undefined}
                className={[
                  'w-full pl-10 pr-11 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400',
                  'focus:outline-none focus:ring-2 transition-colors',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  passwordErr
                    ? 'border-red-400 focus:ring-red-200 bg-red-50/40'
                    : 'border-slate-300 focus:ring-primary-200 focus:border-primary-500 bg-white',
                ].join(' ')}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                disabled={loading}
                aria-label={showPass ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordErr && (
              <p id="login-password-error" role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 animate-fade-in">
                <AlertCircle className="w-3 h-3 shrink-0" />{passwordErr}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="login-submit-btn"
            disabled={loading}
            className={[
              'w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold',
              'transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
              loading
                ? 'bg-primary-400 text-white cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-[0.98] shadow-sm',
            ].join(' ')}
          >
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
              : 'Sign in'
            }
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary-600 hover:text-primary-700 font-semibold underline-offset-2 hover:underline">
            Register here
          </Link>
        </p>
      </div>

      {/* ── Demo credentials card ── */}
      <div className="w-full max-w-[420px] mt-4 rounded-2xl border border-primary-100 bg-primary-50 p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          <h2 className="text-xs font-bold text-primary-800 uppercase tracking-wider">Demo Credentials</h2>
          <span className="ml-auto text-xs text-primary-600 font-medium">Click any row to autofill</span>
        </div>

        <div className="space-y-2">
          {DEMO_ACCOUNTS.map((acc, i) => (
            <button
              key={acc.role}
              type="button"
              id={`demo-${acc.role.toLowerCase()}-btn`}
              onClick={() => fillDemo(i)}
              disabled={loading}
              className={[
                'w-full text-left rounded-xl border px-4 py-3 flex items-center justify-between gap-3',
                'transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                filledDemo === i
                  ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
                  : 'bg-white border-primary-100 hover:border-primary-300 hover:shadow-sm text-slate-700',
              ].join(' ')}
              aria-label={`Use ${acc.role} demo account`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wide ${filledDemo === i ? 'text-primary-100' : 'text-primary-700'}`}>
                    {acc.role}
                  </span>
                  <span className={`text-xs ${filledDemo === i ? 'text-primary-200' : 'text-slate-400'}`}>
                    · {acc.label}
                  </span>
                </div>
                <p className={`text-sm font-mono mt-0.5 truncate ${filledDemo === i ? 'text-white' : 'text-slate-600'}`}>
                  {acc.email}
                </p>
              </div>
              <div className="shrink-0">
                {filledDemo === i
                  ? <CheckCircle2 className="w-4 h-4 text-white" />
                  : <span className={`text-xs font-mono px-2 py-0.5 rounded ${filledDemo === i ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-500'}`}>{acc.pass}</span>
                }
              </div>
            </button>
          ))}
        </div>

        <p className="mt-3 text-center text-[11px] text-primary-700/70">
          ⚠ Frontend mock auth only · No real data is stored
        </p>
      </div>
    </div>
  );
}
