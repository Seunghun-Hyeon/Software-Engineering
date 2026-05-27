'use client';

import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ClubFilters() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="relative mb-10">
      {/* White Container */}
      <div className="flex flex-col gap-4 rounded-[24px] bg-white/70 p-4 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] ring-1 ring-white/50 backdrop-blur-md md:flex-row md:items-center md:justify-between">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-md">
          <Search
            className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search clubs by name or keyword..."
            className="w-full rounded-[16px] bg-[#F3F4F6] py-3 pr-4 pl-12 text-sm text-gray-900 placeholder-gray-500 transition-shadow focus:shadow-[0_0_0_2px_#4F46E5] focus:outline-none"
          />
        </div>

        {/* Quick Filters & More Button */}
        <div className="flex w-full items-center justify-between gap-2 md:w-auto">
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {['All', 'Academic', 'Engineering', 'Arts', 'Sports'].map((cat) => (
              <button
                key={cat}
                className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  cat === 'All'
                    ? 'bg-primary text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)]'
                    : 'bg-white text-gray-600 ring-1 ring-gray-200 ring-inset hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Extra Filters Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              'mb-2 flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-full transition-colors md:mb-0',
              isFilterOpen
                ? 'bg-primary text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)]'
                : 'bg-white text-gray-600 ring-1 ring-gray-200 ring-inset hover:bg-gray-50'
            )}
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Popup Menu */}
      {isFilterOpen && (
        <div className="absolute top-[105%] right-0 z-20 w-full max-w-sm rounded-[24px] bg-white/90 p-6 shadow-[0px_15px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5 backdrop-blur-xl md:w-80">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-gray-900">
              More Filters
            </h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Status Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                <button className="bg-secondary/10 text-secondary ring-secondary/20 hover:bg-secondary/20 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-colors ring-inset focus:outline-none">
                  <span className="bg-secondary h-1.5 w-1.5 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                  Currently Recruiting
                </button>
              </div>
            </div>

            {/* Additional Categories */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                More Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {['Music', 'Dance', 'Theater', 'Volunteering', 'Religious'].map(
                  (cat) => (
                    <button
                      key={cat}
                      className="focus:bg-primary rounded-full bg-[#F3F4F6] px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:text-white focus:outline-none"
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Filter Group 1 */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Meeting Time
              </label>
              <div className="flex flex-wrap gap-2">
                {['Morning', 'Afternoon', 'Evening', 'Weekends'].map((time) => (
                  <button
                    key={time}
                    className="focus:bg-primary rounded-full bg-[#F3F4F6] px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 focus:text-white focus:outline-none"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group 2 */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Commitment Level
              </label>
              <div className="flex flex-wrap gap-2">
                {['Low', 'Medium', 'High'].map((level) => (
                  <button
                    key={level}
                    className="focus:bg-primary rounded-full bg-[#F3F4F6] px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 focus:text-white focus:outline-none"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="bg-primary hover:bg-primary/90 w-full rounded-full py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
