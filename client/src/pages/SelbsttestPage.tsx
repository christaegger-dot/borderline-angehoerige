import {
  DisplayHeading,
  EditorialCallout,
  EditorialLayout,
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
        title="Passende Inhalte finden"
        description="Finden Sie passende Informationen für Ihre Situation. Fünf Orientierungsfragen, keine Diagnose oder Risikoeinschätzung. Bei Sorgen um Sicherheit finden Sie hier einen Weg zu passenden Anlaufstellen."
        path="/selbsttest"
      />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-12 pt-12 md:pb-16 md:pt-16">
          <EyebrowLabel spacing="compact">Orientierung</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Passende Inhalte finden
          </DisplayHeading>
          <Lede className="mt-6">
            Fünf kurze Fragen helfen Ihnen, passende Inhalte zu finden. Dies ist
            eine redaktionelle Navigation, kein psychologischer Test, keine
            Behandlungsempfehlung und keine Einschätzung Ihrer Sicherheit. Bei
            Sorgen um Sicherheit oder Unsicherheit finden Sie passende
            Anlaufstellen unter «Akute Hilfe und Notfallkontakte».
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
        <EditorialCallout variant="hinweis" className="mt-12 md:mt-16">
          Diese Orientierungshilfe ersetzt keine professionelle Beratung und
          kann keine Diagnose oder Gefährdung beurteilen. Bei akuter Gefahr oder
          wenn Sie die Dringlichkeit nicht sicher einschätzen können, wenden Sie
          sich bitte an die{" "}
          <AppLink href="/soforthilfe" className="editorial-link">
            Akute Hilfe und Notfallkontakte
          </AppLink>
          .
        </EditorialCallout>
      </EditorialLayout>
    </Layout>
  );
}
