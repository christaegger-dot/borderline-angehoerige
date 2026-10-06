import {
  DisplayHeading,
  EditorialCallout,
  EditorialLayout,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import AppLink from "@/components/AppLink";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import SituationsWegweiser from "@/components/interactive/SituationsWegweiser";

export default function Wegweiser() {
  return (
    <Layout>
      <SEO
        title="Situations-Wegweiser"
        description="Beobachtbare Situationen einordnen, den eigenen Schutz wahren und passende professionelle Hilfe finden."
        path="/wegweiser"
      />
      <MedicalPageSchema
        title="Situations-Wegweiser"
        description="Beobachtbare Situationen einordnen, den eigenen Schutz wahren und passende professionelle Hilfe finden."
        path="/wegweiser"
      />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="py-6">
          <EyebrowLabel spacing="compact">Wegweiser</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Situations-Wegweiser
          </DisplayHeading>
          <Lede className="mt-6">
            Wählen Sie die Situation, die am ehesten zutrifft. Sie müssen Gefahr
            nicht selbst sicher einschätzen können. Bei Unsicherheit helfen
            professionelle Anlaufstellen weiter.
          </Lede>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-secondary)",
            }}
          >
            Die beschriebenen Situationen kommen nicht bei allen Menschen mit
            Borderline vor und können auch unabhängig von einer Diagnose
            auftreten. Der Wegweiser ordnet beobachtbare Situationen – nicht
            Diagnose, Motive oder Charakter einer Person.
          </p>
          <EditorialCallout
            variant="achtung"
            title="Akute Hilfe und Notfallkontakte"
            className="mt-6"
          >
            Dieser Wegweiser nimmt keine Risikoeinschätzung oder Triage vor. Bei
            akuter Gefahr oder wenn Sie die Dringlichkeit nicht sicher
            einschätzen können, nutzen Sie die zentrale Soforthilfe-Seite:{" "}
            <AppLink href="/soforthilfe" className="editorial-link">
              Akute Hilfe und Notfallkontakte
            </AppLink>
            .
          </EditorialCallout>
        </header>

        {/* ── Hairline-Trenner Editorial-Hero → funktionales Tool ── */}
        <hr
          className="border-0 border-t"
          style={{ borderColor: "var(--rule-color)" }}
        />

        {/* ── Interaktives Tool ── */}
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
              href: "/soforthilfe",
              title: "Soforthilfe",
              description: "Alle Notfallnummern.",
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
