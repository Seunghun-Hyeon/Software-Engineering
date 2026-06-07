'use client';

import React, { useState, Suspense } from 'react';
import {
  User,
  Users,
  ClipboardList,
  Calendar,
  Settings,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Components
import DashboardTab from '../ClubProfile'; // Club Profile 레이아웃을 내부 대시보드로 활용
import MembersTab from '../Members';
import RecruitmentTab from '../Recruitment'; // 위의 지원서 전용 탭 매핑
import EventsTab from '../EventsTab';
import SettingsTab from '../SettingsTab';

import { useRouter, useSearchParams } from 'next/navigation';

// 타입 정의를 명확하게 'dashboard'로 변경
type Tab = 'dashboard' | 'members' | 'recruitment' | 'events' | 'settings';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get('tab') || '';

  // [수정 핵심] useEffect를 제거하고, useState 초기값 지정 시점에 직접 파라미터 분기 처리를 진행합니다.
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    if (tabParam === 'clubProfile' || tabParam === 'club-profile') {
      return 'dashboard';
    }
    if (tabParam === 'applications') {
      return 'recruitment';
    }
    return (tabParam as Tab) || 'dashboard';
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
    router.push(`?tab=${tab}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'members':
        return <MembersTab />;
      case 'recruitment':
        return <RecruitmentTab />;
      case 'events':
        return <EventsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-900 antialiased">
      <div className="flex h-full w-full">
        {/* 사이드바 메뉴 네비게이션 */}
        <aside className="hidden h-full w-64 shrink-0 border-r border-slate-100 bg-white p-6 md:flex md:flex-col md:justify-between">
          <div className="space-y-7">
            <div className="px-2">
              <h2 className="text-sm font-black tracking-wider text-gray-900 uppercase">
                Studio Executive
              </h2>
              <p className="text-[10px] font-bold tracking-wide text-gray-400 uppercase">
                Club Admin Suite
              </p>
            </div>

            <nav className="space-y-1">
              {/* Club Profile에서 Dashboard로 명칭 수정 */}
              <button
                onClick={() => handleTabChange('dashboard')}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all duration-150 active:scale-[0.98]',
                  activeTab === 'dashboard'
                    ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-100'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <User size={16} /> Dashboard
              </button>

              <button
                onClick={() => handleTabChange('members')}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all duration-150 active:scale-[0.98]',
                  activeTab === 'members'
                    ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-100'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <Users size={16} /> Member Roster
              </button>

              <button
                onClick={() => handleTabChange('recruitment')}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all duration-150 active:scale-[0.98]',
                  activeTab === 'recruitment'
                    ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-100'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <ClipboardList size={16} /> Recruitment
              </button>

              <button
                onClick={() => handleTabChange('events')}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all duration-150 active:scale-[0.98]',
                  activeTab === 'events'
                    ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-100'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <Calendar size={16} /> Events Calendar
              </button>

              <button
                onClick={() => handleTabChange('settings')}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all duration-150 active:scale-[0.98]',
                  activeTab === 'settings'
                    ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-100'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <Settings size={16} /> Club Settings
              </button>
            </nav>
          </div>
        </aside>

        {/* 오른쪽 메인 대시보드 스크롤 콘텐츠 영역 */}
        <main className="h-full flex-1 overflow-y-auto bg-white p-4 sm:p-6 md:p-12">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 md:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 rounded-full border border-[#4F46E5] bg-[#4F46E5]/10 px-4 py-2 text-sm font-semibold text-[#4F46E5]"
            >
              <Menu size={16} />
              <span>Menu</span>
            </button>
            <span className="rounded-full bg-[#10B981]/10 px-3 py-1.5 font-sans text-xs font-bold tracking-wider text-[#10B981] uppercase">
              {activeTab}
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
        <div className="p-10 text-xs font-bold text-gray-400">
          Loading Dashboard Suite...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
