'use client';

import React, { useState, useEffect } from 'react';
import { ViewToggle } from '@/app/events/ViewToggle';
import { StructuredView } from '@/app/events/StructuredView';
import { BentoView } from '@/app/events/BentoView';
import { EventFilters } from '@/app/events/EventFilters';
import api from '@/lib/axios';
import type { Event } from '@/types/event';

export default function EventsPage() {
  const [view, setView] = useState<'structured' | 'bento'>('structured');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        // TODO: Update this API call to accept filter query parameters (search, week, category, page) once backend is ready
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
              <StructuredView events={events} />
            ) : (
              <BentoView events={events} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
