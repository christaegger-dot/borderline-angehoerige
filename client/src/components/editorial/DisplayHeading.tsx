import type { ReactNode } from "react";

interface DisplayHeadingProps {
  /** `1` rendert `<h1>`, `2` rendert `<h2>`. */
  level: 1 | 2;
  /**
   * Größe und Spacing-Variante:
   * - `hero` (Default für level=1): `--text-hero`, mit `marginBottom: var(--space-5)`.
   *   Für Hauptseiten-Hero in EditorialSection-Body.
   * - `page` (level=1 für einfachere Pages): `text-3xl mobile / text-4xl md+`,
   *   mit `mt-8` (oben Abstand nach Eyebrow) und KEIN marginBottom.
   *   Für Pages wie Impressum, FAQ, Glossar, etc.
   * - `section` (Default für level=2): `--text-2xl`, mit `marginBottom: var(--space-5)`.
   */
  size?: "hero" | "page" | "section";
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

function defaultSize(level: 1 | 2): "hero" | "section" {
  return level === 1 ? "hero" : "section";
}

export function DisplayHeading({
  level,
  size,
  tone = "default",
  className,
  children,
}: DisplayHeadingProps) {
  const resolved = size ?? defaultSize(level);

  // Page-Variante setzt Font-Size + mt-8 via Tailwind-Classes (responsive),
  // damit md:text-4xl greift. Inline fontSize bleibt dann leer.
  const pageClasses =
    resolved === "page"
      ? "mt-8 text-[var(--text-3xl)] md:text-[var(--text-4xl)]"
      : "";

  const combinedClass = ["font-display", pageClasses, className]
    .filter(Boolean)
    .join(" ");

  const style = {
    fontSize: resolved === "page" ? undefined : SIZE_FONT_SIZE[resolved],
    lineHeight: resolved === "section" ? "var(--lh-snug)" : "var(--lh-tight)",
    letterSpacing: "var(--tracking-tight)",
    color: TONE_COLOR[tone],
    fontWeight: "var(--weight-display)" as const,
    marginBottom: resolved === "page" ? undefined : "var(--space-5)",
  };

  if (level === 1) {
    return (
      <h1 className={combinedClass} style={style}>
        {children}
      </h1>
    );
  }
  return (
    <h2 className={combinedClass} style={style}>
      {children}
    </h2>
  );
}

const SIZE_FONT_SIZE: Record<"hero" | "section", string> = {
  hero: "var(--text-hero)",
  section: "var(--text-2xl)",
};
