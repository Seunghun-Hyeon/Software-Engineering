'use client';

import React from 'react';
import { Button } from '@/app/components/Button';
import { Input } from '@/app/components/Input';
import { BentoCard } from '@/app/components/BentoCard';

export function SupportForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted');
  };

  return (
    <BentoCard className="p-8 shadow-lg">
      <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
        Let&apos;s talk
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-600"
            >
              First name
            </label>
            <Input
              id="firstName"
              type="text"
              className="border-none bg-gray-50"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-600"
            >
              Last name
            </label>
            <Input
              id="lastName"
              type="text"
              className="border-none bg-gray-50"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="studentId"
            className="text-sm font-medium text-gray-600"
          >
            Student ID
          </label>
          <Input
            id="studentId"
            type="text"
            placeholder="e.g., 22300000"
            className="border-none bg-gray-50"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Your @handong.edu email"
            className="border-none bg-gray-50"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="message"
            className="text-sm font-medium text-gray-600"
          >
            Message
          </label>
          <textarea
            id="message"
            className="w-full resize-none rounded-lg border-none bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-[#4F46E5]/20 focus:outline-none"
            rows={4}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          By sending this message, you agree to our privacy policy regarding
          data handling.
        </p>
        <Button
          type="submit"
          className="mt-4 rounded-full bg-[#4F46E5] py-4 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-600"
        >
          Send message
        </Button>
      </form>
    </BentoCard>
  );
}
