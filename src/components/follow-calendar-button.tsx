"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

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

const PREVIEW_CALENDAR_OPTIONS = [
  "Apple Calendar",
  "Google Calendar",
  "Outlook",
  "Outlook.com",
  "Yahoo Calendar",
] as const;

type FollowCalendarCtaProps = {
  label?: string;
  className?: string;
  /** When true, show a small note that AddEvent is not connected yet */
  showPreviewNote?: boolean;
  /** Opens the mock calendar picker (preview mode only) */
  initialMenuOpen?: boolean;
};

export function FollowCalendarCta({
  label = "Follow our calendar",
  className = FOLLOW_CALENDAR_BUTTON_CLASS,
  showPreviewNote = false,
  initialMenuOpen = false,
}: FollowCalendarCtaProps) {
  const calendarId = getAddEventCalendarId();

  if (calendarId) {
    return <FollowCalendarButton calendarId={calendarId} label={label} className={className} />;
  }

  return (
    <FollowCalendarPreview
      label={label}
      className={className}
      showPreviewNote={showPreviewNote}
      initialMenuOpen={initialMenuOpen}
    />
  );
}

function FollowCalendarPreview({
  label,
  className,
  showPreviewNote,
  initialMenuOpen,
}: {
  label: string;
  className: string;
  showPreviewNote: boolean;
  initialMenuOpen: boolean;
}) {
  const [open, setOpen] = useState(initialMenuOpen);
  const rootRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={rootRef} className="follow-calendar-preview-wrap">
      <button
        type="button"
        className={className}
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
      {showPreviewNote ? (
        <p className="follow-calendar-preview-note">
          Preview only — connect AddEvent in Vercel to enable live subscriptions.
        </p>
      ) : null}
    </div>
  );
}
