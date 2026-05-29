'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventCard } from '@/app/components/EventCard';
import { Button } from '@/app/components/Button';
import { cn } from '@/lib/utils';
import type { Event } from '@/types/event';

interface UpcomingEventsSectionProps {
  events: Event[];
  isLoadingEvents: boolean;
}

export function UpcomingEventsSection({
  events,
  isLoadingEvents,
}: UpcomingEventsSectionProps) {
  const [activeEventTab, setActiveEventTab] = useState<
    'this-week' | 'next-month'
  >('this-week');
  const [visibleEventsCount, setVisibleEventsCount] = useState(3);

  const filteredEvents = events.filter((ev) => ev.tabPeriod === activeEventTab);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <h2 className="font-display text-2.5xl font-black tracking-tight text-gray-900 sm:text-3xl">
            Upcoming Events
          </h2>
          <p className="mt-1 font-sans text-sm text-gray-500">
            Keep track of the official dates for concerts, festivals, and more.
          </p>
        </div>

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

      {visibleEventsCount < filteredEvents.length && (
        <div className="mt-12 flex justify-center select-none">
          <Button
            onClick={() => setVisibleEventsCount((prev) => prev + 3)}
            className="w-auto border border-gray-200 bg-transparent px-8 py-3.5 text-xs font-bold text-gray-700 shadow-none hover:bg-gray-50 hover:shadow-none"
          >
            Load More Events
          </Button>
        </div>
      )}
    </section>
  );
}
