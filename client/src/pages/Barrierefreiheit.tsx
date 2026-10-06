import AppLink from "@/components/AppLink";
import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO from "@/components/SEO";

const accessibilityMeasures = [
  "Skip-Navigation zum Hauptinhalt (WCAG 2.4.1)",
  "Tastaturbedienung und sichtbare Fokusmarkierungen",
  "ARIA-Rollen und -Labels für Menüs, Dialoge und Navigation",
  "Kontrastprüfung als Teil der automatisierten Prüfungen",
  "Layouts für schmale und breite Bildschirmansichten",
  "Semantische HTML-Struktur (Überschriften-Hierarchie, Landmarks)",
  "Fokus-Management bei modalen Dialogen und Dropdown-Menüs",
  "Reduzierte Bewegung wird respektiert (prefers-reduced-motion)",
];

const knownLimitations = [
  "Die vollständige Prüfung mit VoiceOver/Safari und NVDA/Firefox sowie auf realen Mobilgeräten steht aus. Automatisierte Prüfungen ersetzen diese Nutzungstests nicht.",
  "Die Übungsszenarien sind noch nicht mit Screenreader-Nutzenden geprüft. Rückmeldungen zur Verständlichkeit und Bedienung stehen aus.",
  "Für die angebotenen PDF-Handouts ist eine vollständige PDF/UA- und Druckprüfung nicht nachgewiesen. Lesbare Webtextfassungen sind verlinkt; sie belegen keine Barrierefreiheit der jeweiligen PDF-Datei.",
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
          <DisplayHeading level={1} size="page">
            Erklärung zur Barrierefreiheit
          </DisplayHeading>
          <Lede className="mt-6">
            Wir sind bestrebt, diese Website für alle Menschen zugänglich zu
            gestalten, unabhängig von körperlichen, sensorischen oder kognitiven
            Einschränkungen.
          </Lede>
        </header>

        <EditorialSectionBlock label="Ziel" title="Konformitätsziel">
          <EditorialProse>
            <p>
              Diese Website orientiert sich an den{" "}
              <strong>
                Web Content Accessibility Guidelines (WCAG) 2.2, Stufe AA
              </strong>
              . Das ist ein Projektziel. Eine vollständige Konformitätsprüfung
              und die institutionelle Bestätigung stehen aus; eine vollständige
              Konformität wird derzeit nicht erklärt.
            </p>
            <p>
              Eine institutionell verbindliche Mindestvorgabe für dieses Projekt
              ist noch nicht bestätigt.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        <EditorialSectionBlock
          label="Massnahmen"
          title="Technische Massnahmen und Prüfungen"
          rule
        >
          <EditorialProse>
            <p>
              Im Entwicklungsprozess werden ausgewählte Seiten und Bedienabläufe
              mit automatisierten Tests geprüft. Dazu gehören Struktur,
              Tastaturbedienung und Prüfungen mit axe. Diese Stichproben
              erfassen weder alle Seitenzustände noch die Nutzung mit
              Hilfsmitteln.
            </p>
            <p>
              Die technische Stichprobe vom 6. Oktober 2026 umfasst Startseite,
              Soforthilfe, Übungen, diese Erklärung, Datenschutz, Feedback,
              Fachstelle, Beratung, Diagnostik, Selbstfürsorge, Selbsttest,
              Grenzen, Therapie sowie die Webtextfassungen Warnsignale und
              Spiegeln statt Aufsaugen. Geprüft wurden Chromium, axe und
              Tastaturabläufe in den Übungen bei simulierten Ansichten von 360 ×
              800, 768 × 900 und 1440 × 1000 Pixeln. Andere Browser,
              Hilfsmittel, Seitenzustände und die übrigen Materialien sind damit
              nicht vollständig geprüft.
            </p>
          </EditorialProse>
          <ul className="space-y-5">
            {accessibilityMeasures.map(item => (
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
          <p style={bodyStyle}>Redaktioneller Stand: 6. Oktober 2026</p>
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
