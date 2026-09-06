"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dimmed, setDimmed] = useState(false);

  useEffect(() => {
    if (dimmed) {
      document.documentElement.classList.add("dimmed");
    } else {
      document.documentElement.classList.remove("dimmed");
    }
  }, [dimmed]);

  return (
    <button
      onClick={() => setDimmed(!dimmed)}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated text-text-secondary transition-colors hover:bg-bg-elevated-hover hover:text-text-primary"
      aria-label="Toggle theme"
    >
      {dimmed ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
