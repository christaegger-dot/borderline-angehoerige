import {
  CURRENT_PUBLICATION_STATUS,
  pageGovernance,
  type PageGovernance,
} from "@/data/pageGovernance";

type ReviewBadgeVariant = "compact" | "detailed";

interface ReviewBadgeProps {
  path: string;
  variant?: ReviewBadgeVariant;
  className?: string;
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");

  if (!year || !month || !day) return date;

  return `${day}.${month}.${year}`;
}

export default function ReviewBadge({
  path,
  variant = "compact",
  className = "",
}: ReviewBadgeProps) {
  const meta = pageGovernance[path];

  if (!meta) return null;

  const lastReviewed = meta.lastReviewed
    ? `${formatDate(meta.lastReviewed)} – frühere Prüfangabe im Projekt; kein Nachweis einer Freigabe für den aktuellen Stand`
    : "Keine frühere Prüfangabe im Projekt vermerkt";

  const nextReviewDue = meta.nextReviewDue
    ? formatDate(meta.nextReviewDue)
    : null;

  if (variant === "detailed") {
    return (
      <aside
        className={`review-badge review-badge--detailed ${className}`.trim()}
        aria-label="Review-Informationen"
      >
        <p className="review-badge__heading">Stand und Prüfung</p>
        <ReviewDetails
          lastReviewed={lastReviewed}
          nextReviewDue={nextReviewDue}
          owner={meta.owner}
          meta={meta}
        />
      </aside>
    );
  }

  const summary = meta.editorialUpdated
    ? `Text aktualisiert: ${formatDate(meta.editorialUpdated)}`
    : meta.lastReviewed
      ? `Frühere Prüfangabe: ${formatDate(meta.lastReviewed)}`
      : "Fachliche Prüfung: ausstehend";

  return (
    <details
      className={`review-badge review-badge--compact ${className}`.trim()}
      aria-label="Review-Informationen"
    >
      <summary className="review-badge__summary">
        <span>
          {summary}
          <span className="block text-xs font-normal">
            Freigabe des aktuellen Stands ausstehend
          </span>
        </span>
        <span className="review-badge__summary-action">Details</span>
      </summary>
      <ReviewDetails
        lastReviewed={lastReviewed}
        nextReviewDue={nextReviewDue}
        owner={meta.owner}
        meta={meta}
      />
    </details>
  );
}

function ReviewDetails({
  lastReviewed,
  nextReviewDue,
  owner,
  meta,
}: {
  lastReviewed: string;
  nextReviewDue: string | null;
  owner?: string;
  meta: PageGovernance;
}) {
  return (
    <dl className="review-badge__details">
      <div className="review-badge__details-row">
        <dt className="review-badge__term">Frühere Prüfangabe:</dt>
        <dd>{lastReviewed}</dd>
      </div>

      <div className="review-badge__details-row">
        <dt className="review-badge__term">Aktueller Freigabestand:</dt>
        <dd>{CURRENT_PUBLICATION_STATUS.notice}</dd>
      </div>

      {meta.editorialUpdated && (
        <div className="review-badge__details-row">
          <dt className="review-badge__term">Text aktualisiert:</dt>
          <dd>
            {formatDate(meta.editorialUpdated)} – keine neue fachliche Freigabe
          </dd>
        </div>
      )}
      {meta.contactCheck && (
        <div className="review-badge__details-row">
          <dt className="review-badge__term">Früherer Kontaktabgleich:</dt>
          <dd>
            {formatDate(meta.contactCheck.date)}: {meta.contactCheck.scope}.
            Keine Bestätigung der heutigen Erreichbarkeit.{" "}
            <a
              className="editorial-link"
              href={meta.contactCheck.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Offizielle Quelle
            </a>
          </dd>
        </div>
      )}
      {nextReviewDue && (
        <div className="review-badge__details-row">
          <dt className="review-badge__term">Nächste Prüfung:</dt>
          <dd>
            {nextReviewDue}
            {meta.nextReviewDue &&
            meta.nextReviewDue < new Date().toISOString().slice(0, 10)
              ? " – erneute Fachprüfung ausstehend"
              : ""}
          </dd>
        </div>
      )}

      {owner && (
        <div className="review-badge__details-row">
          <dt className="review-badge__term">Projektzuordnung:</dt>
          <dd>{owner}; namentlich verantwortete Freigabe ausstehend</dd>
        </div>
      )}
    </dl>
  );
}
