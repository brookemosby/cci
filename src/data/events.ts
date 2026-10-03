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
  {
    id: "ai-cx-fireside-sd-oct-2026",
    title: "AI and CX Fireside Chat",
    date: "October 26, 2026 · 10:30am – 1:00pm",
    dateSort: "2026-10-26",
    location: "Hilton San Diego Bayfront",
    description:
      "Join CCI in San Diego for a fireside chat on AI and customer experience. Reserve your spot through RSVPify.",
    rsvpUrl: "https://ccisandiego.rsvpify.com/",
  },
];

export const previousEvents: EventItem[] = [];
