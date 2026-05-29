export interface Event {
  id: string;
  title: string;
  host: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  requiresTickets: boolean;
  categoryBadge: string;
  styleType: 'image-top' | 'text-only' | 'photo-bg';
  tabPeriod: 'this-week' | 'next-month';
}
