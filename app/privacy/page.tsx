import React from 'react';
import { BentoCard } from '@/app/components/BentoCard';
import { PolicyNavigation } from './PolicyNavigation';

export const metadata = {
  title: 'Privacy Policy - Handong ClubHub',
  description:
    'How we look after your personal data when you visit our platform.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col gap-12 px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      {/* Header Section */}
      <section className="max-w-3xl text-center md:text-left">
        <p className="mb-4 font-sans text-sm font-semibold tracking-widest text-[#4F46E5] uppercase">
          Legal & Compliance
        </p>
        <h1 className="font-display mb-6 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mb-4 font-sans text-lg text-gray-600">
          Last updated:{' '}
          <span className="font-semibold text-gray-900">June 7, 2026</span>
        </p>
        <p className="font-sans text-lg leading-relaxed text-gray-600">
          At Handong ClubHub, we value your privacy and are committed to
          protecting your personal data. This privacy policy will inform you as
          to how we look after your personal data when you visit our platform
          and tell you about your privacy rights and how the law protects you.
        </p>
      </section>

      {/* Editorial Layout Grid */}
      <div className="relative grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Content Sections (Left) */}
        <div className="flex flex-col gap-8 lg:col-span-8">
          {/* Section 1 */}
          <BentoCard className="scroll-mt-28 p-8" id="info-collect">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              Information We Collect
            </h2>
            <p className="mb-4 font-sans text-gray-600">
              We collect data to provide effectively and provide you the best
              experiences with our platform. You provide some of this data
              directly, such as when you create a Handong ClubHub account.
            </p>
            <ul className="ml-2 list-inside list-disc space-y-2 font-sans text-gray-600">
              <li>
                <strong className="text-gray-900">Authentication Data:</strong>{' '}
                Google Auth details strictly tied to your @handong.edu email
                address.
              </li>
              <li>
                <strong className="text-gray-900">Profile Data:</strong> Student
                ID, full name, and declared major.
              </li>
              <li>
                <strong className="text-gray-900">Activity Data:</strong> Club
                applications, event registrations, and platform interactions.
              </li>
            </ul>
          </BentoCard>

          {/* Section 2 */}
          <BentoCard className="scroll-mt-28 p-8" id="how-use">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              How We Use Data
            </h2>
            <p className="mb-4 font-sans text-gray-600">
              The information we collect is utilized strictly for platform
              functionality and academic community enhancement.
            </p>
            <ul className="ml-2 list-inside list-disc space-y-2 font-sans text-gray-600">
              <li>
                <strong className="text-gray-900">
                  Identity Authentication:
                </strong>{' '}
                Verifying active student status via Handong University
                credentials.
              </li>
              <li>
                <strong className="text-gray-900">ATS Processing:</strong>{' '}
                Facilitating Applicant Tracking Systems for club recruitment.
              </li>
              <li>
                <strong className="text-gray-900">Notifications:</strong>{' '}
                Sending important updates regarding applications and club
                events.
              </li>
              <li>
                <strong className="text-gray-900">Analytics:</strong>{' '}
                Aggregated, anonymized data to improve platform performance.
              </li>
            </ul>
          </BentoCard>

          {/* Section 3 */}
          <BentoCard className="scroll-mt-28 p-8" id="data-sharing">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              Data Sharing
            </h2>
            <p className="mb-4 font-sans text-gray-600">
              We do not sell, rent, or lease your personal information to third
              parties. Your data is only shared within the necessary ecosystem
              to facilitate club operations.
            </p>
            <p className="font-sans text-gray-600">
              Data may be shared with{' '}
              <strong className="text-gray-900">Club Executives</strong> (only
              for clubs you apply to or join) and{' '}
              <strong className="text-gray-900">
                University Administration
              </strong>{' '}
              if required for official university business or compliance.
            </p>
          </BentoCard>

          {/* Section 4 */}
          <BentoCard className="scroll-mt-28 p-8" id="financial">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              Financial Information
            </h2>
            <div className="mb-4">
              <p className="mb-1 font-semibold text-gray-900">
                No Native Payments
              </p>
              <p className="font-sans text-gray-600">
                Handong ClubHub does not process or store any financial
                information, credit card numbers, or bank account details
                natively on the platform.
              </p>
            </div>
            <p className="font-sans text-gray-600">
              All club dues or event fees are handled entirely externally
              through third-party services such as KakaoPay or direct Bank
              Transfers arranged between you and the respective club executives.
            </p>
          </BentoCard>

          {/* Section 5 */}
          <BentoCard className="scroll-mt-28 p-8" id="privacy-rights">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              Privacy Rights
            </h2>
            <p className="mb-6 font-sans text-gray-600">
              Under applicable laws and university policies, you have the
              following rights regarding your personal data:
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <h4 className="mb-1 font-sans font-semibold text-gray-900">
                  Access & Portability
                </h4>
                <p className="font-sans text-sm text-gray-600">
                  Request copies of your personal data.
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <h4 className="mb-1 font-sans font-semibold text-gray-900">
                  Erasure
                </h4>
                <p className="font-sans text-sm text-gray-600">
                  Request deletion of your account and data.
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <h4 className="mb-1 font-sans font-semibold text-gray-900">
                  Rectification
                </h4>
                <p className="font-sans text-sm text-gray-600">
                  Request correction of inaccurate information.
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <h4 className="mb-1 font-sans font-semibold text-gray-900">
                  Non-Discrimination
                </h4>
                <p className="font-sans text-sm text-gray-600">
                  Equal service regardless of exercising rights.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Section 6 */}
          <BentoCard className="scroll-mt-28 p-8" id="cookies">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              Cookies & Security
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-display mb-2 text-xl font-bold text-gray-900">
                  Cookies Usage
                </h3>
                <p className="font-sans text-gray-600">
                  We use{' '}
                  <strong className="text-gray-900">
                    strictly necessary cookies
                  </strong>{' '}
                  only. These are required for the operation of our platform,
                  primarily for secure JWT (JSON Web Token) authentication
                  sessions and storing your local UI theme preferences. We do
                  not use tracking or advertising cookies.
                </p>
              </div>
              <div>
                <h3 className="font-display mb-2 text-xl font-bold text-gray-900">
                  Data Security Measures
                </h3>
                <p className="font-sans text-gray-600">
                  We have implemented appropriate technical and organizational
                  security measures designed to protect the security of any
                  personal information we process. However, despite our
                  safeguards and efforts to secure your information, no
                  electronic transmission over the Internet can be guaranteed to
                  be 100% secure.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Section 7 */}
          <BentoCard className="scroll-mt-28 p-8" id="contact">
            <h2 className="font-display mb-4 text-2xl font-bold text-gray-900">
              Contact Us
            </h2>
            <p className="mb-6 font-sans text-gray-600">
              If you have questions or comments about this notice, you may email
              our Data Protection Officer.
            </p>
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
              <a
                href="mailto:support@clubhub.handong.edu"
                className="inline-flex items-center gap-2 rounded-full bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-600 active:scale-95"
              >
                support@clubhub.handong.edu
                <span className="text-lg leading-none">&rarr;</span>
              </a>
            </div>
          </BentoCard>
        </div>

        {/* Sticky Table of Contents (Right Sidebar) */}
        <PolicyNavigation />
      </div>
    </main>
  );
}
