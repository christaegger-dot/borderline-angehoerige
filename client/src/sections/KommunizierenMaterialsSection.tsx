import { useRef, useState } from "react";
import {
  ExternalLink,
  FileText,
  Filter,
  Heart,
  MessageCircle,
  ShieldAlert,
} from "lucide-react";
import { Link } from "wouter";
import { EditorialProse, EditorialSectionBlock } from "@/components/editorial";
import { EditorialPillButton } from "@/components/ui/EditorialPillButton";
import {
  kommItems,
  kommSubcategories,
  type KommunikationsKategorie,
} from "@/content/kommunizieren";
import { getHandoutOpenHref } from "@/content/handouts";
import { getHandoutTextVersionHrefBySource } from "@/content/handoutTextVersions";

function CategoryIcon({
  icon,
}: {
  icon: "filter" | "heart" | "shield-alert" | "message-circle";
}) {
  if (icon === "heart") {
    return <Heart className="h-4 w-4 text-[color:var(--accent-label)]" />;
  }
  if (icon === "shield-alert") {
    return <ShieldAlert className="h-4 w-4 text-[color:var(--accent-label)]" />;
  }
  if (icon === "message-circle") {
    return (
      <MessageCircle className="h-4 w-4 text-[color:var(--accent-label)]" />
    );
  }
  return <Filter className="h-4 w-4 text-[color:var(--accent-label)]" />;
}

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

export default function KommunizierenMaterialsSection() {
  const [activeFilter, setActiveFilter] =
    useState<KommunikationsKategorie>("alle");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeFilter === "alle"
      ? kommItems
      : kommItems.filter(item => item.category === activeFilter);

  const scrollToResults = () => {
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <EditorialSectionBlock
      label="Materialien"
      title="Spickzettel & Infografiken"
      rule
    >
      <EditorialProse>
        <p>
          Diese Materialien verdichten Gesprächstechniken, Deeskalation und
          konkrete Formulierungen. Wenn verfügbar, führt «Textversion lesen» zur
          lesbaren Web-Version. «PDF öffnen» öffnet die A4-Druckversion im neuen
          Tab.
        </p>
      </EditorialProse>

      <div
        className="mt-6 flex flex-wrap gap-2 overflow-x-auto pb-3 -mx-4 px-4 md:mx-0 md:px-0"
        role="group"
        aria-label="Filter Kommunikations-Materialien"
      >
        {kommSubcategories.map(category => {
          const count =
            category.id === "alle"
              ? kommItems.length
              : kommItems.filter(item => item.category === category.id).length;

          return (
            <EditorialPillButton
              key={category.id}
              variant="filter"
              selected={activeFilter === category.id}
              onClick={() => {
                setActiveFilter(category.id);
                scrollToResults();
              }}
              className="inline-flex items-center gap-1.5"
            >
              <CategoryIcon icon={category.icon} />
              <span>{category.label}</span>
              <span style={{ fontSize: "var(--text-xs)" }}>({count})</span>
            </EditorialPillButton>
          );
        })}
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
              key={item.title}
              className={`${filteredItems.length > 1 && filteredItems[0]?.title === item.title ? "sm:col-span-2" : ""} space-y-3 border-t pt-6`}
              style={{ borderColor: "var(--rule-color)" }}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} – Vorschau öffnen`}
                className="block overflow-hidden rounded-sm"
                style={{ backgroundColor: "var(--bg-elevated)" }}
              >
                <img
                  src={item.thumbnailUrl ?? item.url}
                  alt={item.title}
                  className="aspect-[4/3] w-full object-cover object-top"
                  loading="lazy"
                  width={600}
                  height={848}
                  decoding="async"
                />
              </a>

              <p className="uppercase" style={labelStyle}>
                {categoryLabel(item.category)}
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
          Alle Materialien ansehen
        </Link>
      </p>
    </EditorialSectionBlock>
  );
}

function categoryLabel(category: Exclude<KommunikationsKategorie, "alle">) {
  if (category === "techniken") return "Techniken";
  if (category === "konflikte") return "Konflikte";
  return "Praxis";
}
