import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO from "@/components/SEO";
import { emailByIdStrict } from "@/data/kontakte";

const emailAngehoerigen = emailByIdStrict("EMAIL_ANGEHOERIGEN");

export default function Feedback() {
  return (
    <Layout>
      <SEO
        title="Feedback"
        description="Rückmeldungen zur Website nehmen wir per E-Mail entgegen."
        path="/feedback"
      />

      <EditorialLayout width="wide">
        <header className="secondary-page-header">
          <EyebrowLabel spacing="compact">Feedback</EyebrowLabel>
          <DisplayHeading level={1} size="utility">
            Rückmeldung geben
          </DisplayHeading>
          <Lede className="mt-6">
            Ihre Erfahrungen und Anregungen helfen uns, diese Website für andere
            Angehörige noch hilfreicher zu gestalten.
          </Lede>
        </header>

        <EditorialSectionBlock label="Kontakt" title="Schreiben Sie uns">
          <EditorialProse>
            <p>
              Rückmeldungen nehmen wir aktuell per E-Mail entgegen – ob Lob,
              Verbesserungsvorschläge oder Hinweise auf Fehler.
            </p>
            <p>
              <a
                href={`mailto:${emailAngehoerigen.adresse}?subject=Feedback zur Website «Borderline – Hilfe für Angehörige»`}
                className="editorial-link secondary-page-contact-link"
              >
                {emailAngehoerigen.adresse}
              </a>
            </p>
            <p>Wir freuen uns über eine kurze Schilderung Ihres Anliegens.</p>
          </EditorialProse>
        </EditorialSectionBlock>

        <EditorialSectionBlock
          label="Hilfreich"
          title="Worüber wir uns besonders freuen"
          rule
        >
          <ol className="secondary-page-list secondary-page-list--spacious">
            <li>
              <h3 className="secondary-page-list-title">
                1. Was Ihnen besonders geholfen hat
              </h3>
              <p className="secondary-page-list-text">
                Welche Inhalte, Formulierungen oder Materialien für Sie
                hilfreich oder entlastend waren.
              </p>
            </li>
            <li>
              <h3 className="secondary-page-list-title">
                2. Was Sie zusätzlich vermissen
              </h3>
              <p className="secondary-page-list-text">
                Welche Fragen offen geblieben sind oder welche Inhalte Sie sich
                ergänzend wünschen würden.
              </p>
            </li>
            <li>
              <h3 className="secondary-page-list-title">
                3. Hinweise auf Fehler
              </h3>
              <p className="secondary-page-list-text">
                Hinweise auf technische Probleme, unklare Stellen oder
                fehlerhafte Angaben helfen uns besonders weiter.
              </p>
            </li>
          </ol>
        </EditorialSectionBlock>

        <EditorialSectionBlock label="Zum Schluss" title="Ein Gedanke" rule>
          <EditorialProse>
            <p>
              Viele Angehörige gehen einen ähnlichen Weg. Ihr Engagement zeigt,
              dass Ihnen die Beziehung wichtig ist. Danke, dass Sie sich die
              Zeit nehmen, diese Website mit Ihrer Rückmeldung besser zu machen.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        <RelatedLinksEditorial
          links={[
            {
              href: "/beratung",
              title: "Beratung & Netzwerke",
              description: "Anlaufstellen und Unterstützung im Raum Zürich.",
            },
            {
              href: "/selbstfuersorge",
              title: "Selbstfürsorge",
              description:
                "Eigene Belastung ernst nehmen und Grenzen schützen.",
            },
            {
              href: "/",
              title: "Startseite",
              description: "Zurück zum Überblick der Website.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
