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

      <EditorialSection variant="cream" density="compact">
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
          <EyebrowLabel className="mb-3" spacing="compact">
            Materialien
          </EyebrowLabel>
          <DisplayHeading level={1} size="topic">
            Materialien, die schnell Orientierung geben
          </DisplayHeading>
          <Lede className="max-w-[40em]">
            Handouts und Infografiken zum Lesen, Ausdrucken und Mitnehmen.
            Wählen Sie unten das Thema, das Sie gerade beschäftigt.
          </Lede>
        </EditorialSection.Body>
      </EditorialSection>

      <MaterialienLibrarySection />
    </Layout>
  );
}
