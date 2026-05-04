/**
 * EisbergIllustration
 *
 * Hero-Illustration für /verstehen.
 *
 * Botschaft: «Was du siehst, ist nicht alles. Unter der Oberfläche liegt mehr.»
 *
 * Version 3 (Mai 2026): Tafeleisberg mit Stufe (E2+).
 * Verhältnis 30:70 (Wasserlinie bei 30 Prozent von oben), Tafelform
 * statt Spitze, leicht nach rechts gekippt. Zwei Höhen oben (links
 * höher, rechts niedriger), durch eine schräge Stufe verbunden —
 * Drydock-typisches Profil. Unter Wasser asymmetrische Plattform,
 * weit nach links ausgestreckt unter der hohen Tafel.
 *
 * Eis-Akzente innerhalb der Site-Familie:
 * - Sage-Lichtkanten (Kalt-Hauch) statt Cream auf den Tafelkanten
 * - Sage-Streifen direkt unter der Wasserlinie (Eis-Streuung)
 * - Verdichtete horizontale Schichtungslinien (Aubergine + Sage)
 * - Sage-Lichtkante an der oberen linken Auskragung
 * Die Sage-Akzente bleiben in der etablierten Site-Palette
 * (Sage ist Sekundärfarbe der anderen Tier-A-Heros).
 *
 * Teil der Tier-A-Illustrations-Familie für die Borderline-Angehörige-Site.
 * Konsistente Bildsprache mit den anderen Tier-A-Heros (Leuchtturm,
 * Faden, Innenräume, Schale, gewundener Weg): Cream-Halo, Aubergine
 * als primäre Form, Sage als Sekundär-/Akzentfarbe, kleine
 * Stern-Konstellationen, Hand-drawn Bodenlinie.
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
        <radialGradient id="eisE2plus-halo" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#f5e6d8" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#e9d6c8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e9d6c8" stopOpacity="0" />
        </radialGradient>

        <linearGradient
          id="eisE2plus-top-high"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#a08594" />
          <stop offset="100%" stopColor="#6b4658" />
        </linearGradient>

        <linearGradient
          id="eisE2plus-top-low"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#90758a" />
          <stop offset="100%" stopColor="#5b3a4e" />
        </linearGradient>

        <linearGradient id="eisE2plus-front" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5b3a4e" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#3a2632" stopOpacity="0.92" />
        </linearGradient>

        <linearGradient id="eisE2plus-step" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4a2f3f" />
          <stop offset="100%" stopColor="#2a1c24" />
        </linearGradient>

        <linearGradient id="eisE2plus-deep" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a2632" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1a0e15" stopOpacity="0.78" />
        </linearGradient>

        <linearGradient
          id="eisE2plus-shadow"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#2a1c24" stopOpacity="0.78" />
          <stop offset="100%" stopColor="#1a0e15" stopOpacity="0.65" />
        </linearGradient>

        {/* NEU: Sage-Streifen direkt unter der Wasserlinie für Eis-Streuung */}
        <linearGradient
          id="eisE2plus-iceglow"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#7a9588" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7a9588" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Cream halo */}
      <circle cx="240" cy="200" r="170" fill="url(#eisE2plus-halo)" />

      {/* Stars */}
      <circle cx="105" cy="90" r="1.6" fill="#5b3a4e" opacity="0.55" />
      <circle cx="370" cy="80" r="1.8" fill="#5b3a4e" opacity="0.55" />
      <circle cx="395" cy="135" r="1.4" fill="#4f6b5e" opacity="0.5" />
      <circle cx="85" cy="125" r="1.4" fill="#4f6b5e" opacity="0.5" />
      <circle cx="180" cy="55" r="1.2" fill="#4f6b5e" opacity="0.5" />
      <circle cx="305" cy="45" r="1.5" fill="#5b3a4e" opacity="0.55" />

      {/*
    TAFELEISBERG E2+ — mit Stufe und Eis-Akzenten
    Zwei Höhen oben, schräge Stufe dazwischen.
    Wasserlinie: y=144
  */}

      {/* HOHE TAFEL OBEN (links) */}
      <polygon
        points="115,80 240,88 240,98 125,93"
        fill="url(#eisE2plus-top-high)"
      />

      {/* NIEDRIGE TAFEL OBEN (rechts) */}
      <polygon
        points="260,115 365,122 360,128 268,124"
        fill="url(#eisE2plus-top-low)"
      />

      {/* STUFE — schräge Verbindung */}
      <polygon
        points="240,88 260,115 260,124 240,98"
        fill="url(#eisE2plus-step)"
      />

      {/* VORDERE STEILKANTE LINKS */}
      <polygon
        points="115,80 125,93 240,98 240,144 95,144"
        fill="url(#eisE2plus-front)"
      />

      {/* VORDERE STEILKANTE RECHTS */}
      <polygon
        points="260,115 260,124 360,128 365,122 380,144 240,144"
        fill="url(#eisE2plus-front)"
        opacity="0.92"
      />

      {/* Sharp ridges along top edges */}
      <path
        d="M 115,80 L 240,88"
        stroke="#1a0e15"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M 260,115 L 365,122"
        stroke="#1a0e15"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M 240,88 L 260,115"
        stroke="#1a0e15"
        strokeWidth="0.8"
        fill="none"
        opacity="0.55"
      />

      {/* EIS-AKZENT 1: SAGE-LICHTKANTE auf der oberen Tafelkante (statt Cream) — kalter Hauch */}
      <path
        d="M 117,82 L 235,90"
        stroke="#a8c0b4"
        strokeWidth="1"
        fill="none"
        opacity="0.65"
        strokeLinecap="round"
      />
      <path
        d="M 262,117 L 360,123"
        stroke="#a8c0b4"
        strokeWidth="0.8"
        fill="none"
        opacity="0.55"
        strokeLinecap="round"
      />

      {/* EIS-AKZENT 2: SAGE-LICHTKANTE entlang der Stufe (vertikale Bruchstelle) */}
      <path
        d="M 240,90 L 260,116"
        stroke="#a8c0b4"
        strokeWidth="0.7"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />

      {/* Vertikale Bruchspuren in den Steilkanten */}
      <path
        d="M 175,98 L 178,144"
        stroke="#1a0e15"
        strokeWidth="0.4"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M 310,128 L 308,144"
        stroke="#1a0e15"
        strokeWidth="0.4"
        fill="none"
        opacity="0.3"
      />

      {/* EIS-AKZENT 2b: Sage-Lichtkanten an einigen vertikalen Bruchstellen */}
      <path
        d="M 145,100 L 147,144"
        stroke="#a8c0b4"
        strokeWidth="0.4"
        fill="none"
        opacity="0.4"
        strokeLinecap="round"
      />
      <path
        d="M 280,124 L 281,144"
        stroke="#a8c0b4"
        strokeWidth="0.4"
        fill="none"
        opacity="0.4"
        strokeLinecap="round"
      />

      {/* Water line */}
      <path
        d="M 30,142 Q 100,140 200,144 Q 300,146 380,143 Q 430,141 450,143"
        stroke="#7a8a82"
        strokeWidth="1.4"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M 30,148 Q 100,146 200,150 Q 300,152 380,149 Q 430,148 450,150"
        stroke="#7a8a82"
        strokeWidth="0.6"
        fill="none"
        opacity="0.35"
        strokeLinecap="round"
      />

      {/* Foam where iceberg meets water */}
      <path
        d="M 95,142 Q 200,140 380,144"
        stroke="#f5ece6"
        strokeWidth="1.3"
        fill="none"
        opacity="0.55"
        strokeLinecap="round"
      />

      {/*
    UNTERWASSER — Masse hängt mehr unter der hohen Tafel (links).
  */}

      {/* LEFT FLANK */}
      <polygon
        points="95,144 35,215 50,330 110,415 220,430 245,144"
        fill="url(#eisE2plus-deep)"
      />

      {/* RIGHT FLANK */}
      <polygon
        points="245,144 220,430 340,410 410,280 398,195 380,144"
        fill="url(#eisE2plus-shadow)"
      />

      {/*
    EIS-AKZENT 3: SAGE-STREIFEN direkt unter der Wasserlinie.
    Schmal, sehr subtil. Andeutung von Eis-Streuung in der Tiefe.
    Liegt OBEN auf den Unterwasser-Polygonen, ca. 18px hoch, fadet nach unten aus.
  */}
      <path
        d="M 95,144 L 245,144 L 220,162 L 110,162 Z"
        fill="url(#eisE2plus-iceglow)"
      />
      <path
        d="M 245,144 L 380,144 L 360,162 L 235,162 Z"
        fill="url(#eisE2plus-iceglow)"
        opacity="0.7"
      />

      {/* SHARP OUTER EDGES */}
      <path
        d="M 95,144 L 35,215 L 50,330 L 110,415 L 220,430 L 340,410 L 410,280 L 398,195 L 380,144"
        stroke="#1a0e15"
        strokeWidth="0.7"
        fill="none"
        opacity="0.45"
        strokeLinejoin="round"
      />

      {/* Internal seam */}
      <path
        d="M 245,144 L 220,430"
        stroke="#1a0e15"
        strokeWidth="0.4"
        fill="none"
        opacity="0.3"
      />

      {/*
    EIS-AKZENT 4: HORIZONTALE SCHICHTUNGSLINIEN — intensiviert.
    Mehr Linien, etwas dichter, ein paar mit Sage-Akzent für kalten Hauch.
  */}
      {/* Hauptlinien (Aubergine-dunkel) */}
      <path
        d="M 40,205 Q 200,200 408,200"
        stroke="#1a0e15"
        strokeWidth="0.55"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M 45,235 Q 200,230 410,225"
        stroke="#1a0e15"
        strokeWidth="0.5"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M 50,270 Q 200,265 410,260"
        stroke="#1a0e15"
        strokeWidth="0.5"
        fill="none"
        opacity="0.32"
      />
      <path
        d="M 55,305 Q 200,300 408,298"
        stroke="#1a0e15"
        strokeWidth="0.45"
        fill="none"
        opacity="0.28"
      />
      <path
        d="M 65,345 Q 200,340 390,338"
        stroke="#1a0e15"
        strokeWidth="0.4"
        fill="none"
        opacity="0.25"
      />
      <path
        d="M 80,380 Q 200,378 360,375"
        stroke="#1a0e15"
        strokeWidth="0.4"
        fill="none"
        opacity="0.22"
      />
      <path
        d="M 110,410 Q 220,413 340,408"
        stroke="#1a0e15"
        strokeWidth="0.35"
        fill="none"
        opacity="0.2"
      />

      {/* Sage-Akzent-Linien zwischendurch — geben kalten Hauch zwischen den dunklen Linien */}
      <path
        d="M 42,220 Q 200,215 410,213"
        stroke="#a8c0b4"
        strokeWidth="0.3"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M 48,253 Q 200,248 410,243"
        stroke="#a8c0b4"
        strokeWidth="0.3"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M 53,288 Q 200,283 410,280"
        stroke="#a8c0b4"
        strokeWidth="0.3"
        fill="none"
        opacity="0.28"
      />
      <path
        d="M 60,325 Q 200,320 400,318"
        stroke="#a8c0b4"
        strokeWidth="0.3"
        fill="none"
        opacity="0.24"
      />
      <path
        d="M 73,362 Q 200,360 380,358"
        stroke="#a8c0b4"
        strokeWidth="0.25"
        fill="none"
        opacity="0.22"
      />

      {/* Light catching upper-left edge of underwater mass — Sage statt Aubergine-rosa */}
      <path
        d="M 95,146 L 40,213"
        stroke="#a8c0b4"
        strokeWidth="1.2"
        fill="none"
        opacity="0.55"
        strokeLinecap="round"
      />

      {/* Chips on lower edges */}
      <polygon points="155,425 143,430 165,430" fill="#1a0e15" opacity="0.6" />
      <polygon points="285,420 273,425 297,425" fill="#1a0e15" opacity="0.5" />

      {/* Hand-drawn ground line */}
      <path
        d="M 40,460 Q 240,453 440,460"
        stroke="#5b3a4e"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
