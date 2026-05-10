import type { ReactNode } from "react";

interface EyebrowLabelProps {
  children: ReactNode;
  /**
   * Akzentfarbe:
   * - `default`: `var(--accent-label)` für Cream-Hintergrund.
   * - `light`: `#d6c8be` für Aubergine-Hintergrund.
   * - `muted`: `#4f6b5e` für Sage-Wash- und Cream-Deep-Hintergrund
   *   (EditorialColorBlock-Variants).
   */
  tone?: "default" | "light" | "muted";
  /** `default` rendert untere Margin (`var(--space-4)`); `compact` entfernt sie. */
  spacing?: "default" | "compact";
  /** Zusätzliche Klassen, z.B. eigene Top-Margin (`mt-8`). */
  className?: string;
}

const TONE_COLOR: Record<NonNullable<EyebrowLabelProps["tone"]>, string> = {
  default: "var(--accent-label)",
  light: "#d6c8be",
  muted: "#4f6b5e",
};

export function EyebrowLabel({
  children,
  tone = "default",
  spacing = "default",
  className,
}: EyebrowLabelProps) {
  return (
    <p
      className={
        className ? `text-xs uppercase ${className}` : "text-xs uppercase"
      }
      style={{
        color: TONE_COLOR[tone],
        letterSpacing: "var(--tracking-caps)",
        fontWeight: 500,
        marginBottom: spacing === "default" ? "var(--space-4)" : undefined,
      }}
    >
      {children}
    </p>
  );
}
