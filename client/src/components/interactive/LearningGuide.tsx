import { useId, useState } from "react";
import guides from "@/content/learningGuides.json";
import { createHandoutTextVersionMeta } from "@/content/handoutTextVersionRegistry";
import { getHandoutOpenHref } from "@/content/handouts";
import AppLink from "@/components/AppLink";

export type LearningGuideKind = keyof typeof guides;

/** The same content is rendered by the text pages and the PDF generator. */
export default function LearningGuide({
  kind,
  id,
}: {
  kind: LearningGuideKind;
  id: string;
}) {
  const [selected, setSelected] = useState(0);
  const uid = useId();
  const guide = guides[kind];
  const cards = guide.sections[0].cards!;
  const card = cards[selected];
  const note = guide.sections[1];
  const meta = createHandoutTextVersionMeta(kind);
  const pdfHref = getHandoutOpenHref(meta.pdfSourceUrl);
  return (
    <section
      id={id}
      className="learning-tool"
      data-kind={kind}
      aria-labelledby={`${uid}-title`}
    >
      <div className="learning-tool__intro">
        <h2 id={`${uid}-title`}>{guide.title}</h2>
        <p>{guide.summary}</p>
        {kind === "garten" && (
          <p className="mt-2 text-sm">
            Der Garten ist eine Metapher, keine Vorhersage eines
            Genesungsverlaufs.
          </p>
        )}
      </div>
      <div
        className="learning-tool__choices"
        role="group"
        aria-label={
          kind === "dear" ? "DEAR-Schritt auswählen" : "Bereich auswählen"
        }
      >
        {cards.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className="learning-tool__choice"
            aria-pressed={selected === index}
            aria-controls={`${uid}-detail`}
            onClick={() => setSelected(index)}
          >
            <span aria-hidden="true" className="learning-tool__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.title}
          </button>
        ))}
      </div>
      <div
        id={`${uid}-detail`}
        className="learning-tool__detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <h3>{card.title}</h3>
        <p>{card.text}</p>
        <div className="learning-tool__example">
          <span className="text-sm font-medium">Zum Beispiel</span>
          <p>{card.example}</p>
        </div>
      </div>
      <p className="learning-tool__note">{note.calloutText}</p>
      <details className="learning-tool__all">
        <summary>
          Alle {kind === "dear" ? "Schritte" : "Bereiche"} zusammen lesen
        </summary>
        <ol>
          {cards.map(item => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
              <p>{item.example}</p>
            </li>
          ))}
        </ol>
      </details>
      <div className="learning-tool__links">
        <AppLink href={meta.path} className="editorial-link">
          Vollständige Textfassung
        </AppLink>
        {pdfHref && (
          <a
            href={pdfHref}
            className="editorial-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Druckfassung als PDF
          </a>
        )}
        <AppLink href="/fachstelle" className="editorial-link">
          Eigene Beratung
        </AppLink>
      </div>
    </section>
  );
}
