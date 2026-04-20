import { FileText } from "lucide-react";
import type { EvidenceSource } from "@/domain/content-types";

interface EvidenceNoteProps {
  title?: string;
  definition?: string;
  sources: EvidenceSource[];
  reviewDate?: string;
  className?: string;
}

export default function EvidenceNote({
  title = "Quellen",
  definition,
  sources,
  reviewDate,
  className = "",
}: EvidenceNoteProps) {
  const scientificSources = sources.filter(
    source => source.type !== "versorgung"
  );
  const serviceSources = sources.filter(source => source.type === "versorgung");

  const renderSources = (items: EvidenceSource[]) => (
    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
      {items.map(source => (
        <li key={source.label}>
          {source.href ? (
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-2 hover:text-foreground"
            >
              {source.label}
            </a>
          ) : (
            source.label
          )}
          {source.note && <span>{` — ${source.note}`}</span>}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`rounded-lg border border-border/60 bg-muted/20 p-4 ${className}`.trim()}
      aria-label={title}
    >
      <div className="flex items-start gap-2">
        <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {definition && (
            <p className="mt-1 text-xs text-muted-foreground">{definition}</p>
          )}
          {scientificSources.length > 0 && (
            <div>
              {serviceSources.length > 0 && (
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Wissenschaftliche Evidenz
                </p>
              )}
              {renderSources(scientificSources)}
            </div>
          )}
          {serviceSources.length > 0 && (
            <div>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Versorgung / Hilfe
              </p>
              {renderSources(serviceSources)}
            </div>
          )}
          {reviewDate && (
            <p className="mt-3 text-[11px] text-muted-foreground">
              Zuletzt redaktionell geprüft: {reviewDate}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
