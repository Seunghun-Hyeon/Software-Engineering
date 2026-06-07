import React from 'react';
import { Bell, FileText, Clock, Users } from 'lucide-react';
import { FeatureTile } from '@/app/components/FeatureTile';

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-24 pb-12 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="flex flex-col items-start text-left lg:col-span-5">
          <h2 className="font-display text-3xl leading-tight font-black tracking-tight text-gray-900 sm:text-4xl">
            Tired of missing out?
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-gray-500">
            ClubHub brings the campus to you. One place to find events and join
            the clubs you love without checking twenty different group chats.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#4F46E5]/30 bg-[#4F46E5]/15 shadow-sm">
                <span className="text-xs font-black text-[#4F46E5]">✓</span>
              </div>
              <span className="font-sans text-base font-bold text-gray-800">
                Verified Organizations
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#4F46E5]/30 bg-[#4F46E5]/15 shadow-sm">
                <span className="text-xs font-black text-[#4F46E5]">✓</span>
              </div>
              <span className="font-sans text-base font-bold text-gray-800">
                Real-time Updates
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
          {[
            {
              title: 'Instant Event Alerts',
              description:
                'Get notified immediately when your favorite HGU squads announce tryouts or general body meetings.',
              icon: Bell,
              colorClass: 'text-[#4F46E5] bg-[#4F46E5]/10 border-[#4F46E5]/20',
            },
            {
              title: 'Easy Applications',
              description:
                'Submit standardized applications to multiple clubs directly within our central applicant store.',
              icon: FileText,
              colorClass: 'text-[#4F46E5] bg-[#4F46E5]/10 border-[#4F46E5]/20',
            },
            {
              title: 'Smart Scheduling',
              description:
                'Sync events seamlessly into Google Calendar, ensuring zero academic conflicts with major exams.',
              icon: Clock,
              colorClass: 'text-[#4F46E5] bg-[#4F46E5]/10 border-[#4F46E5]/20',
            },
            {
              title: 'Member Community',
              description:
                'Engage with fellow student leads, developers, designers, and performers in dedicated public boards.',
              icon: Users,
              colorClass: 'text-[#4F46E5] bg-[#4F46E5]/10 border-[#4F46E5]/20',
            },
          ].map((feat, idx) => (
            <FeatureTile
              key={idx}
              title={feat.title}
              description={feat.description}
              icon={feat.icon}
              colorClass={feat.colorClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
