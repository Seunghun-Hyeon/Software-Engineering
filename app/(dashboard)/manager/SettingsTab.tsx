'use client';

import React from 'react';
import {
  IdCard,
  UserCheck,
  Users,
  TriangleAlert,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';

export default function SettingsTab() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Executive Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure your club&apos;s presence and executive-only pipeline.
          </p>
        </div>
        <button className="rounded-xl bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 space-y-5">
          {/* Club Profile */}
          <div className="rounded-[20px] border border-gray-200 bg-white p-6">
            <div className="mb-5 flex items-center gap-2">
              <IdCard className="h-5 w-5 text-indigo-500" />
              <span className="font-semibold text-gray-800">Club Profile</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Club Name
                </label>
                <input
                  defaultValue="Index of A#Society"
                  className="w-full rounded-xl border-[1.5px] border-gray-200 bg-[#FAFAFA] px-[14px] py-[9px] font-sans text-[13.5px] transition outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Founded
                </label>
                <input
                  defaultValue="2024: 13, 15"
                  className="w-full rounded-xl border-[1.5px] border-gray-200 bg-[#FAFAFA] px-[14px] py-[9px] font-sans text-[13.5px] transition outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
              <div className="col-span-2">
                <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Public Description
                </label>
                <textarea
                  defaultValue="Connecting creative students through immersive intelligence projects and technical challenges."
                  rows={2}
                  className="w-full resize-none rounded-xl border-[1.5px] border-gray-200 bg-[#FAFAFA] px-[14px] py-[9px] font-sans text-[13.5px] transition outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Category
                </label>
                <select className="w-full rounded-xl border-[1.5px] border-gray-200 bg-[#FAFAFA] px-[14px] py-[9px] font-sans text-[13.5px] transition outline-none focus:border-indigo-600 focus:bg-white">
                  <option>Academic & Tech</option>
                  <option>Arts</option>
                  <option>Sports</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Primary Contact
                </label>
                <input
                  defaultValue="contact@indexofai.edu"
                  className="w-full rounded-xl border-[1.5px] border-gray-200 bg-[#FAFAFA] px-[14px] py-[9px] font-sans text-[13.5px] transition outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>
            <button className="mt-4 text-sm font-semibold text-indigo-600 hover:underline">
              + Social links
            </button>
          </div>

          {/* Recruitment */}
          <div className="rounded-[20px] border border-gray-200 bg-white p-6">
            <div className="mb-5 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-indigo-500" />
              <span className="font-semibold text-gray-800">Recruitment</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    Active Status
                  </div>
                  <div className="mt-0.5 text-xs text-gray-400">
                    Allow new applications to come in
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-indigo-600 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    Require References
                  </div>
                  <div className="mt-0.5 text-xs text-gray-400">
                    Applicants must provide 2 referees
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-indigo-600 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    Application Deadline
                  </div>
                </div>
                <input
                  type="date"
                  defaultValue="2025-06-15"
                  className="w-[160px] rounded-xl border-[1.5px] border-gray-200 bg-[#FAFAFA] px-[14px] py-[9px] font-sans text-[13.5px] transition outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Team Access */}
          <div className="rounded-[20px] border border-gray-200 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-500" />
                <span className="font-semibold text-gray-800">Team Access</span>
              </div>
              <button className="text-xs font-semibold text-indigo-600 hover:underline">
                + Add Member
              </button>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-left text-[11px] font-semibold tracking-[0.06em] text-gray-500 uppercase">
                  <th className="pb-2 pl-3">NAME</th>
                  <th className="pb-2">ROLE</th>
                  <th className="pb-2">STATUS</th>
                  <th className="pb-2"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 hover:bg-[#FAFBFF]">
                  <td className="py-3 pl-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                        JM
                      </div>
                      <span className="text-[13.5px] font-medium text-gray-800">
                        John Smith
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-xs text-gray-500">President</td>
                  <td className="py-3">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                      Admin
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-gray-400 hover:text-rose-500">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-[#FAFBFF]">
                  <td className="py-3 pl-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                        IB
                      </div>
                      <span className="text-[13.5px] font-medium text-gray-800">
                        Iris Balboa
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-xs text-gray-500">Treasurer</td>
                  <td className="py-3">
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                      Editor
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-gray-400 hover:text-rose-500">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Danger Zone */}
          <div className="rounded-[20px] border border-rose-100 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <TriangleAlert className="h-5 w-5 text-rose-500" />
              <span className="font-semibold text-rose-600">Danger Zone</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50/50 p-3">
                <div>
                  <div className="text-sm font-semibold text-gray-700">
                    Archive Club
                  </div>
                  <div className="text-xs text-gray-400">
                    Temporarily disable all club activity.
                  </div>
                </div>
                <button className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-5 py-2.5 text-[13px] font-semibold text-[#DC2626] transition-all hover:bg-[#DC2626] hover:text-white">
                  Archive
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50/50 p-3">
                <div>
                  <div className="text-sm font-semibold text-gray-700">
                    Transfer Ownership
                  </div>
                  <div className="text-xs text-gray-400">
                    Assign a new primary admin.
                  </div>
                </div>
                <button className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-5 py-2.5 text-[13px] font-semibold text-[#DC2626] transition-all hover:bg-[#DC2626] hover:text-white">
                  Transfer
                </button>
              </div>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-3 text-sm font-semibold text-white transition hover:bg-rose-700">
                <Trash2 className="h-4 w-4" />
                Delete Club & All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
