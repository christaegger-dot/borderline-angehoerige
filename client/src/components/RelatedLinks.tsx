/**
 * RelatedLinks
 *
 * «Das könnte Sie auch interessieren»-Sektion für Inhaltsseiten.
 * Zeigt 2–3 thematisch verwandte Seiten als Karten an.
 * Erhöht Verweildauer und verbessert die thematische Vernetzung.
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { getRouteAccent } from "@/components/layout/routeAccent";

export interface RelatedLink {
  href: string;
  title: string;
  description: string;
  /** Lucide-Icon-Komponente */
  icon: React.ComponentType<{ className?: string }>;
}

interface RelatedLinksProps {
  links: RelatedLink[];
  className?: string;
}

export default function RelatedLinks({
  links,
  className = "",
}: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <section
      aria-labelledby="related-links-heading"
      className={`py-10 md:py-12 border-t border-border/50 ${className}`}
    >
      <div className="mb-6">
        <span className="kicker">Weiterführen</span>
        <h2
          id="related-links-heading"
          className="text-xl md:text-2xl font-normal text-foreground mt-1"
        >
          Das könnte Sie auch interessieren
        </h2>
      </div>
      <div
        className={`grid gap-4 ${
          links.length === 2
            ? "sm:grid-cols-2"
            : links.length >= 3
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : ""
        }`}
      >
        {links.map(link => {
          const accent = getRouteAccent(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-white/80 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark/40 focus-visible:ring-offset-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${accent.surfaceActive}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 mt-3" />
              </div>
              <div>
                <p
                  className={`text-sm font-semibold mb-1 ${accent.textAccent}`}
                >
                  {link.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {link.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
