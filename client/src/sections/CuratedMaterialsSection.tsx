import { Link } from "wouter";
import {
  DisplayHeading,
  EditorialBody,
  EditorialSection,
  EyebrowLabel,
} from "@/components/editorial";
import { getHandoutOpenHref } from "@/content/handouts";
import { getHandoutTextVersionHrefBySource } from "@/content/handoutTextVersions";

export interface CuratedMaterialCard {
  id: string;
  title: string;
  description: string;
  categoryLabel: string;
  imageUrl: string;
  thumbnailUrl?: string;
  pdfUrl: string;
  previewUrl?: string;
  guidance?: string;
}

interface CuratedMaterialsSectionProps {
  marginLabel: string;
  title: string;
  intro: string;
  curationNote: string;
  items: CuratedMaterialCard[];
  ariaLabel: string;
  allMaterialsLabel?: string;
}

export default function CuratedMaterialsSection({
  marginLabel,
  title,
  intro,
  curationNote,
  items,
  ariaLabel,
  allMaterialsLabel = "Alle Materialien ansehen",
}: CuratedMaterialsSectionProps) {
  const visibleItems = items.slice(0, 3);

  if (visibleItems.length === 0) return null;

  return (
    <>
      <EditorialSection variant="cream" density="compact">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            {marginLabel}
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Materialien</EyebrowLabel>
          <DisplayHeading level={2}>{title}</DisplayHeading>
          <EditorialBody className="max-w-[36em]">{intro}</EditorialBody>
        </EditorialSection.Body>
        <EditorialSection.Aside background="cream-deep">
          <p className="topic-materials-note">{curationNote}</p>
        </EditorialSection.Aside>
      </EditorialSection>

      <section
        className="bg-[var(--bg-primary)] px-[var(--container-pad)] pb-[var(--section-y-normal-mobile)] md:px-[var(--container-pad-md)] md:pb-[var(--section-y-normal-desktop)]"
        aria-label={ariaLabel}
        data-toc-skip
      >
        <div className="mx-auto max-w-page">
          <div className="topic-materials-grid">
            {visibleItems.map(item => (
              <MaterialCard key={item.id} item={item} />
            ))}
          </div>
          <p className="topic-materials-library-link">
            <Link href="/materialien" className="editorial-link">
              {allMaterialsLabel}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

function MaterialCard({ item }: { item: CuratedMaterialCard }) {
  const textVersionHref = getHandoutTextVersionHrefBySource(item.pdfUrl);
  const pdfHref = getHandoutOpenHref(item.pdfUrl) ?? item.pdfUrl;
  const imageSrc = item.thumbnailUrl ?? item.imageUrl;
  const previewHref = item.previewUrl ?? item.imageUrl;

  return (
    <article className="topic-material-card">
      <a
        href={previewHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.title} – Vorschau öffnen`}
        className="topic-material-card__media"
      >
        <img src={imageSrc} alt={item.title} loading="lazy" decoding="async" />
      </a>
      <div className="topic-material-card__content">
        <p className="topic-material-card__kicker">{item.categoryLabel}</p>
        <h3 className="topic-material-card__title">{item.title}</h3>
        <p className="topic-material-card__description">{item.description}</p>
        {item.guidance ? (
          <p className="topic-material-card__guidance">{item.guidance}</p>
        ) : null}
        <div className="topic-material-card__actions">
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
        </div>
      </div>
    </article>
  );
}
