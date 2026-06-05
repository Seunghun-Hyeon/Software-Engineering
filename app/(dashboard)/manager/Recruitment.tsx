'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
// 경고가 발생했던 사용하지 않는 아이콘들을 모두 제거했습니다.
import {
  Check,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface Task {
  id: number;
  text: string;
  sub: string;
  done: boolean;
}

interface Activity {
  id: string;
  initials: string;
  name: string;
  action: string;
  time: string;
  type: 'edit' | 'void';
}

export default function Dashboard() {
  // 실제 대시보드에서 관리할 미완료/완료 미션 태스크 상태 관리 (2개 완료, 2개 미완료 구조)
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      text: 'Approve applicants in queue',
      sub: 'Due today',
      done: true,
    },
    {
      id: 2,
      text: 'Email all club presidents',
      sub: 'Due yesterday',
      done: true,
    },
    {
      id: 3,
      text: 'Generate member profile report',
      sub: 'Due Jun 5, 2026',
      done: false,
    },
    {
      id: 4,
      text: 'Finalize fall intake dates',
      sub: 'Due Jun 10, 2026',
      done: false,
    },
  ]);

  // 최근 활동 내역 로그 샘플 데이터
  const [activities] = useState<Activity[]>([
    {
      id: 'act-1',
      initials: 'EC',
      name: 'Elena Chang',
      action: 'Updated Event "Global Welcoming Night"',
      time: '1 hr ago',
      type: 'edit',
    },
    {
      id: 'act-2',
      initials: 'JC',
      name: 'James Chan',
      action: 'Cancelled Workshop Registration',
      time: '3 hr ago',
      type: 'void',
    },
  ]);

  // 태스크 체크박스 상태 토글 스위치 핸들러
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] font-sans text-slate-900 antialiased">
      <main className="flex-1 overflow-y-auto p-10">
        {/* 타이틀 인트로 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Executive Dashboard
          </h1>
          <p className="mt-1 text-sm leading-relaxed font-medium text-gray-400">
            Welcome back, your club operations and pending actions were updated.
          </p>
        </div>

        {/* 상단 4열 요약 통계 벤토 그리드 섹션 */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Total Members
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-800">1,284</span>
              <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
                +12%
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Active Apps
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-800">48</span>
              <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600">
                In Queue
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Upcoming Events
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-800">3</span>
              <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600">
                This Month
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Operational Score
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-800">98%</span>
              <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
                Excellent
              </span>
            </div>
          </div>
        </div>

        {/* 하단 핵심 분할 2열 컴포넌트 레이아웃 */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* 왼쪽 파트: Tasks (인터랙티브 체크박스 카드 리스트) */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold tracking-tight text-gray-800">
                  Pending Tasks
                </h3>
                <p className="mt-0.5 text-xs font-medium text-gray-400">
                  Click indicators to toggle completion status
                </p>
              </div>
              <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-[#4F46E5]">
                {tasks.filter((t) => !t.done).length} Remaining
              </span>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all select-none',
                    task.done
                      ? 'border-gray-100 bg-slate-50/50 opacity-60'
                      : 'border-gray-200/80 bg-white hover:border-indigo-200 hover:shadow-sm'
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    {/* 체크 링 인디케이터 */}
                    <div
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all',
                        task.done
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-gray-300 bg-white'
                      )}
                    >
                      {task.done && <Check className="h-3 w-3 stroke-[3px]" />}
                    </div>

                    <div>
                      <p
                        className={cn(
                          'text-xs font-bold tracking-tight',
                          task.done
                            ? 'text-gray-400 line-through'
                            : 'text-gray-700'
                        )}
                      >
                        {task.text}
                      </p>
                      <span className="mt-0.5 block text-[10px] font-semibold text-gray-400">
                        {task.sub}
                      </span>
                    </div>
                  </div>

                  {!task.done ? (
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽 파트: Recent Activity (최근 이력 내역 테이블 카드) */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold tracking-tight text-gray-800">
                  Recent Activity
                </h3>
                <p className="mt-0.5 text-xs font-medium text-gray-400">
                  Real-time update stream of executive actions
                </p>
              </div>
              <button className="flex items-center gap-0.5 text-[11px] font-bold text-[#4F46E5] hover:underline">
                View All History <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>

            {/* 활동 로그 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="w-1/3 pb-3 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      EXECUTOR
                    </th>
                    <th className="w-1/2 pb-3 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      ACTION
                    </th>
                    <th className="pb-3 text-right text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {activities.map((act) => (
                    <tr
                      key={act.id}
                      className="group transition-colors hover:bg-slate-50/40"
                    >
                      <td className="py-4 pr-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={cn(
                              'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold',
                              act.type === 'edit'
                                ? 'border-indigo-100 bg-indigo-50 text-[#4F46E5]'
                                : 'border-rose-100 bg-rose-50 text-rose-600'
                            )}
                          >
                            {act.initials}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-800">
                              {act.name}
                            </p>
                            <span className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-gray-400">
                              <Clock className="h-2.5 w-2.5" /> {act.time}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-2 text-xs leading-normal font-medium text-gray-500">
                        {act.action}
                      </td>
                      <td className="py-4 text-right">
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold',
                            act.type === 'edit'
                              ? 'border-blue-100 bg-blue-50 text-blue-700'
                              : 'border-rose-100 bg-rose-50 text-rose-700'
                          )}
                        >
                          {act.type === 'edit' ? 'Edit' : 'Void'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
