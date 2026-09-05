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
      className="fixed right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated text-text-secondary transition-colors hover:text-text-primary"
      aria-label="Toggle theme"
    >
      {dimmed ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
