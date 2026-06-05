'use client';

import React, { useState } from 'react';
// Lucide 아이콘 라이브러리 사용 (없으시다면 npm i lucide-react 설치 혹은 svg로 대체 가능)
import {
  User,
  Users,
  ClipboardList,
  Calendar,
  Settings,
  Plus,
} from 'lucide-react';

// Components
import ClubProfileTab from '../ClubProfile';
import MembersTab from '../Members';
import RecruitmentTab from '../Recruitment';
import EventsTab from '../Events';
import SettingsTab from '../Settings';

type Tab = 'clubProfile' | 'members' | 'recruitment' | 'events' | 'settings';

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('clubProfile');

  const renderContent = () => {
    switch (activeTab) {
      case 'clubProfile':
        return <ClubProfileTab />;
      case 'members':
        return <MembersTab />;
      case 'recruitment':
        return <RecruitmentTab />;
      case 'events':
        return <EventsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <ClubProfileTab />;
    }
  };

  // 메뉴 아이템 구조화
  const menuItems = [
    { id: 'clubProfile', label: 'Club Profile', icon: User },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'recruitment', label: 'Recruitment', icon: ClipboardList },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#F8FAFC] font-sans text-slate-900 antialiased">
      {/* 1. 상단 글로벌 네비게이션 바 (Handong ClubHub) */}
      <header className="z-10 flex h-16 w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-indigo-600">
            Handong ClubHub
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="transition hover:text-indigo-600">
            Clubs
          </a>
          <a href="#" className="transition hover:text-indigo-600">
            Events
          </a>
          <a href="#" className="transition hover:text-indigo-600">
            About
          </a>
          <div className="h-4 w-px bg-slate-200" />
          <span className="font-semibold text-slate-700">My Profile</span>
          <button className="rounded-full border border-slate-200 px-4 py-1.5 text-slate-700 transition hover:bg-slate-50">
            Sign Out
          </button>
        </div>
      </header>

      {/* 하단 메인 레이아웃 (사이드바 + 콘텐츠) */}
      <div className="flex w-full flex-1 overflow-hidden">
        {/* 2. 왼쪽 고정 사이드바 */}
        <aside className="flex h-full w-64 shrink-0 flex-col justify-between border-r border-slate-100 bg-[#F8FAFC] p-4">
          {/* 상단: 프로필 & 메뉴 그룹 */}
          <div className="space-y-6">
            {/* Club Admin 프로필 카드 */}
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500">
                <User size={20} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800">Club Admin</h2>
                <p className="text-xs font-medium text-slate-400">
                  Executive Suite
                </p>
              </div>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                        : 'text-slate-500 hover:bg-slate-100/70 hover:text-slate-800'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? 'text-white' : 'text-slate-400'}
                    />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 하단: + Create Event 버튼 */}
          <div className="pt-4">
            <button
              onClick={() => setActiveTab('events')} // 클릭 시 이벤트 탭으로 이동 등 커스텀 가능
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-100 transition duration-200 hover:bg-indigo-700"
            >
              <Plus size={18} strokeWidth={3} />
              Create Event
            </button>
          </div>
        </aside>

        {/* 3. 오른쪽 메인 콘텐츠 영역 */}
        <main className="h-full flex-1 overflow-y-auto bg-white p-12">
          <div className="animate-in fade-in mx-auto max-w-5xl duration-200">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
