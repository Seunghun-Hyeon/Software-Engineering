'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
// 사용하지 않는 아이콘들을 정리하고 실제 컴포넌트 내에서 쓰는 아이콘만 남겼습니다.
import { Upload, AlertTriangle, Trash2 } from 'lucide-react';

export default function Settings() {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'danger'>(
    'profile'
  );
  const [isRecruiting, setIsRecruiting] = useState(true);

  // 실제 클럽 정보 세팅
  const [clubInfo, setClubInfo] = useState({
    name: 'AI & Software Engineering Club',
    email: 'asec@handong.edu',
    slogan: 'Coding the future, today.',
    description:
      'A student-led organization dedicated to exploring cutting-edge developments in artificial intelligence, software design, and full-stack development.',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Changes saved successfully!');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] font-sans text-slate-900 antialiased">
      <main className="flex-1 overflow-y-auto p-10">
        {/* 타이틀 및 상단 우측 세이브 컨트롤 */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Settings
            </h1>
            {/* react/no-unescaped-entities 에러 수정을 위해 club's 대신 club&apos;s 를 사용했습니다. */}
            <p className="mt-1 text-sm leading-relaxed font-medium text-gray-400">
              Configure your club&apos;s presence, executive-only pipeline, and
              administrative controls.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 self-end rounded-xl bg-[#4F46E5] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 md:self-center"
          >
            Save Changes
          </button>
        </div>

        {/* 상단 서브 탭 컨트롤 (Club Profile / Danger Zone) */}
        <div className="mb-8 flex items-center gap-6 border-b border-gray-200/60 text-sm font-semibold">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={cn(
              'relative pb-3.5 transition-colors',
              activeSubTab === 'profile'
                ? 'text-[#4F46E5]'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Club Profile
            {activeSubTab === 'profile' && (
              <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#4F46E5]" />
            )}
          </button>
          <button
            onClick={() => setActiveSubTab('danger')}
            className={cn(
              'relative pb-3.5 transition-colors',
              activeSubTab === 'danger'
                ? 'text-rose-600'
                : 'text-gray-400 hover:text-rose-400'
            )}
          >
            Danger Zone
            {activeSubTab === 'danger' && (
              <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-rose-600" />
            )}
          </button>
        </div>

        {/* 탭 분기 내용 렌더링 */}
        {activeSubTab === 'profile' ? (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* 왼쪽 입력 양식 섹션 (2컬럼 너비 차지) */}
            <div className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
              <div>
                <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  CLUB NAME
                </label>
                <input
                  type="text"
                  value={clubInfo.name}
                  onChange={(e) =>
                    setClubInfo({ ...clubInfo, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA]/70 px-4 py-3 text-xs font-semibold text-gray-800 transition outline-none focus:border-[#4F46E5] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  CLUB EMAIL
                </label>
                <input
                  type="email"
                  value={clubInfo.email}
                  onChange={(e) =>
                    setClubInfo({ ...clubInfo, email: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA]/70 px-4 py-3 text-xs font-semibold text-gray-800 transition outline-none focus:border-[#4F46E5] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  CLUB SLOGAN
                </label>
                <input
                  type="text"
                  value={clubInfo.slogan}
                  onChange={(e) =>
                    setClubInfo({ ...clubInfo, slogan: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA]/70 px-4 py-3 text-xs font-semibold text-gray-800 transition outline-none focus:border-[#4F46E5] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  DESCRIPTION
                </label>
                <textarea
                  rows={4}
                  value={clubInfo.description}
                  onChange={(e) =>
                    setClubInfo({ ...clubInfo, description: e.target.value })
                  }
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#FAFAFA]/70 px-4 py-3 text-xs leading-relaxed font-medium text-gray-600 transition outline-none focus:border-[#4F46E5] focus:bg-white"
                />
              </div>
            </div>

            {/* 오른쪽 로고 및 리크루팅 스위치 세션 (1컬럼 너비 차지) */}
            <div className="space-y-6">
              {/* CLUB LOGO 조절 카드 */}
              <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                <label className="mb-4 block self-start text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  CLUB LOGO
                </label>

                {/* 로고 아바타 엠블럼 */}
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-indigo-100/60 bg-indigo-50 text-xl font-bold text-[#4F46E5] shadow-inner">
                  AS
                </div>

                <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-600 shadow-sm transition hover:bg-gray-50">
                  <Upload className="h-3.5 w-3.5" /> Change Logo
                </button>
              </div>

              {/* Recruitment Status 토글 제어 카드 */}
              <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="pr-4">
                  <h3 className="text-sm font-bold tracking-tight text-gray-800">
                    Recruitment Status
                  </h3>
                  <p className="mt-0.5 text-[11px] leading-normal font-medium text-gray-400">
                    Toggle whether students can apply to your club.
                  </p>
                </div>

                {/* 커스텀 토글 스위치 */}
                <button
                  type="button"
                  onClick={() => setIsRecruiting(!isRecruiting)}
                  className={cn(
                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none',
                    isRecruiting ? 'bg-[#4F46E5]' : 'bg-gray-200'
                  )}
                >
                  <span
                    className={cn(
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      isRecruiting ? 'translate-x-5' : 'translate-x-0'
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Danger Zone 탭 콘텐츠 */
          <div className="max-w-2xl space-y-5 rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="text-base font-bold">Critical Actions</h2>
            </div>
            <p className="text-xs leading-relaxed font-medium text-gray-400">
              These actions cannot be undone. Please proceed with utmost
              caution.
            </p>

            <div className="flex items-center justify-between border-t border-gray-50 pt-4">
              <div>
                <h4 className="text-sm font-bold text-gray-800">
                  Archive Club Data
                </h4>
                <p className="mt-0.5 text-xs text-gray-400">
                  Temporarily disable all club public activity.
                </p>
              </div>
              <button className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-600 transition-all hover:bg-rose-100">
                Archive
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-gray-50 pt-4">
              <div>
                <h4 className="text-sm font-bold text-rose-600">
                  Delete Club Permanently
                </h4>
                <p className="mt-0.5 text-xs text-gray-400">
                  Erase all rosters, events, and records forever.
                </p>
              </div>
              <button className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-rose-100 transition-all hover:bg-rose-700">
                <Trash2 className="h-3.5 w-3.5" /> Delete Club
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
