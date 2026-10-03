"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FollowCalendarButton,
  FOLLOW_CALENDAR_PILL_CLASS,
  getAddEventCalendarId,
} from "@/components/follow-calendar-button";

const DISMISS_KEY = "cci-calendar-promo-dismissed";
const PROMO_SHOW_DELAY_MS = 1200;

export function CalendarFollowPromo() {
  const calendarId = getAddEventCalendarId();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!calendarId) return;
    if (sessionStorage.getItem(DISMISS_KEY) === "1") return;

    const timer = window.setTimeout(() => setVisible(true), PROMO_SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [calendarId]);

  function dismiss(): void {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  if (!calendarId || !visible) {
    return null;
  }

  return (
    <div className="calendar-promo-backdrop" role="presentation" onClick={dismiss}>
      <div
        className="calendar-promo-dialog"
        role="dialog"
        aria-labelledby="calendar-promo-title"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="calendar-promo-close" aria-label="Dismiss" onClick={dismiss}>
          ×
        </button>
        <p className="eyebrow eyebrow-dark">Stay in the loop</p>
        <h2 id="calendar-promo-title">Never miss a CCI event</h2>
        <p>
          Subscribe to our event calendar and get upcoming sessions, fireside chats, and seminars
          on your personal calendar automatically.
        </p>
        <div className="calendar-promo-actions">
          <FollowCalendarButton calendarId={calendarId} className={FOLLOW_CALENDAR_PILL_CLASS} />
          <Link href="/events" className="calendar-promo-secondary" onClick={dismiss}>
            View all events
          </Link>
        </div>
      </div>
    </div>
  );
}
