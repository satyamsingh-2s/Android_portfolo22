"use client";

import { ArrowDown, Download, Mail } from "lucide-react";
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
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <StaggerContainer className="max-w-3xl" staggerDelay={0.08} distance={20}>
        <div className="font-mono-label mb-6 text-xs text-text-tertiary">
          {personalInfo.location}
        </div>
        <h1 className="font-display text-5xl font-semibold tracking-tight text-text-primary sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          {personalInfo.name}
        </h1>
        <h2 className="mt-4 font-display text-2xl font-medium text-accent sm:text-3xl">
          {personalInfo.role}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
          {personalInfo.subline}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => handleScroll("#projects")}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-text-primary transition-transform hover:bg-accent/90 active:scale-[0.97]"
          >
            View Projects
            <ArrowDown size={16} />
          </button>
          <a
            href={personalInfo.resumeUrl}
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated-hover active:scale-[0.97]"
          >
            Download Resume
            <Download size={16} />
          </a>
          <button
            onClick={() => handleScroll("#contact")}
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated active:scale-[0.97]"
          >
            Contact
            <Mail size={16} />
          </button>
        </div>
      </StaggerContainer>
    </section>
  );
}
