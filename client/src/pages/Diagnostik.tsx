/**
 * Diagnostik — Cluster 3 Sitzung 1.
 *
 * Eigene Seite zum Diagnostik-Prozess bei Borderline-Persönlichkeitsstörung,
 * adressiert die im Audit (P1-7) identifizierte Lücke «wer stellt wie eine
 * Diagnose». Architektur-Wahl: Option A (eigene Seite) gemäss Christa-
 * Decision aus Phase 0. Editorial-Pattern analog zu /genesung.
 *
 * Sicherheits-Hinweis: Kein direkter Notfall-Inhalt. Cross-Link auf
 * /soforthilfe für akute Gefahr (Suizidalität, Selbstverletzung).
 *
 * Anbieter-Box-PUK-Logik (korrigiert nach Christas Review): Die PUK hat
 * keine spezielle Nicht-Notfall-Diagnostik-Nummer für 18-65. Die Anmeldung
 * läuft über PUK Zentrale (058 384 21 11) oder das elektronische
 * Anmeldeformular auf pukzh.ch. Die 24/7-Notfall-Linien (Erwachsene
 * 20 00, ab 65 46 82, Kinder 66 66) gehören NICHT in die Diagnostik-Box —
 * sie sind für akute Krisen reserviert. Jugendliche-Diagnostik läuft über
 * das HYPE-Programm (058 384 66 00).
 */
import { useCallback } from "react";
import ContentSection from "@/components/ContentSection";
import {
  EditorialLayout,
  EditorialProse,
  EditorialPullQuote,
  EditorialSection,
} from "@/components/editorial";
import EvidenceNote from "@/components/EvidenceNote";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO from "@/components/SEO";
import { TableOfContents } from "@/components/UXEnhancements";
import {
  emailByIdStrict,
  kontaktByIdStrict,
  urlByIdStrict,
} from "@/data/kontakte";
import { Link } from "wouter";

// Single-source-of-truth für Kontaktdaten (keine Hardcoding im Markup).
const fachstelleTel = kontaktByIdStrict("INFO_FACHSTELLE");
const fachstelleEmail = emailByIdStrict("EMAIL_ANGEHOERIGEN");
// PUK-Diagnostik-Anmeldung: Zentrale (058 384 21 11), nicht 24/7-Notfall.
const pukZentrale = kontaktByIdStrict("INFO_PUK_ZENTRALE");
const hypeZueri = kontaktByIdStrict("INFO_PUK_KJPP_HYPE");
const ipw = kontaktByIdStrict("INFO_IPW");
const sanatorium = kontaktByIdStrict("INFO_SANATORIUM_KILCHBERG");
const pukUrl = urlByIdStrict("URL_PUK");
const ipwUrl = urlByIdStrict("URL_IPW");
const sanatoriumUrl = urlByIdStrict("URL_SANATORIUM_KILCHBERG");
const clieniaUrl = urlByIdStrict("URL_CLIENIA");
const pukKjpUrl = urlByIdStrict("URL_PUK_KJP_PERSOENLICHKEITSSTOERUNGEN");

/** Öffnet eine ContentSection via Custom Event und scrollt dorthin. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

const ablaufSchritte = [
  {
    title: "Anamnese",
    desc: "Lebensgeschichte, aktuelle Beschwerden und Beziehungsmuster werden im Gespräch erhoben.",
  },
  {
    title: "Strukturierte Interviews",
    desc: "Verfahren wie SCID-5-PD oder IPDE prüfen die Kriterien systematisch — keine Selbstauskunft, sondern Fachgespräch.",
  },
  {
    title: "Klassifikation",
    desc: "Zuordnung nach ICD-11 («Borderline-Muster», Code 6D11.5) oder DSM-5-TR (mehrere Merkmale aus einer Liste, in der Regel über längere Zeit erfüllt).",
  },
  {
    title: "Verlauf statt Momentaufnahme",
    desc: "Die Diagnose entsteht meist nicht in einem Termin, sondern über mehrere Sitzungen, oft über Wochen oder Monate.",
  },
  {
    title: "Mitteilung im Gespräch",
    desc: "Wenn die Diagnose feststeht, wird sie in einem Gespräch mitgeteilt — mit Erklärung, was sie bedeutet und welche Behandlungs-Optionen bestehen.",
  },
] as const;

const ablehnungWasNicht = [
  "drängen oder mit der Diagnose argumentieren",
  "in Konflikten die Diagnose als Etikett einsetzen",
  "die Person zu beweisen versuchen, dass sie «Borderline hat»",
  "eigene Sicherheit oder Geduld auf später verschieben",
] as const;

const ablehnungWasMoeglich = [
  "die Diagnose als persönliche Orientierungshilfe nutzen, ohne sie der Person aufzuzwingen",
  "Beratung der Fachstelle Angehörigenarbeit in Anspruch nehmen — auch ohne Diagnose-Stellung",
  "geduldig bleiben; Akzeptanz braucht oft Zeit",
  "konkrete Verhaltensweisen ansprechen statt das Label",
] as const;

const vermutungSchritte = [
  {
    title: "Mit der Hausärzt:in sprechen",
    desc: "Erste Anlaufstelle für eine Einschätzung und Überweisung. Hausärzt:innen stellen die Diagnose meist nicht selbst, können aber an Fachpersonen mit Borderline-Erfahrung überweisen.",
  },
  {
    title: "Fachstelle Angehörigenarbeit kontaktieren",
    desc: "Beratung für Angehörige läuft unabhängig davon, ob die erkrankte Person schon in Behandlung ist — eine Diagnose-Vermutung reicht aus, um Unterstützung zu bekommen.",
  },
  {
    title: "Spezialisierte Anlaufstelle anfragen",
    desc: "Bei klarem Verdacht kann eine direkte Anfrage bei einer der Anbieter-Stellen (siehe unten) sinnvoll sein.",
  },
] as const;

export default function Diagnostik() {
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

  return (
    <Layout>
      <SEO
        title="Diagnostik"
        description="Wie eine Borderline-Diagnose entsteht: wer sie stellen darf, wie sie abläuft, was sie für Angehörige bedeutet — und wo im Kanton Zürich eine Abklärung möglich ist."
        path="/diagnostik"
      />
      <TableOfContents />

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
            Diagnostik
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
            Wie eine <em>Borderline-Diagnose</em> entsteht
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Was eine Diagnose bedeutet, wer sie stellen darf, wie sie abläuft —
            und was sie für Sie als Angehörige verändert. Nicht als Anleitung,
            jemanden zur Diagnose zu drängen, sondern als Orientierung in einer
            Phase, in der vieles unklar ist.
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
        </header>

        {/* ── Intro / Überblick ── */}
        <EditorialSection
          label="Überblick"
          title="Was Sie auf dieser Seite finden"
        >
          <EditorialProse>
            <p>
              Diese Seite gliedert den Diagnostik-Prozess für Angehörige: wer
              befugt ist, eine Borderline-Persönlichkeitsstörung zu
              diagnostizieren, wie eine Abklärung typischerweise abläuft, was
              die Diagnose für Sie verändert — und was zu tun ist, wenn die
              Person sie ablehnt oder noch keine gestellt wurde.
            </p>
            <p>
              Sie können auch direkt zu{" "}
              <a
                href="#wer"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "wer")}
              >
                «Wer stellt eine Diagnose»
              </a>
              ,{" "}
              <a
                href="#wie"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "wie")}
              >
                «Wie läuft eine Diagnostik ab»
              </a>
              ,{" "}
              <a
                href="#bedeutung"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "bedeutung")}
              >
                «Was bedeutet die Diagnose für Sie»
              </a>{" "}
              oder{" "}
              <a
                href="#anbieter"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "anbieter")}
              >
                «Wo eine Diagnose gestellt werden kann»
              </a>{" "}
              springen.
            </p>
          </EditorialProse>
        </EditorialSection>

        {/* ── 1: Wer stellt eine Diagnose ── */}
        <ContentSection
          variant="editorial"
          title="Wer stellt eine Borderline-Diagnose?"
          id="wer"
          defaultOpen={true}
          preview="Eine Borderline-Diagnose darf nicht jede Fachperson stellen. Hausärzt:innen können den Verdacht äussern und überweisen — die Diagnose selbst kommt von Spezialist:innen."
        >
          <EditorialProse>
            <p>
              Diagnostisch befugt sind in der Schweiz vor allem zwei
              Berufsgruppen:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Psychiater:innen</strong> mit FMH-Anerkennung
                Psychiatrie und Psychotherapie.
              </li>
              <li>
                <strong>Psychologische Psychotherapeut:innen</strong> mit
                Berufsausübungsbewilligung Psychotherapie und entsprechender
                klinischer Qualifikation.
              </li>
            </ul>
            <p>
              <strong>Hausärzt:innen</strong> oder andere Fachärzt:innen können
              einen Verdacht äussern und überweisen. Die formelle Diagnose
              stellen sie in der Regel nicht selbst — die Abklärung gehört zu
              den genannten Spezialist:innen.
            </p>
            <p>
              In der Praxis findet die Abklärung ambulant in Praxen oder
              Polikliniken statt, in einigen Fällen an Spezialambulanzen oder im
              stationären Rahmen. Eine Übersicht von Anlaufstellen im Kanton
              Zürich findet sich weiter unten unter{" "}
              <a
                href="#anbieter"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "anbieter")}
              >
                «Wo eine Diagnose gestellt werden kann»
              </a>
              .
            </p>
          </EditorialProse>
        </ContentSection>

        {/* ── 2: Wie läuft Diagnostik ab ── */}
        <ContentSection
          variant="editorial"
          title="Wie läuft eine Diagnostik ab?"
          id="wie"
          preview="Eine Borderline-Abklärung ist mehr als ein Termin. Anamnese, strukturierte Interviews und Verlaufsbeobachtung greifen ineinander."
        >
          <EditorialProse>
            <p>
              Eine Borderline-Diagnostik ist kein einzelner Test, sondern ein
              gestufter Prozess. Typische Bausteine:
            </p>
          </EditorialProse>
          <ol className="mt-6 space-y-5">
            {ablaufSchritte.map((item, index) => (
              <li key={item.title} className="flex items-start gap-4">
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
                <div>
                  <h4 style={h4Style}>{item.title}</h4>
                  <p className="mt-1" style={bodyStyle}>
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <EditorialPullQuote>
              Die Diagnose ist eine fachliche Beurteilung über Zeit, nicht ein
              Stempel aus einem einzelnen Gespräch.
            </EditorialPullQuote>
          </div>
          <EvidenceNote
            variant="editorial"
            title="Klassifikations- und Verfahrens-Quellen"
            sources={[
              {
                label: "WHO ICD-11: Borderline pattern specifier (6D11.5)",
                href: "https://icd.who.int/browse/2025-01/mms/en#2006821354",
                type: "wissenschaft",
              },
              {
                label:
                  "American Psychiatric Association (2022). DSM-5-TR — Diagnostic and Statistical Manual of Mental Disorders, Text Revision.",
                type: "wissenschaft",
              },
              {
                label:
                  "First, Williams, Benjamin & Spitzer (2017). SCID-5-PD: Structured Clinical Interview for DSM-5 Personality Disorders. APA Publishing.",
                type: "wissenschaft",
              },
              {
                label:
                  "Loranger (1999). IPDE — International Personality Disorder Examination. WHO / Cambridge University Press.",
                type: "wissenschaft",
              },
            ]}
          />
        </ContentSection>

        {/* ── 3: Differenzialdiagnostik (kurz) ── */}
        <ContentSection
          variant="editorial"
          title="Differenzialdiagnostik — kurz"
          id="differenzial"
          preview="Bei einer Borderline-Abklärung werden auch andere Erkrankungen geprüft, die ähnliche Muster zeigen können."
        >
          <EditorialProse>
            <p>
              Bei der Diagnose werden auch andere Erkrankungen geprüft, die
              ähnliche Muster zeigen können — etwa bipolare Störungen,
              posttraumatische Belastungsstörungen, ADHS oder dissoziative
              Störungen. Das ist normaler Teil sorgfältiger Diagnostik und keine
              Verzögerungstaktik.
            </p>
            <p>
              Differenzialdiagnostik (was IST Borderline und was nicht) und
              Komorbidität (was MIT Borderline parallel auftreten kann) sind
              unterschiedliche Fragen — manche Erkrankungen wie PTBS werden im
              Diagnostik-Prozess geprüft und können auch parallel bestehen. Mehr
              dazu auf der Seite{" "}
              <Link href="/begleiterkrankungen" className="editorial-link">
                Begleiterkrankungen
              </Link>
              .
            </p>
          </EditorialProse>
        </ContentSection>

        {/* ── 4: Bedeutung für Angehörige ── */}
        <ContentSection
          variant="editorial"
          title="Was bedeutet die Diagnose für Sie als Angehörige?"
          id="bedeutung"
          preview="Eine Diagnose ist kein Etikett, sondern eine Eintrittskarte zu evidenzbasierter Behandlung. Sie verändert oft das Verständnis — und sie hat Grenzen."
        >
          <EditorialProse>
            <p>
              Eine gestellte Diagnose ist <strong>kein Etikett</strong>, sondern
              eine Behandlungs-Eintrittskarte. Sie öffnet Zugang zu
              evidenzbasierten Therapien wie DBT, MBT, Schematherapie oder TFP —
              und sie verändert oft, wie Verhalten gelesen werden kann: nicht
              als Charakter, sondern als Erkrankung mit Verlaufsmuster.
            </p>
            <p>
              Wichtig: Eine Diagnose ist nicht dauerhaft fixiert. Recovery ist
              möglich — siehe{" "}
              <Link href="/genesung" className="editorial-link">
                Genesung
              </Link>
              .
            </p>
            <p>
              <strong>Was eine Diagnose nicht leistet:</strong> Sie hilft nicht
              automatisch der Beziehung. Manche Angehörige erwarten, dass die
              Diagnose «alles erklärt». Diese Erwartung ist verständlich, aber
              hoch — Beziehungs-Klärung bleibt eigene Arbeit, auch nachdem die
              Diagnose feststeht.
            </p>
          </EditorialProse>
        </ContentSection>

        {/* ── 5: Diagnose-Ablehnung ── */}
        <ContentSection
          variant="editorial"
          title="Was, wenn die erkrankte Person die Diagnose ablehnt?"
          id="ablehnung"
          preview="Diagnose-Ablehnung ist eine häufige Reaktion und kein Versagen. Was Angehörige nicht tun sollten — und was möglich ist."
        >
          <EditorialProse>
            <p>
              Wenn die erkrankte Person die Diagnose ablehnt, ist das eine
              häufige Reaktion und kein Versagen. Mögliche Gründe sind Stigma,
              Scham, Angst vor Etikettierung oder Misstrauen gegenüber
              Psychiatrie.
            </p>
          </EditorialProse>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <h4 style={h4Style}>Was nicht hilft</h4>
              <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                {ablehnungWasNicht.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={h4Style}>Was möglich ist</h4>
              <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                {ablehnungWasMoeglich.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <EditorialProse>
            <p className="mt-6">
              <strong>Klare Grenze:</strong> Bei akuter Gefahr — Suizidalität,
              schwerer Selbstverletzung oder Fremdgefährdung — ist die
              Diagnose-Frage nachrangig. Dann zählt die{" "}
              <Link href="/soforthilfe" className="editorial-link">
                Soforthilfe
              </Link>
              .
            </p>
          </EditorialProse>
        </ContentSection>

        {/* ── 6: Bin ich auch betroffen? ── */}
        <ContentSection
          variant="editorial"
          title="Bin ich auch betroffen?"
          id="selbstreflexion"
          preview="Manche Angehörige fragen sich nach langer Belastung, ob sie selbst eine psychische Erkrankung entwickelt haben. Diese Frage ist legitim."
        >
          <EditorialProse>
            <p>
              Nach langer Belastung fragen sich manche Angehörige, ob sie selbst
              eine psychische Erkrankung entwickelt haben — etwa eine
              Erschöpfungsdepression, Angststörungen oder Schlafstörungen. Die
              Frage ist legitim und kein Zeichen von Schwäche.
            </p>
            <p>
              Diese Seite ist <strong>kein Selbstdiagnose-Werkzeug</strong>.
              Wenn Sie merken, dass Sie selbst nicht mehr gut zurechtkommen, ist
              eigene Beratung oder Therapie eine legitime und oft hilfreiche
              Option. Erste Anlaufpunkte:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <Link href="/selbstfuersorge" className="editorial-link">
                  Selbstfürsorge
                </Link>{" "}
                — Warnsignale ernst nehmen, Sofort-Übungen, eigene
                Belastungsgrenzen.
              </li>
              <li>
                <Link href="/beratung" className="editorial-link">
                  Beratung &amp; Netzwerke
                </Link>{" "}
                — Fachstelle Angehörigenarbeit, Stand By You, VASK Zürich.
              </li>
              <li>
                Eigene Hausärzt:in oder Psychotherapeut:in — keine Pflicht, aber
                eine reale Option.
              </li>
            </ul>
          </EditorialProse>
        </ContentSection>

        {/* ── 7: Vermutung ohne Diagnose ── */}
        <ContentSection
          variant="editorial"
          title="Was, wenn die Diagnose noch nicht gestellt ist, aber wir vermuten es?"
          id="vermutung"
          preview="Wenn keine Diagnose vorliegt, aber Sie Borderline vermuten: drei mögliche erste Schritte."
        >
          <EditorialProse>
            <p>
              Eine Vermutung ist ein berechtigter Ausgangspunkt, aber kein
              Diagnose-Werkzeug. Der{" "}
              <Link href="/selbsttest" className="editorial-link">
                Selbsttest
              </Link>{" "}
              auf dieser Site ist eine Orientierungshilfe für Angehörige — er
              sagt etwas darüber aus, wo Sie selbst stehen, nicht ob die andere
              Person Borderline hat.
            </p>
          </EditorialProse>
          <div className="mt-6 space-y-6">
            {vermutungSchritte.map(item => (
              <article key={item.title} className="space-y-2">
                <h4 style={h4Style}>{item.title}</h4>
                <p style={bodyStyle}>{item.desc}</p>
              </article>
            ))}
          </div>
        </ContentSection>

        {/* ── 8: Diagnostik bei Jugendlichen ── */}
        <ContentSection
          variant="editorial"
          title="Diagnostik bei Jugendlichen"
          id="jugendliche"
          preview="Bei Jugendlichen gelten besondere Vorsichtigkeiten. Spezialisierte Frühinterventions-Angebote arbeiten ab 13 Jahren."
        >
          <EditorialProse>
            <p>
              Bei Jugendlichen gelten besondere Vorsichtigkeiten in der
              Diagnose-Stellung — viele Verhaltensmuster, die bei Erwachsenen
              auf Borderline hinweisen, sind in der Adoleszenz auch
              entwicklungstypisch und brauchen entsprechende Einordnung.
            </p>
            <p>
              Ein spezialisiertes Frühinterventions-Angebot im Kanton Zürich ist{" "}
              <strong>HYPE Züri</strong> an der Kinder- und Jugendpsychiatrie
              der PUK — für Jugendliche ab 13 Jahren mit Verdacht, Risiko oder
              bereits diagnostizierter Borderline- Persönlichkeitsstörung.
            </p>
            <p
              className="flex flex-wrap gap-x-6 gap-y-1"
              style={{ fontSize: "var(--text-md)" }}
            >
              <a href={`tel:${hypeZueri.tel}`} className="editorial-link">
                Telefon {hypeZueri.nummer}
              </a>
              <a
                href={pukUrl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link"
              >
                pukzh.ch
              </a>
            </p>
          </EditorialProse>
        </ContentSection>

        {/* ── 9: Anbieter-Box ── */}
        <ContentSection
          variant="editorial"
          title="Wo eine Diagnose im Kanton Zürich gestellt werden kann"
          id="anbieter"
          preview="Eine Auswahl spezialisierter Anlaufstellen für Diagnostik-Abklärung im Kanton Zürich."
        >
          <EditorialProse>
            <p>
              Für eine Diagnostik-Abklärung im Kanton Zürich kommen verschiedene
              Stellen infrage. Diese Liste ist nicht abschliessend — niedrig-
              gelassene Psychiater:innen oder psychologische
              Psychotherapeut:innen mit Borderline-Erfahrung sind ebenfalls
              möglich. Meist ist die <strong>Hausärzt:in</strong> der erste
              Schritt mit Überweisung.
            </p>
          </EditorialProse>

          <div className="mt-8 space-y-8">
            <article className="space-y-2">
              <h4 style={h4Style}>
                Psychiatrische Universitätsklinik Zürich (PUK)
              </h4>
              <p style={bodyStyle}>
                <strong>Erwachsene (18+):</strong> Anmeldung über das
                elektronische Anmeldeformular auf pukzh.ch oder die Zentrale.
                <br />
                <strong>Jugendliche ab 13 Jahren:</strong> über das HYPE
                ZÜRI-Programm an der Kinder- und Jugendpsychiatrie.
              </p>
              <p
                className="flex flex-wrap gap-x-6 gap-y-1"
                style={{ fontSize: "var(--text-md)" }}
              >
                <a href={`tel:${pukZentrale.tel}`} className="editorial-link">
                  Zentrale {pukZentrale.nummer}
                </a>
                <a href={`tel:${hypeZueri.tel}`} className="editorial-link">
                  HYPE ZÜRI {hypeZueri.nummer}
                </a>
                <a
                  href={pukUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                >
                  pukzh.ch
                </a>
              </p>
            </article>

            <article className="space-y-2">
              <h4 style={h4Style}>ipw — Integrierte Psychiatrie Winterthur</h4>
              <p style={bodyStyle}>
                Ambulante und stationäre Behandlung von
                Persönlichkeitsstörungen.
              </p>
              <p
                className="flex flex-wrap gap-x-6 gap-y-1"
                style={{ fontSize: "var(--text-md)" }}
              >
                <a href={`tel:${ipw.tel}`} className="editorial-link">
                  Telefon {ipw.nummer}
                </a>
                <a
                  href={ipwUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                >
                  ipw.ch
                </a>
              </p>
            </article>

            <article className="space-y-2">
              <h4 style={h4Style}>Sanatorium Kilchberg</h4>
              <p style={bodyStyle}>
                Privatklinik für Psychiatrie und Psychotherapie am Zürichsee.
              </p>
              <p
                className="flex flex-wrap gap-x-6 gap-y-1"
                style={{ fontSize: "var(--text-md)" }}
              >
                <a href={`tel:${sanatorium.tel}`} className="editorial-link">
                  Telefon {sanatorium.nummer}
                </a>
                <a
                  href={sanatoriumUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                >
                  sanatorium-kilchberg.ch
                </a>
              </p>
            </article>

            <article className="space-y-2">
              <h4 style={h4Style}>Clienia Schlössli (Oetwil am See)</h4>
              <p style={bodyStyle}>
                Spezialisierte DBT-Station für
                Borderline-Persönlichkeitsstörung.
              </p>
              <p style={{ fontSize: "var(--text-md)" }}>
                <a
                  href={clieniaUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                >
                  clienia.ch
                </a>
              </p>
            </article>
          </div>

          <p
            className="mt-8 text-center"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Ärztlich indizierte psychiatrische Diagnostik wird in der Regel von
            der Grundversicherung gedeckt.
          </p>
        </ContentSection>

        {/* ── 10: Hinweis PUK-Elterngruppe ── */}
        <ContentSection
          variant="editorial"
          title="Für Eltern jugendlicher Betroffener"
          id="elterngruppe"
          preview="An der PUK gibt es eine Gruppe für Eltern von Jugendlichen mit Borderline-Persönlichkeitsstörung."
        >
          <EditorialProse>
            <p>
              Für Eltern jugendlicher Betroffener gibt es an der PUK Zürich die
              Gruppe «Eltern von Jugendlichen mit einer
              Borderline-Persönlichkeitsstörung». Sie bietet Austausch,
              Psychoedukation und Beratung für Eltern, die mit der Diagnose und
              ihren Folgen umgehen lernen.
            </p>
            <p
              className="flex flex-wrap gap-x-6 gap-y-1"
              style={{ fontSize: "var(--text-md)" }}
            >
              <a
                href={pukKjpUrl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link"
              >
                Mehr Informationen auf pukzh.ch
              </a>
            </p>
          </EditorialProse>
        </ContentSection>

        {/* ── Schluss-Sektion: Beratungs-Einladung ── */}
        <EditorialSection
          label="Fachstelle"
          title="Sie müssen nicht warten, bis eine Diagnose gestellt ist"
          rule
        >
          <EditorialProse>
            <p>
              Die Fachstelle Angehörigenarbeit der PUK Zürich berät auch dann,
              wenn keine Diagnose vorliegt — und auch unabhängig davon, ob die
              erkrankte Person bereits in Behandlung ist. Beratung kostet nichts
              und wird nicht an Krankenkassen weitergegeben.
            </p>
          </EditorialProse>
          <div
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-6"
            style={{ fontSize: "var(--text-md)" }}
          >
            <a href={`tel:${fachstelleTel.tel}`} className="editorial-link">
              {fachstelleTel.nummer}
            </a>
            <a
              href={`mailto:${fachstelleEmail.adresse}`}
              className="editorial-link"
            >
              {fachstelleEmail.adresse}
            </a>
          </div>
        </EditorialSection>

        {/* ── RelatedLinks ── */}
        <RelatedLinksEditorial
          links={[
            {
              href: "/verstehen",
              title: "Borderline verstehen",
              description:
                "Was Borderline ist, typische Muster und was Angehörige oft erleben — als Hintergrund zur Diagnose.",
            },
            {
              href: "/genesung",
              title: "Genesung",
              description:
                "Was Diagnose und Behandlung über Zeit bewirken können — Recovery, Rückschritte, realistische Hoffnung.",
            },
            {
              href: "/unterstuetzen/therapie",
              title: "Therapie begleiten",
              description:
                "Was nach der Diagnose kommt — Therapieformen, Behandlungssystem, Rolle der Angehörigen.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
