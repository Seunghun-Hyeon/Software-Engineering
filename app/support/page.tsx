import React from 'react';
import Link from 'next/link';
import { Mail, Clock, HelpCircle, Shield, Bug } from 'lucide-react';
import { BentoCard } from '@/app/components/BentoCard';
import { SupportForm } from './SupportForm';
import { Button } from '@/app/components/Button';

export const metadata = {
  title: 'Support - Handong ClubHub',
  description: "Need support or have a question? We're here to help.",
};

export default function SupportPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden pt-32 pb-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Split Section */}
        <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Content */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold tracking-wider text-[#4F46E5] uppercase">
                Contact us
              </span>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
                We&apos;re here to help
              </h1>
            </div>
            <p className="max-w-xl font-sans text-lg leading-relaxed text-gray-600">
              Need support or have a question? We&apos;re here to help. Send us
              a message or explore our resources to learn how Handong ClubHub
              can improve your campus experience.
            </p>

            <div className="mt-4 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-gray-500">
                    Email
                  </p>
                  <a
                    href="mailto:support@clubhub.handong.edu"
                    className="font-sans text-lg font-bold text-gray-900 transition-colors hover:text-[#4F46E5]"
                  >
                    support@clubhub.handong.edu
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-gray-500">
                    Hours
                  </p>
                  <p className="font-sans text-lg font-bold text-gray-900">
                    Monday to Friday, 9 AM - 6 PM (KST)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:pl-8">
            <SupportForm />
          </div>
        </section>

        {/* Explore Resources Section */}
        <section className="flex flex-col gap-8 pt-8">
          <h2 className="font-display text-3xl font-bold text-gray-900">
            Explore resources
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <BentoCard className="flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1">
              <HelpCircle className="h-8 w-8 text-[#4F46E5]" />
              <h3 className="font-display text-xl font-bold text-gray-900">
                Help center
              </h3>
              <p className="flex-grow font-sans text-gray-600">
                Browse our extensive documentation and FAQs to find quick
                answers.
              </p>
              <Link
                href="/faq"
                className="mt-auto inline-flex items-center text-sm font-semibold text-[#4F46E5] hover:underline"
              >
                Visit Help Center &rarr;
              </Link>
            </BentoCard>

            <BentoCard className="flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1">
              <Shield className="h-8 w-8 text-[#4F46E5]" />
              <h3 className="font-display text-xl font-bold text-gray-900">
                Executive support
              </h3>
              <p className="flex-grow font-sans text-gray-600">
                Specialized tools and guides for club presidents and treasurers.
              </p>
              <Link
                href="/guidelines"
                className="mt-auto inline-flex items-center text-sm font-semibold text-[#4F46E5] hover:underline"
              >
                Access Toolkit &rarr;
              </Link>
            </BentoCard>

            <BentoCard className="flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1">
              <Bug className="h-8 w-8 text-[#4F46E5]" />
              <h3 className="font-display text-xl font-bold text-gray-900">
                Bug reporting
              </h3>
              <p className="flex-grow font-sans text-gray-600">
                Found a glitch? Help us improve by reporting technical issues.
              </p>
              <Link
                href="#"
                className="mt-auto inline-flex items-center text-sm font-semibold text-[#4F46E5] hover:underline"
              >
                Report Issue &rarr;
              </Link>
            </BentoCard>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-8 flex flex-col items-center gap-8 rounded-[24px] border border-indigo-100 bg-indigo-50 p-12 text-center">
          <h2 className="font-display max-w-2xl text-3xl font-bold text-gray-900 md:text-4xl">
            Elevate your student organization today
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button className="rounded-full bg-[#4F46E5] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:bg-indigo-600">
                Register your club
              </Button>
            </Link>
            <Link href="/clubs">
              <Button className="rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-sm transition-all duration-300 hover:bg-gray-50">
                Browse directory
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
