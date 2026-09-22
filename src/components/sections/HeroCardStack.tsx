import { Globe2, Github } from "lucide-react";
import { useState } from "react";
import { omegaProject } from "@/lib/data";
import { StaggerContainer } from "@/components/AnimatedSection";
import { ProfileCard } from "./ProfileCard";

type ActiveCard = "building" | "profile";

function AndroidCatPeek() {
  return (
    <div className="android-cat-peek" aria-hidden="true">
      {/* Face + ears — moves down behind the card */}
      <div className="android-cat-face-layer">
        <svg
          viewBox="0 0 180 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
                  {/* Left ear */}
          <path
            className="android-cat-ear"
            d="M48 42L36 12L62 30Z"
          />
          <path
            className="android-cat-ear-inner"
            d="M43 22L48 34L54 29"
          />

          {/* Right ear */}
          <path
            className="android-cat-ear"
            d="M132 42L144 12L118 30Z"
          />
          <path
            className="android-cat-ear-inner"
            d="M137 22L132 34L126 29"
          />

          {/* Android head */}
         {/* Android-style semicircular head */}
          <path
            className="android-cat-head"
            d="
              M43 56
              A47 29 0 0 1 137 56
              V76
              Q137 89 124 89
              H56
              Q43 89 43 76
              Z
            "
            fill="#0d0f0e"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Eyes */}
          <circle
            cx="70"
            cy="53"
            r="6.5"
            fill="#ffffff"
            stroke="none"
          />

          <circle
            cx="110"
            cy="53"
            r="6.5"
            fill="#ffffff"
            stroke="none"
          />

          {/* Small cat mouth */}
          <path
            d="M82 68Q90 75 98 68"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Paws — remain visible while face hides */}
      <svg
        className="android-cat-paws"
        viewBox="0 0 180 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
              <path
          d="M49 82C42 78 34 80 31 87C28 94 33 98 40 97C46 96 50 93 54 89"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M131 82C138 78 146 80 149 87C152 94 147 98 140 97C134 96 130 93 126 89"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

    {/* Three orange curiosity lines */}
<svg
  className="android-cat-spark"
  viewBox="0 0 40 40"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Short vertical line */}
  <path d="M14 15L14 7" />

  {/* Middle diagonal line */}
  <path d="M22 17L25 9" />

  {/* Outer diagonal line */}
  <path d="M29 21L35 15" />
</svg>
    </div>
  );
}

function CurrentlyBuildingCard() {
  return (
  <div className="currently-building-card h-full rounded-[28px] border border-border-subtle bg-bg-elevated p-5 sm:p-6">
      <StaggerContainer staggerDelay={0.07} distance={10}>
        <div className="flex items-center justify-between">
          <span className="font-mono-label text-[0.66rem] tracking-[0.15em] text-text-tertiary">
            CURRENTLY BUILDING
          </span>
          <span className="live-dot" aria-hidden="true" />
        </div>
        <div className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl">
          <img
            src="/images/omega_portfolio_hero2.png"
            alt="Omega productivity app"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-5 flex items-center gap-2">
          <a
            href={omegaProject.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Omega on GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-primary text-text-secondary transition-all duration-200 hover:border-accent hover:text-accent"
          >
            <Github size={17} strokeWidth={1.8} />
          </a>
          <a
            href={omegaProject.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Omega website"
            className="website-nudge inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-primary text-text-secondary transition-all duration-200 hover:border-accent hover:text-accent"
          >
            <Globe2 size={17} strokeWidth={1.8} />
          </a>
        </div>
        <div className="mt-5">
          <p className="font-mono-label text-[0.58rem] tracking-[0.14em] text-text-tertiary">
            CURRENTLY
          </p>
          <p className="mt-2 font-display text-[0.65rem] font-semibold uppercase leading-[1.22] tracking-[0.02em] text-accent sm:text-[0.7rem]">
            Publishing on Playstore - Closed testing phase
          </p>
        </div>
        <div className="mt-4">
          <div className="progress-track" role="presentation">
            <div className="progress-fill">
              <div className="progress-sheen" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="mt-5 border-t border-border-subtle" />
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="font-mono-label text-[0.64rem] tracking-[0.14em] text-text-tertiary">
              CURRENT STATUS
            </span>
            <span className="live-dot live-dot-available status-live-dot" aria-hidden="true" />
          </div>
          <p className="mt-3 text-[0.84rem] font-medium leading-snug text-text-secondary">
            Intern at SunsysTechsol pvt. Ltd.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="font-mono-label text-[0.66rem] font-medium tracking-[0.12em] text-[var(--status-green)]">
              OPEN TO WORK
            </span>
          </div>
        </div>
      </StaggerContainer>
    </div>
  );
}

export function HeroCardStack() {
  const [activeCard, setActiveCard] = useState<ActiveCard>("profile");
  const profileIsActive = activeCard === "profile";

  return (
    <div
      className={`hero-card-stack ${profileIsActive ? "is-profile-active" : "is-building-active"}`}
    >
      <div className="hero-profile-card">
        <div className="hero-card-face" inert={!profileIsActive}>
          <ProfileCard />
        </div>
        {!profileIsActive && (
          <button
            type="button"
            className="hero-card-preview-trigger"
            onClick={() => setActiveCard("profile")}
            aria-label="View Profile"
          />
        )}
      </div>
      <div className="hero-current-card">
          {profileIsActive && <AndroidCatPeek />}

        <div className="hero-card-face" inert={profileIsActive}>
          <CurrentlyBuildingCard />
        </div>
        {profileIsActive && (
          <button
            type="button"
            className="hero-card-preview-trigger"
            onClick={() => setActiveCard("building")}
            aria-label="View Currently Building"
          />
        )}
      </div>
    </div>
  );
}
