import { useCallback } from "react";
import ContentSection from "@/components/ContentSection";
import { EditorialProse, EditorialSection } from "@/components/editorial";
import EvidenceNote from "@/components/EvidenceNote";
import { EisbergIllustration } from "@/components/illustrations";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import { TableOfContents } from "@/components/UXEnhancements";
import { quellenLinks } from "@/content/quellenLinks";
import VerstehenMaterialsSection from "@/sections/VerstehenMaterialsSection";
import {
  VerstehenDiagnosticSection,
  VerstehenMeaningSection,
  VerstehenRelationshipSection,
} from "@/sections/VerstehenSupportSections";
import { Link } from "wouter";

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
      <MedicalPageSchema
        title="Borderline verstehen"
        description="Borderline aus Sicht von Angehörigen verstehen: Beziehungsdynamik, Überflutung, Nähe-Distanz und hilfreiche Einordnung."
        path="/verstehen"
      />
      <TableOfContents />

      {/* ── 1 Hero ── EditorialSection mit EisbergIllustration als Aside */}
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span
            className="block text-[13px] font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.4,
              hyphens: "auto",
              overflowWrap: "break-word",
            }}
          >
            {/* Soft-hyphens als defensive Backup-Break-Points falls
                hyphens:auto-Hyphenation-Dictionary den Compound nicht bricht.
                Brechpunkte: Borderline-|Persönlich|keits|störung */}
            {"Borderline-Persönlich­keits­störung"}
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
            Verstehen
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
            <em>Borderline</em> verstehen, ohne die Distanz zu verlieren.
          </h1>
          <p
            className="max-w-[30em]"
            style={{
              fontSize: "1.375rem",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Für Angehörige ist Borderline oft nicht nur schwer zu begreifen,
            sondern schwer auszuhalten – Situationen kippen, Reaktionen wirken
            widersprüchlich, die eigene Rolle bleibt unklar.
          </p>
          <p
            className="mt-10 border-t pt-6 text-xs uppercase"
            style={{
              borderColor: "var(--rule-color)",
              color: "var(--fg-tertiary)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Vollständig ca. 15 Min · Auch abschnittweise lesbar
          </p>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <div
            className="ml-auto block aspect-square w-full max-w-[560px]"
            style={{
              filter: "drop-shadow(0 8px 24px rgba(91, 58, 78, 0.12))",
            }}
          >
            <EisbergIllustration
              className="block h-full w-full"
              ariaLabel="Eine Eisberg-Spitze über der Wasserlinie. Darunter eine grosse verborgene Form, die viel mehr ausmacht als die sichtbare Spitze."
            />
          </div>
        </EditorialSection.Aside>
      </EditorialSection>

      {/* ── 2 Worum es hier vor allem geht ── EditorialSection mit Kernthema-MarginNote */}
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
            Kernthema
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
            Worum es hier vor allem geht
          </h2>
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
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 3 Pull-Quote ── inline, typografisch aufgewertet als Lese-Pause */}
      <EditorialSection variant="cream">
        <EditorialSection.Body>
          <blockquote
            className="font-display italic"
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              lineHeight: 1.4,
              color: "var(--accent-primary)",
              paddingTop: "var(--space-7)",
              paddingBottom: "var(--space-3)",
              fontWeight: 400,
              maxWidth: "32em",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                color: "rgba(91, 58, 78, 0.25)",
                marginRight: "0.05em",
              }}
            >
              «
            </span>
            Verstehen hat mir nicht alles leichter gemacht. Aber ich habe
            aufgehört, jede Eskalation nur als Bosheit, jede Distanz nur als
            Ablehnung und jede Krise nur als mein persönliches Versagen zu
            lesen.
            <span
              aria-hidden="true"
              style={{
                color: "rgba(91, 58, 78, 0.25)",
                marginLeft: "0.05em",
              }}
            >
              »
            </span>
          </blockquote>
          <p
            className="mt-5 italic"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
              paddingBottom: "var(--space-7)",
            }}
          >
            — Eine Angehörige (Kompositum, keine reale Person)
          </p>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 4 Akkordeon (Leitfragen) ── 11 Items als Lese-Tiefe der Page */}
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
            Leitfragen
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
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
                <strong>Wichtig:</strong> Verstehen kann entlasten, weil es
                Muster einordnen hilft. Es ersetzt aber weder Grenzsetzung noch
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
                Schwierigkeiten mit innerer Stabilität und ein
                Beziehungserleben, das unter Bindungsstress schnell ins Wanken
                geraten kann.
              </p>
              <p>
                Nicht alle Menschen mit Borderline zeigen dieselben Muster.
                Manche wirken vor allem impulsiv und explosiv, andere eher
                verzweifelt, zurückgezogen, leer oder selbstabwertend.
                Ausprägung, Verlauf und Belastung unterscheiden sich deutlich.
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
                  href: quellenLinks.icd11,
                  type: "wissenschaft",
                },
                {
                  label:
                    "APA Practice Guideline for the Treatment of Patients With Borderline Personality Disorder (2024)",
                  href: quellenLinks.apa2024,
                  type: "wissenschaft",
                },
                {
                  label:
                    "Linehan, Cognitive-Behavioral Treatment of Borderline Personality Disorder",
                  href: quellenLinks.linehan1993,
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
                laut, verletzend und schwer zu übersehen. Gleichzeitig ist Wut
                bei Borderline häufig nicht der ganze Kern, sondern eher eine
                Reaktion auf tiefer liegende Zustände wie Scham,
                Verlassenheitsangst, Ohnmacht oder innere Leere.
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
                Das innere Alarmsystem reagiert rasch und heftig. Neutrale
                Signale können leichter als Distanz, Kritik oder Bedrohung
                gelesen werden.
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
                oft kaum an. Hilfreicher ist meist zuerst Beruhigung,
                Orientierung und emotionale Anerkennung.
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
                überzeugen, sondern zuerst stabilisieren. Erst wenn die
                Anspannung sinkt, wird gemeinsames Denken eher wieder möglich.
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
                  folgen. Das ist nicht zwingend Gleichgültigkeit, für
                  Angehörige aber oft besonders schwer auszuhalten.
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
                  Angehörige geben aus Angst oder Schuld nach, fühlen sich
                  danach ausgenutzt, reagieren irgendwann härter und empfinden
                  dann erneut Schuld. So entsteht ein Kreislauf, der beide
                  Seiten belastet.
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
                nicht, dass Sie jede Eskalation auffangen, jedes Verhalten
                korrekt einordnen oder jede Krise mit der richtigen Reaktion
                entschärfen könnten.
              </p>
              <p>
                Mitgefühl und Selbstschutz widersprechen sich nicht. Gerade in
                belasteten Beziehungen kann es verantwortungsvoll sein, Grenzen
                zu setzen, Distanz zu schaffen oder Hilfe von aussen
                einzubeziehen.
              </p>
              <p>
                <strong>Merksatz für Angehörige:</strong> Verstehen hilft,
                ruhiger und klarer zu handeln. Es verpflichtet Sie nicht dazu,
                sich selbst zu verlieren.
              </p>
            </EditorialProse>
          </ContentSection>

          <ContentSection
            variant="editorial"
            title="Häufige Mythen — und was realistischer ist"
            id="mythen-realitaet"
            preview="Viele Sätze über Borderline klingen eindeutig, greifen aber zu kurz. Eine realistischere Einordnung hilft Angehörigen, Betroffenen und Fachpersonen."
          >
            <EditorialProse>
              <h4
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Borderline ist nicht behandelbar.»
              </h4>
              <p>
                Realistischer ist: Borderline ist belastend, aber behandelbar.
                Viele Menschen erleben über Jahre deutliche Besserungen,
                Remission oder umfassendere Genesung — oft nicht geradlinig,
                aber gut dokumentiert. Mehr dazu auf{" "}
                <Link href="/genesung" className="editorial-link">
                  Genesung
                </Link>
                .
              </p>

              <h4
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Menschen mit Borderline manipulieren bewusst.»
              </h4>
              <p>
                Manche Verhaltensweisen können auf Angehörige manipulativ
                wirken. Hilfreicher ist aber oft die Frage, welche innere Not,
                Angst, Scham oder Überflutung darunter mitläuft. Das
                entschuldigt destruktives Verhalten nicht, macht es aber genauer
                lesbar. Mehr dazu auf{" "}
                <Link href="/kommunizieren" className="editorial-link">
                  Kommunizieren
                </Link>{" "}
                und{" "}
                <Link href="/grenzen" className="editorial-link">
                  Grenzen
                </Link>
                .
              </p>

              <h4
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Angehörige sind schuld.»
              </h4>
              <p>
                Borderline entsteht nicht durch eine einzelne Person und nicht
                durch «falsche Liebe». Angehörige können Beziehungsmuster
                entlasten oder belasten, sie verursachen die Störung aber nicht.
                Schuld hilft weder Verständnis noch Veränderung.
              </p>

              <h4
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Grenzen setzen ist lieblos.»
              </h4>
              <p>
                Grenzen sind kein Verrat, sondern oft die Voraussetzung dafür,
                dass Beziehung tragfähig bleibt. Sie schützen Sie selbst und
                schaffen mehr Orientierung als wechselnde Nachgiebigkeit.
              </p>

              <h4
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Borderline ist dasselbe wie Trauma.»
              </h4>
              <p>
                Viele Menschen mit Borderline haben traumatische Erfahrungen
                gemacht — das ist dokumentiert und klinisch relevant. Borderline
                und PTBS sind aber eigenständige Diagnosen mit unterschiedlichen
                Kernmerkmalen und Behandlungsansätzen. Eine PTBS-Diagnose allein
                erklärt nicht die emotionale Dysregulation, das instabile
                Selbstbild oder die Beziehungsmuster, die für Borderline
                charakteristisch sind. Beide Diagnosen können gleichzeitig
                vorliegen.{" "}
                <Link href="/begleiterkrankungen" className="editorial-link">
                  Begleiterkrankungen
                </Link>
                .
              </p>

              <h4
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Suizid direkt anzusprechen macht es schlimmer.»
              </h4>
              <p>
                Bei konkreter Sorge ist das Gegenteil hilfreicher: ruhig, klar
                und direkt fragen. Offenes Ansprechen erhöht das Risiko nicht,
                sondern zeigt, dass Sie die Lage ernst nehmen und Hilfe
                einbeziehen. Mehr dazu auf{" "}
                <Link href="/soforthilfe" className="editorial-link">
                  Soforthilfe
                </Link>
                .
              </p>

              <h4
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Wenn jemand bei anderen stabiler wirkt, spielt er oder sie
                nur.»
              </h4>
              <p>
                Enge Beziehungen aktivieren oft genau die Muster, die bei
                Fremden weniger sichtbar sind. Mehr Stabilität in anderen
                Kontexten ist deshalb nicht automatisch Täuschung, sondern kann
                Ausdruck unterschiedlicher Bindungsbelastung sein.
              </p>

              <h4
                className="mt-6"
                style={{
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                }}
              >
                «Borderline betrifft nur Frauen.»
              </h4>
              <p>
                Borderline kommt bei allen Geschlechtern vor — klinisch werden
                Frauen häufiger diagnostiziert. Männer suchen teilweise später
                Hilfe oder werden mit anderen Problembildern gelesen, etwa
                Substanzkonsum, Wut oder Rückzug. Angehörige männlicher
                Betroffener sind hier ausdrücklich mit gemeint.
              </p>
            </EditorialProse>
            <EvidenceNote
              variant="editorial"
              title="Quellen zu Mythen, Verlauf und Geschlecht"
              definition="Die Einordnungen stützen sich auf Behandlungsforschung, Verlaufsstudien, eine Komorbidität-Studie und eine Übersichtsarbeit zu Geschlechtsunterschieden."
              sources={[
                {
                  label:
                    "Storebø et al. (2020) – Psychotherapien bei Borderline (Cochrane Review)",
                  href: quellenLinks.storebo2020,
                  type: "wissenschaft",
                },
                {
                  label:
                    "Zanarini et al. (2012) – Remission und Recovery im Langzeitverlauf",
                  href: quellenLinks.zanarini2012,
                  type: "wissenschaft",
                },
                {
                  label:
                    "Lamberti (2023) – Geschlechtsunterschiede bei Borderline (Scoping Review)",
                  href: quellenLinks.lamberti2023,
                  type: "wissenschaft",
                },
              ]}
            />
          </ContentSection>

          <VerstehenDiagnosticSection />
        </EditorialSection.Body>
      </EditorialSection>

      <VerstehenMaterialsSection />

      {/* ── 6 Weiter-Hinweis ── EditorialSection mit «Weiter»-MarginNote */}
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
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 7 Querverweise ── EditorialSection variant="cream-deep" */}
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
        </EditorialSection.Body>
      </EditorialSection>
    </Layout>
  );
}
