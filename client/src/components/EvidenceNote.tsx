import { useEffect, useRef } from "react";
import type { EvidenceSource } from "@/domain/content-types";

interface EvidenceNoteProps {
  title?: string;
  definition?: string;
  sources: EvidenceSource[];
  reviewDate?: string;
  className?: string;
  /** Kompatibilitäts-Prop für bestehende Callsites; nur editorial wird unterstützt. */
  variant?: "editorial";
}

export default function EvidenceNote({
  title = "Quellen",
  definition,
  sources,
  reviewDate,
  className = "",
  variant: _variant = "editorial",
}: EvidenceNoteProps) {
  const scientificSources = sources.filter(
    source => source.type !== "versorgung"
  );
  const serviceSources = sources.filter(source => source.type === "versorgung");
  const totalSources = sources.length;

  // Beim Drucken die Quellenliste erzwungen aufklappen, damit Ausdrucke
  // vollständig sind; danach den vorherigen (vom Lesenden gewählten) Zustand
  // wiederherstellen.
  const detailsRef = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;
    let previousOpen = el.open;
    const handleBeforePrint = () => {
      previousOpen = el.open;
      el.open = true;
    };
    const handleAfterPrint = () => {
      el.open = previousOpen;
    };
    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  const renderSources = (items: EvidenceSource[]) => (
    <ul
      className="mt-2 space-y-1"
      style={{ fontSize: "var(--text-sm)", color: "var(--fg-tertiary)" }}
    >
      {items.map(source => (
        <li key={source.label}>
          {source.href ? (
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link"
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
      className={`mt-8 border-t border-b py-5 ${className}`.trim()}
      style={{ borderColor: "var(--rule-color)" }}
      aria-label={title}
    >
      {/* Die Einordnung (definition) bleibt sichtbar — sie ist die inhaltliche
          Evidenz-Aussage. Nur die Quellenliste klappt ein (Lesefluss). */}
      {definition && (
        <p
          style={{
            fontSize: "var(--text-sm)",
            lineHeight: "var(--lh-relaxed)",
            color: "var(--fg-secondary)",
          }}
        >
          {definition}
        </p>
      )}
      {totalSources > 0 ? (
        <details
          ref={detailsRef}
          className={`evidence-note__disclosure${definition ? " mt-3" : ""}`}
        >
          <summary className="evidence-note__summary">
            {title} ({totalSources})
          </summary>
          <div className="evidence-note__body">
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
          </div>
        </details>
      ) : (
        reviewDate && (
          <p
            className="mt-3"
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--fg-tertiary)",
            }}
          >
            Zuletzt redaktionell geprüft: {reviewDate}
          </p>
        )
      )}
    </aside>
  );
}
