import { useCallback } from "react";
import ContentSection from "@/components/ContentSection";
import {
  DisplayHeading,
  EditorialFigure,
  EditorialLayout,
  EditorialProse,
  EditorialPullQuote,
  EditorialSectionBlock,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import { DiagnostikWegSvg } from "@/components/infografik/DiagnostikWegSvg";
import EvidenceNote from "@/components/EvidenceNote";
import GlossarBegriff from "@/components/GlossarBegriff";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import ReviewBadge from "@/components/ReviewBadge";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import { TableOfContents } from "@/components/UXEnhancements";
import AppLink from "@/components/AppLink";
import { quellenLinks } from "@/content/quellenLinks";
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
    desc: "Das DSM-5-TR beschreibt neun Kriterien; mindestens fünf müssen als anhaltendes, situationsübergreifendes Muster erfüllt sein. Die ICD-11 bestimmt zuerst den Schweregrad einer Persönlichkeitsstörung und kann ergänzend das Borderline-Muster 6D11.5 ausweisen.",
  },
  {
    title: "Verlauf statt Momentaufnahme",
    desc: "Eine sorgfältige Abklärung stützt sich auf mehr als einen Momenteindruck. Wie viele Termine und wie viel Zeit nötig sind, hängt von Fragestellung, Verlauf und Setting ab.",
  },
  {
    title: "Mitteilung im Gespräch",
    desc: "Die fachliche Einordnung sollte in einem Gespräch erklärt werden — einschliesslich Unsicherheiten, Bedeutung und möglicher nächster Schritte.",
  },
] as const;

const unterschiedlicheEinordnungWasNicht = [
  "drängen oder mit der Diagnose argumentieren",
  "in Konflikten die Diagnose als Etikett einsetzen",
  "der Person beweisen wollen, dass sie «Borderline hat»",
  "beobachtbares Verhalten ausschliesslich mit der Diagnose erklären",
  "eigene Sicherheit oder Geduld auf später verschieben",
] as const;

const unterschiedlicheEinordnungWasMoeglich = [
  "fragen, was unklar ist oder sich für die Person nicht stimmig anfühlt",
  "konkrete Erfahrungen und beobachtbares Verhalten ansprechen statt ein Etikett",
  "offene Fragen mit der behandelnden Fachperson klären oder eine zweite fachliche Einschätzung einholen — sofern die Person das möchte",
  "Beratung der Fachstelle Angehörigenarbeit der PUK in Anspruch nehmen — auch ohne Diagnose-Stellung",
] as const;

const vermutungSchritte = [
  {
    title: "Mit der Hausärzt:in sprechen",
    desc: "Eine mögliche erste Anlaufstelle für Einschätzung, erste Abklärungen und Überweisung. Welche Aufgaben die Hausärzt:in selbst übernimmt, hängt von Qualifikation, Situation und Versorgungsweg ab.",
  },
  {
    title: "Fachstelle Angehörigenarbeit der PUK kontaktieren",
    desc: "Beratung für Angehörige ist auch möglich, wenn keine Diagnose vorliegt oder die betroffene Person nicht in Behandlung ist.",
  },
  {
    title: "Spezialisierte Anlaufstelle anfragen",
    desc: "Wenn die betroffene Person eine fachliche Abklärung wünscht, kann eine direkte Anfrage bei einer der unten genannten Stellen sinnvoll sein.",
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
        description="Wie eine Borderline-Abklärung typischerweise abläuft, wer daran beteiligt sein kann, was die Diagnose für Angehörige bedeutet — und wo im Kanton Zürich eine Abklärung möglich ist."
        path="/verstehen/diagnostik"
      />
      <MedicalPageSchema
        title="Diagnostik"
        description="Wie eine Borderline-Abklärung typischerweise abläuft, wer daran beteiligt sein kann, was die Diagnose für Angehörige bedeutet — und wo im Kanton Zürich eine Abklärung möglich ist."
        path="/verstehen/diagnostik"
      />
      <TableOfContents />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-12 pt-12 md:pb-16 md:pt-16">
          <EyebrowLabel spacing="compact">Diagnostik</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Wie eine Borderline-Diagnose entsteht
          </DisplayHeading>
          <Lede className="mt-6">
            Was eine Diagnose bedeutet, wer eine Borderline-Abklärung
            üblicherweise durchführt, wie sie abläuft — und was sie für Sie als
            Angehörige verändert. Nicht als Anleitung, jemanden zur Diagnose zu
            drängen, sondern als Orientierung in einer Phase, in der vieles
            unklar ist.
          </Lede>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Grundtext ca. 10 Min · Mit Vertiefungen länger.
          </p>
          <ReviewBadge path="/verstehen/diagnostik" />
        </header>

        {/* ── Intro / Überblick ── */}
        <EditorialSectionBlock
          label="Überblick"
          title="Was Sie auf dieser Seite finden"
        >
          <EditorialProse>
            <p>
              Diese Seite gliedert den Diagnostik-Prozess für Angehörige: wer
              eine Borderline-Abklärung üblicherweise durchführt, wie eine
              Abklärung typischerweise abläuft, was die Diagnose für Sie
              verändert — und welche Möglichkeiten es gibt, wenn die Einordnung
              nicht geteilt wird, Fragen offenbleiben oder noch keine Diagnose
              gestellt wurde.
            </p>
            <p>
              Sie können auch direkt zu{" "}
              <a
                href="#wer"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "wer")}
              >
                «Wer klärt üblicherweise ab»
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
                «Wo eine Abklärung möglich ist»
              </a>{" "}
              springen.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        {/* ── 1: Wer klärt üblicherweise ab ── */}
        <ContentSection
          variant="editorial"
          collapsible={false}
          title="Wer führt eine Borderline-Abklärung üblicherweise durch?"
          id="wer"
        >
          <EditorialProse>
            <p>
              Je nach Fragestellung und Versorgungsweg findet eine vertiefte
              Abklärung zum Beispiel in psychiatrisch-psychotherapeutischen
              Praxen, Ambulatorien, spezialisierten Angeboten oder Kliniken
              statt. Beteiligt sein können ärztliche und psychologische
              Fachpersonen mit entsprechender diagnostischer Erfahrung.
            </p>
            <p>
              <strong>Hausärzt:innen</strong> oder andere Fachärzt:innen können
              Beschwerden einordnen, andere Ursachen mitprüfen und an eine
              geeignete Fachperson überweisen. Wer die diagnostische
              Gesamtbeurteilung übernimmt, hängt von Qualifikation, Setting und
              Behandlungsweg ab.
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
                «Wo eine Abklärung möglich ist»
              </a>
              .
            </p>
          </EditorialProse>
        </ContentSection>

        {/* ── 2: Wie läuft Diagnostik ab ── */}
        <ContentSection
          variant="editorial"
          collapsible={false}
          title="Wie läuft eine Diagnostik ab?"
          id="wie"
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
                  <h3 style={h4Style}>{item.title}</h3>
                  <p className="mt-1" style={bodyStyle}>
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <EditorialFigure
            caption="Der Weg zur Abklärung: fünf Schritte entlang einer Zeitachse – und Ihre Rolle dabei."
            textVersion={
              <>
                <p>
                  Fünf Schritte entlang einer Zeitachse von oben nach unten:
                </p>
                <ol className="mt-2 list-decimal space-y-2 pl-5">
                  <li>
                    <strong>Erste Anlaufstelle</strong> – Den ersten Kontakt
                    dürfen Sie anregen oder begleiten (Hausärzt:in, Praxis,
                    Ambulatorium). Anbieten ja, erzwingen nein.
                  </li>
                  <li>
                    <strong>Fachliche Abklärung</strong> – Die Abklärung machen
                    dafür qualifizierte Fachpersonen, je nach Versorgungsweg in
                    Praxis, Ambulatorium oder Klinik.
                  </li>
                  <li>
                    <strong>Mehrere Gespräche</strong> – Eine Abklärung entsteht
                    aus einem Muster über die Zeit, nicht aus einem einzelnen
                    Moment. Geduld ist hier kein Nichtstun.
                  </li>
                  <li>
                    <strong>Rückmeldung &amp; Einordnung</strong> – Die
                    Fachperson ordnet ein und grenzt ab. Ob Sie einbezogen
                    werden, hängt vom Einverständnis Ihres/Ihrer Angehörigen ab
                    – das kann schwer sein.
                  </li>
                  <li>
                    <strong>Behandlungsplanung</strong> – Jetzt entsteht ein
                    Behandlungsplan, oft eine störungsspezifische Psychotherapie
                    wie DBT. Fragen Sie, wie Sie unterstützen können.
                  </li>
                </ol>
                <p className="mt-2">
                  Bei Jugendlichen kann die Abklärung in der Kinder- und
                  Jugendpsychiatrie erfolgen. Wie Eltern oder andere
                  Bezugspersonen einbezogen werden, hängt unter anderem von
                  Alter, Urteilsfähigkeit, Einwilligung, Behandlungsrahmen und
                  Schutzbedarf ab. Auch urteilsfähige Minderjährige haben ein
                  Recht auf Vertraulichkeit; konkrete Fragen sollten mit der
                  zuständigen Fachperson geklärt werden.
                </p>
              </>
            }
          >
            <DiagnostikWegSvg />
          </EditorialFigure>
          <div className="mt-8">
            <EditorialPullQuote>
              Die Diagnose ist eine fachliche Beurteilung über Zeit, nicht ein
              Stempel aus einem einzelnen Gespräch.
            </EditorialPullQuote>
          </div>
          <EditorialProse>
            <p className="mt-8">
              <strong>
                DSM-5-TR und ICD-11 beschreiben nicht dasselbe Modell:
              </strong>{" "}
              Im DSM-5-TR werden neun Kriterien geprüft; mindestens fünf müssen
              als anhaltendes und situationsübergreifendes Muster vorliegen. In
              der ICD-11 wird zuerst der Schweregrad einer
              Persönlichkeitsstörung bestimmt; das Borderline-Muster kann
              anschliessend mit dem Zusatzcode 6D11.5 beschrieben werden.
            </p>
            <p>
              <strong>Schweizer Kodierkontext:</strong> Für die stationäre
              medizinische Statistik gilt in der Schweiz 2026 weiterhin die
              ICD-10-GM 2024. Deshalb kann in entsprechenden Unterlagen der Code
              F60.31 erscheinen. Das ist eine begrenzte Vorgabe für die
              stationäre Kodierung und bedeutet nicht, dass ICD-10-GM, DSM-5-TR
              und ICD-11 inhaltlich gleich aufgebaut sind oder in jedem
              Versorgungssetting identisch verwendet werden.
            </p>
          </EditorialProse>
          <EvidenceNote
            variant="editorial"
            title="Klassifikations- und Verfahrens-Quellen"
            sources={[
              {
                label: "WHO ICD-11: Borderline pattern specifier (6D11.5)",
                href: quellenLinks.icd11,
                type: "wissenschaft",
              },
              {
                label:
                  "American Psychiatric Association (2022). DSM-5-TR — Diagnostic and Statistical Manual of Mental Disorders, Text Revision.",
                href: quellenLinks.apa2022,
                type: "wissenschaft",
              },
              {
                label:
                  "First, Williams, Benjamin & Spitzer (2017). SCID-5-PD: Structured Clinical Interview for DSM-5 Personality Disorders. APA Publishing.",
                href: quellenLinks.first2017,
                type: "wissenschaft",
              },
              {
                label:
                  "Loranger (1999). IPDE — International Personality Disorder Examination. WHO / Cambridge University Press.",
                href: quellenLinks.ipde1999,
                type: "wissenschaft",
              },
              {
                label:
                  "Bundesamt für Statistik (2026). Medizinisches Kodierungshandbuch: ICD-10-GM 2024 für stationäre Fälle.",
                href: quellenLinks.bfsKodierung2026,
                type: "versorgung",
              },
              {
                label:
                  "Bundesamt für Gesundheit (BAG). Berufs- oder Arztgeheimnis, Abschnitt zu urteilsfähigen Minderjährigen.",
                href: quellenLinks.bagBerufsgeheimnis,
                type: "versorgung",
              },
            ]}
          />
        </ContentSection>

        {/* ── 3: Differenzialdiagnostik (kurz) ── */}
        <ContentSection
          variant="editorial"
          collapsible={false}
          title="Differenzialdiagnostik — kurz"
          id="differenzial"
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
              Differenzialdiagnostik (was IST Borderline und was nicht) und{" "}
              <GlossarBegriff term="Komorbidität">Komorbidität</GlossarBegriff>{" "}
              (was MIT Borderline parallel auftreten kann) sind unterschiedliche
              Fragen — manche Erkrankungen wie PTBS werden im Diagnostik-Prozess
              geprüft und können auch parallel bestehen. Mehr dazu auf der Seite{" "}
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

        {/* ── 4: Bedeutung für Angehörige ── */}
        <ContentSection
          variant="editorial"
          collapsible={false}
          title="Was bedeutet die Diagnose für Sie als Angehörige?"
          id="bedeutung"
        >
          <EditorialProse>
            <p>
              Eine sorgfältige Diagnose kann Behandlung und Verständigung
              erleichtern. Sie kann helfen, passende strukturierte
              Psychotherapie zu planen und wiederkehrende Schwierigkeiten
              fachlich einzuordnen. Sie ist aber weder Voraussetzung für jede
              Hilfe noch eine vollständige Erklärung eines Menschen oder einer
              Beziehung.
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

        {/* ── 5: Unterschiedliche Einordnung ── */}
        <ContentSection
          variant="editorial"
          collapsible={false}
          title="Was, wenn die Diagnose nicht geteilt wird oder Fragen offenbleiben?"
          id="ablehnung"
        >
          <EditorialProse>
            <p>
              Eine Diagnose kann hilfreich sein, muss sich für die betroffene
              Person aber nicht stimmig anfühlen. Zweifel können viele Gründe
              haben: offene diagnostische Fragen, andere Erklärungen, belastende
              Erfahrungen im Versorgungssystem, Stigma oder Sorge vor
              Etikettierung. Auch eine fachlich gestellte Diagnose darf
              hinterfragt werden; eine zweite fachliche Einschätzung ist
              legitim.
            </p>
          </EditorialProse>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 style={h4Style}>Was nicht hilft</h3>
              <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                {unterschiedlicheEinordnungWasNicht.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={h4Style}>Was möglich ist</h3>
              <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                {unterschiedlicheEinordnungWasMoeglich.map(item => (
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
              <AppLink href="/soforthilfe" className="editorial-link">
                Soforthilfe
              </AppLink>
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
                — Fachstelle Angehörigenarbeit der PUK, Stand By You, VASK
                Zürich.
              </li>
              <li>
                Eigene Hausärzt:in oder Psychotherapeut:in — keine Pflicht, aber
                eine reale Option.
              </li>
            </ul>
          </EditorialProse>
        </ContentSection>

        {/* ── 7: Orientierung ohne Diagnose ── */}
        <ContentSection
          variant="editorial"
          collapsible={false}
          title="Was, wenn noch keine Diagnose gestellt ist?"
          id="vermutung"
        >
          <EditorialProse>
            <p>
              Wenn Sie Verhaltensweisen oder Erfahrungen aus den Beschreibungen
              auf dieser Website wiedererkennen, kann das ein Anlass sein,
              Beobachtungen zu benennen und Beratung zu suchen. Es erlaubt aber
              keine Diagnose der anderen Person. Die Seite{" "}
              <Link href="/selbsttest" className="editorial-link">
                «Passende Inhalte finden»
              </Link>{" "}
              ist eine Orientierungshilfe für Angehörige — sie sagt etwas
              darüber aus, wo Sie selbst stehen, nicht ob die andere Person
              Borderline hat.
            </p>
          </EditorialProse>
          <div className="mt-6 space-y-6">
            {vermutungSchritte.map(item => (
              <article key={item.title} className="space-y-2">
                <h3 style={h4Style}>{item.title}</h3>
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
          title="Wo eine Abklärung im Kanton Zürich möglich ist"
          id="anbieter"
          preview="Eine Auswahl spezialisierter Anlaufstellen für Diagnostik-Abklärung im Kanton Zürich."
        >
          <EditorialProse>
            <p>
              Für eine Diagnostik-Abklärung im Kanton Zürich kommen verschiedene
              Stellen infrage. Diese Liste ist nicht abschliessend — niedrig-
              gelassene Psychiater:innen oder psychologische
              Psychotherapeut:innen mit Borderline-Erfahrung sind ebenfalls
              möglich. Die <strong>Hausärzt:in</strong> kann ein erster Schritt
              sein und bei Bedarf an eine geeignete Fachperson überweisen.
            </p>
          </EditorialProse>

          <div className="mt-8 space-y-8">
            <article className="space-y-2">
              <h3 style={h4Style}>
                Psychiatrische Universitätsklinik Zürich (PUK)
              </h3>
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
              <h3 style={h4Style}>ipw — Integrierte Psychiatrie Winterthur</h3>
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
              <h3 style={h4Style}>Sanatorium Kilchberg</h3>
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
              <h3 style={h4Style}>Clienia Schlössli (Oetwil am See)</h3>
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
            Ob und unter welchen Voraussetzungen die Grundversicherung Kosten
            übernimmt, hängt von Leistung, Zuweisung und Versicherungsmodell ab.
            Klären Sie die Kostenübernahme bei der abklärenden Stelle und bei
            Ihrer Krankenversicherung vorab.
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
        <EditorialSectionBlock
          label="Fachstelle"
          title="Sie müssen nicht warten, bis eine Diagnose gestellt ist"
          rule
        >
          <EditorialProse>
            <p>
              Die Fachstelle Angehörigenarbeit der PUK berät auch dann, wenn
              keine Diagnose vorliegt — und auch unabhängig davon, ob die
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
        </EditorialSectionBlock>

        {/* ── RelatedLinks ── */}
        <RelatedLinksEditorial
          links={[
            {
              href: "/verstehen",
              title: "Borderline verstehen",
              description:
                "Was die Diagnose beschreiben kann und was Angehörige erleben können — als Hintergrund zur Einordnung.",
            },
            {
              href: "/genesung",
              title: "Genesung",
              description:
                "Was Behandlung und Lebensumstände über Zeit ermöglichen können — Recovery, schwierigere Phasen und realistische Hoffnung.",
            },
            {
              href: "/unterstuetzen/therapie",
              title: "Therapie und Angehörigenrolle",
              description:
                "Was nach der Diagnose kommt — Therapieformen, Behandlungssystem, Rolle der Angehörigen.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
