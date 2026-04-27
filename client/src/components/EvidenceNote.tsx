import { FileText } from "lucide-react";
import type { EvidenceSource } from "@/domain/content-types";

interface EvidenceNoteProps {
  title?: string;
  definition?: string;
  sources: EvidenceSource[];
  reviewDate?: string;
  className?: string;
  /**
   * "card" (Default): bestehende Box mit muted-BG und FileText-Icon.
   * "editorial": Phase-4-Editorial-Pattern — Hairline oben/unten, Fliesstext-
   * Stil, kein Karten-Hintergrund, kein Icon, fg-tertiary für Quellen.
   */
  variant?: "card" | "editorial";
}

export default function EvidenceNote({
  title = "Quellen",
  definition,
  sources,
  reviewDate,
  className = "",
  variant = "card",
}: EvidenceNoteProps) {
  const scientificSources = sources.filter(
    source => source.type !== "versorgung"
  );
  const serviceSources = sources.filter(source => source.type === "versorgung");

  const renderSources = (items: EvidenceSource[]) => (
    <ul
      className="mt-2 space-y-1"
      style={
        variant === "editorial"
          ? { fontSize: "var(--text-sm)", color: "var(--fg-tertiary)" }
          : undefined
      }
    >
      {items.map(source => (
        <li
          key={source.label}
          className={
            variant === "editorial" ? "" : "text-xs text-muted-foreground"
          }
        >
          {source.href ? (
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                variant === "editorial"
                  ? "editorial-link"
                  : "underline decoration-dotted underline-offset-2 hover:text-foreground"
              }
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

  if (variant === "editorial") {
    return (
      <aside
        className={`mt-8 border-t border-b py-5 ${className}`.trim()}
        style={{ borderColor: "var(--rule-color)" }}
        aria-label={title}
      >
        <p
          className="uppercase"
          style={{
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-caps)",
            color: "var(--accent-label)",
            fontWeight: 500,
          }}
        >
          {title}
        </p>
        {definition && (
          <p
            className="mt-2"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-secondary)",
            }}
          >
            {definition}
          </p>
        )}
        {scientificSources.length > 0 && renderSources(scientificSources)}
        {serviceSources.length > 0 && (
          <>
            <p
              className="mt-3 uppercase"
              style={{
                fontSize: "var(--text-xs)",
                letterSpacing: "var(--tracking-caps)",
                color: "var(--accent-label)",
                fontWeight: 500,
              }}
            >
              Versorgung / Hilfe
            </p>
            {renderSources(serviceSources)}
          </>
        )}
        {reviewDate && (
          <p
            className="mt-3"
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--fg-tertiary)",
            }}
          >
            Zuletzt redaktionell geprüft: {reviewDate}
          </p>
        )}
      </aside>
    );
  }

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
