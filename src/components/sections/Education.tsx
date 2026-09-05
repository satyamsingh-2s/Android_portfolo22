"use client";

import { education } from "@/lib/data";
import { AnimatedSection } from "@/components/AnimatedSection";

export function Education() {
  return (
    <section id="education" className="relative px-6 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <AnimatedSection>
          <div className="font-mono-label mb-4 text-xs text-text-tertiary">Education</div>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-text-primary">
                {education.degree}
              </h2>
              <p className="mt-1 text-text-secondary">{education.school}</p>
              <p className="mt-1 text-sm text-text-tertiary">{education.period}</p>
            </div>
            <div className="text-left md:text-right">
              <div className="font-display text-3xl font-semibold text-text-primary">
                {education.cgpa}
              </div>
              <div className="font-mono-label mt-1 text-[11px] text-text-tertiary">CGPA</div>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-text-secondary">
            Relevant coursework: {education.coursework}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-tertiary">
            <span>{education.seniorSecondary}</span>
            <span>{education.secondary}</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
