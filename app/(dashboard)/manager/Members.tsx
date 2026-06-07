'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, UserPlus, X, Edit2, Trash2, Check } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  major: string;
  role: string;
  joinDate: string;
  initials: string;
  avatarColor: string;
  roleColor: string;
}

export default function Members() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    major: '',
    role: 'Member',
  });

  // 인라인 편집을 위한 상태 추가
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', major: '', role: '' });

  // 초기 멤버 데이터 세팅
  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      name: 'Alex Boudreau',
      email: 'alex@boudreau.edu',
      major: 'Computer Science',
      role: 'Club President',
      joinDate: '2022-09-12',
      initials: 'AB',
      avatarColor: 'bg-blue-100 text-blue-600',
      roleColor: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      id: '2',
      name: 'Maria Alvarez',
      email: 'm.alvarez@school.edu',
      major: 'Media Business',
      role: 'Treasurer',
      joinDate: '2022-10-30',
      initials: 'MA',
      avatarColor: 'bg-teal-100 text-teal-600',
      roleColor: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      id: '3',
      name: 'Hana Kang',
      email: 'hana.k@studio.edu',
      major: 'Visual Design',
      role: 'Committee',
      joinDate: '2023-06-15',
      initials: 'HK',
      avatarColor: 'bg-purple-100 text-purple-600',
      roleColor: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      id: '4',
      name: 'Lily Lawson',
      email: 'lily.l@campus.edu',
      major: 'Political Science',
      role: 'Member',
      joinDate: '2023-03-07',
      initials: 'LL',
      avatarColor: 'bg-slate-100 text-slate-600',
      roleColor: 'bg-slate-50 text-slate-600 border-slate-200',
    },
  ]);

  // 회원 삭제 기능
  const handleRemove = (id: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      setMembers(members.filter((member) => member.id !== id));
    }
  };

  // 회원 인라인 편집 시작 기능
  const startEdit = (member: Member) => {
    setEditingId(member.id);
    setEditForm({ name: member.name, major: member.major, role: member.role });
  };

  // 회원 인라인 편집 저장 기능
  const saveEdit = (id: string) => {
    const roleColors: Record<string, string> = {
      'Club President': 'bg-indigo-50 text-indigo-600 border-indigo-100',
      Treasurer: 'bg-blue-50 text-blue-600 border-blue-100',
      Committee: 'bg-purple-50 text-purple-600 border-purple-100',
      Member: 'bg-slate-50 text-slate-600 border-slate-200',
    };

    setMembers(
      members.map((m) =>
        m.id === id
          ? {
              ...m,
              name: editForm.name,
              major: editForm.major,
              role: editForm.role,
              roleColor: roleColors[editForm.role] || roleColors['Member'],
            }
          : m
      )
    );
    setEditingId(null);
  };

  // 회원 추가 기능
  const handleAddMember = () => {
    if (!newMember.name || !newMember.email || !newMember.major) return;

    const initials = newMember.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const roleColors: Record<string, string> = {
      'Club President': 'bg-indigo-50 text-indigo-600 border-indigo-100',
      Treasurer: 'bg-blue-50 text-blue-600 border-blue-100',
      Committee: 'bg-purple-50 text-purple-600 border-purple-100',
      Member: 'bg-slate-50 text-slate-600 border-slate-200',
    };

    const addedMember: Member = {
      id: Date.now().toString(),
      name: newMember.name,
      email: newMember.email,
      major: newMember.major,
      role: newMember.role,
      joinDate: new Date().toISOString().split('T')[0],
      initials: initials || 'M',
      avatarColor: 'bg-indigo-100 text-indigo-600',
      roleColor: roleColors[newMember.role] || roleColors['Member'],
    };

    setMembers([...members, addedMember]);
    setIsModalOpen(false);
    setNewMember({ name: '', email: '', major: '', role: 'Member' });
  };

  // 검색 필터링
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] font-sans text-slate-900 antialiased">
      <div className="flex flex-1">
        <main className="flex-1 overflow-y-auto p-10">
          {/* 타이틀 및 상단 우측 액션 바 컨트롤 */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Member Management
              </h1>
              <p className="mt-1 text-sm font-medium text-gray-400">
                View, edit roles, and manage active members in your club.
              </p>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-[#4F46E5] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700"
              >
                <UserPlus className="h-4 w-4" /> Add Member
              </button>

              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search members..."
                  className="w-64 rounded-xl border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-xs font-medium shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 메인 명단 테이블 카드 컴포넌트 */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-slate-50/50 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                    <th className="w-[30%] px-6 py-4">MEMBER NAME</th>
                    <th className="w-[25%] px-6 py-4">MAJOR</th>
                    <th className="w-[20%] px-6 py-4">ROLE POSITION</th>
                    <th className="w-[15%] px-6 py-4">JOINED DATE</th>
                    <th className="w-[10%] px-6 py-4 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs font-semibold">
                  {filteredMembers.map((member) => {
                    const isEditing = editingId === member.id;
                    return (
                      <tr
                        key={member.id}
                        className="transition-colors hover:bg-gray-50/40"
                      >
                        {/* 이름 열 */}
                        <td className="px-6 py-4.5">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold',
                                member.avatarColor
                              )}
                            >
                              {member.initials}
                            </div>
                            <div className="flex flex-col">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editForm.name}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      name: e.target.value,
                                    })
                                  }
                                  className="rounded border border-gray-200 px-2 py-1 text-xs outline-none focus:border-indigo-500"
                                />
                              ) : (
                                <>
                                  <span className="font-bold text-gray-900">
                                    {member.name}
                                  </span>
                                  <span className="text-[10px] font-medium text-gray-400">
                                    {member.email}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* 전공 열 */}
                        <td className="px-6 py-4.5 text-gray-600">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.major}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  major: e.target.value,
                                })
                              }
                              className="rounded border border-gray-200 px-2 py-1 text-xs outline-none focus:border-indigo-500"
                            />
                          ) : (
                            member.major
                          )}
                        </td>

                        {/* 역할 열 */}
                        <td className="px-6 py-4.5">
                          {isEditing ? (
                            <select
                              value={editForm.role}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  role: e.target.value,
                                })
                              }
                              className="rounded border border-gray-200 bg-white px-2 py-1 text-xs outline-none focus:border-indigo-500"
                            >
                              <option value="Member">Member</option>
                              <option value="Committee">Committee</option>
                              <option value="Treasurer">Treasurer</option>
                              <option value="Club President">
                                Club President
                              </option>
                            </select>
                          ) : (
                            <span
                              className={cn(
                                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide uppercase',
                                member.roleColor
                              )}
                            >
                              {member.role}
                            </span>
                          )}
                        </td>

                        {/* 가입일 열 */}
                        <td className="px-6 py-4.5 font-medium text-gray-400">
                          {member.joinDate}
                        </td>

                        {/* 액션 제어 버튼 기능 바인딩 */}
                        <td className="px-6 py-4.5 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {isEditing ? (
                              <>
                                <button
                                  onClick={() => saveEdit(member.id)}
                                  className="rounded p-1 text-emerald-600 hover:bg-emerald-50"
                                  title="Save Changes"
                                >
                                  <Check size={14} />
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="rounded p-1 text-gray-400 hover:bg-gray-100"
                                  title="Cancel"
                                >
                                  <X size={14} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => startEdit(member)}
                                  className="rounded-lg p-1.5 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                  title="Edit Member"
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button
                                  onClick={() => handleRemove(member.id)}
                                  className="rounded-lg p-1.5 text-gray-400 transition hover:bg-rose-50 hover:text-rose-600"
                                  title="Remove Member"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* 새 멤버 추가 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-[4px]">
          <div className="animate-in fade-in-50 zoom-in-95 relative w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl duration-150">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-[#4F46E5]">
              <UserPlus className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              Add New Member
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold"
                  placeholder="john@school.edu"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  Major Department
                </label>
                <input
                  type="text"
                  value={newMember.major}
                  onChange={(e) =>
                    setNewMember({ ...newMember, major: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold"
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  Role Position
                </label>
                <select
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({ ...newMember, role: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-2.5 text-xs font-semibold text-gray-600 transition outline-none focus:border-[#4F46E5] focus:bg-white"
                >
                  <option value="Member">Member</option>
                  <option value="Committee">Committee</option>
                  <option value="Treasurer">Treasurer</option>
                  <option value="Club President">Club President</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl px-5 py-2.5 text-xs font-bold text-gray-500 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="rounded-xl bg-[#4F46E5] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-indigo-700"
              >
                Register Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
