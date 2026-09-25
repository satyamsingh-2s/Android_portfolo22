"use client";

import { useEffect, useRef, useState } from "react";
import {
  House,
  FolderKanban,
  Code2,
  Palette,
  Users,
  MessageCircle,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  {
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    label: "Projects",
    href: "#projects",
    icon: FolderKanban,
  },
  {
    label: "Skills",
    href: "#skills",
    icon: Code2,
  },
  {
    label: "Design",
    href: "#design",
    icon: Palette,
  },
  {
    label: "Leadership",
    href: "#leadership",
    icon: Users,
  },
  {
    label: "Let's talk",
    href: "#contact",
    icon: MessageCircle,
  },
];

export function Nav() {
  /*
   * -----------------------------------------
   * Compression
   *
   * 0 = fully expanded
   * 1 = fully compressed
   * -----------------------------------------
   */

  const [compression, setCompression] = useState(0);

  const targetCompression = useRef(0);
  const currentCompression = useRef(0);
  const lastScrollY = useRef(0);
  const animationFrame = useRef<number | null>(null);

  /*
   * -----------------------------------------
   * Smooth compression animation
   * -----------------------------------------
   */

  useEffect(() => {
    const animate = () => {
      const current = currentCompression.current;
      const target = targetCompression.current;

      const next = current + (target - current) * 0.1;

      currentCompression.current = next;
      setCompression(next);

      if (Math.abs(target - next) > 0.001) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        currentCompression.current = target;
        setCompression(target);
        animationFrame.current = null;
      }
    };

    const startAnimation = () => {
      if (animationFrame.current === null) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const delta = currentScrollY - lastScrollY.current;

      /*
       * Always fully expanded at the top.
       */
      if (currentScrollY <= 10) {
        targetCompression.current = 0;

        startAnimation();

        lastScrollY.current = currentScrollY;

        return;
      }

      /*
       * Ignore tiny movements.
       */
      if (Math.abs(delta) < 2) {
        return;
      }

      /*
       * Scroll DOWN
       * → compress navbar.
       */
      if (delta > 0) {
        targetCompression.current = 1;
      }

      /*
       * Scroll UP
       * → expand navbar.
       */
      else if (delta < 0) {
        targetCompression.current = 0;
      }

      lastScrollY.current = currentScrollY;

      startAnimation();
    };

    lastScrollY.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  /*
   * -----------------------------------------
   * Responsive navbar dimensions
   * -----------------------------------------
   *
   * Desktop:
   * Expanded  = 410px
   * Compressed = 54px
   *
   * Tablet:
   * Expanded  = 360px
   * Compressed = 54px
   *
   * Mobile:
   * Expanded  = 320px
   * Compressed = 54px
   * -----------------------------------------
   */

 const widthProgress = 1 - compression;

    const width = `calc(
      54px +
      ${widthProgress} *
      (min(410px, calc(100vw - 24px)) - 54px)
    )`;

  /*
   * -----------------------------------------
   * Height
   * -----------------------------------------
   */

  const height =
    58 - compression * 12;

  /*
   * -----------------------------------------
   * Padding
   * -----------------------------------------
   */

  const padding =
    6 - compression * 3;

  /*
   * -----------------------------------------
   * Gap
   * -----------------------------------------
   */

  const gap =
    4 - compression * 3;

  /*
   * -----------------------------------------
   * Slight physical scaling
   * -----------------------------------------
   */

  const scale =
    1 - compression * 0.08;

  /*
   * -----------------------------------------
   * Fade only during final stage
   * -----------------------------------------
   */

  const opacity = Math.max(
    0,
    1 -
      Math.max(
        0,
        compression - 0.72
      ) /
        0.28
  );

  /*
   * -----------------------------------------
   * Slight blur near the end
   * -----------------------------------------
   */

  const blur =
    Math.max(
      0,
      compression - 0.8
    ) * 4;

  /*
   * -----------------------------------------
   * Navigation content fades faster
   * than the outer pill.
   * -----------------------------------------
   */

  const contentOpacity =
    Math.max(
      0,
      1 - compression * 1.8
    );

  /*
   * -----------------------------------------
   * Responsive icon size
   * -----------------------------------------
   */

  const iconSize =
    typeof window !== "undefined" &&
    window.innerWidth < 640
      ? 18
      : 20;

  /*
   * -----------------------------------------
   * Icons become slightly smaller
   * while compressing.
   * -----------------------------------------
   */

  const iconScale =
    1 - compression * 0.18;

  /*
   * -----------------------------------------
   * Disable interaction when navbar
   * is practically gone.
   * -----------------------------------------
   */

  const isHidden =
    compression > 0.97;

  /*
   * -----------------------------------------
   * Navigation click
   * -----------------------------------------
   */

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    /*
     * Home
     */
    if (href === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    /*
     * Section
     */
    const target =
      document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    /*
     * -----------------------------------------
     * OUTER CENTERING CONTAINER
     * -----------------------------------------
     */

    <nav
      aria-label="Main navigation"
      className="
        fixed
        left-1/2
        top-4
        sm:top-5
        z-50
      "
      style={{
        width: 0,
        height: 0,
        pointerEvents: isHidden
          ? "none"
          : "auto",
      }}
    >
      {/*
       * ---------------------------------------
       * CENTERED NAVBAR WRAPPER
       * ---------------------------------------
       */}

      <div
        className="
          absolute
          left-1/2
          top-0
        "
        style={{
          transform:
            "translateX(-50%)",
        }}
      >
        {/*
         * -------------------------------------
         * NAVBAR
         *
         * IMPORTANT:
         * NO overflow-hidden.
         * -------------------------------------
         */}

        <div
          className="nav-shell
            relative
            flex
            items-center
            rounded-full
            border
            border-border-subtle
            bg-bg-elevated
            shadow-[0_10px_30px_rgba(0,0,0,0.28)]
            backdrop-blur-xl
          "
         style={{
                width,
                height: `${height}px`,
                padding: `${padding}px`,
                gap: `${gap}px`,
                opacity,
                filter: `blur(${blur}px)`,
                transform: `scale(${scale})`,
                transformOrigin: "center center",
              }}
        >
          {/*
           * -----------------------------------
           * NAVIGATION ITEMS
           * -----------------------------------
           */}

          <div
            className="
              flex
              h-full
              flex-1
              items-center
              justify-center
            "
            style={{
              gap: `${gap}px`,
              opacity: contentOpacity,
            }}
          >
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <div
                  key={link.href}
                  className="
                    group
                    relative
                    flex
                    h-full
                    min-w-0
                    flex-1
                    items-center
                    justify-center
                  "
                >
                  {/*
                   * --------------------------------
                   * ICON BUTTON
                   * --------------------------------
                   */}

                  <a
                    href={link.href}
                    aria-label={link.label}
                    onClick={(e) =>
                      handleNavClick(
                        e,
                        link.href
                      )
                    }
                    className={`
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      rounded-full
                      transition-colors
                      duration-200
                      ${
                        link.label ===
                        "Let's talk"
                          ? "text-accent hover:text-accent"
                          : "text-text-secondary hover:bg-bg-elevated-hover hover:text-text-primary"
                      }
                      active:scale-95
                    `}
                  >
                    <Icon
                      size={iconSize}
                      strokeWidth={1.9}
                      style={{
                        transform: `scale(${iconScale})`,
                      }}
                    />
                  </a>

                  {/*
                   * --------------------------------
                   * HOVER LABEL
                   * --------------------------------
                   *
                   * Hidden on smaller screens
                   * because mobile has no hover.
                   * --------------------------------
                   */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-[calc(100%+9px)]
                      z-[100]
                      hidden
                      -translate-x-1/2
                      translate-y-1
                      whitespace-nowrap
                      rounded-[9px]
                      border
                      border-border-subtle
                      bg-bg-elevated-hover
                      px-3
                      py-1.5
                      text-[13px]
                      font-medium
                      text-text-primary
                      opacity-0
                      shadow-lg
                      transition-all
                      duration-200
                      group-hover:translate-y-0
                      group-hover:opacity-100
                      sm:block
                    "
                    style={{
                      visibility:
                        compression < 0.15
                          ? "visible"
                          : "hidden",
                    }}
                  >
                    {link.label}

                    {/*
                     * Tooltip arrow
                     */}

                    <span
                      className="
                        absolute
                        left-1/2
                        top-0
                        h-1.5
                        w-1.5
                        -translate-x-1/2
                        -translate-y-1/2
                        rotate-45
                        border-l
                        border-t
                        border-border-subtle
                        bg-bg-elevated-hover
                      "
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/*
           * -----------------------------------
           * DIVIDER
           * -----------------------------------
           */}

          <div
            className="
              h-5
              w-px
              shrink-0
              bg-border-subtle
            "
            style={{
              opacity:
                contentOpacity,
            }}
          />

          {/*
           * -----------------------------------
           * THEME TOGGLE
           * -----------------------------------
           */}

          <div
            className="
              flex
              h-full
              w-9
              shrink-0
              items-center
              justify-center
              sm:w-10
            "
            style={{
              opacity:
                contentOpacity,
            }}
          >
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}