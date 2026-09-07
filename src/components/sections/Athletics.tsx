"use client";

import { useState } from "react";
import { Image as ImageIcon, Trophy } from "lucide-react";
import { athletics } from "@/lib/data";
import { AnimatedSection } from "@/components/AnimatedSection";
import { EventGallery } from "@/components/EventGallery";

export function Athletics() {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <section id="athletics" className="relative px-6 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <AnimatedSection>
          <div className="flex items-start gap-4 rounded-2xl border border-border-subtle bg-bg-elevated p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-dim text-accent">
              <Trophy size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-lg font-semibold text-text-primary">
                {athletics.title}
              </h2>
              <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                {athletics.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setGalleryOpen(true)}
                className="mt-6 inline-flex h-9 items-center gap-2 rounded-full border border-border-subtle bg-bg-primary/60 px-3.5 text-xs font-medium text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-dim hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ImageIcon className="h-3.5 w-3.5" />
                Event Photos
                {athletics.gallery.length > 0 && (
                  <span className="font-mono text-[10px] text-text-tertiary">{athletics.gallery.length}</span>
                )}
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <EventGallery
        title={athletics.title}
        images={athletics.gallery}
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
      />
    </section>
  );
}
