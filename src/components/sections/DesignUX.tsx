"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ArrowRight, Plus, ExternalLink, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { designUXContent } from "@/lib/data";
import { AnimatedSection } from "@/components/AnimatedSection";
import { diagrams } from "@/components/design/DesignDiagrams";
import { useIsMobile } from "@/hooks/use-mobile";

const BOARD = "#F5F2EC";
const INK = "#1A1A1A";
const MUTED = "#6B675F";
const LINE = "#D6D0C4";

const ease = [0.16, 1, 0.3, 1] as const;

type Study = (typeof designUXContent.caseStudies)[number];


function DesignGallery({
  images,
  open,
  onOpenChange,
}: {
  images: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    setActiveIndex(0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
      if (event.key === "ArrowRight" && images.length > 1) {
        setActiveIndex((current) => (current + 1) % images.length);
      }
      if (event.key === "ArrowLeft" && images.length > 1) {
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, images.length, onOpenChange]);

  useEffect(() => {
    if (!open || images.length <= 1) return;
    const nextIndex = (activeIndex + 1) % images.length;
    const nextImage = new Image();
    nextImage.src = images[nextIndex]!;
  }, [activeIndex, images, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="My design gallery"
        >
          <button
            type="button"
            aria-label="Close gallery"
            className="absolute inset-0 cursor-default"
            style={{ background: "rgba(15, 15, 15, 0.78)", backdropFilter: "blur(10px)" }}
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.32, ease }}
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border-2 p-4 shadow-[10px_10px_0_0_#E8590C] sm:p-6"
            style={{ background: BOARD, borderColor: INK }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono-label text-[9px] font-semibold" style={{ color: MUTED }}>
                  SELECTED WORK / MY DESIGN
                </div>
                <h3 className="font-display mt-1 text-2xl font-semibold tracking-tight" style={{ color: INK }}>
                  My Design
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Close gallery"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-transform hover:-translate-y-0.5"
                style={{ borderColor: INK, color: INK }}
              >
                <X size={15} />
              </button>
            </div>

            {images.length === 0 ? (
              <div className="mt-6 flex min-h-[45vh] flex-col items-center justify-center border-2 border-dashed text-center" style={{ borderColor: LINE, color: MUTED }}>
                <ImageIcon size={28} strokeWidth={1.5} />
                <p className="font-mono-label mt-4 text-[10px] font-semibold">Design images are ready to be added.</p>
                <p className="mt-1 max-w-sm text-xs">Add your work to <code>public/images/design/</code> and list the paths in <code>src/lib/data.ts</code>.</p>
              </div>
            ) : (
              <>
                <div className="relative mt-6 overflow-hidden border-2 p-2 sm:p-4" style={{ borderColor: LINE, background: "#EEEAE1" }}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={images[activeIndex]}
                      src={images[activeIndex]}
                      loading="lazy"
                      decoding="async"
                      alt={`Design work ${activeIndex + 1}`}
                      initial={{ opacity: 0, x: 34, scale: 0.985 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -34, scale: 0.985 }}
                      transition={{ duration: 0.3, ease }}
                      className="mx-auto max-h-[65vh] w-full rounded-lg object-contain"
                    />
                  </AnimatePresence>

                  {images.length > 1 && (
                    <>
                      <button type="button" onClick={() => setActiveIndex((current) => (current - 1 + images.length) % images.length)} aria-label="Previous design" className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-transform hover:-translate-x-0.5" style={{ borderColor: INK, background: BOARD, color: INK }}>
                        <ChevronLeft size={16} />
                      </button>
                      <button type="button" onClick={() => setActiveIndex((current) => (current + 1) % images.length)} aria-label="Next design" className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-transform hover:translate-x-0.5" style={{ borderColor: INK, background: BOARD, color: INK }}>
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="mt-4 flex justify-center gap-1.5" aria-label="Design gallery pagination">
                    {images.map((image, index) => (
                      <button key={image} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show design ${index + 1}`} className="h-1.5 rounded-full transition-all" style={{ width: index === activeIndex ? 28 : 6, background: index === activeIndex ? INK : LINE }} />
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
  const isMobile = useIsMobile();
  const num = String(index + 1).padStart(2, "0");

  const cardStyle = isMobile
    ? {
        background: BOARD,
        borderColor: INK,
        borderLeft: `4px solid ${study.color}`,
        boxShadow: "none",
      }
    : {
        background: BOARD,
        borderColor: INK,
        boxShadow: `8px 8px 0 0 ${study.color}`,
      };

  return (
    <div className="relative">
      {/* escaping fragments — decorative, hidden on mobile */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
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
        whileHover={isMobile ? undefined : { x: -3, y: -3 }}
        transition={{ duration: 0.15 }}
        className="group relative z-10 flex w-full flex-col border-2 p-6 text-left"
        style={cardStyle}
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
  const [designGalleryOpen, setDesignGalleryOpen] = useState(false);
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

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <span
                  className="font-mono-label text-[9px] md:whitespace-nowrap md:text-[10px] font-semibold"
                  style={{ color: INK }}
                >
                  {designUXContent.supporting}
                </span>
                <span className="hidden h-px flex-1 sm:block" style={{ background: LINE }} aria-hidden />
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={designUXContent.certificateUrl || undefined}
                    target={designUXContent.certificateUrl ? "_blank" : undefined}
                    rel={designUXContent.certificateUrl ? "noreferrer" : undefined}
                    aria-disabled={!designUXContent.certificateUrl}
                    onClick={(event) => {
                      if (!designUXContent.certificateUrl) event.preventDefault();
                    }}
                    className={`inline-flex h-9 items-center gap-2 rounded-full border-2 px-3.5 text-[10px] font-semibold transition-all duration-200 ${
                      designUXContent.certificateUrl
                        ? "hover:-translate-y-0.5"
                        : "cursor-not-allowed opacity-50"
                    }`}
                    style={{ borderColor: INK, color: INK, background: "transparent" }}
                    title={designUXContent.certificateUrl ? "Open certificate" : "Add your certificate link in src/lib/data.ts"}
                  >
                    My Certificate
                    <ExternalLink size={12} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setDesignGalleryOpen(true)}
                    className="inline-flex h-9 items-center gap-2 rounded-full border-2 px-3.5 text-[10px] font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    style={{ borderColor: INK, color: INK, background: "transparent" }}
                  >
                    <ImageIcon size={13} />
                    My Design
                    {designUXContent.gallery.length > 0 && (
                      <span className="font-mono text-[9px]" style={{ color: MUTED }}>{designUXContent.gallery.length}</span>
                    )}
                  </button>
                </div>
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

      <DesignGallery
        images={designUXContent.gallery}
        open={designGalleryOpen}
        onOpenChange={setDesignGalleryOpen}
      />
    </section>
  );
}
