import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, ArrowRight, Users } from 'lucide-react';
import type { Event } from '@/types/event';
import { cn } from '@/lib/utils';

interface BentoViewProps {
  events: Event[];
}

export function BentoView({ events }: BentoViewProps) {
  return (
    <div>
      {/* Bento Grid Events Directory */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, idx) => {
          // Make the first card span 2 columns on large screens
          const isFeatured = idx === 0;

          return (
            <div
              key={event.id}
              className={cn(
                'group relative overflow-hidden rounded-[24px] border border-white/30 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all hover:-translate-y-1',
                isFeatured && 'lg:col-span-2'
              )}
            >
              <div
                className={cn(
                  'h-full',
                  isFeatured ? 'grid md:grid-cols-2' : 'flex flex-col'
                )}
              >
                <div
                  className={cn(
                    'relative overflow-hidden',
                    isFeatured ? 'h-64 md:h-full' : 'h-48 rounded-t-[24px]'
                  )}
                >
                  <Image
                    src={event.image || '/handongbackground.jpg'}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {isFeatured ? (
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-[#4F46E5]/90 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md">
                        Featured
                      </span>
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4">
                      <div className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-gray-900 backdrop-blur-md">
                        {event.categoryBadge}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={cn(
                    'flex flex-col justify-between',
                    isFeatured ? 'p-8' : 'p-6'
                  )}
                >
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#4F46E5]">
                      {!isFeatured && (
                        <span>
                          {event.date} • {event.time}
                        </span>
                      )}
                      {isFeatured && (
                        <>
                          <Calendar className="h-[18px] w-[18px]" />
                          {event.date} • {event.time}
                        </>
                      )}
                    </div>
                    <h3
                      className={cn(
                        'font-display mb-3 font-bold text-gray-900 transition-colors group-hover:text-[#4F46E5]',
                        isFeatured ? 'text-3xl leading-tight' : 'text-2xl'
                      )}
                    >
                      {event.title}
                    </h3>
                    <p
                      className={cn(
                        'mb-6 text-gray-500',
                        isFeatured
                          ? 'line-clamp-3 text-base'
                          : 'line-clamp-2 text-sm'
                      )}
                    >
                      {event.description}
                    </p>
                  </div>

                  <div
                    className={cn(
                      'mt-auto',
                      isFeatured ? 'flex items-center justify-between' : ''
                    )}
                  >
                    <div className="mb-4 flex items-center gap-2 text-gray-500">
                      <MapPin className="h-[18px] w-[18px]" />
                      <span className="text-sm font-semibold">
                        {event.location}
                      </span>
                    </div>

                    {isFeatured ? (
                      <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4F46E5] text-white transition-transform active:scale-90">
                        <ArrowRight className="h-6 w-6" />
                      </button>
                    ) : (
                      <div className="flex items-center justify-between border-t border-gray-200/50 pt-4">
                        <span className="flex items-center gap-1 text-xs font-bold text-[#10B981]">
                          <Users className="h-4 w-4" /> 42 attending
                        </span>
                        <span className="cursor-pointer text-sm font-bold text-[#4F46E5] hover:underline">
                          View Details
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {/* TODO: Implement real pagination logic here, fetching the requested page from the backend */}
      <section className="mt-16 flex items-center justify-center gap-2 px-6">
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100">
          <span className="text-xl">‹</span>
        </button>
        <button className="h-10 w-10 rounded-full bg-[#4F46E5] text-sm font-bold text-white">
          1
        </button>
        <button className="h-10 w-10 rounded-full text-sm font-bold text-gray-500 transition-colors hover:bg-gray-100">
          2
        </button>
        <button className="h-10 w-10 rounded-full text-sm font-bold text-gray-500 transition-colors hover:bg-gray-100">
          3
        </button>
        <span className="text-gray-400">...</span>
        <button className="h-10 w-10 rounded-full text-sm font-bold text-gray-500 transition-colors hover:bg-gray-100">
          12
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100">
          <span className="text-xl">›</span>
        </button>
      </section>
    </div>
  );
}
