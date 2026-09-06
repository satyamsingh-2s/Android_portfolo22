"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { otherProjects } from "@/lib/data";
import { AnimatedSection } from "@/components/AnimatedSection";
import { PatternSvg } from "@/components/PatternSvg";

type PatternKey =
  | "dot-grid"
  | "diagonal"
  | "contour"
  | "hex-grid"
  | "circuit-trace"
  | "radial";

function ProjectRow({
  project,
}: {
  project: (typeof otherProjects)[number];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group relative overflow-hidden border-b border-border-subtle transition-colors duration-300 hover:bg-bg-elevated/40"
      onClick={() => setOpen((v) => !v)}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }}
    >
      {/* Left accent bar */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[4px]"
        style={{ backgroundColor: project.accentColor }}
      />

      {/* Per-project background pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ color: project.accentColor }}
      >
        <PatternSvg pattern={project.pattern as PatternKey} />
      </div>

      <div className="relative py-8 pl-5 pr-4 sm:pl-6 sm:pr-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent md:text-3xl">
                {project.title}
              </h3>
              <span className="font-mono-label shrink-0 text-[11px] text-text-tertiary">
                {project.domain}
              </span>
            </div>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
              {project.shortDescription}
            </p>
          </div>

          <div
            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle text-text-tertiary transition-all duration-300 group-hover:border-text-tertiary group-hover:text-text-primary md:h-11 md:w-11"
            style={{
              transitionProperty: "color, border-color, transform",
            }}
          >
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>

        {/* Progressive disclosure */}
        <div
          className={`grid transition-all duration-[300ms] ease-out motion-reduce:transition-none ${
            open
              ? "grid-rows-[1fr] opacity-100 mt-4"
              : "grid-rows-[0fr] opacity-0 mt-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-4"
          }`}
        >
          <div className="overflow-hidden">
            <div
              className={`translate-y-2 pt-2 transition-transform duration-[300ms] ease-out group-hover:translate-y-0 motion-reduce:transition-none ${open ? "translate-y-0" : ""}`}
            >
              <p className="max-w-md text-sm leading-relaxed text-text-secondary">
                {project.expandedDescription}
              </p>
              <p className="mt-3 font-mono text-xs text-text-tertiary">
                {project.stack}
              </p>
              <a
                href={project.link}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:brightness-110"
                style={{ color: project.accentColor }}
              >
                View project
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OtherProjects() {
  return (
    <section
      id="projects"
      className="relative px-6 py-24 md:px-8 lg:px-12"
    >
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <AnimatedSection>
          <div className="font-mono-label mb-4 text-xs text-text-tertiary">
            Other Projects
          </div>
          <p className="font-display text-xl font-medium tracking-tight text-text-secondary md:text-2xl">
            A range of experiments across Android, systems, web and AI.
          </p>
        </AnimatedSection>

        <div className="mt-10 border-t border-border-subtle">
          {otherProjects.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
