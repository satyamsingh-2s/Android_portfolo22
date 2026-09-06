"use client";

import { motion } from "motion/react";
import { designUXContent } from "@/lib/data";
import { useIsMobile } from "@/hooks/use-mobile";

const INK = "#1A1A1A";
const MUTED = "#6B675F";

const ease = [0.16, 1, 0.3, 1] as const;

function step(i: number) {
  return { duration: 0.5, delay: 0.1 + i * 0.08, ease };
}

/* ---------------- Case 01 — layers separating around a stable centre ---------------- */

export function LayersDiagram() {
  const study = designUXContent.caseStudies[0]!;
  const layers = study.layers!;
  const center = study.center!;
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="relative mx-auto w-full max-w-full select-none py-4">
        <div className="flex flex-col items-stretch gap-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={step(0)}
            className="w-full border-2 px-4 py-3 text-center"
            style={{ background: layers[0]!.color, borderColor: INK, color: INK }}
          >
            <span className="font-mono-label text-[11px] font-semibold">
              {layers[0]!.label}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={step(1)}
            className="w-full border-2 px-4 py-3 text-center"
            style={{ background: layers[1]!.color, borderColor: INK, color: "#FFF8F0" }}
          >
            <span className="font-mono-label text-[11px] font-semibold leading-tight">
              {layers[1]!.label}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={step(3)}
            className="relative z-10 w-full"
          >
            <div className="relative border-2 px-4 py-5 text-center"
              style={{ background: center.color, borderColor: INK, color: "#FFF8F0" }}
            >
              <div className="font-display text-xl font-semibold tracking-tight">
                {center.label}
              </div>
              <div className="font-mono-label mt-1 text-[10px] opacity-90">
                {center.sub}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={step(2)}
            className="w-full border-2 px-4 py-3 text-center"
            style={{ background: layers[2]!.color, borderColor: INK, color: "#FFF8F0" }}
          >
            <span className="font-mono-label text-[11px] font-semibold leading-tight">
              {layers[2]!.label}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={step(4)}
            className="w-full border-2 px-4 py-3 text-center"
            style={{ background: layers[3]!.color, borderColor: INK, color: INK }}
          >
            <span className="font-mono-label text-[11px] font-semibold">
              {layers[3]!.label}
            </span>
          </motion.div>
        </div>
        <div className="font-mono-label mt-6 text-center text-[9px]" style={{ color: MUTED }}>
          Range supports identity — it does not compete with it
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[420px] select-none py-4">
      {/* top layer */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={step(0)}
        className="mx-auto w-[62%] -rotate-1 border-2 px-4 py-2 text-center"
        style={{ background: layers[0]!.color, borderColor: INK, color: INK }}
      >
        <span className="font-mono-label text-[10px] font-semibold">{layers[0]!.label}</span>
      </motion.div>

      <div className="relative mt-3 flex items-center justify-center gap-2">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={step(1)}
          className="absolute left-0 top-1/2 w-[26%] -translate-y-1/2 -rotate-6 border-2 px-2 py-2 text-center"
          style={{ background: layers[1]!.color, borderColor: INK, color: "#FFF8F0" }}
        >
          <span className="font-mono-label text-[9px] font-semibold leading-tight">
            {layers[1]!.label}
          </span>
        </motion.div>

        {/* stable centre with hard offset layer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={step(3)}
          className="relative z-10 w-[52%]"
        >
          <div
            className="absolute inset-0 translate-x-2 translate-y-2 border-2"
            style={{ background: study.palette[2]!, borderColor: INK }}
            aria-hidden
          />
          <div
            className="relative border-2 px-4 py-6 text-center"
            style={{ background: center.color, borderColor: INK, color: "#FFF8F0" }}
          >
            <div className="font-display text-xl font-semibold tracking-tight">{center.label}</div>
            <div className="font-mono-label mt-1 text-[9px] opacity-90">{center.sub}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={step(2)}
          className="absolute right-0 top-1/2 w-[26%] -translate-y-1/2 rotate-6 border-2 px-2 py-2 text-center"
          style={{ background: layers[2]!.color, borderColor: INK, color: "#FFF8F0" }}
        >
          <span className="font-mono-label text-[9px] font-semibold leading-tight">
            {layers[2]!.label}
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={step(4)}
        className="mx-auto mt-3 w-[58%] rotate-1 border-2 px-4 py-2 text-center"
        style={{ background: layers[3]!.color, borderColor: INK, color: INK }}
      >
        <span className="font-mono-label text-[10px] font-semibold">{layers[3]!.label}</span>
      </motion.div>

      <div className="font-mono-label mt-6 text-center text-[9px]" style={{ color: MUTED }}>
        Range supports identity — it does not compete with it
      </div>
    </div>
  );
}

/* ---------------- Case 02 — hierarchy unfolding with persistent context ---------------- */

function Node({
  label,
  color,
  solid,
  delay,
}: {
  label: string;
  color: string;
  solid?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease }}
      className="flex items-center gap-1.5 whitespace-nowrap border-2 px-2.5 py-1"
      style={{
        borderColor: solid ? INK : color,
        background: solid ? color : "transparent",
        color: solid ? "#FFF8F0" : INK,
      }}
    >
      <span
        className="inline-block h-2 w-2 rounded-full border-2"
        style={{ borderColor: solid ? "#FFF8F0" : color }}
        aria-hidden
      />
      <span className="font-mono-label text-[9px] font-semibold">{label}</span>
    </motion.div>
  );
}

export function TreeDiagram() {
  const tree = designUXContent.caseStudies[1]!.tree!;
  const isMobile = useIsMobile();

  return (
    <div className="relative mx-auto w-full max-w-[440px] select-none py-4">
      <div className="flex justify-center">
        <Node label={tree.root.label} color={tree.root.color} solid delay={0.1} />
      </div>

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.35, delay: 0.2, ease }}
        className="mx-auto h-5 w-px origin-top"
        style={{ background: INK }}
        aria-hidden
      />
      {!isMobile && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.28, ease }}
          className="mx-auto h-px w-[70%]"
          style={{ background: INK }}
          aria-hidden
        />
      )}

      <div className={`mt-0 grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
        {tree.branches.map((branch, i) => (
          <div key={branch.label} className="flex flex-col items-center">
            <div
              className={isMobile ? "h-4 w-px mt-2" : "h-5 w-px"}
              style={{ background: INK, opacity: branch.active ? 1 : 0.35 }}
              aria-hidden
            />
            <Node
              label={branch.label}
              color={branch.color}
              solid={branch.active}
              delay={0.36 + i * 0.08}
            />
            <div
              className="h-4 w-px"
              style={{ background: INK, opacity: branch.active ? 1 : 0.35 }}
              aria-hidden
            />
            <div className={`flex ${isMobile ? "gap-2" : "gap-3"}`}>
              {branch.children.map((child, j) => (
                <Node
                  key={j}
                  label={child}
                  color={branch.color}
                  solid={branch.active && j === 0}
                  delay={0.5 + i * 0.08 + j * 0.06}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* persistent context */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.72, ease }}
        className="mt-7 flex items-center justify-center gap-1"
      >
        {tree.breadcrumb.map((crumb, i) => (
          <span key={crumb + i} className="flex items-center gap-1">
            <span
              className="border-2 px-2 py-1"
              style={{
                borderColor: INK,
                background: i === tree.breadcrumb.length - 1 ? "#7048E8" : "transparent",
                color: i === tree.breadcrumb.length - 1 ? "#FFF8F0" : INK,
              }}
            >
              <span className="font-mono-label text-[9px] font-semibold">{crumb}</span>
            </span>
            {i < tree.breadcrumb.length - 1 && (
              <span className="font-mono-label text-[10px]" style={{ color: MUTED }}>
                ›
              </span>
            )}
          </span>
        ))}
      </motion.div>
      <div className="font-mono-label mt-3 text-center text-[9px]" style={{ color: MUTED }}>
        Parent context stays visible at every depth
      </div>
    </div>
  );
}

/* ---------------- Case 03 — one mark, three zones ---------------- */

export function MarkDiagram() {
  const zones = designUXContent.caseStudies[2]!.zones!;
  const isMobile = useIsMobile();

  return (
    <div className="relative mx-auto w-full max-w-[420px] select-none py-4">
      <div
        className={`flex items-end justify-center ${isMobile ? "flex-col gap-5" : "gap-8"}`}
      >
        {zones.map((zone, i) => (
          <motion.div
            key={zone.code}
            initial={{ opacity: 0, y: -18, rotate: isMobile ? 0 : i === 1 ? 0 : i === 0 ? -12 : 12 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={step(i)}
            className="flex flex-col items-center gap-2"
          >
            <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden>
              {zone.shape === "half-left" && (
                <path d="M26 2 A24 24 0 0 0 26 50 Z" fill={zone.color} stroke={INK} strokeWidth="2" />
              )}
              {zone.shape === "pie" && (
                <>
                  <circle cx="26" cy="26" r="24" fill={zone.color} stroke={INK} strokeWidth="2" />
                  <path d="M26 26 L26 2 A24 24 0 0 1 50 26 Z" fill="#F5F2EC" stroke={INK} strokeWidth="2" />
                </>
              )}
              {zone.shape === "ring" && (
                <>
                  <circle cx="26" cy="26" r="24" fill={zone.color} stroke={INK} strokeWidth="2" />
                  <circle cx="26" cy="26" r="11" fill="#F5F2EC" stroke={INK} strokeWidth="2" />
                </>
              )}
            </svg>
            <div className="text-center">
              <div className="font-mono-label text-[9px]" style={{ color: MUTED }}>
                {zone.code}
              </div>
              <div className="font-mono-label text-[10px] font-semibold" style={{ color: INK }}>
                {zone.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* converging construction lines */}
      <div className="relative mx-auto mt-4 h-10 w-[70%]">
        <svg viewBox="0 0 200 40" className="h-full w-full" aria-hidden>
          <motion.path
            d="M14 0 L100 36 M100 0 L100 36 M186 0 L100 36"
            stroke={INK}
            strokeWidth="1"
            strokeDasharray="3 4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.55, ease }}
        className="mx-auto flex w-fit flex-col items-center"
      >
        <div className="relative">
          <div
            className="absolute inset-0 translate-x-1.5 translate-y-1.5 border-2"
            style={{ background: "#E64980", borderColor: INK }}
            aria-hidden
          />
          <div
            className="relative flex h-20 w-20 items-center justify-center border-2"
            style={{ background: INK, borderColor: INK, color: "#FFF8F0" }}
          >
            <span className="font-display text-3xl leading-none">Ω</span>
          </div>
        </div>
        <div className="font-mono-label mt-3 text-[10px] font-semibold" style={{ color: INK }}>
          One Mark
        </div>
      </motion.div>

      <div className="font-mono-label mt-4 text-center text-[9px]" style={{ color: MUTED }}>
        R: 24 · ARC: 180° · three components → one system
      </div>
    </div>
  );
}

export const diagrams = {
  identity: LayersDiagram,
  nested: TreeDiagram,
  mark: MarkDiagram,
} as const;
