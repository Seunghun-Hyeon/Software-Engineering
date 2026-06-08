'use client';

import React, { useState } from 'react';
import type { ClubDataProps } from './types';
import { OverviewTab } from './tabs/OverviewTab';
import { InfoTab } from './tabs/InfoTab';
import { NewsTab } from './tabs/NewsTab';
import { EventsTab } from './tabs/EventsTab';
import { GalleryTab } from './tabs/GalleryTab';
import { Sidebar } from './Sidebar';

export type { ClubDataProps, ClubExecutive } from './types';

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
      <nav className="no-scrollbar sticky top-16 z-40 mb-8 flex gap-8 overflow-x-auto border-b border-gray-200/50 bg-[#F3F4F6]/90 pb-0 backdrop-blur-md">
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
          {activeTab === 'overview' && (
            <OverviewTab setActiveTab={setActiveTab} />
          )}
          {activeTab === 'info' && <InfoTab clubData={clubData} />}
          {activeTab === 'news' && <NewsTab clubData={clubData} />}
          {activeTab === 'events' && <EventsTab clubId={String(clubData.id)} />}
          {activeTab === 'gallery' && <GalleryTab clubId={String(clubData.id)} />}
        </div>

        {/* Right Sidebar Column (Span 4) */}
        <Sidebar clubData={clubData} />
      </div>
    </>
  );
}
