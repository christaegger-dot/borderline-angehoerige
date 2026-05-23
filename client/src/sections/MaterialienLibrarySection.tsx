import { useMemo, useRef, useState } from "react";
import { m } from "framer-motion";
import { Link } from "wouter";
import {
  DisplayHeading,
  EditorialBody,
  EditorialSection,
  EyebrowLabel,
} from "@/components/editorial";
import { EditorialPillButton } from "@/components/ui/EditorialPillButton";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import {
  categoryMeta,
  materials,
  quickStarts,
  type MaterialCategory,
  type MaterialItem,
} from "@/content/materialien";
import {
  getHandoutDownloadHref,
  getHandoutOpenHref,
  prefersHandoutTextVersion,
} from "@/content/handouts";
import { getHandoutTextVersionHrefBySource } from "@/content/handoutTextVersions";

const categoryLabel: Record<Exclude<MaterialCategory, "alle">, string> = {
  verstehen: "Verstehen",
  unterstuetzen: "Unterstützen",
  kommunizieren: "Kommunizieren",
  grenzen: "Grenzen",
  selbstfuersorge: "Selbstfürsorge",
  genesung: "Genesung",
  soforthilfe: "Soforthilfe",
};

function SectionKicker({ children }: { children: string }) {
  return (
    <>
      <span className="editorial-section-kicker">{children}</span>
      <div
        aria-hidden="true"
        className="mt-3 border-t"
        style={{ borderColor: "var(--rule-color)" }}
      />
    </>
  );
}

function MaterialEntry({
  item,
  onPreview,
  eager = false,
}: {
  item: MaterialItem;
  onPreview: (image: string, title: string) => void;
  eager?: boolean;
}) {
  const previewSrc = item.isHtml
    ? (item.previewUrl ?? item.url)
    : (item.thumbnailUrl ?? item.url);
  const pdfSource = item.pdfUrl ?? item.downloadUrl;
  const openHref = item.isHtml
    ? (item.downloadUrl ?? item.url)
    : (getHandoutOpenHref(pdfSource) ?? item.url);
  const downloadHref = getHandoutDownloadHref(pdfSource);
  const textVersionHref = item.isHtml
    ? null
    : getHandoutTextVersionHrefBySource(pdfSource);
  const textVersionPreferred = prefersHandoutTextVersion(pdfSource);
  const openLabel = item.isHtml ? "Öffnen" : "PDF öffnen";

  return (
    <article className="material-library-card">
      <button
        type="button"
        className="material-library-card__media"
        onClick={() => {
          if (item.isHtml) {
            window.open(openHref, "_blank", "noopener,noreferrer");
          } else {
            onPreview(item.url, item.title);
          }
        }}
        aria-label={`${item.title} öffnen`}
      >
        <img
          src={previewSrc}
          alt={item.title}
          className="material-library-card__image"
          loading={eager ? "eager" : "lazy"}
          width={400}
          height={533}
          decoding="async"
        />
      </button>

      <div className="material-library-card__content">
        <p className="material-library-card__kicker">
          {categoryLabel[item.category]}
          <span aria-hidden="true"> · </span>
          {item.kind}
        </p>

        <h3 className="material-library-card__title">{item.title}</h3>
        <p className="material-library-card__description">{item.description}</p>
        {textVersionPreferred && textVersionHref ? (
          <p className="material-library-card__note">
            Für bildbasierte PDFs ist die Textversion die empfohlene
            Lesefassung.
          </p>
        ) : null}

        <p className="material-library-card__actions">
          {textVersionHref && (
            <Link
              href={textVersionHref}
              aria-label={`Textversion lesen: ${item.title}`}
              className="editorial-link"
            >
              Textversion lesen
            </Link>
          )}
          <a
            href={openHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.title} öffnen`}
            className="editorial-link"
          >
            {openLabel}
          </a>
          {downloadHref && (
            <a
              href={downloadHref}
              download=""
              aria-label={`${item.title} herunterladen`}
              className="editorial-link"
            >
              Herunterladen
            </a>
          )}
        </p>
        {item.verifiedAt && (
          <p className="material-library-card__verified">
            Geprüft: {item.verifiedAt}
          </p>
        )}
      </div>
    </article>
  );
}

export default function MaterialienLibrarySection() {
  const [activeCategory, setActiveCategory] =
    useState<MaterialCategory>("alle");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("Vorschau");
  const gridRef = useRef<HTMLDivElement>(null);

  const coreMaterials = useMemo(
    () => materials.filter(item => item.priority === "core"),
    []
  );

  const isInLibrary = (item: MaterialItem) =>
    item.priority !== "core" || item.showInLibrary === true;

  const secondaryMaterials = useMemo(
    () =>
      activeCategory === "alle"
        ? materials.filter(isInLibrary)
        : materials.filter(
            item => isInLibrary(item) && item.category === activeCategory
          ),
    [activeCategory]
  );

  const scrollToResults = () => {
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <>
      <EditorialSection variant="cream" density="compact">
        <EditorialSection.MarginNote>
          <SectionKicker>Nach Situation</SectionKicker>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Schneller Einstieg</EyebrowLabel>
          <DisplayHeading level={2}>Was hilft gerade jetzt?</DisplayHeading>
          <p className="editorial-small-copy mt-4 max-w-[36em]">
            Wählen Sie nach Lage, nicht nach Vollständigkeit. Eine gute erste
            Ressource reicht oft mehr als zehn geöffnete Tabs.
          </p>
          <ul
            className="mt-8 grid divide-y sm:grid-cols-2 sm:gap-x-8 sm:divide-y-0"
            style={{ borderColor: "var(--rule-color)" }}
          >
            {quickStarts.map(item => (
              <li
                key={item.id}
                className="border-t py-5 first:border-t-0 first:pt-0 sm:first:border-t sm:first:pt-5"
                style={{ borderColor: "var(--rule-color)" }}
              >
                <p className="editorial-micro-label">
                  {categoryLabel[item.id]}
                </p>
                <h3 className="editorial-card-heading mt-3">{item.title}</h3>
                <p className="editorial-small-copy mt-2">{item.text}</p>
                <p className="editorial-small-copy mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(item.id);
                      scrollToResults();
                    }}
                    className="editorial-link"
                  >
                    Materialien dieser Kategorie ansehen
                  </button>
                </p>
              </li>
            ))}
          </ul>
        </EditorialSection.Body>
      </EditorialSection>

      <EditorialSection variant="cream" density="compact">
        <EditorialSection.MarginNote>
          <SectionKicker>Kernmaterialien</SectionKicker>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Bibliothek</EyebrowLabel>
          <DisplayHeading level={2}>Empfohlen für den Anfang</DisplayHeading>
          <EditorialBody className="max-w-[36em]">
            Wenn Sie gerade nicht lange suchen möchten, beginnen Sie mit diesen
            Materialien. Sie decken Krise, Orientierung, Kommunikation, Grenzen
            und Selbstfürsorge ab.
          </EditorialBody>
          <p className="editorial-small-copy mt-3">
            <button
              type="button"
              onClick={scrollToResults}
              className="editorial-link"
            >
              Nach Kategorien filtern
            </button>
          </p>
        </EditorialSection.Body>
      </EditorialSection>

      <section
        className="bg-[var(--bg-primary)] px-[var(--container-pad)] pb-12 md:px-[var(--container-pad-md)] md:pb-16"
        aria-label="Empfohlene Kernmaterialien — Tile-Liste"
      >
        <div className="mx-auto max-w-page">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {coreMaterials.map(item => (
              <MaterialEntry
                key={item.id}
                item={item}
                eager
                onPreview={(image, title) => {
                  setPreviewImage(image);
                  setPreviewTitle(title);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <EditorialSection variant="cream" density="compact">
        <EditorialSection.MarginNote>
          <SectionKicker>Nach Kategorie</SectionKicker>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Bibliothek</EyebrowLabel>
          <DisplayHeading level={2}>Alle Materialien</DisplayHeading>
          <EditorialBody className="max-w-[36em]">
            Filtern Sie die Sammlung, wenn Sie gezielt nach einem Thema suchen.
            Die vollständige Galerie bleibt hier, damit einzelne Inhaltsseiten
            ruhiger und kuratierter bleiben können.
          </EditorialBody>
        </EditorialSection.Body>
      </EditorialSection>

      <section
        className="bg-[var(--bg-primary)] px-[var(--container-pad)] pb-[var(--section-y-normal-mobile)] md:px-[var(--container-pad-md)] md:pb-[var(--section-y-normal-desktop)]"
        aria-label="Materialien nach Kategorie — Filter und Tile-Liste"
      >
        <div className="mx-auto max-w-page">
          <div
            className="flex flex-wrap items-baseline gap-x-2 gap-y-2 overflow-x-auto border-y py-4"
            role="tablist"
            aria-label="Filter Materialien nach Kategorie"
            style={{ borderColor: "var(--rule-color)" }}
          >
            {categoryMeta.map(cat => {
              const count =
                cat.id === "alle"
                  ? materials.filter(isInLibrary).length
                  : materials.filter(
                      item => isInLibrary(item) && item.category === cat.id
                    ).length;
              return (
                <EditorialPillButton
                  key={cat.id}
                  variant="filter"
                  selected={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span aria-hidden="true" className="mx-2.5 opacity-90">
                    ·
                  </span>
                  <span>{count}</span>
                </EditorialPillButton>
              );
            })}
          </div>

          <div ref={gridRef} className="scroll-mt-24 md:scroll-mt-28">
            {secondaryMaterials.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {secondaryMaterials.map(item => (
                  <MaterialEntry
                    key={item.id}
                    item={item}
                    onPreview={(image, title) => {
                      setPreviewImage(image);
                      setPreviewTitle(title);
                    }}
                  />
                ))}
              </div>
            ) : (
              <p
                className="editorial-small-copy mt-10 border-t pt-8 text-center"
                style={{ borderColor: "var(--rule-color)" }}
              >
                In dieser Kategorie sind aktuell keine weiteren Materialien
                sichtbar.
              </p>
            )}
          </div>
        </div>
      </section>

      <EditorialSection variant="cream" density="compact">
        <EditorialSection.MarginNote>
          <SectionKicker>Weiter</SectionKicker>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EditorialBody>
            Wenn Sie gerade eher Orientierung als Downloads brauchen, sind die
            Hauptseiten oft der bessere Einstieg —{" "}
            <Link href="/verstehen" className="editorial-link">
              Verstehen
            </Link>
            ,{" "}
            <Link href="/kommunizieren" className="editorial-link">
              Kommunizieren
            </Link>
            ,{" "}
            <Link href="/grenzen" className="editorial-link">
              Grenzen
            </Link>{" "}
            oder{" "}
            <Link href="/selbstfuersorge" className="editorial-link">
              Selbstfürsorge
            </Link>
            .
          </EditorialBody>
        </EditorialSection.Body>
      </EditorialSection>

      <EditorialSection variant="cream-deep" density="compact">
        <EditorialSection.MarginNote>
          <SectionKicker>Verwandt</SectionKicker>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <RelatedLinksEditorial
            flush
            links={[
              {
                href: "/soforthilfe",
                title: "Soforthilfe & Notfallnummern",
                description:
                  "Akute Notfall-Kontakte, Krisenkarten und 24/7-Hotlines.",
              },
              {
                href: "/wegweiser",
                title: "Situations-Wegweiser",
                description:
                  "Schritt-für-Schritt-Hilfe für konkrete Krisenszenarien.",
              },
              {
                href: "/notfallkarte",
                title: "Notfallkarte",
                description:
                  "Persönliche Notfallkarte zum Ausdrucken — Kontakte, Skills und Anker für die Krise.",
              },
            ]}
          />
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── Preview Modal (unverändert) ── */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-h-[90vh] max-w-4xl overflow-auto"
          >
            <img
              src={previewImage}
              alt={`Vorschau: ${previewTitle}`}
              className="h-auto w-full rounded-lg shadow-2xl"
              width={1600}
              height={892}
              loading="lazy"
              decoding="async"
            />
            <p className="mt-4 text-center text-sm text-white">
              Klicken Sie irgendwo, um zu schliessen
            </p>
          </m.div>
        </div>
      )}
    </>
  );
}
