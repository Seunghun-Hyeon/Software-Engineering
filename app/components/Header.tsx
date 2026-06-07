'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import api from '@/lib/axios';

function getUserIdFromToken(token: string | null): string | null {
  if (!token || typeof window === 'undefined') return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return payload.sub || null;
  } catch (e) {
    console.error('Failed to decode token:', e);
    return null;
  }
}

interface HeaderClub {
  id: string;
  name: string;
  exec_user_id: string;
  categories: { name: string } | null;
}

export function Header(props: { activeLabel?: string }) {
  return (
    <Suspense
      fallback={
        <header className="fixed top-0 right-0 left-0 z-50 h-16 border-b border-white/20 bg-white/70" />
      }
    >
      <HeaderContent {...props} />
    </Suspense>
  );
}

function HeaderContent({}: { activeLabel?: string }) {
  const router = useRouter();
  const pathname = usePathname() || '';
  const searchParams = useSearchParams();
  const tab = searchParams?.get('tab') || '';

  const token = useAuthStore((state) => state.token);
  const activeRole = useAuthStore((state) => state.activeRole);
  const isExecutive = useAuthStore((state) => state.isExecutive);
  const setActiveRole = useAuthStore((state) => state.setActiveRole);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const [hydrated, setHydrated] = useState(false);
  const [clubId, setClubId] = useState<string | null>(null);

  // Determine active states for navigation links based on current path
  const isClubsActive = pathname.startsWith('/clubs');
  const isEventsActive = pathname.startsWith('/events');
  const isAboutActive = pathname.startsWith('/about');

  const userId = getUserIdFromToken(token);

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

  useEffect(() => {
    if (token && activeRole === 'executive' && userId) {
      api
        .get('/api/clubs/')
        .then((res) => {
          const clubs = res.data;
          if (Array.isArray(clubs)) {
            const myClub = clubs.find(
              (c: HeaderClub) => c.exec_user_id === userId
            );
            if (myClub) {
              setClubId(myClub.id);
            }
          }
        })
        .catch((err) => {
          console.error('Failed to fetch executive club in Header:', err);
        });
    }
  }, [token, activeRole, userId]);

  const handleSignOut = () => {
    clearAuth();
    router.push('/');
  };

  const isClubDetailActive = clubId ? pathname === `/clubs/${clubId}` : false;
  const isExecEventsActive =
    pathname.startsWith('/manager/dashboard') && tab === 'events';

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-[20px]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-4 lg:px-8">
        <Link
          href={
            hydrated && activeRole === 'executive' ? '/manager/dashboard' : '/'
          }
          className="font-display text-xl font-bold tracking-tight text-[#4F46E5]"
        >
          Handong ClubHub
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {!hydrated ? (
            <>
              <span className="h-5 w-12 animate-pulse rounded bg-gray-200" />
              <span className="h-5 w-12 animate-pulse rounded bg-gray-200" />
              <span className="h-5 w-12 animate-pulse rounded bg-gray-200" />
            </>
          ) : activeRole === 'executive' ? (
            <>
              <Link
                href={clubId ? `/clubs/${clubId}` : '/clubs'}
                className={cn(
                  'border-b-2 pb-1 text-sm transition-all duration-200 hover:text-[#4F46E5]',
                  isClubDetailActive
                    ? 'border-[#4F46E5] font-bold text-[#4F46E5]'
                    : 'border-transparent font-medium text-gray-700'
                )}
              >
                Club
              </Link>
              <Link
                href="/manager/dashboard?tab=events"
                className={cn(
                  'border-b-2 pb-1 text-sm transition-all duration-200 hover:text-[#4F46E5]',
                  isExecEventsActive
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
            </>
          ) : (
            <>
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
            </>
          )}
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
          ) : activeRole === 'student' && !isExecutive ? (
            <>
              <Link
                href="/student/dashboard"
                className={cn(
                  'cursor-pointer rounded-full bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(79,70,229,0.15)] transition-all duration-300 hover:bg-[#4338CA]'
                )}
              >
                My Profile
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
          ) : activeRole === 'student' && isExecutive ? (
            <>
              <button
                onClick={() => {
                  setActiveRole('executive');
                  router.push('/manager/dashboard');
                }}
                className={cn(
                  'cursor-pointer rounded-full border border-[#4F46E5] bg-transparent px-4 py-2 text-sm font-semibold text-[#4F46E5] transition-all duration-300 hover:bg-[#4F46E5]/10'
                )}
              >
                Switch to Executive
              </button>
              <Link
                href="/student/dashboard"
                className={cn(
                  'cursor-pointer rounded-full bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(79,70,229,0.15)] transition-all duration-300 hover:bg-[#4338CA]'
                )}
              >
                My Profile
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
          ) : (
            // activeRole === 'executive'
            <>
              <button
                onClick={() => {
                  setActiveRole('student');
                  router.push('/');
                }}
                className={cn(
                  'cursor-pointer rounded-full border border-[#4F46E5] bg-transparent px-4 py-2 text-sm font-semibold text-[#4F46E5] transition-all duration-300 hover:bg-[#4F46E5]/10'
                )}
              >
                Switch to Student
              </button>
              <Link
                href="/manager/dashboard"
                className={cn(
                  'cursor-pointer rounded-full bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(79,70,229,0.15)] transition-all duration-300 hover:bg-[#4338CA]'
                )}
              >
                Club Profile
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
