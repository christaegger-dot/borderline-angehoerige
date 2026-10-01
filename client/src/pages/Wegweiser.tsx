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
import { kontaktByIdStrict } from "@/data/kontakte";
import { PERSONAL_NOTFALLKARTE_PATH } from "@/domain/notfallkarte";

const rot144 = kontaktByIdStrict("ROT_144");

export default function Wegweiser() {
  return (
    <Layout>
      <SEO
        title="Situations-Wegweiser"
        description="Was tun, wenn Ihr Angehöriger in einer Krise ist? Unser interaktiver Wegweiser führt Sie Schritt für Schritt durch verschiedene Situationen."
        path="/wegweiser"
      />
      <MedicalPageSchema
        title="Situations-Wegweiser"
        description="Was tun, wenn Ihr Angehöriger in einer Krise ist? Unser interaktiver Wegweiser führt Sie Schritt für Schritt durch verschiedene Situationen."
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
          <EditorialCallout
            variant="achtung"
            title="Bei akuter Lebensgefahr"
            className="mt-6"
          >
            Rufen Sie sofort{" "}
            <a href={`tel:${rot144.tel}`} className="editorial-link">
              {rot144.nummer}
            </a>{" "}
            an. Dieser Wegweiser ersetzt keinen Notruf —{" "}
            <AppLink href="/soforthilfe" className="editorial-link">
              alle Notfallnummern
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
              href: PERSONAL_NOTFALLKARTE_PATH,
              title: "Notfallkarte",
              description: "Persönliche Karte erstellen.",
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
