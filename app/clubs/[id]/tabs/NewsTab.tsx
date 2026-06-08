'use client';

import React, { useState } from 'react';
import type { ClubDataProps } from '../types';

interface Article {
  id: string;
  date: string;
  title: string;
  summary?: string;
  content?: string;
  url?: string;
}

export function NewsTab({ clubData }: { clubData: ClubDataProps }) {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );

  // TODO: Connect to GET /api/clubs/:id/news when backend adds this endpoint
  const articles: Article[] = Array.isArray(clubData.articles)
    ? (clubData.articles as Article[])
    : [];

  const handleArticleClick = (article: Article) => {
    if (article.url && article.url !== 'N/A') {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    } else {
      setExpandedArticleId(
        expandedArticleId === article.id ? null : article.id
      );
    }
  };

  return (
    <section className="min-h-[500px] rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
        All News
      </h2>
      <div className="flex flex-col gap-6">
        {articles.length === 0 ? (
          <div className="p-8 text-center text-xs font-semibold text-gray-400">
            No news posted yet
          </div>
        ) : (
          articles.map((article) => {
            const isExpanded = expandedArticleId === article.id;
            const hasUrl = article.url && article.url !== 'N/A';
            return (
              <div
                key={article.id}
                className="flex flex-col gap-6 rounded-[20px] border border-gray-100 bg-gray-50 p-6 md:flex-row"
              >
                <div className="flex-1">
                  <p className="mb-1 text-sm font-semibold text-gray-500">
                    {article.date}
                  </p>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {article.title}
                  </h3>
                  <p className="mb-4 text-gray-600 transition-all duration-300">
                    {isExpanded
                      ? article.content || article.summary
                      : article.summary || article.content}
                  </p>
                  {(hasUrl ||
                    (article.content && article.content !== 'N/A')) && (
                    <button
                      type="button"
                      onClick={() => handleArticleClick(article)}
                      className="text-sm font-bold text-[#3323cc] hover:underline"
                    >
                      {hasUrl
                        ? 'Read full article ↗'
                        : isExpanded
                          ? 'Show Less'
                          : 'Read full article →'}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
