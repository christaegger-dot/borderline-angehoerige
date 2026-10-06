import { LearningGoal, LearningExtensionNav } from "@/components/LearningPath";
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
import { BegleiterkrankungenSvg } from "@/components/infografik/BegleiterkrankungenSvg";
import EvidenceNote from "@/components/EvidenceNote";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import ReviewBadge from "@/components/ReviewBadge";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import { TableOfContents } from "@/components/UXEnhancements";
import AppLink from "@/components/AppLink";
import { quellenLinks } from "@/content/quellenLinks";
import { emailByIdStrict, kontaktByIdStrict } from "@/data/kontakte";
import { Link } from "wouter";

const fachstelleTel = kontaktByIdStrict("INFO_FACHSTELLE");
const fachstelleEmail = emailByIdStrict("EMAIL_ANGEHOERIGEN");

/** Öffnet eine ContentSection via Custom Event und scrollt dorthin. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

const haeufigeKomorbiditaeten = [
  "depressive Erkrankungen",
  "Angststörungen",
  "posttraumatische Belastungsstörung (PTBS)",
  "Substanzgebrauchsstörungen",
  "Essstörungen",
  "Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung (ADHS)",
] as const;

const depressionsZeichen = [
  "anhaltender Rückzug über Wochen, nicht nur einzelne schwierige Tage",
  "deutlich verminderter Antrieb, oft auch bei Aktivitäten, die früher Freude machten",
  "anhaltende Hoffnungslosigkeit, die sich nicht durch äussere Anlässe verändert",
  "körperliche Symptome wie Schlafstörungen oder Appetitveränderungen",
  "Suizidgedanken oder entsprechende Aussagen (siehe nächste Sektion)",
] as const;

const andereKomorbiditaeten = [
  {
    title: "Angststörungen",
    desc: "Angststörungen können zusätzlich zu einer Borderline-Diagnose bestehen. Ob Beschwerden Teil eines Gesamtbilds oder eigenständig zu behandeln sind, beurteilen Fachpersonen individuell.",
  },
  {
    title: "Posttraumatische Belastungsstörung (PTBS)",
    desc: "PTBS kann gleichzeitig bestehen oder bei der fachlichen Differenzialdiagnostik geprüft werden. Die Diagnose und eine mögliche traumafokussierte Behandlung werden individuell mit Fachpersonen geplant.",
  },
  {
    title: "Substanzgebrauchsstörungen",
    desc: "Manche Menschen berichten von problematischem Alkohol-, Cannabis- oder anderem Substanzgebrauch. Gründe und Funktionen unterscheiden sich und lassen sich nicht aus einer Diagnose ableiten. Eine fachliche Abklärung kann passende Behandlungsschritte klären.",
  },
  {
    title: "Essstörungen",
    desc: "Essstörungen können bei Menschen verschiedener Geschlechter und Altersgruppen gleichzeitig bestehen. Bei körperlicher Gefährdung braucht es rasch eine fachliche und medizinische Einschätzung.",
  },
  {
    title: "ADHS",
    desc: "ADHS kann gleichzeitig bestehen. Einzelne Merkmale wie Impulsivität oder Schwierigkeiten mit der Emotionsregulation können sich überschneiden. Eine fachliche Abklärung berücksichtigt deshalb unter anderem Entwicklungsgeschichte, Beginn und situationsübergreifendes Auftreten; aus der Borderline-Diagnose allein lässt sich ADHS nicht ableiten.",
  },
] as const;

export default function Begleiterkrankungen() {
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
        title="Begleiterkrankungen"
        description="Komorbidität bei Borderline: welche Begleiterkrankungen in klinischen Studien beschrieben werden, was das für Angehörige bedeutet und wie Behandlung individuell geplant wird."
        path="/verstehen/begleiterkrankungen"
      />
      <MedicalPageSchema
        title="Begleiterkrankungen"
        description="Komorbidität bei Borderline: welche Begleiterkrankungen in klinischen Studien beschrieben werden, was das für Angehörige bedeutet und wie Behandlung individuell geplant wird."
        path="/verstehen/begleiterkrankungen"
      />
      <TableOfContents />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-12 pt-12 md:pb-16 md:pt-16">
          <EyebrowLabel spacing="compact">Begleiterkrankungen</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Wenn mehrere Erkrankungen ineinandergreifen
          </DisplayHeading>
          <Lede className="mt-6">
            Bei vielen Menschen mit Borderline bestehen zusätzlich Depression,
            Angststörungen, PTBS, Substanzgebrauchsstörungen, Essstörungen oder
            ADHS. Diese Beispiele haben keine diagnostische Rangfolge. Was sie
            für Angehörige bedeuten können — und was sich nur fachlich
            beurteilen lässt.
          </Lede>
          <LearningGoal path="/verstehen/begleiterkrankungen" />
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Vollständig ca. 9 Min · Auch abschnittweise lesbar.
          </p>
          <ReviewBadge path="/verstehen/begleiterkrankungen" />
        </header>

        {/* ── Intro / Überblick ── */}
        <EditorialSectionBlock
          label="Überblick"
          title="Was Sie auf dieser Seite finden"
        >
          <EditorialProse>
            <p>
              Diese Seite ordnet ein, welche Begleiterkrankungen in Studien bei
              vielen, aber nicht allen Menschen mit Borderline beschrieben
              werden, was sie für Alltag und Behandlung bedeuten können und wie
              Angehörige unterstützen können, ohne Diagnosen selbst zuzuordnen.
            </p>
            <p>
              Sie können auch direkt zu{" "}
              <a
                href="#depression"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "depression")}
              >
                «Depression bei Borderline»
              </a>
              ,{" "}
              <a
                href="#suizidrisiko"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "suizidrisiko")}
              >
                «Erhöhtes Suizidrisiko»
              </a>
              ,{" "}
              <a
                href="#andere"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "andere")}
              >
                «Weitere mögliche Begleiterkrankungen»
              </a>{" "}
              oder{" "}
              <a
                href="#behandlung"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "behandlung")}
              >
                «Was bedeutet das für die Behandlung»
              </a>{" "}
              springen.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        {/* ── 1: Was Komorbidität bedeutet ── */}
        <ContentSection
          variant="editorial"
          collapsible={false}
          title="Was Komorbidität bei Borderline bedeutet"
          id="was-ist-komorbiditaet"
        >
          <EditorialProse>
            <p>
              <strong>Komorbidität</strong>, der medizinische Begriff für
              Begleiterkrankungen, bedeutet, dass eine Person gleichzeitig oder
              im Verlauf an mehreren Erkrankungen leidet. Bei Menschen mit
              Borderline kommen weitere psychische Diagnosen häufig vor. Wie sie
              zusammenhängen, ist individuell verschieden.
            </p>
            <p>
              In klinischen Studien werden unter anderem folgende
              Begleiterkrankungen beschrieben. Die Reihenfolge ist keine
              Häufigkeitsrangliste:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              {haeufigeKomorbiditaeten.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Wichtig zur Einordnung: Mehrere Diagnosen bedeuten mehr
              Komplexität, aber keine Rangfolge des Leids. Erkrankungen können
              gemeinsame Risikofaktoren haben, sich gegenseitig beeinflussen
              oder unabhängig nebeneinander bestehen. Welche Erklärung passt,
              muss individuell abgeklärt werden. Begleiterkrankungen sind weder
              eine zusätzliche «Strafe» noch etwas, das Angehörige selbst
              diagnostisch sortieren müssen.
            </p>
          </EditorialProse>
          <EditorialFigure
            caption="Schematische Übersicht möglicher Begleiterkrankungen: sechs gleich grosse, unverbundene Einträge ohne diagnostische Rangfolge. Die Darstellung sagt nichts über eine einzelne Person aus."
            textVersion={
              <>
                <p>
                  In Studien hatten viele, aber nicht alle Menschen mit
                  Borderline weitere psychische Diagnosen. Mögliche
                  Begleiterkrankungen sind:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Depression</li>
                  <li>Angststörungen</li>
                  <li>Posttraumatische Belastungsstörung (PTBS)</li>
                  <li>Substanzgebrauchsstörung</li>
                  <li>Essstörungen</li>
                  <li>ADHS</li>
                </ul>
                <p className="mt-2">
                  Die Einträge sind schematisch, gleich gross und ohne
                  Verbindungen dargestellt. Sie zeigen weder Ursache noch eine
                  individuelle Wahrscheinlichkeit oder Rangfolge.
                </p>
                <p className="mt-2">
                  Für Angehörige: Mehrere Diagnosen heissen mehr Komplexität –
                  nicht mehr Schuld. Welche Unterstützung passt, wird
                  individuell fachlich geklärt. Sie müssen nicht sortieren, was
                  was ist. Bei deutlicher Verschlechterung, Hoffnungslosigkeit
                  oder Sorge um die Sicherheit braucht es eine professionelle
                  Einschätzung – unabhängig von der diagnostischen Zuordnung.
                </p>
              </>
            }
          >
            <BegleiterkrankungenSvg />
          </EditorialFigure>
          <EvidenceNote
            variant="editorial"
            title="Quellen zur Einordnung der Begleiterkrankungen"
            definition="Die Übersicht fasst Diagnosen zusammen, die in Fachliteratur zu Borderline beschrieben werden. Sie leitet daraus weder eine Rangfolge noch eine individuelle Wahrscheinlichkeit ab."
            sources={[
              {
                label:
                  "Shah & Zanarini (2018). Comorbidity of Borderline Personality Disorder: Current Status and Future Directions.",
                href: quellenLinks.shahZanarini2018,
                type: "wissenschaft",
              },
              {
                label:
                  "Weiner, Perroud & Weibel (2019). Attention deficit hyperactivity disorder and borderline personality disorder in adults: a review of their links and risks.",
                href: quellenLinks.weinerPerroudWeibel2019,
                type: "wissenschaft",
              },
            ]}
          />
        </ContentSection>

        {/* ── 2: Depression bei Borderline ── */}
        <ContentSection
          variant="editorial"
          collapsible={false}
          title="Depressive Erkrankungen als mögliche Begleiterkrankung"
          id="depression"
        >
          <EditorialProse>
            <p>
              Depressive Erkrankungen werden in klinischen Studien zu Borderline
              häufig beschrieben. Die älteren Zanarini-Untersuchungen beruhen
              auf einer spezialisierten, zunächst stationär behandelten
              Stichprobe und betrachten Diagnosen im Lebenszeit- und
              Langzeitverlauf. Ihre Befunde sind keine Prävalenzschätzung für
              alle Menschen mit Borderline und keine individuelle Prognose.
            </p>
            <p>
              <strong>
                Eine Differenzierung zwischen kurzfristigen Stimmungswechseln
                und einer eigenständigen depressiven Episode ist Aufgabe der
                behandelnden Fachperson — Sie als Angehörige müssen das nicht
                selbst leisten.
              </strong>{" "}
              Dauer, Auslöser und Auswirkungen sind hilfreiche Beobachtungen,
              reichen aber nicht für eine Diagnose. Beschwerden können sich
              überlagern und brauchen eine fachliche Beurteilung des
              Gesamtbilds.
            </p>
            <p>
              Mögliche Hinweise auf eine depressive Phase im Borderline-Kontext:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              {depressionsZeichen.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Wenn die depressive Komponente stark wird, ist das ein eigener
              Behandlungsfokus, oft vor oder parallel zu DBT, MBT,
              Schematherapie oder TFP — siehe{" "}
              <a
                href="#behandlung"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "behandlung")}
              >
                «Was bedeutet das für die Behandlung»
              </a>
              .
            </p>
          </EditorialProse>
          <EvidenceNote
            variant="editorial"
            title="Quellen zur Komorbiditätsforschung bei BPS"
            sources={[
              {
                label:
                  "Zanarini et al. (1998), Axis I comorbidity of borderline personality disorder",
                href: quellenLinks.zanarini1998,
                type: "wissenschaft",
              },
              {
                label:
                  "Zanarini et al. (2004), Axis I comorbidity in patients with BPD: 6-year follow-up",
                href: quellenLinks.zanarini2004,
                type: "wissenschaft",
              },
            ]}
          />
        </ContentSection>

        {/* ── 3: Suizidrisiko ── */}
        <ContentSection
          variant="editorial"
          collapsible={false}
          title="Depression und Suizidgedanken"
          id="suizidrisiko"
        >
          <EditorialProse>
            <p>
              Die NICE-Vollleitlinie (2009) beschreibt einen beobachteten
              Zusammenhang zwischen Borderline mit zusätzlicher Major Depression
              und Suizidversuchen. Dieser Gruppenbefund erlaubt keine Vorhersage
              für eine einzelne Person.
            </p>
            <p>
              Suizidale Aussagen oder Hinweise auf konkrete Pläne brauchen
              unabhängig von ihrer diagnostischen Zuordnung eine professionelle
              Einschätzung. Nehmen Sie auch anhaltende Hoffnungslosigkeit oder
              deutliche Veränderungen ernst.
            </p>
            <p>
              Bei akuter Gefahr oder Hinweisen auf konkrete suizidale Absicht:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <AppLink href="/soforthilfe" className="editorial-link">
                  Soforthilfe
                </AppLink>{" "}
                — Notfallnummern und Anlaufstellen für die akute Situation.
              </li>
              <li>
                <Link href="/unterstuetzen/krise" className="editorial-link">
                  Krisenbegleitung
                </Link>{" "}
                — was vor und während einer Krise hilft, ohne dass Sie sich
                selbst gefährden.
              </li>
            </ul>
          </EditorialProse>
          <EvidenceNote
            variant="editorial"
            title="Quellen zu Suizidversuchen und professioneller Einschätzung"
            sources={[
              {
                label:
                  "NICE CG78: Vollleitlinie (2009), Kapitel 8.3.5 und 8.3.9, S. 317–319",
                href: "https://www.nice.org.uk/guidance/cg78/evidence/full-guideline-pdf-242147197",
                type: "wissenschaft",
                note: "Beobachteter Zusammenhang zu Suizidversuchen bei komorbider Major Depression; keine individuelle Risikoprognose und keine Aussage über Suizidmortalität.",
              },
              {
                label:
                  "NICE NG222 (2022): Depression in adults, Empfehlungen 1.2.8–1.2.11",
                href: "https://www.nice.org.uk/guidance/ng222/chapter/Recommendations#risk-assessment-and-management",
                type: "versorgung",
                note: "Suizidgedanken und -absicht fachlich klären; bei unmittelbarer Gefahr dringliche professionelle Hilfe.",
              },
            ]}
          />
        </ContentSection>

        {/* ── 4: Was Sie als Angehörige wissen sollten ── */}
        <ContentSection
          variant="editorial"
          collapsible={false}
          title="Was Sie als Angehörige wissen sollten"
          id="angehoerige"
        >
          <EditorialProse>
            <p>
              Sie müssen kurzfristige Stimmungswechsel und eine depressive
              Episode nicht selbst unterscheiden. Diese Differenzierung ist
              klinische Aufgabe. Was Sie tun können, ist beobachtbare
              Veränderungen zu benennen und Ihre Sorge nicht zu verharmlosen.
            </p>
            <p>
              Wenn der Rückzug länger dauert, mehr Symptome dazukommen oder
              Hoffnungslosigkeit zentraler wird:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Sorge ruhig ansprechen, ohne zu drängen oder zu drohen.</li>
              <li>
                Wenn möglich und gewünscht, gemeinsam eine fachliche
                Einschätzung anregen. Bei Fragen zu Schweigepflicht oder eigener
                Entlastung können Sie sich unabhängig beraten lassen.
              </li>
              <li>
                Bei Hinweisen auf Suizidalität → siehe{" "}
                <AppLink href="/soforthilfe" className="editorial-link">
                  Soforthilfe
                </AppLink>
                .
              </li>
            </ul>
            <p>
              Eine wichtige Klarstellung: Depressive Episoden entstehen durch
              ein Zusammenspiel biologischer, psychischer und sozialer Faktoren.
              Aus einer Diagnose lässt sich keine persönliche Schuld ableiten.
              Angehörige müssen die Erkrankung weder verhindern noch heilen.
              Beziehungen können das Befinden dennoch beeinflussen;
              Verantwortung für konkrete verletzende oder gewalttätige
              Handlungen bleibt davon getrennt. Veränderungen im Miteinander
              sind allein kein Beleg für die Ursache einer Erkrankung.
            </p>
            <p>
              Manche Angehörige erleben depressive Phasen als besonders
              belastend, etwa wenn Rückzug, weniger Kontakt oder
              Hoffnungslosigkeit hinzukommen. Andere erleben die Situation
              anders. Eigene Erschöpfung ist kein Zeichen von Schwäche — siehe
              Sektion{" "}
              <a
                href="#auch-bei-ihnen"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "auch-bei-ihnen")}
              >
                «Wenn die Belastung gross wird»
              </a>
              .
            </p>
          </EditorialProse>
        </ContentSection>

        {/* ── 5: Weitere mögliche Komorbiditäten ── */}
        <ContentSection
          variant="editorial"
          collapsible={false}
          title="Weitere mögliche Begleiterkrankungen — knapp"
          id="andere"
        >
          <EditorialProse>
            <p>
              Neben depressiven Erkrankungen können weitere Diagnosen parallel
              zur Borderline-Diagnose bestehen. Diese Übersicht ist bewusst
              knapp und ohne Häufigkeitsrangfolge — wer in einem dieser Bereiche
              tiefere Information sucht, findet sie über die Fachstellen oder
              über vertiefende Literatur.
            </p>
          </EditorialProse>
          <div className="mt-6 space-y-6">
            {andereKomorbiditaeten.map(item => (
              <article key={item.title} className="space-y-2">
                <h3 style={h4Style}>{item.title}</h3>
                <p style={bodyStyle}>{item.desc}</p>
              </article>
            ))}
          </div>
        </ContentSection>

        {/* ── 6: Was bedeutet das für die Behandlung ── */}
        <ContentSection
          variant="editorial"
          collapsible={false}
          title="Was bedeutet das für die Behandlung?"
          id="behandlung"
        >
          <EditorialProse>
            <p>
              Komorbide Erkrankungen werden in der Regel mitbehandelt, nicht
              ignoriert. Eine reine «Borderline-Therapie» gibt es selten —
              meistens ist die Behandlung integriert, manchmal sequenziell.
            </p>
            <p>
              <strong>Was «vorrangig» bedeutet:</strong> Akute Gefährdungen —
              etwa eine schwere depressive Episode, eine Substanzgebrauchskrise
              oder eine Essstörung mit körperlicher Gefährdung — brauchen
              sofortige Aufmerksamkeit. Die weitere Behandlung kann je nach
              Situation integriert, parallel oder schrittweise geplant werden.
              Eine starre Reihenfolge gilt nicht; der Gesamtbehandlungsplan wird
              individuell abgestimmt.
            </p>
            <p>
              <strong>Medikation:</strong> Nach NICE sollen Medikamente nicht
              gezielt zur Behandlung von Borderline selbst oder ihrer einzelnen
              Kernsymptome eingesetzt werden. Bei einer zusätzlichen Depression
              kann eine Kombination aus einem Antidepressivum und
              psychologischer Behandlung erwogen werden. Ob Medikation passt,
              wird individuell mit der behandelnden ärztlichen Fachperson
              geklärt.
            </p>
          </EditorialProse>
          <div className="mt-4">
            <EditorialPullQuote>
              Sequenzen sind individuell. Erwarten Sie nicht, dass eine
              Behandlung nach festem Schema verläuft — was vorrangig ist, hängt
              davon ab, was gerade am dringendsten Stabilität braucht.
            </EditorialPullQuote>
          </div>
          <EvidenceNote
            variant="editorial"
            title="Quellen zu Komorbidität und Medikation"
            definition="Begleiterkrankungen müssen individuell berücksichtigt werden. NICE empfiehlt keine gezielte medikamentöse Behandlung von Borderline selbst oder einzelner Kernsymptome; bei einer zusätzlichen Depression kann Medikation gemeinsam mit psychologischer Behandlung erwogen werden. Das ist eine Behandlungsempfehlung, keine individuelle Verordnung."
            sources={[
              {
                label: "NICE CG78: Empfehlungen 1.3.5.1–1.3.5.3 und 1.3.6.2",
                href: quellenLinks.niceCg78,
                type: "wissenschaft",
                note: "Medikation bei Kernstörung und Begleiterkrankungen getrennt beurteilen; komorbide Depression im strukturierten Behandlungsprogramm berücksichtigen.",
              },
              {
                label:
                  "NICE NG222 (2022): Empfehlung 1.11.2 zu Depression bei Persönlichkeitsstörung",
                href: "https://www.nice.org.uk/guidance/ng222/chapter/Recommendations#depression-in-people-with-a-diagnosis-of-personality-disorder",
                type: "wissenschaft",
                note: "Antidepressivum zusammen mit psychologischer Behandlung erwägen; individuell ärztlich entscheiden.",
              },
              {
                label:
                  "Zanarini et al. (1998) – Achse-I-Komorbidität bei Borderline",
                href: quellenLinks.zanarini1998,
                type: "wissenschaft",
              },
              {
                label:
                  "Zanarini et al. (2004) – Verlauf häufiger Komorbiditäten",
                href: quellenLinks.zanarini2004,
                type: "wissenschaft",
              },
            ]}
          />
        </ContentSection>

        {/* ── 7: Auch bei Ihnen (Mini-Sektion) ── */}
        <ContentSection
          variant="editorial"
          collapsible={false}
          title="Wenn die Belastung gross wird — auch bei Ihnen"
          id="auch-bei-ihnen"
        >
          <EditorialProse>
            <p>
              Begleiterkrankungen können auch die Belastung der Angehörigen
              verändern. Depressive Phasen dauern oft länger und zeigen sich
              stiller als kurzfristige Stimmungsschwankungen; andere Krisen
              können auf andere Weise besonders fordernd sein. Daraus lässt sich
              keine allgemeine Rangfolge ableiten. Es ist kein Zeichen von
              Schwäche, wenn Sie selbst Beratung oder Therapie suchen.
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <Link href="/selbstfuersorge" className="editorial-link">
                  Selbstfürsorge
                </Link>{" "}
                — Warnsignale, Sofort-Übungen, eigene Belastungsgrenzen.
              </li>
              <li>
                <Link href="/beratung" className="editorial-link">
                  Beratung &amp; Netzwerke
                </Link>{" "}
                — Fachstelle Angehörigenarbeit, Stand By You, VASK Zürich.
              </li>
            </ul>
          </EditorialProse>
        </ContentSection>

        {/* ── Schluss-Sektion: Beratungs-Einladung ── */}
        <EditorialSectionBlock
          label="Fachstelle"
          title="Sie müssen nicht warten, bis sich die Lage klärt"
          rule
        >
          <EditorialProse>
            <p>
              Die Fachstelle Angehörigenarbeit der PUK Zürich berät auch dann,
              wenn die Diagnostik noch nicht abgeschlossen ist oder mehrere
              Diagnosen im Raum stehen. Beratung kostet nichts und wird nicht an
              Krankenkassen weitergegeben.
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
              href: "/verstehen/diagnostik",
              title: "Diagnostik",
              description:
                "Wie eine Borderline-Diagnose entsteht — und wie sie sich von Komorbidität unterscheidet (Differenzialdiagnostik vs. Komorbidität).",
            },
            {
              href: "/genesung",
              title: "Genesung",
              description:
                "Verlauf und Recovery bei Borderline. Begleiterkrankungen können sich im Langzeitverlauf unterschiedlich entwickeln.",
            },
            {
              href: "/selbstfuersorge",
              title: "Selbstfürsorge",
              description:
                "Eigene Belastung ernst nehmen, Warnsignale, Sofort-Übungen — wichtig besonders in depressiven Phasen der betroffenen Person.",
            },
          ]}
        />
      </EditorialLayout>
      <LearningExtensionNav path="/verstehen/begleiterkrankungen" />
    </Layout>
  );
}
