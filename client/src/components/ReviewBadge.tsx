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
      className="mt-4 rounded-xl border border-border/60 bg-white/70 px-4 py-3 text-sm text-muted-foreground shadow-sm"
      aria-label="Review-Informationen"
    >
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/90">
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
