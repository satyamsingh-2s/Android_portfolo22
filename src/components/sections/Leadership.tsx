"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ExternalLink, FileCheck2, Image as ImageIcon, Instagram } from "lucide-react";

import { leadership } from "@/lib/data";
import { PatternCard } from "@/components/PatternCard";
import { StatBlock } from "@/components/StatBlock";
import { AnimatedSection, StaggerContainer } from "@/components/AnimatedSection";
import { EventGallery } from "@/components/EventGallery";

interface LeadershipCardActionsProps {
  instagramUrl: string;
  galleryImages: string[];
  onGalleryOpen: () => void;
}

function LeadershipCardActions({
  instagramUrl,
  galleryImages,
  onGalleryOpen,
}: LeadershipCardActionsProps) {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-2.5">
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center gap-2 rounded-full border border-border-subtle bg-bg-primary/60 px-3.5 text-xs font-medium text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-dim hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Instagram className="h-3.5 w-3.5" />
          Instagram
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      )}

      <button
        type="button"
        onClick={onGalleryOpen}
        className="inline-flex h-9 items-center gap-2 rounded-full border border-border-subtle bg-bg-primary/60 px-3.5 text-xs font-medium text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-dim hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ImageIcon className="h-3.5 w-3.5" />
        Event Photos
        {galleryImages.length > 0 && <span className="font-mono text-[10px] text-text-tertiary">{galleryImages.length}</span>}
      </button>

    </div>
  );
}

export function Leadership() {
  const [gallery, setGallery] = useState<"primary" | "secondary" | null>(null);

  return (
    <section id="leadership" className="relative px-6 py-24 md:px-8 lg:px-12">
      <style>{`
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
          <PatternCard pattern="circuit-trace" tint="neutral" className="lg:col-span-2">
            <StaggerContainer staggerDelay={0.06} distance={20}>
              <div className="font-mono-label text-[11px] text-text-tertiary">{leadership.primary.school}</div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-text-primary">{leadership.primary.role}</h3>
              <p className="text-lg text-accent">{leadership.primary.org}</p>

              <ul className="mt-6 space-y-3">
                {leadership.primary.description.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-secondary" />
                    {item}
                  </li>
                ))}
              </ul>

              <LeadershipCardActions
                instagramUrl={leadership.primary.instagramUrl}
                galleryImages={leadership.primary.gallery}
                onGalleryOpen={() => setGallery("primary")}
              />

              <div className="mt-8 flex flex-wrap gap-10">
                {leadership.primary.stats.map((stat) => (
                  <StatBlock key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
                ))}
              </div>
            </StaggerContainer>
          </PatternCard>

          <PatternCard pattern="radial" tint="neutral" className="h-full">
            <StaggerContainer staggerDelay={0.06} distance={20}>
              <div className="font-mono-label text-[11px] text-text-tertiary">{leadership.secondary.school}</div>
              <h3 className="mt-2 font-display text-xl font-semibold text-text-primary">{leadership.secondary.role}</h3>
              <p className="text-accent">{leadership.secondary.org}</p>

              <ul className="mt-4 space-y-2">
                {leadership.secondary.description.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-secondary" />
                    {item}
                  </li>
                ))}
              </ul>

              <LeadershipCardActions
                instagramUrl={leadership.secondary.instagramUrl}
                galleryImages={leadership.secondary.gallery}
                onGalleryOpen={() => setGallery("secondary")}
              />

              <div className="mt-8">
                {leadership.secondary.stats.map((stat) => (
                  <StatBlock key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
                ))}
              </div>
            </StaggerContainer>
          </PatternCard>
        </div>

        <AnimatedSection delay={0.2}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border-subtle bg-bg-elevated p-5">
              <h4 className="font-display text-sm font-semibold text-text-primary">{leadership.footnote.event}</h4>
              <p className="mt-1 text-sm text-text-secondary">{leadership.footnote.note}</p>
            </div>
            <div className="rounded-2xl border border-border-subtle bg-bg-elevated p-5">
              <div className="flex items-center gap-2">
                <h4 className="font-display text-sm font-semibold text-text-primary">{leadership.internship.role}</h4>
                <span className="text-xs text-text-tertiary">{leadership.internship.period}</span>
              </div>
              <p className="mt-1 text-sm text-text-secondary">{leadership.internship.org}</p>
              <p className="mt-2 text-xs text-text-tertiary">{leadership.internship.note}</p>
              {leadership.internship.certificateUrl && (
                <a
                  href={leadership.internship.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-9 items-center gap-2 rounded-full border border-border-subtle bg-bg-primary/60 px-3.5 text-xs font-medium text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-dim hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <FileCheck2 className="h-3.5 w-3.5" />
                  View Certificate
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatePresence>
        {gallery === "primary" && (
          <EventGallery
            title={leadership.primary.org}
            images={leadership.primary.gallery}
            open
            onOpenChange={(open) => !open && setGallery(null)}
          />
        )}
        {gallery === "secondary" && (
          <EventGallery
            title={leadership.secondary.org}
            images={leadership.secondary.gallery}
            open
            onOpenChange={(open) => !open && setGallery(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
