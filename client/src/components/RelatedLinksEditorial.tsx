/**
 * RelatedLinksEditorial — Phase-4-Editorial-Variante von RelatedLinks.
 *
 * Visuelle Entschärfung gegenüber der Karten-Variante: keine Icons,
 * keine Karten-Optik, keine Akzent-Borders. Stattdessen eine Liste mit
 * Inline-Titel und kurzer Beschreibung pro Eintrag, getrennt durch
 * border-t in --rule-color. Das Original RelatedLinks.tsx bleibt
 * unangetastet (andere Pages nutzen es noch).
 */
import { Link } from "wouter";

export interface RelatedLink {
  href: string;
  title: string;
  description: string;
}

interface RelatedLinksEditorialProps {
  links: RelatedLink[];
  className?: string;
}

export default function RelatedLinksEditorial({
  links,
  className = "",
}: RelatedLinksEditorialProps) {
  if (links.length === 0) return null;

  return (
    <section
      aria-labelledby="related-links-editorial-heading"
      className={`mt-16 border-t pt-12 md:mt-[var(--space-8)] ${className}`.trim()}
      style={{ borderColor: "var(--rule-color)" }}
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
            <Link href={link.href} className="block">
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
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
