'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bell, SlidersHorizontal, ArrowUp, Check } from 'lucide-react';

export default function DashboardTab() {
  const [tasks, setTasks] = useState([
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
      sub: 'Due Jun 5',
      done: false,
    },
    {
      id: 4,
      text: 'Finalize fall intake dates',
      sub: 'Due Jun 10',
      done: false,
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Executive Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, your club operations were updated.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:text-gray-800">
            <Bell className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:text-gray-800">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="rounded-[18px] border border-gray-200 bg-white p-5 transition hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]">
          <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Total Members
          </div>
          <div className="mb-1 text-3xl font-bold text-gray-900">1,284</div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
              <ArrowUp className="h-2 w-2" /> 12%
            </span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        </div>
        {/* Stat 2 */}
        <div className="rounded-[18px] border border-gray-200 bg-white p-5 transition hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]">
          <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Active Clubs
          </div>
          <div className="mb-1 text-3xl font-bold text-gray-900">42</div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
              <ArrowUp className="h-2 w-2" /> 3
            </span>
            <span className="text-xs text-gray-400">new this term</span>
          </div>
        </div>
        {/* Stat 3 */}
        <div className="rounded-[18px] border border-gray-200 bg-white p-5 transition hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]">
          <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Avg Attendance
          </div>
          <div className="mb-1 text-3xl font-bold text-gray-900">8</div>
          <div className="text-xs text-gray-400">events / member avg</div>
        </div>
        {/* Stat 4 */}
        <div className="rounded-[18px] border border-gray-200 bg-white p-5 transition hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]">
          <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Retention Rate
          </div>
          <div className="mb-1 text-3xl font-bold text-gray-900">78.6%</div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#4F46E5] transition-all duration-700"
              style={{ width: '78.6%' }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {/* Chart */}
        <div className="col-span-2 rounded-[20px] border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-semibold text-gray-800">Membership Growth</div>
            <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
              <button className="rounded-md bg-white px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm">
                Mar
              </button>
              <button className="rounded-md px-3 py-1 text-xs font-semibold text-gray-500">
                Year
              </button>
            </div>
          </div>
          {/* Simple SVG Chart */}
          <svg viewBox="0 0 400 120" className="h-[130px] w-full">
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity=".18" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,90 C40,85 80,70 120,60 C160,50 200,55 240,40 C280,25 320,30 360,20 L400,15 L400,120 L0,120 Z"
              fill="url(#grad1)"
            />
            <path
              className="animate-[drawLine_1.2s_ease_forwards_0.3s]"
              style={{ strokeDasharray: 300, strokeDashoffset: 0 }}
              d="M0,90 C40,85 80,70 120,60 C160,50 200,55 240,40 C280,25 320,30 360,20 L400,15"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="0" cy="90" r="4" fill="#4F46E5" />
            <circle cx="120" cy="60" r="4" fill="#4F46E5" />
            <circle cx="240" cy="40" r="4" fill="#4F46E5" />
            <circle
              cx="360"
              cy="20"
              r="4"
              fill="white"
              stroke="#4F46E5"
              strokeWidth="2"
            />
            <text x="0" y="118" fontSize="10" fill="#9CA3AF">
              Jan
            </text>
            <text x="80" y="118" fontSize="10" fill="#9CA3AF">
              Feb
            </text>
            <text x="160" y="118" fontSize="10" fill="#9CA3AF">
              Mar
            </text>
            <text x="240" y="118" fontSize="10" fill="#9CA3AF">
              Apr
            </text>
            <text x="318" y="118" fontSize="10" fill="#9CA3AF">
              May
            </text>
            <rect x="310" y="2" width="88" height="26" rx="8" fill="#4F46E5" />
            <text
              x="354"
              y="19"
              fontSize="11"
              fill="white"
              fontWeight="600"
              textAnchor="middle"
            >
              +48 members
            </text>
          </svg>
        </div>

        {/* Tasks */}
        <div className="rounded-[20px] border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-semibold text-gray-800">Tasks</div>
            <button className="text-xs font-semibold text-indigo-600 hover:underline">
              + Add
            </button>
          </div>
          <div className="space-y-0">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-2.5 border-b border-gray-50 py-2.5 last:border-0"
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    'mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-[6px] border-2 transition-colors',
                    task.done
                      ? 'border-[#4F46E5] bg-[#4F46E5]'
                      : 'border-gray-200'
                  )}
                >
                  {task.done && <Check className="h-2.5 w-2.5 text-white" />}
                </div>
                <div>
                  <div
                    className={cn(
                      'text-sm font-medium',
                      task.done ? 'text-gray-400 line-through' : 'text-gray-700'
                    )}
                  >
                    {task.text}
                  </div>
                  <div className="mt-0.5 text-xs text-gray-400">{task.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* MOTM */}
        <div className="rounded-[18px] bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] p-5 text-white">
          <div className="mb-3 text-xs font-semibold tracking-wider uppercase opacity-70">
            Member of the Month
          </div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
              SJ
            </div>
            <div>
              <div className="text-base font-bold">Sarah Jenkins</div>
              <div className="text-xs opacity-70">Data Science, &apos;24</div>
            </div>
          </div>
          <div className="mb-4 text-xs leading-relaxed opacity-80">
            &quot;Sarah&apos;s outstanding contributions to three Club Gala
            events...&quot;
          </div>
          <button className="w-full rounded-xl bg-white/20 py-2 text-xs font-semibold text-white transition hover:bg-white/30">
            View Recognition
          </button>
        </div>

        {/* Recent Activity */}
        <div className="col-span-2 rounded-[20px] border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-semibold text-gray-800">Recent Activity</div>
            <button className="text-xs font-semibold text-indigo-600 hover:underline">
              View All History
            </button>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left text-[11px] font-semibold tracking-[0.06em] text-gray-500 uppercase">
                <th className="pb-2">Member</th>
                <th className="pb-2">Action</th>
                <th className="pb-2">Time</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50 hover:bg-[#FAFBFF]">
                <td className="py-3">
                  <div className="flex items-center gap-2 text-[13.5px] font-medium">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      SA
                    </div>
                    Sam Anderson
                  </div>
                </td>
                <td className="py-3 text-[13.5px] text-gray-500">
                  Submitted New Membership Application
                </td>
                <td className="py-3 text-xs text-gray-400">2 min ago</td>
                <td className="py-3">
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                    Success
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-50 hover:bg-[#FAFBFF]">
                <td className="py-3">
                  <div className="flex items-center gap-2 text-[13.5px] font-medium">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-600">
                      MB
                    </div>
                    Maya Badogu
                  </div>
                </td>
                <td className="py-3 text-[13.5px] text-gray-500">
                  Updated Event &quot;Global Welcoming Night&quot;
                </td>
                <td className="py-3 text-xs text-gray-400">1 hr ago</td>
                <td className="py-3">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
                    Edit
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#FAFBFF]">
                <td className="py-3">
                  <div className="flex items-center gap-2 text-[13.5px] font-medium">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      JC
                    </div>
                    James Chan
                  </div>
                </td>
                <td className="py-3 text-[13.5px] text-gray-500">
                  Cancelled Workshop Registration
                </td>
                <td className="py-3 text-xs text-gray-400">3 hr ago</td>
                <td className="py-3">
                  <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700">
                    Void
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
