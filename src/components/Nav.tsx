"use client";

import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { FolderKanban, Code2, Palette, Users, MessageCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = [
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "Skills", href: "#skills", icon: Code2 },
  { label: "Design", href: "#design", icon: Palette, hideAtTightWidth: true },
  { label: "Leadership", href: "#leadership", icon: Users },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all duration-300 ${
        scrolled ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
      }`}
    >
      <style>{`
        /* Hide Design (Palette) icon below 360px to enforce single-row nav at 320px.
           Never wrap to two rows; drop least-essential icon first per spec. */
        @media (max-width: 359px) {
          .nav-icon-tight-drop {
            display: none !important;
          }
        }
      `}</style>

      <div className="flex items-center gap-1 rounded-full border border-border-subtle bg-bg-elevated px-1.5 py-1.5 max-w-[calc(100vw-24px)] overflow-hidden flex-nowrap">
        <Link
          to="/"
          className="shrink-0 rounded-full px-2.5 py-1.5 font-display text-[13px] font-semibold text-text-primary md:px-4 md:text-sm"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {isMobile ? "SS" : "Satyam"}
        </Link>

        {isMobile ? (
          /* ===== Mobile: icon-only row ===== */
          <>
            <div className="mx-0.5 flex items-center gap-0.5 md:hidden">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-label={link.label}
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-elevated-hover hover:text-text-primary ${
                      link.hideAtTightWidth ? "nav-icon-tight-drop" : ""
                    }`}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </a>
                );
              })}
              {/* Let's talk icon */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                aria-label="Let's talk"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-text-primary transition-transform hover:bg-accent/90 active:scale-[0.97]"
              >
                <MessageCircle size={18} strokeWidth={2} />
              </a>
            </div>
          </>
        ) : (
          /* ===== Desktop: text labels ===== */
          <>
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="rounded-full px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-bg-elevated-hover hover:text-text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="ml-1 shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-medium text-text-primary transition-transform hover:bg-accent/90 active:scale-[0.97] md:block hidden"
            >
              Let's talk
            </a>
          </>
        )}

        <div className="ml-0.5 shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
