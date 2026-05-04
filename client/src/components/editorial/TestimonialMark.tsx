import { cn } from "@/lib/utils";

interface TestimonialMarkProps {
  className?: string;
}

/**
 * Inline-SVG-Marker für die Testimonial-Sektion: stilisierte offene Hand
 * (Geste «zuhören, nichts wegnehmen») in Aubergine vor sage-getöntem
 * Atmosphäre-Kreis.
 *
 * Alle Farben kommen aus Tokens (`--accent-primary`, `--accent-label`).
 * Wird zentriert über dem Pull-Quote in der Sage-Wash-Sektion gesetzt.
 */
export function TestimonialMark({ className }: TestimonialMarkProps) {
  return (
    <svg
      className={cn("block", className)}
      width="96"
      height="96"
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Sage-Atmosphäre */}
      <circle
        cx="48"
        cy="48"
        r="40"
        fill="var(--accent-label)"
        opacity="0.28"
      />
      {/* Offene Hand-Linien */}
      <g
        stroke="var(--accent-primary)"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      >
        <path d="M48,72 Q40,60 38,46 Q36,32 42,24" />
        <path d="M48,72 Q44,58 46,42 Q48,30 54,24" />
        <path d="M48,72 Q52,58 54,44 Q56,32 60,26" />
        <path d="M48,72 Q56,60 62,50 Q68,40 70,32" />
        <path d="M48,72 Q42,76 36,76" />
        <path d="M48,72 Q54,76 60,76" />
      </g>
    </svg>
  );
}
