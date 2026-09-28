'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  Menu, X, LogOut, LogIn, Home, FileText, Map, BarChart3,
  BrainCircuit, ShieldCheck, Users, Settings, Activity, ClipboardList, User as UserIcon
} from 'lucide-react';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const publicLinks = [
    { href: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { href: '/about', label: 'About', icon: null },
    { href: '/how-it-works', label: 'How It Works', icon: null },
  ];

  const citizenLinks = [
    { href: '/citizen', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { href: '/citizen/report', label: 'Report Issue', icon: <FileText className="w-4 h-4" /> },
    { href: '/citizen/reports', label: 'My Reports', icon: <ClipboardList className="w-4 h-4" /> },
    { href: '/citizen/profile', label: 'Profile', icon: <UserIcon className="w-4 h-4" /> },
  ];

  const govLinks = [
    { href: '/government', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { href: '/government/reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
    { href: '/government/map', label: 'Civic Map', icon: <Map className="w-4 h-4" /> },
    { href: '/government/predictions', label: 'Risk Intel', icon: <BarChart3 className="w-4 h-4" /> },
    { href: '/government/copilot', label: 'AI Copilot', icon: <BrainCircuit className="w-4 h-4" /> },
    { href: '/government/evidence', label: 'Evidence', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const adminLinks = [
    { href: '/admin', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { href: '/admin/users', label: 'Users', icon: <Users className="w-4 h-4" /> },
    { href: '/admin/reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
    { href: '/admin/activity', label: 'Activity', icon: <Activity className="w-4 h-4" /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const roleLinks = user?.role === 'Citizen' ? citizenLinks
    : user?.role === 'Government' ? govLinks
    : user?.role === 'Admin' ? adminLinks
    : [];

  const navLinks = isAuthenticated ? roleLinks : publicLinks;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center font-bold text-white text-sm shadow-sm">
              C
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              Civic<span className="text-primary-600">OS</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-sm">
                  {user.name.charAt(0)}
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-72 bg-white border-l border-border z-50 md:hidden animate-slide-in overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="font-bold text-lg text-foreground">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-muted rounded-lg" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isAuthenticated && user && (
              <div className="p-4 border-b border-border bg-primary-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="p-3 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="p-3 mt-auto border-t border-border">
              {isAuthenticated ? (
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-red-50 w-full transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors w-full"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
