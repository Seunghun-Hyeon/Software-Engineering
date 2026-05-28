/**
 * ============================================================================
 * Homepage Component (`/homepage` route page)
 * ============================================================================
 *
 * [WHAT IT IS FOR]
 * This is the primary landing page and user interface entry point of the Handong ClubHub
 * application. It features a sticky navigation header, a full-bleed Hero section
 * with search and filtering capabilities, a bento-grid feature showcase, an interactive
 * "Explore Interests" category grid, and a dynamic "Upcoming Events" calendar displaying
 * real Handong Global University (HGU) club activities with multi-layout styling tabs.
 *
 * [ROUTE MAP]
 * - Path: `/homepage`
 * - Links to: `/login` (authentication), `/signup` (registration), `/directory` (club search results page).
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Trophy,
  Palette,
  HeartHandshake,
  Search,
  Globe,
  Clock,
  ArrowRight,
  FileText,
  Users,
  Bell,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/app/components/Button';
import { Input } from '@/app/components/Input';
import { FeatureTile } from '@/app/components/FeatureTile';
import { CategoryCard } from '@/app/components/CategoryCard';
import { EventCard } from '@/app/components/EventCard';
import { cn } from '@/lib/utils';
import type { Event } from '@/types/event';
import type { Category } from '@/types/category';
import api from '@/lib/axios';
import * as LucideIcons from 'lucide-react';

// ==========================================
// 1. DATA CONFIGURATION LAYERS (Top Level Mock Data)
// ==========================================

// TODO: Replace with GET /api/navigation when backend is connected
// Navigation options showcased inside the desktop header and mobile slider menu drawer
const NAV_LINKS = [
  { label: 'Explore', href: '#' },
  { label: 'Clubs', href: '#' },
  { label: 'Events', href: '#' },
];

// TODO: Replace with GET /api/search/categories when backend is connected
// Filter options for the custom dropdown selection inside the Hero search bar
const CATEGORY_FILTER_OPTIONS = [
  'All Categories',
  'Performing Arts',
  'Exhibition Arts',
  'Sports',
  'Christian Groups',
  'Academic',
  'Computer',
  'Social Service',
];

export default function Homepage() {
  // ----------------------------------------------------
  // React State Hooks
  // ----------------------------------------------------
  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  // searchQuery: Captures current text string input inside the central Hero search bar
  const [searchQuery, setSearchQuery] = useState('');

  // selectedCategory: Controls active category filter chosen for custom dropdown searching
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // isCategoryDropdownOpen: Toggles visibility of the glassmorphic select list in the search bar
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // activeEventTab: Filters Upcoming Events by timing periods ('this-week' or 'next-month')
  const [activeEventTab, setActiveEventTab] = useState<
    'this-week' | 'next-month'
  >('this-week');

  // visibleEventsCount: Pagination tracker indicating how many event cards are currently loaded/rendered
  const [visibleEventsCount, setVisibleEventsCount] = useState(3);

  // Data Fetching
  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setIsLoadingCategories(true);
        setIsLoadingEvents(true);

        const [categoriesRes, eventsRes] = await Promise.all([
          api.get('/categories'),
          api.get('/events'),
        ]);

        setCategories(categoriesRes.data);
        setEvents(eventsRes.data);
      } catch (error) {
        console.error('Failed to load homepage data', error);
      } finally {
        setIsLoadingCategories(false);
        setIsLoadingEvents(false);
      }
    };

    fetchHomepageData();
  }, []);

  // Form Submission handler to execute searches and redirect to the Directory page
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetUrl = `/directory?`;
    const params = [];
    if (searchQuery.trim()) {
      params.push(`search=${encodeURIComponent(searchQuery)}`);
    }
    if (selectedCategory !== 'All Categories') {
      params.push(`category=${encodeURIComponent(selectedCategory)}`);
    }
    // TODO: Replace with Router push to `/directory?search=...` once directory page is connected
    window.location.href = targetUrl + params.join('&');
  };

  // Filter the event dataset dynamically based on the active tab period selected
  const filteredEvents = events.filter((ev) => ev.tabPeriod === activeEventTab);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#F9FAFB] font-sans selection:bg-[#4F46E5]/20">
      <section className="mx-auto mt-12 max-w-7xl px-6 py-12 lg:px-8">
        <div className="relative flex min-h-[560px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl p-6 text-center text-white shadow-sm md:p-12">
          {/* Absolute Background university backdrop image */}
          <div className="absolute inset-0 z-0 select-none">
            <Image
              src="/handongbackground.jpg"
              alt="Handong Campus Background"
              fill
              priority
              className="object-cover"
            />
            {/* Stitch Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
            {/* Main Hero Title */}
            <h1 className="font-display md:text-6.5xl mb-6 text-4xl leading-tight font-extrabold tracking-tight drop-shadow-md sm:text-5xl">
              Find Your Place <br className="hidden sm:inline" />
              on Campus
            </h1>

            {/* Hero Subtitle description text */}
            <p className="mb-12 max-w-2xl font-sans text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
              Connect with student-led organizations, register for major events,
              and enrich your Handong Global University journey.
            </p>

            {/* Unified Glass Search Bar from Stitch Design */}
            <div className="w-full max-w-3xl">
              <form
                onSubmit={handleSearchSubmit}
                className="mx-auto flex w-full max-w-2xl flex-col gap-2 rounded-3xl border border-white/30 bg-white/70 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl md:flex-row md:items-center md:rounded-full"
              >
                {/* Search Input Side */}
                <div className="flex flex-1 items-center gap-3 px-4 py-2 md:px-6">
                  <Search className="h-5 w-5 shrink-0 text-[#4F46E5]" />
                  <div className="relative z-10 flex w-full grow items-center">
                    <Input
                      type="text"
                      placeholder="Search clubs, events, or hobbies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border-0 bg-transparent p-0 text-sm font-medium text-gray-900 placeholder-gray-500 shadow-none focus:border-0 focus:bg-transparent focus:ring-0 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden h-10 w-px bg-gray-400/30 md:block" />

                {/* Category Dropdown filter (frosted style matching pill) */}
                <div className="relative z-45 flex flex-1 shrink-0 items-center gap-3 px-4 py-2 md:w-auto md:px-6">
                  <BookOpen className="h-5 w-5 shrink-0 text-[#4F46E5]" />
                  <button
                    type="button"
                    onClick={() =>
                      setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                    }
                    className="flex w-full cursor-pointer items-center justify-between gap-3 bg-transparent text-sm font-medium text-gray-900 outline-none select-none focus:ring-0"
                  >
                    <span className="max-w-[140px] truncate text-left">
                      {selectedCategory}
                    </span>
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 shrink-0 text-gray-500 transition-transform duration-300',
                        isCategoryDropdownOpen ? 'rotate-90' : 'rotate-0'
                      )}
                    />
                  </button>

                  {/* Animated Dropdown Selection items */}
                  <AnimatePresence>
                    {isCategoryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[calc(100%+16px)] left-0 z-50 flex w-64 flex-col gap-1 rounded-2xl border border-white/50 bg-white/95 p-2 shadow-2xl backdrop-blur-xl"
                      >
                        {CATEGORY_FILTER_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(opt);
                              setIsCategoryDropdownOpen(false);
                            }}
                            className={cn(
                              'w-full cursor-pointer rounded-xl border-0 px-4 py-2.5 text-left text-sm font-semibold transition-all duration-200 outline-none',
                              selectedCategory === opt
                                ? 'bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/15'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-[#4F46E5]'
                            )}
                          >
                            {opt}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action submit button */}
                <Button
                  type="submit"
                  className="w-full shrink-0 rounded-full bg-[#4F46E5] px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:bg-[#4338CA] hover:shadow-xl md:w-auto md:rounded-full"
                >
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          3. "Tired of missing out?" Bento Feature Showcase
          -------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-12 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Column values column */}
          <div className="flex flex-col items-start text-left lg:col-span-5">
            <h2 className="font-display text-3xl leading-tight font-black tracking-tight text-gray-900 sm:text-4xl">
              Tired of missing out?
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-gray-500">
              ClubHub brings the campus to you. One place to find events and
              join the clubs you love without checking twenty different group
              chats.
            </p>

            {/* Green bullet checkmarks showcasing trust stats */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#10B981]/30 bg-[#10B981]/15 shadow-sm">
                  <span className="text-xs font-black text-[#10B981]">✓</span>
                </div>
                <span className="font-sans text-sm font-bold text-gray-800">
                  Verified Organizations
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#10B981]/30 bg-[#10B981]/15 shadow-sm">
                  <span className="text-xs font-black text-[#10B981]">✓</span>
                </div>
                <span className="font-sans text-sm font-bold text-gray-800">
                  Real-time Updates
                </span>
              </div>
            </div>
          </div>

          {/* Right Column containing 2x2 Feature Bento Grid tiles */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            {[
              {
                title: 'Instant Event Alerts',
                description:
                  'Get notified immediately when your favorite HGU squads announce tryouts or general body meetings.',
                icon: Bell,
                colorClass: 'text-indigo-600 bg-indigo-50 border-indigo-100',
              },
              {
                title: 'Easy Applications',
                description:
                  'Submit standardized applications to multiple clubs directly within our central applicant store.',
                icon: FileText,
                colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-100',
              },
              {
                title: 'Smart Scheduling',
                description:
                  'Sync events seamlessly into Google Calendar, ensuring zero academic conflicts with major exams.',
                icon: Clock,
                colorClass: 'text-amber-500 bg-amber-50 border-amber-100',
              },
              {
                title: 'Member Community',
                description:
                  'Engage with fellow student leads, developers, designers, and performers in dedicated public boards.',
                icon: Users,
                colorClass: 'text-rose-500 bg-rose-50 border-rose-100',
              },
            ].map((feat, idx) => (
              <FeatureTile
                key={idx}
                title={feat.title}
                description={feat.description}
                icon={feat.icon}
                colorClass={feat.colorClass}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          4. "Explore Interests" Section
          -------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:items-end sm:text-left">
          <div>
            <h2 className="font-display text-2.5xl font-black tracking-tight text-gray-900 sm:text-3xl">
              Explore Interests
            </h2>
            <p className="mt-1.5 font-sans text-sm text-gray-500">
              Find the community that fits your vibe
            </p>
          </div>
          <Link
            href="/directory"
            className="group inline-flex items-center gap-1.5 font-sans text-sm font-bold text-[#4F46E5] transition-all hover:text-[#4F46E5]"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Categories grid showing premium image card modules */}
        {isLoadingCategories ? (
          <div className="flex h-32 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4F46E5] border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, idx) => {
              const IconComponent =
                (LucideIcons[
                  cat.iconName as keyof typeof LucideIcons
                ] as LucideIcons.LucideIcon) || LucideIcons.Circle;
              return (
                <CategoryCard
                  key={idx}
                  title={cat.title}
                  description={cat.description}
                  count={cat.count}
                  icon={IconComponent}
                  gradient={cat.gradient}
                  bgImage={cat.bgImage}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* --------------------------------------------------
          5. "Upcoming Events" Section with Mixed card Styles
          -------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-2.5xl font-black tracking-tight text-gray-900 sm:text-3xl">
              Upcoming Events
            </h2>
            <p className="mt-1 font-sans text-sm text-gray-500">
              Keep track of the official dates for concerts, festivals, and
              more.
            </p>
          </div>

          {/* Dynamic Timing period tabs (this week vs next month) */}
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/50 bg-white/80 p-1.5 shadow-sm backdrop-blur-sm select-none">
            <button
              onClick={() => {
                setActiveEventTab('this-week');
                setVisibleEventsCount(3);
              }}
              className={cn(
                'cursor-pointer rounded-full border-0 px-5 py-2 text-xs font-extrabold transition-all duration-300 outline-none',
                activeEventTab === 'this-week'
                  ? 'bg-[#4F46E5] text-white shadow-md'
                  : 'text-gray-500 hover:text-[#4F46E5]'
              )}
            >
              This Week
            </button>
            <button
              onClick={() => {
                setActiveEventTab('next-month');
                setVisibleEventsCount(3);
              }}
              className={cn(
                'cursor-pointer rounded-full border-0 px-5 py-2 text-xs font-extrabold transition-all duration-300 outline-none',
                activeEventTab === 'next-month'
                  ? 'bg-[#4F46E5] text-white shadow-md'
                  : 'text-gray-500 hover:text-[#4F46E5]'
              )}
            >
              Next Month
            </button>
          </div>
        </div>

        {/* Grid containing event layout styles mapped from template filters */}
        {isLoadingEvents ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4F46E5] border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredEvents.slice(0, visibleEventsCount).map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                >
                  <EventCard
                    event={event}
                    onRemindClick={(id) =>
                      console.log('Remind for HGU event:', id)
                    }
                    onTicketsClick={(id) =>
                      console.log('Tickets for HGU event:', id)
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Load More indicator */}
        {visibleEventsCount < filteredEvents.length && (
          <div className="mt-12 flex justify-center select-none">
            {/* TODO: Replace with paginated GET /api/events?page=X when backend is connected */}
            <Button
              onClick={() => setVisibleEventsCount((prev) => prev + 3)}
              className="w-auto border border-gray-200 bg-transparent px-8 py-3.5 text-xs font-bold text-gray-700 shadow-none hover:bg-gray-50 hover:shadow-none"
            >
              Load More Events
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
