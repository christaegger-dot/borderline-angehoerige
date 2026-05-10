import AppLink from "@/components/AppLink";
import {
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO from "@/components/SEO";

const conformanceItems = [
  "Skip-Navigation zum Hauptinhalt (WCAG 2.4.1)",
  "Tastaturnavigation für alle interaktiven Elemente",
  "ARIA-Rollen und -Labels für Menüs, Dialoge und Navigation",
  "Farbkontraste nach WCAG AA (mind. 4.5:1 für Text)",
  "Responsives Design für alle Bildschirmgrössen",
  "Semantische HTML-Struktur (Überschriften-Hierarchie, Landmarks)",
  "Fokus-Management bei modalen Dialogen und Dropdown-Menüs",
  "Reduzierte Bewegung wird respektiert (prefers-reduced-motion)",
];

const knownLimitations = [
  "Einzelne externe oder ältere PDF-Handouts sind weiterhin bildbasiert; wo nötig steht eine lesbare Textversion als empfohlene Lesefassung bereit",
  "Einzelne interaktive Übungen (Übungsszenarien) können mit Screenreadern eingeschränkt nutzbar sein",
];

export default function Barrierefreiheit() {
  const bodyStyle = {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-secondary)",
  };

  const itemTitleStyle = {
    fontSize: "var(--text-md)",
    fontWeight: 600,
    color: "var(--fg-primary)",
  };

  return (
    <Layout>
      <SEO
        title="Barrierefreiheit"
        description="Erklärung zur Barrierefreiheit dieser Website: Konformitätsziel, umgesetzte Massnahmen und Kontaktmöglichkeit bei Problemen."
        path="/barrierefreiheit"
      />

      <EditorialLayout width="narrow">
        <header className="pb-12 pt-12 md:pb-16 md:pt-16">
          <EyebrowLabel spacing="compact">Barrierefreiheit</EyebrowLabel>
          <h1
            className="mt-8 font-display text-[var(--text-3xl)] md:text-[var(--text-4xl)]"
            style={{
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
            }}
          >
            Erklärung zur <em>Barrierefreiheit</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Wir sind bestrebt, diese Website für alle Menschen zugänglich zu
            gestalten, unabhängig von körperlichen, sensorischen oder kognitiven
            Einschränkungen.
          </p>
        </header>

        <EditorialSectionBlock label="Ziel" title="Konformitätsziel">
          <EditorialProse>
            <p>
              Diese Website orientiert sich an den{" "}
              <strong>
                Web Content Accessibility Guidelines (WCAG) 2.1, Stufe AA
              </strong>
              . Wir arbeiten kontinuierlich daran, die Barrierefreiheit weiter
              zu verbessern.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        <EditorialSectionBlock
          label="Umgesetzt"
          title="Bereits umgesetzte Massnahmen"
          rule
        >
          <ul className="space-y-5">
            {conformanceItems.map(item => (
              <li key={item}>
                <p style={itemTitleStyle}>{item}</p>
              </li>
            ))}
          </ul>
        </EditorialSectionBlock>

        <EditorialSectionBlock
          label="Bekannt"
          title="Bekannte Einschränkungen"
          rule
        >
          <ul className="space-y-5">
            {knownLimitations.map(item => (
              <li key={item}>
                <p style={bodyStyle}>{item}</p>
              </li>
            ))}
          </ul>
        </EditorialSectionBlock>

        <EditorialSectionBlock
          label="Kontakt"
          title="Feedback und Kontakt"
          rule
        >
          <EditorialProse>
            <p>
              Wenn Sie auf Barrieren stossen oder Verbesserungsvorschläge haben,
              kontaktieren Sie uns bitte. Wir nehmen Rückmeldungen ernst und
              arbeiten an Lösungen.
            </p>
            <p>
              Nutzen Sie dafür unsere{" "}
              <AppLink href="/feedback" className="editorial-link">
                Feedback-Seite
              </AppLink>{" "}
              oder wenden Sie sich an die im{" "}
              <AppLink href="/impressum" className="editorial-link">
                Impressum
              </AppLink>{" "}
              genannte verantwortliche Person.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        <EditorialSectionBlock label="Stand" title="Aktualität" rule>
          <p style={bodyStyle}>Stand: April 2026</p>
        </EditorialSectionBlock>

        <RelatedLinksEditorial
          links={[
            {
              href: "/feedback",
              title: "Feedback",
              description:
                "Barrieren, Unklarheiten oder Verbesserungsvorschläge melden.",
            },
            {
              href: "/datenschutz",
              title: "Datenschutz",
              description: "Wie diese Website mit Daten umgeht.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
