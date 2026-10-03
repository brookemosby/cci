"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

const ADDEVENT_SCRIPT = "https://cdn.addevent.com/libs/stc/1.0.2/stc.min.js";

/** Wrapper modifier — styles the AddEvent trigger as a CCI pill button */
export const FOLLOW_CALENDAR_PILL_CLASS = "follow-calendar-host--pill";

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
  hostClassName?: string;
};

export function FollowCalendarButton({
  calendarId,
  label = "Follow our calendar",
  hostClassName = "",
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

  const hostClass = ["follow-calendar-host", hostClassName].filter(Boolean).join(" ");

  return (
    <>
      <Script
        src={ADDEVENT_SCRIPT}
        strategy="lazyOnload"
        onLoad={() => setScriptReady(true)}
      />
      <div className={hostClass}>
        <div
          key={mountId}
          title="Add to Calendar"
          className="addeventstc"
          data-id={calendarId}
          data-styling="none"
          data-dropdown-y="down"
          data-dropdown-x="left"
        >
          {label}
        </div>
      </div>
    </>
  );
}

export function getAddEventCalendarId(): string {
  return process.env.NEXT_PUBLIC_ADDEVENT_CALENDAR_ID?.trim() ?? "";
}

const PREVIEW_CALENDAR_OPTIONS = [
  "Apple Calendar",
  "Google Calendar",
  "Outlook",
  "Outlook.com",
  "Yahoo Calendar",
] as const;

type FollowCalendarCtaProps = {
  label?: string;
  hostClassName?: string;
};

export function FollowCalendarCta({
  label = "Follow our calendar",
  hostClassName = "",
}: FollowCalendarCtaProps) {
  const calendarId = getAddEventCalendarId();

  if (calendarId) {
    return (
      <FollowCalendarButton calendarId={calendarId} label={label} hostClassName={hostClassName} />
    );
  }

  return <FollowCalendarPreview label={label} hostClassName={hostClassName} />;
}

function FollowCalendarPreview({
  label,
  hostClassName,
}: {
  label: string;
  hostClassName: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const hostClass = ["follow-calendar-host", hostClassName].filter(Boolean).join(" ");

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const triggerClass = hostClassName.includes(FOLLOW_CALENDAR_PILL_CLASS)
    ? "follow-calendar-preview-trigger follow-calendar-preview-trigger--pill"
    : "follow-calendar-preview-trigger";

  return (
    <div ref={rootRef} className={hostClass}>
      <button
        type="button"
        className={triggerClass}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((prev) => !prev)}
      >
        {label}
      </button>
      {open ? (
        <ul className="follow-calendar-preview-menu" role="listbox" aria-label="Choose a calendar">
          {PREVIEW_CALENDAR_OPTIONS.map((option) => (
            <li key={option}>
              <button type="button" className="follow-calendar-preview-option" disabled>
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
