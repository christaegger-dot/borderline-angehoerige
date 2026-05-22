import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import AppLink from "@/components/AppLink";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Selbsttest from "@/components/Selbsttest";

export default function SelbsttestPage() {
  return (
    <Layout>
      <SEO
        title="Selbsttest"
        description="Selbsttest für Angehörige: Wie stark sind Sie gerade belastet? Anonyme Einschätzung in wenigen Minuten – mit Hinweisen auf passende Hilfsangebote."
        path="/selbsttest"
      />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-12 pt-16 md:pb-16 md:pt-24">
          <EyebrowLabel spacing="compact">Selbsttest</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Selbsttest: <em>Wo soll ich anfangen?</em>
          </DisplayHeading>
          <Lede className="mt-6">
            Dieser kurze Test hilft Ihnen, die für Ihre aktuelle Situation
            passenden Inhalte zu finden. Er dauert nur etwa 2 Minuten.
          </Lede>
        </header>

        {/* ── Hairline-Trenner Editorial-Hero → funktionales Tool ── */}
        <hr
          className="border-0 border-t"
          style={{ borderColor: "var(--rule-color)" }}
        />

        {/* ── Form-Tool ── */}
        <div className="mt-12 md:mt-16">
          <Selbsttest />
        </div>

        {/* ── Hinweis ── */}
        <EditorialSectionBlock rule>
          <EditorialProse>
            <p>
              Dieser Test ersetzt keine professionelle Beratung. Er dient
              lediglich als Orientierungshilfe, um Ihnen den Einstieg in unsere
              Inhalte zu erleichtern. Bei akuten Krisen wenden Sie sich bitte an
              die{" "}
              <AppLink href="/soforthilfe" className="editorial-link">
                Notfallressourcen
              </AppLink>
              .
            </p>
          </EditorialProse>
        </EditorialSectionBlock>
      </EditorialLayout>
    </Layout>
  );
}
