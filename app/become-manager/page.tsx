import React from 'react';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { BentoCard } from '@/app/components/BentoCard';
import { Button } from '@/app/components/Button';
import { ClipboardList, Users, Calendar, BarChart3 } from 'lucide-react';

export default function BecomeManagerPage() {
  return (
    <div className="bg-background flex min-h-screen flex-col font-sans text-gray-900">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            <div className="flex flex-col items-start space-y-6 md:col-span-7">
              <h1 className="font-display text-5xl leading-tight font-bold tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                Manage your club with{' '}
                <span className="text-indigo-600">unprecedented clarity.</span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                CampusLead provides a professional-grade suite of tools designed
                exclusively for student leaders. Streamline your operations from
                member onboarding to event logistics.
              </p>
              <div className="flex w-full flex-col gap-4 pt-4 sm:w-auto sm:flex-row">
                <Link
                  href="/become-manager/register"
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full px-8 py-4 text-lg sm:w-auto">
                    Initialize Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative mt-10 h-[400px] md:col-span-5 md:mt-0 md:h-[500px]">
              <div className="absolute inset-0 z-10 overflow-hidden rounded-[32px] border-4 border-white shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
                  alt="Students collaborating"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent mix-blend-multiply"></div>
              </div>
              <div className="absolute -inset-4 -z-10 rounded-[40px] bg-indigo-100/50 blur-xl"></div>
            </div>
          </div>
        </section>

        {/* Benefits Bento Grid */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Comprehensive Management Suite
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {/* Bento Cell */}
            <BentoCard className="flex h-full flex-col border-0 p-8 transition-colors hover:bg-white/90">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
                <ClipboardList className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="font-display mb-3 text-xl font-bold tracking-tight text-gray-900">
                Applicant Tracking
              </h3>
              <p className="leading-relaxed text-gray-600">
                Review applications, conduct interviews, and onboard new members
                seamlessly through a centralized funnel.
              </p>
            </BentoCard>

            {/* Bento Cell */}
            <BentoCard className="flex h-full flex-col border-0 p-8 transition-colors hover:bg-white/90">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
                <Users className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="font-display mb-3 text-xl font-bold tracking-tight text-gray-900">
                Member Roster
              </h3>
              <p className="leading-relaxed text-gray-600">
                Maintain an active directory of members, roles, and engagement
                metrics to ensure healthy club participation.
              </p>
            </BentoCard>

            {/* Bento Cell */}
            <BentoCard className="flex h-full flex-col border-0 p-8 transition-colors hover:bg-white/90">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
                <Calendar className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="font-display mb-3 text-xl font-bold tracking-tight text-gray-900">
                Event Hub
              </h3>
              <p className="leading-relaxed text-gray-600">
                Schedule meetings, book campus spaces, and track RSVPs with
                integrated university calendar syncing.
              </p>
            </BentoCard>

            {/* Bento Cell */}
            <BentoCard className="flex h-full flex-col border-0 p-8 transition-colors hover:bg-white/90">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
                <BarChart3 className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="font-display mb-3 text-xl font-bold tracking-tight text-gray-900">
                Analytics Engine
              </h3>
              <p className="leading-relaxed text-gray-600">
                Generate impact reports for student union funding requests with
                automated attendance and budget tracking.
              </p>
            </BentoCard>
          </div>
        </section>

        {/* Verification Process Layout */}
        <section className="mx-auto mb-16 max-w-7xl px-6 py-16 md:px-10">
          <BentoCard className="relative overflow-hidden border-0 p-8 md:p-12">
            <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/2 rounded-full bg-indigo-50 blur-3xl"></div>

            <div className="grid grid-cols-1 items-center gap-16">
              {/* Vertical Timeline */}
              <div className="mx-auto w-full max-w-3xl">
                <h2 className="font-display mb-10 text-center text-4xl font-bold tracking-tight text-gray-900 md:text-left">
                  Access Verification Process
                </h2>

                <div className="relative ml-4 space-y-12 border-l-2 border-gray-200 md:ml-8">
                  <div className="relative pl-8 md:pl-12">
                    <div className="absolute top-1 -left-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 shadow-sm ring-4 ring-white">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <h4 className="font-display mb-2 text-xl font-bold tracking-tight text-gray-900">
                      1. Submit Request
                    </h4>
                    <p className="max-w-xl leading-relaxed text-gray-600">
                      Provide your student ID and verify your current executive
                      role through the official university registry.
                    </p>
                  </div>

                  <div className="relative pl-8 md:pl-12">
                    <div className="absolute top-1 -left-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 ring-4 ring-white"></div>
                    <h4 className="font-display mb-2 text-xl font-bold tracking-tight text-gray-900">
                      2. Faculty Approval
                    </h4>
                    <p className="max-w-xl leading-relaxed text-gray-600">
                      Your application is routed to the Student Life office for
                      a quick confirmation of your status.
                    </p>
                  </div>

                  <div className="relative pl-8 md:pl-12">
                    <div className="absolute top-1 -left-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 ring-4 ring-white"></div>
                    <h4 className="font-display mb-2 text-xl font-bold tracking-tight text-gray-900">
                      3. Workspace Provisioning
                    </h4>
                    <p className="max-w-xl leading-relaxed text-gray-600">
                      Once approved, your club&apos;s dedicated dashboard is
                      generated and you are granted admin privileges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>
        </section>
      </main>
    </div>
  );
}
