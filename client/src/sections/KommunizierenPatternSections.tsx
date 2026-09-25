import ContentSection from "@/components/ContentSection";
import { Link } from "wouter";
import {
  escalationCards,
  roleCommunicationCards,
  typicalSituationCards,
} from "@/content/kommunizieren";

interface KommunizierenPatternSectionProps {
  defaultOpen?: boolean;
  /** Wenn false: dauerhaft offene Prosa ohne Toggle (an ContentSection durchgereicht). */
  collapsible?: boolean;
}

export function KommunizierenEscalationSection({
  defaultOpen = false,
  collapsible = true,
}: KommunizierenPatternSectionProps) {
  return (
    <ContentSection
      variant="editorial"
      collapsible={collapsible}
      title="Wenn Gespräche kippen"
      id="eskalation"
      defaultOpen={defaultOpen}
      preview="Zuhören, nachfragen, eine Grenze benennen oder pausieren: Wählen Sie, was gerade möglich und sicher ist."
    >
      <p className="mb-5 text-base leading-relaxed">
        Diese Möglichkeiten sind keine feste Reihenfolge. Eine Pause oder eine
        Grenze darf am Anfang stehen. Sie müssen keine Beruhigung erreichen,
        bevor Sie sich schützen. Bei Bedrohung oder akuter Gefahr:{" "}
        <Link href="/soforthilfe" className="editorial-link">
          Soforthilfe
        </Link>
        .
      </p>
      <ul className="space-y-6">
        {escalationCards.map(item => (
          <li key={item.title}>
            <h3 className="editorial-item-heading">{item.title}</h3>
            <p className="editorial-small-copy mt-1">{item.text}</p>
          </li>
        ))}
      </ul>
      <div
        className="mt-6 border-t pt-5"
        style={{ borderColor: "var(--rule-color)" }}
      >
        <h3 className="editorial-item-heading">Ein Satz darf reichen</h3>
        <p className="mt-3 border-l-2 border-primary pl-4 text-base leading-relaxed">
          «Ich unterbreche das Gespräch jetzt. Morgen kann ich dir sagen, ob und
          wann ich weitersprechen möchte.»
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Bieten Sie nur einen nächsten Kontakt an, den Sie einhalten können und
          möchten. Eine Wiederaufnahme muss nicht sofort vereinbart werden.
        </p>
      </div>
    </ContentSection>
  );
}

export function KommunizierenSituationsSection() {
  return (
    <ContentSection
      variant="editorial"
      title="Typische schwierige Situationen"
      id="situationen"
      preview="Nicht jede Situation verlangt dieselbe Antwort. Trotzdem gibt es Muster, auf die sich Angehörige vorbereiten können."
    >
      <ul className="space-y-6">
        {typicalSituationCards.map(item => (
          <li key={item.title}>
            <h3 className="editorial-item-heading">{item.title}</h3>
            <p className="editorial-small-copy mt-1">{item.text}</p>
          </li>
        ))}
      </ul>
    </ContentSection>
  );
}

export function KommunizierenRolesSection() {
  return (
    <ContentSection
      variant="editorial"
      title="Kommunikation aus verschiedenen Angehörigenrollen"
      id="rollen"
      preview="Partner, Eltern und erwachsene Kinder sprechen aus unterschiedlichen Beziehungsgeschichten. Das verändert auch den Ton und die Belastung."
    >
      <ul className="space-y-6">
        {roleCommunicationCards.map(item => (
          <li key={item.title}>
            <h3 className="editorial-item-heading">{item.title}</h3>
            <p className="editorial-small-copy mt-1">{item.text}</p>
          </li>
        ))}
      </ul>
    </ContentSection>
  );
}
