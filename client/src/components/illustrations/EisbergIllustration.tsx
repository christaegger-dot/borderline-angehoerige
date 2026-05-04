/**
 * EisbergIllustration
 *
 * Hero-Illustration für /verstehen.
 *
 * Botschaft: «Was du siehst, ist nicht alles. Unter der Oberfläche liegt mehr.»
 *
 * Teil der Tier-A-Illustrations-Familie für die Borderline-Angehörige-Site.
 * Konsistente Bildsprache mit den anderen Tier-A-Heros (Leuchtturm,
 * Eisberg, Faden, Bogen, Schale, Aufgang): Cream-Halo, Sage-Hügel als
 * Erdung, Aubergine als primäre Form, Cream-Lichtkern als emotionaler
 * Anker, kleine Stern-Konstellationen, Hand-drawn Bodenlinie.
 *
 * Farben sind als Hex-Werte hardcoded und auf die aktuelle Token-Palette
 * abgestimmt (--accent-primary #5b3a4e, --accent-label #4f6b5e).
 * Bei Theme-Änderungen müssen die Werte hier nachgezogen werden.
 */

interface EisbergIllustrationProps {
  className?: string;
  /** Optionaler Accessible Label. Wenn nicht gesetzt, ist die Illustration dekorativ (aria-hidden). */
  ariaLabel?: string;
}

export default function EisbergIllustration({
  className,
  ariaLabel,
}: EisbergIllustrationProps) {
  return (
    <svg
      viewBox="0 0 480 480"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      <defs>
        <radialGradient id="eis-halo" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#f5e6d8" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#e9d6c8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e9d6c8" stopOpacity="0" />
        </radialGradient>

        {/* Tip facets: lighter cream-aubergine, hit by light */}
        <linearGradient id="eis-tip-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a08594" />
          <stop offset="100%" stopColor="#7a5066" />
        </linearGradient>
        <linearGradient id="eis-tip-mid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7a5066" />
          <stop offset="100%" stopColor="#5b3a4e" />
        </linearGradient>
        <linearGradient id="eis-tip-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a2f3f" />
          <stop offset="100%" stopColor="#3a2632" />
        </linearGradient>

        {/* Underwater facets: deeper, muted */}
        <linearGradient id="eis-deep-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5b3a4e" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#4a2f3f" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="eis-deep-mid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a2f3f" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#3a2632" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="eis-deep-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a2632" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2a1c24" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Cream halo */}
      <circle cx="240" cy="200" r="170" fill="url(#eis-halo)" />

      {/* Stars in upper atmosphere */}
      <circle cx="120" cy="100" r="1.8" fill="#5b3a4e" opacity="0.55" />
      <circle cx="360" cy="90" r="2" fill="#5b3a4e" opacity="0.55" />
      <circle cx="380" cy="155" r="1.4" fill="#4f6b5e" opacity="0.5" />
      <circle cx="100" cy="180" r="1.5" fill="#4f6b5e" opacity="0.5" />
      <circle cx="395" cy="220" r="1.8" fill="#5b3a4e" opacity="0.45" />
      <circle cx="85" cy="240" r="1.6" fill="#5b3a4e" opacity="0.45" />
      <circle cx="180" cy="80" r="1.2" fill="#4f6b5e" opacity="0.5" />
      <circle cx="300" cy="55" r="1.5" fill="#5b3a4e" opacity="0.5" />

      {/* TIP — angular, faceted, asymmetric. Off-center (peak at x≈215) so the shape feels alive, not symmetric. */}
      {/* Light face (left, hit by light from upper-left) */}
      <polygon
        points="215,135 195,200 240,260 240,200"
        fill="url(#eis-tip-light)"
      />
      {/* Mid face (centered front) */}
      <polygon
        points="215,135 240,200 240,260 195,200"
        fill="url(#eis-tip-mid)"
        opacity="0"
      />
      {/* Shadow face (right, in shadow) */}
      <polygon
        points="215,135 240,200 268,260 240,260"
        fill="url(#eis-tip-shadow)"
      />
      {/* Front spike facet (smaller, foreground depth) */}
      <polygon
        points="200,205 213,180 235,255 195,255"
        fill="url(#eis-tip-mid)"
        opacity="0.85"
      />

      {/* Crisp facet edges */}
      <path
        d="M215,135 L240,260"
        stroke="#f5ece6"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <path
        d="M215,135 L195,200 L240,260"
        stroke="#3a2632"
        strokeWidth="0.4"
        opacity="0.4"
        fill="none"
      />

      {/* Water line (clear horizon, slight wave, visible foam-line) */}
      <path
        d="M30,260 Q120,257 240,261 Q360,265 450,259"
        stroke="#7a8a82"
        strokeWidth="1.4"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M30,265 Q120,263 240,266 Q360,268 450,264"
        stroke="#7a8a82"
        strokeWidth="0.6"
        fill="none"
        opacity="0.35"
      />

      {/* UNDERWATER MASS — angular, faceted, MUCH bigger than tip (~7×), spreading wide */}
      {/* Main body — irregular polygon with multiple facets, asymmetric to match tip */}
      {/* Front-left facet (lighter) */}
      <polygon
        points="195,260 100,310 105,395 195,420 240,395 240,260"
        fill="url(#eis-deep-light)"
      />
      {/* Front-right facet (mid) */}
      <polygon
        points="240,260 240,395 305,420 380,385 375,310 285,260"
        fill="url(#eis-deep-mid)"
      />
      {/* Bottom-left facet (deep shadow) */}
      <polygon
        points="105,395 195,420 240,440 240,395"
        fill="url(#eis-deep-shadow)"
      />
      {/* Bottom-right facet (deep shadow) */}
      <polygon
        points="240,440 240,395 305,420 350,425"
        fill="url(#eis-deep-shadow)"
        opacity="0.95"
      />
      {/* Far-right small facet (wraps around) */}
      <polygon
        points="375,310 380,385 350,425 305,420"
        fill="url(#eis-deep-shadow)"
        opacity="0.85"
      />
      {/* Top ridge — slight overhang where ice sits at waterline */}
      <polygon points="195,260 285,260 240,275" fill="#3a2632" opacity="0.6" />

      {/* Crisp facet seams (the geometry that says "iceberg") */}
      <path
        d="M195,260 L100,310 L105,395 L195,420 L240,440 L305,420 L350,425 L380,385 L375,310 L285,260"
        stroke="#1a0e15"
        strokeWidth="0.8"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M240,260 L240,395 L240,440"
        stroke="#f5ece6"
        strokeWidth="0.5"
        opacity="0.18"
      />
      <path
        d="M195,260 L240,395"
        stroke="#1a0e15"
        strokeWidth="0.4"
        opacity="0.3"
        fill="none"
      />
      <path
        d="M285,260 L240,395"
        stroke="#1a0e15"
        strokeWidth="0.4"
        opacity="0.3"
        fill="none"
      />
      <path
        d="M105,395 L240,395 L380,385"
        stroke="#1a0e15"
        strokeWidth="0.5"
        opacity="0.35"
        fill="none"
      />

      {/* Subtle highlight catching the upper-left edge underwater */}
      <path
        d="M195,265 L102,312"
        stroke="#a8a0a8"
        strokeWidth="0.8"
        opacity="0.35"
      />

      {/* Hand-drawn ground line */}
      <path
        d="M40,460 Q240,452 440,460"
        stroke="#5b3a4e"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
