import { cn } from "@/lib/utils";

export type EditorialOrnamentVariant = "dots-line" | "wave" | "small-arc";

interface EditorialOrnamentProps {
  variant: EditorialOrnamentVariant;
  className?: string;
  /**
   * Farbe für Stroke + Fill. Default: `var(--accent-label)` (Sage).
   * Auf dunklen Backgrounds (z.B. Aubergine) eine helle Farbe setzen,
   * z.B. "rgba(245, 236, 230, 0.5)".
   */
  color?: string;
}

/**
 * Wiederverwendbare Sage-Ornamente für Sektions-Eröffnungen.
 *
 * - `dots-line` — Punkt · Bogen · Punkt (Anerkennungs-Eröffnung)
 * - `wave` — sanft gewellte Linie über die ganze Breite
 * - `small-arc` — kurzer Halbbogen (Fachstelle-CTA)
 *
 * Alle Farben kommen aus `--accent-label` (Sage). Niedrige Opacity-Werte
 * formen die zurückhaltende dekorative Wirkung.
 */
export function EditorialOrnament({
  variant,
  className,
  color,
}: EditorialOrnamentProps) {
  const baseClass = cn("block", className);
  const stroke = color ?? "var(--accent-label)";

  if (variant === "dots-line") {
    return (
      <svg
        className={baseClass}
        width="64"
        height="14"
        viewBox="0 0 64 14"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="8" cy="7" r="3" fill={stroke} opacity="0.65" />
        <path
          d="M22,7 Q32,2 42,7"
          stroke={stroke}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        <circle cx="56" cy="7" r="3" fill={stroke} opacity="0.65" />
      </svg>
    );
  }

  if (variant === "wave") {
    return (
      <svg
        className={baseClass}
        width="96"
        height="14"
        viewBox="0 0 96 14"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M2,7 Q14,1 26,7 T50,7 T74,7 T94,7"
          stroke={stroke}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    );
  }

  return (
    <svg
      className={baseClass}
      width="40"
      height="12"
      viewBox="0 0 40 12"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2,6 Q20,2 38,6"
        stroke={stroke}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}
