'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function CustomSelect({
  value,
  onChange,
  options,
  icon: Icon,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  icon: React.ElementType;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="group relative z-100" ref={containerRef}>
      <Icon className="pointer-events-none absolute top-1/2 left-4 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full cursor-pointer items-center justify-between rounded-[16px] border-none bg-[#F3F4F6] py-3 pr-4 pl-12 text-sm font-medium text-gray-900 transition-all focus:outline-none',
          isOpen
            ? 'shadow-[0_0_0_2px_#4F46E5]'
            : 'focus:shadow-[0_0_0_2px_#4F46E5]'
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-gray-400 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-100 w-full overflow-hidden rounded-[24px] border border-white/30 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl">
          <div className="[scrollbar-none] max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full rounded-[16px] px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-white/50',
                  value === option
                    ? 'bg-[#4F46E5]/10 text-[#4F46E5]'
                    : 'text-gray-900'
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function EventFilters() {
  const weeks = [
    'All Weeks',
    ...Array.from({ length: 16 }, (_, i) => `Week ${i + 1}`),
  ];
  const categories = [
    'All Categories',
    'Technology',
    'Arts & Culture',
    'Sports',
    'Wellness',
    'Career Growth',
    'Social',
  ];

  const [selectedWeek, setSelectedWeek] = useState('All Weeks');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  return (
    <section className="relative z-50 mb-12">
      <div className="flex flex-col gap-6 rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl lg:flex-row lg:items-end">
        {/* Search Input */}
        <div className="flex flex-1 flex-col gap-2">
          <label className="ml-1 text-sm font-semibold text-gray-500">
            Search Events
          </label>
          <div className="group relative">
            <Search className="pointer-events-none absolute top-1/2 left-4 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or keyword..."
              className="w-full rounded-[16px] border-none bg-[#F3F4F6] py-3 pr-4 pl-12 text-sm font-medium text-gray-900 transition-all focus:shadow-[0_0_0_2px_#4F46E5] focus:outline-none"
            />
          </div>
        </div>

        {/* Week Toggle / Dropdown */}
        <div className="z-100 flex flex-1 flex-col gap-2">
          <label className="ml-1 text-sm font-semibold text-gray-500">
            Academic Week
          </label>
          <CustomSelect
            value={selectedWeek}
            onChange={setSelectedWeek}
            options={weeks}
            icon={Calendar}
            placeholder="Select Week"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-1 flex-col gap-2">
          <label className="ml-1 text-sm font-semibold text-gray-500">
            Category
          </label>
          <CustomSelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categories}
            icon={Search}
            placeholder="Select Category"
          />
        </div>

        {/* Apply Filter Action */}
        {/* TODO: Connect this button to trigger an API fetch with the selected Week, Category, and Search Keyword as query parameters */}
        <button className="flex h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#4F46E5] px-8 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#4338ca] hover:shadow-[0_0_15px_rgba(79,70,229,0.4)] lg:w-auto">
          Apply Filter
        </button>
      </div>
    </section>
  );
}
