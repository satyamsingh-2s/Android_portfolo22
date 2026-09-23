"use client";

import { motion } from "motion/react";
import { designUXContent } from "@/lib/data";
import { useIsMobile } from "@/hooks/use-mobile";

const INK = "var(--design-text)";
const MUTED = "var(--design-secondary)";
const SURFACE = "var(--design-surface)";
const LINE = "var(--design-border)";

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
            style={{ background: layers[1]!.color, borderColor: INK, color: "#ffffff" }}
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
              style={{ background: center.color, borderColor: INK, color: "#ffffff" }}
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
            style={{ background: layers[2]!.color, borderColor: INK, color: "#ffffff" }}
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
          style={{ background: layers[1]!.color, borderColor: INK, color: "#ffffff" }}
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
            style={{ background: center.color, borderColor: INK, color: "#ffffff" }}
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
          style={{ background: layers[2]!.color, borderColor: INK, color: "#ffffff" }}
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
        color: solid ? "#ffffff" : INK,
      }}
    >
      <span
        className="inline-block h-2 w-2 rounded-full border-2"
        style={{ borderColor: solid ? "#ffffff" : color }}
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
                color: i === tree.breadcrumb.length - 1 ? "#ffffff" : INK,
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
                  <path d="M26 26 L26 2 A24 24 0 0 1 50 26 Z" fill="var(--design-surface)" stroke={INK} strokeWidth="2" />
                </>
              )}
              {zone.shape === "ring" && (
                <>
                  <circle cx="26" cy="26" r="24" fill={zone.color} stroke={INK} strokeWidth="2" />
                  <circle cx="26" cy="26" r="11" fill="var(--design-surface)" stroke={INK} strokeWidth="2" />
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
            style={{ background: INK, borderColor: INK, color: "#ffffff" }}
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

function DiscoverabilityDiagram() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div
            className="font-mono-label text-[9px] font-semibold"
            style={{ color: "#F76707" }}
          >
            INTERACTION MODEL
          </div>

          <h4
            className="font-display mt-1 text-lg font-semibold tracking-tight"
            style={{ color: INK }}
          >
            Curiosity as an affordance
          </h4>
        </div>

        <div
          className="font-mono-label text-[9px] font-semibold"
          style={{ color: MUTED }}
        >
          DISCOVERABILITY / 04
        </div>
      </div>

      {/* Diagram */}
      <div
        className="relative border-2 p-4 sm:p-6"
        style={{
          borderColor: LINE,
          background: SURFACE,
        }}
      >
        <svg
          viewBox="0 0 760 430"
          className="h-auto w-full"
          role="img"
          aria-labelledby="discoverability-diagram-title discoverability-diagram-desc"
        >
          <title id="discoverability-diagram-title">
            Making hidden content discoverable
          </title>

          <desc id="discoverability-diagram-desc">
            A profile card partially covers a Currently Building card.
            An Android cat periodically peeks over the hidden card,
            creating curiosity that encourages the user to discover it.
          </desc>

          {/* ---------------------------------------------------------------- */}
          {/* Definitions                                                       */}
          {/* ---------------------------------------------------------------- */}

          <defs>
            <filter
              id="discoverability-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="160%"
            >
              <feDropShadow
                dx="5"
                dy="6"
                stdDeviation="0"
                floodOpacity="0.16"
              />
            </filter>

            <clipPath id="cat-clip">
              <rect
                x="0"
                y="0"
                width="760"
                height="430"
              />
            </clipPath>
          </defs>

          {/* ---------------------------------------------------------------- */}
          {/* Background grid                                                   */}
          {/* ---------------------------------------------------------------- */}

          <g opacity="0.35">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line
                key={`v-${i}`}
                x1={70 + i * 90}
                y1="25"
                x2={70 + i * 90}
                y2="405"
                stroke={LINE}
                strokeWidth="1"
                strokeDasharray="3 6"
              />
            ))}

            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`h-${i}`}
                x1="35"
                y1={55 + i * 80}
                x2="725"
                y2={55 + i * 80}
                stroke={LINE}
                strokeWidth="1"
                strokeDasharray="3 6"
              />
            ))}
          </g>

          {/* ---------------------------------------------------------------- */}
          {/* Step 01 — Existing layout                                        */}
          {/* ---------------------------------------------------------------- */}

          <g>
            {/* Step label */}
            <circle
              cx="78"
              cy="78"
              r="18"
              fill={SURFACE}
              stroke={INK}
              strokeWidth="2"
            />

            <text
              x="78"
              y="82"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="700"
              fill={INK}
            >
              01
            </text>

            <text
              x="108"
              y="74"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="700"
              fill="#F76707"
            >
              HIDDEN LAYER
            </text>

            <text
              x="108"
              y="91"
              fontSize="10"
              fill={MUTED}
            >
              Existing card peek
            </text>

            {/* Currently Building card — behind */}
            <g filter="url(#discoverability-shadow)">
              <rect
                x="150"
                y="145"
                width="310"
                height="155"
                rx="12"
                fill="#FFF4E6"
                stroke="#F76707"
                strokeWidth="2"
              />

              <rect
                x="172"
                y="166"
                width="78"
                height="8"
                rx="4"
                fill="#F76707"
                opacity="0.8"
              />

              <rect
                x="172"
                y="190"
                width="210"
                height="7"
                rx="3.5"
                fill="#FFB366"
              />

              <rect
                x="172"
                y="208"
                width="170"
                height="7"
                rx="3.5"
                fill="#FFD8A8"
              />

              <text
                x="172"
                y="260"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="700"
                fill="#E8590C"
              >
                CURRENTLY BUILDING
              </text>
            </g>

            {/* Profile card — front */}
            <g filter="url(#discoverability-shadow)">
              <rect
                x="245"
                y="115"
                width="310"
                height="155"
                rx="12"
                fill={SURFACE}
                stroke={INK}
                strokeWidth="2"
              />

              {/* Avatar */}
              <circle
                cx="285"
                cy="155"
                r="21"
                fill="#22B8CF"
                opacity="0.9"
              />

              <rect
                x="320"
                y="140"
                width="120"
                height="9"
                rx="4"
                fill={INK}
                opacity="0.8"
              />

              <rect
                x="320"
                y="158"
                width="155"
                height="6"
                rx="3"
                fill={LINE}
              />

              <rect
                x="275"
                y="202"
                width="215"
                height="7"
                rx="3.5"
                fill={LINE}
              />

              <rect
                x="275"
                y="219"
                width="180"
                height="7"
                rx="3.5"
                fill={LINE}
              />

              <text
                x="275"
                y="250"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="700"
                fill={MUTED}
              >
                PROFILE CARD
              </text>
            </g>

            {/* Partial visibility indicator */}
            <path
              d="M475 286 C510 302 540 302 570 286"
              fill="none"
              stroke="#F76707"
              strokeWidth="2"
              strokeDasharray="4 5"
            />

            <text
              x="520"
              y="325"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill={MUTED}
            >
              easy to overlook
            </text>
          </g>

          {/* ---------------------------------------------------------------- */}
          {/* Transition arrow                                                   */}
          {/* ---------------------------------------------------------------- */}

          <g>
            <path
              d="M585 190 C625 190 625 190 665 190"
              fill="none"
              stroke={INK}
              strokeWidth="1.8"
            />

            <path
              d="M655 182 L667 190 L655 198"
              fill="none"
              stroke={INK}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* ---------------------------------------------------------------- */}
          {/* Step 02 — Android Cat                                             */}
          {/* ---------------------------------------------------------------- */}

          <g>
            <circle
              cx="665"
              cy="78"
              r="18"
              fill={SURFACE}
              stroke={INK}
              strokeWidth="2"
            />

            <text
              x="665"
              y="82"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="700"
              fill={INK}
            >
              02
            </text>

            <text
              x="665"
              y="112"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="700"
              fill="#F76707"
            >
              PEEK
            </text>

            {/* Cat */}
            <g transform="translate(605 128)">
              {/* Ears */}
              <path
                d="M18 28 L10 7 L30 18"
                fill="#FF922B"
                stroke={INK}
                strokeWidth="2"
                strokeLinejoin="round"
              />

              <path
                d="M76 18 L96 7 L88 28"
                fill="#FF922B"
                stroke={INK}
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Head */}
              <rect
                x="16"
                y="17"
                width="76"
                height="63"
                rx="25"
                fill="#FF922B"
                stroke={INK}
                strokeWidth="2"
              />

              {/* Eyes */}
              <circle
                cx="39"
                cy="45"
                r="4"
                fill={INK}
              />

              <circle
                cx="69"
                cy="45"
                r="4"
                fill={INK}
              />

              {/* Nose */}
              <path
                d="M52 51 L56 55 L52 58 L48 55 Z"
                fill="#E8590C"
              />

              {/* Whiskers */}
              <path
                d="M25 56 L5 52 M25 62 L5 64"
                stroke={INK}
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <path
                d="M79 56 L99 52 M79 62 L99 64"
                stroke={INK}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>

            {/* Peek motion */}
            <path
              d="M590 205 C575 220 575 235 590 248"
              fill="none"
              stroke="#FF922B"
              strokeWidth="2"
              strokeDasharray="4 5"
            />

            <path
              d="M585 244 L590 251 L597 247"
              fill="none"
              stroke="#FF922B"
              strokeWidth="2"
            />
          </g>

          {/* ---------------------------------------------------------------- */}
          {/* Step 03 — Curiosity                                               */}
          {/* ---------------------------------------------------------------- */}

          <g>
            <circle
              cx="250"
              cy="365"
              r="18"
              fill="#F76707"
            />

            <text
              x="250"
              y="369"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="700"
              fill="#ffffff"
            >
              03
            </text>

            <text
              x="280"
              y="360"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="700"
              fill="#E8590C"
            >
              CURIOSITY
            </text>

            <text
              x="280"
              y="378"
              fontSize="10"
              fill={MUTED}
            >
              “What is underneath?”
            </text>

            {/* Curiosity markers */}
            <circle
              cx="500"
              cy="355"
              r="4"
              fill="#FFD8A8"
            />

            <circle
              cx="520"
              cy="340"
              r="3"
              fill="#FFB366"
            />

            <circle
              cx="538"
              cy="358"
              r="5"
              fill="#FF922B"
            />
          </g>

          {/* ---------------------------------------------------------------- */}
          {/* Step 04 — Reveal                                                  */}
          {/* ---------------------------------------------------------------- */}

          <g>
            <path
              d="M380 300 C380 330 390 350 420 365"
              fill="none"
              stroke="#F76707"
              strokeWidth="2"
              strokeDasharray="5 5"
            />

            <path
              d="M414 357 L421 367 L410 368"
              fill="none"
              stroke="#F76707"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <text
              x="440"
              y="365"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="700"
              fill="#F76707"
            >
              REVEAL
            </text>

            <text
              x="440"
              y="382"
              fontSize="10"
              fill={MUTED}
            >
              User explores the hidden card
            </text>
          </g>

          {/* ---------------------------------------------------------------- */}
          {/* Bottom principle                                                  */}
          {/* ---------------------------------------------------------------- */}

          <g>
            <line
              x1="80"
              y1="405"
              x2="680"
              y2="405"
              stroke={LINE}
              strokeWidth="1"
            />

            <text
              x="380"
              y="422"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="700"
              fill={INK}
            >
              VISUAL AFFORDANCE  ≠  EXPLICIT INSTRUCTION
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom explanation */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <div
            className="font-mono-label text-[9px] font-semibold"
            style={{ color: "#F76707" }}
          >
            01 / PEEK
          </div>

          <p
            className="mt-1 text-[11px] leading-relaxed"
            style={{ color: MUTED }}
          >
            Existing visual depth establishes that another layer exists.
          </p>
        </div>

        <div>
          <div
            className="font-mono-label text-[9px] font-semibold"
            style={{ color: "#FF922B" }}
          >
            02 / CURIOSITY
          </div>

          <p
            className="mt-1 text-[11px] leading-relaxed"
            style={{ color: MUTED }}
          >
            The cat creates a small moment of unexpected movement.
          </p>
        </div>

        <div>
          <div
            className="font-mono-label text-[9px] font-semibold"
            style={{ color: "#E8590C" }}
          >
            03 / DISCOVER
          </div>

          <p
            className="mt-1 text-[11px] leading-relaxed"
            style={{ color: MUTED }}
          >
            Curiosity becomes the reason to explore the hidden content.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Diagram Registry                                                           */
/* -------------------------------------------------------------------------- */

export const diagrams = {
  identity: LayersDiagram,
  nested: TreeDiagram,
  mark: MarkDiagram,
  discoverability: DiscoverabilityDiagram,
} as const;
