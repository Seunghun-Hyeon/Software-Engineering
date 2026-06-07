'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Check,
  Plus,
  Trash2,
  FileText,
  UserPlus,
  SlidersHorizontal,
  ArrowRight,
  FileSearch,
  X,
} from 'lucide-react';

interface Task {
  id: number;
  text: string;
  sub: string;
  done: boolean;
}

interface Applicant {
  id: string;
  name: string;
  major: string;
  gradYear: string;
  initials: string;
  color: string;
  tags: string[];
  appliedTime: string;
  status: 'Pending' | 'Interview Scheduled' | 'Accepted';
  essay1: string;
  essay2: string;
}

export default function RecruitmentDashboard() {
  // 1. [Dashboard] Pending Tasks State Management
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
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskSub, setNewTaskSub] = useState('');

  // 2. [Recruitment] Application Form Link Configuration
  const [applicationLink, setApplicationLink] = useState(
    'https://forms.gle/sample-recruitment-form'
  );
  const [isEditingLink, setIsEditingLink] = useState(false);

  // View Application 상세조회용 상태값 선언
  const [selectedAppDetails, setSelectedAppDetails] =
    useState<Applicant | null>(null);

  // 3. [Recruitment] Applicant Queue Data Tracking
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: '1',
      name: 'Elena Rodriguez',
      major: 'Computer Science',
      gradYear: '25',
      initials: 'ER',
      color: 'bg-blue-100 text-blue-600',
      tags: ['Frontend', 'Design'],
      appliedTime: 'Applied 2d ago',
      status: 'Pending',
      essay1:
        'AI 및 웹 풀스택 기술 구조를 깊이 연구하여 학우들과 실용적인 학술 인프라를 구축하고 싶어 지원했습니다.',
      essay2:
        'React 아키텍처 다이어그램 및 대규모 상태 전이 설계 프로젝트의 팀장 역할을 수행한 경험이 존재합니다.',
    },
    {
      id: '2',
      name: 'Michael Chang',
      major: 'Business Admin',
      gradYear: '26',
      initials: 'MC',
      color: 'bg-amber-100 text-amber-600',
      tags: ['Marketing'],
      appliedTime: 'Applied 3d ago',
      status: 'Interview Scheduled',
      essay1:
        '동아리의 정기 서비스 및 홍보 브랜딩을 기획하고 효과적인 대외 홍보 스폰서십을 유치하고자 합니다.',
      essay2:
        '이전 대학 마케팅 연합 공모전에서 타겟 맞춤 캠페인 전략을 제안하여 대상을 수상했습니다.',
    },
  ]);

  // Modal State for Simulation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newApp, setNewApp] = useState({
    name: '',
    major: '',
    year: '',
    tags: '',
  });

  // 4. [Recruitment] Filter Tabs State
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Task Control Functions
  const handleToggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const added: Task = {
      id: Date.now(),
      text: newTaskText,
      sub: newTaskSub || 'No deadline',
      done: false,
    };
    setTasks([...tasks, added]);
    setNewTaskText('');
    setNewTaskSub('');
  };

  const handleRemoveTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Manual Applicant Mock Submission Simulation
  const handleAddApplicant = () => {
    if (!newApp.name || !newApp.major) return;
    const initials =
      newApp.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'ST';
    const randomColors = [
      'bg-purple-100 text-purple-600',
      'bg-teal-100 text-teal-600',
      'bg-rose-100 text-rose-600',
      'bg-indigo-100 text-indigo-600',
    ];
    const created: Applicant = {
      id: Date.now().toString(),
      name: newApp.name,
      major: newApp.major,
      gradYear: newApp.year || '26',
      initials,
      color: randomColors[Math.floor(Math.random() * randomColors.length)],
      tags: newApp.tags ? newApp.tags.split(',').map((t) => t.trim()) : ['New'],
      appliedTime: 'Applied Just Now',
      status: 'Pending',
      essay1: '모의 입력 예시 지원 동기 본문입니다.',
      essay2: '모의 입력 예시 기술 및 활동 역량 데이터 본문입니다.',
    };
    setApplicants([created, ...applicants]);
    setIsModalOpen(false);
    setNewApp({ name: '', major: '', year: '', tags: '' });
  };

  const handleStatusChange = (id: string, newStatus: Applicant['status']) => {
    setApplicants(
      applicants.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const filteredApplicants = applicants.filter((app) => {
    if (statusFilter === 'All') return true;
    return app.status === statusFilter;
  });

  return (
    <div className="space-y-10">
      {/* 1. Overview Summary Metrics Group */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
            Total Applicants
          </p>
          <h3 className="mt-2 text-2xl font-black text-gray-800">
            {applicants.length}
          </h3>
          <p className="mt-1 text-xs text-gray-400">
            Total applications received
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
            Pending Review
          </p>
          <h3 className="mt-2 text-2xl font-black text-amber-600">
            {applicants.filter((a) => a.status === 'Pending').length}
          </h3>
          <p className="mt-1 text-xs text-gray-400">
            Applications awaiting screening
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
            Interview Scheduled
          </p>
          <h3 className="mt-2 text-2xl font-black text-indigo-600">
            {
              applicants.filter((a) => a.status === 'Interview Scheduled')
                .length
            }
          </h3>
          <p className="mt-1 text-xs text-gray-400">
            Candidates selected for interviews
          </p>
        </div>
      </div>

      {/* 2. External Forms Link Config Panel */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">
                Application Form Setup
              </h3>
              <p className="text-xs font-medium text-gray-400">
                Configure external application forms or Google Forms for
                prospect submissions.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditingLink(!isEditingLink)}
            className="text-xs font-bold text-indigo-600 hover:underline"
          >
            {isEditingLink ? 'Done' : 'Edit Link'}
          </button>
        </div>
        <div className="mt-4">
          {isEditingLink ? (
            <input
              type="text"
              value={applicationLink}
              onChange={(e) => setApplicationLink(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs font-medium outline-none focus:border-indigo-500 focus:bg-white"
              placeholder="Enter Google Form or Application URL"
            />
          ) : (
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 text-xs">
              <span className="mr-4 overflow-x-auto font-mono whitespace-nowrap text-gray-500 select-all">
                {applicationLink}
              </span>
              <a
                href={applicationLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-bold text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Open Form
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Board Split Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-800">
                Applicant Tracking Queue
              </h3>
              <p className="text-xs font-medium text-gray-400">
                List of non-member students who submitted applications.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 self-start rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-gray-800"
            >
              <UserPlus className="h-3.5 w-3.5" /> Submit Mock App
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-3">
            <SlidersHorizontal className="mr-1 h-3.5 w-3.5 text-gray-400" />
            {['All', 'Pending', 'Interview Scheduled', 'Accepted'].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-bold transition-all',
                    statusFilter === filter
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'border border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'
                  )}
                >
                  {filter}
                </button>
              )
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-slate-50/50 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                    <th className="px-6 py-4">Applicant Profile</th>
                    <th className="px-6 py-4">Major / Class</th>
                    <th className="px-6 py-4">Status Action</th>
                    <th className="px-6 py-4 text-right">Application Docs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredApplicants.map((app) => (
                    <tr
                      key={app.id}
                      className="text-xs font-semibold transition-all hover:bg-gray-50/30"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-extrabold',
                              app.color
                            )}
                          >
                            {app.initials}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">
                              {app.name}
                            </p>
                            <span className="text-[10px] font-medium text-gray-400">
                              {app.appliedTime}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700">{app.major}</p>
                        <span className="text-[10px] font-medium text-gray-400">
                          Class of &apos;{app.gradYear}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(
                              app.id,
                              e.target.value as Applicant['status']
                            )
                          }
                          className={cn(
                            'rounded-lg border bg-white px-2 py-1 text-[11px] font-bold outline-none',
                            app.status === 'Accepted' &&
                              'border-emerald-100 bg-emerald-50/20 text-emerald-600',
                            app.status === 'Interview Scheduled' &&
                              'border-indigo-100 bg-indigo-50/20 text-indigo-600',
                            app.status === 'Pending' &&
                              'border-amber-100 bg-amber-50/20 text-amber-600'
                          )}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Interview Scheduled">
                            Interview Scheduled
                          </option>
                          <option value="Accepted">Accepted</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedAppDetails(app)}
                          className="inline-flex items-center gap-1 text-[#4F46E5] hover:underline"
                        >
                          View Application <ArrowRight size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Pending Administrative Tasks Checklist (1/3) */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-800">
              Recruitment Todo-List
            </h3>
            <p className="text-xs font-medium text-gray-400">
              Internal checklist for committee administrative work.
            </p>
          </div>

          <form
            onSubmit={handleAddTask}
            className="space-y-2.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium outline-none focus:border-indigo-500"
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTaskSub}
                onChange={(e) => setNewTaskSub(e.target.value)}
                placeholder="e.g. Due tomorrow"
                className="flex-1 rounded-xl border border-gray-200 px-3 py-1.5 text-[11px] font-medium outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="flex h-8 items-center gap-1 rounded-xl bg-[#4F46E5] px-3 text-xs font-bold text-white hover:bg-indigo-700"
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </form>

          <div className="divide-y divide-gray-50 rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start justify-between p-2.5 transition hover:bg-slate-50/50"
              >
                <div className="flex gap-2.5">
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className={cn(
                      'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-all',
                      task.done
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-gray-200 bg-white hover:border-indigo-400'
                    )}
                  >
                    {task.done && <Check size={10} strokeWidth={3} />}
                  </button>
                  <div>
                    <p
                      className={cn(
                        'text-xs leading-tight font-bold text-gray-800',
                        task.done && 'font-medium text-gray-400 line-through'
                      )}
                    >
                      {task.text}
                    </p>
                    <span className="mt-0.5 block text-[10px] font-medium text-gray-400">
                      {task.sub}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveTask(task.id)}
                  className="rounded p-0.5 text-gray-300 transition hover:text-rose-500"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Application 상세 자소서 모달 윈도우 팝업 추가 */}
      {selectedAppDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-[2px]">
          <div className="animate-in zoom-in-95 w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-6 shadow-xl duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <FileSearch className="h-4 w-4 text-indigo-600" />
                <h4 className="text-sm font-bold text-gray-900">
                  {selectedAppDetails.name}&apos;s Application Details
                </h4>
              </div>
              <button
                onClick={() => setSelectedAppDetails(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 max-h-96 space-y-4 overflow-y-auto pr-1 text-xs">
              <div>
                <p className="mb-1 font-bold text-gray-400">
                  Q1. 지원 동기 및 활동 포부
                </p>
                <div className="rounded-xl bg-slate-50 p-3 leading-relaxed font-medium text-gray-700">
                  {selectedAppDetails.essay1}
                </div>
              </div>
              <div>
                <p className="mb-1 font-bold text-gray-400">
                  Q2. 관련 경험 및 핵심 역량
                </p>
                <div className="rounded-xl bg-slate-50 p-3 leading-relaxed font-medium text-gray-700">
                  {selectedAppDetails.essay2}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-4">
              <button
                onClick={() => setSelectedAppDetails(null)}
                className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-gray-800"
              >
                Close Cover Letter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mock 추가 입력 폼 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-[4px]">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <h4 className="mb-3 text-sm font-bold text-gray-800">
              Submit Mock Applicant
            </h4>
            <div className="space-y-2.5">
              <input
                type="text"
                placeholder="Full Name"
                value={newApp.name}
                onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                className="w-full rounded-xl border border-gray-200 p-2.5 text-xs font-medium outline-none"
              />
              <input
                type="text"
                placeholder="Major (e.g., Computer Science)"
                value={newApp.major}
                onChange={(e) =>
                  setNewApp({ ...newApp, major: e.target.value })
                }
                className="w-full rounded-xl border border-gray-200 p-2.5 text-xs font-medium outline-none"
              />
              <input
                type="text"
                placeholder="Graduation Year (e.g., 27)"
                value={newApp.year}
                onChange={(e) => setNewApp({ ...newApp, year: e.target.value })}
                className="w-full rounded-xl border border-gray-200 p-2.5 text-xs font-medium outline-none"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newApp.tags}
                onChange={(e) => setNewApp({ ...newApp, tags: e.target.value })}
                className="w-full rounded-xl border border-gray-200 p-2.5 text-xs font-medium outline-none"
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg px-3 py-1.5 text-xs font-bold text-gray-400 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddApplicant}
                className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-gray-800"
              >
                Submit App
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
