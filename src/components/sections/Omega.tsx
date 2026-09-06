"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { omegaProject } from "@/lib/data";
import { PatternCard } from "@/components/PatternCard";
import { Tag } from "@/components/Tag";
import { StatBlock } from "@/components/StatBlock";
import { AnimatedSection, StaggerContainer } from "@/components/AnimatedSection";

const OMEGA_SLIDE_COUNT = 4;
const OMEGA_SLIDE_POSITIONS = [
  { objectPosition: "0% 33%" },
  { objectPosition: "33% 33%" },
  { objectPosition: "66% 33%" },
  { objectPosition: "100% 33%" },
];

export function Omega() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    duration: 280,
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="omega"
      className="relative px-6 py-24 md:px-8 lg:px-12"
    >
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <AnimatedSection>
          <div className="font-mono-label mb-4 text-xs text-text-tertiary">
            Flagship Project
          </div>
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

            <p className="mt-2 text-lg text-text-secondary">
              {omegaProject.subtitle}
            </p>

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

            {/* Omega UI 4-panel swipeable carousel */}
            <div className="mt-12 overflow-hidden rounded-2xl border border-border-subtle bg-bg-primary">
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex -ml-4 touch-pan-y touch-pinch-zoom motion-reduce:transition-none">
                  {Array.from({ length: OMEGA_SLIDE_COUNT }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className="min-w-0 flex-[0_0_100%] pl-4"
                      >
                        <div className="overflow-hidden rounded-xl bg-bg-primary">
                          <img
                            src="/images/omega_portfolio_2nd.png"
                            alt={`Omega panel ${i + 1} of 4: app showcase (placeholder — designer mobile-specific asset pending Phase 3)`}
                            className="block h-auto w-full aspect-[16/6] object-cover"
                            style={{
                              objectPosition:
                                OMEGA_SLIDE_POSITIONS[i]!.objectPosition,
                            }}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Pagination dots */}
              <div className="flex items-center justify-center gap-2 py-4 border-t border-border-subtle">
                {scrollSnaps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollTo(i)}
                    aria-label={`Go to panel ${i + 1}`}
                    aria-current={selectedIndex === i ? "true" : "false"}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      selectedIndex === i
                        ? "w-6 bg-accent"
                        : "w-2 bg-border-subtle hover:bg-text-tertiary"
                    }`}
                  />
                ))}
              </div>
            </div>
          </StaggerContainer>
        </PatternCard>
      </div>
    </section>
  );
}
