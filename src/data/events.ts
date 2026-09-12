export type EventItem = {
  id: string;
  title: string;
  date: string;
  /** ISO date (YYYY-MM-DD) used for sorting */
  dateSort: string;
  location?: string;
  description: string;
  rsvpUrl: string;
};

/**
 * Update this file when events are added or completed.
 * - Add new upcoming events to `currentEvents`
 * - Move finished events to `previousEvents`
 * - Each event links to its RSVPify landing page via `rsvpUrl`
 */
export const currentEvents: EventItem[] = [
  {
    id: "fireside-cx-leaders-oct-2026",
    title: "Fireside Conversation with CX Leaders",
    date: "October 7, 2026 · 11:00am – 1:30pm",
    dateSort: "2026-10-07",
    location: "Hearth & Hill Sugarhouse",
    description:
      "Fireside conversation with CX leaders from across Utah. Reserve your spot through RSVPify.",
    rsvpUrl: "https://cciint.rsvpify.com/",
  },
];

export const previousEvents: EventItem[] = [];
