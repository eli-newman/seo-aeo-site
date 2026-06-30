"use client";

import { useState } from "react";

/** A copyable terminal-style code block. Lines are shown verbatim. */
export function CopyBlock({
  lines,
  label,
  className = "",
}: {
  lines: string[];
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-border bg-panel ${className}`}
    >
      {label && (
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-2 font-mono text-xs text-fg-faint">{label}</span>
        </div>
      )}
      <button
        onClick={copy}
        aria-label="Copy to clipboard"
        className="absolute right-2.5 top-2.5 z-10 rounded-md border border-border bg-bg-subtle px-2 py-1 font-mono text-[11px] text-fg-muted opacity-0 transition hover:border-border-strong hover:text-fg group-hover:opacity-100"
        style={label ? { top: "0.75rem" } : undefined}
      >
        {copied ? "copied ✓" : "copy"}
      </button>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-6">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre">
            <span className="select-none text-accent/70">$ </span>
            <span className="text-fg">{l}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}
