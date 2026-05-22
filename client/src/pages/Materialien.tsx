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

      {/* ── 1 Hero ── EditorialSection ohne Aside (Hub-Page-Identität) */}
      <EditorialSection variant="cream">
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
            Materialien für <em>Angehörige</em>
          </DisplayHeading>
          <Lede className="max-w-[40em]">
            Hier finden Sie ausgewählte Handouts, Infografiken und
            Orientierungshilfen für belastende, unklare oder akute Situationen.
            Die Sammlung ist bewusst kuratiert: lieber wenige, wirklich
            hilfreiche Ressourcen als ein unübersichtliches Archiv.
          </Lede>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 2 Zur Nutzung ── Disclaimer mit Hairline-Sage-Pattern (PR #411) */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Zur Nutzung
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <div
            className="border-t pt-5"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <p
              style={{
                fontSize: "var(--text-sm)",
                lineHeight: "var(--lh-relaxed)",
                color: "var(--accent-label)",
                fontStyle: "italic",
              }}
            >
              <strong style={{ color: "var(--fg-primary)" }}>
                Vorschau = Web-Bild.
              </strong>{" "}
              Wenn verfügbar, führt «Textversion lesen» zur lesbaren
              Web-Version. Bei bildbasierten PDFs ist die Textversion die
              empfohlene Lesefassung; «PDF öffnen» bleibt die Druckversion im
              neuen Tab. Die Notfallkarte öffnet als HTML-Seite.
            </p>
          </div>
        </EditorialSection.Body>
      </EditorialSection>

      <MaterialienLibrarySection />
    </Layout>
  );
}
