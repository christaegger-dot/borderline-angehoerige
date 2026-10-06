import {
  DisplayHeading,
  EditorialLayout,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import SituationsWegweiser from "@/components/interactive/SituationsWegweiser";

export default function Wegweiser() {
  return (
    <Layout>
      <SEO
        title="Hilfe in belastenden Situationen"
        description="Der Wegweiser nimmt keine Risikoeinschätzung vor und führt bei akuter Gefahr oder Unsicherheit zu professioneller Hilfe."
        path="/wegweiser"
      />
      <MedicalPageSchema
        title="Hilfe in belastenden Situationen"
        description="Der Wegweiser nimmt keine Risikoeinschätzung vor und führt bei akuter Gefahr oder Unsicherheit zu professioneller Hilfe."
        path="/wegweiser"
      />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="py-6">
          <EyebrowLabel spacing="compact">Wegweiser</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Hilfe in belastenden Situationen
          </DisplayHeading>
          <Lede className="mt-6">
            Dieser Wegweiser ordnet keine einzelne Situation oder Gefährdung
            ein. Für akute Hilfe gibt es einen gemeinsamen professionellen
            Kontaktweg.
          </Lede>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-secondary)",
            }}
          >
            Krisen und Belastungen können unabhängig von einer Diagnose
            auftreten. Unterstützung richtet sich nach dem, was Sie gerade
            brauchen – nicht nach Diagnose, Motiven oder Charakter einer Person.
          </p>
        </header>

        {/* ── Hairline-Trenner Editorial-Hero → Hilfeweg ── */}
        <hr
          className="border-0 border-t"
          style={{ borderColor: "var(--rule-color)" }}
        />

        {/* ── Zentraler Hilfeweg ── */}
        <div className="mt-6">
          <SituationsWegweiser />
        </div>

        {/* ── Weiterführende Seiten ── */}
        <RelatedLinksEditorial
          links={[
            {
              href: "/unterstuetzen/krise",
              title: "Krisenbegleitung",
              description:
                "Hilfe holen, eigene Grenzen beachten und Unterstützung finden.",
            },
            {
              href: "/selbstfuersorge#eigene-unterstuetzung",
              title: "Selbstfürsorge",
              description: "Entlastung für Ihre eigene Situation.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
