import type { ReactNode } from "react";

interface EditorialSectionProps {
  /** Kapitälchen-Label, z.B. "ANERKENNUNG" */
  label?: string;
  /** Optional: H2-Titel der Sektion */
  title?: string;
  children: ReactNode;
  /** Trennt Sektion durch obere Hairline statt nur Whitespace */
  rule?: boolean;
}

export function EditorialSection({
  label,
  title,
  children,
  rule = false,
}: EditorialSectionProps) {
  return (
    <section className="mt-[var(--space-8)] space-y-[var(--space-4)] first:mt-0">
      {rule && (
        <div
          aria-hidden="true"
          className="border-t"
          style={{ borderColor: "var(--rule-color)" }}
        />
      )}
      {label && (
        <p
          className="text-xs uppercase"
          style={{
            color: "var(--accent-label)",
            letterSpacing: "var(--tracking-caps)",
            fontWeight: 500,
          }}
        >
          {label}
        </p>
      )}
      {title && (
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            lineHeight: "var(--lh-snug)",
            color: "var(--fg-primary)",
            fontWeight: "var(--weight-display)",
            letterSpacing: "var(--tracking-tight)",
          }}
        >
          {title}
        </h2>
      )}
      <div>{children}</div>
    </section>
  );
}
