import type { ReactNode } from "react";

interface DisplayHeadingProps {
  /** `1` rendert `<h1>` mit `--text-hero` und `--lh-tight`. `2` rendert `<h2>` mit `--text-2xl` und `--lh-snug`. */
  level: 1 | 2;
  /**
   * Textfarbe:
   * - `default`: `var(--fg-primary)` für Cream/Sage-Wash/Cream-Deep-Hintergrund
   * - `light`: `#f5ece6` für Aubergine-Hintergrund
   */
  tone?: "default" | "light";
  /** Zusätzliche Klassen, z.B. eigene Top-Margin (`mt-8`). */
  className?: string;
  children: ReactNode;
}

const TONE_COLOR: Record<NonNullable<DisplayHeadingProps["tone"]>, string> = {
  default: "var(--fg-primary)",
  light: "#f5ece6",
};

export function DisplayHeading({
  level,
  tone = "default",
  className,
  children,
}: DisplayHeadingProps) {
  const baseClass = className ? `font-display ${className}` : "font-display";
  const style = {
    fontSize: level === 1 ? "var(--text-hero)" : "var(--text-2xl)",
    lineHeight: level === 1 ? "var(--lh-tight)" : "var(--lh-snug)",
    letterSpacing: "var(--tracking-tight)",
    color: TONE_COLOR[tone],
    fontWeight: "var(--weight-display)" as const,
    marginBottom: "var(--space-5)",
  };

  if (level === 1) {
    return (
      <h1 className={baseClass} style={style}>
        {children}
      </h1>
    );
  }
  return (
    <h2 className={baseClass} style={style}>
      {children}
    </h2>
  );
}
