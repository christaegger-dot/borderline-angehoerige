import AppLink from "@/components/AppLink";
import {
  DisplayHeading,
  EditorialSection,
  EyebrowLabel,
} from "@/components/editorial";
import { homeFeaturedInfografiken } from "@/content/homeFeaturedInfografiken";

interface VisualOrientationGridProps {
  /**
   * Anzahl sichtbarer Tiles. Default bleibt die volle kuratierte Reihe,
   * Home kann daraus eine ruhigere Vorschau machen.
   */
  maxItems?: number;
  /**
   * Explizite Tile-Auswahl per id (in dieser Reihenfolge). Hat Vorrang vor
   * `maxItems` — z.B. damit die Home gezielt andere Konzepte zeigt als jene,
   * die bereits inline an ihrem Wirkort stehen.
   */
  ids?: string[];
  title?: string;
  intro?: string;
}

/**
 * Visuelle Orientierung auf der Home: kuratierte Infografik-Tiles als
 * narrativer Lese-Pfad (verstehen → begleiten → schützen → sich halten).
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
export function VisualOrientationGrid({
  maxItems,
  ids,
  title = "Acht Konzepte, in Lese-Reihenfolge — ein Bild pro Idee.",
  intro,
}: VisualOrientationGridProps) {
  const tiles = ids
    ? ids
        .map(id => homeFeaturedInfografiken.find(tile => tile.id === id))
        .filter(
          (tile): tile is (typeof homeFeaturedInfografiken)[number] =>
            tile !== undefined
        )
    : typeof maxItems === "number"
      ? homeFeaturedInfografiken.slice(0, maxItems)
      : homeFeaturedInfografiken;
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
          <EyebrowLabel>Visuelle Orientierung</EyebrowLabel>
          <DisplayHeading level={2} className="max-w-[32rem]">
            {title}
          </DisplayHeading>
          {intro && (
            <p
              className="mt-4"
              style={{
                color: "var(--fg-secondary)",
                fontSize: "var(--text-md)",
                lineHeight: "var(--lh-relaxed)",
              }}
            >
              {intro}
            </p>
          )}
        </EditorialSection.Body>
      </EditorialSection>

      <section
        className="bg-[var(--bg-primary)] px-[var(--container-pad)] pb-[var(--section-y-normal-mobile)] md:px-[var(--container-pad-md)] md:pb-[var(--section-y-spacious-desktop)]"
        aria-label={`Visuelle Orientierung — ${tiles.length} Infografiken`}
        data-toc-skip
      >
        <div className="mx-auto max-w-page">
          <ul
            className="featured-infographic-grid"
            data-grid-size={tiles.length <= 3 ? "compact" : "default"}
          >
            {tiles.map(tile => (
              <li key={tile.id}>
                <AppLink
                  href={tile.href}
                  className="featured-infographic-card"
                  data-feature-tone={getFeatureTone(tile.categoryLabel)}
                >
                  <div className="featured-infographic-card__media">
                    <img
                      src={tile.thumbnailUrl}
                      alt={tile.alt}
                      width={600}
                      height={tile.thumbnailHeight}
                      loading="lazy"
                      decoding="async"
                      className="featured-infographic-card__image"
                    />
                  </div>
                  <div className="featured-infographic-card__content">
                    <p className="featured-infographic-card__kicker">
                      {tile.categoryLabel}
                    </p>
                    <h3 className="featured-infographic-card__title">
                      {tile.title}
                    </h3>
                    <p className="featured-infographic-card__description">
                      {tile.description}
                    </p>
                  </div>
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function getFeatureTone(categoryLabel: string) {
  if (categoryLabel === "Kommunizieren" || categoryLabel === "Grenzen") {
    return "terracotta";
  }
  if (categoryLabel === "Krise begleiten") {
    return "danger";
  }
  if (categoryLabel === "Genesung") {
    return "steel";
  }
  return "sage";
}
