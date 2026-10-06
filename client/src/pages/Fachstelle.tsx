import WebsiteEinordnung from "@/components/WebsiteEinordnung";
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
import { fachstellenProfil } from "@/data/kontakte";

export default function Fachstelle() {
  return (
    <Layout>
      <SEO
        title="Fachstelle Angehörigenarbeit"
        description={fachstellenProfil.suchBeschreibung}
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
            {fachstellenProfil.beschreibung} {fachstellenProfil.zugangHinweis}
          </Lede>
          <p className="secondary-page-meta">
            Vollständig ca. 4 Min · Auch abschnittweise lesbar.
          </p>
          <LastVerifiedBadge path="/fachstelle" className="mt-6" />
          <p className="secondary-page-meta">
            {fachstellenProfil.pruefHinweis}
          </p>
        </header>

        {/* ── Unser Angebot ── */}
        <EditorialSectionBlock
          label="Gespräch vorbereiten"
          title="Fragen an die Fachstelle"
        >
          <EditorialProse>
            <p>
              Die Fachstelle ist kein Krisendienst und keine Therapie. Sie ist
              eine Anlaufstelle für Angehörige, die ihre Rolle klären, Belastung
              einordnen und passende nächste Schritte finden möchten.
            </p>
          </EditorialProse>
          <ul className="secondary-page-list secondary-page-list--spacious">
            {fachstellenProfil.gespraechsthemen.map(item => (
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
              {fachstellenProfil.name}, {fachstellenProfil.organisation}.
            </p>
          </EditorialProse>
          <dl className="secondary-page-definition-list">
            <dt className="secondary-page-definition-term">Adresse</dt>
            <dd className="secondary-page-definition-description">
              {fachstellenProfil.adresse.adresse}
            </dd>

            <dt className="secondary-page-definition-term">Telefon</dt>
            <dd>
              <a
                href={`tel:${fachstellenProfil.telefon.tel}`}
                className="editorial-link secondary-page-contact-link"
              >
                {fachstellenProfil.telefon.nummer}
              </a>
              <p className="secondary-page-list-text">
                Fragen Sie nach dem aktuellen Weg zur Terminvereinbarung.
              </p>
            </dd>

            <dt className="secondary-page-definition-term">E-Mail</dt>
            <dd>
              <a
                href={`mailto:${fachstellenProfil.email.adresse}`}
                className="editorial-link secondary-page-contact-link"
              >
                {fachstellenProfil.email.adresse}
              </a>
              <p className="secondary-page-list-text">
                Klären Sie vorab, welche Angaben für eine Anfrage benötigt
                werden.
              </p>
            </dd>

            <dt className="secondary-page-definition-term">Web</dt>
            <dd>
              <a
                href={fachstellenProfil.web.url}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link secondary-page-contact-link"
              >
                {fachstellenProfil.web.url.replace("https://", "")}
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
            <WebsiteEinordnung />
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
