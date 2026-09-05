"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ArrowRight, Plus } from "lucide-react";
import { designUXContent } from "@/lib/data";
import { AnimatedSection } from "@/components/AnimatedSection";
import { diagrams } from "@/components/design/DesignDiagrams";

const BOARD = "#F5F2EC";
const INK = "#1A1A1A";
const MUTED = "#6B675F";
const LINE = "#D6D0C4";

const ease = [0.16, 1, 0.3, 1] as const;

type Study = (typeof designUXContent.caseStudies)[number];

function DotGrid({ color }: { color: string }) {
  return (
    <svg width="42" height="30" viewBox="0 0 42 30" aria-hidden>
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <circle key={`${r}-${c}`} cx={4 + c * 11} cy={4 + r * 11} r="2.4" fill={color} />
        )),
      )}
    </svg>
  );
}

/* Collapsed summary module with fragments escaping its boundary */
function CaseCard({
  study,
  index,
  onOpen,
}: {
  study: Study;
  index: number;
  onOpen: () => void;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="relative">
      {/* escaping fragments — decorative */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span
          className="absolute -left-5 -top-4 block h-12 w-12 rotate-[18deg] border-2"
          style={{ background: study.palette[1], borderColor: INK }}
        />
        <span
          className="absolute -right-6 top-16 block h-10 w-10 -rotate-12 border-2"
          style={{ background: study.palette[2], borderColor: INK }}
        />
        <span
          className="absolute -bottom-4 -left-3 block h-9 w-9 rounded-full border-2"
          style={{ background: study.palette[3], borderColor: INK }}
        />
        <span
          className="absolute -right-3 -top-3 block h-6 w-6 rounded-full border-2"
          style={{ borderColor: study.color }}
        />
      </div>

      <motion.button
        type="button"
        onClick={onOpen}
        whileHover={{ x: -3, y: -3 }}
        transition={{ duration: 0.15 }}
        className="group relative z-10 flex w-full flex-col border-2 p-6 text-left"
        style={{ background: BOARD, borderColor: INK, boxShadow: `8px 8px 0 0 ${study.color}` }}
      >
        <div className="flex items-start justify-between">
          <span
            className="font-display text-4xl font-semibold leading-none"
            style={{ color: study.color }}
          >
            {num}
          </span>
          <span
            className="font-mono-label border-b-2 pb-0.5 text-[9px] font-semibold"
            style={{ color: study.color, borderColor: study.color }}
          >
            Case Study
          </span>
        </div>

        <h3
          className="font-display mt-4 text-xl font-semibold leading-tight tracking-tight"
          style={{ color: INK }}
        >
          {study.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
          {study.summary}
        </p>

        <div className="mt-6 flex items-end justify-between">
          <span
            className="font-mono-label inline-flex items-center gap-2 text-[10px] font-semibold"
            style={{ color: study.color }}
          >
            Deconstruct
            <ArrowRight
              size={14}
              className="transition-transform duration-150 group-hover:translate-x-1"
            />
          </span>
          <DotGrid color={study.color} />
        </div>
      </motion.button>
    </div>
  );
}

function ExpandedCase({ study, index, onClose }: { study: Study; index: number; onClose: () => void }) {
  const Diagram = diagrams[study.id as keyof typeof diagrams];
  const steps = [
    { label: "Problem", body: study.problem },
    { label: "Thinking", body: study.thinking },
    { label: "Design Decision", body: study.decision },
    { label: "Result", body: study.result },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4, ease }}
      className="relative border-2 p-6 md:p-10"
      style={{ background: BOARD, borderColor: INK, boxShadow: `10px 10px 0 0 ${study.color}` }}
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <span className="font-mono-label text-[10px] font-semibold" style={{ color: study.color }}>
            Case Study {String(index + 1).padStart(2, "0")} / Deconstructed
          </span>
          <h3
            className="font-display mt-2 text-2xl font-semibold tracking-tight md:text-3xl"
            style={{ color: INK }}
          >
            {study.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="flex h-10 w-10 shrink-0 items-center justify-center border-2 transition-colors"
          style={{ borderColor: INK, color: INK, background: "transparent" }}
        >
          <X size={16} />
        </button>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div
          className="border-2 border-dashed p-4"
          style={{ borderColor: LINE }}
        >
          <Diagram />
        </div>

        <ol className="relative space-y-6">
          {steps.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.09, ease }}
              className="relative pl-12"
            >
              <span
                className="font-mono-label absolute left-0 top-0 flex h-8 w-8 items-center justify-center border-2 text-[10px] font-semibold"
                style={{
                  borderColor: INK,
                  background: i === 3 ? study.color : "transparent",
                  color: i === 3 ? "#FFF8F0" : INK,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className="font-mono-label text-[10px] font-semibold"
                style={{ color: study.color }}
              >
                {s.label}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: INK }}>
                {s.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}

export function DesignUX() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const studies = designUXContent.caseStudies;
  const active = openIndex !== null ? studies[openIndex] : undefined;

  return (
    <section id="design" className="relative px-6 py-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <AnimatedSection>
          <div className="font-mono-label mb-4 text-xs text-text-tertiary">
            {designUXContent.eyebrow}
          </div>
        </AnimatedSection>


        {/* Inverted chalk design board */}
        <AnimatedSection distance={28}>
          <div
            className="relative mt-10 overflow-hidden rounded-3xl border-2 p-6 md:p-12"
            style={{ background: BOARD, borderColor: INK }}
          >
            {/* paper grain */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `radial-gradient(${INK} 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
              }}
            />

            <div className="relative">
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <h2
                  className="font-display max-w-md text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl"
                  style={{ color: INK }}
                >
                  Designing the experience,
                  <br />
                  not just the <em style={{ color: studies[0]?.color }}>interface.</em>
                </h2>
                <p className="max-w-md text-sm leading-relaxed" style={{ color: MUTED }}>
                  {designUXContent.intro}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <span
                  className="font-mono-label text-[9px] md:whitespace-nowrap md:text-[10px] font-semibold"
                  style={{ color: INK }}
                >
                  {designUXContent.supporting}
                </span>
                <span className="h-px flex-1" style={{ background: LINE }} aria-hidden />
              </div>

              <div className="mt-10">
                <AnimatePresence mode="wait" initial={false}>
                  {active ? (
                    <ExpandedCase
                      key={active.id}
                      study={active}
                      index={openIndex as number}
                      onClose={() => setOpenIndex(null)}
                    />
                  ) : (
                    <motion.div
                      key="grid"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10"
                    >
                      {studies.map((study, i) => (
                        <div
                          key={study.id}
                          className={
                            i === 1 ? "md:-translate-y-6" : i === 2 ? "md:translate-y-8" : ""
                          }
                        >
                          <CaseCard study={study} index={i} onOpen={() => setOpenIndex(i)} />
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="font-mono-label mt-16 text-center text-[10px]"
                style={{ color: MUTED }}
              >
                {active ? (
                  <button type="button" onClick={() => setOpenIndex(null)} className="underline">
                    <span className="inline-flex items-center gap-1">Back to all case studies</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Plus size={12} /> Click any case study to deconstruct the thinking behind it
                  </span>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
