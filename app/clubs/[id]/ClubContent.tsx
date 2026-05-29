'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Users,
  Globe,
  MessageCircle,
  Video,
  ArrowRight,
  ArrowUpRight,
  Clock,
  CreditCard,
} from 'lucide-react';
export type ClubExecutive = { name: string; role: string };

export type ClubDataProps = {
  id: number | string;
  name: string;
  mission?: string;
  coreValues?: string | string[];
  memberCount?: number;
  meetingTime?: string;
  meetingLocation?: string;
  fee?: string;
  isAcceptingApplications?: boolean;
  executives?: ClubExecutive[];
  socials?: { instagram?: string; kakao?: string; youtube?: string };
  [key: string]: unknown;
};

export function ClubContent({ clubData }: { clubData: ClubDataProps }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'info', label: 'Info' },
    { id: 'news', label: 'News' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
  ];

  return (
    <>
      {/* Sticky Content Menu */}
      <nav className="no-scrollbar sticky top-20 z-40 mb-8 flex gap-8 overflow-x-auto border-b border-gray-200/50 bg-[#F3F4F6]/90 pb-0 backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 pb-4 font-sans text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-gray-500 hover:text-[#4F46E5]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column (Span 8) */}
        <div className="flex flex-col gap-10 lg:col-span-8">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <>
              {/* Latest News Preview */}
              <section>
                <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
                  Latest News
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex flex-col rounded-[20px] border-2 border-[#10B981] bg-white p-6">
                    <p className="mb-2 text-xs font-semibold text-gray-500">
                      OCT 24, 2023
                    </p>
                    <h3 className="font-display mb-3 text-lg leading-tight font-bold text-[#3323cc]">
                      Fall Hackathon Registration Now Open
                    </h3>
                    <p className="mb-6 flex-grow text-sm text-gray-600">
                      Secure your spot for the biggest coding event of the
                      semester. $5,000 in prizes.
                    </p>
                    <button
                      onClick={() => setActiveTab('news')}
                      className="flex items-center gap-1 text-sm font-semibold text-[#10B981] hover:underline"
                    >
                      Read More <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-col rounded-[20px] border border-gray-100 bg-white p-6 shadow-sm">
                    <p className="mb-2 text-xs font-semibold text-gray-500">
                      OCT 20, 2023
                    </p>
                    <h3 className="font-display mb-3 text-lg leading-tight font-bold text-gray-900">
                      New Partnership: TechGiant Cloud
                    </h3>
                    <p className="mb-6 flex-grow text-sm text-gray-600">
                      All members now receive $500 in cloud credits for their
                      personal projects.
                    </p>
                    <button
                      onClick={() => setActiveTab('news')}
                      className="flex items-center gap-1 text-sm font-semibold text-[#3323cc] hover:underline"
                    >
                      Read More <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-col rounded-[20px] bg-[#3323cc] p-6 shadow-md">
                    <p className="mb-2 text-xs font-semibold text-[#c0c1ff]">
                      OCT 15, 2023
                    </p>
                    <h3 className="font-display mb-3 text-lg leading-tight font-bold text-white">
                      Community Spotlight: The Solar Project
                    </h3>
                    <p className="mb-6 flex-grow text-sm text-[#dad7ff]">
                      How our junior members built a low-cost solar tracker for
                      the library.
                    </p>
                    <button
                      onClick={() => setActiveTab('news')}
                      className="flex items-center gap-1 text-sm font-semibold text-[#6ffbbe] hover:underline"
                    >
                      View Story <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Upcoming Events Preview */}
              <section className="rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-display text-2xl font-bold text-gray-900">
                    Upcoming Events
                  </h2>
                  <button
                    onClick={() => setActiveTab('events')}
                    className="flex items-center gap-1 text-sm font-semibold text-[#3323cc] hover:underline"
                  >
                    View All <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-6 rounded-[16px] p-4 transition-colors hover:bg-gray-50">
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[12px] bg-[#4F46E5] text-white">
                      <span className="text-xs font-bold tracking-wider uppercase opacity-90">
                        OCT
                      </span>
                      <span className="text-xl font-black">15</span>
                    </div>
                    <div>
                      <h3 className="font-display mb-1 text-lg font-bold text-gray-900">
                        Intro to React Workshop
                      </h3>
                      <p className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Clock className="h-4 w-4" /> 18:00 - 20:00 •{' '}
                        <MapPin className="h-4 w-4" /> IT Center Room 204
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 rounded-[16px] p-4 transition-colors hover:bg-gray-50">
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[12px] bg-gray-200 text-gray-700">
                      <span className="text-xs font-bold tracking-wider uppercase opacity-70">
                        NOV
                      </span>
                      <span className="text-xl font-black">02</span>
                    </div>
                    <div>
                      <h3 className="font-display mb-1 text-lg font-bold text-gray-900">
                        Annual Hackathon Kickoff
                      </h3>
                      <p className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Clock className="h-4 w-4" /> 09:00 - 21:00 •{' '}
                        <MapPin className="h-4 w-4" /> Main Auditorium
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sneak peek gallery */}
              <section className="rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-display text-2xl font-bold text-gray-900">
                    Recent Pictures
                  </h2>
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className="flex items-center gap-1 text-sm font-semibold text-[#3323cc] hover:underline"
                  >
                    View Gallery <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-opacity hover:opacity-90"
                      onClick={() => setActiveTab('gallery')}
                    >
                      <Image
                        src={`/concert${i}.jpg`}
                        alt={`Preview ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* INFO TAB */}
          {activeTab === 'info' && (
            <section className="min-h-[500px] rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
                About the Club
              </h2>

              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="font-display mb-3 text-xl font-bold text-[#3323cc]">
                    Description
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {clubData.mission ||
                      'We are a dedicated group of students passionate about bringing change and innovation to Handong Global University. Our club serves as a platform for growth, learning, and collaboration.'}
                  </p>
                </div>

                <div>
                  <h3 className="font-display mb-3 text-xl font-bold text-[#3323cc]">
                    Core Values
                  </h3>
                  <ul className="list-inside list-disc space-y-2 leading-relaxed text-gray-600">
                    {Array.isArray(clubData.coreValues) ? (
                      clubData.coreValues.map((value: string, idx: number) => (
                        <li key={idx}>{value}</li>
                      ))
                    ) : typeof clubData.coreValues === 'string' ? (
                      <li>{clubData.coreValues}</li>
                    ) : (
                      <>
                        <li>
                          <strong>Community:</strong> Building strong
                          relationships among members.
                        </li>
                        <li>
                          <strong>Excellence:</strong> Striving for the best in
                          all our endeavors.
                        </li>
                        <li>
                          <strong>Innovation:</strong> Finding creative
                          solutions to real-world problems.
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display mb-3 text-xl font-bold text-[#3323cc]">
                    History & Goals
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    Founded with the vision to empower students, we have
                    consistently achieved our goals year after year. Our primary
                    objective for this semester is to expand our reach, host
                    larger scale events, and provide more hands-on opportunities
                    for all our active members to thrive.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* NEWS TAB */}
          {activeTab === 'news' && (
            <section className="min-h-[500px] rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
                All News
              </h2>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6 rounded-[20px] border border-gray-100 bg-gray-50 p-6 md:flex-row">
                  <div className="flex-1">
                    <p className="mb-1 text-sm font-semibold text-[#10B981]">
                      OCT 24, 2023
                    </p>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                      Fall Hackathon Registration Now Open
                    </h3>
                    <p className="mb-4 text-gray-600">
                      Join us for the largest coding event of the semester.
                      Compete with teams of up to 4 for a total prize pool of
                      $5,000, and get a chance to network with direct recruiters
                      from top tech firms.
                    </p>
                    <button className="text-sm font-bold text-[#3323cc] hover:underline">
                      Read full article &rarr;
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-6 rounded-[20px] border border-gray-100 bg-gray-50 p-6 md:flex-row">
                  <div className="flex-1">
                    <p className="mb-1 text-sm font-semibold text-gray-500">
                      OCT 20, 2023
                    </p>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                      New Partnership: TechGiant Cloud
                    </h3>
                    <p className="mb-4 text-gray-600">
                      We are thrilled to announce a new partnership. All active
                      members will now receive $500 in cloud credits for their
                      personal projects and research deployments.
                    </p>
                    <button className="text-sm font-bold text-[#3323cc] hover:underline">
                      Read full article &rarr;
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-6 rounded-[20px] border border-gray-100 bg-gray-50 p-6 md:flex-row">
                  <div className="flex-1">
                    <p className="mb-1 text-sm font-semibold text-gray-500">
                      OCT 15, 2023
                    </p>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                      Community Spotlight: The Solar Project
                    </h3>
                    <p className="mb-4 text-gray-600">
                      See how a team of our junior members collaborated to build
                      a low-cost, open-source solar tracker that is now
                      installed in the campus library garden.
                    </p>
                    <button className="text-sm font-bold text-[#3323cc] hover:underline">
                      Read full article &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* EVENTS TAB */}
          {activeTab === 'events' && (
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
                      Learn the basics of React, components, and state
                      management. Perfect for beginners and those looking to
                      refresh their skills.
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
                      Join us for the opening ceremony of our annual 48-hour
                      hackathon. Form teams, meet mentors, and start building!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <section className="min-h-[500px] rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
                Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-gray-100 shadow-sm md:aspect-video"
                  >
                    <Image
                      src={`/concert${i === 1 || i === 2 ? i : ''}.jpg`} // using existing mock images
                      alt={`Gallery Image ${i}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                      <span className="font-bold tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
                        VIEW
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar Column (Span 4) */}
        <aside className="flex flex-col gap-6 lg:col-span-4">
          {/* Details Section */}
          <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="font-display mb-6 text-xl font-bold text-gray-900">
              Details
            </h3>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-full bg-[#e1e0ff]/50 p-3 text-[#3323cc]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Members</p>
                  <p className="text-sm font-bold text-gray-900">
                    {clubData.memberCount}+ Active
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-full bg-[#e1e0ff]/50 p-3 text-[#3323cc]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Meeting Time
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {clubData.meetingTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-full bg-[#e1e0ff]/50 p-3 text-[#3323cc]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-sm font-bold text-gray-900">
                    {clubData.meetingLocation}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-full bg-[#e1e0ff]/50 p-3 text-[#3323cc]">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Membership Fee
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {clubData.fee}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Join CTA */}
          {clubData.isAcceptingApplications && (
            <div className="flex flex-col items-center rounded-[24px] border-2 border-[#e1e0ff] bg-white p-6 text-center shadow-sm">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e1e0ff] text-[#3323cc]">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-display mb-2 text-2xl font-bold text-gray-900">
                Join {clubData.name}
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                Applications for the Spring semester are currently open.
                Don&apos;t miss out!
              </p>
              <button className="w-full rounded-full bg-[#3323cc] py-4 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#2a1ca8]">
                Apply Now
              </button>
            </div>
          )}

          {/* Leadership */}
          <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="font-display mb-6 text-xl font-bold text-gray-900">
              Leadership
            </h3>
            <ul className="flex flex-col gap-5">
              {clubData.executives?.map((exec: ClubExecutive, i: number) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c3c0ff] bg-[#e1e0ff] text-[#3323cc]">
                    <span className="text-sm font-bold">
                      {exec.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {exec.name}
                    </p>
                    <p className="text-sm font-semibold text-[#3323cc]">
                      {exec.role}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-2 rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
            <Link
              href="#"
              className="group flex items-center justify-between rounded-[12px] p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-black text-white">
                  <Globe className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {clubData.socials.instagram}
                </span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-300 transition-colors group-hover:text-[#4F46E5]" />
            </Link>
            <Link
              href="#"
              className="group flex items-center justify-between rounded-[12px] p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border-2 border-yellow-400 text-yellow-400">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {clubData.socials.kakao}
                </span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-300 transition-colors group-hover:text-[#4F46E5]" />
            </Link>
            <Link
              href="#"
              className="group flex items-center justify-between rounded-[12px] p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-red-600 text-white">
                  <Video className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {clubData.socials.youtube}
                </span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-300 transition-colors group-hover:text-[#4F46E5]" />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
