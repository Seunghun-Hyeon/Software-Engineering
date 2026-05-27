/**
 * ============================================================================
 * Navbar Component (Frosted Sticky Navigation Header)
 * ============================================================================
 *
 * [WHAT IT IS FOR]
 * This is the global navigation header for the Handong ClubHub application.
 * It is sticky-positioned, utilizes frosted glass styling (`backdrop-blur-md bg-white/70`),
 * displays HGU branding logotypes, maps central navigations, presents authentication pill triggers,
 * and handles mobile drawer slide-downs in a completely self-contained reactive way.
 *
 * [WHAT IT LOOKS LIKE]
 * - Desktop: A sleek, high-profile 20px frosted height block. Logo on the left,
 *   centered text links with custom sliding line hover animations, and a pill-shaped
 *   primary "Sign In" button on the right.
 * - Mobile: Adapts cleanly by hiding the inline links and rendering an elegant circular
 *   hamburger button that opens a beautiful glassmorphic full-width drawer.
 *
 * [WHERE IT IS USED]
 * - Homepage (`app/homepage/page.tsx`) as the top-level site header.
 * - Extensible to any future main pages (e.g. Clubs, Events, Directory directories).
 *
 * [PROPS CONTRACT]
 * - activeLabel: (string) Optional value specifying which link is currently active to style it.
 * - className: (string) Custom CSS classes to override positioning styles.
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { cn } from '@/lib/utils';

// TODO: Replace with GET /api/navigation when backend is connected
const NAV_LINKS = [
  { label: 'Explore', href: '#' },
  { label: 'Clubs', href: '#' },
  { label: 'Events', href: '#' },
];

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  activeLabel?: string; // Optional: denotes which navigation link is currently highlighted active
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, activeLabel, ...props }, ref) => {
    // React state hook to track whether the slide-down menu is active on small mobile screens
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
      <header
        ref={ref}
        className={cn(
          // Frosted sticky header styling with subtle borders and shadows
          'sticky top-0 z-50 w-full border-b border-white/40 bg-white/70 shadow-[0_2px_20px_rgba(0,0,0,0.01)] backdrop-blur-md',
          className
        )}
        {...props}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo Branding */}
          <Link href="/homepage" className="group flex items-center gap-2">
            <span className="font-display text-2xl font-black tracking-tight text-[#4F46E5] transition-all group-hover:scale-[1.02]">
              ClubHub
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeLabel === link.label;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'group relative py-2 text-sm font-semibold transition-colors duration-200',
                    isActive
                      ? 'text-[#4F46E5]'
                      : 'text-gray-600 hover:text-[#4F46E5]'
                  )}
                >
                  {link.label}
                  {/* Underline hover effect */}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-[2px] bg-[#4F46E5] transition-all duration-300 group-hover:w-full',
                      isActive ? 'w-full' : 'w-0'
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Sign In Button */}
          <div className="hidden items-center md:flex">
            <Link href="/login">
              <Button className="w-auto px-6 py-2.5 text-sm shadow-[0_4px_12px_rgba(79,70,229,0.15)] hover:shadow-[0_4px_20px_rgba(79,70,229,0.3)]">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Drawer Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-white/80 text-gray-600 shadow-sm transition-colors hover:text-[#4F46E5] md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer Panel */}
        {isMobileMenuOpen && (
          <div className="w-full space-y-4 border-t border-white/40 bg-white/90 px-6 py-6 shadow-inner backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-sm font-bold text-gray-700 transition-colors hover:text-[#4F46E5]"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-4">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full text-sm">Sign In</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }
);

Navbar.displayName = 'Navbar';
