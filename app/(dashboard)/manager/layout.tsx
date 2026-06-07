import React from 'react';

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8FAFC]">
      {children}
    </div>
  );
}
