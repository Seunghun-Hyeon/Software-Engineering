'use client';

import React from 'react';
import { Briefcase, CheckCircle2, Circle } from 'lucide-react';
import { Application } from './types';
import { cn } from '@/lib/utils';
import { Badge } from '@/app/components/Badge';

interface ApplicationsTabProps {
  applications: Application[];
}

export function ApplicationsTab({ applications }: ApplicationsTabProps) {
  // TODO: Replace with GET /api/applications when backend is connected

  const stages: {
    label: string;
    key: Application['status'];
    description: string;
  }[] = [
    {
      label: 'Submitted',
      key: 'submitted',
      description: 'Application received',
    },
    {
      label: 'Under Review',
      key: 'under_review',
      description: 'Document screening',
    },
    { label: 'Interview', key: 'interview', description: 'Interview meeting' },
    { label: 'Result', key: 'result', description: 'Final selection' },
  ];

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-gray-300 bg-white/40 px-6 py-20 text-center backdrop-blur-sm">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Briefcase className="h-8 w-8" />
        </div>
        <h3 className="font-display mb-1 text-lg font-bold text-gray-900">
          No applications yet
        </h3>
        <p className="max-w-xs text-sm font-medium text-gray-500">
          Browse clubs to apply!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {applications.map((app) => {
        const currentIndex = stages.findIndex((s) => s.key === app.status);

        return (
          <div
            key={app.id}
            className="group overflow-hidden rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] md:p-8"
          >
            {/* Header info layout */}
            <div className="flex flex-col gap-6 border-b border-gray-200/50 pb-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#4F46E5]/10 text-[#4F46E5]">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-2xl leading-tight font-bold text-gray-900 transition-colors group-hover:text-[#4F46E5]">
                    {app.clubName}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      Status:
                    </span>
                    <Badge
                      variant={app.status === 'result' ? 'emerald' : 'indigo'}
                    >
                      {stages[currentIndex]?.label || app.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="self-start md:self-auto"></div>
            </div>

            {/* Stepper Tracking Layout */}
            <div className="relative mt-8">
              {/* Stepper horizontal line for desktop screens */}
              <div className="absolute top-[18px] right-[12%] left-[12%] z-0 hidden h-1 -translate-y-1/2 bg-gray-200/60 md:block">
                <div
                  className="h-full bg-[#4F46E5] shadow-[0_0_10px_rgba(79,70,229,0.3)] transition-all duration-500"
                  style={{
                    width: `${(currentIndex / (stages.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {/* Responsive Grid layout for desktop */}
              <div className="relative z-10 hidden grid-cols-4 gap-4 md:grid">
                {stages.map((stage, idx) => {
                  const isCompleted = idx < currentIndex;
                  const isCurrent = idx === currentIndex;
                  const isPending = idx > currentIndex;

                  return (
                    <div
                      key={stage.key}
                      className="flex flex-col items-center text-center"
                    >
                      <div
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300',
                          isCompleted &&
                            'border-[#4F46E5] bg-[#4F46E5] text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]',
                          isCurrent &&
                            'border-[#4F46E5] bg-white text-[#4F46E5] ring-4 ring-[#4F46E5]/10',
                          isPending && 'border-gray-200 bg-white text-gray-400'
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : isCurrent ? (
                          <span className="h-3 w-3 animate-pulse rounded-full bg-[#4F46E5]" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                      <span
                        className={cn(
                          'mt-3 text-sm font-bold tracking-tight',
                          isCurrent
                            ? 'text-[#4F46E5]'
                            : isPending
                              ? 'text-gray-400'
                              : 'text-gray-700'
                        )}
                      >
                        {stage.label}
                      </span>
                      <span className="mt-1 max-w-[120px] text-xs leading-relaxed font-medium text-gray-400">
                        {stage.description}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Vertical Stepper layout for mobile */}
              <div className="relative z-10 space-y-6 pl-2 md:hidden">
                <div className="absolute top-4 bottom-4 left-6 z-0 w-0.5 bg-gray-200/60">
                  <div
                    className="w-full bg-[#4F46E5] shadow-[0_0_10px_rgba(79,70,229,0.3)] transition-all duration-500"
                    style={{
                      height: `${(currentIndex / (stages.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                {stages.map((stage, idx) => {
                  const isCompleted = idx < currentIndex;
                  const isCurrent = idx === currentIndex;
                  const isPending = idx > currentIndex;

                  return (
                    <div
                      key={stage.key}
                      className="relative z-10 flex items-start gap-4"
                    >
                      <div
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300',
                          isCompleted &&
                            'border-[#4F46E5] bg-[#4F46E5] text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]',
                          isCurrent &&
                            'border-[#4F46E5] bg-white text-[#4F46E5] ring-4 ring-[#4F46E5]/10',
                          isPending && 'border-gray-200 bg-white text-gray-400'
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : isCurrent ? (
                          <span className="h-3 w-3 animate-pulse rounded-full bg-[#4F46E5]" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                      <div className="pt-1">
                        <span
                          className={cn(
                            'block text-sm font-bold tracking-tight',
                            isCurrent
                              ? 'text-[#4F46E5]'
                              : isPending
                                ? 'text-gray-400'
                                : 'text-gray-700'
                          )}
                        >
                          {stage.label}
                        </span>
                        <span className="text-xs font-medium text-gray-400">
                          {stage.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
