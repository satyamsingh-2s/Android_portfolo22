"use client";

import { useIsMobile } from "@/hooks/use-mobile";

export function BackgroundPattern() {
  const isMobile = useIsMobile();

  return (
    <div
      className="ambient-drift pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bg-fade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <g
          className="origin-center"
          style={{
            animation: isMobile
              ? "none"
              : "drift 28s ease-in-out infinite",
          }}
        >
          <path
            d="M-100,400 Q200,200 500,400 T1300,400"
            fill="none"
            stroke="url(#bg-fade)"
            strokeWidth="1"
          />
          <path
            d="M-100,500 Q200,300 500,500 T1300,500"
            fill="none"
            stroke="url(#bg-fade)"
            strokeWidth="1"
          />
          <path
            d="M-100,300 Q200,100 500,300 T1300,300"
            fill="none"
            stroke="url(#bg-fade)"
            strokeWidth="1"
          />
          <path
            d="M-100,600 Q200,400 500,600 T1300,600"
            fill="none"
            stroke="url(#bg-fade)"
            strokeWidth="1"
          />
          <path
            d="M-100,200 Q200,0 500,200 T1300,200"
            fill="none"
            stroke="url(#bg-fade)"
            strokeWidth="1"
          />
        </g>
      </svg>
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
        }
      `}</style>
    </div>
  );
}
