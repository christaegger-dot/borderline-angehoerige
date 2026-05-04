/**
 * Hero-Illustration: stilisierter Leuchtturm in Aubergine mit Cream-Halo,
 * Sage-Hügel-Horizont, Lichtstrahl und gestreuten Sternen.
 *
 * Alle Brand-Farben kommen aus CSS-Tokens (--accent-primary, --accent-label,
 * --bg-cream-deep). Stop-Opacities formen die atmosphärischen Effekte.
 */
export function HeroLeuchtturmIllustration() {
  return (
    <svg
      viewBox="0 0 480 480"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block h-full w-full"
    >
      <defs>
        <radialGradient id="hero-halo" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            style={{ stopColor: "var(--bg-cream-deep)", stopOpacity: 0.9 }}
          />
          <stop
            offset="40%"
            style={{ stopColor: "var(--bg-cream-deep)", stopOpacity: 0.45 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--bg-cream-deep)", stopOpacity: 0 }}
          />
        </radialGradient>
        <linearGradient id="hero-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "var(--accent-primary)" }} />
          <stop
            offset="100%"
            style={{ stopColor: "var(--accent-primary-h)" }}
          />
        </linearGradient>
        <linearGradient id="hero-beam" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop
            offset="0%"
            style={{ stopColor: "var(--bg-cream-deep)", stopOpacity: 0 }}
          />
          <stop
            offset="40%"
            style={{ stopColor: "var(--bg-cream-deep)", stopOpacity: 0.55 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--bg-cream-deep)", stopOpacity: 0.85 }}
          />
        </linearGradient>
      </defs>

      {/* Warmer Halo / Atmosphäre */}
      <circle cx="240" cy="180" r="160" fill="url(#hero-halo)" />

      {/* Sage-Hügel-Horizont — zwei geschichtete Pfade als Erdung */}
      <path
        d="M0,400 Q100,360 200,380 Q320,400 420,370 Q480,358 480,400 L480,480 L0,480 Z"
        fill="var(--accent-label)"
        opacity="0.22"
      />
      <path
        d="M0,420 Q140,400 280,415 Q380,420 480,408 L480,480 L0,480 Z"
        fill="var(--accent-label)"
        opacity="0.32"
      />

      {/* Lichtstrahl aus der Laterne */}
      <path d="M240,160 L300,40 L180,40 Z" fill="url(#hero-beam)" />

      {/* Leuchtturm-Korpus — leicht verjüngt, organische Linie */}
      <path
        d="M218,400 Q215,300 220,180 Q224,170 240,170 Q256,170 260,180 Q265,300 262,400 Z"
        fill="url(#hero-body)"
      />

      {/* Laterne — Sockel, Box, Lichtpunkt, Spitze */}
      <ellipse
        cx="240"
        cy="170"
        rx="30"
        ry="10"
        fill="var(--accent-primary-h)"
      />
      <rect
        x="221"
        y="142"
        width="38"
        height="22"
        rx="2"
        fill="var(--accent-primary)"
      />
      <circle
        cx="240"
        cy="153"
        r="5"
        fill="var(--bg-cream-deep)"
        opacity="0.95"
      />
      <path d="M232,142 L240,128 L248,142 Z" fill="var(--accent-primary-h)" />

      {/* Subtile horizontale Bänder am Korpus */}
      <path
        d="M222,260 Q240,258 258,260"
        stroke="var(--bg-cream-deep)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M223,330 Q240,328 257,330"
        stroke="var(--bg-cream-deep)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />

      {/* Sterne / Punkte in Halo — Aubergine + Sage */}
      <circle
        cx="120"
        cy="120"
        r="1.8"
        fill="var(--accent-primary)"
        opacity="0.55"
      />
      <circle
        cx="360"
        cy="100"
        r="2"
        fill="var(--accent-primary)"
        opacity="0.55"
      />
      <circle
        cx="380"
        cy="170"
        r="1.5"
        fill="var(--accent-label)"
        opacity="0.5"
      />
      <circle
        cx="100"
        cy="220"
        r="1.5"
        fill="var(--accent-label)"
        opacity="0.5"
      />
      <circle
        cx="395"
        cy="240"
        r="2"
        fill="var(--accent-primary)"
        opacity="0.45"
      />
      <circle
        cx="85"
        cy="280"
        r="1.6"
        fill="var(--accent-primary)"
        opacity="0.45"
      />

      {/* Hand-gezeichnete Bodenlinie / Horizont */}
      <path
        d="M40,420 Q240,410 440,420"
        stroke="var(--accent-primary)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}
