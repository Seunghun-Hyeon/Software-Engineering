import React from 'react';
import { Clock, MapPin } from 'lucide-react';

export function EventsTab() {
  return (
    <section className="min-h-[500px] rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
        Upcoming & Past Events
      </h2>
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-6 rounded-[20px] border border-[#4F46E5]/20 bg-[#4F46E5]/5 p-6">
          <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-[16px] bg-[#4F46E5] text-white shadow-lg">
            <span className="text-sm font-bold tracking-wider uppercase opacity-90">
              OCT
            </span>
            <span className="text-2xl font-black">15</span>
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-start justify-between">
              <h3 className="font-display text-xl font-bold text-gray-900">
                Intro to React Workshop
              </h3>
              <span className="rounded-full bg-[#10B981]/10 px-3 py-1 text-xs font-bold text-[#10B981]">
                UPCOMING
              </span>
            </div>
            <p className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-600">
              <Clock className="h-4 w-4" /> 18:00 - 20:00 •{' '}
              <MapPin className="h-4 w-4" /> IT Center Room 204
            </p>
            <p className="text-sm text-gray-600">
              Learn the basics of React, components, and state management.
              Perfect for beginners and those looking to refresh their skills.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6 rounded-[20px] border border-gray-200 bg-gray-50 p-6">
          <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-[16px] bg-gray-200 text-gray-600">
            <span className="text-sm font-bold tracking-wider uppercase opacity-90">
              NOV
            </span>
            <span className="text-2xl font-black">02</span>
          </div>
          <div className="flex-1">
            <h3 className="font-display mb-1 text-xl font-bold text-gray-900">
              Annual Hackathon Kickoff
            </h3>
            <p className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-600">
              <Clock className="h-4 w-4" /> 09:00 - 21:00 •{' '}
              <MapPin className="h-4 w-4" /> Main Auditorium
            </p>
            <p className="text-sm text-gray-600">
              Join us for the opening ceremony of our annual 48-hour hackathon.
              Form teams, meet mentors, and start building!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
