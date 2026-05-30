import { useRef, useState } from "react";
import { Link } from "wouter";
import {
  DisplayHeading,
  EditorialBody,
  EditorialSection,
  EyebrowLabel,
} from "@/components/editorial";
import { EditorialPillButton } from "@/components/ui/EditorialPillButton";
import {
  verstehenInfografiken,
  type VerstehenMaterialCategory,
} from "@/content/verstehen";
import { getHandoutOpenHref } from "@/content/handouts";
import { getHandoutTextVersionHrefBySource } from "@/content/handoutTextVersions";

const verstehenCategories = [
  {
    id: "alle",
    label: "Alle",
    count: verstehenInfografiken.length,
  },
  {
    id: "grundlagen",
    label: "Grundlagen",
    count: verstehenInfografiken.filter(i => i.category === "grundlagen")
      .length,
  },
  {
    id: "neurobiologie",
    label: "Stress & Gehirn",
    count: verstehenInfografiken.filter(i => i.category === "neurobiologie")
      .length,
  },
] as const;

export default function VerstehenMaterialsSection() {
  const [activeFilter, setActiveFilter] =
    useState<VerstehenMaterialCategory>("alle");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeFilter === "alle"
      ? verstehenInfografiken
      : verstehenInfografiken.filter(item => item.category === activeFilter);

  const scrollToResults = () => {
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

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
            Materialien zum Vertiefen
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Materialien</EyebrowLabel>
          <DisplayHeading level={2}>Materialien zum Vertiefen</DisplayHeading>
          <EditorialBody className="max-w-[36em]">
            Diese Materialien ergänzen die Seite, ersetzen sie aber nicht. Wenn
            verfügbar, führt «Textversion lesen» zur lesbaren Web-Version.
            Beginnen Sie mit den Grundlagen, wenn Sie gerade Orientierung
            brauchen.
          </EditorialBody>
        </EditorialSection.Body>
      </EditorialSection>

      {/* data-variant="cream" + editorial-section: markiert die Filter-/Tile-
          Liste als gleichfarbige Sektion, damit die nachfolgende cream-Sektion
          ihr doppeltes oberes Padding an der Naht abbaut (siehe index.css,
          layer utilities). Setzt keine weiteren Styles — es gibt keine bare
          .editorial-section-Regel, nur die Geschwister-Naht-Regel greift. */}
      <section
        className="editorial-section bg-[var(--bg-primary)] px-[var(--container-pad)] pb-[var(--section-y-normal-mobile)] md:px-[var(--container-pad-md)] md:pb-[var(--section-y-spacious-desktop)]"
        data-variant="cream"
        data-toc-skip
        aria-label="Materialien zum Vertiefen — Filter und Tile-Liste"
      >
        <div className="mx-auto max-w-page">
          <div
            className="flex flex-wrap items-baseline gap-x-1 gap-y-2 overflow-x-auto pb-3"
            role="tablist"
            aria-label="Filter Verstehen-Materialien"
          >
            {verstehenCategories.map(cat => (
              <EditorialPillButton
                key={cat.id}
                variant="filter"
                selected={activeFilter === cat.id}
                onClick={() => {
                  setActiveFilter(cat.id);
                  scrollToResults();
                }}
              >
                <span>{cat.label}</span>
                <span aria-hidden="true" className="mx-2.5 opacity-90">
                  ·
                </span>
                <span>{cat.count}</span>
              </EditorialPillButton>
            ))}
          </div>

          <div
            ref={gridRef}
            className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredItems.map(item => {
              const textVersionHref = getHandoutTextVersionHrefBySource(
                item.pdfUrl
              );
              const pdfHref = getHandoutOpenHref(item.pdfUrl) ?? item.pdfUrl;

              return (
                <article key={item.id} className="material-library-card">
                  <a
                    href={item.webpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.alt} – Vorschau öffnen`}
                    className="material-library-card__media"
                  >
                    <img
                      src={item.thumbnailUrl ?? item.webpUrl}
                      alt={item.alt}
                      className="material-library-card__image"
                      loading="lazy"
                      width={600}
                      height={848}
                      decoding="async"
                    />
                  </a>

                  <div className="material-library-card__content">
                    <p className="material-library-card__kicker">
                      {item.category === "grundlagen"
                        ? "Grundlagen"
                        : "Stress & Gehirn"}
                    </p>
                    <h3 className="material-library-card__title">
                      {item.title}
                    </h3>
                    <p className="material-library-card__description">
                      {item.description}
                    </p>

                    <p className="material-library-card__actions">
                      {textVersionHref ? (
                        <Link
                          href={textVersionHref}
                          aria-label={`Textversion lesen: ${item.title}`}
                          className="editorial-link"
                        >
                          Textversion lesen
                        </Link>
                      ) : null}
                      <a
                        href={pdfHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`PDF öffnen: ${item.title} (neuer Tab)`}
                        className="editorial-link"
                      >
                        PDF öffnen
                      </a>
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <p
            className="mt-8 flex flex-wrap gap-x-5 gap-y-1"
            style={{ fontSize: "var(--text-sm)" }}
          >
            <Link href="/materialien" className="editorial-link">
              Alle Materialien anzeigen
            </Link>
            <Link href="/barrierefreiheit" className="editorial-link">
              Warum Textversionen hilfreich sind
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
