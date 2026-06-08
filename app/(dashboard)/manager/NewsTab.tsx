'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Plus,
  Edit2,
  Trash2,
  LayoutGrid,
  List,
  Loader2,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { getApiErrorMessage } from '@/lib/apiError';
import { createClient } from '@/lib/supabase/client';

interface Article {
  id: string;
  date: string;
  title: string;
  content?: string;
  summary?: string;
}

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-2.5 text-xs font-semibold text-gray-800 transition focus:border-[#4F46E5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4F46E5]/10';
const primaryBtnClass =
  'cursor-pointer rounded-full bg-[#4F46E5] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#4338CA] disabled:cursor-not-allowed disabled:bg-gray-300';
const secondaryBtnClass =
  'cursor-pointer rounded-full border border-gray-200 bg-white px-5 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50';

export default function NewsTab() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clubId, setClubId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    if (!userId) return;
    const supabase = createClient();
    const fetchClubAndNews = async () => {
      try {
        const { data: club } = await supabase
          .from('clubs')
          .select('id')
          .eq('exec_user_id', userId)
          .single();

        if (!club) {
          setIsLoading(false);
          return;
        }

        setClubId(club.id);

        const { data: posts, error: fetchError } = await supabase
          .from('club_posts')
          .select('*')
          .eq('club_id', club.id)
          .order('published_at', { ascending: false });

        if (fetchError) throw fetchError;

        setArticles(
          (posts || []).map((post) => ({
            id: post.id,
            date: new Date(post.published_at)
              .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              .toUpperCase(),
            title: post.title,
            content: post.content,
            summary: post.excerpt,
          }))
        );
      } catch (error) {
        setError(getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubAndNews();
  }, [userId]);

  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [newArticle, setNewArticle] = useState({
    title: '',
    date: '',
    content: '',
  });

  const handleEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setNewArticle({
      title: art.title,
      date: art.date,
      content: art.content || '',
    });
    setIsAddingArticle(true);
  };

  const handleDeleteArticle = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this news article?'))
      return;
    if (!clubId) return;

    try {
      await api.delete(`/clubs/${clubId}/news/${id}`);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.date || !clubId) return;
    setFormError(null);

    try {
      if (editingArticleId) {
        const res = await api.patch(
          `/clubs/${clubId}/news/${editingArticleId}`,
          {
            ...newArticle,
            summary: newArticle.content,
          }
        );
        setArticles((prev) =>
          prev.map((a) => (a.id === editingArticleId ? res.data : a))
        );
      } else {
        const res = await api.post(`/clubs/${clubId}/news`, {
          ...newArticle,
          summary: newArticle.content,
        });
        setArticles((prev) => [res.data, ...prev]);
      }

      setEditingArticleId(null);
      setIsAddingArticle(false);
      setNewArticle({
        title: '',
        date: '',
        content: '',
      });
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Club News
        </h1>
        <p className="mt-2 text-sm font-medium text-gray-500">
          Publish external links or write internal updates to keep members
          informed.
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        </div>
      ) : (
        <div className="rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-gray-900">
              News Articles
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'rounded-md p-1.5 transition-colors',
                    viewMode === 'list'
                      ? 'bg-white text-[#4F46E5] shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  )}
                  title="List View"
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'rounded-md p-1.5 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-white text-[#4F46E5] shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  )}
                  title="Grid View"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
              <button
                onClick={() => {
                  setEditingArticleId(null);
                  setNewArticle({
                    title: '',
                    date: '',
                    content: '',
                  });
                  setIsAddingArticle(!isAddingArticle);
                }}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#4F46E5] text-white transition duration-200 hover:bg-[#4338CA]"
                title="Add News Article"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {isAddingArticle && (
            <form
              onSubmit={handleSaveArticle}
              className="animate-in fade-in mb-6 space-y-4 rounded-xl border border-gray-100 bg-white/50 p-5 shadow-sm"
            >
              <h3 className="text-sm font-bold text-gray-800">
                {editingArticleId ? 'Edit Article' : 'Add New Article'}
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">
                    Article Title
                  </label>
                  <input
                    type="text"
                    value={newArticle.title}
                    onChange={(e) =>
                      setNewArticle({
                        ...newArticle,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g. Workshop Starting Soon"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">
                    Date
                  </label>
                  <div className="relative mt-1">
                    <Calendar className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={newArticle.date}
                      onChange={(e) =>
                        setNewArticle({
                          ...newArticle,
                          date: e.target.value,
                        })
                      }
                      className={cn(inputClass, 'pl-10')}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">
                  Article Content
                </label>
                <textarea
                  rows={4}
                  value={newArticle.content}
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      content: e.target.value,
                    })
                  }
                  placeholder="Write the full content of the article here..."
                  className={cn(inputClass, 'resize-none')}
                />
              </div>

              {formError && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingArticle(false)}
                  className={secondaryBtnClass}
                >
                  Cancel
                </button>
                <button type="submit" className={primaryBtnClass}>
                  Save Article
                </button>
              </div>
            </form>
          )}

          <div
            className={cn(
              viewMode === 'list'
                ? 'space-y-4'
                : 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'
            )}
          >
            {articles.map((art) => (
              <div
                key={art.id}
                className={cn(
                  'flex rounded-[20px] border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md',
                  viewMode === 'list'
                    ? 'flex-row items-start justify-between gap-4'
                    : 'flex-col gap-4'
                )}
              >
                <div className="min-w-0 flex-1">
                  <span className="mb-1 block text-xs font-bold text-gray-400">
                    {art.date}
                  </span>
                  <h4 className="text-base font-bold text-gray-900">
                    {art.title}
                  </h4>
                  <div className="mt-2 text-sm text-gray-600">
                    <p className="line-clamp-2">{art.content}</p>
                  </div>
                </div>
                <div
                  className={cn(
                    'flex shrink-0 items-center gap-2',
                    viewMode === 'grid'
                      ? 'justify-end border-t border-gray-50 pt-3'
                      : ''
                  )}
                >
                  <button
                    onClick={() => handleEditArticle(art)}
                    className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(art.id)}
                    className="rounded-full p-2 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {articles.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-gray-50 p-4">
                  <Plus size={24} className="text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  No articles published yet. Click the + button to add news.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
