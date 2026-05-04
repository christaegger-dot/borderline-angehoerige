/**
 * FadenIllustration
 *
 * Hero-Illustration für /kommunizieren.
 *
 * Botschaft: «Verbindung entsteht durch zarte Brücken, nicht durch Drücken.»
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

interface FadenIllustrationProps {
  className?: string;
  /** Optionaler Accessible Label. Wenn nicht gesetzt, ist die Illustration dekorativ (aria-hidden). */
  ariaLabel?: string;
}

export default function FadenIllustration({
  className,
  ariaLabel,
}: FadenIllustrationProps) {
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
        <radialGradient id="fad-halo" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#f5e6d8" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#e9d6c8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e9d6c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fad-island" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6b4658" />
          <stop offset="100%" stopColor="#3f2935" />
        </linearGradient>
        <radialGradient id="fad-light" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5e6d8" stopOpacity="1" />
          <stop offset="35%" stopColor="#f4d8a8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f4d8a8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Cream halo (centered between islands) */}
      <ellipse cx="240" cy="220" rx="220" ry="160" fill="url(#fad-halo)" />

      {/* Stars in atmosphere */}
      <circle cx="80" cy="120" r="1.8" fill="#5b3a4e" opacity="0.55" />
      <circle cx="400" cy="115" r="2" fill="#5b3a4e" opacity="0.55" />
      <circle cx="60" cy="200" r="1.5" fill="#4f6b5e" opacity="0.5" />
      <circle cx="420" cy="190" r="1.6" fill="#4f6b5e" opacity="0.5" />
      <circle cx="160" cy="80" r="1.3" fill="#5b3a4e" opacity="0.5" />
      <circle cx="320" cy="70" r="1.5" fill="#5b3a4e" opacity="0.5" />
      <circle cx="240" cy="55" r="1.6" fill="#4f6b5e" opacity="0.55" />

      {/* Sage water/horizon */}
      <path
        d="M0,340 Q120,330 240,335 Q360,340 480,332 L480,400 L0,400 Z"
        fill="#dde1d4"
        opacity="0.55"
      />
      <path
        d="M0,360 Q140,355 280,362 Q380,365 480,358 L480,400 L0,400 Z"
        fill="#c4cebd"
        opacity="0.45"
      />

      {/* Connecting thread (curved, between islands) */}
      <path
        d="M130,290 Q175,200 240,210 Q305,220 350,290"
        stroke="#5b3a4e"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Thread inner highlight */}
      <path
        d="M135,288 Q180,205 240,213 Q300,222 348,288"
        stroke="#f5ece6"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Light point in middle of thread (the connection) */}
      <circle cx="240" cy="210" r="22" fill="url(#fad-light)" />
      <circle cx="240" cy="210" r="6" fill="#f5ece6" />
      <circle cx="240" cy="210" r="2.5" fill="#fff" />

      {/* Left island */}
      <ellipse
        cx="125"
        cy="305"
        rx="48"
        ry="14"
        fill="#5b3a4e"
        opacity="0.25"
      />
      <path
        d="M80,305 Q88,272 110,260 Q132,253 155,263 Q175,275 172,300 Q168,315 145,318 Q120,320 100,315 Q86,312 80,305 Z"
        fill="url(#fad-island)"
      />
      {/* island figure marker (a small luminous point — a person/home) */}
      <circle cx="125" cy="276" r="6" fill="#f4d8a8" opacity="0.95" />
      <circle cx="125" cy="276" r="2.5" fill="#fff" />

      {/* Right island */}
      <ellipse
        cx="355"
        cy="305"
        rx="48"
        ry="14"
        fill="#5b3a4e"
        opacity="0.25"
      />
      <path
        d="M310,305 Q318,272 340,260 Q362,253 385,263 Q405,275 402,300 Q398,315 375,318 Q350,320 330,315 Q316,312 310,305 Z"
        fill="url(#fad-island)"
      />
      {/* island figure marker */}
      <circle cx="355" cy="276" r="6" fill="#f4d8a8" opacity="0.95" />
      <circle cx="355" cy="276" r="2.5" fill="#fff" />

      {/* Hand-drawn ground line */}
      <path
        d="M40,395 Q240,385 440,395"
        stroke="#5b3a4e"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
