import React from 'react';
import { BentoCard } from '@/app/components/BentoCard';
import { TermsNavigation } from './TermsNavigation';

export const metadata = {
  title: 'Terms of Service - Handong ClubHub',
  description: 'Terms of Service for using the Handong ClubHub platform.',
};

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col gap-12 px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      {/* Header Section */}
      <section className="max-w-3xl text-center md:text-left">
        <h1 className="font-display mb-6 text-4xl font-extrabold tracking-tight text-[#4F46E5] md:text-5xl">
          Terms of Service
        </h1>
        <p className="mb-4 font-sans text-lg text-gray-600">
          Last updated:{' '}
          <span className="font-semibold text-gray-900">June 7, 2026</span>
        </p>
        <div className="font-sans text-lg leading-relaxed text-gray-600">
          <p>
            Welcome to Handong ClubHub. These Terms of Service (&#34;Terms&#34;)
            govern your access to and use of the Handong ClubHub platform,
            including our website, mobile applications, and related services
            (collectively, the &#34;Service&#34;). By accessing or using the
            Service, you agree to be bound by these Terms.
          </p>
        </div>
      </section>

      {/* Editorial Layout Grid */}
      <div className="relative grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Content Sections (Left) */}
        <div className="flex flex-col gap-8 lg:col-span-8">
          {/* Section 1 */}
          <BentoCard className="scroll-mt-28 p-8" id="overview">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              1. Service Overview
            </h2>
            <div className="space-y-4 font-sans text-gray-600">
              <p>
                Handong ClubHub is an independent, student-built platform
                designed to facilitate the discovery, management, and engagement
                of student clubs and organizations at Handong Global University.
                We provide tools for club discovery, event promotion, and
                membership administration.
              </p>
            </div>
          </BentoCard>

          {/* Section 2 */}
          <BentoCard className="scroll-mt-28 p-8" id="eligibility">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              2. Eligibility
            </h2>
            <div className="space-y-4 font-sans text-gray-600">
              <p>
                Access to Handong ClubHub is strictly limited to current
                students, faculty, and staff of Handong Global University.
                Registration and authentication must be completed using a valid
                Google Workspace account ending in @handong.edu.
              </p>
            </div>
          </BentoCard>

          {/* Section 3 */}
          <BentoCard className="scroll-mt-28 p-8" id="conduct">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              3. User Conduct
            </h2>
            <div className="space-y-4 font-sans text-gray-600">
              <p>
                Users are expected to conduct themselves professionally and
                respectfully. You agree NOT to:
              </p>
              <ul className="ml-2 list-inside list-disc space-y-2">
                <li>
                  Provide false or misleading information regarding club
                  operations or personal identity.
                </li>
                <li>
                  Engage in harassment, bullying, or discriminatory behavior
                  towards other users or groups.
                </li>
                <li>
                  Attempt to breach, hack, or otherwise compromise the security
                  of the platform.
                </li>
              </ul>
            </div>
          </BentoCard>

          {/* Section 4 */}
          <BentoCard className="scroll-mt-28 p-8" id="management">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              4. Club Management
            </h2>
            <div className="space-y-4 font-sans text-gray-600">
              <p>
                Users holding &#34;Executive&#34; or &#34;Admin&#34; roles
                within a club profile bear the responsibility for verifying the
                accuracy of the club&#39;s information. Furthermore, executives
                must handle any user data (such as member lists) collected
                through the platform in compliance with applicable privacy laws
                and university guidelines.
              </p>
            </div>
          </BentoCard>

          {/* Section 5 */}
          <BentoCard className="scroll-mt-28 p-8" id="fees">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              5. Fees and Payments
            </h2>
            <div className="space-y-4 font-sans text-gray-600">
              <p>
                Handong ClubHub operates as a free platform. We do not process
                native payments, collect dues, or facilitate financial
                transactions within the app. Any membership fees or event costs
                advertised on the platform must be managed externally by the
                respective clubs.
              </p>
            </div>
          </BentoCard>

          {/* Section 6 */}
          <BentoCard className="scroll-mt-28 p-8" id="termination">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              6. Termination
            </h2>
            <div className="space-y-4 font-sans text-gray-600">
              <p>
                We reserve the right to suspend or terminate your access to the
                Service at our sole discretion, without notice, for conduct that
                we believe violates these Terms, is harmful to other users, or
                negatively impacts the community.
              </p>
            </div>
          </BentoCard>

          {/* Section 7 */}
          <BentoCard className="scroll-mt-28 p-8" id="disclaimers">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              7. Disclaimers
            </h2>
            <div className="space-y-4 font-sans text-gray-600">
              <p>
                The Service is provided on an &#34;AS IS&#34; and &#34;AS
                AVAILABLE&#34; basis. Handong ClubHub is an independent
                initiative and is NOT legally affiliated with, endorsed by, or
                operated by the official administration of Handong Global
                University.
              </p>
            </div>
          </BentoCard>

          {/* Section 8 */}
          <BentoCard className="scroll-mt-28 p-8" id="contact">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              8. Contact
            </h2>
            <div className="space-y-4 font-sans text-gray-600">
              <p>
                For inquiries regarding these Terms or the platform, please
                contact the administrative team via email. We strive to provide
                a response within 48 hours.
              </p>
            </div>
          </BentoCard>
        </div>

        {/* Sticky Table of Contents (Right Sidebar) */}
        <TermsNavigation />
      </div>
    </main>
  );
}
