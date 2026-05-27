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

import React, { useState } from 'react';
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
import { EventCard, EventProps } from '@/app/components/EventCard';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { cn } from '@/lib/utils';

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

// TODO: Replace with GET /api/clubs/categories when backend is connected
// Grid item options displayed under the "Explore Interests" bento grid
const INTEREST_CATEGORIES = [
  {
    title: 'Performing Arts',
    description:
      'Traditional drum play, street hip-hop, orchestral classical, musical theatre, and acappella.',
    count: '5 Clubs',
    icon: Palette,
    gradient: 'from-rose-600/75 to-rose-950/90',
    bgImage: '/zizzy.jpg',
  },
  {
    title: 'Computer Science',
    description:
      'Full-stack software application engineering, cybersecurity CTFs, and OS kernel hacking.',
    count: '4 Clubs',
    icon: BookOpen,
    gradient: 'from-indigo-600/80 to-indigo-950/90',
    bgImage: '/computerscience.jpg',
  },
  {
    title: 'Sports & Health',
    description:
      'Collegiate American football, calisthenics routines, and local university cup tournaments.',
    count: '5 Clubs',
    icon: Trophy,
    gradient: 'from-[#10B981]/70 to-[#064e3b]/90',
    bgImage: '/spring_fest.png',
  },
  {
    title: 'Christian & Service',
    description:
      'International mission mobilization, free local tutoring, and North Korean intercessions.',
    count: '7 Clubs',
    icon: HeartHandshake,
    gradient: 'from-amber-600/70 to-amber-950/90',
    bgImage: '/handongbackground.jpg',
  },
];

// TODO: Replace with GET /api/events when backend is connected
// Datastore representing Upcoming Events for HGU clubs. Categorized into schedule periods and layout styles.
const UPCOMING_EVENTS: EventProps[] = [
  {
    id: 'ev-zzstreet',
    title: 'Zizzy Street',
    host: 'Zizzy',
    date: 'Wednesday, May 27, 2026',
    time: '6:30 PM',
    location: 'Basketball Court in front of Pyeongbong Field',
    description:
      'The official Zizzy street showcase of the term! Experience intense locking, popping, and hip-hop dance performances directly on the central campus courts.',
    image: '/zizzy.jpg',
    requiresTickets: false, // Free Event: Renders only "Remind Me" button
    categoryBadge: 'FREE',
    styleType: 'image-top', // Large Image on Top style
    tabPeriod: 'this-week',
  },
  {
    id: 'ev-ghostctf',
    title: 'GHOST CTF Hackathon',
    host: 'GHOST',
    date: 'Friday, May 29, 2026',
    time: '9:00 AM',
    location: 'Newton Hall 412',
    description:
      'Intense 24-hour Capture-The-Flag (CTF) security challenge hosted by HGU’s elite cybersecurity team GHOST. Test your skills in web hacking, pwn, cryptography, and reverse engineering.',
    image: '/computerscience.jpg',
    requiresTickets: false, // Free Event: Renders only "Remind Me"
    categoryBadge: 'COMPUTER',
    styleType: 'text-only', // Text/Icon style card
    tabPeriod: 'this-week',
  },
  {
    id: 'ev-holyrams',
    title: 'Holy Rams Open Tryouts',
    host: 'Holy Rams',
    date: 'Thursday, May 28, 2026',
    time: '5:00 PM',
    location: 'Pyeongbong Main Field',
    description:
      'Looking for tactical athletes. No experience necessary. We teach you standard American football regulations, drills, and physical safety mechanics.',
    image: '/spring_fest.png',
    requiresTickets: false, // Free Event: Renders only "Remind Me"
    categoryBadge: 'SPORTS',
    styleType: 'photo-bg', // Full Photo BG Card style
    tabPeriod: 'this-week',
  },
  {
    id: 'ev-orchestra',
    title: 'Orchestra Classical Concert',
    host: 'Handong Orchestra',
    date: 'Saturday, June 13, 2026',
    time: '7:30 PM',
    location: 'Grace Concert Hall',
    description:
      'An evening of symphonic orchestration presenting classical masterpieces and HGU praise adaptations. Tickets required for auditorium seat reservation.',
    image: '/spring_fest.png',
    requiresTickets: true, // Ticketed Event: Renders both "Buy Tickets" & "Remind Me"
    categoryBadge: 'ARTS',
    styleType: 'photo-bg', // Full Photo BG Card style
    tabPeriod: 'next-month',
  },
  {
    id: 'ev-craai',
    title: 'CRA Artificial Intelligence Lecture',
    host: 'CRA',
    date: 'Monday, June 8, 2026',
    time: '4:00 PM',
    location: 'Newton Hall 101',
    description:
      'Open guest lecture reviewing advanced transformer models and software development frameworks. General entry is free for all university members.',
    image: '/handongbackground.jpg',
    requiresTickets: false, // Free Event: Renders only "Remind Me"
    categoryBadge: 'ACADEMIC',
    styleType: 'text-only', // Text/Icon style card
    tabPeriod: 'next-month',
  },
  {
    id: 'ev-givingtree',
    title: 'Giving Tree Service Outing',
    host: 'Giving Tree',
    date: 'Saturday, June 20, 2026',
    time: '9:00 AM',
    location: 'Pohang Senior Welfare Center',
    description:
      'Volunteer excursion supporting the elderly. General body members coordinate singing performances, health stretches, and distribute warm home-cooked meals.',
    image: '/handongbackground.jpg',
    requiresTickets: false, // Free Event: Renders only "Remind Me"
    categoryBadge: 'SERVICE',
    styleType: 'image-top', // Large Image on Top style
    tabPeriod: 'next-month',
  },
];

export default function Homepage() {
  // ----------------------------------------------------
  // React State Hooks
  // ----------------------------------------------------
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
  const filteredEvents = UPCOMING_EVENTS.filter(
    (ev) => ev.tabPeriod === activeEventTab
  );

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#F9FAFB] font-sans selection:bg-[#4F46E5]/20">
      {/* --------------------------------------------------
          1. Frosted Sticky Navbar Section
          -------------------------------------------------- */}
      <Navbar activeLabel="Explore" />

      {/* --------------------------------------------------
          2. Full-Width Hero Section (Overlay layout)
          -------------------------------------------------- */}
      <section className="relative flex min-h-[580px] w-full items-center justify-center overflow-hidden bg-gray-950 px-6 py-24 text-center text-white md:min-h-[640px]">
        {/* Absolute Background university backdrop image */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/handongbackground.jpg"
            alt="Handong Campus Background"
            fill
            priority
            className="object-cover"
          />
          {/* Fading dark overlay to guarantee typography contrast and premium look */}
          <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/55 to-[#F9FAFB]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
          {/* Main Hero Title */}
          <h1 className="font-display md:text-6.5xl text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            Find Your Place <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-[#4F46E5] via-[#818cf8] to-[#10B981] bg-clip-text font-black text-transparent">
              on Campus
            </span>
          </h1>

          {/* Hero Subtitle description text */}
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
            Connect with student-led organizations, register for major events,
            and enrich your Handong Global University journey.
          </p>

          {/* Search form bar containing custom category dropdown select and input controls */}
          <div className="mt-10 w-full max-w-3xl">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-lg md:flex-row md:rounded-full"
            >
              {/* Category Dropdown filter (frosted style) */}
              <div className="relative z-45 w-full shrink-0 md:w-auto">
                <button
                  type="button"
                  onClick={() =>
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                  className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border-b border-white/20 bg-white/10 px-5 py-3.5 text-xs font-black tracking-wider text-white/95 uppercase outline-none select-none hover:bg-white/15 focus:ring-0 md:w-auto md:rounded-l-full md:rounded-r-none md:border-r md:border-b-0"
                >
                  <span className="max-w-[140px] truncate">
                    {selectedCategory}
                  </span>
                  <ChevronRight
                    className={cn(
                      'h-3.5 w-3.5 shrink-0 text-white/70 transition-transform duration-300',
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
                      className="absolute top-[calc(100%+8px)] left-0 z-50 flex w-56 flex-col gap-1 rounded-2xl border border-white/50 bg-white/90 p-2 shadow-2xl backdrop-blur-xl"
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
                            'w-full cursor-pointer rounded-xl border-0 px-4 py-2.5 text-left text-xs font-bold transition-all duration-200 outline-none',
                            selectedCategory === opt
                              ? 'bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/15'
                              : 'text-gray-700 hover:bg-gray-100/80 hover:text-[#4F46E5]'
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input Component fitted nicely within the search box container */}
              <div className="relative z-10 flex w-full grow items-center text-white/80">
                <Input
                  type="text"
                  placeholder="Search HGU student organizations"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-5 w-5 shrink-0 text-white/70" />}
                  className="w-full border-0 bg-transparent py-3 pr-4 pl-12 text-sm text-white placeholder-white/60 shadow-none focus:border-0 focus:bg-transparent focus:ring-0 focus:outline-none"
                />
              </div>

              {/* Action submit button */}
              <Button
                type="submit"
                className="w-full shrink-0 bg-[#4F46E5] px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg hover:bg-[#4338CA] md:w-auto"
              >
                Search
              </Button>
            </form>
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INTEREST_CATEGORIES.map((cat, idx) => (
            <CategoryCard
              key={idx}
              title={cat.title}
              description={cat.description}
              count={cat.count}
              icon={cat.icon}
              gradient={cat.gradient}
              bgImage={cat.bgImage}
            />
          ))}
        </div>
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

      {/* --------------------------------------------------
          6. Footer Section
          -------------------------------------------------- */}
      <Footer />
    </div>
  );
}
