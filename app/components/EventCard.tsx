/**
 * ============================================================================
 * EventCard Component (Dynamic Multi-Template Upcoming Events Card)
 * ============================================================================
 *
 * [WHAT IT IS FOR]
 * This is a highly flexible, multi-style event card component that represents
 * campus activities. It supports three distinct visual layouts ('image-top',
 * 'text-only', and 'photo-bg') to keep grids looking organic, dynamic, and
 * content-rich without visual fatigue.
 *
 * [WHAT IT LOOKS LIKE]
 * Depending on the styleType prop:
 * 1. 'image-top': Standard glassmorphism card with a 16:9 aspect image header,
 *    floating category badges, descriptive text, and a primary "Remind Me" action button.
 * 2. 'text-only': Bento-styled card featuring text and icons without images. It places
 *    emphasis on clock metrics, host detail, and includes a capacity indicator.
 * 3. 'photo-bg': Full-bleed card where the event image occupies the background.
 *    It uses dark gradients for text readability and presents floating actions at the
 *    bottom including ticket purchases or event reminders.
 *
 * [WHERE IT IS USED]
 * - Homepage: Featured in the grid under the "Upcoming Events" section.
 *
 * [PROPS CONTRACT]
 * - event: (EventProps) The data structure modeling the event database object.
 *   - id: Unique event ID.
 *   - title: Name of the event.
 *   - host: Hosting club name.
 *   - date: Calendar date.
 *   - time: Event start/end hours.
 *   - location: Geographic or building venue.
 *   - description: Longer descriptive paragraph.
 *   - image: Public file path to the illustration image.
 *   - requiresTickets: Boolean indicating if entry requires purchasing a ticket.
 *   - categoryBadge: Theme label (e.g. "ACADEMIC", "FREE", "SOCIAL").
 *   - styleType: Design template option ('image-top' | 'text-only' | 'photo-bg').
 *   - tabPeriod: Filter group classification ('this-week' | 'next-month').
 * - onRemindClick: (function) Optional callback handler triggered when requesting notifications.
 * - onTicketsClick: (function) Optional callback handler triggered when booking tickets.
 * - className: (string) Custom CSS classes to customize layout positioning.
 */

import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { Button } from '@/app/components/Button';
import { CategoryBadge } from '@/app/components/CategoryBadge';
import { cn } from '@/lib/utils';

// Contract defining the properties expected inside the event data model object
export interface EventProps {
  id: string; // Unique database identifier for the event
  title: string; // Name of the event (e.g., "ZZ Street")
  host: string; // Name of the hosting club (e.g., "Zizzy")
  date: string; // Formatted date string (e.g., "May 27, 2026")
  time: string; // Formatted time string (e.g., "6:30 PM")
  location: string; // Campus location venue description
  description: string; // Paragraph describing the event scope
  image: string; // Path or URL to the thumbnail/cover image
  requiresTickets: boolean; // True if ticket bookings are mandatory
  categoryBadge: string; // Main category category label (e.g. "MUSIC", "SPORTS")
  styleType: 'image-top' | 'text-only' | 'photo-bg'; // Visual layout template selector
  tabPeriod: 'this-week' | 'next-month'; // Category filter grouping
}

// Props contract for the EventCard component wrapper
export interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  event: EventProps; // The event entity model instance
  onRemindClick?: (eventId: string) => void; // Callback function triggered when requesting reminders
  onTicketsClick?: (eventId: string) => void; // Callback function triggered when registering tickets
}

export const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
  ({ className, event, onRemindClick, onTicketsClick, ...props }, ref) => {
    // Custom click handlers that prevent event bubbling/parent card actions
    const handleRemind = (e: React.MouseEvent) => {
      e.stopPropagation();
      // TODO: Replace with POST /api/events/:id/remind when backend is connected
      if (onRemindClick) onRemindClick(event.id);
    };

    const handleTickets = (e: React.MouseEvent) => {
      e.stopPropagation();
      // TODO: Replace with POST /api/events/:id/tickets when backend is connected
      if (onTicketsClick) onTicketsClick(event.id);
    };

    // ====================================================
    // TEMPLATE 1: Large Image on Top Style ('image-top')
    // ====================================================
    if (event.styleType === 'image-top') {
      return (
        <Card
          ref={ref}
          className={cn(
            'flex h-full flex-col justify-between overflow-hidden border border-white/60 bg-white/85 p-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(79,70,229,0.06)]',
            className
          )}
          {...props}
        >
          <div>
            {/* Aspect ratio constrained image wrapper with subtle zoom hover interaction */}
            <div className="group relative aspect-[16/9] w-full overflow-hidden bg-gray-50 shadow-sm select-none">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

              {/* Badges placed on top of the visual content */}
              <div className="absolute top-4 left-4 z-10 flex gap-1.5">
                <CategoryBadge label={event.categoryBadge} variant="primary" />
                <CategoryBadge label="FREE" variant="secondary" />
              </div>
            </div>

            {/* Event descriptive text container */}
            <div className="p-6 text-left">
              <span className="block text-[10px] font-black tracking-wider text-[#4F46E5] uppercase">
                Host: {event.host}
              </span>
              <h3 className="font-display mt-2 cursor-pointer text-lg font-bold text-gray-900 transition-colors hover:text-[#4F46E5]">
                {event.title}
              </h3>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
              <p className="mt-3 line-clamp-3 font-sans text-xs leading-relaxed text-gray-400">
                {event.description}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="border-t border-gray-50/70 px-6 pt-3 pb-6 select-none">
            <Button
              onClick={handleRemind}
              className="w-full bg-[#4F46E5] py-2.5 text-xs shadow-md transition-all duration-300 hover:bg-[#4338CA]"
            >
              Remind Me
            </Button>
          </div>
        </Card>
      );
    }

    // ====================================================
    // TEMPLATE 2: Text/Icon Bento Style ('text-only')
    // ====================================================
    if (event.styleType === 'text-only') {
      return (
        <Card
          ref={ref}
          className={cn(
            'flex h-full flex-col justify-between border border-white/60 bg-white/85 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(79,70,229,0.06)]',
            className
          )}
          {...props}
        >
          <div>
            <div className="flex items-center justify-between">
              {/* Left Side: status badging chips */}
              <div className="flex items-center gap-2">
                <CategoryBadge label={event.categoryBadge} variant="indigo" />
                <CategoryBadge label="FREE" variant="emerald" />
              </div>
              {/* Right Side: Circle wrapper clock icon */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-[#4F46E5] shadow-sm">
                <Clock className="h-4.5 w-4.5" />
              </div>
            </div>

            {/* Event descriptive text container */}
            <div className="mt-6 text-left">
              <span className="block text-[10px] font-black tracking-wider text-[#4F46E5] uppercase">
                Host: {event.host}
              </span>
              <h3 className="font-display mt-1.5 cursor-pointer text-lg font-bold text-gray-900 transition-colors hover:text-[#4F46E5]">
                {event.title}
              </h3>
              <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
              <p className="mt-3.5 line-clamp-3 font-sans text-xs leading-relaxed text-gray-400">
                {event.description}
              </p>
            </div>
          </div>

          {/* Action Row containing schedule values and capacity metadata */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-gray-50/70 pt-4 text-xs font-bold text-gray-400 select-none">
            <div className="flex min-w-0 items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-[#4F46E5]" />
              <span className="truncate">
                {event.date} at {event.time}
              </span>
            </div>
            <CategoryBadge
              label="Max Capacity: 100"
              variant="gray"
              className="shrink-0"
            />
          </div>
        </Card>
      );
    }

    // ====================================================
    // TEMPLATE 3: Full Photo Card Style ('photo-bg')
    // ====================================================
    if (event.styleType === 'photo-bg') {
      return (
        <Card
          ref={ref}
          className={cn(
            'group relative flex h-full min-h-[360px] cursor-pointer flex-col overflow-hidden rounded-[24px] border border-white/60 p-0 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl',
            className
          )}
          {...props}
        >
          {/* Full bleed image background */}
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-750 select-none group-hover:scale-102"
          />
          {/* Strong gradient wash overlay to maximize text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/55 to-black/85" />

          {/* Content container aligned absolute on top of background visual */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 text-left text-white select-none">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CategoryBadge
                label={event.categoryBadge}
                variant="indigo"
                className="shrink-0 border-white/25 bg-white/20 text-white backdrop-blur-md"
              />
              <span className="max-w-[150px] shrink-0 truncate rounded bg-black/10 px-1.5 py-0.5 text-[10px] font-extrabold tracking-wide text-white/80">
                {event.date}
              </span>
            </div>

            <div>
              <span className="block text-[9px] font-black tracking-wider text-[#10B981] uppercase">
                Host: {event.host}
              </span>
              <h3 className="font-display mt-1 text-lg leading-tight font-bold text-white">
                {event.title}
              </h3>
              <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-white/70">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#10B981]" />
                <span className="line-clamp-1">{event.location}</span>
              </div>

              {/* Dynamic Call to Action buttons depending on tickets status */}
              <div className="mt-5 border-t border-white/10 pt-3.5 select-none">
                {event.requiresTickets ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleTickets}
                      className="flex-grow cursor-pointer rounded-full border-0 bg-[#4F46E5] py-2 text-xs font-black text-white shadow-md transition-all duration-300 outline-none hover:bg-[#4338CA]"
                    >
                      Buy Tickets
                    </button>
                    <button
                      onClick={handleRemind}
                      className="flex-grow cursor-pointer rounded-full border border-0 border-white/25 bg-white/10 py-2 text-xs font-black text-white backdrop-blur-md transition-all duration-300 outline-none hover:bg-white/20"
                    >
                      Remind Me
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleRemind}
                    className="w-full cursor-pointer rounded-full border border-0 border-white/25 bg-white/10 py-2 text-xs font-black text-white backdrop-blur-md transition-all duration-300 outline-none hover:bg-white/20"
                  >
                    Remind Me
                  </button>
                )}
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return null;
  }
);

EventCard.displayName = 'EventCard';
