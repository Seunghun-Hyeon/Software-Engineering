'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';

export function Header({}: { activeLabel?: string }) {
  const router = useRouter();
  const pathname = usePathname() || '';
  const token = useAuthStore((state) => state.token);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [hydrated, setHydrated] = useState(false);

  // Determine active states for navigation links based on current path
  const isClubsActive = pathname.startsWith('/clubs');
  const isEventsActive = pathname.startsWith('/events');
  const isAboutActive = pathname.startsWith('/about');

  useEffect(() => {
    const unsubFinishHydration = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    if (useAuthStore.persist.hasHydrated()) {
      const handle = requestAnimationFrame(() => setHydrated(true));
      return () => {
        unsubFinishHydration();
        cancelAnimationFrame(handle);
      };
    }
    return () => unsubFinishHydration();
  }, []);

  const handleSignOut = () => {
    clearAuth();
    router.push('/login');
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-[20px]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-4 lg:px-8">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-[#4F46E5]"
        >
          Handong ClubHub
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/clubs"
            className={cn(
              'border-b-2 pb-1 text-sm transition-all duration-200 hover:text-[#4F46E5]',
              isClubsActive
                ? 'border-[#4F46E5] font-bold text-[#4F46E5]'
                : 'border-transparent font-medium text-gray-700'
            )}
          >
            Clubs
          </Link>
          <Link
            href="/events"
            className={cn(
              'border-b-2 pb-1 text-sm transition-all duration-200 hover:text-[#4F46E5]',
              isEventsActive
                ? 'border-[#4F46E5] font-bold text-[#4F46E5]'
                : 'border-transparent font-medium text-gray-700'
            )}
          >
            Events
          </Link>
          <Link
            href="/about"
            className={cn(
              'border-b-2 pb-1 text-sm transition-all duration-200 hover:text-[#4F46E5]',
              isAboutActive
                ? 'border-[#4F46E5] font-bold text-[#4F46E5]'
                : 'border-transparent font-medium text-gray-700'
            )}
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {!hydrated ? (
            <div className="h-9 w-[150px]" aria-hidden="true" />
          ) : !token ? (
            <>
              <Link
                href="/login"
                className={cn(
                  'text-sm font-semibold text-gray-700 transition-colors hover:text-[#4F46E5]'
                )}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className={cn(
                  'rounded-full bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.3)] transition-all duration-300 hover:bg-[#4338CA]'
                )}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/student/dashboard"
                className={cn(
                  'flex items-center gap-2 text-sm font-semibold text-gray-700 transition-colors hover:text-[#4F46E5]'
                )}
              >
                <span>My Profile</span>
              </Link>
              <button
                onClick={handleSignOut}
                className={cn(
                  'cursor-pointer rounded-full border border-gray-200 bg-white/30 px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-white/80'
                )}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
