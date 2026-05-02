import { useRef, useState } from "react";
import { BookOpen, Brain, FileText, Filter, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { EditorialProse, EditorialSection } from "@/components/editorial";
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
    icon: Filter,
    count: verstehenInfografiken.length,
  },
  {
    id: "grundlagen",
    label: "Grundlagen",
    icon: BookOpen,
    count: verstehenInfografiken.filter(i => i.category === "grundlagen")
      .length,
  },
  {
    id: "neurobiologie",
    label: "Stress & Gehirn",
    icon: Brain,
    count: verstehenInfografiken.filter(i => i.category === "neurobiologie")
      .length,
  },
] as const;

const labelStyle = {
  fontSize: "var(--text-xs)",
  letterSpacing: "var(--tracking-caps)",
  color: "var(--fg-tertiary)",
  fontWeight: 500,
} as const;

const entryTitleStyle = {
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
    <EditorialSection
      label="Materialien"
      title="Materialien zum Vertiefen"
      rule
    >
      <EditorialProse>
        <p>
          Diese Materialien ergänzen die Seite, ersetzen sie aber nicht. Wenn
          verfügbar, führt «Textversion lesen» zur lesbaren Web-Version.
          Beginnen Sie mit den Grundlagen, wenn Sie gerade Orientierung
          brauchen.
        </p>
      </EditorialProse>

      <div
        className="mt-6 flex flex-wrap gap-2 overflow-x-auto pb-3 -mx-4 px-4 md:mx-0 md:px-0"
        role="group"
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
            className="inline-flex items-center gap-1.5"
          >
            <cat.icon className="h-4 w-4 text-[color:var(--accent-label)]" />
            <span>{cat.label}</span>
            <span style={{ fontSize: "var(--text-xs)" }}>({cat.count})</span>
          </EditorialPillButton>
        ))}
      </div>

      <div
        ref={gridRef}
        className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2"
      >
        {filteredItems.map(item => {
          const textVersionHref = getHandoutTextVersionHrefBySource(
            item.pdfUrl
          );
          const pdfHref = getHandoutOpenHref(item.pdfUrl) ?? item.pdfUrl;

          return (
            <article
              key={item.id}
              className={`${item.featured && activeFilter === "alle" ? "sm:col-span-2" : ""} space-y-3 border-t pt-6`}
              style={{ borderColor: "var(--rule-color)" }}
            >
              <a
                href={item.webpUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.alt} – Vorschau öffnen`}
                className="block overflow-hidden rounded-sm"
                style={{ backgroundColor: "var(--bg-elevated)" }}
              >
                <img
                  src={item.thumbnailUrl ?? item.webpUrl}
                  alt={item.alt}
                  className="aspect-[3/4] w-full object-cover object-top"
                  loading="lazy"
                  width={600}
                  height={848}
                  decoding="async"
                />
              </a>

              <p className="uppercase" style={labelStyle}>
                {item.category === "grundlagen"
                  ? "Grundlagen"
                  : "Stress & Gehirn"}
              </p>
              <h3 style={entryTitleStyle}>{item.title}</h3>
              <p style={bodyStyle}>{item.description}</p>

              <p
                className="flex flex-wrap gap-x-5 gap-y-1 pt-1"
                style={{ fontSize: "var(--text-sm)" }}
              >
                {textVersionHref ? (
                  <Link
                    href={textVersionHref}
                    aria-label={`Textversion lesen: ${item.title}`}
                    className="editorial-link"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      Textversion lesen
                    </span>
                  </Link>
                ) : null}
                <a
                  href={pdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`PDF öffnen: ${item.title} (neuer Tab)`}
                  className="editorial-link"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <ExternalLink className="h-4 w-4" />
                    PDF öffnen
                  </span>
                </a>
              </p>
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
    </EditorialSection>
  );
}
