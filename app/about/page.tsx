import React from 'react';
import Image from 'next/image';
import { BentoCard } from '@/app/components/BentoCard';
import { Button } from '@/app/components/Button';
import Link from 'next/link';
import {
  Search,
  Users,
  Rocket,
  UserCog,
  CalendarDays,
  LineChart,
  CheckCircle2,
  Lightbulb,
  Handshake,
  HeartHandshake,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden pt-32">
      {/* Hero Section */}
      <section className="mx-auto mt-10 mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex w-full flex-col items-center gap-12 py-8 md:flex-row md:py-16">
          <div className="z-10 flex-1">
            <h1 className="font-display mb-6 text-4xl font-extrabold tracking-tight text-[#4F46E5] md:text-5xl lg:text-6xl">
              Empowering Student Leadership
            </h1>
            <p className="max-w-xl font-sans text-lg leading-relaxed text-gray-600">
              Handong ClubHub is a digital ecosystem designed to connect the
              campus community through technology. We provide the tools for
              students to find their passion and for leaders to build impactful
              organizations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/clubs">
                <Button className="rounded-full px-8 py-6 text-base shadow-[0_8px_20px_rgba(79,70,229,0.3)] transition-transform hover:scale-105">
                  Explore Clubs
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[300px] w-full flex-1 overflow-hidden rounded-2xl shadow-2xl md:h-[400px]">
            <Image
              src="/students.jpg"
              alt="A diverse group of university students collaborating"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#4F46E5]/10 blur-3xl"></div>
        </div>
      </section>

      {/* Section 1: For Students */}
      <section className="mx-auto mb-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display mb-10 text-center text-3xl font-bold text-gray-900">
          For Students
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <BentoCard className="group flex min-h-[400px] flex-col justify-between p-8 transition-all hover:shadow-xl md:col-span-8">
            <div className="flex items-start justify-between">
              <div>
                <Search className="mb-4 h-10 w-10 text-[#4F46E5]" />
                <h3 className="font-display mb-2 text-2xl font-bold text-gray-900">
                  Discover Your Passion
                </h3>
                <p className="max-w-md text-gray-600">
                  Find and explore over 100 student-led organizations tailored
                  to your interests and career goals.
                </p>
              </div>
            </div>
            <div className="relative mt-6 h-48 w-full overflow-hidden rounded-2xl">
              <Image
                src="/football2.jpg"
                alt="University club fair"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </BentoCard>

          <BentoCard className="group flex min-h-[400px] flex-col border-[#4F46E5] bg-[#4F46E5] p-8 transition-all hover:shadow-xl md:col-span-4">
            <Users className="mb-4 h-10 w-10 text-white" />
            <h3 className="font-display mb-2 text-2xl font-bold text-white">
              Join Instantly
            </h3>
            <p className="mb-6 text-indigo-100">
              Connect with club leaders and become a member with a single click.
              No paperwork, just community.
            </p>
            <div className="mt-auto text-center">
              <div className="mb-4 flex justify-center -space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#4F46E5] bg-indigo-100 text-xs font-bold text-indigo-700">
                  JD
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#4F46E5] bg-emerald-100 text-xs font-bold text-emerald-700">
                  MS
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#4F46E5] bg-violet-100 text-xs font-bold text-violet-700">
                  RK
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#4F46E5] bg-gray-200 text-xs font-bold text-gray-600">
                  +12
                </div>
              </div>
              <span className="text-xs font-semibold tracking-wider text-white uppercase">
                Join 500+ Active Students
              </span>
            </div>
          </BentoCard>

          <BentoCard className="group flex flex-col items-center gap-8 p-8 transition-all hover:shadow-xl md:col-span-12 md:flex-row">
            <div className="flex-1">
              <Rocket className="mb-4 h-10 w-10 text-violet-600" />
              <h3 className="font-display mb-2 text-2xl font-bold text-gray-900">
                Lead the Way
              </h3>
              <p className="text-gray-600">
                Step into leadership roles. Access exclusive workshops,
                mentorship, and resources to help you lead your organization
                effectively and leave a lasting legacy.
              </p>
            </div>
            <div className="relative h-40 w-full flex-1 overflow-hidden rounded-2xl md:h-64">
              <Image
                src="/lead2.jpg"
                alt="Student leader presenting"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Section 2: For Organizers */}
      <section className="relative mb-24 py-24">
        <div className="absolute inset-0 -z-10 border-y border-white/50 bg-white/40 backdrop-blur-3xl"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-10 text-center text-3xl font-bold text-gray-900">
            For Organizers
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <BentoCard className="group h-full p-8 transition-all hover:bg-white/90 md:col-span-4">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 transition-transform group-hover:scale-110">
                <UserCog className="h-7 w-7 text-[#4F46E5]" />
              </div>
              <h3 className="font-display mb-3 text-xl font-bold text-gray-900">
                Manage Members
              </h3>
              <p className="text-gray-600">
                Effortlessly track memberships, handle applications, and
                communicate with your entire team through our centralized
                dashboard.
              </p>
            </BentoCard>

            <BentoCard className="group h-full p-8 transition-all hover:bg-white/90 md:col-span-4">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 transition-transform group-hover:scale-110">
                <CalendarDays className="h-7 w-7 text-[#10B981]" />
              </div>
              <h3 className="font-display mb-3 text-xl font-bold text-gray-900">
                Track Events
              </h3>
              <p className="text-gray-600">
                Plan, schedule, and promote your events. Use QR check-ins to
                track attendance in real-time and manage RSVP lists seamlessly.
              </p>
            </BentoCard>

            <BentoCard className="group h-full p-8 transition-all hover:bg-white/90 md:col-span-4">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 transition-transform group-hover:scale-110">
                <LineChart className="h-7 w-7 text-violet-600" />
              </div>
              <h3 className="font-display mb-3 text-xl font-bold text-gray-900">
                Analytics
              </h3>
              <p className="text-gray-600">
                Gain insights into your club&apos;s growth. Visualize engagement
                trends and attendance data to make informed decisions for your
                community.
              </p>
            </BentoCard>

            <BentoCard className="flex flex-col items-center gap-12 p-8 md:col-span-12 md:flex-row md:p-12">
              <div className="md:w-1/2">
                <h3 className="font-display mb-4 text-3xl font-bold text-gray-900">
                  Professional Tools for Professional Leaders
                </h3>
                <p className="mb-6 text-lg text-gray-600">
                  We&apos;ve built a suite of administrative tools that take the
                  heavy lifting out of club management, allowing you to focus on
                  what matters: your mission.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 font-medium text-gray-700">
                    <CheckCircle2 className="h-6 w-6 text-[#4F46E5]" />
                    Automated Reporting
                  </li>
                  <li className="flex items-center gap-3 font-medium text-gray-700">
                    <CheckCircle2 className="h-6 w-6 text-[#4F46E5]" />
                    Budget Management
                  </li>
                  <li className="flex items-center gap-3 font-medium text-gray-700">
                    <CheckCircle2 className="h-6 w-6 text-[#4F46E5]" />
                    Multi-channel Announcements
                  </li>
                </ul>
              </div>
              <div className="h-72 w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-inner md:w-1/2">
                <div className="flex h-full w-full flex-col gap-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-40 rounded-md bg-gray-100"></div>
                    <div className="h-5 w-24 rounded-md bg-indigo-50"></div>
                  </div>
                  <div className="flex flex-1 items-end gap-3 px-2">
                    <div className="h-[40%] flex-1 rounded-t-md bg-indigo-200 transition-all hover:h-[45%]"></div>
                    <div className="h-[60%] flex-1 rounded-t-md bg-indigo-300 transition-all hover:h-[65%]"></div>
                    <div className="h-full flex-1 rounded-t-md bg-[#4F46E5] transition-all hover:h-[105%]"></div>
                    <div className="h-[80%] flex-1 rounded-t-md bg-indigo-400 transition-all hover:h-[85%]"></div>
                    <div className="h-[30%] flex-1 rounded-t-md bg-indigo-100 transition-all hover:h-[35%]"></div>
                  </div>
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* Section 3: Our Values */}
      <section className="mx-auto mb-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display mb-12 text-center text-3xl font-bold text-gray-900">
          Our Values
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <BentoCard className="group flex flex-col items-center p-10 text-center transition-transform duration-300 hover:-translate-y-2">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 transition-colors duration-300 group-hover:bg-[#4F46E5]">
              <Lightbulb className="h-10 w-10 text-[#4F46E5] transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="font-display mb-4 text-xl font-bold text-gray-900">
              Innovation
            </h3>
            <p className="leading-relaxed text-gray-600">
              We constantly push the boundaries of campus technology to create
              seamless experiences for every student.
            </p>
          </BentoCard>

          <BentoCard className="group flex flex-col items-center p-10 text-center transition-transform duration-300 hover:-translate-y-2">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 transition-colors duration-300 group-hover:bg-[#10B981]">
              <Handshake className="h-10 w-10 text-[#10B981] transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="font-display mb-4 text-xl font-bold text-gray-900">
              Collaboration
            </h3>
            <p className="leading-relaxed text-gray-600">
              Great things are never done by one person. We foster a culture of
              teamwork and mutual support across the campus.
            </p>
          </BentoCard>

          <BentoCard className="group flex flex-col items-center p-10 text-center transition-transform duration-300 hover:-translate-y-2">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-violet-50 transition-colors duration-300 group-hover:bg-violet-600">
              <HeartHandshake className="h-10 w-10 text-violet-600 transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="font-display mb-4 text-xl font-bold text-gray-900">
              Community
            </h3>
            <p className="leading-relaxed text-gray-600">
              Our platform is the digital bridge that connects students to their
              second home, creating lasting bonds and memories.
            </p>
          </BentoCard>
        </div>
      </section>

      {/* Section 4: Our Story */}
      <section className="mx-auto mb-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <BentoCard className="relative overflow-hidden border-none bg-white/70 p-12 md:p-20">
          <div className="relative z-10 flex flex-col gap-16 md:flex-row">
            <div className="md:w-1/2">
              <h2 className="font-display mb-8 text-3xl font-bold text-gray-900">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  Founded in the Spring of 2026 by a team of software
                  engineering and AI students, Handong ClubHub was born out of
                  an intensive development sprint to solve a persistent campus
                  problem: the fragmented, manual process of club recruitment
                  and management.
                </p>
                <p>
                  What began as a focused engineering project quickly
                  transformed into a vision for a university-wide standard. We
                  recognized that student organizations are the heartbeat of
                  Handong Global University, yet club executives were bogged
                  down by inefficient paperwork, and students lacked a unified
                  way to discover their passions.
                </p>
                <p>
                  Today, Handong ClubHub is being built from the ground up to
                  support every student and organization on campus, serving as
                  the central, high-performance ecosystem for club discovery,
                  application tracking, and seamless community engagement.
                </p>
              </div>
            </div>
            <div className="relative space-y-10 md:w-1/2">
              {/* Timeline line */}
              <div className="absolute top-2 bottom-2 left-2 w-0.5 bg-indigo-100"></div>

              <div className="relative pl-10">
                <div className="absolute top-1 left-0 h-4 w-4 rounded-full bg-[#4F46E5] ring-4 ring-indigo-100"></div>
                <span className="mb-1 block text-sm font-semibold tracking-wider text-[#4F46E5] uppercase">
                  SPRING 2026
                </span>
                <h4 className="font-display mb-2 text-lg font-bold text-gray-900">
                  Inception
                </h4>
                <p className="text-gray-600">
                  The project officially kicks off. The core architecture—a
                  modern, high-speed directory and application tracking
                  system—is designed and developed during an accelerated
                  engineering sprint.
                </p>
              </div>

              <div className="relative pl-10">
                <div className="absolute top-1 left-0 h-4 w-4 rounded-full bg-indigo-300"></div>
                <span className="mb-1 block text-sm font-semibold tracking-wider text-gray-500 uppercase">
                  SUMMER 2026
                </span>
                <h4 className="font-display mb-2 text-lg font-bold text-gray-900">
                  Beta Testing
                </h4>
                <p className="text-gray-600">
                  Partnering with initial pilot clubs at Handong to stress-test
                  the platform, refine the executive dashboard features, and
                  ensure a seamless applicant experience.
                </p>
              </div>

              <div className="relative pl-10">
                <div className="absolute top-1 left-0 h-4 w-4 rounded-full bg-indigo-200"></div>
                <span className="mb-1 block text-sm font-semibold tracking-wider text-gray-500 uppercase">
                  FALL 2026 & BEYOND
                </span>
                <h4 className="font-display mb-2 text-lg font-bold text-gray-900">
                  Campus Integration
                </h4>
                <p className="text-gray-600">
                  Full public rollout to the Handong student body, aiming to
                  become the official digital infrastructure for all
                  extracurricular activities and campus management.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-40 -left-40 -z-10 h-96 w-96 rounded-full bg-[#10B981]/10 blur-3xl"></div>
        </BentoCard>
      </section>

      {/* CTA Section */}
      <section className="relative mt-auto w-full overflow-hidden bg-[#4F46E5] text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-32 lg:px-8">
          <h2 className="font-display mb-6 text-4xl font-bold md:text-5xl">
            Ready to find your place?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-indigo-100">
            Join thousands of students who have already discovered their
            community. Your university journey starts here.
          </p>
          <Link href="/signup">
            <Button className="rounded-full bg-white px-10 py-6 text-lg font-bold text-[#4F46E5] shadow-xl transition-transform hover:scale-105 hover:bg-gray-50">
              Get Started Today
            </Button>
          </Link>
        </div>
        {/* Abstract patterns */}
        <div className="absolute top-0 right-0 h-full w-1/2 translate-x-1/3 skew-x-[-20deg] bg-white/5"></div>
        <div className="absolute bottom-0 left-0 h-1/2 w-1/3 rounded-full bg-white/10 blur-2xl"></div>
      </section>
    </main>
  );
}
