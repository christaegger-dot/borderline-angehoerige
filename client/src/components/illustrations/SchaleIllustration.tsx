/**
 * SchaleIllustration
 *
 * Hero-Illustration für /selbstfuersorge.
 *
 * Botschaft: «Sich selbst auch tragen. Das Licht in der Mitte ist du.»
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

interface SchaleIllustrationProps {
  className?: string;
  /** Optionaler Accessible Label. Wenn nicht gesetzt, ist die Illustration dekorativ (aria-hidden). */
  ariaLabel?: string;
}

export default function SchaleIllustration({
  className,
  ariaLabel,
}: SchaleIllustrationProps) {
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
        <radialGradient id="sch-halo" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#f5e6d8" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#e9d6c8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#e9d6c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sch-bowl" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7a5066" />
          <stop offset="50%" stopColor="#5b3a4e" />
          <stop offset="100%" stopColor="#3a2632" />
        </linearGradient>
        <radialGradient id="sch-light" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="20%" stopColor="#f5e6d8" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#f4d8a8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f4d8a8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sch-inner-glow" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#f4d8a8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f4d8a8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="240" cy="200" r="180" fill="url(#sch-halo)" />

      <circle cx="100" cy="100" r="1.8" fill="#5b3a4e" opacity="0.55" />
      <circle cx="375" cy="95" r="2" fill="#5b3a4e" opacity="0.55" />
      <circle cx="80" cy="170" r="1.5" fill="#4f6b5e" opacity="0.5" />
      <circle cx="395" cy="160" r="1.6" fill="#4f6b5e" opacity="0.5" />
      <circle cx="60" cy="260" r="1.4" fill="#5b3a4e" opacity="0.45" />
      <circle cx="415" cy="250" r="1.5" fill="#5b3a4e" opacity="0.45" />
      <circle cx="170" cy="65" r="1.3" fill="#4f6b5e" opacity="0.5" />
      <circle cx="310" cy="60" r="1.5" fill="#5b3a4e" opacity="0.5" />
      <circle cx="240" cy="40" r="1.5" fill="#5b3a4e" opacity="0.5" />

      <ellipse cx="240" cy="245" rx="120" ry="85" fill="url(#sch-inner-glow)" />

      <circle cx="240" cy="265" r="38" fill="url(#sch-light)" />
      <circle cx="240" cy="265" r="14" fill="#f5e6d8" />
      <circle cx="240" cy="265" r="5.5" fill="#fff" />

      <path
        d="M105,255 Q98,330 145,375 Q195,408 240,408 Q285,408 335,375 Q382,330 375,255
           Q365,265 350,272 Q330,278 305,280 Q275,283 240,283 Q205,283 175,280 Q150,278 130,272 Q115,265 105,255 Z"
        fill="url(#sch-bowl)"
      />

      <path
        d="M105,255 Q140,272 195,278 Q240,282 285,278 Q340,272 375,255"
        stroke="#8a5d75"
        strokeWidth="2.5"
        fill="none"
        opacity="0.95"
      />

      <path
        d="M148,300 Q140,335 158,365"
        stroke="#f5ece6"
        strokeWidth="1.2"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />
      <path
        d="M332,300 Q340,335 322,365"
        stroke="#f5ece6"
        strokeWidth="1.2"
        fill="none"
        opacity="0.25"
        strokeLinecap="round"
      />
      <path
        d="M150,355 Q200,365 240,365 Q280,365 330,355"
        stroke="#f5ece6"
        strokeWidth="1.2"
        fill="none"
        opacity="0.32"
        strokeLinecap="round"
      />

      <path
        d="M0,425 Q80,415 160,420 Q240,425 320,420 Q400,415 480,422 L480,470 L0,470 Z"
        fill="#dde1d4"
        opacity="0.55"
      />
      <path
        d="M0,442 Q140,435 280,442 Q380,445 480,438 L480,470 L0,470 Z"
        fill="#c4cebd"
        opacity="0.45"
      />

      <path
        d="M40,455 Q240,448 440,455"
        stroke="#5b3a4e"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
