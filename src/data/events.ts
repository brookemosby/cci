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
    id: "cciint-rsvpify",
    title: "CCI Event",
    date: "See registration page for schedule",
    dateSort: "2099-12-31",
    description:
      "Join Carrier Consulting International for our upcoming event. Reserve your spot through RSVPify.",
    rsvpUrl: "https://cciint.rsvpify.com/",
  },
];

export const previousEvents: EventItem[] = [];
