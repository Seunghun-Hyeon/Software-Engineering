'use client';

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import api from '@/lib/axios';

interface ClubFiltersProps {
  onSearchChange?: (query: string) => void;
  onCategoriesChange?: (categories: string[]) => void;
}

export function ClubFilters({
  onSearchChange,
  onCategoriesChange,
}: ClubFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const statusParam = searchParams.get('status');
  const meetingTimeParam = searchParams.get('meetingTime');
  const commitmentParam = searchParams.get('commitment');

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? categoryParam.split(',') : ['All']
  );
  const [localSearch, setLocalSearch] = useState(searchParam || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [isLoading, setIsLoading] = useState(true);

  // Connected to /api/categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/categories');
        const data = response.data;
        if (Array.isArray(data)) {
          const names = data.map((cat: { name: string }) => cat.name);
          setCategories(['All', ...names]);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Advanced filter states
  const [isCurrentlyRecruiting, setIsCurrentlyRecruiting] = useState(
    statusParam === 'Currently Recruiting'
  );
  const [selectedMeetingTimes, setSelectedMeetingTimes] = useState<string[]>(
    meetingTimeParam ? meetingTimeParam.split(',') : []
  );
  const [selectedCommitments, setSelectedCommitments] = useState<string[]>(
    commitmentParam ? commitmentParam.split(',') : []
  );

  const handleMainCategoryClick = (cat: string) => {
    let nextCategories: string[];
    if (cat === 'All') {
      nextCategories = ['All'];
    } else {
      nextCategories = selectedCategories.filter((c) => c !== 'All');
      if (nextCategories.includes(cat)) {
        nextCategories = nextCategories.filter((c) => c !== cat);
      } else {
        nextCategories.push(cat);
      }
      if (nextCategories.length === 0) {
        nextCategories = ['All'];
      }
    }
    setSelectedCategories(nextCategories);
    onCategoriesChange?.(nextCategories);
  };

  const handleDropdownCategoryClick = (cat: string) => {
    let nextCategories: string[];
    if (cat === 'All') {
      nextCategories = ['All'];
    } else {
      nextCategories = selectedCategories.filter((c) => c !== 'All');
      if (nextCategories.includes(cat)) {
        nextCategories = nextCategories.filter((c) => c !== cat);
      } else {
        nextCategories.push(cat);
      }
      if (nextCategories.length === 0) {
        nextCategories = ['All'];
      }
    }
    setSelectedCategories(nextCategories);
  };

  const handleMeetingTimeToggle = (time: string) => {
    if (selectedMeetingTimes.includes(time)) {
      setSelectedMeetingTimes(selectedMeetingTimes.filter((t) => t !== time));
    } else {
      setSelectedMeetingTimes([...selectedMeetingTimes, time]);
    }
  };

  const handleCommitmentToggle = (level: string) => {
    if (selectedCommitments.includes(level)) {
      setSelectedCommitments(selectedCommitments.filter((l) => l !== level));
    } else {
      setSelectedCommitments([...selectedCommitments, level]);
    }
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(window.location.search);

    // Sync categories
    if (selectedCategories.includes('All') || selectedCategories.length === 0) {
      params.delete('category');
    } else {
      params.set('category', selectedCategories.join(','));
    }

    // Sync status
    if (isCurrentlyRecruiting) {
      params.set('status', 'Currently Recruiting');
    } else {
      params.delete('status');
    }

    // Sync meetingTime
    if (selectedMeetingTimes.length > 0) {
      params.set('meetingTime', selectedMeetingTimes.join(','));
    } else {
      params.delete('meetingTime');
    }

    // Sync commitment
    if (selectedCommitments.length > 0) {
      params.set('commitment', selectedCommitments.join(','));
    } else {
      params.delete('commitment');
    }

    // Synchronously update search query string in history so parent picks it up
    window.history.replaceState(null, '', `/clubs?${params.toString()}`);

    // Trigger parent callback
    if (onCategoriesChange) {
      onCategoriesChange(selectedCategories);
    } else {
      // Fallback router navigation if parent listener is missing
      router.push(`/clubs?${params.toString()}`);
    }

    setIsFilterOpen(false);
  };

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
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              onSearchChange?.(e.target.value);
            }}
            className="w-full rounded-[16px] bg-[#F3F4F6] py-3 pr-4 pl-12 text-sm text-gray-900 placeholder-gray-500 transition-shadow focus:shadow-[0_0_0_2px_#4F46E5] focus:outline-none"
          />
        </div>

        {/* Quick Filters & More Button */}
        <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-end">
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {isLoading ? (
              <span className="animate-pulse px-4 text-sm font-semibold text-gray-400">
                Loading categories...
              </span>
            ) : (
              categories.map((cat) => {
                const isActive = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleMainCategoryClick(cat)}
                    className={cn(
                      'cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200',
                      isActive
                        ? 'border-[#4F46E5] bg-[#4F46E5] text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)]'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    {cat}
                  </button>
                );
              })
            )}
          </div>

          {/* Extra Filters Button */}
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              'flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors',
              isFilterOpen
                ? 'border-[#4F46E5] bg-[#4F46E5] text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)]'
                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            )}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Popup Menu */}
      {isFilterOpen && (
        <div className="absolute top-[105%] right-0 z-20 w-full max-w-sm rounded-[24px] bg-white/95 p-6 shadow-[0px_15px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5 backdrop-blur-xl md:w-80">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-gray-900">
              More Filters
            </h3>
            <button
              type="button"
              onClick={() => setIsFilterOpen(false)}
              className="cursor-pointer text-gray-400 hover:text-gray-600"
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
                <button
                  type="button"
                  onClick={() =>
                    setIsCurrentlyRecruiting(!isCurrentlyRecruiting)
                  }
                  className={cn(
                    'flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                    isCurrentlyRecruiting
                      ? 'border-[#10B981] bg-[#10B981] text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)]'
                      : 'border-[#10B981]/20 bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20'
                  )}
                >
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      isCurrentlyRecruiting
                        ? 'bg-white'
                        : 'bg-[#10B981] shadow-[0_0_5px_rgba(16,185,129,0.5)]'
                    )}
                  />
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
                {isLoading ? (
                  <span className="animate-pulse text-xs font-semibold text-gray-400">
                    Loading...
                  </span>
                ) : (
                  categories
                    .filter((cat) => cat !== 'All')
                    .map((cat) => {
                      const isActive = selectedCategories.includes(cat);
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleDropdownCategoryClick(cat)}
                          className={cn(
                            'cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                            isActive
                              ? 'border-[#4F46E5] bg-[#4F46E5] text-white shadow-[0_2px_8px_rgba(79,70,229,0.3)]'
                              : 'border-transparent bg-[#F3F4F6] text-gray-700 hover:bg-gray-200'
                          )}
                        >
                          {cat}
                        </button>
                      );
                    })
                )}
              </div>
            </div>

            {/* Filter Group 1: Meeting Time */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Meeting Time
              </label>
              <div className="flex flex-wrap gap-2">
                {['Morning', 'Afternoon', 'Evening', 'Weekends'].map((time) => {
                  const isActive = selectedMeetingTimes.includes(time);
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleMeetingTimeToggle(time)}
                      className={cn(
                        'cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                        isActive
                          ? 'border-[#4F46E5] bg-[#4F46E5] text-white shadow-[0_2px_8px_rgba(79,70,229,0.3)]'
                          : 'border-transparent bg-[#F3F4F6] text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Group 2: Commitment Level */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Commitment Level
              </label>
              <div className="flex flex-wrap gap-2">
                {['Low', 'Medium', 'High'].map((level) => {
                  const isActive = selectedCommitments.includes(level);
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleCommitmentToggle(level)}
                      className={cn(
                        'cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                        isActive
                          ? 'border-[#4F46E5] bg-[#4F46E5] text-white shadow-[0_2px_8px_rgba(79,70,229,0.3)]'
                          : 'border-transparent bg-[#F3F4F6] text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleApplyFilters}
              className="w-full cursor-pointer rounded-full bg-[#4F46E5] py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-colors hover:bg-[#4338CA]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
