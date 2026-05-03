import {
  EditorialLayout,
  EditorialProse,
  EditorialSection,
} from "@/components/editorial";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import Layout from "@/components/Layout";
import ReviewBadge from "@/components/ReviewBadge";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import {
  emailByIdStrict,
  kontaktByIdStrict,
  urlByIdStrict,
} from "@/data/kontakte";
import { Link, useLocation } from "wouter";

const fachstelleTel = kontaktByIdStrict("INFO_FACHSTELLE");
const fachstelleEmail = emailByIdStrict("EMAIL_ANGEHOERIGEN");
const pukUrl = urlByIdStrict("URL_PUK");
const proMente = kontaktByIdStrict("INFO_PROMENTE");
const standByYouTel = kontaktByIdStrict("INFO_STANDBYYOU");
const vaskZhTel = kontaktByIdStrict("INFO_VASK_ZH");
const vaskZhEmail = emailByIdStrict("EMAIL_VASK_ZH");
const vaskZhUrl = urlByIdStrict("URL_VASK_ZH");
const proMenteUrl = urlByIdStrict("URL_PROMENTE");
const standByYouUrl = urlByIdStrict("URL_STANDBYYOU");
const selbsthilfeChUrl = urlByIdStrict("URL_SELBSTHILFE_CH");

const fachstelleLeistungen = [
  "Vertrauliche Beratung und Entlastungsgespräche (ca. 60 Min.)",
  "Unterstützung im Umgang mit der Erkrankung im Alltag",
  "Orientierung zu Hilfs-, Gruppen- und Entlastungsangeboten",
  "Klärung von Fragen rund um Rolle, Grenzen und Selbstfürsorge",
  "Kostenlos – Daten werden nicht an die Krankenkasse weitergeleitet",
] as const;

const standByYouHelpLineZeiten = [
  ["Montag", "09:30 – 19:00 Uhr"],
  ["Dienstag", "10:00 – 18:00 Uhr"],
  ["Mittwoch", "09:00 – 11:00 Uhr"],
  ["Donnerstag", "10:00 – 12:00 / 16:00 – 18:00 Uhr"],
  ["Freitag", "08:30 – 14:00 Uhr"],
] as const;

const vaskZhTreffpunkte = [
  {
    titel: "Beratungs-Treffpunkt Zürich",
    beschreibung: "Offener Treffpunkt für alle Angehörigen und Freunde",
    termin: "Jeden letzten Dienstag des Monats, 19:00 – 21:00 Uhr",
  },
  {
    titel: "Beratungs-Treffpunkt Winterthur",
    beschreibung: "Offener Treffpunkt für alle Angehörigen und Freunde",
    termin: "Jeden ersten Montag des Monats, 19:00 – 21:00 Uhr",
  },
] as const;

export default function Selbsthilfegruppen() {
  const [currentPath] = useLocation();
  const canonicalPath = "/beratung";

  const stelleTitleStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-lg)",
    fontWeight: "var(--weight-display)",
    lineHeight: "var(--lh-snug)",
    color: "var(--fg-primary)",
    letterSpacing: "var(--tracking-tight)",
  };

  const bodyStyle = {
    fontSize: "var(--text-md)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-secondary)",
  };

  const labelStyle = {
    fontSize: "var(--text-xs)",
    letterSpacing: "var(--tracking-caps)",
    color: "var(--fg-tertiary)",
    fontWeight: 500,
  } as const;

  const categoryHeadingStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-2xl)",
    fontWeight: "var(--weight-display)",
    color: "var(--fg-primary)",
    letterSpacing: "var(--tracking-tight)",
    lineHeight: "var(--lh-snug)",
  };

  const subBlockTitleStyle = {
    fontSize: "var(--text-md)",
    fontWeight: 600,
    color: "var(--fg-primary)",
  };

  return (
    <Layout>
      <SEO
        title="Beratung & Netzwerke"
        description="Professionelle Beratung, Selbsthilfegruppen und Netzwerke für Angehörige von Menschen mit Borderline in der Schweiz."
        path={currentPath}
        canonicalPath={canonicalPath}
      />
      <MedicalPageSchema
        title="Beratung & Netzwerke"
        description="Professionelle Beratung, Selbsthilfegruppen und Netzwerke für Angehörige von Menschen mit Borderline in der Schweiz."
        path={canonicalPath}
      />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-16 pt-16 md:pb-24 md:pt-24">
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Beratung &amp; Netzwerke
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
            Beratung &amp; <em>Netzwerke</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Wenn Belastung, Unsicherheit oder Erschöpfung zu gross werden, kann
            es entlastend sein, nicht nur im eigenen System nach Lösungen zu
            suchen. Hier finden Sie Beratung, Selbsthilfe und weitere
            Anlaufstellen für Angehörige in der Schweiz.
          </p>
          <LastVerifiedBadge path={canonicalPath} className="mt-6" />
          <ReviewBadge path={canonicalPath} />
        </header>

        {/* ── Kategorie-Sprungleiste ── */}
        <nav
          aria-label="Kategorie-Sprungleiste"
          className="border-t border-b py-4"
          style={{ borderColor: "var(--rule-color)" }}
        >
          <p
            className="flex flex-wrap gap-x-5 gap-y-2 uppercase"
            style={labelStyle}
          >
            <a href="#professionelle-beratung" className="editorial-link">
              Professionelle Beratung
            </a>
            <a href="#angehoerigen-netzwerke" className="editorial-link">
              Angehörigen-Netzwerke
            </a>
            <a href="#selbsthilfegruppen" className="editorial-link">
              Selbsthilfegruppen finden
            </a>
          </p>
        </nav>

        {/* ── Professionelle Beratung ── */}
        <section
          id="professionelle-beratung"
          className="mt-16 space-y-8 md:mt-[var(--space-8)]"
        >
          <div className="space-y-2">
            <p className="uppercase" style={labelStyle}>
              Kategorie
            </p>
            <h2 style={categoryHeadingStyle}>Professionelle Beratung</h2>
            <p style={bodyStyle}>
              Anlaufstellen, die Angehörige fachlich begleiten, entlasten und
              bei der Einordnung unterstützen.
            </p>
          </div>

          {/* Fachstelle Angehörigenarbeit PUK */}
          <article
            className="border-t pt-8 space-y-4"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <h3 style={stelleTitleStyle}>
              Fachstelle Angehörigenarbeit (PUK Zürich)
            </h3>
            <p style={bodyStyle}>
              Die Fachstelle an der Psychiatrischen Universitätsklinik Zürich
              bietet kostenlose, vertrauliche{" "}
              <strong>Einzelberatung und Entlastungsgespräche</strong> für
              Angehörige von psychisch erkrankten Menschen – unabhängig davon,
              ob die betroffene Person an der PUK behandelt wird.
            </p>

            <div className="space-y-2">
              <p className="uppercase" style={labelStyle}>
                Was bietet die Fachstelle?
              </p>
              <ul
                className="ml-5 list-disc space-y-1"
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-secondary)",
                }}
              >
                {fachstelleLeistungen.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <dl className="grid gap-y-3 sm:grid-cols-[max-content_1fr] sm:gap-x-8">
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
              </dd>

              <dt className="uppercase" style={labelStyle}>
                Adresse
              </dt>
              <dd style={bodyStyle}>
                Lenggstrasse 31, Postfach
                <br />
                8032 Zürich
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
              </dd>
            </dl>

            <p style={{ fontSize: "var(--text-sm)" }}>
              <Link href="/fachstelle" className="editorial-link">
                Mehr über die Fachstelle erfahren
              </Link>
            </p>
          </article>

          {/* Pro Mente Sana */}
          <article
            className="border-t pt-8 space-y-4"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <h3 style={stelleTitleStyle}>Pro Mente Sana</h3>
            <p style={bodyStyle}>
              Die Schweizerische Stiftung Pro Mente Sana bietet psychosoziale
              und juristische Beratung für Betroffene und Angehörige. Kostenlose
              Telefonberatung zu Fragen rund um psychische Gesundheit.
            </p>
            <p
              className="flex flex-wrap items-baseline gap-x-6 gap-y-1"
              style={{ fontSize: "var(--text-md)" }}
            >
              <a href={`tel:${proMente.tel}`} className="editorial-link">
                {proMente.nummer} (Normaltarif)
              </a>
              <a
                href={proMenteUrl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link"
              >
                {proMenteUrl.url.replace("https://www.", "www.")}
              </a>
            </p>
          </article>
        </section>

        {/* ── Angehörigen-Netzwerke ── */}
        <section
          id="angehoerigen-netzwerke"
          className="mt-16 space-y-8 md:mt-[var(--space-8)]"
        >
          <div className="space-y-2">
            <p className="uppercase" style={labelStyle}>
              Kategorie
            </p>
            <h2 style={categoryHeadingStyle}>Angehörigen-Netzwerke</h2>
            <p style={bodyStyle}>
              Organisationen und Netzwerke, die Austausch, Orientierung und
              Entlastung für Angehörige ermöglichen.
            </p>
          </div>

          {/* Stand by You Schweiz */}
          <article
            className="border-t pt-8 space-y-4"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <h3 style={stelleTitleStyle}>Stand by You Schweiz</h3>
            <p style={bodyStyle}>
              Ehemals VASK Schweiz – Dachverband der Vereinigungen von
              Angehörigen psychisch Erkrankter. Seit Januar 2024 unter neuem
              Namen.
            </p>
            <p style={bodyStyle}>
              Stand by You macht Angehörige und Vertraute von Menschen mit
              psychischen Erkrankungen in der Schweiz sicht-, hör- und spürbar.
              Die Organisation bietet eine kostenlose HelpLine, die von
              Angehörigen für Angehörige betrieben wird.
            </p>
            <dl className="grid gap-y-3 sm:grid-cols-[max-content_1fr] sm:gap-x-8">
              <dt className="uppercase" style={labelStyle}>
                HelpLine (kostenlos)
              </dt>
              <dd>
                <a
                  href={`tel:${standByYouTel.tel}`}
                  className="editorial-link"
                  style={{ fontSize: "var(--text-md)" }}
                >
                  {standByYouTel.nummer}
                </a>
              </dd>

              <dt className="uppercase" style={labelStyle}>
                Web
              </dt>
              <dd>
                <a
                  href={standByYouUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                  style={{ fontSize: "var(--text-md)" }}
                >
                  {standByYouUrl.url.replace("https://www.", "www.")}
                </a>
              </dd>
            </dl>
            <div
              className="border-t pt-4 space-y-3"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <p style={subBlockTitleStyle}>HelpLine-Zeiten</p>
              <LastVerifiedBadge path={canonicalPath} />
              <dl
                className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1"
                style={bodyStyle}
              >
                {standByYouHelpLineZeiten.map(([tag, zeit]) => (
                  <div key={tag} className="contents">
                    <dt>{tag}</dt>
                    <dd>{zeit}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>

          {/* VASK Zürich */}
          <article
            className="border-t pt-8 space-y-4"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <h3 style={stelleTitleStyle}>VASK Zürich</h3>
            <p style={bodyStyle}>
              Kantonale Vereinigung der Angehörigen von psychisch Kranken – mit
              regelmässigen Beratungs-Treffpunkten in Zürich und Winterthur.
            </p>
            <div
              className="border-t pt-4 space-y-6"
              style={{ borderColor: "var(--rule-color)" }}
            >
              {vaskZhTreffpunkte.map(treff => (
                <div key={treff.titel} className="space-y-1">
                  <p style={subBlockTitleStyle}>{treff.titel}</p>
                  <LastVerifiedBadge path={canonicalPath} />
                  <p style={bodyStyle}>{treff.beschreibung}</p>
                  <p style={bodyStyle}>
                    <span className="uppercase" style={labelStyle}>
                      Termin:
                    </span>{" "}
                    {treff.termin}
                  </p>
                </div>
              ))}
            </div>
            <dl className="grid gap-y-3 sm:grid-cols-[max-content_1fr] sm:gap-x-8">
              <dt className="uppercase" style={labelStyle}>
                Beratungstelefon
              </dt>
              <dd>
                <a
                  href={`tel:${vaskZhTel.tel}`}
                  className="editorial-link"
                  style={{ fontSize: "var(--text-md)" }}
                >
                  {vaskZhTel.nummer}
                </a>
              </dd>

              <dt className="uppercase" style={labelStyle}>
                E-Mail
              </dt>
              <dd>
                <a
                  href={`mailto:${vaskZhEmail.adresse}`}
                  className="editorial-link"
                  style={{ fontSize: "var(--text-md)" }}
                >
                  {vaskZhEmail.adresse}
                </a>
              </dd>

              <dt className="uppercase" style={labelStyle}>
                Adresse
              </dt>
              <dd style={bodyStyle}>
                Langstrasse 149
                <br />
                8004 Zürich
              </dd>

              <dt className="uppercase" style={labelStyle}>
                Web
              </dt>
              <dd>
                <a
                  href={vaskZhUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                  style={{ fontSize: "var(--text-md)" }}
                >
                  {vaskZhUrl.url.replace("https://www.", "www.")}
                </a>
              </dd>
            </dl>
          </article>
        </section>

        {/* ── Selbsthilfegruppen finden ── */}
        <section
          id="selbsthilfegruppen"
          className="mt-16 space-y-8 md:mt-[var(--space-8)]"
        >
          <div className="space-y-2">
            <p className="uppercase" style={labelStyle}>
              Kategorie
            </p>
            <h2 style={categoryHeadingStyle}>Selbsthilfegruppen finden</h2>
            <p style={bodyStyle}>
              Wenn Sie mit anderen Angehörigen in Austausch kommen möchten, ist
              Selbsthilfe Schweiz die wichtigste Vermittlungsstelle.
            </p>
          </div>

          <article
            className="border-t pt-8 space-y-4"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <h3 style={stelleTitleStyle}>Selbsthilfe Schweiz</h3>
            <p style={bodyStyle}>
              Selbsthilfegruppen für Angehörige von Menschen mit Borderline
              finden Sie über <strong>Selbsthilfe Schweiz</strong> – die
              zentrale Vermittlungsstelle für Selbsthilfegruppen in der ganzen
              Schweiz. Es gibt Gruppen in mehreren Kantonen, sowohl vor Ort als
              auch online.
            </p>
            <p style={{ fontSize: "var(--text-md)" }}>
              <a
                href={selbsthilfeChUrl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link"
              >
                {selbsthilfeChUrl.url.replace("https://www.", "www.")}
              </a>
            </p>
          </article>
        </section>

        {/* ── Nächste Schritte ── */}
        <EditorialSection label="Weiter" title="Nächste Schritte" rule>
          <EditorialProse>
            <p>
              Nicht jede Unterstützung passt in jeder Lage. Diese drei Wege sind
              oft ein sinnvoller nächster Schritt, wenn Sie gerade Orientierung
              oder Entlastung suchen:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <Link href="/fachstelle" className="editorial-link">
                  Ein erstes Beratungsgespräch bei der Fachstelle anfragen
                </Link>
              </li>
              <li>
                <Link href="/selbstfuersorge" className="editorial-link">
                  Eigene Überlastung und Selbstfürsorge in den Blick nehmen
                </Link>
              </li>
              <li>
                <Link href="/kommunizieren" className="editorial-link">
                  Kommunikation in belasteten Situationen gezielter einordnen
                </Link>
              </li>
            </ul>
          </EditorialProse>
        </EditorialSection>
      </EditorialLayout>
    </Layout>
  );
}
