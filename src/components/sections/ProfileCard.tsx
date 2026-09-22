import { Globe2, Instagram, Linkedin } from "lucide-react";
import { profileCard } from "@/lib/data";

function CardBackdrop() {
  return (
    <svg className="profile-card-backdrop" viewBox="0 0 400 620" fill="none" aria-hidden="true">
      <defs>
        <pattern id="technical-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" stroke="currentColor" strokeWidth="0.55" />
        </pattern>
      </defs>
      <rect width="400" height="620" fill="url(#technical-grid)" opacity="0.38" />
      <path
        d="M-18 135C47 135 39 191 102 191c48 0 38-43 92-43M243 26v79c0 18 11 29 31 29h96M23 468c78 0 88 48 150 48 70 0 61-51 145-51M62 404c0-25 20-45 45-45h39"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <g fill="currentColor">
        <rect x="58" y="186" width="4" height="4" rx="0.5" />
        <rect x="240" y="102" width="4" height="4" rx="0.5" />
        <rect x="315" y="132" width="4" height="4" rx="0.5" />
        <rect x="168" y="514" width="4" height="4" rx="0.5" />
        <rect x="318" y="465" width="4" height="4" rx="0.5" />
        <circle cx="98" cy="358" r="1.5" />
        <circle cx="291" cy="208" r="1.5" />
        <circle cx="42" cy="468" r="1.5" />
      </g>
    </svg>
  );
}

function DeveloperMotif() {
  return (
    <div className="developer-motif" aria-hidden="true">
      <svg
        viewBox="0 0 330 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* =========================
            MOTION TRAILS
        ========================== */}
        <path
          d="M15 64H78"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.35"
        />

        <path
          d="M7 70H58"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.3"
        />

        <path
          d="M20 76H69"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.25"
        />

        {/* =========================
            MAIN FLOWING PATH
        ========================== */}
        <path
          d="
            M44 80
            C78 80 108 81 132 77
            C153 73 160 60 177 57
            C190 55 199 55 214 55
            H232
          "
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {/* =========================
            SMALL MOTION DETAILS
        ========================== */}
        <path
          d="M76 39H94"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.3"
        />

        <path
          d="M73 46H97"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.25"
        />

        <path
          d="M78 53H93"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.2"
        />

        {/* =========================
    ANDROID MASCOT
========================== */}
<g transform="translate(99 17) scale(0.8)">
  <g
    className="android-mascot"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* ---- Antennas ---- */}
    <path
      d="M13 11L7 2"
      strokeWidth="1.6"
    />

    <path
      d="M31 11L37 2"
      strokeWidth="1.6"
    />

    {/* ---- Head ---- */}
    <path
      d="
        M8 19
        C8 10.8 14.2 5 22 5
        C29.8 5 36 10.8 36 19
        V25
        H8
        V19Z
      "
      fill="var(--profile-card-surface)"
      strokeWidth="1.7"
    />

    {/* ---- Eyes ---- */}
    <circle
      cx="16"
      cy="17"
      r="1.35"
      fill="currentColor"
      stroke="none"
    />

    <circle
      cx="28"
      cy="17"
      r="1.35"
      fill="currentColor"
      stroke="none"
    />

    {/* ---- Body ---- */}
    <rect
      x="10"
      y="26"
      width="24"
      height="25"
      rx="3"
      fill="var(--profile-card-surface)"
      strokeWidth="1.7"
    />

    {/* ---- LEFT HAND ---- */}
    <rect
      x="2"
      y="27"
      width="6"
      height="20"
      rx="3"
      fill="var(--profile-card-surface)"
      strokeWidth="1.7"
    />

    {/* ---- RIGHT HAND ---- */}
    <rect
      x="36"
      y="27"
      width="6"
      height="20"
      rx="3"
      fill="var(--profile-card-surface)"
      strokeWidth="1.7"
    />

    {/* ---- LEFT LEG ---- */}
    <path
      d="
        M15 51
        V60
        C15 63 17 65 20 65
        V51
      "
      fill="var(--profile-card-surface)"
      strokeWidth="1.7"
    />

    {/* ---- RIGHT LEG ---- */}
    <path
      d="
        M24 51
        V65
        C27 65 29 63 29 60
        V51
      "
      fill="var(--profile-card-surface)"
      strokeWidth="1.7"
    />

    {/* ---- ANDROID MOVEMENT ---- */}
    <animateTransform
      attributeName="transform"
      type="translate"
      values="0 0; 58 0; 0 0"
      dur="4.8s"
      repeatCount="indefinite"
      calcMode="spline"
      keyTimes="0; 0.5; 1"
      keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
    />
  </g>
</g>

        {/* =========================
            CODE TERMINAL
        ========================== */}
        <g transform="translate(232 25)">
          {/* Terminal body */}
          <rect
            width="72"
            height="45"
            rx="8"
            fill="var(--profile-card-surface)"
            stroke="currentColor"
            strokeWidth="1.1"
          />

          {/* Header separator */}
          <path
            d="M0 13H72"
            stroke="currentColor"
            strokeWidth="0.9"
            opacity="0.7"
          />

          {/* Terminal dots */}
          <circle
            cx="10"
            cy="7"
            r="1.6"
            fill="currentColor"
          />

          <circle
            cx="16"
            cy="7"
            r="1.6"
            fill="currentColor"
            opacity="0.65"
          />

          <circle
            cx="22"
            cy="7"
            r="1.6"
            fill="currentColor"
            opacity="0.4"
          />

          {/* Code symbol */}
          <path
            d="
              M25 26
              L18 31
              L25 36

              M46 26
              L53 31
              L46 36

              M41 23
              L36 40
            "
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

export function ProfileCard() {
  return (
    <article className="profile-card h-full w-full">
      <CardBackdrop />
      <div className="profile-card-content">
        <header className="profile-card-header">
          <span>PROFILE</span>
          <span className="profile-status-dot" aria-label="Available" />
        </header>
        <div className="profile-identity">
          <aside className="profile-mantra" aria-hidden="true">
            <span>LEARN</span>
            <span className="typing-code">CODE </span>
            <span>REPEAT</span>
            <i />
          </aside>
          <div className="profile-photo">
            <img className="profile-photo-dark" src={profileCard.image} alt={profileCard.name} />
            <img className="profile-photo-light" src={profileCard.lightImage} alt={profileCard.name} />
          </div>
          <p>{profileCard.description}</p>
          <nav className="profile-socials" aria-label="Profile links">
            <a
              href={profileCard.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
            <a
              href={profileCard.social.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
            >
              <Globe2 />
            </a>
            <a
              href={profileCard.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>
          </nav>
        </div>
        <DeveloperMotif />
        <footer className="profile-card-footer">
          <i />
          <span>KEEP BUILDING</span>
        </footer>
      </div>
    </article>
  );
}
