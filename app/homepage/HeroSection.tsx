'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { Input } from '@/app/components/Input';
import { cn } from '@/lib/utils';

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

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

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
    window.location.href = targetUrl + params.join('&');
  };

  return (
    <section className="mx-auto mt-12 max-w-7xl px-6 py-12 lg:px-8">
      <div className="relative flex min-h-[560px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl p-6 text-center text-white shadow-sm md:p-12">
        {/* Absolute Background university backdrop image */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/concert2.jpg"
            alt="Handong Campus Background"
            fill
            priority
            className="object-cover"
          />
          {/* Stitch Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" />
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
              className="mx-auto flex w-full max-w-2xl flex-col gap-2 rounded-3xl border border-white/30 bg-white/95 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl md:flex-row md:items-center md:rounded-full"
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
  );
}
