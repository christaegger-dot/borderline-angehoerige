import AppLink from "@/components/AppLink";
import { EditorialSection } from "@/components/editorial";
import { homeFeaturedInfografiken } from "@/content/homeFeaturedInfografiken";

/**
 * Visuelle Orientierung auf der Home: 8 Infografik-Tiles als narrativer
 * Lese-Pfad (verstehen → begleiten → schützen → sich halten → vertiefen).
 *
 * Jede Tile verlinkt zur **dazugehörigen Inhaltsseite**, nicht zu einer
 * isolierten Infografik-Detail-Seite — die Infografik ist Eintritt zur
 * Page, nicht Endpunkt.
 *
 * Layout (Phase 1.5):
 * - Header in EditorialSection-Hülle (variant="cream") mit MarginNote
 *   «ÜBERBLICK» und Body-H2
 * - Tile-Grid darunter in eigener vollflächiger Section, max-w 1240 px,
 *   damit die acht Tiles weiter Container-Breite bekommen (nicht auf
 *   608 px Lese-Spalte beschränkt)
 *
 * 4 Spalten Desktop (lg+), 2 Spalten Tablet (md), 1 Spalte Mobile.
 */
export function VisualOrientationGrid() {
  return (
    <>
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Überblick
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
              marginBottom: "var(--space-4)",
            }}
          >
            Visuelle Orientierung
          </p>
          <h2
            className="font-display"
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
        </EditorialSection.Body>
      </EditorialSection>

      <section
        className="bg-[var(--bg-primary)] px-[var(--container-pad)] pb-20 md:px-[var(--container-pad-md)] md:pb-[120px]"
        aria-label="Visuelle Orientierung — acht Infografiken"
      >
        <div className="mx-auto max-w-[1240px]">
          <ul className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-14 lg:grid-cols-4">
            {homeFeaturedInfografiken.map(tile => (
              <li key={tile.id} className="group">
                <AppLink
                  href={tile.href}
                  className="block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--bg-primary)]"
                >
                  <div
                    className="overflow-hidden rounded-md border"
                    style={{
                      borderColor: "var(--rule-color)",
                      background: "var(--bg-elevated)",
                      aspectRatio: `600 / ${tile.thumbnailHeight}`,
                    }}
                  >
                    <img
                      src={tile.thumbnailUrl}
                      alt={tile.alt}
                      width={600}
                      height={tile.thumbnailHeight}
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
    </>
  );
}
