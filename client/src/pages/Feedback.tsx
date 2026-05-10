import {
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO from "@/components/SEO";
import { emailByIdStrict } from "@/data/kontakte";

const emailAngehoerigen = emailByIdStrict("EMAIL_ANGEHOERIGEN");

export default function Feedback() {
  const bodyStyle = {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-secondary)",
  };

  const stepStyle = {
    fontSize: "var(--text-md)",
    fontWeight: 600,
    color: "var(--fg-primary)",
  };

  return (
    <Layout>
      <SEO
        title="Feedback"
        description="Rückmeldungen zur Website nehmen wir per E-Mail entgegen."
        path="/feedback"
      />

      <EditorialLayout width="narrow">
        <header className="pb-12 pt-12 md:pb-16 md:pt-16">
          <EyebrowLabel spacing="compact">Feedback</EyebrowLabel>
          <h1
            className="mt-8 font-display text-[var(--text-3xl)] md:text-[var(--text-4xl)]"
            style={{
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
            }}
          >
            Rückmeldung <em>geben</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Ihre Erfahrungen und Anregungen helfen uns, diese Website für andere
            Angehörige noch hilfreicher zu gestalten.
          </p>
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
                className="editorial-link"
                style={{ fontSize: "var(--text-lg)" }}
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
          <ol className="space-y-6">
            <li>
              <h3 style={stepStyle}>1. Was Ihnen besonders geholfen hat</h3>
              <p className="mt-1" style={bodyStyle}>
                Welche Inhalte, Formulierungen oder Materialien für Sie
                hilfreich oder entlastend waren.
              </p>
            </li>
            <li>
              <h3 style={stepStyle}>2. Was Sie zusätzlich vermissen</h3>
              <p className="mt-1" style={bodyStyle}>
                Welche Fragen offen geblieben sind oder welche Inhalte Sie sich
                ergänzend wünschen würden.
              </p>
            </li>
            <li>
              <h3 style={stepStyle}>3. Hinweise auf Fehler</h3>
              <p className="mt-1" style={bodyStyle}>
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
