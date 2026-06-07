import React from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/Button';
import { FAQTabs } from './FAQTabs';

export const metadata = {
  title: 'FAQ | Handong ClubHub',
  description:
    'Frequently Asked Questions about Handong ClubHub for students and organizers.',
};

export default function FAQPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden pt-32">
      {/* Hero Section */}
      <section className="relative mx-auto mt-10 mb-12 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="font-display mb-6 text-4xl font-extrabold tracking-tight text-[#4F46E5] md:text-5xl lg:text-6xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-gray-600">
          Everything you need to know about Handong ClubHub, whether you are
          looking to join a community or lead one.
        </p>
      </section>

      {/* Interactive FAQ Tabs */}
      <section className="mx-auto mb-24 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <FAQTabs />
      </section>

      {/* CTA Section */}
      <section className="relative mt-auto w-full overflow-hidden bg-[#4F46E5] text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-32 lg:px-8">
          <h2 className="font-display mb-6 text-4xl font-bold md:text-5xl">
            Still have questions?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-indigo-100">
            We&apos;re here to help you get the most out of your campus
            experience.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button className="rounded-full bg-white px-10 py-6 text-lg font-bold text-[#4F46E5] shadow-xl transition-transform hover:scale-105 hover:bg-gray-50">
                Contact Support
              </Button>
            </Link>
            <Link href="https://discord.gg/clubhub" target="_blank">
              <Button className="rounded-full border-2 border-indigo-300/30 bg-[#4F46E5] px-10 py-6 text-lg font-bold text-white transition-transform hover:scale-105 hover:bg-indigo-600">
                Join Discord
              </Button>
            </Link>
          </div>
        </div>

        {/* Abstract patterns */}
        <div className="absolute top-0 right-0 h-full w-1/2 translate-x-1/3 skew-x-[-20deg] bg-white/5"></div>
        <div className="absolute bottom-0 left-0 h-1/2 w-1/3 rounded-full bg-white/10 blur-2xl"></div>
      </section>
    </main>
  );
}
