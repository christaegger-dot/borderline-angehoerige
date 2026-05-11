import type { ElementType, ReactNode } from "react";

interface EditorialBodyProps {
  /**
   * HTML-Tag, das gerendert wird. Default `p`.
   * Für Description-Lists: `as="dd"` oder `as="dl"`. Für andere semantische
   * Anforderungen entsprechend.
   */
  as?: "p" | "dd" | "dl" | "span" | "div";
  /**
   * Textfarbe:
   * - `default`: `var(--fg-secondary)` für Standard-Body-Text
   * - `strong`: `var(--fg-primary)` für hervorgehobene Body-Inhalte
   *   (z.B. Zitationen in Quellen)
   */
  tone?: "default" | "strong";
  /** Zusätzliche Klassen, z.B. `mt-4`. */
  className?: string;
  children: ReactNode;
}

const TONE_COLOR: Record<NonNullable<EditorialBodyProps["tone"]>, string> = {
  default: "var(--fg-secondary)",
  strong: "var(--fg-primary)",
};

/**
 * Standard-Body-Text-Komponente.
 *
 * Defaults: `var(--text-md)` (17 px desktop), `var(--lh-relaxed)`,
 * `var(--fg-secondary)`. Für Description-Beschreibungen, Karten-Bodies,
 * Begleittexte in Listen — also kürzer und nüchterner als `<Lede>`,
 * aber typografisch sauberer als ungestyltes `<p>`.
 */
export function EditorialBody({
  as: Tag = "p",
  tone = "default",
  className,
  children,
}: EditorialBodyProps) {
  const Component = Tag as ElementType;
  return (
    <Component
      className={className}
      style={{
        fontSize: "var(--text-md)",
        lineHeight: "var(--lh-relaxed)",
        color: TONE_COLOR[tone],
      }}
    >
      {children}
    </Component>
  );
}
