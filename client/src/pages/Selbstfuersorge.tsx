import { useCallback } from "react";
import ContentSection from "@/components/ContentSection";
import {
  EditorialProse,
  EditorialPullQuote,
  EditorialSection,
} from "@/components/editorial";
import EvidenceNote from "@/components/EvidenceNote";
import { SchaleIllustration } from "@/components/illustrations";
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

      {/* ── 1 Hero ── EditorialSection mit SchaleIllustration als Aside */}
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
            Belastung und Schutz
          </span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
              marginBottom: "var(--space-5)",
            }}
          >
            Selbstfürsorge
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: "var(--text-hero)",
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
              marginBottom: "var(--space-5)",
            }}
          >
            Selbstfürsorge für <em>Angehörige</em> — was trägt, wenn die
            Belastung bleibt.
          </h1>
          <p
            className="max-w-[30em]"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Wer dauerhaft mit Krisen und Loyalitätskonflikten lebt, braucht
            eigene Regeneration – nicht als Luxus, sondern als Grundlage.
          </p>
          <div
            className="mt-8 border-t pt-3"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <p
              className="text-xs uppercase"
              style={{
                color: "var(--accent-label)",
                letterSpacing: "var(--tracking-caps)",
                fontWeight: 500,
              }}
            >
              Vollständig ca. 12 Min · Auch abschnittweise lesbar
            </p>
          </div>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <SchaleIllustration
            ariaLabel="Eine offene Schale, die etwas hält ohne zu greifen — selbst tragend, selbst geformt."
            className="ml-auto block aspect-square w-full max-w-[560px]"
          />
        </EditorialSection.Aside>
      </EditorialSection>

      {/* ── 2 Pull-Quote (dominant, eigene Sektion) ── */}
      <EditorialSection variant="cream">
        <EditorialSection.Body>
          <EditorialPullQuote>
            «Viele Angehörige merken erst spät, wie erschöpft sie geworden sind.
            Selbstfürsorge beginnt damit, die eigene Belastung überhaupt ernst
            zu nehmen.»
          </EditorialPullQuote>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 3 Intro: Was auf dieser Seite besonders trägt ── */}
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
            Kernfrage
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
              marginBottom: "var(--space-4)",
            }}
          >
            Überblick
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-2xl)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
              letterSpacing: "var(--tracking-tight)",
              marginBottom: "var(--space-5)",
            }}
          >
            Was auf dieser Seite besonders trägt
          </h2>
          <EditorialProse>
            <p>
              Diese Seite versteht Selbstfürsorge nicht als Extra für gute Tage,
              sondern als Schutzfaktor in einem dauerhaft fordernden
              Angehörigenalltag. Im Zentrum stehen Warnsignale, kurze
              Regulierung und die Erlaubnis, Ihre eigenen Grenzen ernst zu
              nehmen.
            </p>
            <p>
              Drei Akzente ziehen sich durch die Seite: zuerst Belastung ernst
              nehmen — Selbstfürsorge beginnt oft nicht mit mehr Disziplin,
              sondern mit ehrlicher Wahrnehmung von Erschöpfung und Druck; dann
              früher gegensteuern — Warnsignale, kurze Pausen und kleine
              Regulationsschritte helfen oft mehr als spätes Durchhalten bis zur
              Überlastung; und schliesslich nicht allein tragen — Entlastung
              entsteht leichter, wenn Sie Verantwortung, Beratung und Rückhalt
              mitdenken statt alles selbst zu halten.
            </p>
            <p>
              Sie können auch direkt zu{" "}
              <a
                href="#warnsignale"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "warnsignale")}
              >
                Warnsignalen
              </a>
              ,{" "}
              <a
                href="#sofort-uebungen"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "sofort-uebungen")}
              >
                Sofort-Übungen
              </a>
              ,{" "}
              <a
                href="#erlaubnis"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "erlaubnis")}
              >
                Erlaubnis geben
              </a>{" "}
              oder{" "}
              <a
                href="#beratung-netzwerke"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "beratung-netzwerke")}
              >
                Beratung &amp; Netzwerke
              </a>{" "}
              springen.
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 4 Group A: Ausgangspunkt ── warum-wichtig */}
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
            title="Warum Selbstfürsorge so wichtig ist"
            id="selbstfuersorge-warum-wichtig"
            defaultOpen={true}
            preview="Angehörige tragen eine besondere Last. Selbstfürsorge ist keine Selbstsucht, sondern Selbsterhaltung."
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

      {/* ── 5 Group B: Signale wahrnehmen ── signals + check */}
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
          <SelbstfuersorgeSignalsSection />
          <SelbstfuersorgeCheck />
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 6 Group C: Was hilft ── exercises + radikale + erlaubnis
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
          <SelbstfuersorgeExercisesSection />

          <ContentSection
            variant="editorial"
            title="Radikale Akzeptanz"
            id="radikale-akzeptanz"
            preview="«Es ist, wie es ist.» – Dieses DBT-Konzept kann auch für Angehörige befreiend sein."
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
                <h4 className="mb-2" style={h4Style}>
                  Was radikale Akzeptanz NICHT ist
                </h4>
                <ul className="ml-5 list-disc space-y-1" style={bodyStyle}>
                  <li>Aufgeben</li>
                  <li>Gutheissen</li>
                  <li>Passivität</li>
                  <li>Resignation</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2" style={h4Style}>
                  Was radikale Akzeptanz IST
                </h4>
                <ul className="ml-5 list-disc space-y-1" style={bodyStyle}>
                  <li>Anerkennen, was Sie nicht ändern können</li>
                  <li>Energie sparen für das, was Sie beeinflussen können</li>
                  <li>Inneren Frieden finden trotz äusserer Turbulenzen</li>
                  <li>Loslassen von «Es sollte anders sein»</li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="mb-3" style={h4Style}>
                Übung: Radikale Akzeptanz praktizieren
              </h4>
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
            title="Geben Sie sich die Erlaubnis"
            id="erlaubnis"
            preview="Als Angehöriger dürfen Sie auch mal wütend sein, Nein sagen und Ihre eigenen Bedürfnisse ernst nehmen."
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

      {/* ── 7 Group D: Nicht allein tragen ── beratung-netzwerke
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
            title="Beratung & Netzwerke"
            id="beratung-netzwerke"
            preview="Sie müssen das nicht allein tragen – professionelle Beratung und Austausch mit anderen Angehörigen helfen."
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
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 8 Materialien ── SelbstfuersorgeInfografikenSection */}
      <SelbstfuersorgeInfografikenSection />

      {/* ── 9 Group E: In der Rolle ── role-notes */}
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

      {/* ── 10 Group F: Forschungsstand ── EvidenceNote */}
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

      {/* ── 11 Weiter-Hinweis ── */}
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

      {/* ── 12 Querverweise ── EditorialSection variant="cream-deep" */}
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
