import type { LucideIcon } from 'lucide-react';

export interface Category {
  title: string;
  description: string;
  count: string;
  iconName: string; // Since we can't easily serialize React components/icons, we send string names
  gradient: string;
  bgImage: string;
}
