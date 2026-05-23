import { pageGovernance } from "@/data/pageGovernance";

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
    ? `geprüft am ${formatDate(meta.lastReviewed)}`
    : "Noch kein Reviewdatum gesetzt";

  const nextReviewDue = meta.nextReviewDue
    ? formatDate(meta.nextReviewDue)
    : null;

  if (variant === "detailed") {
    return (
      <aside
        className={`review-badge review-badge--detailed ${className}`.trim()}
        aria-label="Review-Informationen"
      >
        <p className="review-badge__heading">Review & Governance</p>
        <ReviewDetails
          lastReviewed={lastReviewed}
          nextReviewDue={nextReviewDue}
          owner={meta.owner}
        />
      </aside>
    );
  }

  const summary = meta.lastReviewed
    ? `Fachlich geprüft: ${formatDate(meta.lastReviewed)}`
    : "Fachlicher Review: Datum noch offen";

  return (
    <details
      className={`review-badge review-badge--compact ${className}`.trim()}
      aria-label="Review-Informationen"
    >
      <summary className="review-badge__summary">
        <span>{summary}</span>
        <span className="review-badge__summary-action">Details</span>
      </summary>
      <ReviewDetails
        lastReviewed={lastReviewed}
        nextReviewDue={nextReviewDue}
        owner={meta.owner}
      />
    </details>
  );
}

function ReviewDetails({
  lastReviewed,
  nextReviewDue,
  owner,
}: {
  lastReviewed: string;
  nextReviewDue: string | null;
  owner?: string;
}) {
  return (
    <dl className="review-badge__details">
      <div className="review-badge__details-row">
        <dt className="review-badge__term">Fachlicher Review:</dt>
        <dd>{lastReviewed}</dd>
      </div>

      {nextReviewDue && (
        <div className="review-badge__details-row">
          <dt className="review-badge__term">Nächste Prüfung:</dt>
          <dd>{nextReviewDue}</dd>
        </div>
      )}

      {owner && (
        <div className="review-badge__details-row">
          <dt className="review-badge__term">Verantwortlich:</dt>
          <dd>{owner}</dd>
        </div>
      )}
    </dl>
  );
}
