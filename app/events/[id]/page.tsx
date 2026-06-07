import React from 'react';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { BentoCard } from '@/app/components/BentoCard';
import { Button } from '@/app/components/Button';
import { headers } from 'next/headers';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Event } from '@/types/event';

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let apiEndpoint = '';
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    apiEndpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/events`;
  } else {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol =
      host.includes('localhost') || host.includes('127.0.0.1')
        ? 'http'
        : 'https';
    apiEndpoint = `${protocol}://${host}/api/events`;
  }

  let foundEvent: Event | null = null;
  try {
    const res = await fetch(apiEndpoint);
    if (res.ok) {
      const events: Event[] = await res.json();
      foundEvent = events.find((e) => String(e.id) === id) || null;
    }
  } catch (err) {
    console.error('Failed to fetch events from backend:', err);
  }

  if (!foundEvent) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center bg-[#F9FAFB] font-sans">
        <Header activeLabel="Events" />
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-gray-900">
            Event not found
          </h1>
          <Link
            href="/events"
            className="mt-4 inline-block font-sans text-[#4F46E5] hover:underline"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#F3F4F6] font-sans selection:bg-[#4F46E5]/20">
      <Header activeLabel="Events" />

      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 pt-24 pb-24 sm:px-6 md:px-10 lg:px-8">
        {/* Hero Cover Image (Bento Card style) */}
        <div className="relative h-[300px] w-full overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:h-[400px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={foundEvent.title}
            className="h-full w-full object-cover"
            src={
              foundEvent.image ||
              'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2500&auto=format&fit=crop'
            }
          />
        </div>

        {/* Layout Grid */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Left Column: Main Information */}
          <div className="flex flex-col gap-5 md:col-span-8">
            {/* Title & About Card */}
            <BentoCard className="border border-white/50 p-6 md:p-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50 px-3 py-1 text-emerald-700">
                <Calendar className="h-4 w-4" />
                <span className="font-sans text-xs font-medium tracking-wider uppercase">
                  {foundEvent.categoryBadge || 'Upcoming Event'}
                </span>
              </div>
              <h1 className="font-display mb-6 text-3xl font-bold text-gray-900 md:text-5xl">
                {foundEvent.title}
              </h1>
              <div className="space-y-6 font-sans text-lg text-gray-600">
                <p>
                  {foundEvent.description ||
                    'No description provided for this event.'}
                </p>
                <p>
                  Hosted by{' '}
                  <strong className="font-semibold text-gray-900">
                    {foundEvent.host}
                  </strong>
                  .
                </p>
              </div>
            </BentoCard>

            {/* Event Poster Card */}
            <BentoCard className="border border-white/50 p-4 md:p-6">
              <h3 className="font-display mb-4 px-2 text-2xl font-bold text-gray-900">
                Official Poster
              </h3>
              <div className="relative overflow-hidden rounded-[16px] border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Event Poster"
                  className="h-auto w-full object-cover"
                  src={
                    foundEvent.image ||
                    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2500&auto=format&fit=crop'
                  }
                />
              </div>
            </BentoCard>
          </div>

          {/* Right Column: Sidebar Logistics */}
          <div className="flex flex-col gap-5 md:col-span-4">
            {/* Registration Card */}
            <BentoCard className="sticky top-24 border border-white/50 p-6 md:p-8">
              <h2 className="font-display mb-6 border-b border-gray-100 pb-4 text-2xl font-bold text-gray-900">
                Logistics
              </h2>
              <ul className="mb-8 space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="mb-1 font-sans text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Date
                    </p>
                    <p className="font-sans text-base font-medium text-gray-900">
                      {foundEvent.date}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="mb-1 font-sans text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Time
                    </p>
                    <p className="font-sans text-base font-medium text-gray-900">
                      {foundEvent.time}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="mb-1 font-sans text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Location
                    </p>
                    <p className="font-sans text-base font-medium text-gray-900">
                      {foundEvent.location}
                    </p>
                  </div>
                </li>
              </ul>
              <Button className="w-full rounded-full bg-[#4F46E5] py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-500/40">
                {foundEvent.requiresTickets ? 'Get Tickets' : 'Register Now'}
              </Button>
              <p className="mt-4 text-center font-sans text-xs font-medium text-gray-500">
                Secure your spot today
              </p>
            </BentoCard>
          </div>
        </div>
      </main>
    </div>
  );
}
