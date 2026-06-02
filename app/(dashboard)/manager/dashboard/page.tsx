'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  PieChart,
  Users,
  FileText,
  Settings,
  Plus,
  Shapes,
  UserRound,
} from 'lucide-react';
import DashboardTab from '../DashboardTab';
import AnalyticsTab from '../AnalyticsTab';
import MembersTab from '../MembersTab';
import ApplicationsTab from '../ApplicationsTab';
import SettingsTab from '../SettingsTab';

type Tab = 'dashboard' | 'analytics' | 'members' | 'applications' | 'settings';

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'members':
        return <MembersTab />;
      case 'applications':
        return <ApplicationsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F3F4F6] font-sans text-[#111827]">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-[230px] shrink-0 flex-col justify-between overflow-y-auto border-r border-gray-200 bg-[#F8F9FA] p-5">
        <div>
          {/* Logo */}
          <div className="mb-7 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#4F46E5] text-sm text-white shadow-sm">
              <Shapes className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-[#1E1B4B]">ClubHub</span>
          </div>

          {/* User Profile */}
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm leading-tight font-bold text-gray-800">
                Club Admin
              </div>
              <div className="text-xs text-gray-400">Executive Suite</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-[14px] px-[14px] py-[10px] text-[14px] font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[#4F46E5] text-white shadow-[0_4px_14px_rgba(79,70,229,0.25)]'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Create Event Button */}
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4F46E5] py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          Create Event
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto" id="content-viewport">
        {/* Render Active Tab with Framer Motion or simple CSS transition if preferred. For simplicity, just rendering it */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
