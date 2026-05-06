/*
 * InnenraeumeIllustration  (Motiv: «Zwei Innenräume»)
 *
 * Hero-Illustration für /grenzen.
 *
 * Botschaft: «Du bist du, ich bin ich. Beide haben ihr eigenes Licht —
 * und Atmosphäre dazwischen.»
 *
 * Zwei diagonal angeordnete Membranen mit eigenem Cream-Lichtkern, klar
 * voneinander getrennt durch ruhige Cream-Atmosphäre. Die Membranen sind
 * dünne Aubergine-Linien mit subtilen Permeabilitäts-Punkten —
 * durchlässig im Wahrnehmen, geschlossen im Aufnehmen. Asymmetrisch in
 * Grösse und Position, weil Angehörigen-Realität selten symmetrisch ist.
 *
 * Komponente entstand aus dem Source-Paket als `BogenIllustration` —
 * bei Repo-Import zu `InnenraeumeIllustration` umbenannt, weil das
 * Motiv mit dem ursprünglichen Bogen-Konzept nichts mehr zu tun hat.
 *
 * Teil der Tier-A-Illustrations-Familie. Konsistente Bildsprache
 * (Cream-Halo, Sage-Hügel, Aubergine, Cream-Lichtkerne, Sterne,
 * Hand-drawn Bodenlinie).
 *
 * Version 2 (Mai 2026): Variante B — Atmosphäre aktiviert, Membran-
 * Strichstärke variiert, Permeabilitäts-Punkte differenziert.
 * Drei Eingriffe analog Eisberg-Refresh-Niveau:
 * 1. Between-Atmosphäre: Cream-Mikro-Partikel + zweite Haze-Ellipse
 * 2. Membran-Strichstärke: dünner an Berührungspunkten (0.9), dicker
 *    auf Rückseiten (2.2) — simuliert via zwei überlagerte Bögen
 * 3. Permeabilitäts-Punkte: drei Größen (0.7 / 1.1 / 1.6) + variierende
 *    Opazitäten statt einheitlich 0.4
 *
 * Farben sind als Hex-Werte hardcoded (--accent-primary #5b3a4e,
 * --accent-label #4f6b5e). Bei Theme-Änderungen nachziehen.
 */

interface InnenraeumeIllustrationProps {
  className?: string;
  /** Optionaler Accessible Label. Wenn nicht gesetzt, ist die Illustration dekorativ (aria-hidden). */
  ariaLabel?: string;
}

export default function InnenraeumeIllustration({
  className,
  ariaLabel,
}: InnenraeumeIllustrationProps) {
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
        <radialGradient id="bog-halo" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#f5e6d8" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#e9d6c8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e9d6c8" stopOpacity="0" />
        </radialGradient>

        {/* Membrane glow — soft aubergine aura, makes the membrane "permeable" not solid */}
        <radialGradient id="bog-membrane-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5b3a4e" stopOpacity="0" />
          <stop offset="78%" stopColor="#5b3a4e" stopOpacity="0" />
          <stop offset="93%" stopColor="#5b3a4e" stopOpacity="0.14" />
          <stop offset="98%" stopColor="#5b3a4e" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#5b3a4e" stopOpacity="0" />
        </radialGradient>

        {/* Light cores — same warm glow as Schale */}
        <radialGradient id="bog-light" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="20%" stopColor="#f5e6d8" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#f4d8a8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f4d8a8" stopOpacity="0" />
        </radialGradient>

        {/* The "between" — primary warm cream haze in the gap */}
        <radialGradient id="bog-between" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5e6d8" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#f5e6d8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f5e6d8" stopOpacity="0" />
        </radialGradient>

        {/* Between — secondary sage-tinted haze for depth */}
        <radialGradient id="bog-between-sage" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c4cebd" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#c4cebd" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Cream halo (whole atmosphere) */}
      <circle cx="240" cy="220" r="200" fill="url(#bog-halo)" />

      {/* Stars in atmosphere */}
      <circle cx="80" cy="80" r="1.8" fill="#5b3a4e" opacity="0.55" />
      <circle cx="400" cy="75" r="2" fill="#5b3a4e" opacity="0.55" />
      <circle cx="50" cy="160" r="1.5" fill="#4f6b5e" opacity="0.5" />
      <circle cx="430" cy="155" r="1.6" fill="#4f6b5e" opacity="0.5" />
      <circle cx="170" cy="50" r="1.3" fill="#5b3a4e" opacity="0.5" />
      <circle cx="320" cy="45" r="1.5" fill="#5b3a4e" opacity="0.5" />
      <circle cx="40" cy="270" r="1.4" fill="#5b3a4e" opacity="0.45" />
      <circle cx="440" cy="240" r="1.5" fill="#5b3a4e" opacity="0.45" />
      <circle cx="240" cy="35" r="1.4" fill="#4f6b5e" opacity="0.5" />

      {/* THE BETWEEN — layered atmosphere in the gap between membranes */}
      {/* Primary warm cream haze — wider, vertical orientation */}
      <ellipse cx="240" cy="220" rx="45" ry="115" fill="url(#bog-between)" />
      {/* Secondary sage-tinted haze — narrower, slightly offset for depth */}
      <ellipse
        cx="243"
        cy="225"
        rx="28"
        ry="72"
        fill="url(#bog-between-sage)"
      />
      {/* Micro-particles — tiny floating dots in the between space, signal living atmosphere */}
      <circle cx="238" cy="175" r="1.0" fill="#f5e6d8" opacity="0.7" />
      <circle cx="245" cy="195" r="0.7" fill="#c4cebd" opacity="0.55" />
      <circle cx="234" cy="215" r="1.2" fill="#f5e6d8" opacity="0.6" />
      <circle cx="248" cy="235" r="0.8" fill="#5b3a4e" opacity="0.18" />
      <circle cx="237" cy="255" r="1.0" fill="#f5e6d8" opacity="0.65" />
      <circle cx="243" cy="272" r="0.7" fill="#c4cebd" opacity="0.5" />
      <circle cx="235" cy="290" r="0.9" fill="#f5e6d8" opacity="0.55" />

      {/* LEFT MEMBRANE — larger, lower (the caregiver, often holding more space + grounded) */}
      {/* center: x=130, y=270, radius=92 */}
      <circle cx="130" cy="270" r="100" fill="url(#bog-membrane-aura)" />
      {/* Back arc — thicker stroke on the far side away from the between (rückseite) */}
      <path
        d="M 130 178 A 92 92 0 0 0 130 362"
        fill="none"
        stroke="#5b3a4e"
        strokeWidth="2.2"
        opacity="0.82"
      />
      {/* Front arc — thinner stroke near the between (berührungspunkt) */}
      <path
        d="M 130 362 A 92 92 0 0 0 130 178"
        fill="none"
        stroke="#5b3a4e"
        strokeWidth="0.9"
        opacity="0.65"
      />
      <circle cx="130" cy="270" r="55" fill="url(#bog-light)" />
      <circle cx="130" cy="270" r="14" fill="#f5e6d8" />
      <circle cx="130" cy="270" r="5.5" fill="#fff" />

      {/* RIGHT MEMBRANE — smaller, higher (the other person, distinct space) */}
      {/* center: x=355, y=185, radius=68 */}
      <circle cx="355" cy="185" r="76" fill="url(#bog-membrane-aura)" />
      {/* Back arc — thicker stroke on the far side */}
      <path
        d="M 355 117 A 68 68 0 0 1 355 253"
        fill="none"
        stroke="#5b3a4e"
        strokeWidth="2.2"
        opacity="0.82"
      />
      {/* Front arc — thinner stroke near the between */}
      <path
        d="M 355 253 A 68 68 0 0 1 355 117"
        fill="none"
        stroke="#5b3a4e"
        strokeWidth="0.9"
        opacity="0.65"
      />
      <circle cx="355" cy="185" r="40" fill="url(#bog-light)" />
      <circle cx="355" cy="185" r="11" fill="#f5e6d8" />
      <circle cx="355" cy="185" r="4.5" fill="#fff" />

      {/* Membrane permeability marks — differentiated sizes and opacities */}
      {/* Left membrane (8 marks around the ring at radius 92) */}
      {/* Top — near between: smaller, lighter */}
      <circle cx="130" cy="178" r="0.7" fill="#5b3a4e" opacity="0.28" />
      {/* Upper-right — near between: medium */}
      <circle cx="195" cy="205" r="1.1" fill="#5b3a4e" opacity="0.38" />
      {/* Right — closest to between: smallest, lightest */}
      <circle cx="222" cy="270" r="0.7" fill="#5b3a4e" opacity="0.22" />
      {/* Lower-right */}
      <circle cx="195" cy="335" r="1.1" fill="#5b3a4e" opacity="0.42" />
      {/* Bottom — far from between: largest, strongest */}
      <circle cx="130" cy="362" r="1.6" fill="#5b3a4e" opacity="0.55" />
      {/* Lower-left */}
      <circle cx="65" cy="335" r="1.4" fill="#5b3a4e" opacity="0.5" />
      {/* Left — far from between: large */}
      <circle cx="38" cy="270" r="1.6" fill="#5b3a4e" opacity="0.55" />
      {/* Upper-left */}
      <circle cx="65" cy="205" r="1.1" fill="#5b3a4e" opacity="0.42" />

      {/* Right membrane (8 marks around the ring at radius 68) */}
      {/* Top — far from between: largest, strongest */}
      <circle cx="355" cy="117" r="1.6" fill="#5b3a4e" opacity="0.55" />
      {/* Upper-right */}
      <circle cx="403" cy="137" r="1.4" fill="#5b3a4e" opacity="0.5" />
      {/* Right — far from between: large */}
      <circle cx="423" cy="185" r="1.6" fill="#5b3a4e" opacity="0.55" />
      {/* Lower-right */}
      <circle cx="403" cy="233" r="1.1" fill="#5b3a4e" opacity="0.42" />
      {/* Bottom — near between: medium */}
      <circle cx="355" cy="253" r="0.7" fill="#5b3a4e" opacity="0.25" />
      {/* Lower-left — closest to between: smallest, lightest */}
      <circle cx="307" cy="233" r="0.7" fill="#5b3a4e" opacity="0.22" />
      {/* Left — near between: small */}
      <circle cx="287" cy="185" r="0.7" fill="#5b3a4e" opacity="0.28" />
      {/* Upper-left */}
      <circle cx="307" cy="137" r="1.1" fill="#5b3a4e" opacity="0.38" />

      {/* Sage hills as grounding */}
      <path
        d="M0,395 Q80,383 160,390 Q240,397 320,390 Q400,383 480,393 L480,460 L0,460 Z"
        fill="#dde1d4"
        opacity="0.55"
      />
      <path
        d="M0,418 Q120,410 240,418 Q360,425 480,415 L480,460 L0,460 Z"
        fill="#c4cebd"
        opacity="0.45"
      />
      {/* Hand-drawn ground line */}
      <path
        d="M40,448 Q240,440 440,450"
        stroke="#5b3a4e"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
