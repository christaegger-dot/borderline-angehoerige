import {
  DisplayHeading,
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
        <header className="pb-12 pt-16 md:pb-16 md:pt-24">
          <EyebrowLabel spacing="compact">Wegweiser</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Situations-<em>Wegweiser</em>
          </DisplayHeading>
          <Lede className="mt-6">
            In akuten Momenten ist es schwer, klar zu denken. Dieser Wegweiser
            führt Sie Schritt für Schritt – wählen Sie einfach die Situation,
            die am ehesten zutrifft.
          </Lede>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-tertiary)",
            }}
          >
            <strong style={{ color: "var(--fg-primary)" }}>
              Bei akuter Lebensgefahr:
            </strong>{" "}
            Rufen Sie sofort{" "}
            <a href={`tel:${rot144.tel}`} className="editorial-link">
              {rot144.nummer}
            </a>{" "}
            an. Dieser Wegweiser ersetzt keinen Notruf —{" "}
            <AppLink href="/soforthilfe" className="editorial-link">
              alle Notfallnummern
            </AppLink>
            .
          </p>
        </header>

        {/* ── Hairline-Trenner Editorial-Hero → funktionales Tool ── */}
        <hr
          className="border-0 border-t"
          style={{ borderColor: "var(--rule-color)" }}
        />

        {/* ── Interaktives Tool ── */}
        <div className="mt-12 md:mt-16">
          <SituationsWegweiser />
        </div>

        {/* ── Weiterführende Seiten ── */}
        <RelatedLinksEditorial
          links={[
            {
              href: "/unterstuetzen/krise",
              title: "Krisenbegleitung",
              description: "Deeskalation und Ampel-System.",
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
              href: "/selbstfuersorge",
              title: "Selbstfürsorge",
              description: "Strategien für die Zeit danach.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
