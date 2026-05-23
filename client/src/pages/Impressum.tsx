import ContentSection from "@/components/ContentSection";
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
import AppLink from "@/components/AppLink";
import { emailByIdStrict, kontaktByIdStrict } from "@/data/kontakte";

const fachstelle = kontaktByIdStrict("INFO_FACHSTELLE");
const emailAngehoerigen = emailByIdStrict("EMAIL_ANGEHOERIGEN");
const rot144 = kontaktByIdStrict("ROT_144");
const rot117 = kontaktByIdStrict("ROT_117");
const gruen143 = kontaktByIdStrict("GRUEN_143");

export default function Impressum() {
  return (
    <Layout>
      <SEO
        title="Impressum"
        description="Impressum und rechtliche Informationen."
        path="/impressum"
      />

      <EditorialLayout width="wide">
        <header className="secondary-page-header">
          <EyebrowLabel spacing="compact">Impressum</EyebrowLabel>
          <DisplayHeading level={1} size="utility">
            Verantwortung und <em>rechtliche Hinweise</em>
          </DisplayHeading>
          <Lede className="mt-6">
            Wer hinter diesem Informationsangebot steht, wie Sie die Fachstelle
            erreichen und welche rechtlichen Hinweise für Inhalte, Links und
            Materialien gelten.
          </Lede>
        </header>

        <ContentSection
          variant="editorial"
          title="Verantwortlich für den Inhalt"
          id="verantwortlich"
          defaultOpen={true}
          preview="Christa Egger, Fachstelle Angehörigenarbeit der PUK Zürich."
        >
          <EditorialProse>
            <p>
              Verantwortlich für die Inhalte dieser Website ist{" "}
              <strong>Christa Egger</strong>, Angehörigenberaterin der
              Fachstelle Angehörigenarbeit.
            </p>
            <p>
              Erstellt von Ch. Egger innerhalb der Fachstelle Angehörigenarbeit
              der PUK Zürich. Die inhaltliche Verantwortung liegt bei der
              Fachstelle Angehörigenarbeit. Das Informationsdesign ist
              eigenständig und folgt nicht der PUK-CI.
            </p>
            <p>
              Die Website ist ein unabhängiges Informationsangebot der
              Fachstelle Angehörigenarbeit und kein offizieller
              Kommunikationskanal der PUK Zürich.
            </p>
          </EditorialProse>

          <dl className="secondary-page-definition-list">
            <dt className="secondary-page-definition-term">Funktion</dt>
            <dd className="secondary-page-definition-description">
              Angehörigenberaterin
            </dd>

            <dt className="secondary-page-definition-term">Telefon</dt>
            <dd>
              <a
                href={`tel:${fachstelle.tel}`}
                className="editorial-link secondary-page-contact-link"
              >
                {fachstelle.nummer}
              </a>
            </dd>

            <dt className="secondary-page-definition-term">E-Mail</dt>
            <dd>
              <a
                href={`mailto:${emailAngehoerigen.adresse}`}
                className="editorial-link secondary-page-contact-link"
              >
                {emailAngehoerigen.adresse}
              </a>
            </dd>
          </dl>

          <p className="secondary-page-body mt-6">
            Die Beratung für Angehörige ist kostenlos und steht Angehörigen von
            psychisch kranken Menschen im Kanton Zürich vertraulich zur
            Verfügung.
          </p>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Zweck der Website"
          id="zweck"
          preview="Evidenzbasierte Orientierung, praktische Strategien und Materialien für Angehörige."
        >
          <EditorialProse>
            <p>
              Diese Website bietet Angehörigen von Menschen mit
              Borderline-Persönlichkeitsstörung evidenzbasierte Informationen,
              Orientierung für schwierige Alltagssituationen und Materialien zur
              Selbstfürsorge.
            </p>
            <p>
              Sie verbindet wissenschaftliche Quellen, klinische Erfahrung aus
              der Angehörigenarbeit und praktische Hilfen für Gesprächs-,
              Krisen- und Belastungssituationen.
            </p>
          </EditorialProse>

          <ul className="secondary-page-list secondary-page-list--bulleted">
            <li className="secondary-page-body">
              Informationen zum Verständnis der Störung
            </li>
            <li className="secondary-page-body">
              Strategien für Alltag und Krisensituationen
            </li>
            <li className="secondary-page-body">
              Kommunikationstechniken für schwierige Gespräche
            </li>
            <li className="secondary-page-body">
              Ressourcen zur Selbstfürsorge und Burnout-Prävention
            </li>
          </ul>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Haftungsausschluss"
          id="haftung"
          preview="Die Website ersetzt keine professionelle Beratung, Diagnose oder Behandlung."
        >
          <EditorialProse>
            <p>
              Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              kann dennoch keine Gewähr übernommen werden.
            </p>
            <p>
              <strong>
                Diese Website ersetzt keine professionelle Beratung, Diagnose
                oder Behandlung.
              </strong>{" "}
              Bei psychischen Krisen oder Notfällen wenden Sie sich bitte
              umgehend an die entsprechenden Notfallnummern ({rot144.nummer} /{" "}
              {rot117.nummer}) oder den psychiatrischen Notdienst. Zur
              Entlastung: {gruen143.label} ({gruen143.nummer}).
            </p>
            <p>
              Für externe Links wird keine Haftung übernommen. Für den Inhalt
              der verlinkten Seiten sind ausschliesslich deren Betreiber
              verantwortlich.
            </p>
          </EditorialProse>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Quellenangaben"
          id="impressum-quellen"
          preview="Fachliteratur von Mason/Kreger, Linehan, Fruzzetti und Gunderson/Hoffman."
        >
          <EditorialProse>
            <p>
              Die Inhalte dieser Website stützen sich auf anerkannte
              Fachliteratur, wissenschaftliche Quellen für medizinische und
              therapeutische Aussagen sowie auf klinische Erfahrung in der
              Angehörigenarbeit.
            </p>
            <p>
              Eine vollständige Literaturliste finden Sie auf der{" "}
              <AppLink href="/quellen" className="editorial-link">
                Seite Quellen &amp; Literatur
              </AppLink>
              .
            </p>
          </EditorialProse>

          <ul className="secondary-page-list secondary-page-list--spacious">
            <li>
              <h3 className="secondary-page-list-title">
                Mason, P. T. &amp; Kreger, R.
              </h3>
              <p className="secondary-page-list-text">
                Schluss mit dem Eiertanz: Für Angehörige von Menschen mit
                Borderline. Balance Buch + Medien Verlag.
              </p>
            </li>
            <li>
              <h3 className="secondary-page-list-title">Linehan, M. M.</h3>
              <p className="secondary-page-list-text">
                Dialektisch-Behaviorale Therapie der
                Borderline-Persönlichkeitsstörung. CIP-Medien.
              </p>
            </li>
            <li>
              <h3 className="secondary-page-list-title">Fruzzetti, A. E.</h3>
              <p className="secondary-page-list-text">
                The High-Conflict Couple: A Dialectical Behavior Therapy Guide.
                New Harbinger Publications.
              </p>
            </li>
            <li>
              <h3 className="secondary-page-list-title">
                Gunderson, J. G. &amp; Hoffman, P. D.
              </h3>
              <p className="secondary-page-list-text">
                Understanding and Treating Borderline Personality Disorder.
                American Psychiatric Publishing.
              </p>
            </li>
          </ul>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Urheberrecht"
          id="urheberrecht"
          preview="Schweizerisches Urheberrecht – Materialien für persönlichen Gebrauch und Angehörigenberatung."
        >
          <EditorialProse>
            <p>
              Die Inhalte und Werke auf dieser Website unterliegen dem
              schweizerischen Urheberrecht. Die Vervielfältigung, Bearbeitung,
              Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des
              Urheberrechts bedürfen der schriftlichen Zustimmung.
            </p>
            <p>
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet. Die Infografiken und Handouts
              dürfen im Rahmen der Angehörigenberatung und für den persönlichen
              Gebrauch verwendet werden.
            </p>
          </EditorialProse>
        </ContentSection>

        <EditorialSectionBlock label="Stand" title="Aktualität" rule>
          <p className="secondary-page-body">Stand: Februar 2026</p>
        </EditorialSectionBlock>

        <RelatedLinksEditorial
          links={[
            {
              href: "/datenschutz",
              title: "Datenschutz",
              description: "Wie diese Website mit Daten umgeht.",
            },
            {
              href: "/fachstelle",
              title: "Fachstelle Angehörigenarbeit",
              description:
                "Kontakt und Einordnung der verantwortlichen Stelle.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
