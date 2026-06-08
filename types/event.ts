export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  poster_image_url?: string | null;
  poster_url?: string | null;
  club_id: string;
  host?: string;
  date?: string;
  time?: string;
  location?: string;
  image?: string;
  requiresTickets?: boolean;
  categoryBadge?: string;
  styleType?: 'image-top' | 'text-only' | 'photo-bg';
  tabPeriod?: 'this-week' | 'next-month';
}
