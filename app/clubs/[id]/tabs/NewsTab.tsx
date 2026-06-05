'use client';

import React, { useState } from 'react';

interface Article {
  id: string;
  date: string;
  title: string;
  summary: string;
  fullContent?: string;
  url?: string;
  isImportant?: boolean;
}

export function NewsTab() {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );

  const articles: Article[] = [
    {
      id: 'article-1',
      date: 'OCT 24, 2023',
      title: 'Fall Hackathon Registration Now Open',
      summary:
        'Join us for the largest coding event of the semester. Compete with teams of up to 4 for a total prize pool of $5,000, and get a chance to network with direct recruiters from top tech firms.',
      url: 'https://hackathon.example.com',
      isImportant: true,
    },
    {
      id: 'article-2',
      date: 'OCT 20, 2023',
      title: 'New Partnership: TechGiant Cloud',
      summary:
        'We are thrilled to announce a new partnership. All active members will now receive $500 in cloud credits for their personal projects and research deployments.',
      fullContent:
        'We are thrilled to announce a new partnership. All active members will now receive $500 in cloud credits for their personal projects and research deployments. This collaboration aims to lower the barrier for students building complex machine learning models, training datasets, and hosting heavy web applications. TechGiant Cloud engineers will also hold exclusive monthly office hours and mentorship sessions for club members throughout the academic year. Details on how to redeem your credits have been sent to your registered school email.',
      isImportant: false,
    },
    {
      id: 'article-3',
      date: 'OCT 15, 2023',
      title: 'Community Spotlight: The Solar Project',
      summary:
        'See how a team of our junior members collaborated to build a low-cost, open-source solar tracker that is now installed in the campus library garden.',
      fullContent:
        "See how a team of our junior members collaborated to build a low-cost, open-source solar tracker that is now installed in the campus library garden. The project utilizes locally sourced wood, recycled 3D printer parts, and an Arduino Uno to track the sun and optimize the angle of a small solar panel. Since installation, it has generated enough electricity to power the garden's low-voltage LED lights at night. Read the open-source repository and assembly instructions on our club's GitHub page.",
      isImportant: false,
    },
  ];

  const handleArticleClick = (article: Article) => {
    if (article.url) {
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
        {articles.map((article) => {
          const isExpanded = expandedArticleId === article.id;
          return (
            <div
              key={article.id}
              className="flex flex-col gap-6 rounded-[20px] border border-gray-100 bg-gray-50 p-6 md:flex-row"
            >
              <div className="flex-1">
                <p
                  className={`mb-1 text-sm font-semibold ${
                    article.isImportant ? 'text-[#10B981]' : 'text-gray-500'
                  }`}
                >
                  {article.date}
                </p>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {article.title}
                </h3>
                <p className="mb-4 text-gray-600 transition-all duration-300">
                  {isExpanded
                    ? article.fullContent || article.summary
                    : article.summary}
                </p>
                <button
                  type="button"
                  onClick={() => handleArticleClick(article)}
                  className="text-sm font-bold text-[#3323cc] hover:underline"
                >
                  {article.url
                    ? 'Read full article ↗'
                    : isExpanded
                      ? 'Show Less'
                      : 'Read full article →'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
