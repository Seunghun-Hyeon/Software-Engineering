'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import api from '@/lib/axios';

interface EventData {
  id: string;
  club_id: string;
  title: string;
  description: string;
  event_date: string;
  poster_url?: string;
}

export function EventsTab({ clubId }: { clubId: string }) {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Connected to GET /api/events/ filtered by club_id
    api
      .get('/api/events')
      .then((res) => {
        if (Array.isArray(res.data)) {
          const filtered = res.data.filter(
            (e: EventData) => String(e.club_id) === clubId
          );
          setEvents(filtered);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch events:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [clubId]);

  if (isLoading) {
    return (
      <section className="flex min-h-[500px] items-center justify-center rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4F46E5] border-t-transparent"></div>
      </section>
    );
  }

  return (
    <section className="min-h-[500px] rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
        Upcoming & Past Events
      </h2>
      <div className="flex flex-col gap-6">
        {events.length === 0 ? (
          <div className="p-8 text-center text-xs font-semibold text-gray-400">
            No events posted yet
          </div>
        ) : (
          events.map((event) => {
            const dateObj = new Date(event.event_date);
            const month = dateObj
              .toLocaleString('en-US', { month: 'short' })
              .toUpperCase();
            const day = dateObj.getDate();
            const formattedTime = dateObj.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });

            return (
              <div
                key={event.id}
                className="flex items-start gap-6 rounded-[20px] border border-gray-200 bg-gray-50 p-6"
              >
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-[16px] bg-[#4F46E5] text-white shadow-lg">
                  <span className="text-sm font-bold tracking-wider uppercase opacity-90">
                    {month}
                  </span>
                  <span className="text-2xl font-black">{day}</span>
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-start justify-between">
                    <h3 className="font-display text-xl font-bold text-gray-900">
                      {event.title}
                    </h3>
                  </div>
                  <p className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Clock className="h-4 w-4" /> {formattedTime}
                  </p>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
