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
   * - `utility` (level=1 für Tool-/Bibliotheksseiten): kompakter als `page`
   *   auf Mobile, damit der erste Screen schneller Orientierung zeigt.
   * - `section` (Default für level=2): `--text-2xl`, mit `marginBottom: var(--space-5)`.
   */
  size?: "hero" | "page" | "section" | "utility";
  /**
   * Bottom-Spacing-Override. `default` rendert den size-typischen
   * marginBottom. `compact` setzt marginBottom auf 0 — für Headings
   * in `space-y-X`-Containern, wo der Parent den Abstand verwaltet.
   */
  spacing?: "default" | "compact";
  /**
   * Textfarbe:
   * - `default`: `var(--fg-primary)` für Cream/Sage-Wash/Cream-Deep-Hintergrund
   * - `light`: `#f5ece6` für Aubergine-Hintergrund
   */
  tone?: "default" | "light";
  /** Optionale `id` für Deep-Link-Anchors (z.B. `#therapieangebote`). */
  id?: string;
  /** Zusätzliche Klassen, z.B. eigene Top-Margin (`mt-8`) oder max-width (`max-w-[32rem]`). */
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
  spacing = "default",
  tone = "default",
  id,
  className,
  children,
}: DisplayHeadingProps) {
  const resolved = size ?? defaultSize(level);

  const pageClasses =
    resolved === "page"
      ? "mt-8 text-[var(--text-3xl)] md:text-[var(--text-4xl)]"
      : resolved === "utility"
        ? "mt-8"
        : "";

  const combinedClass = ["font-display", pageClasses, className]
    .filter(Boolean)
    .join(" ");

  // Spacing: compact uebergeht den size-typischen marginBottom.
  const marginBottom =
    spacing === "compact"
      ? 0
      : resolved === "page" || resolved === "utility"
        ? undefined
        : "var(--space-5)";

  const style = {
    fontSize: resolved === "page" ? undefined : SIZE_FONT_SIZE[resolved],
    lineHeight: resolved === "section" ? "var(--lh-snug)" : "var(--lh-tight)",
    letterSpacing: "var(--tracking-tight)",
    color: TONE_COLOR[tone],
    fontWeight: "var(--weight-display)" as const,
    marginBottom,
  };

  if (level === 1) {
    return (
      <h1 className={combinedClass} style={style} id={id}>
        {children}
      </h1>
    );
  }
  return (
    <h2 className={combinedClass} style={style} id={id}>
      {children}
    </h2>
  );
}

const SIZE_FONT_SIZE: Record<"hero" | "section" | "utility", string> = {
  hero: "var(--text-hero)",
  utility: "clamp(2rem, 4vw, var(--text-4xl))",
  section: "var(--text-2xl)",
};
