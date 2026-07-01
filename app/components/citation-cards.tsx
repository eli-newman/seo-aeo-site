"use client";

import { useEffect, useState } from "react";

const CARDS = [
  { icon: "✓", label: "Cited by ChatGPT", sub: "best crm for realtors", pos: "right-[3%] top-[12%]" },
  { icon: "●", label: "Ranking #1", sub: "client follow-up templates", pos: "right-[26%] top-[40%]" },
  { icon: "✓", label: "SEO 90 · AEO 100", sub: "article published", pos: "right-[8%] bottom-[16%]" },
  { icon: "✓", label: "Cited by Perplexity", sub: "how to get referrals", pos: "right-[34%] bottom-[4%]" },
];

/** Floating citation/status cards that pulse in rotation — the "it's alive" cue. */
export function CitationCards() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % CARDS.length), 1900);
    return () => clearInterval(id);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
      {CARDS.map((c, i) => (
        <div
          key={c.label}
          className={`floaty absolute ${c.pos} flex items-center gap-2.5 rounded-xl border bg-panel/70 px-3.5 py-2.5 backdrop-blur-md transition-all duration-700 ${
            active === i
              ? "border-accent/40 shadow-[0_0_24px_-4px_rgba(52,211,153,0.5)]"
              : "border-border"
          }`}
          style={{ animationDelay: `${i * 1.3}s` }}
        >
          <span
            className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${
              c.icon === "●" ? "text-accent-2" : "bg-accent-soft text-accent"
            }`}
          >
            {c.icon}
          </span>
          <div className="leading-tight">
            <div className="text-[13px] font-medium text-fg">{c.label}</div>
            <div className="font-mono text-[11px] text-fg-faint">{c.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
