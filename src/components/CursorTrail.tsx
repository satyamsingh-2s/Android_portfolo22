"use client";

import { useEffect, useRef } from "react";

type TrailPoint = { x: number; y: number; time: number };

const LIFETIME = 750; // ms
const MIN_GAP = 3; // px
const CORE_WIDTH = 2.4;
const TAIL_WIDTH = 0.3;

/** blue → cyan → purple → pink → orange (oldest → newest) */
const STOPS: Array<[number, number, number]> = [
  [96, 140, 255],
  [56, 205, 230],
  [150, 110, 245],
  [236, 108, 178],
  [255, 138, 76],
];

function colorAt(t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  const scaled = clamped * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(scaled));
  const f = scaled - i;
  const a = STOPS[i]!;
  const b = STOPS[i + 1]!;
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ] as const;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const insideRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return;

    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(section);

    const drawPass = (
      pts: Array<{ x: number; y: number; life: number }>,
      widthScale: number,
      alphaScale: number,
      blur: number,
    ) => {
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1]!;
        const cur = pts[i]!;
        const t = i / (pts.length - 1);
        const [r, g, b] = colorAt(t);
        const alpha = cur.life * alphaScale;
        if (alpha <= 0.01) continue;

        const w = (TAIL_WIDTH + (CORE_WIDTH - TAIL_WIDTH) * t) * widthScale;
        const mid = { x: (prev.x + cur.x) / 2, y: (prev.y + cur.y) / 2 };
        const prevMid =
          i > 1
            ? { x: (pts[i - 2]!.x + prev.x) / 2, y: (pts[i - 2]!.y + prev.y) / 2 }
            : { x: prev.x, y: prev.y };

        ctx.beginPath();
        ctx.moveTo(prevMid.x, prevMid.y);
        ctx.quadraticCurveTo(prev.x, prev.y, mid.x, mid.y);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = w;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowBlur = blur;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.85})`;
        ctx.stroke();
      }
    };

    const frame = () => {
      const now = performance.now();
      const alive = pointsRef.current.filter((p) => now - p.time < LIFETIME);
      pointsRef.current = alive;

      ctx.clearRect(0, 0, width, height);

      if (alive.length > 1) {
        const pts = alive.map((p) => ({
          x: p.x,
          y: p.y,
          life: 1 - (now - p.time) / LIFETIME,
        }));

        ctx.globalCompositeOperation = "lighter";
        drawPass(pts, 6, 0.1, 16); // outer glow
        drawPass(pts, 2.4, 0.22, 10); // inner glow
        drawPass(pts, 1, 0.95, 4); // core
        ctx.globalCompositeOperation = "source-over";
        ctx.shadowBlur = 0;
      }

      if (alive.length > 0 || insideRef.current) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        rafRef.current = null;
      }
    };

    const start = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(frame);
    };

    const onEnter = () => {
      insideRef.current = true;
      start();
    };

    const onMove = (e: PointerEvent) => {
      insideRef.current = true;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const last = pointsRef.current[pointsRef.current.length - 1];
      if (last && Math.hypot(x - last.x, y - last.y) < MIN_GAP) return;
      pointsRef.current.push({ x, y, time: performance.now() });
      if (pointsRef.current.length > 240) pointsRef.current.shift();
      start();
    };

    const onLeave = () => {
      insideRef.current = false;
    };

    section.addEventListener("pointerenter", onEnter);
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    return () => {
      section.removeEventListener("pointerenter", onEnter);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      pointsRef.current = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
