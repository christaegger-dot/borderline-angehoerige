import { useCallback } from "react";
import ContentSection from "@/components/ContentSection";
import {
  EditorialProse,
  EditorialPullQuote,
  EditorialSection,
} from "@/components/editorial";
import { FadenIllustration } from "@/components/illustrations";
import ValidierungsStufenleiter from "@/components/interactive/ValidierungsStufenleiter";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import { TableOfContents } from "@/components/UXEnhancements";
import KommunizierenMaterialsSection from "@/sections/KommunizierenMaterialsSection";
import {
  KommunizierenEscalationSection,
  KommunizierenRolesSection,
  KommunizierenSituationsSection,
} from "@/sections/KommunizierenPatternSections";
import { Link } from "wouter";

/** Öffnet eine ContentSection via Custom Event und scrollt dorthin. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

export default function Kommunizieren() {
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      openSection(sectionId);
    },
    []
  );

  return (
    <Layout>
      <SEO
        title="Kommunizieren"
        description="Kommunikation für Angehörige: Validierung, Timing, Deeskalation und klare Sprache in belasteten Gesprächen."
        path="/kommunizieren"
      />
      <MedicalPageSchema
        title="Kommunizieren"
        description="Kommunikation für Angehörige: Validierung, Timing, Deeskalation und klare Sprache in belasteten Gesprächen."
        path="/kommunizieren"
      />
      <TableOfContents />

      {/* ── 1 Hero ── EditorialSection mit FadenIllustration als Aside */}
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
            Gespräch und Verbindung
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
            Kommunizieren
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
            Gespräche in <em>belasteten Beziehungen</em> — wie Verbindung
            möglich bleibt.
          </h1>
          <p
            className="max-w-[30em]"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Kommunikation löst keine Grunddynamik – sie kann aber Eskalation
            bremsen und Ihre eigene Position klärer machen.
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
              Vollständig ca. 14 Min · Auch abschnittweise lesbar
            </p>
          </div>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <FadenIllustration
            ariaLabel="Ein dünner Faden, der zwischen zwei Punkten gespannt ist und trotz Belastung trägt."
            className="ml-auto block w-full max-w-[560px] min-h-[320px] md:min-h-[380px]"
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
            Kernhaltung
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
            Was auf dieser Seite besonders wichtig ist
          </h2>
          <EditorialProse>
            <p>
              Diese Seite ordnet Kommunikation nicht als Sammlung kluger
              Formulierungen, sondern als Beziehungsregulation unter Belastung
              ein. Relevant sind vor allem Timing, Validierung, Begrenzung und
              die Frage, ob überhaupt schon Gesprächsraum da ist.
            </p>
            <p>
              Drei Akzente ziehen sich durch die Seite: zuerst die Frage, ob
              Haltung, Tempo und Präsenz schon stehen — gelungene Gespräche
              beginnen meist nicht mit dem perfekten Satz, sondern mit innerer
              Klarheit; dann Validierung als belastbarer Ausgangspunkt, also das
              Erleben des Gegenübers ernst nehmen, ohne automatisch zuzustimmen;
              und schliesslich Vereinfachung in Eskalationsmomenten — weniger
              Inhalt, weniger Verteidigung, klarere Grenzen, damit das Gespräch
              regulierbar bleibt.
            </p>
            <p>
              Sie können auch direkt zu{" "}
              <a
                href="#haltung"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "haltung")}
              >
                Haltung
              </a>
              ,{" "}
              <a
                href="#validierung"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "validierung")}
              >
                Validierung
              </a>
              ,{" "}
              <a
                href="#eskalation"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "eskalation")}
              >
                Eskalation
              </a>{" "}
              oder{" "}
              <a
                href="#situationen"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "situationen")}
              >
                Typische Situationen
              </a>{" "}
              springen.
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 3 Body-Sektionen ── EditorialSection mit MarginNote «GESPRÄCHSTECHNIKEN» */}
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
            Gesprächstechniken
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
            title="Kommunikation beginnt nicht mit Technik"
            id="haltung"
            defaultOpen={true}
            preview="Viele Gespräche scheitern nicht nur am Wortlaut, sondern daran, dass beide Seiten bereits im Alarmzustand, in Rechtfertigung oder in Kränkung sprechen."
          >
            <EditorialProse>
              <p>
                In belasteten Beziehungen kippt Kommunikation oft schnell in
                Verteidigung, Beschuldigung, Rückzug oder Übererklärung. Dann
                ist die Frage nicht nur, welcher Satz «richtig» wäre, sondern ob
                überhaupt schon ein Moment für Gespräch da ist.
              </p>
            </EditorialProse>
            <div className="mt-5">
              <EditorialPullQuote>
                Hilfreiche Kommunikation ist meist kürzer, langsamer und klarer.
                Sie versucht nicht sofort zu überzeugen, sondern zuerst
                Beziehungsspannung etwas zu senken.
              </EditorialPullQuote>
            </div>
          </ContentSection>

          <ContentSection
            variant="editorial"
            title="Validierung: der wichtigste Ausgangspunkt"
            id="validierung"
            preview="Validierung heisst nicht zustimmen. Sie signalisiert: Ich nehme dein Erleben ernst, auch wenn ich nicht jede Sichtweise teile."
          >
            <EditorialProse>
              <p>
                <strong>Validierung</strong> bedeutet, dass Sie das Erleben
                Ihres Gegenübers als nachvollziehbar behandeln, ohne jeden
                Vorwurf, jede Interpretation oder jedes Verhalten zu bestätigen.
              </p>
              <p>
                In Beziehungen mit Borderline ist das oft deshalb so wichtig,
                weil Nichtgesehenwerden, Kränkung oder Unklarheit rasch
                zusätzlichen Druck erzeugen. Validierung kann diesen Druck etwas
                senken und den Boden für spätere Klärung bereiten.
              </p>
            </EditorialProse>
            <ValidierungsStufenleiter />
            <EditorialProse>
              <p>
                <strong>Ein hilfreicher innerer Satz für Angehörige:</strong>{" "}
                Ich muss nicht recht bekommen, um zuerst zu zeigen, dass ich den
                Schmerz wahrnehme.
              </p>
            </EditorialProse>
          </ContentSection>

          <ContentSection
            variant="editorial"
            title="Timing ist oft wichtiger als der perfekte Satz"
            id="timing"
            preview="Viele Gespräche scheitern daran, dass Inhalte zu früh geklärt werden sollen, während Anspannung, Scham oder Wut noch den ganzen Raum füllen."
          >
            <div className="mt-2 grid gap-8 sm:grid-cols-2">
              <div>
                <h4
                  className="mb-3"
                  style={{
                    fontSize: "var(--text-md)",
                    fontWeight: 600,
                    color: "var(--fg-primary)",
                  }}
                >
                  Eher jetzt
                </h4>
                <ul
                  className="space-y-2"
                  style={{
                    fontSize: "var(--text-sm)",
                    lineHeight: "var(--lh-relaxed)",
                    color: "var(--fg-secondary)",
                  }}
                >
                  <li>kurz spiegeln, was Sie wahrnehmen</li>
                  <li>Ton und Tempo beruhigen</li>
                  <li>klare Begrenzung bei Beschimpfung oder Druck</li>
                  <li>vorschlagen, später weiterzureden</li>
                </ul>
              </div>
              <div>
                <h4
                  className="mb-3"
                  style={{
                    fontSize: "var(--text-md)",
                    fontWeight: 600,
                    color: "var(--fg-primary)",
                  }}
                >
                  Eher später
                </h4>
                <ul
                  className="space-y-2"
                  style={{
                    fontSize: "var(--text-sm)",
                    lineHeight: "var(--lh-relaxed)",
                    color: "var(--fg-secondary)",
                  }}
                >
                  <li>Fakten prüfen und Missverständnisse sortieren</li>
                  <li>Konsequenzen besprechen</li>
                  <li>grössere Beziehungsfragen klären</li>
                  <li>lange Erklärungen oder Rechtfertigungen</li>
                </ul>
              </div>
            </div>
          </ContentSection>

          <KommunizierenEscalationSection />

          <KommunizierenSituationsSection />

          <KommunizierenRolesSection />
        </EditorialSection.Body>
      </EditorialSection>

      <KommunizierenMaterialsSection />

      {/* ── 4 Weiter-Hinweis ── EditorialSection mit «Weiter»-MarginNote */}
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
              Wenn Kommunikation als Beziehungsregulation gelesen wird, wird
              sichtbar, wo Validierung hilft und wo Begrenzung nötig ist —{" "}
              <Link href="/grenzen" className="editorial-link">
                weiter zu Grenzen setzen
              </Link>
              . Zurück geht es zur{" "}
              <Link href="/unterstuetzen/uebersicht" className="editorial-link">
                Unterstützen-Übersicht
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 5 Querverweise ── EditorialSection variant="cream-deep" */}
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
                href: "/grenzen",
                title: "Grenzen setzen",
                description:
                  "Wie Sie klare, tragfähige Grenzen formulieren und auch einhalten können.",
              },
              {
                href: "/materialien",
                title: "Materialien & Handouts",
                description:
                  "Infografiken und Spickzettel zur Kommunikation – als PDF zum Mitnehmen.",
              },
              {
                href: "/selbstfuersorge",
                title: "Selbstfürsorge",
                description:
                  "Warnsignale, Sofort-Übungen und die Erlaubnis, die eigene Belastung ernst zu nehmen.",
              },
            ]}
          />
        </EditorialSection.Body>
      </EditorialSection>
    </Layout>
  );
}
