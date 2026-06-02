'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { MoreHorizontal, Sprout, Trophy, Briefcase } from 'lucide-react';

export default function AnalyticsTab() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-indigo-700">
            Performance Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Find the engagement & growth metrics for the Spring Semester.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50">
            Export
          </button>
          <button className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50">
            Clubs ▾
          </button>
          <button className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50">
            Events ▾
          </button>
          <button className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50">
            Statistics ▾
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
          <div className="text-3xl font-bold text-gray-900">1,248</div>
          <div className="mt-2 flex gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
              +2%
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
              Active
            </span>
          </div>
        </div>
        {/* Stat 2 */}
        <div className="rounded-[18px] border border-gray-200 bg-white p-5 transition hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]">
          <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Avg Attendance
          </div>
          <div className="text-3xl font-bold text-indigo-600">84%</div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#4F46E5] transition-all duration-700"
              style={{ width: '84%' }}
            />
          </div>
        </div>
        {/* Stat 3 */}
        <div className="rounded-[18px] border border-gray-200 bg-white p-5 transition hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]">
          <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Recruitment Funnel
          </div>
          <div className="mt-1 flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-900">2.4k</span>
            <span className="text-sm text-gray-400">→ 1.8k → 724 → 312</span>
          </div>
        </div>
        {/* Stat 4 */}
        <div className="rounded-[18px] border border-gray-200 bg-white p-5 transition hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]">
          <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Retention Score
          </div>
          <div className="text-3xl font-bold text-gray-900">91%</div>
          <div className="mt-1 text-xs font-semibold text-emerald-500">
            ↑ 4pts from last term
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {/* Event Attendance */}
        <div className="rounded-[20px] border border-gray-200 bg-white p-5">
          <div className="mb-1 flex items-center justify-between">
            <div className="font-semibold text-gray-800">Event Attendance</div>
            <button className="text-xs font-semibold text-indigo-600 hover:underline">
              + Add Event
            </button>
          </div>
          <div className="mb-4 text-xs text-gray-400">
            Weekly attendance across all club events
          </div>
          <div className="flex h-[100px] items-end gap-2">
            {[
              { day: 'Thu', h: '45px', active: false },
              { day: 'Fri', h: '82px', active: true },
              { day: 'Sat', h: '55px', active: false },
              { day: 'Sun', h: '38px', active: false },
              { day: 'Mon', h: '70px', active: true },
              { day: 'Tue', h: '50px', active: false },
              { day: 'Wed', h: '90px', active: true },
            ].map((bar, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className={cn(
                    'min-h-[4px] w-full rounded-t-md transition-all duration-500 ease-in-out',
                    bar.active ? 'bg-[#4F46E5]' : 'bg-[#EEF2FF]'
                  )}
                  style={{ height: bar.h }}
                />
                <div className="text-[10px] font-medium text-gray-500">
                  {bar.day}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Events */}
        <div className="rounded-[20px] border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-semibold text-gray-800">Top Events</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Sprout className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">
                  Spring Mix…
                </div>
                <div className="text-xs text-gray-400">20 Members</div>
              </div>
              <div className="text-sm font-bold text-emerald-500">99%</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                <Trophy className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">
                  A-Tri-tch…
                </div>
                <div className="text-xs text-gray-400">20 Members</div>
              </div>
              <div className="text-sm font-bold text-amber-500">82%</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">
                  Info Reg…
                </div>
                <div className="text-xs text-gray-400">105 Members</div>
              </div>
              <div className="text-sm font-bold text-blue-500">67%</div>
            </div>
          </div>
          <button className="mt-4 w-full rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50">
            View All Events
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[20px] border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-semibold text-gray-800">
            Monthly Engagement Stats
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white">
              TERMS
            </button>
            <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-500">
              CLUBS
            </button>
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left text-[11px] font-semibold tracking-[0.06em] text-gray-500 uppercase">
              <th className="pb-2">MONTH</th>
              <th className="pb-2">NEW MEMBERS</th>
              <th className="pb-2">EVENTS HELD</th>
              <th className="pb-2">SOCIAL MEDIA ENG.</th>
              <th className="pb-2">STATUS</th>
              <th className="pb-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                m: 'January',
                nm: '187',
                eh: '2,400',
                sme: '10.4k',
                st: 'Active',
                bg: 'bg-emerald-100',
                txt: 'text-emerald-700',
              },
              {
                m: 'February',
                nm: '291',
                eh: '3,173',
                sme: '20.1k',
                st: 'Okay',
                bg: 'bg-blue-100',
                txt: 'text-blue-700',
              },
              {
                m: 'March',
                nm: '196',
                eh: '1,850',
                sme: '7.4k',
                st: 'Decreasing',
                bg: 'bg-rose-100',
                txt: 'text-rose-700',
              },
              {
                m: 'April',
                nm: '312',
                eh: '4,120',
                sme: '28.7k',
                st: 'Active',
                bg: 'bg-emerald-100',
                txt: 'text-emerald-700',
              },
            ].map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 hover:bg-[#FAFBFF]"
              >
                <td className="py-3 text-[13.5px] font-semibold">{row.m}</td>
                <td className="py-3 text-[13.5px]">{row.nm}</td>
                <td className="py-3 text-[13.5px]">{row.eh}</td>
                <td className="py-3 text-[13.5px]">{row.sme}</td>
                <td className="py-3">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                      row.bg,
                      row.txt
                    )}
                  >
                    {row.st}
                  </span>
                </td>
                <td className="py-3 text-[13.5px]">
                  <button className="text-gray-400 hover:text-gray-700">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
