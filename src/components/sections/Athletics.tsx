"use client";

import { Trophy } from "lucide-react";
import { athletics } from "@/lib/data";
import { AnimatedSection } from "@/components/AnimatedSection";

export function Athletics() {
  return (
    <section id="athletics" className="relative px-6 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <AnimatedSection>
          <div className="flex items-start gap-4 rounded-2xl border border-border-subtle bg-bg-elevated p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-dim text-accent">
              <Trophy size={18} />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-text-primary">
                {athletics.title}
              </h2>
              <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                {athletics.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
