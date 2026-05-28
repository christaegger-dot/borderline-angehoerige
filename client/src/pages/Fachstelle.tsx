import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO from "@/components/SEO";
import {
  emailByIdStrict,
  kontaktByIdStrict,
  urlByIdStrict,
} from "@/data/kontakte";

const fachstelleTel = kontaktByIdStrict("INFO_FACHSTELLE");
const fachstelleEmail = emailByIdStrict("EMAIL_ANGEHOERIGEN");
const pukUrl = urlByIdStrict("URL_PUK");

const leistungen = [
  {
    title: "Beratung für Angehörige",
    description:
      "Vertrauliche und kostenlose Gespräche für Angehörige, die Orientierung, Entlastung oder Klärung in einer belastenden Situation suchen.",
  },
  {
    title: "Psychoedukation & Materialien",
    description:
      "Fachlich fundierte Informationen, Handouts und Materialien, die helfen können, Dynamiken besser einzuordnen und Gespräche vorzubereiten.",
  },
  {
    title: "Orientierung & Vermittlung",
    description:
      "Unterstützung bei der Suche nach passenden Hilfen, Selbsthilfeangeboten und weiteren Anlaufstellen.",
  },
  {
    title: "Schulungen & Weiterbildung",
    description:
      "Fachliche Weiterbildung und Sensibilisierung zum Thema Angehörigenarbeit im psychosozialen Kontext.",
  },
] as const;

export default function Fachstelle() {
  return (
    <Layout>
      <SEO
        title="Fachstelle Angehörigenarbeit"
        description="Fachstelle Angehörigenarbeit der Psychiatrischen Universitätsklinik Zürich (PUK). Beratung, Orientierung und Materialien für Angehörige."
        path="/fachstelle"
      />

      <EditorialLayout width="wide">
        {/* ── Hero ── */}
        <header className="secondary-page-header">
          <EyebrowLabel spacing="compact">Fachstelle — PUK Zürich</EyebrowLabel>
          <DisplayHeading level={1} size="utility">
            Angehörigenarbeit – professionell begleitet
          </DisplayHeading>
          <Lede className="mt-6">
            Ein Angebot der Psychiatrischen Universitätsklinik Zürich für
            Angehörige von Menschen mit psychischen Erkrankungen. Die Fachstelle
            bietet Orientierung, Entlastung und Beratung für Situationen, die im
            Alltag oft schwer alleine zu tragen sind.
          </Lede>
          <p className="secondary-page-meta">
            Vollständig ca. 4 Min · Auch abschnittweise lesbar.
          </p>
          <LastVerifiedBadge path="/fachstelle" className="mt-6" />
        </header>

        {/* ── Unser Angebot ── */}
        <EditorialSectionBlock label="Leistungen" title="Unser Angebot">
          <EditorialProse>
            <p>
              Die Fachstelle ist kein Krisendienst und keine Therapie. Sie ist
              eine Anlaufstelle für Angehörige, die ihre Rolle klären, Belastung
              einordnen und passende nächste Schritte finden möchten.
            </p>
          </EditorialProse>
          <ul className="secondary-page-list secondary-page-list--spacious">
            {leistungen.map(item => (
              <li key={item.title}>
                <h3 className="secondary-page-list-title">{item.title}</h3>
                <p className="secondary-page-list-text">{item.description}</p>
              </li>
            ))}
          </ul>
        </EditorialSectionBlock>

        {/* ── Kontakt aufnehmen (Pattern wie Home-Section 6) ── */}
        <EditorialSectionBlock
          label="Direkt erreichen"
          title="Kontakt aufnehmen"
        >
          <EditorialProse>
            <p>
              Fachstelle Angehörigenarbeit, Psychiatrische Universitätsklinik
              Zürich (PUK).
            </p>
          </EditorialProse>
          <dl className="secondary-page-definition-list">
            <dt className="secondary-page-definition-term">Adresse</dt>
            <dd className="secondary-page-definition-description">
              Lenggstrasse 31
              <br />
              Postfach
              <br />
              8032 Zürich
            </dd>

            <dt className="secondary-page-definition-term">Telefon</dt>
            <dd>
              <a
                href={`tel:${fachstelleTel.tel}`}
                className="editorial-link secondary-page-contact-link"
              >
                {fachstelleTel.nummer}
              </a>
              <p className="secondary-page-list-text">
                Terminvereinbarung telefonisch.
              </p>
            </dd>

            <dt className="secondary-page-definition-term">E-Mail</dt>
            <dd>
              <a
                href={`mailto:${fachstelleEmail.adresse}`}
                className="editorial-link secondary-page-contact-link"
              >
                {fachstelleEmail.adresse}
              </a>
              <p className="secondary-page-list-text">
                Terminvereinbarung per E-Mail.
              </p>
            </dd>

            <dt className="secondary-page-definition-term">Web</dt>
            <dd>
              <a
                href={pukUrl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link secondary-page-contact-link"
              >
                {pukUrl.url.replace("https://", "")}
              </a>
              <p className="secondary-page-list-text">
                Website der PUK Zürich.
              </p>
            </dd>
          </dl>
        </EditorialSectionBlock>

        {/* ── Einordnung dieser Website ── */}
        <EditorialSectionBlock
          label="Transparenz"
          title="Einordnung dieser Website"
        >
          <EditorialProse>
            <p>
              Diese Website wurde von Ch. Egger innerhalb der Fachstelle
              Angehörigenarbeit aufgebaut. Die inhaltliche Verantwortung liegt
              bei der Fachstelle Angehörigenarbeit.
            </p>
            <p>
              Es handelt sich um ein eigenständig gestaltetes
              Informationsangebot der Fachstelle und nicht um einen offiziellen
              Kommunikationskanal der PUK Zürich.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        <RelatedLinksEditorial
          links={[
            {
              href: "/ueber-uns",
              title: "Über diese Website",
              description: "Prinzipien, Quellen und Hintergründe.",
            },
            {
              href: "/soforthilfe",
              title: "Soforthilfe",
              description: "Notfallnummern und Krisenberatung.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
