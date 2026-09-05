interface PatternSvgProps {
  pattern:
    | "dot-grid"
    | "diagonal"
    | "contour"
    | "hex-grid"
    | "circuit-trace"
    | "radial";
  className?: string;
}

export function PatternSvg({ pattern, className = "" }: PatternSvgProps) {
  const strokeColor = "currentColor";

  switch (pattern) {
    case "dot-grid":
      return (
        <svg className={`h-full w-full ${className}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill={strokeColor} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      );

    case "diagonal":
      return (
        <svg className={`h-full w-full ${className}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonal" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="24" stroke={strokeColor} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal)" />
        </svg>
      );

    case "contour":
      return (
        <svg className={`h-full w-full ${className}`} viewBox="0 0 400 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,200 Q100,120 200,180 T380,160" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <path d="M40,240 Q120,160 220,220 T400,200" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <path d="M60,280 Q140,200 240,260 T400,240" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <path d="M0,160 Q80,80 180,140 T360,120" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <path d="M0,320 Q80,240 180,300 T360,280" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <path d="M80,80 Q160,40 240,80 T400,60" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <path d="M80,360 Q160,320 240,360 T400,340" fill="none" stroke={strokeColor} strokeWidth="0.8" />
        </svg>
      );

    case "hex-grid":
      return (
        <svg className={`h-full w-full ${className}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-grid" width="48" height="56" patternUnits="userSpaceOnUse">
              <path
                d="M24 4 L44 14 L44 34 L24 44 L4 34 L4 14 Z"
                fill="none"
                stroke={strokeColor}
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-grid)" />
        </svg>
      );

    case "circuit-trace":
      return (
        <svg className={`h-full w-full ${className}`} viewBox="0 0 400 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,40 L120,40 L120,120 L200,120" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <path d="M40,120 L80,120 L80,200 L160,200 L160,280" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <path d="M200,40 L280,40 L280,100 L360,100" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <path d="M320,160 L360,160 L360,240 L280,240 L280,320" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <path d="M120,280 L120,360 L200,360" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="120" cy="120" r="3" fill={strokeColor} />
          <circle cx="200" cy="120" r="3" fill={strokeColor} />
          <circle cx="280" cy="100" r="3" fill={strokeColor} />
          <circle cx="160" cy="280" r="3" fill={strokeColor} />
          <circle cx="280" cy="240" r="3" fill={strokeColor} />
          <circle cx="120" cy="280" r="3" fill={strokeColor} />
        </svg>
      );

    case "radial":
      return (
        <svg className={`h-full w-full ${className}`} viewBox="0 0 400 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="280" cy="120" r="40" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="280" cy="120" r="80" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="280" cy="120" r="120" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="280" cy="120" r="160" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="280" cy="120" r="200" fill="none" stroke={strokeColor} strokeWidth="0.8" />
        </svg>
      );
  }
}
