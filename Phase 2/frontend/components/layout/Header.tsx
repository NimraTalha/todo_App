"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { UserMenu } from '@/components/ui/UserMenu';
import { cn } from '@/lib/utils';
import { Layout, CheckCircle2 } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  // Don't hide header on auth pages anymore - show minimal header with auth options
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full',
        'border-b border-gray-200',
        'transition-all duration-300 ease-in-out',
        'bg-gradient-to-r from-purple-50 to-green-50 shadow-sm'
      )}
    >
      <div className="section-horizontal py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-green-500 text-white shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 group-hover:rotate-6 transition-all duration-500">
                <CheckCircle2 className="w-6 h-6" strokeWidth={3} />
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-foreground leading-none">
                Todo <span className="text-purple-600 italic">Pro</span>
              </h1>
            </Link>

            {/* Main Nav - Hide on auth pages */}
            {!isAuthPage && (
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  href="/"
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                    pathname === '/' ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:text-purple-700 hover:bg-gray-100"
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/dashboard"
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                    pathname === '/dashboard' ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:text-purple-700 hover:bg-gray-100"
                  )}
                >
                  Dashboard
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle and user menu - hide theme toggle on auth pages */}
            {!isAuthPage && (
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-gray-100">
                <ThemeToggle position="header" />
                <div className="w-px h-4 bg-gray-300 mx-0.5" />
                <UserMenu />
              </div>
            )}

            {/* Show UserMenu even on auth pages */}
            {isAuthPage && (
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-gray-100">
                <UserMenu />
              </div>
            )}

            {!pathname?.includes('/dashboard') && !isAuthPage && (
              <Link href="/dashboard" className="hidden sm:block">
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-green-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all">
                  Go to Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
