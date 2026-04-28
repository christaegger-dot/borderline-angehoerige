/**
 * Über uns — Editorial-Redesign Phase 4 Welle 2 (Page 10/10) — letzte Page
 *
 * Migriert nach Verstehen/Kommunizieren/Grenzen/Selbstfürsorge/Übersicht/
 * Alltag/Therapie/Krise/Genesung/Fachstelle-Pattern. Inhalt unverändert
 * ausser Hero-Lesezeit und prosaischen Verbindungssätzen.
 *
 * Brief-Sonderregel (Page 10): Falls Team-Vorstellungen oder Bilder —
 * Bilder dürfen bleiben (Editorial verträgt Bild), Captions in
 * `--fg-tertiary` falls bisher keine vorhanden. **Hier nicht
 * anwendbar:** die Page enthält keine Bilder oder Team-Fotos, nur Text.
 *
 * Cross-Page-Anker `#therapieangebote` in `unterstuetzen/therapie`
 * bleibt erhalten (wird im Hinweis-Block dieser Seite verlinkt).
 */
import { useCallback } from "react";
import ContentSection from "@/components/ContentSection";
import {
  EditorialLayout,
  EditorialProse,
  EditorialSection,
} from "@/components/editorial";
import EvidenceNote from "@/components/EvidenceNote";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO from "@/components/SEO";
import { Link } from "wouter";

/** Öffnet eine ContentSection via Custom Event und scrollt dorthin. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

const prinzipien = [
  {
    title: "Evidenzbasiert",
    description:
      "Medizinische und therapeutische Aussagen stützen wir auf wissenschaftliche Quellen und bewährte Therapieansätze wie DBT (Dialektisch-Behaviorale Therapie). Orientierungstexte ergänzen wir mit klinischer Erfahrung aus der Angehörigenarbeit.",
  },
  {
    title: "Entstigmatisierend",
    description:
      "Borderline ist eine behandelbare Erkrankung, keine Charakterschwäche. Wir vermeiden schuldzuweisende Sprache und fördern Verständnis für alle Beteiligten.",
  },
  {
    title: "Selbstfürsorge-orientiert",
    description:
      "Angehörige können nur helfen, wenn sie selbst gesund bleiben. Grenzen setzen ist kein Verrat, sondern notwendig für eine nachhaltige Beziehung.",
  },
  {
    title: "Praxisnah",
    description:
      "Theorie allein hilft selten. Deshalb verbinden wir Hintergrundwissen mit Orientierung für reale Gesprächs-, Krisen- und Belastungssituationen.",
  },
] as const;

const grundlagen = [
  {
    title: "Dialektisch-Behaviorale Therapie (DBT)",
    author: "Marsha M. Linehan",
    description:
      "Die evidenzbasierte Standardtherapie für Borderline, entwickelt in den 1980er Jahren.",
  },
  {
    title: "Stop Walking on Eggshells",
    author: "Paul T. Mason & Randi Kreger",
    description:
      "Das Standardwerk für Angehörige, Grundlage für den Namen dieser Website.",
  },
  {
    title: "Ich hasse dich – verlass mich nicht",
    author: "Jerold J. Kreisman & Hal Straus",
    description:
      "Klassiker zum Verständnis der Borderline-Dynamik aus Betroffenen- und Angehörigensicht.",
  },
  {
    title: "Family Connections",
    author: "NEA-BPD / Alan Fruzzetti",
    description:
      "Evidenzbasiertes Programm für Angehörige, entwickelt an der University of Nevada.",
  },
] as const;

export default function UeberUns() {
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
        title="Über uns"
        description="Über das Projekt Borderline · Hilfe für Angehörige."
        path="/ueber-uns"
      />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-12 pt-12 md:pb-16 md:pt-16">
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Über uns
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
            Über diese <em>Website</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Warum es diese Website gibt – und wer dahinter steht.
          </p>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Vollständig ca. 4 Min · Auch abschnittweise lesbar.
          </p>
        </header>

        {/* ── Intro / Quick-Links ── */}
        <EditorialSection
          label="Überblick"
          title="Was Sie auf dieser Seite finden"
        >
          <EditorialProse>
            <p>
              Diese Seite versammelt die Hintergründe der Website: warum sie
              entstanden ist, welche Prinzipien sie tragen und auf welche
              wissenschaftlichen Grundlagen sich die Inhalte stützen.
            </p>
            <p>
              Sie können auch direkt zu{" "}
              <a
                href="#motivation"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "motivation")}
              >
                Motivation
              </a>
              ,{" "}
              <a
                href="#prinzipien"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "prinzipien")}
              >
                Prinzipien
              </a>{" "}
              oder{" "}
              <a
                href="#ueber-uns-quellen"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "ueber-uns-quellen")}
              >
                wissenschaftlichen Grundlagen
              </a>{" "}
              springen.
            </p>
          </EditorialProse>
        </EditorialSection>

        {/* ── ContentSection 1: motivation ── */}
        <ContentSection
          variant="editorial"
          title="Warum diese Website?"
          id="motivation"
          defaultOpen={true}
          preview="Angehörige stehen oft vor einer doppelten Herausforderung: helfen wollen und sich hilflos fühlen."
        >
          <EditorialProse>
            <p>
              Wenn ein nahestehender Mensch eine Borderline-
              Persönlichkeitsstörung hat, stehen Angehörige oft vor einer
              doppelten Herausforderung: Sie wollen helfen – und fühlen sich
              gleichzeitig hilflos. Sie lieben – und sind erschöpft. Sie
              verstehen nicht, was passiert – und haben Angst, etwas falsch zu
              machen.
            </p>
            <p>
              Der Begriff «Eiertanz» aus dem Standardwerk von Paul T. Mason und
              Randi Kreger beschreibt dieses Gefühl treffend: das ständige
              Auf-der-Hut-Sein, die Angst vor dem nächsten Ausbruch, das Gefühl,
              auf Eierschalen zu laufen.
            </p>
            <p>
              Diese Website möchte Angehörigen fachlich fundierte Orientierung
              geben – nicht um eine Erkrankung von aussen zu «lösen», sondern um
              Dynamiken besser einzuordnen, tragfähiger zu reagieren und sich
              selbst nicht zu verlieren.
            </p>
          </EditorialProse>
        </ContentSection>

        {/* ── ContentSection 2: prinzipien ── */}
        <ContentSection
          variant="editorial"
          title="Unsere Prinzipien"
          id="prinzipien"
          preview="Fachlich fundiert, entstigmatisierend, selbstfürsorge-orientiert und praxisnah."
        >
          <ul className="mt-2 space-y-6">
            {prinzipien.map(item => (
              <li key={item.title}>
                <h4 style={h4Style}>{item.title}</h4>
                <p className="mt-1" style={bodyStyle}>
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <EvidenceNote
              variant="editorial"
              title="Wie wir Quellen meinen"
              definition="Mit «Wir nennen unsere Quellen» meinen wir zweierlei: wissenschaftliche Evidenz für medizinische oder therapeutische Aussagen und konkrete Versorgungsquellen für Hilfen in der Schweiz, vor allem im Raum Zürich."
              reviewDate="24.03.2026"
              sources={[
                {
                  label:
                    "APA Practice Guideline for the Treatment of Patients With Borderline Personality Disorder (2024)",
                  href: "https://pubmed.ncbi.nlm.nih.gov/39482953/",
                  type: "wissenschaft",
                },
                {
                  label: "NEA-BPD / Family Connections",
                  href: "https://www.borderlinepersonalitydisorder.org/family-connections/",
                  type: "versorgung",
                },
                {
                  label:
                    "PUK Zürich – Angehörigenarbeit und Versorgungsangebote",
                  href: "https://www.pukzh.ch",
                  type: "versorgung",
                },
              ]}
            />
          </div>
        </ContentSection>

        {/* ── ContentSection 3: ueber-uns-quellen ── */}
        <ContentSection
          variant="editorial"
          title="Wissenschaftliche Grundlagen"
          id="ueber-uns-quellen"
          preview="DBT, Family Connections und die Standardwerke von Mason/Kreger und Kreisman/Straus."
        >
          <EditorialProse>
            <p>
              Die Inhalte dieser Website stützen sich auf etablierte Forschung
              und Therapieansätze:
            </p>
          </EditorialProse>
          <ul className="mt-6 space-y-6">
            {grundlagen.map(source => (
              <li key={source.title}>
                <h4 style={h4Style}>{source.title}</h4>
                <p
                  className="mt-1"
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--accent-label)",
                    fontStyle: "italic",
                  }}
                >
                  {source.author}
                </p>
                <p className="mt-1" style={bodyStyle}>
                  {source.description}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <EvidenceNote
              variant="editorial"
              title="Auswahl der Grundlagen"
              definition="Die Website stützt sich auf klinische Standardwerke, evidenzbasierte Therapieansätze und Angehörigenprogramme. Die Auswahl ist kuratiert, nicht vollständig bibliografisch."
              reviewDate="24.03.2026"
              sources={[
                {
                  label:
                    "Linehan, Cognitive-Behavioral Treatment of Borderline Personality Disorder",
                  type: "wissenschaft",
                },
                {
                  label: "Mason & Kreger, Stop Walking on Eggshells",
                  type: "wissenschaft",
                },
                {
                  label:
                    "Kreisman & Straus, Ich hasse dich – verlass mich nicht",
                  type: "wissenschaft",
                },
                {
                  label: "Family Connections (NEA-BPD / Alan Fruzzetti)",
                  href: "https://www.borderlinepersonalitydisorder.org/family-connections/",
                  type: "versorgung",
                },
              ]}
            />
          </div>
          <p className="mt-6" style={bodyStyle}>
            Eine vollständige Liste unserer Buchempfehlungen finden Sie auf der{" "}
            <Link href="/buchempfehlungen" className="editorial-link">
              Buchempfehlungen-Seite
            </Link>
            .
          </p>
        </ContentSection>

        {/* ── Wichtiger Hinweis ── */}
        <EditorialSection label="Hinweis" title="Wichtiger Hinweis" rule>
          <EditorialProse>
            <p>
              Diese Website ersetzt keine professionelle Beratung, Therapie oder
              medizinische Behandlung. Die Inhalte dienen der Information und
              Orientierung. Bei akuten Krisen wenden Sie sich bitte an die{" "}
              <Link href="/soforthilfe" className="editorial-link">
                Notfallnummern
              </Link>
              . Für eine individuelle Beratung empfehlen wir den Kontakt zu{" "}
              <Link href="/beratung" className="editorial-link">
                Beratungsstellen
              </Link>{" "}
              oder{" "}
              <Link
                href="/unterstuetzen/therapie#therapieangebote"
                className="editorial-link"
              >
                spezialisierten Therapeuten
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSection>

        {/* ── Einordnung dieser Website ── */}
        <EditorialSection label="Transparenz" title="Einordnung">
          <EditorialProse>
            <p>
              Erstellt von Ch. Egger innerhalb der Fachstelle Angehörigenarbeit.
              Die inhaltliche Verantwortung liegt bei der Fachstelle
              Angehörigenarbeit.
            </p>
            <p>
              Eigenständig gestaltetes Informationsangebot der Fachstelle
              Angehörigenarbeit. Kein offizieller Kommunikationskanal der PUK
              Zürich.
            </p>
          </EditorialProse>
        </EditorialSection>

        {/* ── Feedback & Kontakt ── */}
        <EditorialSection label="Feedback" title="Feedback &amp; Kontakt" rule>
          <EditorialProse>
            <p>
              Haben Sie Anregungen, Fragen oder möchten Sie einen Fehler melden?
              Wir freuen uns über Ihr{" "}
              <Link href="/feedback" className="editorial-link">
                Feedback
              </Link>{" "}
              — Ihre Rückmeldung hilft uns, diese Website zu verbessern.
            </p>
          </EditorialProse>
        </EditorialSection>

        <RelatedLinksEditorial
          links={[
            {
              href: "/fachstelle",
              title: "Fachstelle Angehörigenarbeit",
              description:
                "Beratung und Begleitung für Angehörige an der PUK Zürich.",
            },
            {
              href: "/buchempfehlungen",
              title: "Buchempfehlungen",
              description:
                "Vollständige Literaturauswahl zu Borderline und Angehörigenarbeit.",
            },
            {
              href: "/feedback",
              title: "Feedback",
              description:
                "Anregungen, Fragen oder Hinweise auf Fehler — direkt an die Fachstelle.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
