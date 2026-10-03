"use client";

import {
  FollowCalendarButton,
  FOLLOW_CALENDAR_PILL_CLASS,
  getAddEventCalendarId,
} from "@/components/follow-calendar-button";

export function EventsCalendarCta() {
  const calendarId = getAddEventCalendarId();
  if (!calendarId) {
    return null;
  }

  return (
    <div className="events-calendar-cta reveal reveal-delay-1">
      <p className="events-calendar-cta-label">Subscribe for new dates as they are announced</p>
      <FollowCalendarButton
        calendarId={calendarId}
        className={`${FOLLOW_CALENDAR_PILL_CLASS} events-calendar-cta-btn`}
      />
    </div>
  );
}
