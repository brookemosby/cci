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
    id: "event-1",
    title: "Upcoming Event 1",
    date: "TBD",
    dateSort: "2099-12-31",
    location: "TBD",
    description: "Replace with event details and paste the RSVPify URL below.",
    rsvpUrl: "https://rsvpify.com/",
  },
  {
    id: "event-2",
    title: "Upcoming Event 2",
    date: "TBD",
    dateSort: "2099-12-30",
    location: "TBD",
    description: "Replace with event details and paste the RSVPify URL below.",
    rsvpUrl: "https://rsvpify.com/",
  },
  {
    id: "event-3",
    title: "Upcoming Event 3",
    date: "TBD",
    dateSort: "2099-12-29",
    location: "TBD",
    description: "Replace with event details and paste the RSVPify URL below.",
    rsvpUrl: "https://rsvpify.com/",
  },
];

export const previousEvents: EventItem[] = [
  {
    id: "past-event-1",
    title: "Previous Event Example",
    date: "June 2026",
    dateSort: "2026-06-01",
    location: "Virtual",
    description: "Move completed events here so visitors can see past programming.",
    rsvpUrl: "",
  },
];
