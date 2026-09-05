import { type ReactNode } from "react";
import { PatternSvg } from "./PatternSvg";

interface PatternCardProps {
  children: ReactNode;
  pattern?:
    | "dot-grid"
    | "diagonal"
    | "contour"
    | "hex-grid"
    | "circuit-trace"
    | "radial"
    | "none";
  tint?: "neutral" | "blue" | "green";
  className?: string;
  hover?: boolean;
}

export function PatternCard({
  children,
  pattern = "none",
  tint = "neutral",
  className = "",
  hover = true,
}: PatternCardProps) {
  const tintClasses = {
    neutral: "bg-bg-elevated hover:bg-bg-elevated-hover",
    blue: "bg-[#141C2E] hover:bg-[#1a2340]",
    green: "bg-[#131F1A] hover:bg-[#1a2b24]",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border-subtle p-8 ${tintClasses[tint]} ${
        hover ? "transition-all duration-150 hover:-translate-y-1" : ""
      } ${className}`}
    >
      {pattern !== "none" && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <PatternSvg pattern={pattern} />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
