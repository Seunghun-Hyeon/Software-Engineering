'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Accordion } from '@/app/components/Accordion';

type Category = 'general' | 'students' | 'organizers' | 'support';

const faqData = {
  general: [
    {
      question: 'What is Handong ClubHub?',
      answer:
        'Handong ClubHub is a centralized platform designed to streamline student organization management and discovery. It connects students with vibrant campus communities and provides leaders with professional tools to grow their influence.',
    },
    {
      question: 'Who built this platform?',
      answer:
        'Handong ClubHub was developed by a collaborative team of student leaders and engineers at Handong Global University, aiming to solve the fragmentation of campus social life.',
    },
    {
      question: 'Is the platform free to use?',
      answer:
        'Yes, for all students of HGU. All core features including discovery, application, and basic management are completely free for the university community.',
    },
  ],
  students: [
    {
      question: 'How do I join a club?',
      answer:
        "Simply browse the 'Discover' page, click on a club that interests you, and hit the 'Join' or 'Apply' button. Some clubs may require a short application form.",
    },
    {
      question: 'Can I be in multiple clubs at once?',
      answer:
        'Absolutely! We encourage you to explore as many communities as you can manage. There is no hard limit on platform participation.',
    },
    {
      question: 'How will I know if my application was accepted?',
      answer:
        'You will receive an in-app notification and an email alert once the club executives have reviewed and approved your application.',
    },
  ],
  organizers: [
    {
      question: 'How do I register my club on the platform?',
      answer:
        "Go to 'Manage', click 'Create New Club', and follow the onboarding steps. You'll need club details and advisor verification.",
    },
    {
      question: 'What tools do I get as a club executive?',
      answer:
        "You'll have access to member management, event scheduling, mass-messaging, analytics, and recruitment pipelines.",
    },
    {
      question: 'Can multiple executives manage the same club?',
      answer:
        'Yes, you can assign different roles (President, Secretary, Treasurer, etc.) with granular permission levels to your team.',
    },
  ],
  support: [
    {
      question: 'I found a bug. How can I report it?',
      answer:
        "Please use the 'Report an Issue' link in the footer or email tech-support@handongclubhub.edu with screenshots and a description of the issue.",
    },
  ],
};

export function FAQTabs() {
  const [activeCategory, setActiveCategory] = useState<Category>('general');

  const categories = [
    { id: 'general', label: 'General' },
    { id: 'students', label: 'For Students' },
    { id: 'organizers', label: 'For Organizers' },
    { id: 'support', label: 'Support' },
  ] as const;

  return (
    <div className="mx-auto w-full max-w-3xl" id="faq-container">
      <nav className="mb-12 flex flex-wrap justify-center gap-4 border-b border-indigo-500/10 pb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as Category)}
            className={cn(
              'rounded-full px-6 py-2 text-sm font-semibold tracking-wide transition-all',
              activeCategory === cat.id
                ? 'bg-indigo-50 text-[#4F46E5] shadow-sm'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <div className="faq-section min-h-[400px]">
        <h2 className="font-display mb-8 text-center text-3xl font-bold text-gray-900">
          {categories.find((c) => c.id === activeCategory)?.label} Questions
        </h2>

        <div className="space-y-4">
          {faqData[activeCategory].map((faq, idx) => (
            <Accordion key={idx} title={faq.question} defaultOpen={idx === 0}>
              <p>{faq.answer}</p>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
