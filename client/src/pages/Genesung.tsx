import { LearningGoal, LearningPathNav } from "@/components/LearningPath";
import LearningGuide from "@/components/interactive/LearningGuide";
import TopicQuickLinks from "@/components/TopicQuickLinks";
import ContentSection from "@/components/ContentSection";
import {
  DisplayHeading,
  EditorialBody,
  EditorialProse,
  EditorialPullQuote,
  EditorialSection,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import EvidenceNote from "@/components/EvidenceNote";
import { AufgangIllustration } from "@/components/illustrations";
import HandoutVisualPlaceholder from "@/components/HandoutVisualPlaceholder";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import ReviewBadge from "@/components/ReviewBadge";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import { TableOfContents } from "@/components/UXEnhancements";
import { genesungItems as genesungMaterialItems } from "@/content/genesung";
import { getHandoutOpenHref } from "@/content/handouts";
import { getHandoutTextVersionHrefBySource } from "@/content/handoutTextVersions";
import {
  HANDOUT_VISUAL_REFRESH_NOTE,
  isHandoutVisualPublished,
} from "@/content/handoutGovernance";
import { quellenLinks } from "@/content/quellenLinks";
import { Link } from "wouter";

const fortschrittParadoxItems = [
  "erneute Belastung ernst nehmen, ohne bisherige Entwicklung für verloren zu erklären",
  "die Person selbst fragen, welche Veränderungen für sie bedeutsam sind",
  "bei einer besseren Phase keinen Zeit- oder Erfolgsdruck aufbauen",
  "für eigene Grenzen und professionelle Kontakte einen kleinen Plan bereithalten",
] as const;

const beitragenItems = [
  {
    title: "Absprachen anbieten",
    desc: "gemeinsame Absprachen, soweit sie gewünscht und für Sie tragbar sind",
  },
  {
    title: "Nachfragen",
    desc: "die Person selbst fragen, welche Unterstützung oder welcher Abstand hilfreich wäre",
  },
  {
    title: "eigene Grenzen",
    desc: "die eigene Gesundheit und das eigene Leben unabhängig schützen",
  },
  {
    title: "Information anbieten",
    desc: "auf Wunsch Angebote suchen; Behandlung bleibt Entscheidung der Person und des Fachteams",
  },
] as const;

const einflussbereiche = [
  {
    title: "Strukturierte Behandlung",
    desc: "Ein personenzentrierter Behandlungsplan und eine strukturierte Psychotherapie können zentrale Bestandteile der Behandlung sein.",
  },
  {
    title: "Körperliche und psychische Gesundheit",
    desc: "Körperliche Beschwerden und weitere psychische Erkrankungen werden eigenständig behandelt, bei Bedarf auch mit Medikamenten. Für Borderline selbst sind Medikamente keine Kernbehandlung; Änderungen nur mit der behandelnden Fachperson.",
  },
  {
    title: "Gewählte Beziehungen und Unterstützung",
    desc: "Soziale, praktische oder Peer-Unterstützung kann hilfreich sein, wenn sie gewünscht ist. Angehörige müssen Genesung nicht absichern.",
  },
  {
    title: "Lebensbedingungen und Teilhabe",
    desc: "Wohnen, finanzielle Sicherheit, Ausbildung oder Arbeit, sinnvolle Tätigkeiten und der Zugang zu Hilfe können entlasten oder belasten.",
  },
  {
    title: "Zeit und individueller Verlauf",
    desc: "Veränderung hat keinen festen Zeitplan und verläuft nicht nach einer vorgeschriebenen Reihenfolge.",
  },
] as const;

export default function Genesung() {
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
      <EditorialSection
        variant="cream"
        density="compact"
        className="topic-intro"
      >
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
          <EyebrowLabel className="mb-3" spacing="compact">
            Genesung
          </EyebrowLabel>
          <DisplayHeading level={1} size="topic">
            Genesung ist <em>möglich</em> — und kann unterschiedlich aussehen.
          </DisplayHeading>
          <Lede className="max-w-[30em]">
            Hoffnung ist bei Borderline berechtigt. Wege, Tempo und Bedeutung
            von Veränderung sind individuell; weder eine Diagnose noch eine
            einzelne Phase legt den weiteren Verlauf fest.
          </Lede>
          <LearningGoal path="/genesung" />
          <TopicQuickLinks
            items={[
              { href: "#remission", label: "Remission und Genesung" },
              {
                href: "#fortschritt-paradox",
                label: "Unterschiedliche Verläufe",
              },
              { href: "#hoffnung", label: "Realistische Hoffnung" },
              { href: "#garten", label: "Was in Ihrer Hand liegt" },
            ]}
          />
          <div
            className="mt-8 border-t pt-3"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <EyebrowLabel spacing="compact">
              Grundtext ca. 8 Min · Mit Vertiefungen länger
            </EyebrowLabel>
            <ReviewBadge path="/genesung" className="mt-3" />
          </div>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <AufgangIllustration
            ariaLabel="Ein Aufgang mit Wegmarkern, der nicht zu einem Ziel führt, sondern in Bewegung hält."
            className="ml-auto block aspect-square w-full max-w-[560px]"
          />
        </EditorialSection.Aside>
      </EditorialSection>

      <EditorialSection variant="cream" density="compact">
        <EditorialSection.Body>
          <LearningGuide kind="garten" id="garten" />
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 2 Intro: Was auf dieser Seite besonders wichtig ist ── */}
      <EditorialSection variant="cream" density="compact">
        <EditorialSection.Body>
          <ul className="topic-takeaways">
            <li>
              Besserung ist möglich; Verlauf und Tempo unterscheiden sich von
              Mensch zu Mensch.
            </li>
            <li>
              Studienzahlen beschreiben Gruppen und keine persönliche Prognose.
            </li>
            <li>
              Angehörige können begleiten. Den Verlauf müssen sie nicht
              herstellen oder verantworten.
            </li>
          </ul>
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
          <DisplayHeading level={2} id="prognose-studien">
            Was die Forschung zeigt
          </DisplayHeading>
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
              <dt style={versalStyle}>93%</dt>
              <dd className="mt-3" style={bodyStyle}>
                erreichten während einer zehnjährigen Studie mindestens einmal
                eine symptomatische Remission über zwei Jahre.
              </dd>
              <dd
                className="mt-1"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--fg-tertiary)",
                }}
              >
                (Zanarini et al., 2010)
              </dd>
            </div>
            <div
              className="border-t pt-6"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <dt style={versalStyle}>50%</dt>
              <dd className="mt-3" style={bodyStyle}>
                erreichten im selben Beobachtungszeitraum eine mindestens
                zweijährige Recovery: Remission zusammen mit guter sozialer und
                beruflicher Funktionsfähigkeit nach der Studiendefinition.
              </dd>
              <dd
                className="mt-1"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--fg-tertiary)",
                }}
              >
                (Zanarini et al., 2010)
              </dd>
            </div>
            <div
              className="border-t pt-6"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <dt style={versalStyle}>10 Jahre</dt>
              <dd className="mt-3" style={bodyStyle}>
                beschreiben den Beobachtungszeitraum der Forschung. Daraus lässt
                sich keine feste Wartezeit bis zu einer Besserung ableiten.
              </dd>
            </div>
          </dl>

          <div className="mt-10">
            <EvidenceNote
              variant="editorial"
              title="Quellen zu Prognose- und Remissionsaussagen"
              definition="Die Werte 93 % und 50 % sowie der Zeitraum von zehn Jahren stammen aus Zanarini et al. (2010). Die Studie von 2012 berichtet ein separates 16-Jahres-Follow-up zu anhaltender Remission und Recovery."
              sources={[
                {
                  label:
                    "Zanarini et al. (2010) – Zehnjährige McLean-Verlaufsstudie",
                  href: quellenLinks.zanarini2010,
                },
                {
                  label:
                    "Zanarini et al. (2012) – 16-Jahres-Follow-up zu anhaltender Remission und Recovery",
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
            Untersucht wurden 290 Erwachsene, die zu Studienbeginn stationär
            behandelt wurden. Die Zahlen beschreiben jemals erreichte Zustände
            im Verlauf, nicht den Anteil dauerhaft beschwerdefreier Menschen am
            Studienende. Sie sind keine individuelle Prognose. Lebensqualität
            und ein selbstbestimmter Alltag zählen auch dann, wenn die strengen
            Recovery-Kriterien einer Studie nicht erfüllt sind.
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
            collapsible={false}
            title="Was Remission und Genesung bedeuten"
            id="remission"
          >
            <div className="mt-2 grid gap-8 sm:grid-cols-2">
              <article className="space-y-2">
                <h3 style={h4Style}>Symptomatische Remission</h3>
                <p style={bodyStyle}>
                  Die diagnostischen Kriterien der Borderline-Störung werden
                  über einen festgelegten Zeitraum nicht mehr erfüllt. Einzelne
                  Beschwerden können trotzdem bestehen bleiben. Das bedeutet
                  häufig weniger Impulsdurchbrüche, weniger Instabilität und
                  mehr inneren Spielraum.
                </p>
              </article>
              <article className="space-y-2">
                <h3 style={h4Style}>Umfassendere Genesung</h3>
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

          {/* ── ContentSection 2: individuelle Verläufe ── */}
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Veränderung verläuft unterschiedlich"
            id="fortschritt-paradox"
          >
            <EditorialProse>
              <p>
                Genesungswege unterscheiden sich. Ruhigere und schwierigere
                Phasen können vorkommen, müssen aber keinem festen Muster
                folgen. Ein schwieriger Abschnitt macht frühere Erfahrungen oder
                Fähigkeiten nicht wertlos.
              </p>
            </EditorialProse>
            <div className="mt-4">
              <EditorialPullQuote>
                Was als hilfreiche Veränderung erlebt wird, bestimmt die
                betroffene Person selbst. Angehörige müssen keinen Verlauf
                vorhersagen, bewerten oder beschleunigen.
              </EditorialPullQuote>
            </div>

            <figure
              className="mt-8 border-t pt-6"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <figcaption className="text-center uppercase" style={labelStyle}>
                Drei schematische Beispiele – ohne Rangfolge
              </figcaption>
              <svg
                viewBox="0 0 300 105"
                className="mt-3 h-24 w-full"
                data-layout="multiple-unranked-paths"
                aria-hidden="true"
              >
                <path
                  d="M 15,22 C 45,8 70,34 100,22 S 155,18 185,24 S 240,32 285,18"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 15,53 C 60,52 80,43 118,50 S 178,61 218,52 S 260,47 285,54"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.72"
                />
                <path
                  d="M 15,84 C 55,68 84,92 126,82 S 190,78 222,86 S 258,88 285,76"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.48"
                />
              </svg>
              <p
                className="mt-2 text-center"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--fg-tertiary)",
                }}
              >
                Keine Verlaufskurve ist eine Prognose oder ein Ziel. Die drei
                Linien stehen nur dafür, dass Veränderung verschiedene Formen
                und Zeitverläufe haben kann.
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
            collapsible={false}
            title="Realistische Hoffnung statt glatter Zuversicht"
            id="hoffnung"
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
                <h3 style={h4Style}>Weniger hilfreich</h3>
                <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                  <li>«Jetzt muss es doch endlich besser werden»</li>
                  <li>«Eine schwierigere Phase entwertet alles»</li>
                  <li>«Wenn genug Wille da ist, geht es schnell»</li>
                </ul>
              </div>
              <div>
                <h3 style={h4Style}>Tragfähiger</h3>
                <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                  <li>Besserung ist möglich und oft wahrscheinlich</li>
                  <li>
                    Schwierigere Phasen kommen vor und müssen nicht alles kippen
                  </li>
                  <li>Tempo und Zeitpunkt bleiben begrenzt steuerbar</li>
                </ul>
              </div>
            </div>
          </ContentSection>

          {/* ── ContentSection 4: beitragen ── */}
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Was Angehörige freiwillig anbieten können"
            id="beitragen"
          >
            <EditorialProse>
              <p>
                Diese Beispiele wenden die{" "}
                <Link
                  href="/unterstuetzen/uebersicht#rolle"
                  className="editorial-link"
                >
                  Einordnung der eigenen Rolle
                </Link>{" "}
                auf Genesung an. Die betroffene Person entscheidet mit; Sie
                dürfen Unterstützung anbieten, begrenzen oder ablehnen.
              </p>
            </EditorialProse>
            <div className="mt-2 grid gap-8 sm:grid-cols-2">
              {beitragenItems.map(item => (
                <article key={item.title} className="space-y-2">
                  <h3 style={h4Style}>{item.title}</h3>
                  <p style={bodyStyle}>{item.desc}</p>
                </article>
              ))}
            </div>
          </ContentSection>

          {/* ── ContentSection 5: mögliche Einflussbereiche ── */}
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Mögliche Einflussbereiche rund um Genesung"
            id="faktoren"
          >
            <EditorialProse>
              <p>
                Die folgenden Bereiche sind eine redaktionelle Orientierung ohne
                Reihenfolge, keine Formel und keine persönliche Prognose. Welche
                Bereiche wichtig sind und welche Unterstützung passt, bestimmt
                die betroffene Person selbst.
              </p>
            </EditorialProse>
            <ul className="mt-6 space-y-6">
              {einflussbereiche.map(item => (
                <li
                  key={item.title}
                  className="border-t pt-5"
                  style={{ borderColor: "var(--rule-color)" }}
                >
                  <h3 style={h4Style}>{item.title}</h3>
                  <p className="mt-2" style={bodyStyle}>
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
            <EvidenceNote
              variant="editorial"
              title="Fachlicher Bezug"
              definition="Die fünf Bereiche sind eine eigene redaktionelle Synthese der Fachstelle, kein validiertes Fünf-Faktoren-Modell und keine individuelle Prognose. Sie ordnen Aussagen aus Behandlungsleitlinien und einem leitliniengestützten Recovery-Rahmen für diese Website. Eine verantwortete fachliche Freigabe bleibt davon getrennt."
              sources={[
                {
                  label:
                    "American Psychiatric Association (2024) – Practice Guideline for BPD",
                  href: quellenLinks.apa2024,
                },
                {
                  label:
                    "NICE (2009, geprüft 2024) – Borderline personality disorder (CG78)",
                  href: quellenLinks.niceCg78,
                  type: "versorgung",
                },
                {
                  label:
                    "AWMF (2025) – S3-Leitlinie Psychosoziale Therapien, Kapitel 7.2",
                  href: quellenLinks.awmfPsychosozial2025,
                  type: "versorgung",
                },
              ]}
              reviewDate="05.10.2026"
            />
            <EditorialProse>
              <p className="mt-6">
                Bei vielen, nicht allen Menschen bestehen zusätzlich andere
                psychische oder körperliche Belastungen. Was davon relevant ist
                und welche Behandlung passt, braucht eine individuelle fachliche
                Abklärung. Mehr dazu auf der Seite{" "}
                <Link
                  href="/verstehen/begleiterkrankungen"
                  className="editorial-link"
                >
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
          <EditorialBody className="max-w-[36em]">
            Vertiefende Materialien zu Verlauf, Hoffnung, schwierigeren Phasen
            und der Rolle von Angehörigen. Wenn verfügbar, führt «Textversion
            lesen» zur Web-Version. Eine aktuelle A4-Druckversion wird nur dort
            angeboten, wo Text und Grafik übereinstimmen.
          </EditorialBody>
        </EditorialSection.Body>
      </EditorialSection>

      <section
        className="bg-[var(--bg-primary)] px-[var(--container-pad)] pb-20 md:px-[var(--container-pad-md)] md:pb-[120px]"
        aria-label="Materialien & Infografiken — Tile-Liste"
      >
        <div className="mx-auto max-w-page">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {genesungMaterialItems.map(item => {
              const textVersionHref = getHandoutTextVersionHrefBySource(
                item.pdf
              );
              const pdfHref = getHandoutOpenHref(item.pdf) ?? item.pdf;
              const visualPublished = isHandoutVisualPublished(item.id);
              return (
                <article
                  key={item.title}
                  className="space-y-3 border-t pt-6"
                  style={{ borderColor: "var(--rule-color)" }}
                >
                  {visualPublished ? (
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
                  ) : (
                    <HandoutVisualPlaceholder title={item.title} />
                  )}
                  <h3 style={h4Style}>{item.title}</h3>
                  <p style={bodyStyle}>{item.desc}</p>
                  {!visualPublished ? (
                    <p style={bodyStyle}>{HANDOUT_VISUAL_REFRESH_NOTE}</p>
                  ) : null}
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
                    {visualPublished ? (
                      <a
                        href={pdfHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="editorial-link"
                        aria-label={`PDF öffnen: ${item.title} (neuer Tab)`}
                      >
                        PDF öffnen
                      </a>
                    ) : null}
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
                title: "Unterstützung klären",
                description:
                  "Freiwillige Angebote, eigene Grenzen und passende externe Unterstützung unterscheiden.",
              },
              {
                href: "/unterstuetzen/therapie",
                title: "Therapie und Angehörigenrolle",
                description:
                  "Was Angehörige auf Wunsch anbieten können — ohne Behandlung zu steuern oder zu bewerten.",
              },
              {
                href: "/selbstfuersorge",
                title: "Selbstfürsorge",
                description:
                  "Eigene Gesundheit, Beziehungen und Interessen ernst nehmen — unabhängig davon, wie viel Sie unterstützen.",
              },
            ]}
          />
        </EditorialSection.Body>
      </EditorialSection>
      <LearningPathNav path="/genesung" />
    </Layout>
  );
}
