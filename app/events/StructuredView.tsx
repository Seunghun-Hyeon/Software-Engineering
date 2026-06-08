import React from 'react';
import Image from 'next/image';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import type { Event } from '@/types/event';
import Link from 'next/link';

interface StructuredViewProps {
  events: Event[];
}

export function StructuredView({ events }: StructuredViewProps) {
  return (
    <div>
      {/* Events Structured List */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {events.map((event, idx) => (
          <Link
            href={`/events/${event.id}`}
            key={event.id}
            className="group block flex cursor-pointer flex-col overflow-hidden rounded-[24px] border border-white/30 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 sm:flex-row"
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
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button className="rounded-full bg-gray-200 px-10 py-4 text-sm font-bold text-gray-900 transition-all duration-300 hover:bg-gray-300">
          View All Upcoming Events
        </button>
      </div>
    </div>
  );
}
