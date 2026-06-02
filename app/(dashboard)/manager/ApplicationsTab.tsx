'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  ArrowRight,
  Plus,
  CalendarDays,
  MapPin,
  CheckCircle2,
  X,
  UserPlus,
} from 'lucide-react';

interface Applicant {
  id: string;
  name: string;
  major: string;
  gradYear: string;
  initials: string;
  color: string;
  tags: string[];
  appliedTime: string;
}

export default function ApplicationsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newApplicant, setNewApplicant] = useState({
    name: '',
    major: '',
    year: '',
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');

  const [pendingApplicants, setPendingApplicants] = useState<Applicant[]>([
    {
      id: '1',
      name: 'Elena Rodriguez',
      major: 'Computer Science',
      gradYear: '25',
      initials: 'ER',
      color: 'bg-blue-100 text-blue-600',
      tags: ['Frontend', 'Design'],
      appliedTime: 'Applied 2d ago',
    },
    {
      id: '2',
      name: 'Michael Chang',
      major: 'Business Admin',
      gradYear: '26',
      initials: 'MC',
      color: 'bg-teal-100 text-teal-600',
      tags: ['Marketing'],
      appliedTime: 'Applied 3d ago',
    },
  ]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.replace(/,/g, '').trim();
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
      }
      setTagInput('');
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const submitApplicant = () => {
    if (!newApplicant.name || !newApplicant.major || !newApplicant.year) {
      setError('Please fill in Name, Major, and Graduation Year.');
      return;
    }
    setError('');

    const initials = newApplicant.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const palettes = [
      'bg-blue-100 text-blue-600',
      'bg-purple-100 text-purple-600',
      'bg-pink-100 text-pink-600',
      'bg-amber-100 text-amber-600',
      'bg-cyan-100 text-cyan-600',
    ];
    const color = palettes[Math.floor(Math.random() * palettes.length)];

    const applicant: Applicant = {
      id: Date.now().toString(),
      name: newApplicant.name,
      major: newApplicant.major,
      gradYear: newApplicant.year,
      initials,
      color,
      tags: [...tags],
      appliedTime: 'Applied just now',
    };

    setPendingApplicants([...pendingApplicants, applicant]);
    setIsModalOpen(false);
    setNewApplicant({ name: '', major: '', year: '' });
    setTags([]);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Applicant Tracking
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage incoming applications for Fall Semester intake.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search applicants..."
              className="w-60 rounded-full border border-gray-200 bg-white py-2.5 pr-4 pl-9 text-sm shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50">
            <SlidersHorizontal className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-5">
        {/* Pending Column */}
        <div className="rounded-2xl border border-gray-200/60 bg-gray-50/70 p-4">
          <div className="mb-4 flex items-center justify-between px-1">
            <span className="flex items-center text-xs font-semibold tracking-wider text-gray-500">
              <span className="mr-2 h-2 w-2 rounded-full bg-purple-500" />
              PENDING
              <span className="ml-2 rounded-full bg-gray-200/80 px-2 py-0.5 text-xs font-bold text-gray-600">
                {pendingApplicants.length}
              </span>
            </span>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            {pendingApplicants.map((app) => (
              <div
                key={app.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-5 transition hover:shadow-md"
              >
                <div className="absolute top-0 left-0 h-full w-1.5 bg-purple-400" />
                <div className="mb-3 flex items-start justify-between pl-1">
                  <div>
                    <h3 className="font-bold text-gray-900 transition group-hover:text-indigo-600">
                      {app.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {app.major}, &apos;{app.gradYear}
                    </p>
                  </div>
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
                      app.color
                    )}
                  >
                    {app.initials}
                  </div>
                </div>
                {app.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5 pl-1">
                    {app.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-gray-50 pt-3 pl-1 text-xs text-gray-400">
                  <span>{app.appliedTime}</span>
                  <button className="flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800">
                    View Application <ArrowRight className="h-2.5 w-2.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 py-3.5 text-sm font-medium text-gray-400 transition hover:border-indigo-300 hover:text-indigo-500"
          >
            <Plus className="h-4 w-4" /> Add Applicant
          </button>
        </div>

        {/* Interview Scheduled Column */}
        <div className="rounded-2xl border border-gray-200/60 bg-gray-50/70 p-4">
          <div className="mb-4 flex items-center justify-between px-1">
            <span className="flex items-center text-xs font-semibold tracking-wider text-gray-500">
              <span className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
              INTERVIEW SCHEDULED
              <span className="ml-2 rounded-full bg-gray-200/80 px-2 py-0.5 text-xs font-bold text-gray-600">
                1
              </span>
            </span>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white p-5 ring-2 ring-indigo-600/5 transition hover:shadow-md">
              <div className="absolute top-0 left-0 h-full w-1.5 bg-blue-500" />
              <div className="mb-3 flex items-start justify-between pl-1">
                <div>
                  <h3 className="font-bold text-gray-900 transition group-hover:text-indigo-600">
                    Sarah Jenkins
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Data Science, &apos;24
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                  SJ
                </div>
              </div>
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-indigo-50 bg-indigo-50/60 p-2.5 pl-3 text-xs font-medium text-[#4F46E5]">
                <CalendarDays className="h-4 w-4" />
                <span>Tomorrow, 2:00 PM</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-3 pl-1 text-xs">
                <span className="flex items-center text-gray-400">
                  <MapPin className="mr-1 h-[11px] w-[11px]" />
                  Int. Room A
                </span>
                <button className="flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800">
                  View Application <ArrowRight className="h-2.5 w-2.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accepted Column */}
        <div className="rounded-2xl border border-gray-200/60 bg-gray-50/70 p-4">
          <div className="mb-4 flex items-center justify-between px-1">
            <span className="flex items-center text-xs font-semibold tracking-wider text-gray-500">
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
              ACCEPTED
              <span className="ml-2 rounded-full bg-gray-200/80 px-2 py-0.5 text-xs font-bold text-gray-600">
                1
              </span>
            </span>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-5 transition hover:shadow-md">
              <div className="absolute top-0 left-0 h-full w-1.5 bg-emerald-500" />
              <div className="mb-3 flex items-start justify-between pl-1">
                <div>
                  <h3 className="font-bold text-gray-900 transition group-hover:text-indigo-600">
                    David Kim
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Economics, &apos;25
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
                  DK
                </div>
              </div>
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-100/50 bg-emerald-50 p-2.5 pl-3 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                <span>Offer Accepted</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-3 pl-1 text-xs">
                <span className="text-gray-400">Onboarding pending</span>
                <button className="flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800">
                  View Application <ArrowRight className="h-2.5 w-2.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/45 p-4 backdrop-blur-[4px]">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <UserPlus className="h-5 w-5" />
            </div>
            <h2 className="mb-0.5 text-xl font-bold text-gray-900">
              Add New Applicant
            </h2>
            <p className="mb-5 text-sm text-gray-400">
              Fill in the details to add to Pending queue.
            </p>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Full Name *
                </label>
                <input
                  value={newApplicant.name}
                  onChange={(e) =>
                    setNewApplicant({ ...newApplicant, name: e.target.value })
                  }
                  className="w-full rounded-xl border-[1.5px] border-gray-200 bg-[#FAFAFA] px-[14px] py-[9px] font-sans text-[13.5px] transition outline-none focus:border-indigo-600 focus:bg-white"
                  placeholder="e.g. Jane Smith"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    Major *
                  </label>
                  <input
                    value={newApplicant.major}
                    onChange={(e) =>
                      setNewApplicant({
                        ...newApplicant,
                        major: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border-[1.5px] border-gray-200 bg-[#FAFAFA] px-[14px] py-[9px] font-sans text-[13.5px] transition outline-none focus:border-indigo-600 focus:bg-white"
                    placeholder="e.g. Computer Science"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    Grad Year *
                  </label>
                  <input
                    value={newApplicant.year}
                    onChange={(e) =>
                      setNewApplicant({ ...newApplicant, year: e.target.value })
                    }
                    className="w-full rounded-xl border-[1.5px] border-gray-200 bg-[#FAFAFA] px-[14px] py-[9px] font-sans text-[13.5px] transition outline-none focus:border-indigo-600 focus:bg-white"
                    placeholder="e.g. '26"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Skills / Interests
                </label>
                <div className="flex min-h-[42px] cursor-text flex-wrap items-center gap-1.5 rounded-xl border-[1.5px] border-gray-200 bg-[#FAFAFA] px-[14px] py-[9px] transition focus-within:border-indigo-600 focus-within:bg-white">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(i)}
                        className="leading-none text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="min-w-[120px] flex-1 bg-transparent py-0.5 text-sm outline-none"
                    placeholder="Type and press Enter..."
                  />
                </div>
                <p className="mt-1 text-[11px] text-gray-400">
                  Press{' '}
                  <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px]">
                    Enter
                  </kbd>{' '}
                  to add tag
                </p>
              </div>
            </div>
            {error && (
              <p className="mt-3 text-xs font-medium text-rose-500">{error}</p>
            )}
            <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={submitApplicant}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 text-xs" />
                Add Applicant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
