/* Editorial related links: quiet paper panels in the shared style-bridge grammar. */
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

  const wrapperSpacing = flush ? "" : "mt-16 md:mt-[var(--space-8)]";

  return (
    <section
      aria-labelledby="related-links-editorial-heading"
      className={`related-links-editorial ${flush ? "related-links-editorial--flush" : ""} ${wrapperSpacing} ${className}`.trim()}
    >
      <p className="related-links-editorial__kicker">Weiterführen</p>
      <h2
        id="related-links-editorial-heading"
        className="related-links-editorial__title"
      >
        Das könnte Sie auch interessieren
      </h2>
      <ul className="related-links-editorial__list">
        {links.map(link => (
          <li key={link.href} className="related-links-editorial__item">
            <AppLink href={link.href} className="related-links-editorial__link">
              <p className="related-links-editorial__link-title">
                {link.title}
              </p>
              <p className="related-links-editorial__description">
                {link.description}
              </p>
            </AppLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
