import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { EditorialSection } from "@/components/editorial";
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

const labelStyle = {
  fontSize: "var(--text-xs)",
  letterSpacing: "var(--tracking-caps)",
  color: "var(--fg-tertiary)",
  fontWeight: 500,
} as const;

const titleStyle = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-md)",
  fontWeight: "var(--weight-display)",
  lineHeight: "var(--lh-snug)",
  color: "var(--fg-primary)",
  letterSpacing: "var(--tracking-tight)",
};

const bodyStyle = {
  fontSize: "var(--text-sm)",
  lineHeight: "var(--lh-relaxed)",
  color: "var(--fg-secondary)",
};

function MaterialEntry({
  item,
  onPreview,
}: {
  item: MaterialItem;
  onPreview: (image: string, title: string) => void;
}) {
  const previewSrc = item.isHtml ? (item.previewUrl ?? item.url) : item.url;
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
    <article
      className="space-y-3 border-t pt-6"
      style={{ borderColor: "var(--rule-color)" }}
    >
      <button
        type="button"
        className="block w-full overflow-hidden rounded-sm"
        style={{ backgroundColor: "var(--bg-elevated)" }}
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
          className="aspect-[3/4] w-full object-cover object-top"
          loading="lazy"
          width={400}
          height={533}
          decoding="async"
        />
      </button>

      <p className="uppercase" style={labelStyle}>
        {categoryLabel[item.category]}
        <span aria-hidden="true"> · </span>
        {item.kind}
        {item.verifiedAt && (
          <>
            <span aria-hidden="true"> · </span>
            <span style={{ textTransform: "none", letterSpacing: 0 }}>
              {item.verifiedAt}
            </span>
          </>
        )}
      </p>

      <h3 style={titleStyle}>{item.title}</h3>
      <p style={bodyStyle}>{item.description}</p>
      {textVersionPreferred && textVersionHref ? (
        <p
          style={{
            fontSize: "var(--text-xs)",
            lineHeight: "var(--lh-relaxed)",
            color: "var(--fg-tertiary)",
          }}
        >
          Für bildbasierte PDFs ist die Textversion die empfohlene Lesefassung.
        </p>
      ) : null}

      <p
        className="flex flex-wrap gap-x-5 gap-y-1 pt-1"
        style={{ fontSize: "var(--text-sm)" }}
      >
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
      {/* ── 3 Nach Situation ── QuickStarts «Was hilft gerade jetzt?» */}
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
            Nach Situation
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
            Schneller Einstieg
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-2xl)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
              letterSpacing: "var(--tracking-tight)",
              marginBottom: "var(--space-5)",
            }}
          >
            Was hilft gerade jetzt?
          </h2>
          <ul className="space-y-6">
            {quickStarts.map(item => (
              <li key={item.id} className="space-y-2">
                <h3 style={titleStyle}>{item.title}</h3>
                <p style={bodyStyle}>{item.text}</p>
                <p style={{ fontSize: "var(--text-sm)" }}>
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

      {/* ── 4 Kernmaterialien ── EditorialSection-Header + full-width Tile-Grid */}
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
            Kernmaterialien
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
            Bibliothek
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-2xl)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
              letterSpacing: "var(--tracking-tight)",
              marginBottom: "var(--space-5)",
            }}
          >
            Empfohlene Kernmaterialien
          </h2>
          <p
            className="max-w-[36em]"
            style={{
              fontSize: "var(--text-md)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-secondary)",
            }}
          >
            Wenn Sie gerade nicht lange suchen möchten, beginnen Sie mit diesen
            Materialien. Sie decken Krise, Orientierung, Kommunikation, Grenzen
            und Selbstfürsorge ab.
          </p>
          <p className="mt-3" style={{ fontSize: "var(--text-sm)" }}>
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
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
            {coreMaterials.map(item => (
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
        </div>
      </section>

      {/* ── 5 Nach Kategorie ── EditorialSection-Header + Filter-Tabs (OLD pattern) + Tile-Grid */}
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
            Nach Kategorie
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
            Bibliothek
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-2xl)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
              letterSpacing: "var(--tracking-tight)",
              marginBottom: "var(--space-5)",
            }}
          >
            Weitere Materialien nach Kategorie
          </h2>
        </EditorialSection.Body>
      </EditorialSection>

      <section
        className="bg-[var(--bg-primary)] px-[var(--container-pad)] pb-20 md:px-[var(--container-pad-md)] md:pb-[120px]"
        aria-label="Materialien nach Kategorie — Filter und Tile-Liste"
      >
        <div className="mx-auto max-w-[1240px]">
          <div
            className="flex flex-wrap items-baseline gap-x-1 gap-y-2 overflow-x-auto pb-3"
            role="tablist"
            aria-label="Filter Materialien nach Kategorie"
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
                  <span aria-hidden="true" className="mx-2.5 opacity-50">
                    ·
                  </span>
                  <span className="opacity-70">{count}</span>
                </EditorialPillButton>
              );
            })}
          </div>

          <div ref={gridRef} className="scroll-mt-24 md:scroll-mt-28">
            {secondaryMaterials.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
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
                className="mt-10 border-t pt-8 text-center"
                style={{ ...bodyStyle, borderColor: "var(--rule-color)" }}
              >
                In dieser Kategorie sind aktuell keine weiteren Materialien
                sichtbar.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── 6 Weiter ── Schluss-Hinweis */}
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
            Weiter
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <p
            style={{
              fontSize: "var(--text-md)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-secondary)",
            }}
          >
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
          </p>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 7 Verwandt ── EditorialSection cream-deep + RelatedLinksEditorial flush */}
      <EditorialSection variant="cream-deep">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Verwandt
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
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
          <motion.div
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
          </motion.div>
        </div>
      )}
    </>
  );
}
