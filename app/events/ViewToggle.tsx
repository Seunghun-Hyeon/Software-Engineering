'use client';

import React from 'react';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  view: 'structured' | 'bento';
  onChange: (view: 'structured' | 'bento') => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/50 bg-white/80 p-1 shadow-sm backdrop-blur-sm select-none">
      <button
        onClick={() => onChange('structured')}
        className={cn(
          'flex cursor-pointer items-center gap-2 rounded-full border-0 px-4 py-2 text-sm font-semibold transition-all duration-300 outline-none',
          view === 'structured'
            ? 'bg-[#4F46E5] text-white shadow-md'
            : 'text-gray-500 hover:text-[#4F46E5]'
        )}
      >
        <LayoutList className="h-4 w-4" />
        {/* Structured */}
      </button>
      <button
        onClick={() => onChange('bento')}
        className={cn(
          'flex cursor-pointer items-center gap-2 rounded-full border-0 px-4 py-2 text-sm font-semibold transition-all duration-300 outline-none',
          view === 'bento'
            ? 'bg-[#4F46E5] text-white shadow-md'
            : 'text-gray-500 hover:text-[#4F46E5]'
        )}
      >
        <LayoutGrid className="h-4 w-4" />
        {/* Bento */}
      </button>
    </div>
  );
}
