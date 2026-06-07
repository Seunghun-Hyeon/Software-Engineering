'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
// 사용하지 않는 아이콘들을 삭제하고 실제 사용하는 아이콘만 남겼습니다.
import { Search, UserPlus, X } from 'lucide-react';

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
    setMembers(members.filter((member) => member.id !== id));
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
    <div className="w-full font-sans text-slate-900 antialiased">
      <div className="w-full">
        {/* 우측 메인 콘텐츠 영역 (Member Management) */}
        <div className="w-full">
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

            {/* 우측 정렬 버튼 그룹 (Add Member + Search) */}
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
                    <th className="w-[20%] px-6 py-4">ROLE</th>
                    <th className="w-[15%] px-6 py-4">JOIN DATE</th>
                    <th className="w-[10%] px-6 py-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="group transition-colors hover:bg-gray-50/40"
                      >
                        {/* 멤버 이름 & 이메일 섹션 */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/5 text-xs font-bold shadow-inner',
                                member.avatarColor
                              )}
                            >
                              {member.initials}
                            </div>
                            <div>
                              <div className="text-sm font-bold tracking-tight text-gray-800">
                                {member.name}
                              </div>
                              <div className="mt-0.5 text-xs font-medium text-gray-400">
                                {member.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 학과 전공 */}
                        <td className="px-6 py-4 text-sm font-medium text-gray-500">
                          {member.major}
                        </td>

                        {/* 역할 직책 뱃지 */}
                        <td className="px-6 py-4">
                          <span
                            className={cn(
                              'inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-bold',
                              member.roleColor
                            )}
                          >
                            {member.role}
                          </span>
                        </td>

                        {/* 가입 일자 */}
                        <td className="px-6 py-4 text-xs font-semibold tracking-wide text-gray-400">
                          {member.joinDate}
                        </td>

                        {/* 관리 액션 버튼 */}
                        <td className="space-x-3 px-6 py-4 text-right text-xs font-bold">
                          <button className="text-indigo-600 transition-colors hover:text-indigo-900">
                            Edit
                          </button>
                          <button
                            onClick={() => handleRemove(member.id)}
                            className="text-rose-500 transition-colors hover:text-rose-800"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="bg-white py-12 text-center text-sm font-medium text-gray-400"
                      >
                        No matching members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 신규 멤버 추가 팝업 모달 */}
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
            <p className="mb-6 text-xs font-medium text-gray-400">
              Register a new active member to your roster.
            </p>

            <div className="space-y-4">
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
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-2.5 text-xs font-medium transition outline-none focus:border-[#4F46E5] focus:bg-white"
                  placeholder="e.g. John Doe"
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
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-2.5 text-xs font-medium transition outline-none focus:border-[#4F46E5] focus:bg-white"
                  placeholder="e.g. john@school.edu"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  Major
                </label>
                <input
                  type="text"
                  value={newMember.major}
                  onChange={(e) =>
                    setNewMember({ ...newMember, major: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-2.5 text-xs font-medium transition outline-none focus:border-[#4F46E5] focus:bg-white"
                  placeholder="e.g. Visual Design"
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
