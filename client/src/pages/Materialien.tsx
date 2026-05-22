import {
  DisplayHeading,
  EditorialSection,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import MaterialienLibrarySection from "@/sections/MaterialienLibrarySection";

export default function Materialien() {
  return (
    <Layout>
      <SEO
        title="Materialien"
        description="Ausgewählte Materialien, Infografiken und Notfallhilfen für Angehörige von Menschen mit Borderline."
        path="/materialien"
      />

      <EditorialSection variant="cream" density="hero">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.4,
            }}
          >
            Materialien und Hilfen
          </span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel className="mb-8" spacing="compact">
            Materialien
          </EyebrowLabel>
          <DisplayHeading level={1}>
            Materialien, die schnell Orientierung geben
          </DisplayHeading>
          <Lede className="max-w-[40em]">
            Ausgewählte Handouts, Infografiken und Notfallhilfen für belastende,
            unklare oder akute Situationen. Die Sammlung ist bewusst kuratiert:
            erst die wichtigsten Einstiege, dann die ganze Bibliothek.
          </Lede>
        </EditorialSection.Body>
        <EditorialSection.Aside background="cream-deep">
          <p
            className="uppercase"
            style={{
              color: "var(--accent-label)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            Zur Nutzung
          </p>
          <p
            style={{
              color: "var(--fg-secondary)",
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-relaxed)",
              margin: "0.9rem 0 0",
            }}
          >
            «Textversion lesen» ist die empfohlene Lesefassung, wenn ein PDF
            bildbasiert ist. «PDF öffnen» bleibt die Druckversion im neuen Tab.
            Die Notfallkarte öffnet als robuste HTML-Seite.
          </p>
        </EditorialSection.Aside>
      </EditorialSection>

      <MaterialienLibrarySection />
    </Layout>
  );
}
