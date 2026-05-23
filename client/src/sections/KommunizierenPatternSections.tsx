import ContentSection from "@/components/ContentSection";
import {
  escalationCards,
  roleCommunicationCards,
  typicalSituationCards,
} from "@/content/kommunizieren";

interface KommunizierenPatternSectionProps {
  defaultOpen?: boolean;
}

export function KommunizierenEscalationSection({
  defaultOpen = false,
}: KommunizierenPatternSectionProps) {
  return (
    <ContentSection
      variant="editorial"
      title="Wenn Gespräche kippen"
      id="eskalation"
      defaultOpen={defaultOpen}
      preview="In eskalierenden Momenten hilft oft nicht mehr Inhalt, sondern weniger: weniger Worte, weniger Verteidigung, weniger Tempo."
    >
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
        <h3 className="editorial-item-heading">Ein möglicher Ablauf</h3>
        <ol className="editorial-small-copy mt-3 space-y-2">
          <li>1. «Ich sehe, dass es gerade sehr viel ist.»</li>
          <li>2. «Ich möchte zuhören, aber nicht in diesem Ton.»</li>
          <li>3. «Lass uns 10 Minuten Pause machen und dann weitersehen.»</li>
        </ol>
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
