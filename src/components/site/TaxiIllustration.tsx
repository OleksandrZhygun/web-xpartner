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
        <pattern id="taxi-checker" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#f59e0b" />
          <rect width="12" height="12" fill="#0f172a" />
          <rect x="12" y="12" width="12" height="12" fill="#0f172a" />
        </pattern>
      </defs>

      <g clipPath="url(#taxi-panel)">
        <rect width="600" height="480" fill="#0f1e3a" />

        {/* decorative dots */}
        <circle cx="90" cy="90" r="6" fill="#f59e0b" />
        <circle cx="520" cy="235" r="6" fill="#94a3b8" />
        <circle cx="170" cy="420" r="6" fill="#94a3b8" />
        <circle cx="500" cy="415" r="5" fill="#b45309" />

        {/* shadow */}
        <ellipse cx="300" cy="368" rx="260" ry="20" fill="#000000" opacity="0.35" />

        {/* body */}
        <rect x="30" y="222" width="540" height="112" rx="55" fill="#ffffff" />

        {/* cabin */}
        <path d="M150 232 Q150 82 295 82 Q440 82 440 232 Z" fill="#ffffff" />

        {/* roof light */}
        <rect x="262" y="52" width="76" height="42" rx="16" fill="#f59e0b" />

        {/* windows */}
        <path d="M167 224 Q167 108 291 100 L291 224 Z" fill="#0f1e3a" />
        <path d="M299 100 Q423 108 423 224 L299 224 Z" fill="#0f1e3a" />

        {/* checker stripes on the doors, gap in the middle for the logo */}
        <rect x="55" y="262" width="150" height="46" fill="url(#taxi-checker)" />
        <rect x="395" y="262" width="150" height="46" fill="url(#taxi-checker)" />

        {/* logo on the body, centered in the stripe gap */}
        <text
          x="300"
          y="296"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="34"
        >
          <tspan fill="#f59e0b">X-</tspan>
          <tspan fill="#0f1e3a">Partner</tspan>
        </text>

        {/* mirror */}
        <line x1="60" y1="300" x2="24" y2="322" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />

        {/* wheels */}
        <circle cx="140" cy="332" r="46" fill="#0f1e3a" stroke="#ffffff" strokeWidth="7" />
        <circle cx="140" cy="332" r="16" fill="#ffffff" />
        <circle cx="460" cy="332" r="46" fill="#0f1e3a" stroke="#ffffff" strokeWidth="7" />
        <circle cx="460" cy="332" r="16" fill="#ffffff" />
      </g>
    </svg>
  );
}
