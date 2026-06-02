'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Search, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MembersTab() {
  const members = [
    {
      initials: 'AB',
      name: 'Alex Boudreau',
      email: 'alex@boudreau.edu',
      major: 'Computer Science',
      role: 'Club President',
      roleColor: 'bg-amber-100 text-amber-700',
      date: 'Sep 12, 2022',
      avatarColor: 'bg-blue-100 text-blue-600',
    },
    {
      initials: 'MA',
      name: 'Maria Alvarez',
      email: 'm.alvarez@school.edu',
      major: 'Media Business',
      role: 'Treasurer',
      roleColor: 'bg-blue-100 text-blue-700',
      date: 'Oct 30, 2022',
      avatarColor: 'bg-teal-100 text-teal-600',
    },
    {
      initials: 'HK',
      name: 'Hana Kang',
      email: 'hana.k@studio.edu',
      major: 'Visual Design',
      role: 'Committee',
      roleColor: 'bg-purple-100 text-purple-700',
      date: 'Jun 15, 2023',
      avatarColor: 'bg-purple-100 text-purple-600',
    },
    {
      initials: 'LL',
      name: 'Lily Lawson',
      email: 'lily.l@campus.edu',
      major: 'Political Science',
      role: 'Member',
      roleColor: 'bg-emerald-100 text-emerald-700',
      date: 'Mar 07, 2023',
      avatarColor: 'bg-indigo-100 text-indigo-600',
    },
    {
      initials: 'RP',
      name: 'Ryan Park',
      email: 'ryan.p@labs.edu',
      major: 'Data Science',
      role: 'Applicant',
      roleColor: 'bg-rose-100 text-rose-700',
      date: 'Apr 19, 2023',
      avatarColor: 'bg-emerald-100 text-emerald-600',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Member Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and manage your club&apos;s community.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search members..."
              className="w-56 rounded-full border border-gray-200 bg-white py-2.5 pr-4 pl-9 text-sm shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 rounded-full bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700">
            <UserPlus className="h-4 w-4" />
            Add Member
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-[18px] border border-gray-200 bg-white p-5 text-center transition hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]">
          <div className="text-2xl font-bold text-gray-900">1,284</div>
          <div className="mt-1 text-xs text-gray-500">Total Members</div>
          <div className="mt-2 flex justify-center gap-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
              Active
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
              Pending
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700">
              Inactive
            </span>
          </div>
        </div>
        <div className="rounded-[18px] border border-gray-200 bg-white p-5 text-center transition hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]">
          <div className="text-2xl font-bold text-indigo-600">847</div>
          <div className="mt-1 text-xs text-gray-500">Active Members</div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-[66%] rounded-full bg-[#4F46E5]" />
          </div>
        </div>
        <div className="rounded-[18px] border border-gray-200 bg-white p-5 text-center transition hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]">
          <div className="text-2xl font-bold text-amber-500">216</div>
          <div className="mt-1 text-xs text-gray-500">Pending Members</div>
        </div>
        <div className="rounded-[18px] border border-gray-200 bg-white p-5 text-center transition hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]">
          <div className="text-2xl font-bold text-gray-400">221</div>
          <div className="mt-1 text-xs text-gray-500">Inactive Members</div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[20px] border border-gray-200 bg-white">
        <div className="flex gap-2 border-b border-gray-100 p-5">
          <button className="rounded-lg bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            All Members
          </button>
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50">
            Active
          </button>
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50">
            Pending
          </button>
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50">
            Inactive
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left text-[11px] font-semibold tracking-[0.06em] text-gray-500 uppercase">
              <th className="p-3 pl-5">MEMBER NAME</th>
              <th className="p-3">MAJOR</th>
              <th className="p-3">ROLE</th>
              <th className="p-3">JOIN DATE</th>
              <th className="p-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 hover:bg-[#FAFBFF]"
              >
                <td className="p-3 pl-5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
                        m.avatarColor
                      )}
                    >
                      {m.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {m.name}
                      </div>
                      <div className="text-xs text-gray-400">{m.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-[13.5px] text-gray-600">{m.major}</td>
                <td className="p-3 text-[13.5px]">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                      m.roleColor
                    )}
                  >
                    {m.role}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-400">{m.date}</td>
                <td className="p-3 text-[13.5px]">
                  {m.role === 'Applicant' ? (
                    <>
                      <button className="mr-3 text-xs font-semibold text-indigo-600 hover:underline">
                        Approve
                      </button>
                      <button className="text-xs font-semibold text-rose-500 hover:underline">
                        Reject
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="mr-3 text-xs font-semibold text-indigo-600 hover:underline">
                        Edit
                      </button>
                      <button className="text-xs font-semibold text-rose-500 hover:underline">
                        Remove
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-100 p-4">
          <div className="text-xs text-gray-400">
            Showing 5 of 1,284 members
          </div>
          <div className="flex gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-xs text-gray-400 hover:bg-gray-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-semibold text-white">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50">
              3
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-xs text-gray-400 hover:bg-gray-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
