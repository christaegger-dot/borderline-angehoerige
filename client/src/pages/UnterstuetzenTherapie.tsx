import { useCallback } from "react";
import ContentSection from "@/components/ContentSection";
import {
  EditorialLayout,
  EditorialProse,
  EditorialPullQuote,
  EditorialSectionBlock,
} from "@/components/editorial";
import EvidenceNote from "@/components/EvidenceNote";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import UnterstuetzenSubNav from "@/components/UnterstuetzenSubNav";
import { TableOfContents } from "@/components/UXEnhancements";
import RollenOrbitVisualisierung from "@/components/visualizations/RollenOrbitVisualisierung";
import { quellenLinks } from "@/content/quellenLinks";
import {
  GELB,
  emailByIdStrict,
  kontaktByIdStrict,
  urlByIdStrict,
} from "@/data/kontakte";
import { Link } from "wouter";

const hype = kontaktByIdStrict("INFO_PUK_KJPP_HYPE");
const emailKjpp = emailByIdStrict("EMAIL_KJPP");
const pukDbt = kontaktByIdStrict("INFO_PUK_DBT");
const ipw = kontaktByIdStrict("INFO_IPW");
const emailHard = emailByIdStrict("EMAIL_HARD");
const clieniaUrl = urlByIdStrict("URL_CLIENIA");
const dbtDachUrl = urlByIdStrict("URL_DBT_DACH");

/** Öffnet eine ContentSection via Custom Event und scrollt dorthin. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

const zusammenarbeitSzenarien = [
  {
    titel: "Der Therapeut lädt mich nicht zur Sitzung ein",
    inhalt: [
      "Das ist oft korrekt – Vertrauen zwischen Therapeut und Patient braucht Schutz",
      "Was Sie trotzdem tun können: um einen einzelnen Angehörigentermin bitten (1–2× pro Jahr)",
      "Kurzer Brief: «Ich möchte verstehen, wie ich unterstützen kann, ohne zu schaden» – Therapeutin kann orientieren, ohne vertrauliche Inhalte zu teilen",
      "Nicht hilfreich: ständiges Drängen auf Informationen oder «bessere Einbindung»",
    ],
  },
  {
    titel: "Ich möchte über meine eigene Belastung sprechen",
    inhalt: [
      "Das ist berechtigt – Sie dürfen Orientierung für Ihre eigene Rolle suchen",
      "Bitten Sie um eine «Beratungssitzung nur für Angehörige» (ohne die betroffene Person)",
      "Ziel: Sie bekommen Orientierung – keine Mitbehandlung, keine Diagnose",
      "Gute Fragen: «Wie reagiere ich auf X? Wann ist etwas Sorge, wann überreagiere ich?»",
    ],
  },
  {
    titel: "Die Therapie scheint zu stagnieren",
    inhalt: [
      "Bedenken Sie: Sie sehen nicht, was in der Therapie passiert – Vertrauensaufbau dauert oft Monate",
      "Wenn Sie wirklich besorgt sind: konkrete Beobachtungen formulieren, nicht Urteile",
      "Formulierungsbeispiel: «Mir ist aufgefallen, dass sich die Selbstverletzungen nicht bessern. Ist das ein normaler Teil des Prozesses?»",
      "Therapeut wird erklären oder reagieren – Zweitmeinung ist nach einem Jahr ohne Fortschritt berechtigt",
    ],
  },
  {
    titel: "Ich vermute, dass mein Angehöriger nicht mitmacht",
    inhalt: [
      "Direkt ansprechen (in stabiler Phase): «Mir scheint, dass die Therapie für dich gerade schwierig ist. Was macht sie dir schwierig?»",
      "Sie können Motivation nicht erzwingen – aber Sie können Interesse zeigen",
      "Nur bei Sicherheitsgefährdung: eigenständig Kontakt mit Therapeutin aufnehmen",
      "Therapieambivalenz kann viele Gründe haben – Scham, Angst, Überforderung, schlechte Erfahrungen oder Misstrauen. Nehmen Sie das nicht vorschnell persönlich.",
    ],
  },
  {
    titel: "Was sollte ich dem Behandlungsteam berichten?",
    inhalt: [
      "Relevant: Sicherheitsrisiken (Suizidgedanken, Selbstverletzung, Gewalt), grösste Beziehungsherausforderungen, was funktioniert",
      "Nicht nötig: tägliche Detailberichte – das überfordert und schadet der Therapiebeziehung",
      "Kurze, konkrete Nachrichten (1–2× pro Monat reicht meist)",
      "Fragen statt Diagnosen: «Mir fällt auf, dass … – Ist das Teil des Prozesses?»",
    ],
  },
  {
    titel: "Nach einer Krise: Nachsorge koordinieren",
    inhalt: [
      "Fragen Sie aktiv: «Gibt es einen Nachsorgeplan für die nächsten 2 Wochen? Wie kann ich unterstützen?»",
      "Klare Absprache: Wer macht was? Therapeutin, Angehöriger, betroffene Person",
      "Notfallkontakt klären: «Wenn es wieder kritisch wird, rufe ich … an?»",
      "Kurze Zusammenfassung nach Klinikaufenthalt einfordern – Sie müssen nicht blind weiterarbeiten",
    ],
  },
] as const;

const therapieformen = [
  {
    name: "DBT · Dialektisch-Behaviorale Therapie",
    description:
      "Stark strukturiert, mit Fokus auf Emotionsregulation, Stresstoleranz, Achtsamkeit und zwischenmenschliche Skills.",
  },
  {
    name: "MBT · Mentalisierungsbasierte Therapie",
    description:
      "Konzentriert sich auf das Verstehen eigener und fremder innerer Zustände und auf Beziehungsgeschehen.",
  },
  {
    name: "Schematherapie",
    description:
      "Arbeitet mit frühen Prägungen, Beziehungsmustern und inneren Zuständen, die unter Stress reaktiv werden.",
  },
  {
    name: "TFP · Übertragungsfokussierte Psychotherapie",
    description:
      "Arbeitet mit dem Beziehungserleben in der therapeutischen Beziehung selbst: innere Konflikte werden im «Hier und Jetzt» zwischen Therapeut:in und Patient:in sichtbar und bearbeitbar. In der Schweizer Versorgungsrealität weniger verbreitet als DBT, aber als evidenzbasierte Therapie etabliert.",
  },
] as const;

const musterMail = `Betreff: Kurze Anfrage als Angehörige von [Vorname]

Guten Tag Frau/Herr [Name]

ich bin [Beziehung zu Vorname, z. B. Mutter, Vater oder Partnerin] von [Vorname].

Mir ist bewusst, dass Sie wegen der Schweigepflicht keine Informationen aus der Behandlung weitergeben dürfen. Ich möchte Sie deshalb nicht um Inhalte bitten.

Mich würde interessieren, ob es für Angehörige einmal die Möglichkeit für ein kurzes Gespräch gibt – nicht über die Therapie selbst, sondern über meine eigene Rolle und hilfreiche Unterstützungsmöglichkeiten.

Mit freundlichen Grüssen,
[Ihr Name]
[Optional: Telefonnummer für Rückruf]`;

export default function UnterstuetzenTherapie() {
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

  return (
    <Layout>
      <SEO
        title="Therapie unterstützen"
        description="Wie Angehörige Behandlung unterstützen können, ohne mitzubehandeln oder die Verantwortung zu übernehmen."
        path="/unterstuetzen/therapie"
      />
      <MedicalPageSchema
        title="Therapie unterstützen"
        description="Wie Angehörige Behandlung unterstützen können, ohne mitzubehandeln oder die Verantwortung zu übernehmen."
        path="/unterstuetzen/therapie"
      />
      <TableOfContents />

      <UnterstuetzenSubNav />

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
            Unterstützen — Therapie
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
            Therapie <em>begleiten</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Professionelle Therapie ist ein zentraler Baustein im
            Genesungsprozess. Angehörige können diesen Weg unterstützen, aber
            nicht für den anderen übernehmen. Genau diese Grenze macht
            Therapiebegleitung oft so anspruchsvoll.
          </p>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Vollständig ca. 10 Min · Auch abschnittweise lesbar.
          </p>
          <LastVerifiedBadge path="/unterstuetzen/therapie" className="mt-6" />
        </header>

        {/* ── Intro: Was diese Seite bei Therapie ordnet ── */}
        <EditorialSectionBlock
          label="Überblick"
          title="Was diese Seite bei Therapie ordnet"
        >
          <EditorialProse>
            <p>
              Diese Seite hilft Ihnen, Therapiebegleitung klarer von
              Mitbehandlung zu unterscheiden. Im Zentrum stehen Ihre Rolle, der
              Kontakt zum Behandlungssystem, realistische Erwartungen an
              Rückschläge und die Frage, wie Sie unterstützen können, ohne
              Verantwortung zu übernehmen, die nicht Ihnen gehört.
            </p>
            <p>
              Drei Akzente ziehen sich durch die Seite: zuerst die Rolle
              begrenzt sehen — Angehörige können Behandlung mittragen, aber
              nicht selbst zu Therapie oder Motivation werden; dann mit dem
              System arbeiten — klarer, dosierter Kontakt zum Behandlungsteam
              hilft oft mehr als ständiges Drängen auf Einblick; und
              schliesslich Rückschläge einordnen — Stagnation oder Unterbrüche
              bedeuten nicht automatisch, dass Therapie wirkungslos oder sinnlos
              ist.
            </p>
            <p>
              Sie können auch direkt zu{" "}
              <a
                href="#rolle"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "rolle")}
              >
                Ihrer Rolle
              </a>
              ,{" "}
              <a
                href="#zusammenarbeit"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "zusammenarbeit")}
              >
                Kontakt mit dem Behandlungsteam
              </a>
              ,{" "}
              <a
                href="#musterbrief"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "musterbrief")}
              >
                Musterbrief
              </a>{" "}
              oder{" "}
              <a
                href="#therapieangebote"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "therapieangebote")}
              >
                Therapieangeboten
              </a>{" "}
              springen.
            </p>
            <p>
              Diese Seite hilft bei Rolle, Behandlungssystem und Therapierahmen.
              Wenn es gerade um akute Eskalation oder Sicherheit geht, ist{" "}
              <Link href="/unterstuetzen/krise" className="editorial-link">
                Krisenbegleitung
              </Link>{" "}
              der passendere Einstieg.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        {/* ── Visualisierung (out-of-scope) ── */}
        <RollenOrbitVisualisierung />

        {/* ── ContentSection 1: rolle ── */}
        <ContentSection
          variant="editorial"
          title="Was Angehörige in der Therapie wirklich tun können"
          id="rolle"
          defaultOpen={true}
          preview="Hilfreiche Therapiebegleitung bedeutet meist: ermutigen, strukturieren, entlasten und realistisch bleiben, ohne selbst mitzubehandeln."
        >
          <EditorialProse>
            <p>
              Angehörige können ermutigen, Termine unterstützen, Veränderungen
              wahrnehmen und Rückschläge einordnen helfen. Sie können aber keine
              Therapie ersetzen, keine Motivation erzwingen und nicht
              stellvertretend regulieren, was in Behandlung bearbeitet werden
              muss.
            </p>
          </EditorialProse>
          <div className="mt-4">
            <EditorialPullQuote>
              Eine hilfreiche innere Frage lautet oft nicht: Wie bringe ich die
              Therapie zum Funktionieren? Sondern: Wie kann ich den Rahmen
              mittragen, ohne selbst zur Behandlung zu werden?
            </EditorialPullQuote>
          </div>
        </ContentSection>

        {/* ── ContentSection 2: zusammenarbeit ── */}
        <ContentSection
          variant="editorial"
          title="Mit dem Behandlungssystem zusammenarbeiten"
          id="zusammenarbeit"
          preview="Sie sind nicht Teil der Therapie – und das ist oft richtig so. Aber es gibt konstruktive Wege, mit dem klinischen Team in Kontakt zu treten."
        >
          <EditorialProse>
            <p>
              Dass Sie nicht in jede Sitzung eingeladen werden, ist meistens{" "}
              <strong>therapeutisch beabsichtigt</strong> – nicht Ablehnung. Die
              Therapie braucht einen geschützten Raum. Trotzdem gibt es
              Situationen, in denen Kontakt sinnvoll und berechtigt ist.
            </p>
          </EditorialProse>
          <div className="mt-8 space-y-10">
            {zusammenarbeitSzenarien.map(szenario => (
              <article key={szenario.titel} className="space-y-3">
                <h4 style={h4Style}>{szenario.titel}</h4>
                <ul className="ml-5 list-disc space-y-1.5" style={bodyStyle}>
                  {szenario.inhalt.map(p => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <aside
            className="mt-10 border-l-4 pl-5"
            style={{ borderColor: "#d97706" }}
          >
            <h4 style={{ ...h4Style, color: "#92400e" }}>
              Warnsignale für eine problematische Therapiesituation
            </h4>
            <ul className="mt-3 ml-5 list-disc space-y-1.5" style={bodyStyle}>
              <li>
                Therapeut kritisiert Angehörige offen vor Patient («Sie sind das
                Problem»)
              </li>
              <li>
                Kein Kontakt möglich, auch nicht bei konkreten
                Sicherheitsbedenken
              </li>
              <li>
                Patient wird von Familie isoliert («Vertrau nur mir, nicht
                deinem Partner»)
              </li>
              <li>
                Jahre Therapie ohne jede erkennbare Veränderung oder Reflexion
                darüber
              </li>
            </ul>
            <p className="mt-3" style={bodyStyle}>
              <strong style={{ color: "var(--fg-primary)" }}>Dann:</strong>{" "}
              Zweitmeinung einholen oder Therapeutenwechsel ansprechen – das ist
              legitim und manchmal notwendig.
            </p>
          </aside>
        </ContentSection>

        {/* ── ContentSection 3: therapieformen ── */}
        <ContentSection
          variant="editorial"
          title="Therapieformen knapp eingeordnet"
          id="therapieformen"
          preview="DBT, MBT, Schematherapie und TFP sind gut erforschte Behandlungsansätze. Für Angehörige ist oft weniger das Label als die Passung im Alltag entscheidend."
        >
          <div className="mt-2 space-y-6">
            {therapieformen.map(item => (
              <article key={item.name} className="space-y-2">
                <h4 style={h4Style}>{item.name}</h4>
                <p style={bodyStyle}>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <EditorialPullQuote>
              Für Angehörige ist meist wichtiger als das perfekte Therapielabel,
              ob Behandlung tragfähig beginnt, ob Krisen professionell
              eingebettet werden und ob der Prozess über Zeit gehalten werden
              kann.
            </EditorialPullQuote>
          </div>
          <EvidenceNote
            variant="editorial"
            title="Quellen zu Therapieverfahren und Angehörigenprogrammen"
            definition="DBT, MBT und andere BPS-spezifische Psychotherapien sind die am besten untersuchten Verfahren. Für Angehörige sind psychoedukative Programme wie Family Connections nicht nur entlastend, sondern ebenfalls wissenschaftlich beschrieben."
            sources={[
              {
                label:
                  "Storebø et al. (2020) – Cochrane-Review zu psychologischen Therapien bei BPS",
                href: quellenLinks.storebo2020,
                type: "wissenschaft",
              },
              {
                label:
                  "Bateman & Fonagy (2009) – RCT zu mentalisierungsbasierter Therapie",
                href: quellenLinks.batemanFonagy2009,
                type: "wissenschaft",
              },
              {
                label: "Linehan (2015) – DBT Skills Training Manual",
                href: quellenLinks.linehan2015,
                type: "wissenschaft",
              },
              {
                label: "Hoffman et al. (2005) – Family Connections",
                href: quellenLinks.hoffman2005,
                type: "wissenschaft",
              },
              {
                label:
                  "Gunderson, Berkowitz & Ruiz-Sancho (1997) – psychoedukative Familienarbeit",
                href: quellenLinks.gunderson1997,
                type: "wissenschaft",
              },
            ]}
          />
        </ContentSection>

        {/* ── ContentSection 4: unterstuetzen ── */}
        <ContentSection
          variant="editorial"
          title="Wie Sie den Therapieprozess unterstützen können"
          id="unterstuetzen"
          preview="Hilfreich ist meist sanfte Unterstützung ohne Druck: Orientierung geben, Veränderungen wahrnehmen, eigene Erwartungen regulieren."
        >
          <EditorialProse>
            <p>Hilfreich sind oft kleine, konkrete Schritte:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>
                Therapie als Möglichkeit ansprechen, nicht als Drohkulisse
              </li>
              <li>bei Organisation helfen, wenn das erwünscht ist</li>
              <li>Skills und neue Schritte bemerken, ohne zu kontrollieren</li>
              <li>Fortschritte konkret benennen statt pauschal zu loben</li>
              <li>Rückschläge einordnen, ohne sie zu dramatisieren</li>
              <li>
                eigene Unterstützung unabhängig von der Therapiebereitschaft
                suchen
              </li>
            </ul>
            <p>
              Wenn Sprache, Scham oder Migrationserfahrungen Gespräche
              erschweren, ist das kein Ausschlusskriterium für Behandlung.
              Hilfreich ist oft, zunächst über das Beobachtbare zu sprechen:
              Schlaf, Alarmzustand, Rückzug, Selbstverletzung, Wut oder
              Sicherheit. Fragen Sie in Praxis, Klinik oder Beratung aktiv nach
              professioneller Dolmetschung, wenn Deutsch nicht für alle sicher
              genug ist. Kinder sollten Diagnose-, Krisen- oder Gewaltgespräche
              nicht dolmetschen müssen.
            </p>
            <p>
              Und: Sie müssen nicht warten, bis die betroffene Person sofort
              mitzieht. Psychoedukative Angehörigenprogramme wie Family
              Connections sind nicht nur entlastende Zusatzangebote, sondern
              fachlich beschrieben. Mehr dazu finden Sie auf der{" "}
              <Link href="/quellen" className="editorial-link">
                Quellen-Seite
              </Link>{" "}
              und unter{" "}
              <Link href="/selbsthilfegruppen" className="editorial-link">
                Selbsthilfegruppen & Netzwerke
              </Link>
              .
            </p>
          </EditorialProse>
        </ContentSection>

        {/* ── ContentSection 5: musterbrief ── */}
        <ContentSection
          variant="editorial"
          title="Erstkontakt mit dem Therapeuten – Musterbrief"
          id="musterbrief"
          preview="Eine kurze, klare E-Mail kann den Einstieg erleichtern. Hier ein Muster, das Sie anpassen können."
        >
          <EditorialProse>
            <p>
              Wenn Sie als nahestehende Person Kontakt mit dem Therapeuten
              aufnehmen möchten, kann eine kurze schriftliche Nachricht helfen.
              Das Muster unten dient als Ausgangspunkt, wenn Sie Ihre
              Perspektive einbringen oder nach einem Angehörigengespräch fragen
              möchten.
            </p>
          </EditorialProse>
          <figure
            className="mt-8 border-t pt-6"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <figcaption className="uppercase" style={labelStyle}>
              Muster-E-Mail
            </figcaption>
            <pre
              className="mt-3 whitespace-pre-line font-mono"
              style={{
                fontSize: "var(--text-sm)",
                lineHeight: "var(--lh-relaxed)",
                color: "var(--fg-primary)",
              }}
            >
              {musterMail}
            </pre>
          </figure>
          <p className="mt-6" style={bodyStyle}>
            <strong style={{ color: "var(--fg-primary)" }}>Wichtig:</strong> Der
            Therapeut ist an die Schweigepflicht gebunden und darf ohne
            Einwilligung Ihres Angehörigen keine Inhalte der Behandlung
            besprechen. Das ist kein Ablehnen – sondern professionelles Handeln.
          </p>
        </ContentSection>

        {/* ── ContentSection 6: rueckschlaege ── */}
        <ContentSection
          variant="editorial"
          title="Rückschläge und Unterbrüche"
          id="rueckschlaege"
          preview="Therapie verläuft selten gradlinig. Abbrüche, Krisen oder Phasen von Widerstand bedeuten nicht automatisch, dass alles umsonst war."
        >
          <EditorialProse>
            <p>
              Viele Angehörige erleben Therapiebegleitung als Achterbahn:
              Hoffnung, erster Fortschritt, erneute Krise, Rückzug, vielleicht
              ein Therapieabbruch und später ein neuer Anlauf. Solche
              Unterbrüche sind belastend, aber nicht ungewöhnlich.
            </p>
          </EditorialProse>
          <div className="mt-4">
            <EditorialPullQuote>
              Hilfreich ist dann meist weder Druck noch Resignation, sondern ein
              nüchterner Blick: Was hat geholfen? Wo wurde es zu viel? Was wäre
              der nächste tragfähige Schritt?
            </EditorialPullQuote>
          </div>
        </ContentSection>

        {/* ── ContentSection 7: nicht-ihre-rolle ── */}
        <ContentSection
          variant="editorial"
          title="Was Ihre Rolle ausdrücklich nicht ist"
          id="nicht-ihre-rolle"
          preview="Gerade engagierte Angehörige geraten leicht in eine Nebenrolle als Coach, Therapeut oder Krisenmanager. Das ist verständlich, aber selten tragfähig."
        >
          <EditorialProse>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                Sie müssen nicht Therapiesprache permanent in den Alltag
                übersetzen.
              </li>
              <li>
                Sie müssen nicht jedes Verhalten analysieren oder mit
                Fachbegriffen einordnen.
              </li>
              <li>
                Sie sind nicht dafür zuständig, Motivation dauerhaft
                aufrechtzuerhalten.
              </li>
              <li>
                Sie müssen Behandlungsfortschritt nicht kontrollieren oder
                überwachen.
              </li>
            </ul>
          </EditorialProse>
        </ContentSection>

        {/* ── ContentSection 8: therapieangebote ── */}
        <ContentSection
          variant="editorial"
          title="Therapieangebote im Kanton Zürich"
          id="therapieangebote"
          preview="Ausgewählte spezialisierte Angebote und Suchwege für Jugendliche, Erwachsene und weiterführende Behandlung."
        >
          <EditorialProse>
            <p>
              Therapie ist in drei Settings möglich: <em>ambulant</em> mit
              regelmässigen Terminen und Leben zu Hause, <em>teilstationär</em>{" "}
              in einer Tagesklinik mit Übernachtung zu Hause oder{" "}
              <em>stationär</em> mit Aufenthalt in der Klinik.
            </p>
          </EditorialProse>

          <article className="mt-10 space-y-2">
            <h4 style={h4Style}>HYPE Züri</h4>
            <p style={bodyStyle}>
              Frühinterventionsangebot für Jugendliche ab 13 Jahren mit
              Verdacht, Risiko oder bereits diagnostizierter Borderline-Störung.
            </p>
            <p
              className="flex flex-wrap gap-x-6 gap-y-1"
              style={{ fontSize: "var(--text-sm)" }}
            >
              <a href={`tel:${hype.tel}`} className="editorial-link">
                Telefon {hype.nummer}
              </a>
              <a
                href={`mailto:${emailKjpp.adresse}`}
                className="editorial-link"
              >
                {emailKjpp.adresse}
              </a>
            </p>
          </article>

          <article className="mt-8 space-y-2">
            <h4 style={h4Style}>PUK Zürich – Erwachsene</h4>
            <p style={bodyStyle}>
              Spezialisierte DBT-orientierte Behandlungsangebote für Erwachsene.
            </p>
            <p
              className="flex flex-wrap gap-x-6 gap-y-1"
              style={{ fontSize: "var(--text-sm)" }}
            >
              <a href={`tel:${pukDbt.tel}`} className="editorial-link">
                Telefon {pukDbt.nummer}
              </a>
              <a
                href={`mailto:${emailHard.adresse}`}
                className="editorial-link"
              >
                {emailHard.adresse}
              </a>
            </p>
          </article>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <article className="space-y-2">
              <h4 style={h4Style}>IPW Winterthur</h4>
              <p style={bodyStyle}>
                Erwachsenenpsychiatrisches Angebot in Winterthur mit regionaler
                Anbindung.
              </p>
              <p style={{ fontSize: "var(--text-sm)" }}>
                <a href={`tel:${ipw.tel}`} className="editorial-link">
                  Telefon {ipw.nummer}
                </a>
              </p>
            </article>
            <article className="space-y-2">
              <h4 style={h4Style}>Clienia Schlössli</h4>
              <p style={bodyStyle}>
                Weiterführendes stationäres Emotionsregulationsprogramm.
              </p>
              <p style={{ fontSize: "var(--text-sm)" }}>
                <a
                  href={clieniaUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                >
                  Website besuchen
                </a>
              </p>
            </article>
            <article className="space-y-2">
              <h4 style={h4Style}>DBT-Therapeutensuche</h4>
              <p style={bodyStyle}>
                Suchweg für zertifizierte DBT-Therapeutinnen und -Therapeuten.
              </p>
              <p style={{ fontSize: "var(--text-sm)" }}>
                <a
                  href={dbtDachUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                >
                  Therapeutensuche
                </a>
              </p>
            </article>
          </div>

          <article
            className="mt-10 border-t pt-6"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <h4 style={h4Style}>Notfall-Nummern PUK Zürich (24/7)</h4>
            <ul
              className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-3"
              style={bodyStyle}
            >
              {GELB.filter(k => k.id !== "GELB_KIZ").map(k => (
                <li key={k.id}>
                  <p style={labelStyle}>{k.fuerWen ?? k.label}</p>
                  <a
                    href={`tel:${k.tel}`}
                    className="editorial-link"
                    style={{ fontSize: "var(--text-md)", fontWeight: 500 }}
                  >
                    {k.nummer}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </ContentSection>

        {/* ── Materialien-Block ── */}
        <EditorialSectionBlock
          label="Materialien"
          title="Materialien zum Thema"
        >
          <EditorialProse>
            <p>
              Infografiken und Handouts zur Therapiebegleitung finden Sie
              gesammelt auf der{" "}
              <Link href="/materialien" className="editorial-link">
                Materialien-Seite
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        {/* ── Schluss-Sektion: Übergang ── */}
        <EditorialSectionBlock label="Weiter" rule>
          <EditorialProse>
            <p>
              Wenn aus Therapierahmen akute Eskalation wird, geht es um{" "}
              <Link href="/unterstuetzen/krise" className="editorial-link">
                weiter: In der Krise unterstützen
              </Link>
              . Zurück geht es zu{" "}
              <Link href="/unterstuetzen/alltag" className="editorial-link">
                Im Alltag unterstützen
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        <RelatedLinksEditorial
          links={[
            {
              href: "/unterstuetzen/krise",
              title: "Krisen begleiten",
              description:
                "Ampel-System, Deeskalation, Was sagen / Was vermeiden — wenn Therapierahmen kippt.",
            },
            {
              href: "/genesung",
              title: "Genesung",
              description:
                "Realistische Perspektive auf Behandlungsverläufe, Remission und Recovery.",
            },
            {
              href: "/fachstelle",
              title: "Fachstelle",
              description:
                "Beratung für Angehörige — auch unabhängig vom therapeutischen Rahmen.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
