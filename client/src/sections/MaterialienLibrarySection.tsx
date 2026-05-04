import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { EditorialSectionBlock, EditorialProse } from "@/components/editorial";
import { EditorialPillButton } from "@/components/ui/EditorialPillButton";
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

  const secondaryMaterials = useMemo(
    () =>
      activeCategory === "alle"
        ? materials.filter(item => item.priority !== "core")
        : materials.filter(
            item => item.priority !== "core" && item.category === activeCategory
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
      {/* ── QuickStarts: «Was hilft gerade jetzt?» ── */}
      <EditorialSectionBlock
        label="Schneller Einstieg"
        title="Was hilft gerade jetzt?"
      >
        <ul className="mt-2 space-y-6">
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
      </EditorialSectionBlock>

      {/* ── Empfohlene Kernmaterialien ── */}
      <EditorialSectionBlock
        label="Kernmaterialien"
        title="Empfohlene Kernmaterialien"
        rule
      >
        <EditorialProse>
          <p>
            Wenn Sie gerade nicht lange suchen möchten, beginnen Sie mit diesen
            Materialien. Sie decken Krise, Orientierung, Kommunikation, Grenzen
            und Selbstfürsorge ab.
          </p>
          <p>
            <button
              type="button"
              onClick={scrollToResults}
              className="editorial-link"
            >
              Nach Kategorien filtern
            </button>
          </p>
        </EditorialProse>
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
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
      </EditorialSectionBlock>

      {/* ── Filter + Sekundär-Grid ── */}
      <EditorialSectionBlock
        label="Bibliothek"
        title="Weitere Materialien nach Kategorie"
        rule
      >
        {/* Filter-Pills (Editorial Active-State: --accent-primary border + --bg-elevated bg) */}
        <div
          className="mt-2 flex flex-wrap gap-2 overflow-x-auto pb-3 -mx-4 px-4 md:mx-0 md:px-0"
          role="group"
          aria-label="Filter nach Kategorie"
        >
          {categoryMeta.map(cat => {
            const count =
              cat.id === "alle"
                ? materials.filter(item => item.priority !== "core").length
                : materials.filter(
                    item => item.priority !== "core" && item.category === cat.id
                  ).length;
            const isActive = activeCategory === cat.id;
            return (
              <EditorialPillButton
                key={cat.id}
                variant="filter"
                selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={isActive}
              >
                {cat.label}
                <span
                  className="ml-1.5"
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--fg-tertiary)",
                  }}
                >
                  ({count})
                </span>
              </EditorialPillButton>
            );
          })}
        </div>

        <div ref={gridRef} className="scroll-mt-24 md:scroll-mt-28">
          {secondaryMaterials.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
      </EditorialSectionBlock>

      {/* ── Besondere Konstellationen ── */}
      <EditorialSectionBlock
        label="Spezialfälle"
        title="Besondere Konstellationen"
        rule
      >
        <EditorialProse>
          <p>
            Manche Materialien helfen besonders, wenn Kinder mitbetroffen sind,
            wenn Schuld dominiert oder wenn Grenzen und Distanz zum Thema
            werden.
          </p>
        </EditorialProse>
        <p
          className="mt-6 flex flex-wrap gap-x-5 gap-y-1"
          style={{ fontSize: "var(--text-sm)" }}
        >
          <button
            type="button"
            onClick={() => {
              setActiveCategory("verstehen");
              scrollToResults();
            }}
            className="editorial-link"
          >
            Kinder &amp; Familie
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("selbstfuersorge");
              scrollToResults();
            }}
            className="editorial-link"
          >
            Schuld &amp; Erschöpfung
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("grenzen");
              scrollToResults();
            }}
            className="editorial-link"
          >
            Grenzen &amp; Selbstschutz
          </button>
        </p>
      </EditorialSectionBlock>

      {/* ── Von hier aus weiter ── */}
      <EditorialSectionBlock label="Weiter" title="Von hier aus weiter" rule>
        <EditorialProse>
          <p>
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
        </EditorialProse>
      </EditorialSectionBlock>

      {/* ── Preview Modal ── */}
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
