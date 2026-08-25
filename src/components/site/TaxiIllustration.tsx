export default function TaxiIllustration() {
  return (
    <svg
      viewBox="0 0 600 480"
      className="h-full w-full"
      role="img"
      aria-label="Taxi checker illustration"
    >
      <defs>
        <clipPath id="taxi-panel">
          <rect width="600" height="480" rx="28" />
        </clipPath>
        <radialGradient id="taxi-glow" cx="72%" cy="18%" r="65%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="taxi-checker"
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          <rect width="26" height="26" fill="#f59e0b" />
          <rect width="13" height="13" fill="#0f172a" />
          <rect x="13" y="13" width="13" height="13" fill="#0f172a" />
        </pattern>
        <clipPath id="taxi-body-clip">
          <path d="M20 110 C20 80 45 60 80 55 L120 20 C130 10 145 5 160 5 L300 5 C320 5 338 14 350 30 L378 68 C400 70 415 84 418 105 L420 128 C420 140 411 150 399 150 L28 150 C13 150 2 139 2 124 Z" />
        </clipPath>
      </defs>

      <g clipPath="url(#taxi-panel)">
        <rect width="600" height="480" fill="#111c34" />
        <circle cx="460" cy="90" r="220" fill="url(#taxi-glow)" />

        {/* decorative dots */}
        <circle cx="90" cy="90" r="4" fill="#f59e0b" opacity="0.6" />
        <circle cx="130" cy="70" r="3" fill="#ffffff" opacity="0.35" />
        <circle cx="520" cy="380" r="5" fill="#f59e0b" opacity="0.5" />
        <circle cx="70" cy="400" r="3" fill="#ffffff" opacity="0.3" />

        {/* car */}
        <g transform="translate(90,175)">
          <ellipse cx="210" cy="192" rx="200" ry="18" fill="#000000" opacity="0.25" />

          {/* body */}
          <path
            d="M20 110 C20 80 45 60 80 55 L120 20 C130 10 145 5 160 5 L300 5 C320 5 338 14 350 30 L378 68 C400 70 415 84 418 105 L420 128 C420 140 411 150 399 150 L28 150 C13 150 2 139 2 124 Z"
            fill="#ffffff"
          />

          {/* checker stripe painted across the middle of the car body */}
          <g clipPath="url(#taxi-body-clip)">
            <rect x="-30" y="88" width="470" height="44" fill="url(#taxi-checker)" transform="rotate(-3 210 110)" />
          </g>

          {/* windows */}
          <path
            d="M132 55 L156 22 C161 15 169 11 178 11 L292 11 C304 11 315 17 322 27 L346 60 Z"
            fill="#111c34"
            opacity="0.9"
          />
          <line x1="234" y1="55" x2="234" y2="14" stroke="#0f172a" strokeWidth="4" opacity="0.9" />

          {/* X-Partner badge on the stripe */}
          <g transform="rotate(-3 210 110)">
            <rect x="135" y="90" width="150" height="34" rx="17" fill="#ffffff" />
            <text
              x="210"
              y="113"
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontWeight="700"
              fontSize="19"
            >
              <tspan fill="#f59e0b">X-</tspan>
              <tspan fill="#0f172a">Partner</tspan>
            </text>
          </g>

          {/* wheels */}
          <circle cx="105" cy="152" r="34" fill="#0f172a" stroke="#ffffff" strokeWidth="6" />
          <circle cx="105" cy="152" r="12" fill="#ffffff" />
          <circle cx="345" cy="152" r="34" fill="#0f172a" stroke="#ffffff" strokeWidth="6" />
          <circle cx="345" cy="152" r="12" fill="#ffffff" />

          {/* mirrors */}
          <rect x="8" y="98" width="26" height="14" rx="4" fill="#f59e0b" />
          <rect x="388" y="98" width="26" height="14" rx="4" fill="#f59e0b" />
        </g>
      </g>
    </svg>
  );
}
