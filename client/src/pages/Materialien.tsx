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

      <EditorialSection variant="cream" density="normal">
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
          <DisplayHeading level={1} size="utility">
            Materialien, die schnell Orientierung geben
          </DisplayHeading>
          <Lede className="mt-6 max-w-[40em]">
            Ausgewählte Handouts, Infografiken und Notfallhilfen für belastende
            oder akute Situationen. Beginnen Sie mit einer Lage; die
            vollständige Bibliothek folgt darunter.
          </Lede>
        </EditorialSection.Body>
      </EditorialSection>

      <MaterialienLibrarySection />
    </Layout>
  );
}
