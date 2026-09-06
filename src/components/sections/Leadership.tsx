"use client";

import { leadership } from "@/lib/data";
import { PatternCard } from "@/components/PatternCard";
import { StatBlock } from "@/components/StatBlock";
import { AnimatedSection, StaggerContainer } from "@/components/AnimatedSection";

export function Leadership() {
  return (
    <section id="leadership" className="relative px-6 py-24 md:px-8 lg:px-12">
      <style>{`
        /* Any decorative SVG/CSS connector lines linking bullets ↔ stats:
           hide below 768px per mobile-responsive-spec §5.
           Mark with class="leadership-connector" when adding. */
        @media (max-width: 767px) {
          .leadership-connector {
            display: none !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-[1200px]">
        <AnimatedSection>
          <div className="font-mono-label mb-4 text-xs text-text-tertiary">Beyond Code</div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            Leadership & Extracurricular
          </h2>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Dominant Dakshh card — if decorative connector lines between bullets and stats are added later,
              wrap them in a container with class="leadership-connector hidden md:block" or rely on the
              @media rule above. Stat rows still display cleanly beneath each card's text on mobile. */}
          {/* Dominant Dakshh card */}
          <PatternCard pattern="circuit-trace" tint="neutral" className="lg:col-span-2">
            <StaggerContainer staggerDelay={0.06} distance={20}>
              <div className="font-mono-label text-[11px] text-text-tertiary">
                {leadership.primary.school}
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-text-primary">
                {leadership.primary.role}
              </h3>
              <p className="text-lg text-accent">{leadership.primary.org}</p>

              <ul className="mt-6 space-y-3">
                {leadership.primary.description.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="mt-2 h-1 w-1 rounded-full bg-accent-secondary" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-10">
                {leadership.primary.stats.map((stat) => (
                  <StatBlock
                    key={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                ))}
              </div>
            </StaggerContainer>
          </PatternCard>

          {/* Secondary Lakshaya card */}
          <PatternCard pattern="radial" tint="neutral" className="h-full">
            <StaggerContainer staggerDelay={0.06} distance={20}>
              <div className="font-mono-label text-[11px] text-text-tertiary">
                {leadership.secondary.school}
              </div>
              <h3 className="mt-2 font-display text-xl font-semibold text-text-primary">
                {leadership.secondary.role}
              </h3>
              <p className="text-accent">{leadership.secondary.org}</p>

              <ul className="mt-4 space-y-2">
                {leadership.secondary.description.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="mt-2 h-1 w-1 rounded-full bg-accent-secondary" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {leadership.secondary.stats.map((stat) => (
                  <StatBlock
                    key={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                ))}
              </div>
            </StaggerContainer>
          </PatternCard>
        </div>

        {/* Footnotes */}
        <AnimatedSection delay={0.2}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border-subtle bg-bg-elevated p-5">
              <h4 className="font-display text-sm font-semibold text-text-primary">
                {leadership.footnote.event}
              </h4>
              <p className="mt-1 text-sm text-text-secondary">{leadership.footnote.note}</p>
            </div>
            <div className="rounded-2xl border border-border-subtle bg-bg-elevated p-5">
              <div className="flex items-center gap-2">
                <h4 className="font-display text-sm font-semibold text-text-primary">
                  {leadership.internship.role}
                </h4>
                <span className="text-xs text-text-tertiary">{leadership.internship.period}</span>
              </div>
              <p className="mt-1 text-sm text-text-secondary">{leadership.internship.org}</p>
              <p className="mt-2 text-xs text-text-tertiary">{leadership.internship.note}</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
