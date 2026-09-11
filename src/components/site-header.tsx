"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type NavKey = "home" | "cci-way" | "solutions" | "partners" | "events" | "contact";

export function SiteHeader({
  active,
  light = false,
}: {
  active: NavKey;
  light?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(top / max, 1) : 0;
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navClass = `${open ? "is-open" : ""}`;
  const headerClass = `top-nav ${light ? "top-nav-light" : ""}`;

  return (
    <header className={headerClass}>
      <Link href="/" className="brand-link brand-lockup" aria-label="CCI home">
        <Image
          src="/assets/cci-logo-mark.png"
          alt="CCI logo mark"
          width={112}
          height={74}
          className="brand-mark"
          priority
        />
        <span className="brand-copy">
          <span className="brand-name">Carrier Consulting International</span>
          <span className="brand-tag">Moving Business Forward</span>
        </span>
      </Link>

      <button
        type="button"
        className={`menu-toggle ${open ? "is-open" : ""}`}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={navClass} aria-label="Main navigation">
        <Link
          href="/"
          className={active === "home" ? "active-link" : ""}
          onClick={() => setOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/cci-way"
          className={active === "cci-way" ? "active-link" : ""}
          onClick={() => setOpen(false)}
        >
          CCI Way
        </Link>
        <Link
          href="/solutions"
          className={active === "solutions" ? "active-link" : ""}
          onClick={() => setOpen(false)}
        >
          Solutions
        </Link>
        <Link
          href="/partners"
          className={active === "partners" ? "active-link" : ""}
          onClick={() => setOpen(false)}
        >
          Our Partners
        </Link>
        <Link
          href="/events"
          className={active === "events" ? "active-link" : ""}
          onClick={() => setOpen(false)}
        >
          Events
        </Link>
        <Link
          href="/contact"
          className={active === "contact" ? "active-link" : ""}
          onClick={() => setOpen(false)}
        >
          Contact
        </Link>
      </nav>
      <span className="scroll-progress-track" aria-hidden>
        <span
          className="scroll-progress-fill"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </span>
    </header>
  );
}
