import { useCallback } from "react";
import ContentSection from "@/components/ContentSection";
import {
  DisplayHeading,
  EditorialProse,
  EditorialPullQuote,
  EditorialSection,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import EvidenceNote from "@/components/EvidenceNote";
import { AufgangIllustration } from "@/components/illustrations";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import { TableOfContents } from "@/components/UXEnhancements";
import { genesungItems as genesungMaterialItems } from "@/content/genesung";
import { getHandoutOpenHref } from "@/content/handouts";
import { getHandoutTextVersionHrefBySource } from "@/content/handoutTextVersions";
import { quellenLinks } from "@/content/quellenLinks";
import { Link } from "wouter";

/** Öffnet eine ContentSection via Custom Event und scrollt dorthin. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

const fortschrittParadoxItems = [
  "Rückschritte einordnen, statt sofort zu katastrophisieren",
  "Fortschritte konkret benennen, statt nur global zu hoffen",
  "Tempo nicht übersteuern, wenn es besser läuft",
  "für schwierige Phasen einen kleinen Plan bereithalten",
] as const;

const beitragenItems = [
  {
    title: "Konsistenz",
    desc: "berechenbar bleiben, statt in Alarm mitzukippen",
  },
  {
    title: "realistische Hoffnung",
    desc: "Zuversicht ohne Druck vermitteln",
  },
  {
    title: "eigene Grenzen",
    desc: "die eigene Stabilität nicht opfern",
  },
  {
    title: "professionelle Hilfe",
    desc: "Behandlung unterstützen, aber nicht ersetzen",
  },
] as const;

const foerderfaktoren = [
  "spezialisierte Psychotherapie",
  "Zeit und Geduld",
  "stabile, nicht verschlingende Beziehungen",
  "alltagsbezogene Struktur",
  "Behandlung von Begleiterkrankungen",
] as const;

export default function Genesung() {
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      openSection(sectionId);
    },
    []
  );

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

  const versalStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-4xl)",
    fontWeight: "var(--weight-display)",
    color: "var(--accent-primary)",
    lineHeight: 1,
    letterSpacing: "var(--tracking-tight)",
  } as const;

  return (
    <Layout>
      <SEO
        title="Genesung"
        description="Genesung bei Borderline: realistische Hoffnung, Langzeitverlauf und was das für Angehörige bedeutet."
        path="/genesung"
      />
      <MedicalPageSchema
        title="Genesung"
        description="Genesung bei Borderline: realistische Hoffnung, Langzeitverlauf und was das für Angehörige bedeutet."
        path="/genesung"
      />
      <TableOfContents />

      {/* ── 1 Hero ── EditorialSection mit AufgangIllustration als Aside */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.4,
            }}
          >
            Weg und Bewegung
          </span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel className="mb-8" spacing="compact">
            Genesung
          </EyebrowLabel>
          <DisplayHeading level={1}>
            Genesung ist <em>möglich</em> — und sieht selten geradlinig aus.
          </DisplayHeading>
          <Lede className="max-w-[30em]">
            Hoffnung ist bei Borderline berechtigt – und gleichzeitig verläuft
            Entwicklung selten glatt oder vorhersehbar. Für Angehörige ist
            beides wichtig: Zuversicht und eine realistische Sicht auf Zeit.
          </Lede>
          <div
            className="mt-8 border-t pt-3"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <EyebrowLabel spacing="compact">
              Vollständig ca. 8 Min · Auch abschnittweise lesbar
            </EyebrowLabel>
            <LastVerifiedBadge path="/genesung" className="mt-3" />
          </div>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <AufgangIllustration
            ariaLabel="Ein Aufgang mit Wegmarkern, der nicht zu einem Ziel führt, sondern in Bewegung hält."
            className="ml-auto block aspect-square w-full max-w-[560px]"
          />
        </EditorialSection.Aside>
      </EditorialSection>

      {/* ── 2 Intro: Was auf dieser Seite besonders wichtig ist ── */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Kerngedanke
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Überblick</EyebrowLabel>
          <DisplayHeading level={2}>
            Was auf dieser Seite besonders wichtig ist
          </DisplayHeading>
          <EditorialProse>
            <p>
              Diese Seite übersetzt Prognose und Langzeitverlauf in eine
              alltagsnahe Angehörigenperspektive. Entscheidend sind weniger
              glatte Erfolgsbilder als ein realistischer Blick auf Zeit,
              Rückschritte, Hoffnung und den begrenzten eigenen Einfluss.
            </p>
            <p>
              Drei Akzente ziehen sich durch die Seite: zuerst Hoffnung
              realistisch halten — Genesung ist oft möglich, aber selten glatt,
              schnell oder vollständig planbar; dann Rückschritte einordnen —
              ein Einbruch oder Stillstand entwertet bisherigen Fortschritt
              nicht automatisch; und schliesslich die eigene Rolle begrenzt
              sehen — Angehörige können Entwicklung mittragen, aber nicht
              herstellen oder beschleunigen.
            </p>
            <p>
              Sie können auch direkt zu{" "}
              <a
                href="#remission"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "remission")}
              >
                Remission und Genesung
              </a>
              ,{" "}
              <a
                href="#fortschritt-paradox"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "fortschritt-paradox")}
              >
                Fortschritt-Paradox
              </a>
              ,{" "}
              <a
                href="#hoffnung"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "hoffnung")}
              >
                realistischer Hoffnung
              </a>{" "}
              oder{" "}
              <a
                href="#beitragen"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "beitragen")}
              >
                der Angehörigenrolle
              </a>{" "}
              springen.
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 3 Forschungs-Block ── EditorialSection mit MarginNote «FORSCHUNGSSTAND» */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Forschungsstand
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Forschung</EyebrowLabel>
          <DisplayHeading level={2}>Was die Forschung zeigt</DisplayHeading>
          <EditorialProse>
            <p>
              Langzeitstudien sprechen klar gegen das alte Bild einer
              hoffnungslosen Entwicklung. Viele Menschen mit Borderline erleben
              über Jahre deutliche Besserungen.
            </p>
          </EditorialProse>

          {/* Versalziffern als hairline-separierte Sub-Blöcke (kein Card-Trio) */}
          <dl className="mt-10 grid gap-y-10 sm:grid-cols-3 sm:gap-x-10">
            <div
              className="border-t pt-6"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <dt style={versalStyle}>85–93%</dt>
              <dd className="mt-3" style={bodyStyle}>
                erreichen eine symptomatische Remission innerhalb von etwa 10
                Jahren.
              </dd>
              <dd
                className="mt-1"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--fg-tertiary)",
                }}
              >
                (Daten aus Spezialzentren)
              </dd>
            </div>
            <div
              className="border-t pt-6"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <dt style={versalStyle}>50%</dt>
              <dd className="mt-3" style={bodyStyle}>
                erreichen eine umfassendere Genesung mit funktioneller
                Stabilität — meist innerhalb von 10 bis 20 Jahren.
              </dd>
            </div>
            <div
              className="border-t pt-6"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <dt style={versalStyle}>Jahre</dt>
              <dd className="mt-3" style={bodyStyle}>
                nicht Wochen oder Monate – eher mindestens ein bis mehrere
                Jahre, oft mit mehreren Anläufen.
              </dd>
            </div>
          </dl>

          <div className="mt-10">
            <EvidenceNote
              variant="editorial"
              title="Quellen zu Prognose- und Remissionsaussagen"
              sources={[
                {
                  label:
                    "Zanarini et al. (2010) – McLean Study of Adult Development",
                  href: quellenLinks.zanarini2010,
                },
                {
                  label:
                    "Zanarini et al. (2012) – Sustained remission and recovery in BPD",
                  href: quellenLinks.zanarini2012,
                },
                {
                  label:
                    "Gunderson et al. (2011) – Ten-year course of BPD (CLPS)",
                  href: quellenLinks.gunderson2011,
                },
              ]}
            />
          </div>

          <p className="mt-6" style={bodyStyle}>
            <strong style={{ color: "var(--fg-primary)" }}>Hinweis:</strong>{" "}
            Diese Zahlen stammen aus Spezialzentren unter optimalen Bedingungen.
            Der reale Weg ist für viele Menschen nicht-linear und braucht
            länger. Genesung bleibt das realistische Ziel — aber Rückschritte
            und lange Phasen gehören dazu.
          </p>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 4 Group B: Bewegungsmuster ── remission + fortschritt-paradox */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Bewegungsmuster
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          {/* ── ContentSection 1: remission ── */}
          <ContentSection
            variant="editorial"
            title="Was Remission und Genesung bedeuten"
            id="remission"
            defaultOpen={true}
            preview="Besserung heisst nicht zwingend völlige Symptomfreiheit. Für Angehörige ist wichtig, die Begriffe realistischer zu lesen."
          >
            <div className="mt-2 grid gap-8 sm:grid-cols-2">
              <article className="space-y-2">
                <h4 style={h4Style}>Symptomatische Remission</h4>
                <p style={bodyStyle}>
                  Die diagnostischen Kriterien werden über längere Zeit nicht
                  mehr erfüllt oder deutlich schwächer. Das bedeutet häufig
                  weniger Impulsdurchbrüche, weniger Instabilität und mehr
                  inneren Spielraum.
                </p>
              </article>
              <article className="space-y-2">
                <h4 style={h4Style}>Umfassendere Genesung</h4>
                <p style={bodyStyle}>
                  Zusätzlich zur Symptomverbesserung kommen alltagsbezogene
                  Stabilität, Beziehungen, Arbeit oder Ausbildung und mehr
                  Lebensqualität in den Blick.
                </p>
              </article>
            </div>
            <div className="mt-6">
              <EditorialPullQuote>
                Für Angehörige ist entscheidend: Besserung ist oft real, auch
                wenn nicht alles konfliktfrei, leicht oder linear wird.
              </EditorialPullQuote>
            </div>
          </ContentSection>

          {/* ── ContentSection 2: fortschritt-paradox ── */}
          <ContentSection
            variant="editorial"
            title="Das Fortschritt-Paradox"
            id="fortschritt-paradox"
            preview="Gerade wenn es besser läuft, können Rückschritte besonders verunsichern. Das entwertet den Weg aber nicht automatisch."
          >
            <EditorialProse>
              <p>
                Viele Angehörige erleben ein irritierendes Muster: Nach einer
                ruhigeren Phase kommt wieder ein Einbruch. Dann fühlt es sich
                schnell an, als wäre alles umsonst gewesen. Meist ist das nicht
                die treffendste Deutung.
              </p>
            </EditorialProse>
            <div className="mt-4">
              <EditorialPullQuote>
                Entwicklung bedeutet bei Borderline häufig nicht: Schritt für
                Schritt nur vorwärts. Eher: Es gibt Bewegungen, Unterbrüche,
                Wiederaufnahmen und Phasen, in denen neue Stabilität erst
                gelernt werden muss.
              </EditorialPullQuote>
            </div>

            <figure
              className="mt-8 border-t pt-6"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <figcaption className="text-center uppercase" style={labelStyle}>
                Genesungsverlauf: nicht linear
              </figcaption>
              <svg
                viewBox="0 0 300 70"
                className="mt-3 h-14 w-full"
                aria-hidden="true"
              >
                <line
                  x1="15"
                  y1="58"
                  x2="285"
                  y2="12"
                  stroke="var(--accent-primary)"
                  strokeWidth="1"
                  strokeDasharray="5,4"
                  opacity="0.35"
                />
                <path
                  d="M 15,56 C 40,56 48,22 65,28 S 95,60 115,50 S 155,16 182,22 S 215,48 245,36 S 272,14 285,10"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="15"
                  y="68"
                  fontSize="8"
                  fill="currentColor"
                  opacity="0.45"
                >
                  Beginn
                </text>
                <text
                  x="255"
                  y="9"
                  fontSize="8"
                  fill="currentColor"
                  opacity="0.45"
                >
                  Ziel
                </text>
                <text
                  x="88"
                  y="68"
                  fontSize="7.5"
                  fill="currentColor"
                  opacity="0.5"
                >
                  Rückschritt
                </text>
                <line
                  x1="115"
                  y1="65"
                  x2="115"
                  y2="52"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  opacity="0.35"
                />
                <text
                  x="187"
                  y="68"
                  fontSize="7.5"
                  fill="currentColor"
                  opacity="0.5"
                >
                  Rückschritt
                </text>
                <line
                  x1="215"
                  y1="65"
                  x2="215"
                  y2="49"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  opacity="0.35"
                />
              </svg>
              <p
                className="mt-2 text-center"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--fg-tertiary)",
                }}
              >
                Rückschritte gehören zum Weg — die gestrichelte Linie zeigt den
                Gesamttrend.
              </p>
            </figure>

            <EditorialProse>
              <ul className="mt-8 ml-6 list-disc space-y-1">
                {fortschrittParadoxItems.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </EditorialProse>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 5 Group C: Was trägt ── hoffnung + beitragen + faktoren */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Was trägt
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          {/* ── ContentSection 3: hoffnung ── */}
          <ContentSection
            variant="editorial"
            title="Realistische Hoffnung statt glatter Zuversicht"
            id="hoffnung"
            preview="Hoffnung ist wichtig. Sie wird aber tragfähiger, wenn sie Raum lässt für Erschöpfung, Zweifel, lange Dauer und ungleichmässige Entwicklung."
          >
            <EditorialProse>
              <p>
                Angehörige brauchen oft Hoffnung, um nicht zu resignieren.
                Gleichzeitig kann ein zu glattes Fortschrittsbild zusätzlichen
                Druck erzeugen: auf die betroffene Person, auf die Beziehung und
                auf Sie selbst.
              </p>
            </EditorialProse>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 style={h4Style}>Weniger hilfreich</h4>
                <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                  <li>«Jetzt muss es doch endlich besser werden»</li>
                  <li>«Ein Rückschritt entwertet alles»</li>
                  <li>«Wenn genug Wille da ist, geht es schnell»</li>
                </ul>
              </div>
              <div>
                <h4 style={h4Style}>Tragfähiger</h4>
                <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                  <li>Besserung ist möglich und oft wahrscheinlich</li>
                  <li>Rückschritte kommen vor und müssen nicht alles kippen</li>
                  <li>Tempo und Zeitpunkt bleiben begrenzt steuerbar</li>
                </ul>
              </div>
            </div>
          </ContentSection>

          {/* ── ContentSection 4: beitragen ── */}
          <ContentSection
            variant="editorial"
            title="Was Angehörige zur Genesung beitragen können"
            id="beitragen"
            preview="Ihre Rolle ist wertvoll, aber begrenzt. Sie können Bedingungen mittragen, nicht Entwicklung herstellen."
          >
            <div className="mt-2 grid gap-8 sm:grid-cols-2">
              {beitragenItems.map(item => (
                <article key={item.title} className="space-y-2">
                  <h4 style={h4Style}>{item.title}</h4>
                  <p style={bodyStyle}>{item.desc}</p>
                </article>
              ))}
            </div>
          </ContentSection>

          {/* ── ContentSection 5: faktoren ── */}
          <ContentSection
            variant="editorial"
            title="Was Entwicklung eher fördert"
            id="faktoren"
            preview="Die Forschung beschreibt mehrere günstige Bedingungen. Keine davon ist eine Garantie, aber viele sind beeinflussbar."
          >
            <ol className="mt-2 space-y-4">
              {foerderfaktoren.map((item, index) => (
                <li key={item} className="flex items-start gap-4">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "var(--accent-primary)",
                      color: "var(--bg-primary)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                    }}
                  >
                    {index + 1}
                  </span>
                  <p className="pt-1.5" style={bodyStyle}>
                    {item}
                  </p>
                </li>
              ))}
            </ol>
            <EditorialProse>
              <p className="mt-6">
                Zum Punkt «Behandlung von Begleiterkrankungen»: Bei Borderline
                tritt selten nur eine Diagnose auf — Depression und andere
                Komorbiditäten beeinflussen den Verlauf wesentlich. Mehr dazu
                auf der Seite{" "}
                <Link href="/begleiterkrankungen" className="editorial-link">
                  Begleiterkrankungen
                </Link>
                .
              </p>
            </EditorialProse>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 6 Materialien ── EditorialSection cream + full-width tile section */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Materialien zum Vertiefen
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Materialien</EyebrowLabel>
          <DisplayHeading level={2} id="infografiken">
            Materialien & Infografiken
          </DisplayHeading>
          <p
            className="max-w-[36em]"
            style={{
              fontSize: "var(--text-md)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-secondary)",
            }}
          >
            Vertiefende Materialien zu Verlauf, Hoffnung, Rückschritten und der
            Rolle von Angehörigen. Wenn verfügbar, führt «Textversion lesen» zur
            Web-Version. «PDF öffnen» öffnet die A4-Druckversion im neuen Tab.
          </p>
        </EditorialSection.Body>
      </EditorialSection>

      <section
        className="bg-[var(--bg-primary)] px-[var(--container-pad)] pb-20 md:px-[var(--container-pad-md)] md:pb-[120px]"
        aria-label="Materialien & Infografiken — Tile-Liste"
      >
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {genesungMaterialItems.map(item => {
              const textVersionHref = getHandoutTextVersionHrefBySource(
                item.pdf
              );
              const pdfHref = getHandoutOpenHref(item.pdf) ?? item.pdf;
              return (
                <article
                  key={item.title}
                  className="space-y-3 border-t pt-6"
                  style={{ borderColor: "var(--rule-color)" }}
                >
                  <img
                    src={item.thumbnailUrl ?? item.img}
                    alt={item.title}
                    className="aspect-[3/4] w-full rounded-md object-cover object-top"
                    style={{ backgroundColor: "var(--bg-elevated)" }}
                    loading="lazy"
                    width={600}
                    height={848}
                    decoding="async"
                  />
                  <h3 style={h4Style}>{item.title}</h3>
                  <p style={bodyStyle}>{item.desc}</p>
                  <p
                    className="flex flex-wrap gap-x-5 gap-y-1"
                    style={{ fontSize: "var(--text-sm)" }}
                  >
                    {textVersionHref && (
                      <Link
                        href={textVersionHref}
                        className="editorial-link"
                        aria-label={`Textversion lesen: ${item.title}`}
                      >
                        Textversion lesen
                      </Link>
                    )}
                    <a
                      href={pdfHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link"
                      aria-label={`PDF öffnen: ${item.title} (neuer Tab)`}
                    >
                      PDF öffnen
                    </a>
                  </p>
                </article>
              );
            })}
          </div>
          <p
            className="mt-12 flex flex-wrap gap-x-5 gap-y-1"
            style={{ fontSize: "var(--text-sm)" }}
          >
            <Link href="/materialien" className="editorial-link">
              Alle Materialien ansehen
            </Link>
            <Link href="/glossar" className="editorial-link">
              Fachbegriffe im Glossar
            </Link>
            <Link href="/buchempfehlungen" className="editorial-link">
              Buchempfehlungen
            </Link>
          </p>
        </div>
      </section>

      {/* ── 7 Weiter-Hinweis ── */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Weiter
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EditorialProse>
            <p>
              Unterstützung heisst nicht, Entwicklung herzustellen. Es heisst
              oft, Beziehung, Klarheit und Selbstschutz über längere Zeit
              auszubalancieren —{" "}
              <Link href="/unterstuetzen/uebersicht" className="editorial-link">
                Unterstützen lernen
              </Link>
              ,{" "}
              <Link href="/unterstuetzen/therapie" className="editorial-link">
                Therapie begleiten
              </Link>{" "}
              oder{" "}
              <Link href="/selbstfuersorge" className="editorial-link">
                Selbstfürsorge
              </Link>{" "}
              vertiefen.
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 8 Querverweise ── EditorialSection variant="cream-deep" */}
      <EditorialSection variant="cream-deep">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.3,
            }}
          >
            Verwandt
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <RelatedLinksEditorial
            flush
            links={[
              {
                href: "/unterstuetzen/uebersicht",
                title: "Unterstützen — Übersicht",
                description:
                  "Wie Angehörige hilfreich bleiben können: Rolle, Krisenlogik und tragfähige Unterstützung.",
              },
              {
                href: "/unterstuetzen/therapie",
                title: "Therapie begleiten",
                description:
                  "Behandlung mittragen, ohne mitzubehandeln — Rolle, Behandlungssystem und Rückschläge.",
              },
              {
                href: "/selbstfuersorge",
                title: "Selbstfürsorge",
                description:
                  "Eigene Belastung ernst nehmen — Voraussetzung, um langfristig präsent bleiben zu können.",
              },
            ]}
          />
        </EditorialSection.Body>
      </EditorialSection>
    </Layout>
  );
}
