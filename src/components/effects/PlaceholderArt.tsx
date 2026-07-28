import { accentHex, hashToUnit } from "@/lib/utils";

type Accent = keyof typeof accentHex;

/**
 * Deterministic generated cover art, used everywhere a real photograph or
 * screenshot is not yet available. The pattern is derived from the seed
 * string, so a given project always renders the same artwork.
 *
 * Replace with a real <Image /> as assets arrive — see docs/ASSETS-NEEDED.md.
 */
export function PlaceholderArt({
  seed,
  accent = "electric",
  label,
  className,
}: {
  seed: string;
  accent?: Accent;
  label?: string;
  className?: string;
}) {
  const unit = hashToUnit(seed);
  const color = accentHex[accent];
  const rings = 4 + Math.round(unit * 3);
  const id = `art-${seed.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg
      viewBox="0 0 400 260"
      role="img"
      aria-label={label ? `${label} — placeholder artwork` : "Placeholder artwork"}
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b0e16" />
          <stop offset="100%" stopColor="#141824" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx={`${28 + unit * 44}%`} cy="34%">
          <stop offset="0%" stopColor={color} stopOpacity="0.42" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0H0V26" fill="none" stroke={color} strokeOpacity="0.12" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="400" height="260" fill={`url(#${id}-bg)`} />
      <rect width="400" height="260" fill={`url(#${id}-grid)`} />
      <rect width="400" height="260" fill={`url(#${id}-glow)`} />

      {Array.from({ length: rings }).map((_, index) => (
        <circle
          key={index}
          cx={120 + unit * 160}
          cy={130}
          r={22 + index * (16 + unit * 10)}
          fill="none"
          stroke={color}
          strokeOpacity={0.32 - index * 0.04}
          strokeWidth="1"
        />
      ))}

      <path
        d={`M0 ${190 + unit * 20} Q 100 ${150 + unit * 40} 200 ${185 - unit * 30} T 400 ${160 + unit * 30}`}
        fill="none"
        stroke={color}
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      <circle cx={120 + unit * 160} cy={130} r="3.5" fill={color} />
    </svg>
  );
}

/** Generated avatar used until real photography is supplied. */
export function PlaceholderAvatar({
  name,
  accent = "electric",
  className,
}: {
  name: string;
  accent?: Accent;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  const color = accentHex[accent];
  const id = `avatar-${initials}`;

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={`${name} — placeholder portrait`}
      className={className}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d1018" />
          <stop offset="100%" stopColor="#171c29" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="18%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="24" fill={`url(#${id}-bg)`} />
      <rect width="200" height="200" rx="24" fill={`url(#${id}-glow)`} />
      <circle cx="100" cy="100" r="66" fill="none" stroke={color} strokeOpacity="0.28" />
      <circle cx="100" cy="100" r="86" fill="none" stroke={color} strokeOpacity="0.14" />
      <text
        x="100"
        y="100"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-display), sans-serif"
        fontSize="56"
        fontWeight="600"
        fill="#f4f6fb"
        opacity="0.9"
      >
        {initials}
      </text>
    </svg>
  );
}
