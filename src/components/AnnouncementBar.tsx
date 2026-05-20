"use client";

import { useEffect, useState } from "react";
import { ANNOUNCEMENTS } from "@/data/site";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  const next = () => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length);

  return (
    <div
      className="bg-slate-announce text-ivory py-2.5 px-4 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.22em] font-medium"
      role="region"
      aria-label="Announcements"
    >
      <button
        type="button"
        onClick={prev}
        className="p-1 hover:text-gold transition-colors shrink-0"
        aria-label="Previous announcement"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <p className="text-center min-h-[1rem] flex-1 max-w-xl">{ANNOUNCEMENTS[index]}</p>
      <button
        type="button"
        onClick={next}
        className="p-1 hover:text-gold transition-colors shrink-0"
        aria-label="Next announcement"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
