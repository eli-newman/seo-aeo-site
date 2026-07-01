"use client";

import { useEffect, useRef } from "react";

const ENGINES = ["ChatGPT", "Perplexity", "Gemini", "Google AI"];

type Pt = { x: number; y: number };

/**
 * Animated "citation constellation": a knowledge graph of your pages, with
 * citation pulses firing from a central node out to AI answer engines.
 * Pure canvas; respects prefers-reduced-motion; decorative (aria-hidden).
 */
export function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Node layout in fractional coords (recomputed to px on resize).
    // Engines sit on the right; the hub is center-right; "pages" scatter around.
    const engineF: Pt[] = [
      { x: 0.9, y: 0.18 },
      { x: 0.97, y: 0.5 },
      { x: 0.88, y: 0.82 },
      { x: 0.7, y: 0.12 },
    ];
    const hubF: Pt = { x: 0.52, y: 0.52 };
    const pageF: Pt[] = [
      { x: 0.3, y: 0.3 }, { x: 0.4, y: 0.7 }, { x: 0.62, y: 0.3 },
      { x: 0.66, y: 0.72 }, { x: 0.46, y: 0.4 }, { x: 0.58, y: 0.62 },
      { x: 0.36, y: 0.52 }, { x: 0.74, y: 0.5 }, { x: 0.5, y: 0.24 },
      { x: 0.48, y: 0.8 }, { x: 0.26, y: 0.6 }, { x: 0.8, y: 0.32 },
    ];

    let engines: Pt[] = [];
    let hub: Pt = { x: 0, y: 0 };
    let pages: Pt[] = [];
    const phases = pageF.map((_, i) => i * 1.7);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    function layout() {
      const f = (p: Pt): Pt => ({ x: p.x * w, y: p.y * h });
      engines = engineF.map(f);
      hub = f(hubF);
      pages = pageF.map(f);
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
    }

    type Pulse = { e: number; t: number; speed: number };
    let pulses: Pulse[] = [];
    const flash = engines.map(() => 0);
    let lastSpawn = 0;

    function spawn(now: number) {
      pulses.push({ e: Math.floor(rand(now) * ENGINES.length), t: 0, speed: 0.6 + rand(now + 1) * 0.5 });
      lastSpawn = now;
    }
    // Deterministic-ish pseudo-random from time (avoids Math.random ban).
    function rand(seed: number) {
      const x = Math.sin(seed * 999.13) * 43758.5453;
      return x - Math.floor(x);
    }

    function lerp(a: Pt, b: Pt, t: number): Pt {
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }

    function draw(now: number) {
      const t = now / 1000;
      ctx!.clearRect(0, 0, w, h);

      // Parallax ease.
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const ox = mouse.x * 14;
      const oy = mouse.y * 14;

      const bob = (i: number) => (reduce ? 0 : Math.sin(t * 0.8 + phases[i]!) * 4);
      const P = pages.map((p, i) => ({ x: p.x + ox, y: p.y + oy + bob(i) }));
      const H = { x: hub.x + ox * 1.3, y: hub.y + oy * 1.3 };
      const E = engines.map((p) => ({ x: p.x + ox * 0.5, y: p.y + oy * 0.5 }));

      // Edges between nearby pages.
      ctx!.lineWidth = 1;
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const d = Math.hypot(P[i]!.x - P[j]!.x, P[i]!.y - P[j]!.y);
          if (d < w * 0.16) {
            ctx!.strokeStyle = `rgba(255,255,255,${0.06 * (1 - d / (w * 0.16))})`;
            line(ctx!, P[i]!, P[j]!);
          }
        }
      }
      // Hub → engines (the citation channels).
      for (const e of E) {
        ctx!.strokeStyle = "rgba(52,211,153,0.10)";
        line(ctx!, H, e);
      }
      // Hub → nearby pages.
      for (const p of P) {
        const d = Math.hypot(H.x - p.x, H.y - p.y);
        if (d < w * 0.22) {
          ctx!.strokeStyle = `rgba(34,211,238,${0.10 * (1 - d / (w * 0.22))})`;
          line(ctx!, H, p);
        }
      }

      // Page nodes.
      for (const p of P) dot(ctx!, p, 2.2, "rgba(232,234,240,0.55)");

      // Pulses.
      if (!reduce) {
        if (now - lastSpawn > 1700) spawn(now);
        pulses = pulses.filter((pl) => pl.t < 1.05);
        for (const pl of pulses) {
          pl.t += (pl.speed * 16) / 1000;
          const pos = lerp(H, E[pl.e]!, Math.min(pl.t, 1));
          // trail
          for (let k = 1; k <= 6; k++) {
            const tp = lerp(H, E[pl.e]!, Math.max(0, Math.min(pl.t, 1) - k * 0.03));
            dot(ctx!, tp, 2.4 - k * 0.3, `rgba(52,211,153,${0.22 - k * 0.03})`);
          }
          glowDot(ctx!, pos, 3.2, "#34d399");
          if (pl.t >= 1) flash[pl.e] = 1;
        }
      }

      // Engine nodes + labels.
      E.forEach((e, i) => {
        flash[i] = Math.max(0, (flash[i] ?? 0) - 0.02);
        const fl = flash[i] ?? 0;
        glowDot(ctx!, e, 4 + fl * 5, fl > 0.05 ? "#34d399" : "#22d3ee");
        ctx!.fillStyle = `rgba(154,163,180,${0.8})`;
        ctx!.font = "600 12px var(--font-geist-sans), sans-serif";
        ctx!.textAlign = e.x > w * 0.85 ? "right" : "left";
        const lx = e.x > w * 0.85 ? e.x - 10 : e.x + 10;
        ctx!.fillText(ENGINES[i]!, lx, e.y + 4);
      });

      // Hub node (your site) — brightest.
      glowDot(ctx!, H, 6, "#22d3ee");
      ctx!.fillStyle = "rgba(232,234,240,0.95)";
      ctx!.font = "600 12px var(--font-geist-sans), sans-serif";
      ctx!.textAlign = "center";
      ctx!.fillText("yoursite.com", H.x, H.y - 14);

      if (!reduce) raf = requestAnimationFrame(draw);
    }

    function line(c: CanvasRenderingContext2D, a: Pt, b: Pt) {
      c.beginPath();
      c.moveTo(a.x, a.y);
      c.lineTo(b.x, b.y);
      c.stroke();
    }
    function dot(c: CanvasRenderingContext2D, p: Pt, r: number, fill: string) {
      c.beginPath();
      c.arc(p.x, p.y, r, 0, Math.PI * 2);
      c.fillStyle = fill;
      c.fill();
    }
    function glowDot(c: CanvasRenderingContext2D, p: Pt, r: number, color: string) {
      const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
      g.addColorStop(0, color);
      g.addColorStop(0.2, color);
      g.addColorStop(1, "transparent");
      c.fillStyle = g;
      c.beginPath();
      c.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
      c.fill();
      dot(c, p, r, color);
    }

    function onMove(ev: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.tx = (ev.clientX - rect.left) / rect.width - 0.5;
      mouse.ty = (ev.clientY - rect.top) / rect.height - 0.5;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(draw);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
