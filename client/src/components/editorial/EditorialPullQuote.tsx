import type { ReactNode } from "react";

interface EditorialPullQuoteProps {
  children: ReactNode;
  /** Optionale Quellen-/Kontext-Caption unter dem Zitat */
  cite?: string;
}

export function EditorialPullQuote({
  children,
  cite,
}: EditorialPullQuoteProps) {
  return (
    <figure
      className="border-l-2 pl-6"
      style={{ borderColor: "var(--rule-color-strong)" }}
    >
      <blockquote
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xl)",
          lineHeight: "var(--lh-snug)",
          fontStyle: "italic",
          color: "var(--fg-primary)",
          fontWeight: "var(--weight-display)",
        }}
      >
        {children}
      </blockquote>
      {cite && (
        <figcaption
          className="mt-3"
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--fg-tertiary)",
          }}
        >
          {cite}
        </figcaption>
      )}
    </figure>
  );
}
