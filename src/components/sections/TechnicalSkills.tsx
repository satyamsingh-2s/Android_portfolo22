"use client";

import {
  Smartphone,
  Globe,
  Cpu,
  Bot,
  Brain,
  Code,
  Wrench,
} from "lucide-react";
import { skillCategories } from "@/lib/data";
import { Tag } from "@/components/Tag";
import { AnimatedSection, StaggerContainer } from "@/components/AnimatedSection";

const categoryIcons: Record<string, React.ReactNode> = {
  Android: <Smartphone size={18} />,
  Web: <Globe size={18} />,
  Systems: <Cpu size={18} />,
  "AI & APIs": <Bot size={18} />,
  "Core CS": <Brain size={18} />,
  Languages: <Code size={18} />,
  Tools: <Wrench size={18} />,
};

export function TechnicalSkills() {
  return (
    <section id="skills" className="relative px-6 py-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <AnimatedSection>
          <div className="font-mono-label mb-4 text-xs text-text-tertiary">Technical Skills</div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            What I work with
          </h2>
        </AnimatedSection>

        <StaggerContainer
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.07}
          distance={24}
        >
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="rounded-2xl border border-border-subtle bg-bg-elevated p-6 transition-colors hover:bg-bg-elevated-hover"
            >
              <div className="mb-4 flex items-center gap-2 text-accent">
                {categoryIcons[category.name]}
                <h3 className="font-display text-sm font-semibold text-text-primary">
                  {category.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
