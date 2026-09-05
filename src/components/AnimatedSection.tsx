"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  once?: boolean;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  distance = 16,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  distance?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.07,
  distance = 16,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: distance },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.45,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
