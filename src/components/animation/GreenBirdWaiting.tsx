export function OrangeCatWaiting() {
  return (
    <div
      className="orange-cat-waiting"
      role="img"
      aria-label="Orange cat waiting patiently for backend to start"
    >
      <svg viewBox="0 0 130 100" className="orange-cat-svg" aria-hidden="true">
        <ellipse cx="64" cy="78" rx="30" ry="8" className="orange-cat-shadow" />

        <g className="orange-cat-body-group">
          <path
            d="M31 52C27 35 38 22 62 22C86 22 100 34 100 53C100 68 86 80 64 80C42 80 35 68 31 52Z"
            className="orange-cat-body"
          />

          <path d="M47 22L37 8L51 15Z" className="orange-cat-ear" />
          <path d="M81 22L91 8L77 15Z" className="orange-cat-ear" />

          <path d="M17 58C4 61 3 73 10 81C19 74 20 67 17 58Z" className="orange-cat-tail" />

          <path d="M47 38C52 34 58 34 64 38" className="orange-cat-stripe" />
          <path d="M64 38C70 34 76 34 81 38" className="orange-cat-stripe" />

          <path d="M27 41L39 45" className="orange-cat-whisker" />
          <path d="M27 49L39 47" className="orange-cat-whisker" />
          <path d="M101 41L89 45" className="orange-cat-whisker" />
          <path d="M101 49L89 47" className="orange-cat-whisker" />

          <circle cx="51" cy="43" r="4.2" className="orange-cat-eye" />
          <circle cx="77" cy="43" r="4.2" className="orange-cat-eye" />
          <circle cx="52.5" cy="41.7" r="1.3" className="orange-cat-eye-dot" />
          <circle cx="78.5" cy="41.7" r="1.3" className="orange-cat-eye-dot" />

          <path d="M64 49C61 53 60 55 60 59C61 60 63 60 66 59C66 55 65 53 64 49Z" className="orange-cat-nose" />

          <path d="M42 60C46 66 49 69 52 73" className="orange-cat-paw" />
          <path d="M64 60C67 66 70 69 73 73" className="orange-cat-paw" />
          <path d="M85 60C89 66 92 69 95 73" className="orange-cat-paw" />

          <path d="M42 74L47 73L44 79" className="orange-cat-claw" />
          <path d="M64 74L69 73L66 79" className="orange-cat-claw" />
          <path d="M85 74L90 73L87 79" className="orange-cat-claw" />
        </g>
      </svg>
    </div>
  );
}
