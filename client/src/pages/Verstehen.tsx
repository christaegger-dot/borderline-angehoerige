/**
 * Verstehen — Editorial-Redesign Phase 4 (Brief 27.04.2026)
 *
 * Referenz-Implementation für Tier-1-Migration. Inhalt unverändert
 * gegenüber alter Version (ausser Hero-Lesezeitformulierung und Quick-
 * Link-Verbindungssatz — siehe PR-Body). Strukturelle Wechsel:
 * - Layout: EditorialLayout width="narrow" innerhalb des bestehenden
 *   <Layout>-Chrome-Wrappers
 * - Hero: editorial header (Caps-Kicker + H1 + Lead + Lesezeit-Zeile),
 *   kein Gradient, kein Icon, kein CTA
 * - Intro-Card-Trio: Variante A (prosaischer Fliesstext-Absatz)
 *   implementiert; Variante B (Liste mit H4-Lead-In) als Kommentarblock
 * - Quick-Link-Karten: Inline-Link-Absatz mit Anchor-IDs
 * - ContentSection: variant="editorial" (kein Icon, hairline-Trenner)
 * - Inline-Karten-Pattern: zu Spalten-Fliesstext mit H4-Titeln
 * - Pull-Quote: EditorialPullQuote
 * - EvidenceNote: variant="editorial"
 * - Buttons im Lesefluss: Inline-Links mit .editorial-link
 * - motion-Wrapper (nur Fade-In/Slide-In): entfernt
 * - RelatedLinks → RelatedLinksEditorial (keine Icons, hairline-Liste)
 * - InvitationSection: entfernt (Beratungseinladung lebt auf Home)
 *
 * Out of scope dieser PR (sichtbarer Bruch): die importierten Sub-
 * Komponenten VerstehenRelationshipSection / VerstehenMeaningSection /
 * VerstehenDiagnosticSection / VerstehenMaterialsSection sind weiterhin
 * Card-basiert. Migration der Sub-Sektionen folgt im nächsten Schritt.
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
import VerstehenMaterialsSection from "@/sections/VerstehenMaterialsSection";
import {
  VerstehenDiagnosticSection,
  VerstehenMeaningSection,
  VerstehenRelationshipSection,
} from "@/sections/VerstehenSupportSections";
import { Link } from "wouter";

/*
 * INTRO-CARD-TRIO — VARIANTE B (zur Auswahl im Review)
 *
 * Statt prosaischem Fliesstext-Absatz (Variante A unten) eine
 * ungeordnete Liste mit fettem H4-Lead-In pro Punkt:
 *
 *   <ul class="space-y-4">
 *     <li>
 *       <h4 class="font-semibold">Belastung einordnen.</h4>
 *       <p>Ambivalenz, Alarm, Erschöpfung und Loyalitätsdruck als
 *          typische Angehörigenrealität lesen.</p>
 *     </li>
 *     <li>
 *       <h4 class="font-semibold">Dynamiken verstehen.</h4>
 *       <p>Überflutung, Bindungsstress und Denkverengung besser
 *          erkennen, statt nur auf sichtbare Reaktionen zu schauen.</p>
 *     </li>
 *     <li>
 *       <h4 class="font-semibold">Muster sehen.</h4>
 *       <p>Wiederkehrende Schleifen aus Eskalation, Rückzug und Schuld
 *          nüchterner lesen und benennen.</p>
 *     </li>
 *   </ul>
 *
 * Christa entscheidet pro Page (Brief 27.04. Punkt 2 zur Klärung):
 * Variante A wirkt prosaischer und integriert besser; Variante B ist
 * scannbarer für Eilige.
 */

/** Öffnet eine ContentSection via Custom Event und scrollt dorthin. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

export default function Verstehen() {
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
        title="Borderline verstehen"
        description="Borderline aus Sicht von Angehörigen verstehen: Beziehungsdynamik, Überflutung, Nähe-Distanz und hilfreiche Einordnung."
        path="/verstehen"
      />
      <TableOfContents />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-20 pt-16 md:pb-28 md:pt-24">
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Verstehen
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
            Borderline <em>verstehen</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Für Angehörige ist Borderline oft nicht nur schwer zu begreifen,
            sondern schwer auszuhalten – Situationen kippen, Reaktionen wirken
            widersprüchlich, die eigene Rolle bleibt unklar.
          </p>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Vollständig ca. 15 Min · Auch abschnittweise lesbar.
          </p>
        </header>

        {/* ── Intro: Worum es hier vor allem geht (Variante A) ── */}
        <EditorialSection
          label="Überblick"
          title="Worum es hier vor allem geht"
        >
          <EditorialProse>
            <p>
              Diese Seite erklärt Borderline nicht als Etikett, sondern als
              Belastungsdynamik in Beziehungen. Entscheidend ist meist nicht
              nur, was sichtbar passiert, sondern was darunter an Überflutung,
              Bindungsstress, Scham oder Alarm mitläuft.
            </p>
            <p>
              Drei Lesarten ziehen sich durch die Abschnitte: die eigene
              Belastung als Angehörigenrealität einordnen – Ambivalenz, Alarm,
              Erschöpfung und Loyalitätsdruck als typische Erfahrung, nicht als
              persönliches Versagen; die Dynamiken besser verstehen, also
              Überflutung, Bindungsstress und Denkverengung erkennen, statt nur
              auf sichtbare Reaktionen zu schauen; und wiederkehrende Muster
              nüchterner sehen, als Schleifen aus Eskalation, Rückzug und
              Schuld, nicht als Charakterurteil.
            </p>
            <p>
              Sie können auch direkt zu{" "}
              <a
                href="#angehoerige-erleben"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "angehoerige-erleben")}
              >
                Was Angehörige oft erleben
              </a>
              ,{" "}
              <a
                href="#was-ist-borderline"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "was-ist-borderline")}
              >
                Was Borderline im Kern so belastend macht
              </a>{" "}
              oder{" "}
              <a
                href="#muster"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "muster")}
              >
                Typische Muster
              </a>{" "}
              springen.
            </p>
          </EditorialProse>
        </EditorialSection>

        {/* ── Pull-Quote ── */}
        <EditorialSection rule>
          <EditorialPullQuote cite="— Eine Angehörige (Kompositum, keine reale Person)">
            «Verstehen hat mir nicht alles leichter gemacht. Aber ich habe
            aufgehört, jede Eskalation nur als Bosheit, jede Distanz nur als
            Ablehnung und jede Krise nur als mein persönliches Versagen zu
            lesen.»
          </EditorialPullQuote>
        </EditorialSection>

        {/* ── ContentSection × 6 (editorial variant) ── */}
        <ContentSection
          variant="editorial"
          title="Was Angehörige oft erleben"
          id="angehoerige-erleben"
          defaultOpen={true}
          preview="Viele Angehörige erleben nicht nur schwierige Gespräche, sondern ein ständiges Schwanken zwischen Nähe, Alarm, Hoffnung, Wut, Schuld und Erschöpfung."
        >
          <EditorialProse>
            <p>
              Für Angehörige wirkt Borderline oft widersprüchlich: Nähe kann
              sehr intensiv werden und kurz darauf in Angriff, Rückzug oder
              Funkstille kippen. Eine Beziehung kann sich gleichzeitig
              bedeutsam, erschöpfend, zart und bedrohlich anfühlen.
            </p>
            <p>
              Viele Angehörige schwanken deshalb nicht nur zwischen Mitgefühl
              und Hilfsbereitschaft, sondern auch zwischen Angst, Wut,
              Selbstzweifel, Loyalität und dem Wunsch nach Abstand. Diese
              Ambivalenz ist nicht Ausdruck mangelnder Liebe, sondern oft Teil
              der Belastungsrealität.
            </p>
            <p>
              <strong>Wichtig:</strong> Verstehen kann entlasten, weil es Muster
              einordnen hilft. Es ersetzt aber weder Grenzsetzung noch
              Selbstschutz noch professionelle Hilfe.
            </p>
          </EditorialProse>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Was Borderline im Kern so belastend macht"
          id="was-ist-borderline"
          preview="Borderline ist kein einzelnes Verhalten, sondern ein Muster aus starker innerer Anspannung, erschwerter Emotionsregulation und instabilem Beziehungserleben."
        >
          <EditorialProse>
            <p>
              Die Borderline-Persönlichkeitsstörung ist ein komplexes
              Störungsbild. Typisch sind starke emotionale Reagibilität,
              Schwierigkeiten mit innerer Stabilität und ein Beziehungserleben,
              das unter Bindungsstress schnell ins Wanken geraten kann.
            </p>
            <p>
              Nicht alle Menschen mit Borderline zeigen dieselben Muster. Manche
              wirken vor allem impulsiv und explosiv, andere eher verzweifelt,
              zurückgezogen, leer oder selbstabwertend. Ausprägung, Verlauf und
              Belastung unterscheiden sich deutlich.
            </p>
            <p>
              Für Angehörige ist vor allem wichtig: Hinter heftigen Reaktionen
              liegen oft Überflutung, Angst, Scham oder Verlassenheitsstress.
              Das macht Verhalten nicht folgenlos, hilft aber, es genauer
              einzuordnen.
            </p>
          </EditorialProse>
          <EvidenceNote
            variant="editorial"
            title="Quellen zur diagnostischen und klinischen Einordnung"
            definition="Die Störung zeigt je nach Person unterschiedliche Ausprägungen. Für Angehörige ist vor allem relevant, dass Bindungsstress, Affektregulation und Scham-/Überflutungserleben klinisch gut beschrieben sind."
            reviewDate="24.03.2026"
            sources={[
              {
                label: "WHO ICD-11: Borderline pattern specifier (6D11.5)",
                href: "https://icd.who.int/browse/2025-01/mms/en#2006821354",
                type: "wissenschaft",
              },
              {
                label:
                  "APA Practice Guideline for the Treatment of Patients With Borderline Personality Disorder (2024)",
                href: "https://pubmed.ncbi.nlm.nih.gov/39482953/",
                type: "wissenschaft",
              },
              {
                label:
                  "Linehan, Cognitive-Behavioral Treatment of Borderline Personality Disorder",
                type: "wissenschaft",
                note: "Grundlagenwerk zu Emotionsregulation und Bindungsstress",
              },
            ]}
          />
        </ContentSection>

        <VerstehenRelationshipSection />

        <ContentSection
          variant="editorial"
          title="Scham, Wut und innere Überflutung"
          id="scham-wut"
          preview="Wut ist oft sichtbar. Darunter liegen nicht selten Scham, Angst, Kränkung, Leere oder der Versuch, unerträgliche Spannung loszuwerden."
        >
          <EditorialProse>
            <p>
              Angehörige erleben Wut oft als das dominierende Thema. Sie ist
              laut, verletzend und schwer zu übersehen. Gleichzeitig ist Wut bei
              Borderline häufig nicht der ganze Kern, sondern eher eine Reaktion
              auf tiefer liegende Zustände wie Scham, Verlassenheitsangst,
              Ohnmacht oder innere Leere.
            </p>
            <p>
              Scham spielt dabei eine besonders grosse Rolle. Wer sich tief
              beschämt, blossgestellt oder innerlich wertlos fühlt, reagiert
              leichter mit Angriff, Rückzug, Selbstentwertung oder abruptem
              Kontaktabbruch. Für Angehörige wirkt das oft hart und kalt,
              innerlich ist es nicht selten hochverletzlich.
            </p>
          </EditorialProse>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <h4
                className="mb-3"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                Was sichtbar werden kann
              </h4>
              <ul
                className="space-y-1"
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-secondary)",
                }}
              >
                <li>Wutausbruch oder Vorwurf</li>
                <li>Rückzug oder Schweigen</li>
                <li>Abwertung oder Beziehungsabbruch</li>
                <li>Selbstverletzung oder Impulsdurchbruch</li>
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
                Was darunter liegen kann
              </h4>
              <ul
                className="space-y-1"
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-secondary)",
                }}
              >
                <li>Scham und Kränkung</li>
                <li>Angst vor Verlust oder Abwertung</li>
                <li>innere Leere oder Überflutung</li>
                <li>das Gefühl, nicht mehr regulieren zu können</li>
              </ul>
            </div>
          </div>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Wenn Denken unter Stress enger wird"
          id="stressmodus"
          preview="Unter starker Anspannung werden Grautöne, Perspektivenwechsel und logische Einordnung oft schlechter erreichbar."
        >
          <EditorialProse>
            <p>
              Unter hoher emotionaler Überflutung verengt sich das Erleben
              häufig stark auf den aktuellen Schmerz, die aktuelle Angst oder
              den aktuellen Konflikt. Dann verlieren Menschen leichter den
              Zugang zu Grautönen, Beziehungsgeschichte und nüchterner
              Einordnung.
            </p>
            <h4
              className="mt-6"
              style={{
                fontSize: "var(--text-md)",
                fontWeight: 600,
                color: "var(--fg-primary)",
              }}
            >
              Alarmmodus
            </h4>
            <p>
              Das innere Alarmsystem reagiert rasch und heftig. Neutrale Signale
              können leichter als Distanz, Kritik oder Bedrohung gelesen werden.
            </p>
            <h4
              className="mt-6"
              style={{
                fontSize: "var(--text-md)",
                fontWeight: 600,
                color: "var(--fg-primary)",
              }}
            >
              Tunnelblick
            </h4>
            <p>
              In diesem Zustand kommen Argumente, Erklärungen und Korrekturen
              oft kaum an. Hilfreicher ist meist zuerst Beruhigung, Orientierung
              und emotionale Anerkennung.
            </p>
            <h4
              className="mt-6"
              style={{
                fontSize: "var(--text-md)",
                fontWeight: 600,
                color: "var(--fg-primary)",
              }}
            >
              Dissoziation und Entfremdung
            </h4>
            <p>
              Unter starkem Stress können auch Unwirklichkeitsgefühle, innere
              Abspaltung oder das Gefühl auftreten, nicht mehr richtig präsent
              zu sein. Das ist für Betroffene wie Angehörige oft verstörend.
            </p>
            <p>
              <strong>Für Angehörige heisst das:</strong> Nicht zuerst
              überzeugen, sondern zuerst stabilisieren. Erst wenn die Anspannung
              sinkt, wird gemeinsames Denken eher wieder möglich.
            </p>
          </EditorialProse>
        </ContentSection>

        <ContentSection
          variant="editorial"
          title="Typische Muster in belasteten Beziehungen"
          id="muster"
          preview="Viele Angehörige berichten von wiederkehrenden Mustern. Diese können ähnlich aussehen, verlaufen aber nie bei allen gleich."
        >
          <EditorialProse>
            <p>
              Manche Beziehungen folgen über längere Zeit wiederkehrenden
              Schleifen: Eskalation, Rückzug, Wiederannäherung, Hoffnung, neue
              Spannung. Das ist kein starres Gesetz, aber ein Muster, das
              Angehörigen helfen kann, Entwicklungen nüchterner zu lesen.
            </p>
          </EditorialProse>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <h4
                className="mb-2"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                Idealisierung und Entwertung
              </h4>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-secondary)",
                }}
              >
                Eine Person kann zeitweise als einzig sicher und verstehend
                erlebt werden, kurz darauf aber als kalt, ungerecht oder
                gefährlich. Für Angehörige ist das oft tief verunsichernd.
              </p>
            </div>
            <div>
              <h4
                className="mb-2"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                Rückzug und Funkstille
              </h4>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-secondary)",
                }}
              >
                Nach Konflikten kann Schweigen, Abbruch oder Distanzierung
                folgen. Das ist nicht zwingend Gleichgültigkeit, für Angehörige
                aber oft besonders schwer auszuhalten.
              </p>
            </div>
            <div>
              <h4
                className="mb-2"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                Schuldspiralen
              </h4>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-secondary)",
                }}
              >
                Angehörige geben aus Angst oder Schuld nach, fühlen sich danach
                ausgenutzt, reagieren irgendwann härter und empfinden dann
                erneut Schuld. So entsteht ein Kreislauf, der beide Seiten
                belastet.
              </p>
            </div>
            <div>
              <h4
                className="mb-2"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                Nähe und Selbstschutz zugleich
              </h4>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-secondary)",
                }}
              >
                Viele Angehörige möchten bleiben und gleichzeitig Abstand.
                Gerade diese Ambivalenz verdient Ernstnahme statt moralische
                Bewertung.
              </p>
            </div>
          </div>
        </ContentSection>

        <VerstehenMeaningSection />

        <ContentSection
          variant="editorial"
          title="Verstehen hat Grenzen"
          id="grenzen-des-verstehens"
          preview="Verstehen ist wichtig. Es ersetzt aber weder Selbstschutz noch Grenzsetzung noch professionelle Hilfe."
        >
          <EditorialProse>
            <p>
              Verstehen bedeutet nicht, alles auszuhalten. Es bedeutet auch
              nicht, dass Sie jede Eskalation auffangen, jedes Verhalten korrekt
              einordnen oder jede Krise mit der richtigen Reaktion entschärfen
              könnten.
            </p>
            <p>
              Mitgefühl und Selbstschutz widersprechen sich nicht. Gerade in
              belasteten Beziehungen kann es verantwortungsvoll sein, Grenzen zu
              setzen, Distanz zu schaffen oder Hilfe von aussen einzubeziehen.
            </p>
            <p>
              <strong>Merksatz für Angehörige:</strong> Verstehen hilft, ruhiger
              und klarer zu handeln. Es verpflichtet Sie nicht dazu, sich selbst
              zu verlieren.
            </p>
          </EditorialProse>
        </ContentSection>

        <VerstehenDiagnosticSection />

        <VerstehenMaterialsSection />

        {/* ── Schluss-Sektion: Übergang zu Unterstützen ── */}
        <EditorialSection label="Weiter" rule>
          <EditorialProse>
            <p>
              Wenn Sie Dynamiken besser einordnen können, wird oft klarer, wie
              Sie hilfreicher reagieren, Grenzen besser halten und die eigene
              Belastung ernster nehmen können. Als Nächstes geht es darum, wie
              Unterstützung tragfähig bleiben kann, ohne dass Sie sich selbst
              verlieren —{" "}
              <Link href="/unterstuetzen/uebersicht" className="editorial-link">
                weiter zu Unterstützen
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSection>

        <RelatedLinksEditorial
          links={[
            {
              href: "/unterstuetzen/uebersicht",
              title: "Unterstützen",
              description:
                "Wie Sie konkret helfen können, ohne sich selbst zu verlieren – Alltag, Krise und Therapie.",
            },
            {
              href: "/kommunizieren",
              title: "Kommunizieren",
              description:
                "Gesprächsführung in belasteten Situationen: Deeskalation, Grenzsätze und die DEAR-Technik.",
            },
            {
              href: "/selbsttest",
              title: "Selbsttest: Wie belastet bin ich?",
              description:
                "Kurze Einschätzung Ihrer eigenen Belastung – als erster Orientierungsschritt.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
