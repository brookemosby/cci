"use client";

import { useEffect, useRef, useState } from "react";

export function FormSubmitButton({
  idleLabel,
  pendingLabel,
  className = "",
  pendingMessage = "Sending your message...",
  timeoutMs = 15000,
}: {
  idleLabel: string;
  pendingLabel: string;
  className?: string;
  pendingMessage?: string;
  timeoutMs?: number;
}) {
  const [pending, setPending] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const form = button?.form;
    if (!form) {
      return;
    }

    const handleSubmit = () => {
      setTimedOut(false);
      setPending(true);
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, []);

  useEffect(() => {
    if (!pending) {
      return;
    }
    const id = window.setTimeout(() => {
      setPending(false);
      setTimedOut(true);
    }, timeoutMs);
    return () => window.clearTimeout(id);
  }, [pending, timeoutMs]);

  return (
    <>
      <button
        ref={buttonRef}
        type="submit"
        className={className}
        aria-busy={pending}
      >
        {pending ? pendingLabel : idleLabel}
      </button>
      {pending ? <p className="full pending-note">{pendingMessage}</p> : null}
      {timedOut ? (
        <p className="full error-note-soft">
          Still waiting on email service. Please try submit again.
        </p>
      ) : null}
    </>
  );
}
