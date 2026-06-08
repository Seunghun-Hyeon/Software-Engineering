'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import api from '@/lib/axios';

interface Article {
  id: string;
  date: string;
  title: string;
  summary?: string;
  content?: string;
}

export function NewsTab({ clubId }: { clubId: string }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!clubId) return;
    api
      .get(`/clubs/${clubId}/news`)
      .then((res) => setArticles(res.data))
      .catch(() => setArticles([]))
      .finally(() => setIsLoading(false));
  }, [clubId]);

  return (
    <section className="min-h-[500px] rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
        All News
      </h2>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
        </div>
      ) : articles.length === 0 ? (
        <div className="p-8 text-center text-xs font-semibold text-gray-400">
          No news posted yet
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {articles.map((article) => {
            const isExpanded = expandedId === article.id;
            const body = article.content || article.summary || '';
            return (
              <div
                key={article.id}
                className="flex flex-col gap-4 rounded-[20px] border border-gray-100 bg-gray-50 p-6"
              >
                <p className="text-sm font-semibold text-gray-500">
                  {article.date}
                </p>
                <h3 className="text-xl font-bold text-gray-900">
                  {article.title}
                </h3>
                {body && (
                  <>
                    <p className="text-gray-600">
                      {isExpanded ? body : body.slice(0, 200) + (body.length > 200 ? '…' : '')}
                    </p>
                    {body.length > 200 && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : article.id)
                        }
                        className="self-start text-sm font-bold text-[#3323cc] hover:underline"
                      >
                        {isExpanded ? 'Show less' : 'Read more →'}
                      </button>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
