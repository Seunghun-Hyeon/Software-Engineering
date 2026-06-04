'use client';

import React from 'react';
import { Bookmark, MapPin, Calendar, Clock } from 'lucide-react';
import { SavedEvent } from '../../../types/types';
import { Badge } from '@/app/components/Badge';
import { useAuthStore } from '@/store/useAuthStore';

interface SavedEventsTabProps {
  events: SavedEvent[];
}

export function SavedEventsTab({ events }: SavedEventsTabProps) {
  // TODO: Replace with GET /api/events/saved when backend adds this endpoint
  const { savedEventIds, toggleSavedEvent } = useAuthStore();

  const activeEvents = events.filter((event) =>
    savedEventIds.includes(String(event.id))
  );

  if (activeEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-gray-300 bg-white/40 px-6 py-20 text-center backdrop-blur-sm">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Bookmark className="h-8 w-8" />
        </div>
        <h3 className="font-display mb-1 text-lg font-bold text-gray-900">
          No saved events yet
        </h3>
        <p className="max-w-xs text-sm font-medium text-gray-500">
          Browse events to save them!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activeEvents.map((event) => {
          return (
            <div
              key={event.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              {/* Top Category Badge and Interactive Saved Bookmark Toggle */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <Badge variant="indigo">{event.category}</Badge>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // TODO: Replace with GET /api/events/saved when backend adds this endpoint
                    toggleSavedEvent(String(event.id));
                  }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-100/50 bg-white/80 text-gray-400 shadow-sm transition-all duration-200 hover:bg-indigo-50 hover:text-[#4F46E5] focus:outline-none active:scale-95"
                  title="Remove from saved events"
                >
                  <Bookmark className="h-5 w-5 fill-[#4F46E5] text-[#4F46E5]" />
                </button>
              </div>

              {/* Event Content Details */}
              <div className="grow">
                <h3 className="font-display mb-4 line-clamp-2 text-xl leading-snug font-bold text-gray-900 transition-colors group-hover:text-[#4F46E5]">
                  {event.title}
                </h3>

                <div className="mb-6 space-y-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-[18px] w-[18px] shrink-0 text-[#4F46E5]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-[18px] w-[18px] shrink-0 text-[#4F46E5]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-[18px] w-[18px] shrink-0 text-[#4F46E5]" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="mt-auto flex items-center justify-between border-t border-gray-200/50 pt-4">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />
                  Saved
                </span>
                <span className="cursor-pointer text-sm font-bold text-[#4F46E5] hover:underline">
                  View Details
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
