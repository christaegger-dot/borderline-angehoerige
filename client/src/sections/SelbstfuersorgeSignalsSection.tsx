import ContentSection from "@/components/ContentSection";
import EvidenceNote from "@/components/EvidenceNote";
import { quellenLinks } from "@/content/quellenLinks";
import { warningSignalGroups } from "@/content/selbstfuersorge-page";

interface SelbstfuersorgeSignalsSectionProps {
  defaultOpen?: boolean;
  /** Wenn false: dauerhaft offene Prosa ohne Toggle (an ContentSection durchgereicht). */
  collapsible?: boolean;
}

export function SelbstfuersorgeSignalsSection({
  defaultOpen = false,
  collapsible = true,
}: SelbstfuersorgeSignalsSectionProps) {
  return (
    <ContentSection
      variant="editorial"
      collapsible={collapsible}
      title="Warnsignale für Überlastung"
      id="warnsignale"
      defaultOpen={defaultOpen}
      preview="Unspezifische Hinweise, die Anlass für Entlastung oder eine fachliche Abklärung sein können."
    >
      <p className="editorial-small-copy mb-6">
        Diese Anzeichen sind unspezifisch: Sie können bei Überlastung auftreten,
        aber auch andere körperliche oder psychische Ursachen haben. Sie sind
        keine Diagnose und kein Beweis, dass Sie «zu wenig» für sich tun. Die
        folgenden Beispiele sind eine redaktionelle Zusammenstellung zur
        Selbstbeobachtung, kein validiertes Testinstrument.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {warningSignalGroups.map(group => {
          return (
            <article
              key={group.title}
              className="border-t pt-4"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <h3 className="editorial-item-heading">{group.title}</h3>
              <ul className="mt-3 space-y-2 pl-5 list-disc marker:text-[color:var(--accent-label)]">
                {group.items.map(item => (
                  <li key={item} className="editorial-small-copy">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <EvidenceNote
        variant="editorial"
        title="Fachlicher Bezug"
        definition="Die körperlichen, emotionalen und gedanklichen Beispiele orientieren sich an Beschreibungen möglicher Stressreaktionen der WHO. Beispiele zu Verhalten und Erholungsbedarf übertragen zusätzlich die NICE-Empfehlungen zur Wahrnehmung und Unterstützung unbezahlter erwachsener Betreuungspersonen. Die fünf Bereiche sind eine eigene didaktische Ordnung."
        sources={[
          {
            label: "WHO (2026) – Stress: Questions and answers",
            href: quellenLinks.whoStress2026,
            type: "versorgung",
          },
          {
            label: "NICE (2020) – Supporting adult carers (NG150)",
            href: quellenLinks.niceNg150,
            type: "versorgung",
          },
        ]}
        reviewDate="05.10.2026"
      />

      <div
        className="mt-8 border-t pt-5"
        style={{ borderColor: "var(--rule-color)" }}
      >
        <p className="editorial-small-copy">
          <strong className="editorial-strong">
            Wenn mehrere Anzeichen anhalten, stark sind oder Ihren Alltag
            beeinträchtigen, nehmen Sie sie ernst.
          </strong>{" "}
          Entlastung, weniger Aufgaben oder Unterstützung können sinnvoll sein.
          Sprechen Sie bei Bedarf mit Ihrer Hausärzt:in oder einer
          psychologischen Fachperson, damit auch andere Ursachen abgeklärt
          werden können.
        </p>
      </div>
    </ContentSection>
  );
}
