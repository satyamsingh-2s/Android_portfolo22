import { type ReactNode } from "react";
import { AnimatedSection } from "./AnimatedSection";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  pattern?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className = "",
  innerClassName = "",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`relative px-6 py-24 md:px-8 lg:px-12 ${className}`}>
      <div className={`mx-auto max-w-[1200px] ${innerClassName}`}>
        <AnimatedSection>{children}</AnimatedSection>
      </div>
    </section>
  );
}
