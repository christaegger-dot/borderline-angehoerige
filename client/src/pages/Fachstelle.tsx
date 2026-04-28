/**
 * Fachstelle — Editorial-Redesign Phase 4 Welle 2 (Page 9/10)
 *
 * Migriert nach Verstehen/Kommunizieren/Grenzen/Selbstfürsorge/Übersicht/
 * Alltag/Therapie/Krise/Genesung-Pattern. Inhalt unverändert ausser
 * Hero-Lesezeit.
 *
 * Brief-Sonderregel (Page 9): Telefon- und E-Mail-Daten ausschliesslich
 * aus `data/kontakte.ts` (`INFO_FACHSTELLE`, `EMAIL_ANGEHOERIGEN`).
 * Pattern wie in der Home-Sektion 6 «Beratungseinladung» — kein
 * Hardcoding. Adresse bleibt (nicht von der Sonderregel erfasst, ADRESSE_PUK
 * im Repo ohne Postfach-Zeile).
 *
 * Out of scope: `LastVerifiedBadge` bleibt.
 *
 * Page hat keine ContentSection-Akkordeons — flache Info-Seite. Daher
 * EditorialSection-Pattern für Strukturierung.
 */
import {
  EditorialLayout,
  EditorialProse,
  EditorialSection,
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
  const h4Style = {
    fontSize: "var(--text-md)",
    fontWeight: 600,
    color: "var(--fg-primary)",
  };

  const bodyStyle = {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-secondary)",
  };

  const labelStyle = {
    fontSize: "var(--text-xs)",
    letterSpacing: "var(--tracking-caps)",
    color: "var(--fg-tertiary)",
    fontWeight: 500,
  } as const;

  return (
    <Layout>
      <SEO
        title="Fachstelle Angehörigenarbeit"
        description="Fachstelle Angehörigenarbeit der Psychiatrischen Universitätsklinik Zürich (PUK). Beratung, Orientierung und Materialien für Angehörige."
        path="/fachstelle"
      />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-12 pt-12 md:pb-16 md:pt-16">
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Fachstelle — PUK Zürich
          </p>
          <h1
            className="mt-8 font-display text-[var(--text-3xl)] md:text-[var(--text-4xl)]"
            style={{
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
            }}
          >
            Angehörigenarbeit – <em>professionell begleitet</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Ein Angebot der Psychiatrischen Universitätsklinik Zürich für
            Angehörige von Menschen mit psychischen Erkrankungen. Die Fachstelle
            bietet Orientierung, Entlastung und Beratung für Situationen, die im
            Alltag oft schwer alleine zu tragen sind.
          </p>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Vollständig ca. 4 Min · Auch abschnittweise lesbar.
          </p>
          <LastVerifiedBadge date="24.03.2026" className="mt-6" />
        </header>

        {/* ── Unser Angebot ── */}
        <EditorialSection label="Leistungen" title="Unser Angebot">
          <EditorialProse>
            <p>
              Die Fachstelle ist kein Krisendienst und keine Therapie. Sie ist
              eine Anlaufstelle für Angehörige, die ihre Rolle klären, Belastung
              einordnen und passende nächste Schritte finden möchten.
            </p>
          </EditorialProse>
          <ul className="mt-8 space-y-6">
            {leistungen.map(item => (
              <li key={item.title}>
                <h4 style={h4Style}>{item.title}</h4>
                <p className="mt-1" style={bodyStyle}>
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </EditorialSection>

        {/* ── Kontakt aufnehmen (Pattern wie Home-Section 6) ── */}
        <EditorialSection label="Direkt erreichen" title="Kontakt aufnehmen">
          <EditorialProse>
            <p>
              Fachstelle Angehörigenarbeit, Psychiatrische Universitätsklinik
              Zürich (PUK).
            </p>
          </EditorialProse>
          <dl className="mt-8 grid gap-y-6 sm:grid-cols-[max-content_1fr] sm:gap-x-10">
            <dt className="uppercase" style={labelStyle}>
              Adresse
            </dt>
            <dd style={bodyStyle}>
              Lenggstrasse 31
              <br />
              Postfach
              <br />
              8032 Zürich
            </dd>

            <dt className="uppercase" style={labelStyle}>
              Telefon
            </dt>
            <dd>
              <a
                href={`tel:${fachstelleTel.tel}`}
                className="editorial-link"
                style={{ fontSize: "var(--text-md)" }}
              >
                {fachstelleTel.nummer}
              </a>
              <p className="mt-1" style={bodyStyle}>
                Terminvereinbarung telefonisch.
              </p>
            </dd>

            <dt className="uppercase" style={labelStyle}>
              E-Mail
            </dt>
            <dd>
              <a
                href={`mailto:${fachstelleEmail.adresse}`}
                className="editorial-link"
                style={{ fontSize: "var(--text-md)" }}
              >
                {fachstelleEmail.adresse}
              </a>
              <p className="mt-1" style={bodyStyle}>
                Terminvereinbarung per E-Mail.
              </p>
            </dd>

            <dt className="uppercase" style={labelStyle}>
              Web
            </dt>
            <dd>
              <a
                href={pukUrl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link"
                style={{ fontSize: "var(--text-md)" }}
              >
                {pukUrl.url.replace("https://", "")}
              </a>
              <p className="mt-1" style={bodyStyle}>
                Website der PUK Zürich.
              </p>
            </dd>
          </dl>
        </EditorialSection>

        {/* ── Einordnung dieser Website ── */}
        <EditorialSection label="Transparenz" title="Einordnung dieser Website">
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
        </EditorialSection>

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
