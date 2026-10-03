"use client";

import Script from "next/script";
import { useEffect, useId, useState } from "react";

const ADDEVENT_SCRIPT = "https://cdn.addevent.com/libs/stc/1.0.2/stc.min.js";

export const FOLLOW_CALENDAR_BUTTON_CLASS = "addeventstc follow-calendar-addevent";
export const FOLLOW_CALENDAR_PILL_CLASS = "addeventstc pill-btn follow-calendar-addevent";

type AddEventWindow = Window & {
  addeventstc?: { refresh?: () => void };
};

function refreshAddEventWidgets(): void {
  (window as AddEventWindow).addeventstc?.refresh?.();
}

type FollowCalendarButtonProps = {
  /** AddEvent subscription calendar ID (from dashboard → calendar → Follow Calendar embed) */
  calendarId: string;
  label?: string;
  className?: string;
};

export function FollowCalendarButton({
  calendarId,
  label = "Follow our calendar",
  className = FOLLOW_CALENDAR_BUTTON_CLASS,
}: FollowCalendarButtonProps) {
  const [scriptReady, setScriptReady] = useState(false);
  const mountId = useId().replaceAll(":", "");

  useEffect(() => {
    if (!scriptReady || !calendarId) return;
    refreshAddEventWidgets();
  }, [scriptReady, calendarId, mountId]);

  if (!calendarId) {
    return null;
  }

  return (
    <>
      <Script
        src={ADDEVENT_SCRIPT}
        strategy="lazyOnload"
        onLoad={() => setScriptReady(true)}
      />
      <div
        key={mountId}
        title="Add to Calendar"
        className={className}
        data-id={calendarId}
        data-styling="none"
      >
        {label}
      </div>
    </>
  );
}

export function getAddEventCalendarId(): string {
  return process.env.NEXT_PUBLIC_ADDEVENT_CALENDAR_ID?.trim() ?? "";
}
