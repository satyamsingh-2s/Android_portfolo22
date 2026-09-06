"use client";

import { ArrowDown, Download, ImageIcon, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { AnimatedSection, StaggerContainer } from "@/components/AnimatedSection";

export function Hero() {
  const handleScroll = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 md:px-8 lg:px-12"
    >
      <style>{`
        @media (min-width: 900px) {
          .hero-grid-v2 {
            grid-template-columns: minmax(0, 1fr) 0.42fr !important;
            align-items: flex-start !important;
          }
          .hero-actions-row {
            flex-wrap: nowrap !important;
          }
        }
      `}</style>

      <div className="relative z-10 w-full max-w-[1240px]">
        <div
          className="hero-grid-v2 grid grid-cols-1 items-start gap-10 md:gap-[clamp(48px,6vw,96px)]"
        >
          {/* ===== LEFT COLUMN — DOMINANT IDENTITY ===== */}
          <AnimatedSection
            className="min-w-0"
            distance={20}
          >
            <div className="flex flex-col">
              <StaggerContainer staggerDelay={0.08} distance={18}>
                <div className="mb-10 inline-flex items-center gap-2.5">
                  <span className="location-dot" aria-hidden="true" />
                  <span className="font-mono-label text-[0.68rem] tracking-[0.14em] text-text-tertiary">
                    {personalInfo.location.toUpperCase()}
                  </span>
                </div>

                <h1
                  className="whitespace-nowrap font-display font-semibold leading-[0.94] tracking-tight text-text-primary"
                  style={{
                    fontSize: "clamp(3rem, 8.6vw, 6.4rem)",
                    lineHeight: 0.94,
                  }}
                >
                  {personalInfo.name}
                </h1>

                <h2
                  className="mt-6 font-display font-medium leading-tight text-accent"
                  style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)" }}
                >
                  {personalInfo.role}
                </h2>

                <p
                  className="mt-8 max-w-md leading-relaxed text-text-secondary"
                  style={{ fontSize: "clamp(1.02rem, 1.35vw, 1.22rem)", lineHeight: 1.65 }}
                >
                  Building AI-assisted productivity tools
                  <br className="hidden sm:block" />
                  with Kotlin &amp; Jetpack Compose.
                </p>

                <div
                  className="hero-actions-row mt-11 flex flex-wrap items-center gap-3"
                >
                  <button
                    onClick={() => handleScroll("#projects")}
                    className="inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-medium text-text-primary transition-transform hover:bg-accent/92 active:scale-[0.97]"
                  >
                    <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border border-white/20">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <circle cx="5" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.2" />
                        <circle cx="5" cy="5" r="0.8" fill="currentColor" />
                      </svg>
                    </span>
                    View Projects
                    <ArrowDown size={15} strokeWidth={2.2} />
                  </button>
                  <a
                    href={personalInfo.resumeUrl}
                    className="inline-flex h-12 items-center gap-2 rounded-xl border border-border-subtle bg-bg-elevated px-6 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated-hover active:scale-[0.97]"
                  >
                    <Download size={16} strokeWidth={2} />
                    Download Resume
                  </a>
                  <button
                    onClick={() => handleScroll("#contact")}
                    className="inline-flex h-12 items-center gap-2 rounded-xl border border-border-subtle px-6 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated active:scale-[0.97]"
                  >
                    <Mail size={16} strokeWidth={2} />
                    Contact
                  </button>
                </div>
              </StaggerContainer>
            </div>
          </AnimatedSection>

          {/* ===== RIGHT COLUMN — COMPACT SUPPORTING PANEL ===== */}
          <AnimatedSection className="w-full" delay={0.08} distance={16}>
            <div className="rounded-[18px] border border-border-subtle bg-bg-elevated/70 p-5 sm:p-6">
              <StaggerContainer staggerDelay={0.07} distance={10}>
                {/* CURRENTLY BUILDING */}
                <div className="flex items-center justify-between">
                  <span className="font-mono-label text-[0.66rem] tracking-[0.15em] text-text-tertiary">
                    CURRENTLY BUILDING
                  </span>
                  <span className="live-dot" aria-hidden="true" />
                </div>

                {/* PROJECT IMAGE PLACEHOLDER — compact 16:9 with dashed border */}
                <div className="mt-4 flex aspect-[16/9] w-full items-center justify-center rounded-xl border border-dashed border-border-subtle bg-bg-primary/60 p-4 text-center">
                  <div className="flex flex-col items-center gap-1.5 opacity-70">
                    <ImageIcon size={24} className="text-text-tertiary" strokeWidth={1.5} />
                    <p className="font-mono-label text-[0.6rem] tracking-[0.14em] text-text-tertiary">
                      PROJECT IMAGE
                    </p>
                    <p className="font-mono-label text-[0.6rem] tracking-[0.14em] text-text-tertiary">
                      PLACEHOLDER
                    </p>
                  </div>
                </div>

                {/* CURRENT FOCUS */}
                <div className="mt-5">
                  <p className="font-mono-label text-[0.64rem] tracking-[0.14em] text-text-tertiary">
                    CURRENT FOCUS
                  </p>
                  <p className="mt-2 font-display text-[0.95rem] font-semibold uppercase leading-[1.22] tracking-[0.02em] text-accent sm:text-[1rem]">
                    AI-Assisted Project
                    <br />
                    Planning Workflows
                  </p>
                </div>

                {/* SINGLE CONTINUOUS 70% PROGRESS BAR — FIXED 70%, sheen only animates */}
                <div className="mt-4">
                  <div className="progress-track" role="presentation">
                    <div className="progress-fill">
                      <div className="progress-sheen" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* INTERNAL DIVIDER */}
                <div className="mt-5 border-t border-border-subtle" />

                {/* CURRENT STATUS — small compact */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-label text-[0.64rem] tracking-[0.14em] text-text-tertiary">
                      CURRENT STATUS
                    </span>
                    <span className="live-dot live-dot-available" aria-hidden="true" />
                  </div>

                  <p className="mt-3 text-[0.84rem] font-medium leading-snug text-text-secondary">
                    AVAILABLE FOR ANDROID OPPORTUNITIES
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="font-mono-label text-[0.66rem] font-medium tracking-[0.12em] text-[#34d399]">
                      OPEN TO WORK
                    </span>
                    <span
                      className="inline-flex rounded-full"
                      style={{ backgroundColor: "#34d399", width: 7, height: 7 }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </StaggerContainer>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Screen Version 14 — Hero Redesign v2: Left Dominant Identity + Compact Supporting Rail */}
    </section>
  );
}
