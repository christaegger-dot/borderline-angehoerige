/* Editorial variant of related links: plain list, no card framing. */
import AppLink from "@/components/AppLink";

export interface RelatedLink {
  href: string;
  title: string;
  description: string;
}

interface RelatedLinksEditorialProps {
  links: RelatedLink[];
  className?: string;
  /**
   * Wenn `true`, werden die äusseren Abstände (`mt-16 md:mt-[var(--space-8)]`,
   * `pt-12 border-t`) unterdrückt. Setzen, wenn die Komponente als kompletter
   * Body einer `EditorialSection` läuft — die Section gibt das Padding bereits,
   * sonst entsteht eine sichtbare Lücke zwischen MarginNote und Body-Eyebrow.
   */
  flush?: boolean;
}

export default function RelatedLinksEditorial({
  links,
  className = "",
  flush = false,
}: RelatedLinksEditorialProps) {
  if (links.length === 0) return null;

  const wrapperSpacing = flush
    ? ""
    : "mt-16 border-t pt-12 md:mt-[var(--space-8)]";

  return (
    <section
      aria-labelledby="related-links-editorial-heading"
      className={`${wrapperSpacing} ${className}`.trim()}
      style={flush ? undefined : { borderColor: "var(--rule-color)" }}
    >
      <p
        className="uppercase"
        style={{
          fontSize: "var(--text-xs)",
          letterSpacing: "var(--tracking-caps)",
          color: "var(--accent-label)",
          fontWeight: 500,
        }}
      >
        Weiterführen
      </p>
      <h2
        id="related-links-editorial-heading"
        className="mt-3 font-display"
        style={{
          fontSize: "var(--text-2xl)",
          lineHeight: "var(--lh-snug)",
          color: "var(--fg-primary)",
          fontWeight: "var(--weight-display)",
          letterSpacing: "var(--tracking-tight)",
        }}
      >
        Das könnte Sie auch interessieren
      </h2>
      <ul className="mt-6">
        {links.map(link => (
          <li
            key={link.href}
            className="border-t py-5"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <AppLink href={link.href} className="block">
              <p
                className="editorial-link"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                {link.title}
              </p>
              <p
                className="mt-1"
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-secondary)",
                }}
              >
                {link.description}
              </p>
            </AppLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
