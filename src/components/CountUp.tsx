"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
}

export function CountUp({ end, duration = 650 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.15,
    margin: "0px",
  });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    let frameId = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      // Keep positive counters from displaying 0 during their animation.
      const nextCount =
        progress >= 1
          ? end
          : Math.max(1, Math.floor(eased * end));

      setCount(nextCount);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}