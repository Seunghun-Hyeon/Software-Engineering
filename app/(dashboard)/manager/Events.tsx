'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
// eslint warning의 원인이었던 Calendar를 삭제했습니다.
import { ClipboardList, Image as ImageIcon, Video } from 'lucide-react';

interface EventData {
  name: string;
  dateTime: string;
  location: string;
  shortSummary: string;
  fullOverview: string;
}

export default function Events() {
  const [activeTab, setActiveTab] = useState<'create' | 'upcoming' | 'past'>(
    'create'
  );

  // 폼 입력 데이터 상태 관리
  const [formData, setFormData] = useState<EventData>({
    name: '',
    dateTime: '',
    location: '',
    shortSummary: '',
    fullOverview: '',
  });

  // 간단한 등록 완료 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dateTime) {
      alert('Event Name and Date/Time are required!');
      return;
    }
    alert(`Event "${formData.name}" has been successfully published!`);
    // 폼 초기화
    setFormData({
      name: '',
      dateTime: '',
      location: '',
      shortSummary: '',
      fullOverview: '',
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] font-sans text-slate-900 antialiased">
      <main className="flex-1 overflow-y-auto p-10">
        {/* 타이틀 헤더 섹션 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Events Management
          </h1>
          <p className="mt-1 text-sm leading-relaxed font-medium text-gray-400">
            Publish new activities and view upcoming or historical club events.
          </p>
        </div>

        {/* 상단 탭 컨트롤 (Create Event / Upcoming / Past) */}
        <div className="mb-8 flex items-center gap-6 border-b border-gray-200/60 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('create')}
            className={cn(
              'relative pb-3.5 transition-colors',
              activeTab === 'create'
                ? 'text-[#4F46E5]'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Create Event
            {activeTab === 'create' && (
              <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#4F46E5]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={cn(
              'relative pb-3.5 transition-colors',
              activeTab === 'upcoming'
                ? 'text-[#4F46E5]'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Upcoming Events (1)
            {activeTab === 'upcoming' && (
              <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#4F46E5]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={cn(
              'relative pb-3.5 transition-colors',
              activeTab === 'past'
                ? 'text-[#4F46E5]'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Past Events (1)
            {activeTab === 'past' && (
              <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#4F46E5]" />
            )}
          </button>
        </div>

        {/* 탭 분기 렌더링 - Create Event (이미지 매칭 메인 양식) */}
        {activeTab === 'create' && (
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            {/* 폼 서브 헤더 */}
            <div className="flex items-center gap-2 border-b border-gray-50 bg-slate-50/30 px-6 py-5">
              <ClipboardList className="h-4 w-4 text-[#4F46E5]" />
              <h2 className="text-sm font-bold tracking-tight text-gray-800">
                Event Details Form
              </h2>
            </div>

            {/* 폼 필드 그리드 바디 */}
            <div className="space-y-5 p-6">
              {/* 1. EVENT NAME */}
              <div>
                <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  EVENT NAME
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Generative AI Seminar"
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA]/70 px-4 py-3 text-xs font-medium transition outline-none placeholder:text-gray-300 focus:border-[#4F46E5] focus:bg-white"
                />
              </div>

              {/* 2. DATE AND TIME / LOCATION (2열 배치) */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    DATE AND TIME
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.dateTime}
                    onChange={(e) =>
                      setFormData({ ...formData, dateTime: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA]/70 px-4 py-3 text-xs font-semibold text-gray-600 transition outline-none focus:border-[#4F46E5] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    LOCATION
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g. Newton Hall 312 / Zoom"
                    className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA]/70 px-4 py-3 text-xs font-medium transition outline-none placeholder:text-gray-300 focus:border-[#4F46E5] focus:bg-white"
                  />
                </div>
              </div>

              {/* 3. SHORT SUMMARY / DESCRIPTION */}
              <div>
                <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  SHORT SUMMARY / DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={formData.shortSummary}
                  onChange={(e) =>
                    setFormData({ ...formData, shortSummary: e.target.value })
                  }
                  placeholder="Brief introduction of the event..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#FAFAFA]/70 px-4 py-3 text-xs font-medium transition outline-none placeholder:text-gray-300 focus:border-[#4F46E5] focus:bg-white"
                />
              </div>

              {/* 4. FULL OVERVIEW TEXT */}
              <div>
                <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  FULL OVERVIEW TEXT
                </label>
                <textarea
                  rows={5}
                  value={formData.fullOverview}
                  onChange={(e) =>
                    setFormData({ ...formData, fullOverview: e.target.value })
                  }
                  placeholder="Provide detailed description, schedule, speakers, etc..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#FAFAFA]/70 px-4 py-3 text-xs font-medium transition outline-none placeholder:text-gray-300 focus:border-[#4F46E5] focus:bg-white"
                />
              </div>

              {/* 5. PHOTOS / VIDEOS UPLOAD 섹션 컴포넌트 추가 */}
              <div className="grid grid-cols-1 gap-5 border-t border-gray-50 pt-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    PHOTOS UPLOAD
                  </label>
                  <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-[#FAFAFA]/50 p-4 transition-colors hover:bg-slate-50">
                    <ImageIcon className="mb-1 h-5 w-5 text-gray-300" />
                    <span className="text-[11px] font-medium text-gray-400">
                      Click or drag images here
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    VIDEOS UPLOAD
                  </label>
                  <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-[#FAFAFA]/50 p-4 transition-colors hover:bg-slate-50">
                    <Video className="mb-1 h-5 w-5 text-gray-300" />
                    <span className="text-[11px] font-medium text-gray-400">
                      Click or drag media files here
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 액션 제출 버튼 단락 */}
            <div className="flex justify-end border-t border-gray-50 bg-slate-50/50 px-6 py-4">
              <button
                type="submit"
                className="rounded-xl bg-[#4F46E5] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700"
              >
                Publish Event
              </button>
            </div>
          </form>
        )}

        {/* 탭 분기 렌더링 - Upcoming Events */}
        {activeTab === 'upcoming' && (
          <div className="max-w-4xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-sm font-bold text-gray-800">
              Generative AI Hands-on Workshop
            </h3>
            <p className="mb-4 text-xs font-medium text-gray-400">
              Location: Newton Hall 312 | Date: June 15, 2026
            </p>
            <span className="inline-flex items-center rounded-md border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-[#4F46E5]">
              124 Registrations
            </span>
          </div>
        )}

        {/* 탭 분기 렌더링 - Past Events */}
        {activeTab === 'past' && (
          <div className="max-w-4xl rounded-2xl border border-gray-100 bg-white p-6 opacity-70 shadow-sm">
            <h3 className="mb-2 text-sm font-bold text-gray-800">
              Spring Semester Welcoming Night
            </h3>
            <p className="mb-4 text-xs font-medium text-gray-400">
              Location: Hyoam Restaurant 2F | Date: March 10, 2026
            </p>
            <span className="inline-flex items-center rounded-md border border-gray-200 bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-gray-500">
              Completed
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
