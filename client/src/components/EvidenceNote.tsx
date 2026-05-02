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
