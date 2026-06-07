'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Check,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ListTodo,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/axios';

interface Task {
  id: number;
  text: string;
  done: boolean;
}

export default function Dashboard() {
  const supabase = createClient();
  const userId = useAuthStore((state) => state.userId);

  const [clubId, setClubId] = useState<string | null>(null);
  const [totalMembers, setTotalMembers] = useState<number>(0);
  const [upcomingEventsCount, setUpcomingEventsCount] = useState<number>(0);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Tasks State
  const [newTaskText, setNewTaskText] = useState('');

  // Load stats
  useEffect(() => {
    const fetchStats = async () => {
      if (!userId) return;
      setIsLoadingStats(true);
      try {
        const { data: clubs, error: clubsError } = await supabase
          .from('clubs')
          .select('id')
          .eq('exec_user_id', userId);

        if (clubsError) throw clubsError;

        if (clubs && clubs.length > 0) {
          const currentClubId = clubs[0].id;
          setClubId(currentClubId);

          // Get members count
          const { count, error: membersError } = await supabase
            .from('club_members')
            .select('id', { count: 'exact', head: true })
            .eq('club_id', currentClubId);

          if (membersError) throw membersError;
          setTotalMembers(count || 0);

          // Get events count
          const eventsResponse = await api.get('/api/events/');
          const allEvents = eventsResponse.data;
          if (Array.isArray(allEvents)) {
            const now = new Date();
            const clubUpcoming = allEvents.filter(
              (e: { club_id: string; event_date: string }) =>
                e.club_id === currentClubId && new Date(e.event_date) >= now
            );
            setUpcomingEventsCount(clubUpcoming.length);
          }
        }
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchStats();
  }, [userId]);

  // Load tasks from localStorage when clubId is resolved
  const [tasks, setTasks] = useState<Task[]>(() => []);

  useEffect(() => {
    if (clubId) {
      const savedTasks = localStorage.getItem(`dashboard_tasks_${clubId}`);
      const initialTasks = savedTasks
        ? (JSON.parse(savedTasks) as Task[])
        : [
            { id: 1, text: 'Review new application forms', done: false },
            { id: 2, text: 'Send welcoming email to new members', done: true },
          ];
      Promise.resolve().then(() => setTasks(initialTasks));
    }
  }, [clubId]);

  // Save tasks to localStorage
  const saveTasksLocally = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    if (clubId) {
      localStorage.setItem(
        `dashboard_tasks_${clubId}`,
        JSON.stringify(updatedTasks)
      );
    }
  };

  const toggleTask = (id: number) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    saveTasksLocally(updated);
  };

  const deleteTask = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering toggle
    const updated = tasks.filter((t) => t.id !== id);
    saveTasksLocally(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    // TODO: Connect tasks to backend when endpoint is available
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText.trim(),
      done: false,
    };

    const updated = [...tasks, newTask];
    saveTasksLocally(updated);
    setNewTaskText('');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] font-sans text-slate-900 antialiased">
      <main className="flex-1 overflow-y-auto p-4 md:p-10">
        {/* Header Intro */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900">
            Executive Dashboard
          </h1>
          <p className="mt-1 text-sm leading-relaxed font-medium text-gray-400">
            Welcome back. View operational statistics and coordinate tasks for
            your club.
          </p>
        </div>

        {/* 2-Column Summary Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Total Members */}
          <div className="rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
            <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Total Members
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              {isLoadingStats ? (
                <span className="text-2xl font-bold text-gray-300">--</span>
              ) : (
                <>
                  <span className="text-3xl font-black text-gray-800">
                    {totalMembers}
                  </span>
                  <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
                    Active Members
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
            <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Upcoming Events
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              {isLoadingStats ? (
                <span className="text-2xl font-bold text-gray-300">--</span>
              ) : (
                <>
                  <span className="text-3xl font-black text-gray-800">
                    {upcomingEventsCount}
                  </span>
                  <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600">
                    This intake
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Full-width Tasks Section */}
        <div className="max-w-4xl rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]">
                <ListTodo className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-gray-800">
                  Pending Tasks
                </h3>
                <p className="text-[11px] font-medium text-gray-400">
                  Manage tasks locally for your administrative tasks.
                </p>
              </div>
            </div>

            <span className="self-start rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#4F46E5] uppercase sm:self-center">
              {tasks.filter((t) => !t.done).length} Remaining
            </span>
          </div>

          {/* Task Addition Form */}
          <form onSubmit={handleAddTask} className="mb-6 flex gap-2">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Add a new task description..."
              className="flex-1 rounded-xl border border-gray-200 bg-[#FAFAFA]/50 px-4 py-2 text-xs font-semibold outline-none focus:border-[#4F46E5] focus:bg-white"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-[#4F46E5] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 active:scale-95"
            >
              <Plus className="h-4 w-4" /> Add Task
            </button>
          </form>

          {/* Tasks List */}
          <div className="space-y-2">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all select-none',
                    task.done
                      ? 'border-gray-100 bg-slate-50/50 opacity-60'
                      : 'border-gray-200/80 bg-white hover:border-indigo-200 hover:shadow-sm'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {/* Checkbox Indicator */}
                    <div
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all',
                        task.done
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-gray-300 bg-white'
                      )}
                    >
                      {task.done && <Check className="h-3 w-3 stroke-[3px]" />}
                    </div>

                    <p
                      className={cn(
                        'text-xs font-bold tracking-tight text-slate-800',
                        task.done && 'text-gray-400 line-through'
                      )}
                    >
                      {task.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => deleteTask(task.id, e)}
                      className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                      title="Delete Task"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    {!task.done ? (
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs font-semibold text-gray-400">
                No tasks available. Add some tasks above!
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
