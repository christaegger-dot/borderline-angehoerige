import { RefreshCw } from "lucide-react";
import { pageGovernance } from "@/data/pageGovernance";

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
  const governanceDate = path ? pageGovernance[path]?.lastReviewed : null;
  const resolvedDate = governanceDate ? formatDate(governanceDate) : date;

  if (!resolvedDate) return null;

  return (
    <p
      className={`inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs text-muted-foreground ${className}`.trim()}
    >
      <RefreshCw className="h-3.5 w-3.5" />
      Zuletzt verifiziert: {resolvedDate}
    </p>
  );
}
