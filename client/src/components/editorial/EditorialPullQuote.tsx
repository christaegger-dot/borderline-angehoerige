import type { ReactNode } from "react";

export type EditorialPullQuoteVariant = "default" | "testimonial";

interface EditorialPullQuoteProps {
  children: ReactNode;
  /** Optionale Quellen-/Kontext-Caption unter dem Zitat */
  cite?: string;
  /**
   * `default` = klassischer Pull-Quote mit linker Hairline und Italic-Body.
   * `testimonial` = zentriertes Testimonial mit grossem Display-Quote, ohne
   * Border, mit «»-Anführungszeichen in Aubergine (via CSS ::before/::after).
   */
  variant?: EditorialPullQuoteVariant;
}

export function EditorialPullQuote({
  children,
  cite,
  variant = "default",
}: EditorialPullQuoteProps) {
  if (variant === "testimonial") {
    return (
      <figure className="editorial-pull-quote--testimonial text-center">
        <blockquote
          className="editorial-pull-quote-testimonial-blockquote font-display"
          style={{
            fontSize: "clamp(1.5rem, 2.8vw, 2.125rem)",
            lineHeight: 1.42,
            letterSpacing: "-0.005em",
            color: "var(--fg-primary)",
            fontWeight: 400,
          }}
        >
          {children}
        </blockquote>
        {cite && (
          <figcaption
            className="mt-7"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-secondary)",
              fontStyle: "italic",
            }}
          >
            {cite}
          </figcaption>
        )}
      </figure>
    );
  }

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
