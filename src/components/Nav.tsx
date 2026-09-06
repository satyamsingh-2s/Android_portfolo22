"use client";

import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Design", href: "#design" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

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
      <div className="flex items-center gap-1 rounded-full border border-border-subtle bg-bg-elevated px-1 py-1">
        <Link
          to="/"
          className="px-4 py-2 font-display text-sm font-semibold text-text-primary"
        >
          Satyam
        </Link>
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
          className="ml-1 rounded-full bg-accent px-4 py-2 text-sm font-medium text-text-primary transition-transform hover:bg-accent/90 active:scale-[0.97]"
        >
          Let's talk
        </a>
      </div>
    </nav>
  );
}
