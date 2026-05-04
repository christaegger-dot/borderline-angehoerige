/**
 * AufgangIllustration
 *
 * Hero-Illustration für /genesung.
 *
 * Botschaft: «Genesung als Bewegung, nicht als Ankunft.»
 *
 * Ein gewundener Pfad mit Rückschwüngen, vier Wegmarkern für vergangene
 * Stationen und einem warmen Lichtpunkt als aktuelle Position. Der Pfad
 * verschwindet am oberen Rand des Bildes statt einen Zielpunkt zu zeigen
 * — Genesung ist kein Ziel, sondern eine Richtung.
 *
 * Teil der Tier-A-Illustrations-Familie für die Borderline-Angehörige-Site.
 * Konsistente Bildsprache mit den anderen Tier-A-Heros: Cream-Halo,
 * Sage-Hügel als Erdung, Aubergine als primäre Form, Cream-Lichtkern,
 * kleine Stern-Konstellationen, Hand-drawn Bodenlinie.
 *
 * Farben sind als Hex-Werte hardcoded und auf die aktuelle Token-Palette
 * abgestimmt (--accent-primary #5b3a4e, --accent-label #4f6b5e).
 */

interface AufgangIllustrationProps {
  className?: string;
  /** Optionaler Accessible Label. Wenn nicht gesetzt, ist die Illustration dekorativ (aria-hidden). */
  ariaLabel?: string;
}

export default function AufgangIllustration({
  className,
  ariaLabel,
}: AufgangIllustrationProps) {
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
        <radialGradient id="auf-halo" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#f5e6d8" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#e9d6c8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#e9d6c8" stopOpacity="0" />
        </radialGradient>

        {/* Path gradient: starts deep aubergine, lightens as it ascends */}
        <linearGradient id="auf-path" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#3a2632" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#5b3a4e" stopOpacity="0.85" />
          <stop offset="75%" stopColor="#7a5066" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#a08594" stopOpacity="0.3" />
        </linearGradient>

        {/* Subtle warm glow on the upper part of the path */}
        <radialGradient id="auf-light" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5e6d8" stopOpacity="1" />
          <stop offset="50%" stopColor="#f4d8a8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f4d8a8" stopOpacity="0" />
        </radialGradient>

        {/* Soft fade-out mask for path leaving the frame at top */}
        <linearGradient id="auf-fade" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="80%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="auf-mask">
          <rect x="0" y="0" width="480" height="480" fill="url(#auf-fade)" />
        </mask>
      </defs>

      {/* Cream halo */}
      <circle cx="240" cy="240" r="190" fill="url(#auf-halo)" />

      {/* Stars in atmosphere */}
      <circle cx="100" cy="80" r="1.8" fill="#5b3a4e" opacity="0.55" />
      <circle cx="395" cy="75" r="2" fill="#5b3a4e" opacity="0.55" />
      <circle cx="65" cy="150" r="1.5" fill="#4f6b5e" opacity="0.45" />
      <circle cx="420" cy="140" r="1.6" fill="#4f6b5e" opacity="0.45" />
      <circle cx="180" cy="55" r="1.3" fill="#5b3a4e" opacity="0.5" />
      <circle cx="320" cy="50" r="1.5" fill="#5b3a4e" opacity="0.5" />
      <circle cx="60" cy="220" r="1.4" fill="#5b3a4e" opacity="0.45" />
      <circle cx="425" cy="215" r="1.5" fill="#5b3a4e" opacity="0.45" />

      {/* THE PATH — winding line, not linear, with setbacks. Starts at lower-right
      (entrance), winds left, swings right, swings back left, and fades out as
      it leaves the top of the frame (path continues beyond — no arrival). */}
      <g mask="url(#auf-mask)">
        {/* Main path stroke — generous width, gradient from dark to light */}
        <path
          d="M 360,400
             C 320,395 280,385 250,370
             C 220,355 200,335 215,310
             C 230,290 270,285 295,270
             C 320,255 320,230 290,215
             C 260,200 215,205 195,185
             C 175,165 195,140 230,130
             C 265,120 290,105 280,80
             C 275,65 260,55 240,50
             C 225,46 220,40 220,30"
          stroke="url(#auf-path)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner highlight along the path — gives dimensionality */}
        <path
          d="M 360,400
             C 320,395 280,385 250,370
             C 220,355 200,335 215,310
             C 230,290 270,285 295,270
             C 320,255 320,230 290,215
             C 260,200 215,205 195,185
             C 175,165 195,140 230,130
             C 265,120 290,105 280,80
             C 275,65 260,55 240,50
             C 225,46 220,40 220,30"
          stroke="#f5ece6"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
        />
      </g>

      {/* Waymarkers along the path — small dots showing "I have been here" */}
      {/* Each one is a stage of the journey. Earlier ones (lower) are darker/smaller,
      later ones (higher) are lighter/larger — but the journey isn't finished. */}
      <circle cx="360" cy="400" r="5" fill="#5b3a4e" opacity="0.85" />
      <circle cx="360" cy="400" r="2" fill="#f5ece6" />

      <circle cx="220" cy="345" r="4.5" fill="#5b3a4e" opacity="0.8" />
      <circle cx="220" cy="345" r="1.8" fill="#f5ece6" />

      <circle cx="298" cy="265" r="5" fill="#7a5066" opacity="0.85" />
      <circle cx="298" cy="265" r="2" fill="#f5ece6" />

      <circle cx="187" cy="190" r="5.5" fill="#7a5066" opacity="0.9" />
      <circle cx="187" cy="190" r="2.2" fill="#f5ece6" />

      {/* The "current position" — slightly larger, with subtle glow */}
      <circle cx="280" cy="105" r="14" fill="url(#auf-light)" />
      <circle cx="280" cy="105" r="6" fill="#f4d8a8" opacity="0.95" />
      <circle cx="280" cy="105" r="2.5" fill="#fff" />

      {/* Sage hills (back layer) */}
      <path
        d="M0,400 Q70,388 130,395 Q200,405 240,400 Q290,395 350,395 Q420,395 480,400 L480,470 L0,470 Z"
        fill="#c4cebd"
        opacity="0.7"
      />

      {/* Sage hills (front layer) */}
      <path
        d="M0,425 Q90,415 180,420 Q240,425 300,420 Q390,415 480,425 L480,470 L0,470 Z"
        fill="#a8b6a0"
        opacity="0.8"
      />

      {/* Hand-drawn ground line */}
      <path
        d="M40,455 Q240,448 440,455"
        stroke="#5b3a4e"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}
