"use client";

import { FollowCalendarCta, FOLLOW_CALENDAR_PILL_CLASS } from "@/components/follow-calendar-button";

export function EventsCalendarCta() {
  return (
    <div className="events-calendar-cta reveal reveal-delay-1">
      <p className="events-calendar-cta-label">Subscribe for new dates as they are announced</p>
      <FollowCalendarCta
        hostClassName={`${FOLLOW_CALENDAR_PILL_CLASS} events-calendar-cta-host`}
      />
    </div>
  );
}
