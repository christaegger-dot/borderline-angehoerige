import AngehoerigenBeratung from "@/components/AngehoerigenBeratung";
import TopicQuickLinks from "@/components/TopicQuickLinks";
import { useCallback } from "react";
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
import SelbstfuersorgeCheck from "@/components/interactive/SelbstfuersorgeCheck";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import { TableOfContents } from "@/components/UXEnhancements";
import { permissionList } from "@/content/selbstfuersorge-page";
import SelbstfuersorgeInfografikenSection from "@/sections/SelbstfuersorgeInfografikenSection";
import { SelbstfuersorgeExercisesSection } from "@/sections/SelbstfuersorgeExercisesSection";
import { SelbstfuersorgeRoleNotesSection } from "@/sections/SelbstfuersorgeRoleNotesSection";
import { SelbstfuersorgeSignalsSection } from "@/sections/SelbstfuersorgeSignalsSection";
import { Link } from "wouter";

/** Öffnet eine ContentSection via Custom Event und scrollt dorthin. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

export default function Selbstfuersorge() {
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
        title="Selbstfürsorge"
        description="Selbstfürsorge für Angehörige: Burnout vermeiden und eigene Bedürfnisse wahrnehmen."
        path="/selbstfuersorge"
      />
      <MedicalPageSchema
        title="Selbstfürsorge"
        description="Selbstfürsorge für Angehörige: Burnout vermeiden und eigene Bedürfnisse wahrnehmen."
        path="/selbstfuersorge"
      />
      <TableOfContents />

      {/* ── 1 Hero ── informative Grafik mit Bildunterschrift */}
      <EditorialSection
        variant="cream"
        density="compact"
        className="topic-intro topic-intro--informative-aside"
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
            Belastung und Schutz
          </span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel className="mb-3" spacing="compact">
            Selbstfürsorge
          </EyebrowLabel>
          <DisplayHeading level={1} size="topic">
            Selbstfürsorge für <em>Angehörige</em> — was trägt, wenn die
            Belastung bleibt.
          </DisplayHeading>
          <Lede className="max-w-[30em]">
            Wer dauerhaft mit Krisen und Loyalitätskonflikten lebt, braucht
            eigene Regeneration – nicht als Luxus, sondern als Grundlage.
          </Lede>
          <TopicQuickLinks
            items={[
              { href: "#warnsignale", label: "Warnsignale" },
              { href: "#sofort-uebungen", label: "Kurze Übungen" },
              { href: "#erlaubnis", label: "Eigene Bedürfnisse ernst nehmen" },
              { href: "#beratung-netzwerke", label: "Beratung" },
            ]}
          />
          <div
            className="mt-8 border-t pt-3"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <EyebrowLabel spacing="compact">
              Vollständig ca. 12 Min · Auch abschnittweise lesbar
            </EyebrowLabel>
          </div>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <figure className="ml-auto w-full max-w-[430px]">
            <div
              className="overflow-hidden rounded-[1.35rem] border"
              style={{
                borderColor: "var(--rule-color)",
                backgroundColor: "var(--bg-elevated)",
              }}
            >
              <img
                src="/infografiken/extras/thumbnails/sauerstoff-die-sauerstoffmaske-v5.webp"
                alt="Diagramm: Ohne Selbstfürsorge entsteht ein Teufelskreis aus Erschöpfung, weniger Geduld, Konflikten und Schuldgefühlen. Mit Selbstfürsorge entsteht ein Schutzkreislauf aus Stabilität, Kraft, Geduld und ruhigeren Reaktionen."
                className="block w-full"
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption className="editorial-small-copy mt-3 border-t pt-3">
              Ihre Bedürfnisse zählen. Erholung ist auch dann berechtigt, wenn
              Sie danach keine weitere Unterstützung leisten können.
            </figcaption>
          </figure>
        </EditorialSection.Aside>
      </EditorialSection>

      {/* ── 2 Sofort-Block ── Was Sie sich jetzt schenken können (Quick-Einstieg
           für Nutzer in akuter Erschöpfung — verlinkt auf #sofort-uebungen) */}
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
            Jetzt sofort
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Akute Belastung</EyebrowLabel>
          <DisplayHeading level={2}>
            Was Sie sich jetzt schenken können
          </DisplayHeading>
          <EditorialBody className="max-w-[40em] mb-8">
            Wenn Sie die Seite gerade in akuter Erschöpfung lesen, ist eine
            kurze Pause vielleicht hilfreicher als weitere Informationen. Wählen
            Sie nur, was Ihnen gut tut. Bei Gefahr hat Schutz Vorrang:
          </EditorialBody>
          <ul className="space-y-5">
            <li>
              <h3
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                Atmen — im angenehmen Rhythmus
              </h3>
              <p
                className="mt-1"
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-secondary)",
                }}
              >
                Wenn angenehm: vier Sekunden ein, sechs Sekunden aus, ohne
                Atemanhalten oder besonders tiefes Atmen. Passen Sie das Tempo
                an. Bei Schwindel oder Unwohlsein beenden Sie die Übung.{" "}
                <a
                  href="#sofort-uebungen"
                  className="editorial-link"
                  onClick={e => {
                    e.preventDefault();
                    handleAnchorClick(e, "sofort-uebungen");
                  }}
                >
                  Volle Atemübung
                </a>
              </p>
            </li>
            <li>
              <h3
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                5-4-3-2-1 Grounding
              </h3>
              <p
                className="mt-1"
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-secondary)",
                }}
              >
                Fünf Dinge sehen, vier hören, drei spüren, zwei riechen, eins
                schmecken. Holt Sie zurück in den Raum, wenn Gedanken kreisen.{" "}
                <a
                  href="#sofort-uebungen"
                  className="editorial-link"
                  onClick={e => {
                    e.preventDefault();
                    handleAnchorClick(e, "sofort-uebungen");
                  }}
                >
                  Schritt für Schritt üben
                </a>
              </p>
            </li>
            <li>
              <h3
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                STOPP — kurz innehalten
              </h3>
              <p
                className="mt-1"
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-secondary)",
                }}
              >
                Stopp, atmen, orientieren, Perspektive, Plan. Eine kurze Pause
                kann helfen, den nächsten Schritt zu wählen; Sie müssen dabei
                nicht sofort ruhig werden.{" "}
                <a
                  href="#sofort-uebungen"
                  className="editorial-link"
                  onClick={e => {
                    e.preventDefault();
                    handleAnchorClick(e, "sofort-uebungen");
                  }}
                >
                  STOPP-Technik vollständig
                </a>
              </p>
            </li>
          </ul>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 3 Pull-Quote (dominant, eigene Sektion) ── */}
      <EditorialSection variant="cream">
        <EditorialSection.Body>
          <EditorialPullQuote>
            «Viele Angehörige merken erst spät, wie erschöpft sie geworden sind.
            Selbstfürsorge beginnt damit, die eigene Belastung überhaupt ernst
            zu nehmen.»
          </EditorialPullQuote>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 4 Intro: Was auf dieser Seite besonders trägt ── */}
      <EditorialSection variant="cream" density="compact">
        <EditorialSection.Body>
          <ul className="topic-takeaways">
            <li>
              Ihre Bedürfnisse zählen unabhängig davon, wie viel Unterstützung
              Sie leisten.
            </li>
            <li>
              Übungen sind Angebote: Anpassen, Auslassen und Beenden sind
              erlaubt.
            </li>
            <li>
              Entlastung kann auch weniger Aufgaben, Abstand oder Beratung
              bedeuten.
            </li>
          </ul>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 5 Group A: Ausgangspunkt ── warum-wichtig */}
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
            Ausgangspunkt
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Warum Selbstfürsorge so wichtig ist"
            id="selbstfuersorge-warum-wichtig"
          >
            <EditorialProse>
              <p>
                Angehörige von Menschen mit Borderline tragen oft eine besondere
                Last. Die emotionale Intensität, die Unvorhersehbarkeit und die
                dauernde innere Wachsamkeit können zu chronischem Stress führen.
                Nicht jeder entwickelt daraus eine psychische Erkrankung, aber
                viele geraten über längere Zeit an Grenzen. Studien zeigen ein
                erhöhtes Risiko für:
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Erschöpfungsdepression</li>
                <li>Angststörungen</li>
                <li>Schlafstörungen</li>
                <li>Körperliche Beschwerden</li>
              </ul>
              <p>
                Selbstfürsorge ist daher keine Selbstsucht, sondern{" "}
                <strong>Selbsterhaltung</strong>. Sie erhöht die Chance, dass
                Sie auf Dauer präsent bleiben können, statt sich Schritt für
                Schritt zu erschöpfen.
              </p>
            </EditorialProse>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 6 Group B: Signale wahrnehmen ── signals + check */}
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
            Signale wahrnehmen
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <SelbstfuersorgeSignalsSection collapsible={false} />
          <SelbstfuersorgeCheck />
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 7 Group C: Was hilft ── exercises + radikale + erlaubnis
           (beratung-netzwerke verschoben hinter erlaubnis, damit Group C
           zusammenhängend bleibt — narrativ verbessert sich der Flow:
           erst selbst probieren, dann externe Hilfe) */}
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
            Was hilft
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <SelbstfuersorgeExercisesSection immediateCollapsible={false} />

          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Radikale Akzeptanz"
            id="radikale-akzeptanz"
          >
            <div className="mt-2">
              <EditorialPullQuote cite="Dieser Satz kann befreiend sein.">
                «Es ist, wie es ist.»
              </EditorialPullQuote>
            </div>
            <EditorialProse>
              <p>
                Radikale Akzeptanz bedeutet nicht, dass Sie die Situation
                gutheissen. Es bedeutet, dass Sie aufhören, gegen die Realität
                zu kämpfen. Dieses Konzept aus der{" "}
                <Link href="/glossar?q=DBT" className="editorial-link">
                  DBT (Dialektisch-Behaviorale Therapie)
                </Link>{" "}
                kann auch für Angehörige sehr hilfreich sein.
              </p>
            </EditorialProse>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-2" style={h4Style}>
                  Was radikale Akzeptanz NICHT ist
                </h3>
                <ul className="ml-5 list-disc space-y-1" style={bodyStyle}>
                  <li>Aufgeben</li>
                  <li>Gutheissen</li>
                  <li>Passivität</li>
                  <li>Resignation</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2" style={h4Style}>
                  Was radikale Akzeptanz IST
                </h3>
                <ul className="ml-5 list-disc space-y-1" style={bodyStyle}>
                  <li>Anerkennen, was Sie nicht ändern können</li>
                  <li>Energie sparen für das, was Sie beeinflussen können</li>
                  <li>Inneren Frieden finden trotz äusserer Turbulenzen</li>
                  <li>Loslassen von «Es sollte anders sein»</li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="mb-3" style={h4Style}>
                Übung: Radikale Akzeptanz praktizieren
              </h3>
              <ol className="ml-5 list-decimal space-y-2" style={bodyStyle}>
                <li>Benennen Sie die Situation: «Es ist so, dass…»</li>
                <li>
                  Spüren Sie den Widerstand: «Ich wünschte, es wäre anders.»
                </li>
                <li>Lassen Sie los: «Ich kann diese Realität nicht ändern.»</li>
                <li>Richten Sie den Fokus neu: «Was kann ich jetzt tun?»</li>
              </ol>
            </div>
            <EvidenceNote
              variant="editorial"
              title="Quelle zur Radikalen Akzeptanz"
              definition="Das Konzept der Radikalen Akzeptanz ist ein zentrales Element der Dialektisch-Behavioralen Therapie (DBT). Es beschreibt eine Haltung, keine Kapitulation."
              reviewDate="26.04.2026"
              sources={[
                {
                  label: "Linehan, DBT Skills Training Manual, 2. Aufl. (2015)",
                  type: "wissenschaft",
                },
              ]}
            />
          </ContentSection>

          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Geben Sie sich die Erlaubnis"
            id="erlaubnis"
          >
            <EditorialProse>
              <p>Als Angehöriger dürfen Sie:</p>
              <ul className="ml-6 list-disc space-y-2">
                {permissionList.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </EditorialProse>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 8 Group D: Nicht allein tragen ── beratung-netzwerke
           (page-level reorder: war zwischen exercises und radikale,
           jetzt nach erlaubnis — narrativ besser, Group C bleibt
           zusammenhängend) */}
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
            Nicht allein tragen
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Beratung & Netzwerke"
            id="beratung-netzwerke"
          >
            <EditorialProse>
              <p>
                Der Austausch mit anderen Angehörigen kann enorm entlastend
                sein. Professionelle Beratungsstellen und Selbsthilfegruppen
                bieten Orientierung, praktische Tipps und das Gefühl, nicht
                allein zu sein.{" "}
                <Link href="/beratung" className="editorial-link">
                  Alle Beratungsangebote &amp; Netzwerke ansehen
                </Link>
                .
              </p>
            </EditorialProse>
            <AngehoerigenBeratung />
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 9 Materialien ── SelbstfuersorgeInfografikenSection */}
      <SelbstfuersorgeInfografikenSection />

      {/* ── 10 Group E: In der Rolle ── role-notes */}
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
            In der Rolle
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <SelbstfuersorgeRoleNotesSection />
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 11 Group F: Forschungsstand ── EvidenceNote */}
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
          <EvidenceNote
            variant="editorial"
            title="Worauf stützt sich das?"
            definition="Die Hinweise auf dieser Seite verbinden Forschung zu Belastung und Regeneration mit klinischer Erfahrung aus der Angehörigenarbeit."
            sources={[
              {
                label:
                  "Angehörige von Menschen mit BPS berichten in Studien häufig von erhöhter Belastung und Erschöpfung (u. a. Hoffman et al., 2005)",
                type: "wissenschaft",
              },
              {
                label:
                  "Atemübungen und andere kurze Regulationsübungen können helfen, akute Anspannung im Körper zu senken (u. a. Zaccaro et al., 2018)",
                type: "wissenschaft",
              },
              {
                label:
                  "Soziale Unterstützung gilt als wichtiger Schutzfaktor gegen Überlastung und Erschöpfung (u. a. Maslach & Leiter, 2016)",
                type: "wissenschaft",
              },
            ]}
          />
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 12 Weiter-Hinweis ── */}
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
              Selbstfürsorge ist kein Soloprojekt — sie wird tragfähiger, wenn
              Materialien und Beratung mitgedacht sind:{" "}
              <Link href="/materialien" className="editorial-link">
                alle Materialien ansehen
              </Link>
              . Zurück geht es zu{" "}
              <Link href="/grenzen" className="editorial-link">
                Grenzen setzen
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 13 Querverweise ── EditorialSection variant="cream-deep" */}
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
                href: "/materialien",
                title: "Materialien & Handouts",
                description:
                  "Infografiken und Spickzettel zur Selbstfürsorge und Belastung – als PDF.",
              },
              {
                href: "/beratung",
                title: "Beratung & Netzwerke",
                description:
                  "Professionelle Unterstützung und Selbsthilfegruppen für Angehörige.",
              },
              {
                href: "/grenzen",
                title: "Grenzen setzen",
                description:
                  "Selbstfürsorge beginnt oft mit klaren Grenzen: Warnsignale, Priorisierung und Konsequenz.",
              },
            ]}
          />
        </EditorialSection.Body>
      </EditorialSection>
    </Layout>
  );
}
