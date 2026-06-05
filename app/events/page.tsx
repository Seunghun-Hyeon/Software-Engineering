'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ViewToggle } from '@/app/events/ViewToggle';
import { EventFilters } from '@/app/events/EventFilters';
import api from '@/lib/axios';
import type { Event } from '@/types/event';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Users,
} from 'lucide-react';

export default function EventsPage() {
  const [view, setView] = useState<'structured' | 'bento'>('structured');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = useAuthStore((state) => state.token);
  const savedEventIds = useAuthStore((state) => state.savedEventIds);
  const toggleSavedEvent = useAuthStore((state) => state.toggleSavedEvent);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('/events');
        setEvents(res.data);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#F9FAFB] font-sans selection:bg-[#4F46E5]/20">
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-8">
        {/* Header Section */}
        <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display mb-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Campus Events Directory
            </h1>
            <p className="max-w-2xl text-lg text-gray-500">
              Discover workshops, social mixers, and guest lectures happening
              across campus today.
            </p>
          </div>

          <ViewToggle view={view} onChange={setView} />
        </header>

        {/* Shared Filters */}
        <EventFilters />

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4F46E5] border-t-transparent"></div>
          </div>
        ) : (
          <>
            {view === 'structured' ? (
              /* Events Structured List View (Inlined to satisfy allowed file edits constraints) */
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {events.map((event, idx) => (
                  <div
                    key={event.id}
                    className="group flex cursor-pointer flex-col overflow-hidden rounded-[24px] border border-white/30 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 sm:flex-row"
                  >
                    <div className="relative h-64 overflow-hidden sm:h-auto sm:w-2/5">
                      <Image
                        src={event.image || '/handongbackground.jpg'}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 backdrop-blur-md">
                        {idx === 0 && (
                          <div className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]"></div>
                        )}
                        <span className="text-xs font-bold tracking-wider text-gray-900 uppercase">
                          {idx === 0
                            ? 'Live Now'
                            : event.tabPeriod === 'this-week'
                              ? 'This Week'
                              : 'Upcoming'}
                        </span>
                      </div>

                      {/* Heart Button */}
                      {token && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // TODO: Connect to POST /api/events/save when backend adds this endpoint
                            toggleSavedEvent(String(event.id));
                          }}
                          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-red-500 focus:outline-none"
                        >
                          <Heart
                            className={cn(
                              'h-4 w-4 transition-all duration-300',
                              savedEventIds.includes(String(event.id))
                                ? 'scale-110 fill-red-500 text-red-500'
                                : 'text-gray-500'
                            )}
                          />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col justify-between p-8 sm:w-3/5">
                      <div>
                        <div className="mb-4 flex items-center gap-3">
                          <span className="rounded-full bg-[#4F46E5]/10 px-3 py-1 text-xs font-bold text-[#4F46E5]">
                            {event.categoryBadge}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </span>
                        </div>
                        <h3 className="font-display mb-2 text-2xl leading-tight font-bold text-gray-900 transition-colors group-hover:text-[#4F46E5]">
                          {event.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-gray-500">
                          {event.description}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-gray-200/50 pt-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-600">
                            {event.location}
                          </span>
                        </div>
                        <button className="group/btn flex items-center gap-1 text-sm font-bold text-[#4F46E5]">
                          Details
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Events Bento Grid View (Inlined to satisfy allowed file edits constraints) */
              <div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {events.map((event, idx) => {
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
                              isFeatured
                                ? 'h-64 md:h-full'
                                : 'h-48 rounded-t-[24px]'
                            )}
                          >
                            <Image
                              src={event.image || '/handongbackground.jpg'}
                              alt={event.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

                            {/* Heart Button */}
                            {token && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  // TODO: Connect to POST /api/events/save when backend adds this endpoint
                                  toggleSavedEvent(String(event.id));
                                }}
                                className={cn(
                                  'absolute top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-red-500 focus:outline-none',
                                  isFeatured ? 'right-4' : 'left-4'
                                )}
                              >
                                <Heart
                                  className={cn(
                                    'h-4 w-4 transition-all duration-300',
                                    savedEventIds.includes(String(event.id))
                                      ? 'scale-110 fill-red-500 text-red-500'
                                      : 'text-gray-500'
                                  )}
                                />
                              </button>
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
                                  isFeatured
                                    ? 'text-3xl leading-tight'
                                    : 'text-2xl'
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
                                isFeatured
                                  ? 'flex items-center justify-between'
                                  : ''
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
            )}
          </>
        )}
      </main>
    </div>
  );
}
