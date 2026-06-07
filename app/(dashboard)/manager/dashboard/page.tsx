'use client';

import React, { useState, useEffect, Suspense } from 'react';
// Lucide 아이콘 라이브러리 사용 (없으시다면 npm i lucide-react 설치 혹은 svg로 대체 가능)
import {
  User,
  Users,
  ClipboardList,
  Calendar,
  Settings,
  Plus,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Components
import ClubProfileTab from '../ClubProfile';
import MembersTab from '../Members';
import RecruitmentTab from '../Recruitment';
import EventsTab from '../EventsTab';
import SettingsTab from '../SettingsTab';

import { useRouter, useSearchParams } from 'next/navigation';

type Tab = 'club-profile' | 'members' | 'recruitment' | 'events' | 'settings';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = (searchParams?.get('tab') || '') as Tab;
  const [activeTab, setActiveTab] = useState<Tab>(tabParam || 'club-profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const tab = searchParams?.get('tab');
    if (tab) {
      let targetTab: Tab = tab as Tab;
      if (tab === 'clubProfile') {
        targetTab = 'club-profile';
      } else if (tab === 'applications') {
        targetTab = 'recruitment';
      }
      Promise.resolve().then(() => {
        setActiveTab(targetTab);
      });
    }
  }, [searchParams]);

  const handleTabChange = (tabId: Tab) => {
    setActiveTab(tabId);
    router.push(`/manager/dashboard?tab=${tabId}`);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'club-profile':
        // 'Club Profile' 클릭 시 Recruitment 내용이 나오도록 변경
        return <RecruitmentTab />;
      case 'members':
        return <MembersTab />;
      case 'recruitment':
        // 'Recruitment' 클릭 시 Club Profile 내용이 나오도록 변경
        return <ClubProfileTab />;
      case 'events':
        return <EventsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        // 기본값은 'clubProfile' 탭이 활성화되었을 때의 매핑인 RecruitmentTab을 바라보게 설정
        return <RecruitmentTab />;
    }
  };

  // 메뉴 아이템 구조화 (사이드바 UI 렌더링 순서는 그대로 유지)
  const menuItems = [
    { id: 'club-profile', label: 'Club Profile', icon: User },
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
      <div className="relative flex w-full flex-1 overflow-hidden">
        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="animate-in fade-in fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden"
            aria-label="Close sidebar backdrop"
          />
        )}

        {/* 2.  왼쪽 고정 사이드바 */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 flex h-full w-64 shrink-0 flex-col justify-between rounded-r-[24px] border-r border-white/30 bg-white/80 p-4 pt-20 shadow-xl backdrop-blur-xl transition-transform duration-300 md:relative md:z-auto md:flex md:translate-x-0 md:rounded-none md:border-r md:border-slate-100 md:bg-[#F8FAFC] md:pt-4 md:shadow-none md:backdrop-blur-none',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* 상단: 프로필 & 메뉴 그룹 */}
          <div className="space-y-6">
            {/* Mobile Close Trigger Header */}
            <div className="flex items-center justify-between md:hidden">
              <span className="rounded-full bg-[#4F46E5]/10 px-3 py-1 font-sans text-xs font-bold tracking-wider text-[#4F46E5] uppercase">
                Navigation
              </span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-full border border-gray-200 bg-white/50 p-2 text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 active:scale-95"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

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
                    onClick={() => handleTabChange(item.id)}
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
              onClick={() => handleTabChange('events')} // 클릭 시 이벤트 탭으로 이동 등 커스텀 가능
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-100 transition duration-200 hover:bg-indigo-700"
            >
              <Plus size={18} strokeWidth={3} />
              Create Event
            </button>
          </div>
        </aside>

        {/* 3. 오른쪽 메인 콘텐츠 영역 */}
        <main className="h-full flex-1 overflow-y-auto bg-white p-4 sm:p-6 md:p-12">
          {/* Mobile Sidebar Toggle Button Bar */}
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 md:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 rounded-full border border-[#4F46E5] bg-[#4F46E5]/10 px-4 py-2 text-sm font-semibold text-[#4F46E5] transition-all duration-200 hover:bg-[#4F46E5]/20 active:scale-95"
              aria-label="Open navigation menu"
            >
              <Menu size={16} />
              <span>Menu</span>
            </button>
            <span className="rounded-full bg-[#10B981]/10 px-3 py-1.5 font-sans text-xs font-bold tracking-wider text-[#10B981] uppercase">
              {activeTab.replace('-', ' ')}
            </span>
          </div>

          <div className="animate-in fade-in mx-auto max-w-5xl duration-200">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ManagerDashboard() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#F8FAFC] font-sans font-bold text-slate-500">
          Loading dashboard...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
