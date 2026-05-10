import { useCallback } from "react";
import ContentSection from "@/components/ContentSection";
import {
  DisplayHeading,
  EditorialProse,
  EditorialPullQuote,
  EditorialSection,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import { InnenraeumeIllustration } from "@/components/illustrations";
import GrenzenCheck from "@/components/interactive/GrenzenCheck";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import ReviewBadge from "@/components/ReviewBadge";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import { TableOfContents } from "@/components/UXEnhancements";
import { grenzenItems } from "@/content/grenzen";
import { getHandoutOpenHref } from "@/content/handouts";
import { getHandoutTextVersionHrefBySource } from "@/content/handoutTextVersions";
import { kontaktByIdStrict } from "@/data/kontakte";
import { Link } from "wouter";

/** Öffnet eine ContentSection via Custom Event und scrollt dorthin. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

const grenzsaetzeBeispiele = [
  {
    thema: "Zeitliche Grenzen",
    situation: "Häufige Anrufe spät abends oder an Wochenenden",
    falsch: "«Du rufst immer zur falschen Zeit an. Das nervt mich.»",
    richtig:
      "«Ich bin unter der Woche bis 21 Uhr erreichbar. Danach bin ich offline. Bei echten Notfällen gibt es die Krisentelefone.»",
    hinweis:
      "Zeitgrenzen wirken am besten, wenn Sie sie in einer ruhigen Situation ankündigen — nicht mitten in einem Konflikt.",
  },
  {
    thema: "Finanzielle Grenzen",
    situation: "Bitte um Geld, Schuldenübernahme oder finanzielle Rettung",
    falsch: "«Du gibst immer zu viel aus. Ich mache das nicht mehr mit.»",
    richtig:
      "«Ich kann dir kein Geld leihen. Das hat nichts damit zu tun, wie wichtig du mir bist — aber das wäre für mich keine tragfähige Lösung.»",
    hinweis:
      "Finanzielle Grenzen sind besonders schwer, weil sie sich anfühlen wie «ich lasse dich fallen». Sie sind es nicht.",
  },
  {
    thema: "Emotionale Grenzen",
    situation: "Beschimpfungen, Vorwürfe oder persönliche Angriffe im Gespräch",
    falsch: "«Du bist unmöglich. So rede ich nicht mit dir.»",
    richtig:
      "«Wenn du mich so ansprichst, beende ich dieses Gespräch. Wir können es später weiterführen, wenn beide ruhiger sind.»",
    hinweis:
      "Sagen Sie es ruhig und gehen Sie dann tatsächlich. Die Grenze trägt nur, wenn Sie sie auch einhalten.",
  },
  {
    thema: "Grenzen bei Rollenübernahme",
    situation: "Erwartung, immer da zu sein oder alle Probleme zu lösen",
    falsch:
      "«Ich kann nicht immer für dich da sein. Du musst das selbst in den Griff kriegen.»",
    richtig:
      "«Ich bin gerne für dich da — und ich kann nicht dein ganzes Netz sein. Dafür brauchen wir gemeinsam andere Unterstützung.»",
    hinweis:
      "Diese Grenze kombiniert Fürsorge mit Klarheit: Sie sagen, was Sie können, und benennen, was nicht.",
  },
] as const;

const OPFERHILFE = kontaktByIdStrict("INFO_OPFERHILFE_142");
const OPFERHILFE_ZH_24_7 = kontaktByIdStrict("INFO_OPFERHILFE_ZH_24_7");
const FORENSIC_NURSES = kontaktByIdStrict("INFO_FORENSIC_NURSES");
const OPFERBERATUNG_ZH = kontaktByIdStrict("INFO_OPFERBERATUNG_ZH");

const gewaltSchritte = [
  {
    schritt: "Verlassen Sie die Situation",
    detail:
      "Gehen Sie in ein anderes Zimmer, aus dem Haus oder zu Nachbarn. Sicherheit hat Vorrang vor Deeskalationsversuchen.",
  },
  {
    schritt: "Rufen Sie 117 (Polizei) oder 144",
    detail:
      "Bei akuter Gefahr sofort. Sie müssen sich nicht sicher sein, ob es «schlimm genug» ist — die Polizei entscheidet das.",
  },
  {
    schritt: "Nach sexueller oder häuslicher Gewalt: Spurensicherung mitdenken",
    detail: `${FORENSIC_NURSES.label} (${FORENSIC_NURSES.nummer}, kostenlos, 24/7) helfen bei medizinischer Versorgung, Dokumentation und Spurensicherung — auch ohne sofortige Strafanzeige.`,
  },
  {
    schritt: "Opferhilfe und Beratung dazunehmen",
    detail: `${OPFERHILFE.label} (${OPFERHILFE.nummer}) und die ${OPFERHILFE_ZH_24_7.label} (${OPFERHILFE_ZH_24_7.nummer}) sind rund um die Uhr erreichbar. Zu Bürozeiten unterstützt die ${OPFERBERATUNG_ZH.label} (${OPFERBERATUNG_ZH.nummer}) vertraulich, kostenlos und auf Wunsch anonym. Es gibt Unterstützung auch für Männer, Angehörige und Vertrauenspersonen.`,
  },
  {
    schritt: "Halten Sie Vorfälle fest",
    detail:
      "Datum, Beschreibung, allfällige Zeugen. Das ist wichtig, wenn Sie später rechtliche Schritte prüfen möchten.",
  },
] as const;

export default function Grenzen() {
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
        title="Grenzen setzen"
        description="Grenzen für Angehörige: Selbstschutz, Klarheit, Konsequenz und begrenzte Verfügbarkeit."
        path="/grenzen"
      />
      <MedicalPageSchema
        title="Grenzen setzen"
        description="Grenzen für Angehörige: Selbstschutz, Klarheit, Konsequenz und begrenzte Verfügbarkeit."
        path="/grenzen"
      />
      <TableOfContents />

      {/* ── 1 Hero ── EditorialSection mit InnenraeumeIllustration als Aside */}
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
            Grenze und Beziehung
          </span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel className="mb-8" spacing="compact">
            Grenzen
          </EyebrowLabel>
          <DisplayHeading level={1}>
            Grenzen <em>setzen</em>, ohne die Beziehung aufzugeben.
          </DisplayHeading>
          <Lede className="max-w-[30em]">
            Grenzen sind kein Gegenpol zu Mitgefühl, sondern oft seine
            Voraussetzung. Sie schützen Ihre Integrität, machen Beziehungen
            berechenbarer und verhindern, dass Unterstützung in Selbstaufgabe
            kippt. Gleichzeitig können Grenzen Spannungen auslösen. Genau
            deshalb brauchen sie Klarheit, Wiederholbarkeit und Konsequenz.
          </Lede>
          <div
            className="mt-8 border-t pt-3"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <EyebrowLabel spacing="compact">
              Vollständig ca. 12 Min · Auch abschnittweise lesbar
            </EyebrowLabel>
            <LastVerifiedBadge path="/grenzen" className="mt-3" />
            <ReviewBadge path="/grenzen" />
          </div>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <InnenraeumeIllustration
            ariaLabel="Zwei Räume, die sich respektieren — durch eine durchlässige Membran getrennt, nicht durch eine Mauer."
            className="ml-auto block aspect-square w-full max-w-[560px]"
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
            Kernfrage
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Überblick</EyebrowLabel>
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
              Diese Seite hilft Ihnen, Grenzen nicht als Härte, sondern als
              tragfähigen Selbstschutz zu lesen. Entscheidend sind meist
              Warnsignale, Priorisierung, konkrete Sprache und die Frage, ob Sie
              eine Grenze nachher auch wirklich halten können.
            </p>
            <p>
              Drei Akzente ziehen sich durch die Seite: zuerst der Selbstschutz
              ernst nehmen — Grenzen sind nicht gegen Nähe gerichtet, sondern
              schützen Ihre Integrität und machen Beziehungen berechenbarer;
              dann wenige zuerst klären — tragfähige Grenzen entstehen meist aus
              Priorisierung, nicht aus zehn gleichzeitigen Ansagen; und
              schliesslich ruhig und konkret bleiben — hilfreiche Grenzen
              bleiben auf Ihr Handeln bezogen, nicht moralisch aufgeladen und
              nicht endlos verhandelbar.
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
                href="#grenzen-check"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "grenzen-check")}
              >
                Reflexionsfragen
              </a>
              ,{" "}
              <a
                href="#priorisierung"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "priorisierung")}
              >
                Priorisierung
              </a>
              ,{" "}
              <a
                href="#grenzsaetze"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "grenzsaetze")}
              >
                konkreten Grenzsätzen
              </a>{" "}
              oder zur Sicherheitssektion bei{" "}
              <a
                href="#gewalt"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "gewalt")}
              >
                körperlicher Übergriffigkeit
              </a>{" "}
              springen.
            </p>
            <p>
              Grenzen regeln, was Sie nach aussen kommunizieren und einhalten.{" "}
              <Link href="/selbstfuersorge" className="editorial-link">
                Selbstfürsorge
              </Link>{" "}
              ergänzt diese Seite dort, wo es um Ihre eigene Stabilität und
              Regeneration geht.
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 3 Group 1: ERKENNEN ── warnsignale + arten */}
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
            Erkennen
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          {/* ── ContentSection 1: warnsignale ── */}
          <ContentSection
            variant="editorial"
            title="Woran Sie merken, dass eine Grenze nötig ist"
            id="warnsignale"
            preview="Grenzen werden oft erst dann sichtbar, wenn Sie längst überschritten wurden: durch Erschöpfung, Druck, Angst, Groll oder innere Härte."
          >
            <EditorialProse>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Sie sagen aus Angst ja, obwohl innerlich längst nein da ist.
                </li>
                <li>
                  Sie fühlen sich dauernd zuständig, beobachtend oder auf Abruf.
                </li>
                <li>
                  Sie werden gereizt, hart oder ziehen sich innerlich zurück.
                </li>
                <li>
                  Sie merken, dass Hilfe nur noch aus Schuld oder Panik
                  geschieht.
                </li>
              </ul>
              <p>
                Grenzen beginnen oft nicht mit dem Satz an den anderen, sondern
                mit dem ernsten Wahrnehmen Ihrer eigenen Belastung.{" "}
                <Link href="/selbstfuersorge" className="editorial-link">
                  Selbstfürsorge
                </Link>{" "}
                zeigt, was Sie tun können, wenn Sie merken, dass Sie sich selbst
                vernachlässigt haben.
              </p>
            </EditorialProse>
          </ContentSection>

          {/* ── ContentSection 2: arten ── */}
          <ContentSection
            variant="editorial"
            title="Welche Arten von Grenzen häufig relevant sind"
            id="arten"
            preview="Grenzen betreffen nicht nur Lautstärke oder Streit, sondern Zeit, Erreichbarkeit, Raum, Geld und emotionale Zumutbarkeit."
          >
            <div className="mt-2 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 className="mb-2" style={h4Style}>
                  Zeitliche Grenzen
                </h4>
                <p style={bodyStyle}>
                  Wann sind Sie erreichbar, wann nicht? Wann ist Pause nötig?
                </p>
              </div>
              <div>
                <h4 className="mb-2" style={h4Style}>
                  Emotionale Grenzen
                </h4>
                <p style={bodyStyle}>
                  Welcher Ton, welche Vorwürfe, welche Dynamiken überschreiten
                  Ihre Grenze?
                </p>
              </div>
              <div>
                <h4 className="mb-2" style={h4Style}>
                  Räumliche Grenzen
                </h4>
                <p style={bodyStyle}>
                  Wo brauchen Sie Rückzug, Distanz oder Schutz des eigenen
                  Raums?
                </p>
              </div>
              <div>
                <h4 className="mb-2" style={h4Style}>
                  Materielle Grenzen
                </h4>
                <p style={bodyStyle}>
                  Wie weit gehen finanzielle Hilfe, Ausleihen oder praktische
                  Übernahmen?
                </p>
              </div>
            </div>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 4 Group 2: SICH ORIENTIEREN ── grenzen-check + priorisierung */}
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
            Sich orientieren
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          {/* ── ContentSection 3: grenzen-check (interaktiv, out of scope) ── */}
          <ContentSection
            variant="editorial"
            title="Wo stehe ich beim Grenzen setzen?"
            id="grenzen-check"
            preview="Fünf kurze Reflexionsfragen zu den häufigsten Schwierigkeiten beim Grenzen setzen – mit persönlicher Einordnung."
          >
            <GrenzenCheck />
          </ContentSection>

          {/* ── ContentSection 4: priorisierung ── */}
          <ContentSection
            variant="editorial"
            title="Welche Grenzen zuerst?"
            id="priorisierung"
            preview="Nicht alle Grenzen lassen sich gleichzeitig setzen. Diese Orientierung hilft, die wichtigsten zuerst anzugehen."
          >
            <EditorialProse>
              <p>
                Wer versucht, alle Grenzen auf einmal zu setzen, scheitert meist
                an sich selbst. Sinnvoller ist es, nach Dringlichkeit und
                emotionaler Last zu priorisieren.
              </p>
            </EditorialProse>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <div>
                <p
                  className="uppercase"
                  style={{
                    fontSize: "var(--text-xs)",
                    letterSpacing: "var(--tracking-caps)",
                    color: "var(--accent-label)",
                    fontWeight: 500,
                  }}
                >
                  Dringend · Emotional hoch
                </p>
                <h4 className="mt-2" style={h4Style}>
                  Sofort setzen
                </h4>
                <ul className="mt-2 ml-5 list-disc space-y-1" style={bodyStyle}>
                  <li>Körperliche Sicherheit</li>
                  <li>Bedrohungen / Übergriffe</li>
                  <li>Eigene Gesundheit</li>
                </ul>
              </div>
              <div>
                <p
                  className="uppercase"
                  style={{
                    fontSize: "var(--text-xs)",
                    letterSpacing: "var(--tracking-caps)",
                    color: "var(--accent-label)",
                    fontWeight: 500,
                  }}
                >
                  Dringend · Emotional niedriger
                </p>
                <h4 className="mt-2" style={h4Style}>
                  Klar kommunizieren
                </h4>
                <ul className="mt-2 ml-5 list-disc space-y-1" style={bodyStyle}>
                  <li>Erreichbarkeitszeiten</li>
                  <li>Gesprächsregeln</li>
                  <li>Alltägliche Abläufe</li>
                </ul>
              </div>
              <div>
                <p
                  className="uppercase"
                  style={{
                    fontSize: "var(--text-xs)",
                    letterSpacing: "var(--tracking-caps)",
                    color: "var(--accent-label)",
                    fontWeight: 500,
                  }}
                >
                  Langfristig · Emotional hoch
                </p>
                <h4 className="mt-2" style={h4Style}>
                  Sorgfältig vorbereiten
                </h4>
                <ul className="mt-2 ml-5 list-disc space-y-1" style={bodyStyle}>
                  <li>Finanzielle Regelungen</li>
                  <li>Wohnsituation</li>
                  <li>Langfristige Rollen</li>
                </ul>
              </div>
              <div>
                <p
                  className="uppercase"
                  style={{
                    fontSize: "var(--text-xs)",
                    letterSpacing: "var(--tracking-caps)",
                    color: "var(--accent-label)",
                    fontWeight: 500,
                  }}
                >
                  Langfristig · Emotional niedrig
                </p>
                <h4 className="mt-2" style={h4Style}>
                  Im Blick behalten
                </h4>
                <ul className="mt-2 ml-5 list-disc space-y-1" style={bodyStyle}>
                  <li>Kleine Gewohnheitsfragen</li>
                  <li>Alltagsabsprachen</li>
                  <li>Schrittweise Anpassungen</li>
                </ul>
              </div>
            </div>
            <p
              className="mt-6"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--fg-tertiary)",
              }}
            >
              Wenige zentrale Grenzen, klar gehalten, tragen mehr als viele
              gleichzeitig.
            </p>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 5 Group 3: IN DER PRAXIS ── kommunizieren + grenzsaetze + konsequenz + fehler */}
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
            In der Praxis
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          {/* ── ContentSection 5: kommunizieren ── */}
          <ContentSection
            variant="editorial"
            title="Wie Grenzen eher gut kommuniziert werden"
            id="kommunizieren"
            preview="Hilfreiche Grenzen sind meist konkret, ruhig und wiederholbar. Sie erklären sich nicht endlos und werden nicht als moralischer Angriff formuliert."
          >
            <EditorialProse>
              <p>Grenzen tragen eher, wenn sie</p>
              <ul className="ml-6 list-disc space-y-1">
                <li>konkret statt abstrakt sind,</li>
                <li>auf Ihr Handeln bezogen bleiben,</li>
                <li>nicht mit Vorwürfen überladen werden,</li>
                <li>nicht bei jedem Gespräch neu verhandelt werden müssen.</li>
              </ul>
            </EditorialProse>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 className="mb-2" style={h4Style}>
                  Eher hilfreich
                </h4>
                <p style={{ ...bodyStyle, fontStyle: "italic" }}>
                  «Ich spreche weiter mit dir, aber nicht, wenn du mich
                  anschreist.»
                </p>
              </div>
              <div>
                <h4 className="mb-2" style={h4Style}>
                  Eher problematisch
                </h4>
                <p style={{ ...bodyStyle, fontStyle: "italic" }}>
                  «Du bist unmöglich. So rede ich nie wieder mit dir.»
                </p>
              </div>
            </div>
          </ContentSection>

          {/* ── ContentSection 6: grenzsaetze ── */}
          <ContentSection
            variant="editorial"
            title="Konkrete Grenzsätze für typische Situationen"
            id="grenzsaetze"
            preview="Grenzen werden tragfähiger, wenn sie konkret, ruhig und auf Ihr eigenes Handeln bezogen sind — nicht als Vorwurf, sondern als klare Aussage."
          >
            <div className="space-y-8">
              {grenzsaetzeBeispiele.map((item, idx) => (
                <div
                  key={item.thema}
                  className={idx > 0 ? "border-t pt-6" : ""}
                  style={
                    idx > 0 ? { borderColor: "var(--rule-color)" } : undefined
                  }
                >
                  <h4 style={h4Style}>{item.thema}</h4>
                  <p
                    className="mt-1"
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--fg-tertiary)",
                    }}
                  >
                    {item.situation}
                  </p>
                  <p className="mt-3" style={bodyStyle}>
                    <strong style={{ color: "var(--accent-primary)" }}>
                      Eher problematisch:
                    </strong>{" "}
                    <span style={{ fontStyle: "italic" }}>{item.falsch}</span>
                  </p>
                  <p className="mt-2" style={bodyStyle}>
                    <strong style={{ color: "var(--accent-primary)" }}>
                      Eher hilfreich:
                    </strong>{" "}
                    <span style={{ fontStyle: "italic" }}>{item.richtig}</span>
                  </p>
                  <p
                    className="mt-3 border-l-2 pl-4"
                    style={{
                      borderColor: "var(--rule-color)",
                      fontSize: "var(--text-sm)",
                      color: "var(--fg-tertiary)",
                    }}
                  >
                    {item.hinweis}
                  </p>
                </div>
              ))}
            </div>
          </ContentSection>

          {/* ── ContentSection 7: konsequenz ── */}
          <ContentSection
            variant="editorial"
            title="Konsequenz ist oft der schwierigste Teil"
            id="konsequenz"
            preview="Viele Grenzen scheitern nicht an der Formulierung, sondern daran, dass Angst, Schuld oder Hoffnung sie sofort wieder aufweichen."
          >
            <EditorialProse>
              <p>
                Grenzen wirken selten, wenn sie nur angekündigt, aber nicht
                umgesetzt werden. Genau hier geraten viele Angehörige in
                Loyalitätskonflikte: Sie wollen klar sein, fürchten aber
                Eskalation, Ablehnung oder Schuld.
              </p>
              <p>
                <strong>Konsequenz heisst nicht Härte.</strong> Es heisst, dass
                Ihr Handeln zu dem passt, was Sie angekündigt haben.
              </p>
            </EditorialProse>
          </ContentSection>

          {/* ── ContentSection 8: fehler ── */}
          <ContentSection
            variant="editorial"
            title="Häufige Fehler beim Grenzen setzen"
            id="fehler"
            preview="Grenzen werden oft im Affekt, zu gross, zu unklar oder aus Kränkung formuliert. Dann tragen sie selten lange."
          >
            <EditorialProse>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <s>Grenzen im Affekt setzen</s> → besser in ruhigen Momenten
                  vorbereiten
                </li>
                <li>
                  <s>zu viele Grenzen auf einmal</s> → wenige zentrale Grenzen
                  priorisieren
                </li>
                <li>
                  <s>Grenzen als Strafe formulieren</s> → Grenzen als
                  Selbstschutz erklären
                </li>
                <li>
                  <s>Grenzen nicht durchhalten</s> → nur ankündigen, was Sie
                  tragen können
                </li>
                <li>
                  <s>bei Schuld sofort zurückrudern</s> → Schuldgefühl nicht
                  automatisch als Fehler lesen
                </li>
              </ul>
            </EditorialProse>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 6 Pull-Quote ── eigene EditorialSection, leere MarginNote
           (verschoben aus Original-Position zwischen rollen und gewalt
           damit Group 4 zusammenhängend bleibt; narrativ besser als
           Lese-Pause zwischen Praxis-Block und Spezialfällen) */}
      <EditorialSection variant="cream">
        <EditorialSection.Body>
          <EditorialPullQuote>
            Grenzen fühlen sich anfangs oft unangenehm an. Das bedeutet nicht
            automatisch, dass sie falsch sind. In belasteten Beziehungen braucht
            gute Begrenzung meist Wiederholung, innere Festigkeit und die
            Erlaubnis, auch Schuldgefühle zu überstehen.
          </EditorialPullQuote>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 7 Group 4: BESONDERE LAGEN ── rollen + gewalt */}
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
            Besondere Lagen
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          {/* ── ContentSection 9: rollen ── */}
          <ContentSection
            variant="editorial"
            title="Grenzen in verschiedenen Angehörigenrollen"
            id="rollen"
            preview="Partner, Eltern und erwachsene Kinder geraten auf unterschiedliche Weise in Loyalitätsdruck. Das verändert auch, wie schwer Grenzen sich anfühlen."
          >
            <EditorialProse>
              <h4 className="mt-2" style={h4Style}>
                Als Partner/in
              </h4>
              <p>
                In Partnerschaften fühlen sich Grenzen oft schnell wie
                Beziehungsgefahr an. Gerade deshalb sind sie wichtig: Sie
                unterscheiden zwischen Nähe und Verschmelzung, Mitgefühl und
                Selbstaufgabe.
              </p>
              <h4 className="mt-6" style={h4Style}>
                Als Elternteil
              </h4>
              <p>
                Eltern erleben Grenzen oft als Widerspruch zu Fürsorge. Bei
                erwachsenen Kindern ist Begrenzung aber häufig Teil
                verantwortlicher Elternschaft, nicht ihr Gegenstück.
              </p>
              <h4 className="mt-6" style={h4Style}>
                Als erwachsenes Kind
              </h4>
              <p>
                Wer seinem Elternteil Grenzen setzt, erlebt oft besonders starke
                Schuld. Ihre emotionale Gesundheit ist dennoch nicht nachrangig.
                Sie dürfen Ihr eigenes Leben schützen.
              </p>
            </EditorialProse>
          </ContentSection>

          {/* ── ContentSection 10: gewalt ── */}
          <ContentSection
            variant="editorial"
            title="Wenn der Angehörige körperlich übergriffig wird"
            id="gewalt"
            preview="Körperliche Übergriffe sind keine Grenzverletzung – sie sind eine Gefährdung. Das erfordert eine andere Reaktion als verbale Eskalation."
          >
            <div className="space-y-4">
              {/* Alert-Block: farbig (Sicherheitsentscheid) */}
              <div
                className="rounded-md border-l-4 p-5"
                style={{
                  borderColor: "var(--color-alert)",
                  backgroundColor: "var(--color-alert-wash)",
                }}
              >
                <p
                  className="mb-2"
                  style={{
                    fontSize: "var(--text-md)",
                    fontWeight: 600,
                    color: "var(--fg-primary)",
                  }}
                >
                  Körperliche Gewalt ist kein Beziehungsproblem — es ist eine
                  Sicherheitsfrage.
                </p>
                <p style={bodyStyle}>
                  Borderline erklärt Übergriffe nicht und entschuldigt sie
                  nicht. Wenn Sie körperlich bedroht oder verletzt werden, ist
                  Ihre Sicherheit die einzige Priorität.
                </p>
              </div>
              {/* Numerierte Schritte: alert-Badges bleiben farbig (Sicherheitsentscheid) */}
              <ol className="space-y-3">
                {gewaltSchritte.map((item, i) => (
                  <li
                    key={item.schritt}
                    className="flex items-start gap-3 rounded-md border p-4"
                    style={{
                      borderColor: "var(--rule-color)",
                      backgroundColor: "var(--bg-elevated)",
                    }}
                  >
                    <span
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: "var(--color-alert-light)",
                        color: "var(--color-alert-dark)",
                      }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p
                        style={{
                          fontSize: "var(--text-sm)",
                          fontWeight: 600,
                          color: "var(--fg-primary)",
                        }}
                      >
                        {item.schritt}
                      </p>
                      <p className="mt-0.5" style={bodyStyle}>
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              {/* Schluss-Hinweis: editorial entschärft (kein Sicherheitsblock mehr) */}
              <EditorialProse>
                <p>
                  Viele Angehörige zögern, weil sie fürchten, die Person zu
                  «verraten» oder die Situation zu eskalieren. Professionelle
                  Hilfe zu holen ist kein Verrat — es ist oft der einzige Weg,
                  eine Beziehung langfristig überhaupt zu stabilisieren.
                </p>
              </EditorialProse>
            </div>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 8 Materialien ── EditorialSection cream + full-width tile section */}
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
            Materialien zum Vertiefen
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Materialien</EyebrowLabel>
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
            Spickzettel und Infografiken zu Grenzen
          </h2>
          <p
            className="max-w-[36em]"
            style={{
              fontSize: "var(--text-md)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-secondary)",
            }}
          >
            Wenn verfügbar, führt «Textversion lesen» zur Web-Version. «PDF
            öffnen» öffnet die A4-Druckversion im neuen Tab.
          </p>
        </EditorialSection.Body>
      </EditorialSection>

      <section
        className="bg-[var(--bg-primary)] px-[var(--container-pad)] pb-20 md:px-[var(--container-pad-md)] md:pb-[120px]"
        aria-label="Spickzettel und Infografiken zu Grenzen — Tile-Liste"
      >
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {grenzenItems.map(item => {
              const textVersionHref = getHandoutTextVersionHrefBySource(
                item.pdfUrl
              );
              const pdfHref = getHandoutOpenHref(item.pdfUrl) ?? item.pdfUrl;
              return (
                <article
                  key={item.title}
                  className="space-y-3 border-t pt-6"
                  style={{ borderColor: "var(--rule-color)" }}
                >
                  <img
                    src={item.thumbnailUrl ?? item.url}
                    alt={item.title}
                    className="aspect-[3/4] w-full rounded-md object-cover object-top"
                    style={{ backgroundColor: "var(--bg-elevated)" }}
                    loading="lazy"
                    width={600}
                    height={848}
                    decoding="async"
                  />
                  <h3 style={h4Style}>{item.title}</h3>
                  <div
                    className="flex flex-wrap gap-x-5 gap-y-1"
                    style={{ fontSize: "var(--text-sm)" }}
                  >
                    {textVersionHref && (
                      <Link
                        href={textVersionHref}
                        className="editorial-link"
                        aria-label={`Textversion lesen: ${item.title}`}
                      >
                        Textversion lesen
                      </Link>
                    )}
                    <a
                      href={pdfHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link"
                      aria-label={`PDF öffnen: ${item.title} (neuer Tab)`}
                    >
                      PDF öffnen
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-12" style={bodyStyle}>
            <Link href="/materialien" className="editorial-link">
              Alle Materialien ansehen
            </Link>
          </p>
        </div>
      </section>

      {/* ── 9 Weiter-Hinweis ── */}
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
              Grenzen sind der Schutzraum — Selbstfürsorge ist das, was Sie
              darin aufbauen. Wer weiss, wo er aufhört und der andere anfängt,
              kann sich erholen, ohne sich schuldig zu fühlen —{" "}
              <Link href="/selbstfuersorge" className="editorial-link">
                weiter zu Selbstfürsorge
              </Link>
              . Zurück geht es zu{" "}
              <Link href="/kommunizieren" className="editorial-link">
                Kommunizieren
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 10 Querverweise ── EditorialSection variant="cream-deep" */}
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
                href: "/selbstfuersorge",
                title: "Selbstfürsorge",
                description:
                  "Warnsignale, Sofort-Übungen und die Erlaubnis, die eigene Belastung ernst zu nehmen.",
              },
              {
                href: "/kommunizieren",
                title: "Kommunizieren",
                description:
                  "Grenzen ruhig und klar formulieren: Validierung, DEAR-Technik und Deeskalation.",
              },
              {
                href: "/materialien",
                title: "Materialien & Handouts",
                description:
                  "Spickzettel und Infografiken zu Grenzen und Konsequenzen – als PDF.",
              },
            ]}
          />
        </EditorialSection.Body>
      </EditorialSection>
    </Layout>
  );
}
