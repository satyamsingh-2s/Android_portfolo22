import { CountUp } from "./CountUp";

interface StatBlockProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}

export function StatBlock({ value, suffix = "", label, className = "" }: StatBlockProps) {
  return (
    <div className={className}>
      <div className="font-display text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
        <CountUp end={value} />
        {suffix}
      </div>
      <div className="mt-1 font-mono-label text-[11px] text-text-tertiary">{label}</div>
    </div>
  );
}
