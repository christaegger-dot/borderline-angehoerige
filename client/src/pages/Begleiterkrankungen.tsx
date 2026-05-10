import { useCallback } from "react";
import ContentSection from "@/components/ContentSection";
import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialPullQuote,
  EditorialSectionBlock,
  EyebrowLabel,
} from "@/components/editorial";
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
  "Essstörungen",
  "Substanzgebrauchsstörungen",
  "weitere Persönlichkeitsstörungen",
] as const;

const depressionsZeichen = [
  "anhaltender Rückzug über Wochen, nicht nur einzelne schwierige Tage",
  "deutlich verminderter Antrieb, oft auch bei Aktivitäten, die früher Freude machten",
  "anhaltende Hoffnungslosigkeit, die sich nicht durch äussere Anlässe verändert",
  "körperliche Symptome wie Schlafstörungen oder Appetitveränderungen",
  "erhöhtes Suizidrisiko (siehe nächste Sektion)",
] as const;

const andereKomorbiditaeten = [
  {
    title: "Angststörungen",
    desc: "Häufig parallel zur Borderline-Diagnose, oft nicht als eigenständig erkannt, weil sie im Borderline-Bild «mitschwingen». Eine eigenständige Behandlung kann trotzdem sinnvoll sein.",
  },
  {
    title: "Posttraumatische Belastungsstörung (PTBS)",
    desc: "Häufig im Hintergrund von Borderline-Symptomatik, besonders bei Patient:innen mit traumatischer Vorgeschichte. PTBS wird im Diagnostik-Prozess als Differenzialdiagnose geprüft (siehe Diagnostik) und kann gleichzeitig als Komorbidität bestehen. Beides ist möglich und schliesst sich nicht aus. In der Therapie meist eigenes Vorgehen, oft mit trauma-fokussierten Verfahren nach Stabilisierung.",
  },
  {
    title: "Essstörungen",
    desc: "Häufig parallel, besonders bei jüngeren Frauen. Anorexie, Bulimie und Binge-Eating-Störungen treten in unterschiedlichen Kombinationen auf. Bei körperlicher Gefährdung wird die Essstörung in der Behandlung oft vorrangig stabilisiert.",
  },
  {
    title: "Substanzgebrauchsstörungen",
    desc: "Oft als Selbstregulation eingesetzt — Alkohol, Cannabis oder andere Mittel zur Dämpfung von Anspannung, Dissoziation oder Schmerz. In der Therapie eigenes Thema; bei akuter Suchterkrankung oft Stabilisierung vor Beginn der Borderline-Therapie nötig.",
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
        description="Komorbidität bei Borderline: warum Depression so oft dazukommt, was das für Angehörige bedeutet, und wie Behandlung sich dadurch verändert."
        path="/begleiterkrankungen"
      />
      <MedicalPageSchema
        title="Begleiterkrankungen"
        description="Komorbidität bei Borderline: warum Depression so oft dazukommt, was das für Angehörige bedeutet, und wie Behandlung sich dadurch verändert."
        path="/begleiterkrankungen"
      />
      <TableOfContents />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-12 pt-12 md:pb-16 md:pt-16">
          <EyebrowLabel spacing="compact">Begleiterkrankungen</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Wenn <em>mehrere Erkrankungen</em> ineinandergreifen
          </DisplayHeading>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Borderline tritt selten allein auf. Besonders häufig kommt
            Depression dazu, oft auch Angststörungen, PTBS, Essstörungen oder
            Substanzgebrauch. Was das für Angehörige bedeutet — und was es nicht
            bedeutet.
          </p>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Vollständig ca. 9 Min · Auch abschnittweise lesbar.
          </p>
          <ReviewBadge path="/begleiterkrankungen" />
        </header>

        {/* ── Intro / Überblick ── */}
        <EditorialSectionBlock
          label="Überblick"
          title="Was Sie auf dieser Seite finden"
        >
          <EditorialProse>
            <p>
              Diese Seite ordnet, warum bei Borderline so häufig weitere
              Diagnosen dazukommen, was die wichtigste — Depression — für den
              Alltag und die Behandlung bedeutet, und wie Sie als Angehörige
              damit umgehen können, ohne in eine Diagnostiker-Rolle zu kippen.
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
                «Andere häufige Komorbiditäten»
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
          title="Was Komorbidität bei Borderline bedeutet"
          id="was-ist-komorbiditaet"
          defaultOpen={true}
          preview="Komorbidität heisst: mehrere Erkrankungen, die gleichzeitig oder nacheinander auftreten. Bei Borderline ist das die Regel, nicht die Ausnahme."
        >
          <EditorialProse>
            <p>
              <strong>Komorbidität</strong> bedeutet, dass eine Person
              gleichzeitig oder im Verlauf an mehreren Erkrankungen leidet. Bei
              Borderline ist das die Regel, nicht die Ausnahme — die meisten
              Patient:innen haben im Lebenszeitverlauf mindestens eine weitere
              psychische Diagnose.
            </p>
            <p>Besonders häufig kommen folgende Erkrankungen dazu:</p>
            <ul className="ml-6 list-disc space-y-1">
              {haeufigeKomorbiditaeten.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Wichtig zur Einordnung: Diese Kombination bedeutet nicht «doppelt
              schlimm» oder «zwei Probleme statt einem». Häufig sind die
              verschiedenen Erkrankungen Ausdruck derselben zugrundeliegenden
              Belastung — sie zeigen sich nur in unterschiedlichen Symptomen
              oder Phasen. Diese Sichtweise nimmt nichts von der realen
              Belastung, hilft aber, Komorbidität nicht als zusätzliche Strafe
              zu lesen.
            </p>
          </EditorialProse>
        </ContentSection>

        {/* ── 2: Depression bei Borderline ── */}
        <ContentSection
          variant="editorial"
          title="Depression bei Borderline — die häufigste Komorbidität"
          id="depression"
          preview="Depression ist die mit Abstand häufigste Begleiterkrankung. Borderline-Stimmungsschwankungen und depressive Episoden überlagern sich oft — die Differenzierung ist klinische Aufgabe."
        >
          <EditorialProse>
            <p>
              Forschung zeigt, dass im Lebenszeitverlauf bei einem grossen Teil
              der Borderline-Patient:innen mindestens eine depressive Episode
              auftritt. Studien zur Verlaufsforschung — allen voran
              Zanarini-Verlaufsstudien — belegen sehr hohe Komorbiditätsraten
              zur Major Depression.
            </p>
            <p>
              <strong>
                Eine Differenzierung zwischen Borderline-typischen
                Stimmungsschwankungen und einer eigenständigen depressiven
                Episode ist Aufgabe der behandelnden Fachperson — Sie als
                Angehörige müssen das nicht selbst leisten.
              </strong>{" "}
              Zur Orientierung: Borderline-typische Schwankungen sind oft kürzer
              (Stunden bis Tage und können schnell kippen), eine depressive
              Episode hält in der Regel länger an (Wochen oder Monate). Beides
              kann sich überlagern.
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
          title="Erhöhtes Suizidrisiko bei depressiver Komorbidität"
          id="suizidrisiko"
          preview="Eine schwere depressive Episode zusätzlich zur Borderline-Erkrankung erhöht das Suizidrisiko. Bei Hinweisen auf konkrete Suizidalität gilt: nicht abwarten, sondern Soforthilfe nutzen."
        >
          <EditorialProse>
            <p>
              Eine schwere depressive Episode zusätzlich zur Borderline-
              Erkrankung erhöht das Suizidrisiko. Wenn Sie Anzeichen wie
              anhaltende Hoffnungslosigkeit, sozialen Rückzug über Wochen,
              Aussagen mit suizidalem Inhalt oder Hinweise auf konkrete Pläne
              wahrnehmen, gehen Sie nicht davon aus, dass das «nur Borderline»
              ist.
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
            title="Quellen zu Krisenhinweisen und Angehörigen-Einordnung"
            sources={[
              {
                label:
                  "APA Practice Guideline (2024) zur klinischen Einordnung von Borderline und Krisenbehandlung",
                href: quellenLinks.apa2024,
                type: "wissenschaft",
              },
              {
                label:
                  "Project Air Strategy: Understanding Self-Harm & Suicidal Thinking for Families & Carers",
                href: quellenLinks.projectAir,
                type: "versorgung",
              },
            ]}
          />
        </ContentSection>

        {/* ── 4: Was Sie als Angehörige wissen sollten ── */}
        <ContentSection
          variant="editorial"
          title="Was Sie als Angehörige wissen sollten"
          id="angehoerige"
          preview="Validieren, ohne diagnostisch zu werden. Was bei längerem Rückzug zu tun ist. Warum die eigene Erschöpfung in depressiven Phasen oft besonders gross wird."
        >
          <EditorialProse>
            <p>
              Sie müssen nicht zwischen «Borderline-Stimmung» und «depressiver
              Episode» selbst unterscheiden. Diese Differenzierung ist klinische
              Aufgabe. Was Sie tun können, ist die Sorge ernst zu nehmen und
              nicht zu verharmlosen.
            </p>
            <p>
              Wenn der Rückzug länger dauert, mehr Symptome dazukommen oder
              Hoffnungslosigkeit zentraler wird:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Sorge ruhig ansprechen, ohne zu drängen oder zu drohen.</li>
              <li>
                Behandelnde Fachpersonen informieren, falls Ihre Angehörige
                bereits in Behandlung ist.
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
              Eine wichtige Klarstellung: Eine depressive Episode ist keine
              «Verstärkung» der Borderline-Symptome durch Beziehungsfaktoren.
              Sie ist eine eigenständige Erkrankungs-Komponente — Sie können sie
              nicht durch Ihr Verhalten verursachen oder verhindern.
            </p>
            <p>
              Die Erschöpfung der Angehörigen ist in depressiven Phasen oft
              besonders gross, weil das Beziehungsgeschehen stiller, schwerer,
              hoffnungsloser wird. Das ist real und kein Zeichen von Schwäche —
              siehe Sektion{" "}
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

        {/* ── 5: Andere häufige Komorbiditäten ── */}
        <ContentSection
          variant="editorial"
          title="Andere häufige Komorbiditäten — knapp"
          id="andere"
          preview="Angststörungen, PTBS, Essstörungen, Substanzgebrauchsstörungen — die wichtigsten weiteren Erkrankungen, die mit Borderline auftreten können."
        >
          <EditorialProse>
            <p>
              Neben der Depression treten weitere Erkrankungen häufig parallel
              zur Borderline-Diagnose auf. Diese Übersicht ist bewusst knapp —
              wer in einem dieser Bereiche tiefere Information sucht, findet sie
              über die Fachstellen oder über vertiefende Literatur.
            </p>
          </EditorialProse>
          <div className="mt-6 space-y-6">
            {andereKomorbiditaeten.map(item => (
              <article key={item.title} className="space-y-2">
                <h4 style={h4Style}>{item.title}</h4>
                <p style={bodyStyle}>{item.desc}</p>
              </article>
            ))}
          </div>
        </ContentSection>

        {/* ── 6: Was bedeutet das für die Behandlung ── */}
        <ContentSection
          variant="editorial"
          title="Was bedeutet das für die Behandlung?"
          id="behandlung"
          preview="Komorbide Erkrankungen werden in der Regel mitbehandelt, nicht ignoriert. Reine «Borderline-Therapie» gibt es selten."
        >
          <EditorialProse>
            <p>
              Komorbide Erkrankungen werden in der Regel mitbehandelt, nicht
              ignoriert. Eine reine «Borderline-Therapie» gibt es selten —
              meistens ist die Behandlung integriert, manchmal sequenziell.
            </p>
            <p>
              <strong>Was «vorrangig» bedeutet:</strong> Wenn etwas akut
              bedrohlich ist — eine schwere depressive Episode, eine akute
              Substanzgebrauchskrise, eine Essstörung mit körperlicher
              Gefährdung — wird das vorrangig stabilisiert. Erst danach kann die
              Borderline-spezifische Therapie greifen.
            </p>
            <p>
              <strong>Medikation:</strong> Die Borderline-Erkrankung selbst ist
              nicht primär medikamentös behandelbar — das ist langjähriger
              fachlicher Konsens (siehe APA Practice Guideline 2024). Bei
              komorbiden Erkrankungen wie einer Depression kann Medikation aber
              Teil der Behandlung sein.
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
            definition="Hohe Komorbiditätsraten bei Borderline sind gut belegt. Leitlinien empfehlen zugleich, Borderline selbst nicht primär medikamentös zu behandeln, Medikation aber bei Begleiterkrankungen gezielt einzusetzen."
            sources={[
              {
                label:
                  "APA Practice Guideline (2024) – Behandlung von Borderline-Persönlichkeitsstörung",
                href: quellenLinks.apa2024,
                type: "wissenschaft",
              },
              {
                label: "AWMF S3-Leitlinie Persönlichkeitsstörungen (2022)",
                href: quellenLinks.awmf2022,
                type: "wissenschaft",
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
          title="Wenn die Belastung gross wird — auch bei Ihnen"
          id="auch-bei-ihnen"
          preview="Komorbidität auf Seiten der betroffenen Person erhöht oft auch die Belastung der Angehörigen. Eigene Beratung ist legitim."
        >
          <EditorialProse>
            <p>
              Die Komorbidität auf Seiten der betroffenen Person erhöht oft auch
              die Belastung der Angehörigen — depressive Phasen sind schwerer
              auszuhalten als reine Borderline-Schwankungen, weil sie länger
              dauern und stiller sind. Es ist kein Zeichen von Schwäche, wenn
              Sie selbst Beratung oder Therapie suchen — im Gegenteil.
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
              href: "/diagnostik",
              title: "Diagnostik",
              description:
                "Wie eine Borderline-Diagnose entsteht — und wie sie sich von Komorbidität unterscheidet (Differenzialdiagnostik vs. Komorbidität).",
            },
            {
              href: "/genesung",
              title: "Genesung",
              description:
                "Verlauf und Recovery bei Borderline. Komorbiditäten nehmen über Zeit oft ab — siehe Zanarini-Verlaufsstudien.",
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
    </Layout>
  );
}
