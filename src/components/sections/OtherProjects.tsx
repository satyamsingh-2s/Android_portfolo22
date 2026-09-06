"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { otherProjects } from "@/lib/data";
import { AnimatedSection, StaggerContainer } from "@/components/AnimatedSection";


function ProjectRow({ project }: { project: (typeof otherProjects)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group cursor-pointer border-b border-border-subtle py-8 transition-colors duration-300 hover:border-text-tertiary"
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
      <div className="flex items-baseline justify-between gap-6">
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

      {/* Progressive disclosure */}
      <div
        className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100"
        }`}
      >
        <div className="overflow-hidden">
          <div className="translate-y-2 pt-4 transition-transform duration-300 ease-out group-hover:translate-y-0 motion-reduce:transition-none">
            <p className="max-w-md text-sm leading-relaxed text-text-secondary">
              {project.expandedDescription}
            </p>
            <p className="mt-3 font-mono text-xs text-text-tertiary">
              {project.stack}
            </p>
            <a
              href={project.link}
              onClick={(e) => e.stopPropagation()}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-secondary"
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
  );
}

export function OtherProjects() {
  return (
    <section id="projects" className="relative px-6 py-24 md:px-8 lg:px-12">
      <div className="relative z-10 mx-auto max-w-[1200px]">

        <AnimatedSection>
          <div className="font-mono-label mb-4 text-xs text-text-tertiary">Other Projects</div>
          <p className="font-display text-xl font-medium tracking-tight text-text-secondary md:text-2xl">
            A range of experiments across Android, systems, web and AI.
          </p>
        </AnimatedSection>

        <StaggerContainer
          className="mt-10 grid gap-x-12 border-t border-border-subtle md:grid-cols-2"
          staggerDelay={0.07}
          distance={24}
        >
          {otherProjects.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
