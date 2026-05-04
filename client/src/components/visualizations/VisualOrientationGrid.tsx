import AppLink from "@/components/AppLink";
import { homeFeaturedInfografiken } from "@/content/homeFeaturedInfografiken";

/**
 * Visuelle Orientierung auf der Home: 8 Infografik-Tiles als narrativer
 * Lese-Pfad (verstehen → begleiten → schützen → sich halten → vertiefen).
 *
 * Jede Tile verlinkt zur **dazugehörigen Inhaltsseite**, nicht zu einer
 * isolierten Infografik-Detail-Seite — die Infografik ist Eintritt zur
 * Page, nicht Endpunkt.
 *
 * Layout: 4 Spalten Desktop (lg+), 2 Spalten Tablet (md), 1 Spalte Mobile.
 * Volle Breite bis 1240 px max-width, eigener Wrapper mit
 * Container-Padding (bricht aus EditorialLayout-Lese-Spalte aus).
 */
export function VisualOrientationGrid() {
  return (
    <section
      className="bg-[var(--bg-primary)] px-[var(--container-pad)] py-16 md:px-[var(--container-pad-md)] md:py-[120px]"
      aria-label="Visuelle Orientierung — acht Infografiken"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 md:mb-14">
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Visuelle Orientierung
          </p>
          <h2
            className="mt-3 font-display"
            style={{
              fontSize: "var(--text-2xl)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
              letterSpacing: "var(--tracking-tight)",
              maxWidth: "32rem",
            }}
          >
            Acht Konzepte, in Lese-Reihenfolge — ein Bild pro Idee.
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-14 lg:grid-cols-4">
          {homeFeaturedInfografiken.map(tile => (
            <li key={tile.id} className="group">
              <AppLink
                href={tile.href}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--bg-primary)] rounded-md"
              >
                <div
                  className="overflow-hidden rounded-md border"
                  style={{
                    borderColor: "var(--rule-color)",
                    background: "var(--bg-elevated)",
                    aspectRatio: "600 / 848",
                  }}
                >
                  <img
                    src={tile.thumbnailUrl}
                    alt={tile.alt}
                    width={600}
                    height={848}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <p
                  className="mt-4 text-xs uppercase"
                  style={{
                    color: "var(--accent-label)",
                    letterSpacing: "var(--tracking-caps)",
                    fontWeight: 500,
                  }}
                >
                  {tile.categoryLabel}
                </p>
                <h3
                  className="mt-2 font-display transition-colors duration-200 group-hover:text-[color:var(--accent-primary)]"
                  style={{
                    fontSize: "1.125rem",
                    lineHeight: "var(--lh-snug)",
                    color: "var(--fg-primary)",
                    fontWeight: 500,
                  }}
                >
                  {tile.title}
                </h3>
                <p
                  className="mt-2 text-sm"
                  style={{
                    color: "var(--fg-secondary)",
                    lineHeight: "var(--lh-snug)",
                  }}
                >
                  {tile.description}
                </p>
              </AppLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
