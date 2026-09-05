"use client";

import { ArrowUpRight } from "lucide-react";
import { omegaProject } from "@/lib/data";
import { PatternCard } from "@/components/PatternCard";
import { Tag } from "@/components/Tag";
import { StatBlock } from "@/components/StatBlock";
import { AnimatedSection, StaggerContainer } from "@/components/AnimatedSection";
import { CursorTrail } from "@/components/CursorTrail";

export function Omega() {
  return (
    <section id="omega" className="relative px-6 py-24 md:px-8 lg:px-12">
      <CursorTrail />
      <div className="relative z-10 mx-auto max-w-[1200px]">

        <AnimatedSection>
          <div className="font-mono-label mb-4 text-xs text-text-tertiary">Flagship Project</div>
        </AnimatedSection>

        <PatternCard pattern="contour" tint="neutral" className="p-8 md:p-12">
          <StaggerContainer staggerDelay={0.07} distance={24}>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
                {omegaProject.title}
              </h2>
              <span className="rounded-full bg-accent-secondary/10 px-3 py-1 text-xs font-medium text-accent-secondary">
                {omegaProject.status}
              </span>
            </div>

            <p className="mt-2 text-lg text-text-secondary">{omegaProject.subtitle}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {omegaProject.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>

            <p className="mt-8 max-w-3xl text-base leading-relaxed text-text-secondary">
              {omegaProject.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-12">
              {omegaProject.stats.map((stat) => (
                <StatBlock
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>

            <a
              href={omegaProject.link}
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-secondary"
            >
              View on GitHub
              <ArrowUpRight size={16} />
            </a>

            {/* Screenshot placeholder */}
            <div className="mt-12 rounded-2xl border border-border-subtle bg-bg-primary p-8 text-center">
              <p className="font-mono-label text-xs text-text-tertiary">Omega UI screenshots</p>
              <p className="mt-2 text-sm text-text-secondary">Placeholder — awaiting assets</p>
            </div>
          </StaggerContainer>
        </PatternCard>
      </div>
    </section>
  );
}
