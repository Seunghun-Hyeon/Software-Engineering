'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import { Menu, X, User, ChevronDown } from 'lucide-react';

export function Header(props: { activeLabel?: string }) {
  return (
    <Suspense
      fallback={
        <header className="fixed top-0 right-0 left-0 z-150 h-16 border-b border-white/20 bg-white/70" />
      }
    >
      <HeaderContent {...props} />
    </Suspense>
  );
}

function HeaderContent({}: { activeLabel?: string }) {
  const router = useRouter();
  const pathname = usePathname() || '';

  const token = useAuthStore((state) => state.token);
  const activeRole = useAuthStore((state) => state.activeRole);
  const isExecutive = useAuthStore((state) => state.isExecutive);
  const userName = useAuthStore((state) => state.userName);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const [hydrated, setHydrated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Close profile dropdown when clicking outside (simple blur simulation)
  useEffect(() => {
    const handleWindowClick = () => setIsProfileDropdownOpen(false);
    if (isProfileDropdownOpen) {
      window.addEventListener('click', handleWindowClick);
    }
    return () => window.removeEventListener('click', handleWindowClick);
  }, [isProfileDropdownOpen]);

  const truncateName = (name: string) =>
    name.length > 20 ? name.substring(0, 17) + '...' : name;

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
    router.push('/');
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-150 border-b border-white/20 bg-white/70 backdrop-blur-[20px]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-4 lg:px-8">
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
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

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          {!hydrated ? (
            <div className="h-9 w-[150px]" aria-hidden="true" />
          ) : !token && !activeRole ? (
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
                href="/become-manager"
                className={cn(
                  'text-sm font-semibold text-gray-700 transition-colors hover:text-[#4F46E5]'
                )}
              >
                For Clubs
              </Link>
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-all hover:bg-gray-50"
                >
                  <User className="h-4 w-4" />
                  {truncateName(userName || 'My Profile')}
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 z-50 mt-2 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                    <Link
                      href="/student/dashboard"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      View Profile
                    </Link>
                    {isExecutive ? (
                      <Link
                        href="/manager/dashboard"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-sm font-medium text-[#4F46E5] hover:bg-indigo-50"
                      >
                        Manager Dashboard
                      </Link>
                    ) : (
                      <Link
                        href="/become-manager/register"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Become a Manager
                      </Link>
                    )}
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleSignOut();
                      }}
                      className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-[#4F46E5] focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 left-0 z-200 border-t border-white/20 bg-white/85 px-6 pt-4 pb-8 shadow-xl backdrop-blur-[20px] md:hidden">
          <nav className="flex flex-col gap-4">
            <>
              <Link
                href="/clubs"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'text-sm font-semibold transition-colors hover:text-[#4F46E5]',
                  isClubsActive ? 'text-[#4F46E5]' : 'text-gray-700'
                )}
              >
                Clubs
              </Link>
              <Link
                href="/events"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'text-sm font-semibold transition-colors hover:text-[#4F46E5]',
                  isEventsActive ? 'text-[#4F46E5]' : 'text-gray-700'
                )}
              >
                Events
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'text-sm font-semibold transition-colors hover:text-[#4F46E5]',
                  isAboutActive ? 'text-[#4F46E5]' : 'text-gray-700'
                )}
              >
                About
              </Link>
            </>

            {/* Action Buttons inside Mobile Dropdown */}
            <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4">
              {!hydrated ? (
                <div className="h-9 w-full animate-pulse rounded-full bg-gray-200" />
              ) : !token && !activeRole ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2 text-center text-sm font-semibold text-gray-700 hover:text-[#4F46E5]"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full bg-[#4F46E5] py-2.5 text-center text-sm font-semibold text-white shadow-md hover:bg-[#4338CA]"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/become-manager"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2 text-center text-sm font-semibold text-gray-700 hover:text-[#4F46E5]"
                  >
                    For Clubs
                  </Link>
                  <Link
                    href="/student/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full border border-gray-200 bg-white py-2.5 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    View Profile
                  </Link>
                  {isExecutive ? (
                    <Link
                      href="/manager/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-full bg-[#4F46E5] py-2.5 text-center text-sm font-semibold text-white shadow-md hover:bg-[#4338CA]"
                    >
                      Manager Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/become-manager/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-full border border-emerald-500 bg-emerald-50 py-2.5 text-center text-sm font-semibold text-emerald-600 hover:bg-emerald-100"
                    >
                      Become a Manager
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="rounded-full bg-red-50 py-2.5 text-center text-sm font-semibold text-red-600 hover:bg-red-100"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
