"use client";

import {
  FollowCalendarCta,
  FOLLOW_CALENDAR_PILL_CLASS,
  getAddEventCalendarId,
} from "@/components/follow-calendar-button";

export function EventsCalendarCta() {
  const isPreview = !getAddEventCalendarId();

  return (
    <div className="events-calendar-cta reveal reveal-delay-1">
      {isPreview ? <span className="calendar-promo-preview-badge">Preview</span> : null}
      <p className="events-calendar-cta-label">Subscribe for new dates as they are announced</p>
      <FollowCalendarCta
        className={`${FOLLOW_CALENDAR_PILL_CLASS} events-calendar-cta-btn`}
        showPreviewNote={isPreview}
      />
    </div>
  );
}
