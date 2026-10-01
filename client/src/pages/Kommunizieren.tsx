import TopicQuickLinks from "@/components/TopicQuickLinks";
import ContentSection from "@/components/ContentSection";
import {
  DisplayHeading,
  EditorialProse,
  EditorialPullQuote,
  EditorialSection,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import AngehoerigenIllustration from "@/components/AngehoerigenIllustration";
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

export default function Kommunizieren() {
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
            Gespräch und Verbindung
          </span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel className="mb-3" spacing="compact">
            Kommunizieren
          </EyebrowLabel>
          <DisplayHeading level={1} size="topic">
            Zugewandt und klar <em>kommunizieren</em>
          </DisplayHeading>
          <Lede className="max-w-[30em]">
            Konkrete Sätze können Gespräche erleichtern. Sie dürfen dabei Ihre
            Sicht vertreten, Pausen machen und Grenzen setzen.
          </Lede>
          <TopicQuickLinks
            items={[
              { href: "#eskalation", label: "Wenn ein Gespräch kippt" },
              { href: "#haltung", label: "Haltung" },
              { href: "#validierung", label: "Validierung" },
              { href: "#situationen", label: "Typische Situationen" },
            ]}
          />
          <div
            className="mt-8 border-t pt-3"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <EyebrowLabel spacing="compact">
              Vollständig ca. 14 Min · Auch abschnittweise lesbar
            </EyebrowLabel>
          </div>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <AngehoerigenIllustration
            name="zuhoeren-v1"
            alt="Zwei Erwachsene wenden sich im Gespräch einander zu."
            caption="Zuhören, nachfragen und die eigene Sicht behalten dürfen gleichzeitig möglich sein."
            eager
          />
        </EditorialSection.Aside>
      </EditorialSection>

      {/* ── 2 Intro: Was auf dieser Seite besonders wichtig ist ── */}
      <EditorialSection variant="cream" density="compact">
        <EditorialSection.Body>
          <ul className="topic-takeaways">
            <li>
              Sie können Gefühle anerkennen, ohne einer Aussage oder Forderung
              zuzustimmen.
            </li>
            <li>
              Kurze Sätze und Pausen können helfen; eine bestimmte Reaktion
              lässt sich nicht garantieren.
            </li>
            <li>Bei Bedrohung oder Gewalt geht Schutz vor Gesprächsführung.</li>
          </ul>
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
            collapsible={false}
            title="Kommunikation beginnt nicht mit Technik"
            id="haltung"
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
                Sie dürfen zuhören, nachfragen oder eine Pause machen. Ihre
                eigenen Anliegen bleiben dabei wichtig.
              </EditorialPullQuote>
            </div>
          </ContentSection>

          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Validierung: der wichtigste Ausgangspunkt"
            id="validierung"
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
            <EditorialProse>
              <p>
                <strong>Jetzt beruhigen, später klären:</strong> In einem
                angespannten Moment geht es zunächst um Sicherheit und eine
                mögliche Pause. Das verpflichtet Sie nicht, Forderungen zu
                erfüllen oder verletzendes Verhalten hinzunehmen. Absprachen und
                Folgen können später besprochen werden, wenn es sicher und
                ruhiger ist. Ob ein Muster bestehen bleibt, hängt von vielen
                Faktoren ab; Deeskalation macht Sie dafür nicht verantwortlich.
              </p>
            </EditorialProse>
          </ContentSection>

          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Timing ist oft wichtiger als der perfekte Satz"
            id="timing"
          >
            <div className="mt-2 grid gap-8 sm:grid-cols-2">
              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontSize: "var(--text-md)",
                    fontWeight: 600,
                    color: "var(--fg-primary)",
                  }}
                >
                  Eher jetzt
                </h3>
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
                <h3
                  className="mb-3"
                  style={{
                    fontSize: "var(--text-md)",
                    fontWeight: 600,
                    color: "var(--fg-primary)",
                  }}
                >
                  Eher später
                </h3>
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

          <KommunizierenEscalationSection collapsible={false} />

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
