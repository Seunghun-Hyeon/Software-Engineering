import React from 'react';
import Image from 'next/image';
import { Heart, MessageCircle } from 'lucide-react';

export interface Post {
  id: string;
  author: string;
  authorInitials: string;
  timeAgo: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
}

export function PostFeed({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-display text-2xl font-bold tracking-tight text-gray-900">
        Recent Posts
      </h3>
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl"
        >
          {/* Header */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4F46E5]/10 text-sm font-bold text-[#4F46E5]">
              {post.authorInitials}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{post.author}</p>
              <p className="text-xs font-semibold text-gray-400">
                {post.timeAgo}
              </p>
            </div>
          </div>

          {/* Content */}
          <p className="mb-4 text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
            {post.content}
          </p>

          {/* Optional Image */}
          {post.imageUrl && (
            <div className="relative mb-4 h-64 w-full overflow-hidden rounded-[16px] bg-gray-100">
              <Image
                src={post.imageUrl}
                alt="Post content"
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex gap-6 border-t border-gray-200/50 pt-4">
            <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 transition-colors hover:text-[#4F46E5]">
              <Heart className="h-4 w-4" /> {post.likes}
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 transition-colors hover:text-[#4F46E5]">
              <MessageCircle className="h-4 w-4" /> {post.comments}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
