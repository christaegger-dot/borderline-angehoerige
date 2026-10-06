import { RefreshCw } from "lucide-react";
import {
  CURRENT_PUBLICATION_STATUS,
  pageGovernance,
} from "@/data/pageGovernance";

interface LastVerifiedBadgeProps {
  date?: string;
  path?: string;
  className?: string;
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");

  if (!year || !month || !day) return date;

  return `${day}.${month}.${year}`;
}

export default function LastVerifiedBadge({
  date,
  path,
  className = "",
}: LastVerifiedBadgeProps) {
  const meta = path ? pageGovernance[path] : undefined;
  const governanceDate = meta?.contactCheck?.date ?? meta?.lastReviewed;
  const resolvedDate = governanceDate
    ? formatDate(governanceDate)
    : meta?.editorialUpdated
      ? formatDate(meta.editorialUpdated)
      : date;
  const reviewOverdue = Boolean(
    meta?.nextReviewDue &&
    meta.nextReviewDue < new Date().toISOString().slice(0, 10)
  );

  if (!resolvedDate) return null;

  const badge = (
    <p
      className={`inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs text-muted-foreground ${className}`.trim()}
    >
      <RefreshCw className="h-3.5 w-3.5" />
      {meta?.contactCheck
        ? "Früherer Kontaktabgleich"
        : meta?.lastReviewed
          ? "Frühere Prüfangabe"
          : meta?.editorialUpdated
            ? "Text aktualisiert"
            : "Stand"}
      : {resolvedDate}
      {reviewOverdue && meta?.nextReviewDue
        ? ` · erneute Prüfung ausstehend seit ${formatDate(meta.nextReviewDue)}`
        : ""}
    </p>
  );

  if (!meta) return badge;

  return (
    <div>
      {badge}
      <p className="mt-1 text-xs text-muted-foreground">
        {meta.contactCheck
          ? "Der frühere Kontaktabgleich bestätigt keine heutige Erreichbarkeit. "
          : "Frühere Prüfangaben belegen keine Freigabe des aktuellen Stands. "}
        {CURRENT_PUBLICATION_STATUS.notice}
      </p>
    </div>
  );
}
