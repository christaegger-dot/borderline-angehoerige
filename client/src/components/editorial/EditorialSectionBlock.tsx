import type { ReactNode } from "react";
import { EyebrowLabel } from "./EyebrowLabel";

interface EditorialSectionBlockProps {
  /** Kapitälchen-Label, z.B. "ANERKENNUNG" */
  label?: string;
  /** Optional: H2-Titel der Sektion */
  title?: string;
  children: ReactNode;
  /** Trennt Sektion durch obere Hairline statt nur Whitespace.
   *  Wenn true: Margin + Padding symmetrisch verteilt (je --space-6),
   *  sodass die Hairline optisch mittig zwischen den Sektionen sitzt.
   *  Wenn false: nur Margin (--space-8 Desktop, 4rem Mobile). */
  rule?: boolean;
}

export function EditorialSectionBlock({
  label,
  title,
  children,
  rule = false,
}: EditorialSectionBlockProps) {
  const sectionClass = rule
    ? "mt-[var(--space-6)] pt-[var(--space-6)] space-y-[var(--space-4)] first:mt-0 first:pt-0 md:mt-[var(--space-7)] md:pt-[var(--space-7)]"
    : "mt-16 space-y-[var(--space-4)] first:mt-0 md:mt-[var(--space-8)]";

  return (
    <section className={sectionClass}>
      {rule && (
        <div
          aria-hidden="true"
          className="border-t"
          style={{ borderColor: "var(--rule-color)" }}
        />
      )}
      {label && <EyebrowLabel spacing="compact">{label}</EyebrowLabel>}
      {title && (
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            lineHeight: "var(--lh-snug)",
            color: "var(--fg-primary)",
            fontWeight: "var(--weight-display)",
            letterSpacing: "var(--tracking-tight)",
            overflowWrap: "anywhere",
            hyphens: "auto",
          }}
        >
          {title}
        </h2>
      )}
      <div>{children}</div>
    </section>
  );
}
