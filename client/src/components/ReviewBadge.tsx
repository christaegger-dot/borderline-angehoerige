import { pageGovernance } from "@/data/pageGovernance";

function formatDate(date: string) {
  const [year, month, day] = date.split("-");

  if (!year || !month || !day) return date;

  return `${day}.${month}.${year}`;
}

export default function ReviewBadge({ path }: { path: string }) {
  const meta = pageGovernance[path];

  if (!meta) return null;

  const lastReviewed = meta.lastReviewed
    ? `geprüft am ${formatDate(meta.lastReviewed)}`
    : "Noch kein Reviewdatum gesetzt";

  const nextReviewDue = meta.nextReviewDue
    ? formatDate(meta.nextReviewDue)
    : null;

  return (
    <aside
      className="mt-6 border-t pt-4 text-sm text-muted-foreground"
      aria-label="Review-Informationen"
      style={{ borderColor: "var(--rule-color)" }}
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-label)]">
        Review & Governance
      </p>

      <dl className="space-y-1.5">
        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
          <dt className="font-medium text-foreground">Fachlicher Review:</dt>
          <dd>{lastReviewed}</dd>
        </div>

        {nextReviewDue && (
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            <dt className="font-medium text-foreground">Nächste Prüfung:</dt>
            <dd>{nextReviewDue}</dd>
          </div>
        )}

        {meta.owner && (
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            <dt className="font-medium text-foreground">Verantwortlich:</dt>
            <dd>{meta.owner}</dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
