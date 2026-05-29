'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  return (
    <div
      className={cn(
        'mt-12 mb-8 flex items-center justify-center gap-2',
        className
      )}
    >
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
        aria-label="Previous Page"
      >
        <ChevronLeft size={20} />
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors',
              isActive
                ? 'bg-primary text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)]'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
        aria-label="Next Page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
