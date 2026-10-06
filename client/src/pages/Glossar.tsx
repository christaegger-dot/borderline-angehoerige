import { useCallback, useEffect, useMemo } from "react";
import {
  DisplayHeading,
  EditorialBody,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import ClaimEvidence from "@/components/ClaimEvidence";
import SEO from "@/components/SEO";
import ReviewBadge from "@/components/ReviewBadge";
import { slugifyTerm } from "@/lib/glossarAnchor";
import { Link, useLocation } from "wouter";

interface GlossaryTerm {
  claimIds: string[];
  term: string;
  abbreviation?: string;
  category: "therapie" | "kommunikation" | "symptome" | "selbsthilfe";
  definition: string;
  example?: string;
  criteria?: {
    intro: string;
    items: string[];
  };
  relatedPage?: string;
  relatedPageTitle?: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    claimIds: [
      "glossar-borderline-persoenlichkeitsstoerung",
      "glossar-dsm-kriterien",
    ],
    term: "Borderline-Persönlichkeitsstörung",
    abbreviation: "BPS",
    category: "symptome",
    definition:
      "Ein komplexes Störungsbild, das unter anderem intensive oder rasch wechselnde Gefühle, Schwierigkeiten mit innerer Stabilität, dem Selbstbild oder Beziehungen beschreiben kann. Erfahrungen und Ausprägung sind individuell verschieden. Klassifiziert im DSM-5-TR als eigenständige Persönlichkeitsstörung und im ICD-11 als «Borderline-Muster» (Code 6D11.5). Die englische Bezeichnung lautet Borderline Personality Disorder (BPD).",
    example:
      "Ausprägung und Verlauf unterscheiden sich deutlich. Manche Menschen erleben vor allem rasch wechselnde starke Gefühle, andere eher Leere, Rückzug oder Selbstzweifel. Eine Diagnose beschreibt weder die ganze Person noch ihre Fähigkeiten.",
    criteria: {
      intro:
        "Im DSM-5-TR gehören mindestens 5 der folgenden 9 Merkmale zur Diagnose. Sie müssen ein überdauerndes, situationsübergreifendes Muster bilden, das mit klinisch relevanter Belastung oder Beeinträchtigung verbunden ist. Verlauf und mögliche andere Erklärungen werden fachlich beurteilt; die Liste ermöglicht keine Selbst- oder Fremddiagnose:",
      items: [
        "Verzweifeltes Bemühen, reales oder vorgestelltes Verlassenwerden zu vermeiden",
        "Instabile und intensive zwischenmenschliche Beziehungen (abwechselnd Idealisierung und Entwertung)",
        "Instabiles Selbstbild oder instabile Selbstwahrnehmung",
        "Impulsivität in mindestens zwei potenziell selbstschädigenden Bereichen (z.B. Geldausgaben, Substanzkonsum, Sexualität, rücksichtsloses Fahren, Essanfälle)",
        "Wiederkehrende suizidale Handlungen oder Ankündigungen sowie Selbstverletzungen",
        "Ausgeprägte Stimmungsinstabilität (intensive Episoden von Dysphorie, Reizbarkeit oder Angst)",
        "Chronisches Gefühl der Leere",
        "Intensive Wut oder Schwierigkeiten, sie zu regulieren",
        "Vorübergehende, stressabhängige paranoide Vorstellungen oder schwere dissoziative Symptome",
      ],
    },
    relatedPage: "/verstehen/diagnostik",
    relatedPageTitle: "Wie eine Diagnose entsteht",
  },
  {
    claimIds: ["glossar-dialektisch-behaviorale-therapie"],
    term: "Dialektisch-Behaviorale Therapie",
    abbreviation: "DBT",
    category: "therapie",
    definition:
      "Die DBT gehört zu den wissenschaftlich untersuchten Psychotherapien für Borderline. Sie wurde von Marsha Linehan entwickelt und kombiniert Verhaltenstherapie mit Achtsamkeitspraktiken. Der Begriff 'dialektisch' bezieht sich auf die Balance zwischen Akzeptanz (so wie es ist) und Veränderung (was besser werden kann). Eine allgemeine Überlegenheit gegenüber allen anderen geeigneten Therapien ist damit nicht belegt.",
    example:
      "In der DBT lernen Betroffene konkrete Fertigkeiten (Skills) zur Emotionsregulation, Stresstoleranz, zwischenmenschlichen Effektivität und Achtsamkeit.",
    relatedPage: "/unterstuetzen/therapie",
    relatedPageTitle: "Therapie und Angehörigenrolle",
  },
  {
    claimIds: ["glossar-skills"],
    term: "Skills",
    category: "therapie",
    definition:
      "Skills sind konkrete Fertigkeiten, die in der DBT erlernt werden. Sie sollen helfen, mit intensiven Emotionen, Krisen und zwischenmenschlichen Spannungen anders umzugehen, ohne sofort auf selbstschädigende oder eskalierende Muster zurückzugreifen.",
    example:
      "Ein Beispiel ist, den Kontakt der Füsse zum Boden wahrzunehmen und einige Dinge im Raum zu benennen. Skills sollten nicht verletzen und zur Person passen; geeignete Strategien können mit einer Fachperson vereinbart werden. Wenn eine Übung zusätzlich belastet, darf sie angepasst oder beendet werden.",
    relatedPage: "/unterstuetzen/alltag",
    relatedPageTitle: "Im Alltag unterstützen",
  },
  {
    claimIds: ["glossar-komorbiditaet"],
    term: "Komorbidität",
    category: "symptome",
    definition:
      "Mehrere Erkrankungen, die gleichzeitig oder nacheinander auftreten. Bei Borderline besonders häufig: Depression, Angststörungen, PTBS, Essstörungen, Substanzgebrauchsstörungen. Der Begriff bedeutet nicht «doppelt schlimm», sondern beschreibt eine Kombination, die behandelt werden kann.",
    relatedPage: "/verstehen/begleiterkrankungen",
    relatedPageTitle: "Begleiterkrankungen",
  },
  {
    claimIds: ["glossar-mentalisierung"],
    term: "Mentalisierung",
    category: "therapie",
    definition:
      "Die Fähigkeit, das eigene Verhalten und das Verhalten anderer Menschen im Zusammenhang mit Gedanken, Gefühlen, Wünschen und möglichen Absichten zu verstehen. Diese Fähigkeit nutzen alle Menschen. Unter hoher Anspannung kann sie vorübergehend schwerer zugänglich sein — auch bei manchen Menschen mit Borderline. Sie lässt sich in der Therapie üben.",
    example:
      "Mentalisieren kann heissen: «Ich deute ihre Reaktion gerade als Ablehnung. Vielleicht gibt es noch andere Erklärungen; ich kann nachfragen, statt mir sicher zu sein.»",
  },
  {
    claimIds: ["glossar-uebertragungsfokussierte-psychotherapie"],
    term: "Übertragungsfokussierte Psychotherapie",
    abbreviation: "TFP",
    category: "therapie",
    definition:
      "Eine wissenschaftlich untersuchte Psychotherapie für Borderline, entwickelt von Otto Kernberg und Mitarbeitenden. TFP arbeitet mit dem Beziehungserleben in der therapeutischen Beziehung selbst: innere Konflikte werden im «Hier und Jetzt» zwischen Therapeut:in und Patient:in sichtbar und können dort bearbeitet werden. Welche Therapie passt und angeboten wird, wird individuell mit einer Fachperson geklärt.",
    example:
      "Wenn sich das Erleben der Therapeutin stark zwischen Sicherheit und Enttäuschung verändert, kann diese Erfahrung gemeinsam untersucht werden — ohne sie als Absicht oder Charakterzug zu bewerten.",
    relatedPage: "/unterstuetzen/therapie",
    relatedPageTitle: "Therapie und Angehörigenrolle",
  },
  {
    claimIds: ["glossar-remission"],
    term: "Remission",
    category: "therapie",
    definition:
      "In der Borderline-Forschung bedeutet symptomatische Remission, dass eine Person während eines festgelegten Zeitraums nicht mehr genügend Kriterien für die Diagnose erfüllt. In der zehnjährigen Studie von Zanarini et al. (2010) erreichten 93% der 290 zu Beginn stationär behandelten Erwachsenen mindestens einmal eine zweijährige Remission. Das ist eine Gruppenbeobachtung aus einer spezialisierten Stichprobe, keine individuelle Prognose.",
    relatedPage: "/genesung",
    relatedPageTitle: "Genesung ist möglich",
  },
  {
    claimIds: ["glossar-recovery"],
    term: "Recovery",
    category: "therapie",
    definition:
      "In der zehnjährigen Studie von Zanarini et al. (2010) bezeichnete Recovery eine mindestens zweijährige symptomatische Remission zusammen mit gutem sozialem und beruflichem Funktionieren; 50% der 290 zu Beginn stationär behandelten Erwachsenen erreichten diesen Studienendpunkt mindestens einmal. Persönliche Recovery ist weiter gefasst und kann auch Hoffnung, Verbundenheit, Sinn und Selbstbestimmung umfassen. Die Zahl ist keine individuelle Prognose.",
    relatedPage: "/genesung",
    relatedPageTitle: "Genesung ist möglich",
  },
  {
    claimIds: ["glossar-validierung"],
    term: "Validierung",
    category: "kommunikation",
    definition:
      "Validierung bedeutet, die Gefühle und Erfahrungen einer Person als verständlich und nachvollziehbar anzuerkennen, auch wenn man das Verhalten nicht gutheisst. Für Angehörige ist sie oft ein hilfreicher Ausgangspunkt, weil sie Druck aus Gesprächen nehmen kann, ohne alles zu bestätigen.",
    example:
      "'Du sagst, dass dich meine verspätete Rückkehr verletzt hat. Möchtest du erzählen, was daran für dich besonders schwierig war?'",
    relatedPage: "/kommunizieren",
    relatedPageTitle: "Kommunizieren",
  },
  {
    claimIds: ["glossar-set-kommunikation"],
    term: "SET-Kommunikation",
    category: "kommunikation",
    definition:
      "SET steht für Support (Unterstützung), Empathy (Empathie) und Truth (Wahrheit/Realität). Der Begriff stammt aus der Angehörigenliteratur. Er ist kein allgemein empfohlenes oder verpflichtendes Schema; einzelne Elemente wie begrenzte Präsenz, vorsichtiges Spiegeln und Klarheit können situationsabhängig nützlich sein.",
    example:
      "Begrenzte Präsenz: 'Ich kann dir jetzt zehn Minuten zuhören.' Offene Frage: 'Wie ist es gerade für dich?' Klarheit: 'Danach beende ich das Gespräch für heute.'",
    relatedPage: "/kommunizieren",
    relatedPageTitle: "Kommunizieren",
  },
  {
    claimIds: ["glossar-dear-man"],
    term: "DEAR MAN",
    category: "kommunikation",
    definition:
      "DEAR MAN ist eine DBT-Struktur für klare Bitten und Grenzen: Describe (beschreiben), Express (ausdrücken), Assert (klar benennen), Reinforce (verstärken und positive Folgen benennen), Mindful (achtsam beim Ziel bleiben), Appear confident (klar auftreten), Negotiate (verhandeln). DEAR bezeichnet darin die ersten vier inhaltlichen Schritte.",
    example:
      "Statt 'Du hörst mir nie zu!' → 'Wenn ich spreche und du aufs Handy schaust (D), fühle ich mich unwichtig (E). Ich wünsche mir, dass du das Handy weglegst (A).'",
    relatedPage: "/kommunizieren",
    relatedPageTitle: "Kommunizieren",
  },
  {
    claimIds: ["glossar-invalidierung"],
    term: "Invalidierung",
    category: "kommunikation",
    definition:
      "Das Gegenteil von Validierung: Die Gefühle oder Erfahrungen einer Person werden abgewertet, ignoriert oder als übertrieben dargestellt. Das kann für viele Menschen schmerzhaft sein und ein belastetes Gespräch weiter erschweren.",
    example:
      "Invalidierende Aussagen: 'Das ist doch nicht so schlimm', 'Du übertreibst mal wieder', 'Andere haben es viel schwerer'.",
  },
  {
    claimIds: ["glossar-emotionale-dysregulation"],
    term: "Emotionale Dysregulation",
    category: "symptome",
    definition:
      "Schwierigkeiten, starke Emotionen zu regulieren. Gefühle können rasch an Intensität gewinnen und länger anhalten. Das kann ein Merkmal von Borderline sein, kommt aber auch in anderen Zusammenhängen vor und erklärt Verhalten nie vollständig.",
    example:
      "Eine Enttäuschung kann starke Trauer, Angst oder Wut auslösen. Das Gefühl ist real; zugleich kann es helfen, zwischen dem Gefühl, der eigenen Deutung und einer möglichen Handlung zu unterscheiden.",
    relatedPage: "/verstehen",
    relatedPageTitle: "Borderline verstehen",
  },
  {
    claimIds: ["glossar-splitting"],
    term: "Splitting",
    category: "symptome",
    definition:
      "Ein klinischer Begriff, der leicht missverstanden wird. Unter hoher Anspannung kann es vorübergehend schwer sein, widersprüchliche Eindrücke gleichzeitig im Blick zu behalten; eine Person oder Situation wird dann überwiegend positiv oder negativ erlebt. Das tritt nicht bei allen Menschen mit Borderline auf und erlaubt keinen Schluss auf Absicht oder Charakter.",
    example:
      "Nach einem Konflikt können frühere positive Erfahrungen vorübergehend kaum zugänglich sein. Mit sinkender Anspannung kann wieder eine umfassendere Sicht möglich werden.",
    relatedPage: "/verstehen",
    relatedPageTitle: "Borderline verstehen",
  },
  {
    claimIds: ["glossar-verlassensangst"],
    term: "Verlassensangst",
    category: "symptome",
    definition:
      "Eine intensive Sorge, eine wichtige Beziehung könne enden oder eine nahestehende Person könne sich zurückziehen. Sie kann mit aktuellen Signalen, früheren Beziehungserfahrungen oder beidem zusammenhängen und ist individuell unterschiedlich ausgeprägt.",
    example:
      "Eine verzögerte Antwort kann starke Unsicherheit auslösen. Hilfreich kann sein, die Sorge zunächst wahrzunehmen und nachzufragen, statt eine Absicht als sicher anzunehmen.",
    relatedPage: "/verstehen",
    relatedPageTitle: "Borderline verstehen",
  },
  {
    claimIds: ["glossar-dissoziation"],
    term: "Dissoziation",
    category: "symptome",
    definition:
      "Dissoziation kann sich etwa als Unwirklichkeitsgefühl, Abgetrenntsein von sich selbst oder Erinnerungslücken zeigen. Sie kann unter starkem Stress oder im Zusammenhang mit belastenden Erfahrungen auftreten, hat aber unterschiedliche Formen und kommt auch ausserhalb von Borderline vor. Wiederholte oder ausgeprägte Beschwerden brauchen eine fachliche Einordnung.",
    example:
      "Betroffene beschreiben es als 'neben sich stehen', 'wie in Watte gepackt sein' oder 'die Welt wirkt unwirklich'.",
  },
  {
    claimIds: ["glossar-identitaetsdiffusion"],
    term: "Identitätsdiffusion",
    category: "symptome",
    definition:
      "Ein instabiles oder unklares Selbstbild. Manche Menschen mit Borderline erleben zeitweise Schwierigkeiten zu beschreiben, wer sie sind, was sie wollen oder was ihre Werte sind. Andere erleben dies nicht oder anders.",
    example:
      "'Ich weiss nicht, wer ich bin, wenn ich alleine bin. Ich übernehme immer die Interessen meines Partners.'",
    relatedPage: "/verstehen",
    relatedPageTitle: "Borderline verstehen",
  },
  {
    claimIds: ["glossar-selbstfuersorge"],
    term: "Selbstfürsorge",
    category: "selbsthilfe",
    definition:
      "Bewusste Handlungen, um die eigene körperliche, emotionale und mentale Gesundheit zu erhalten. Angehörige dürfen ihre Bedürfnisse und Grenzen unabhängig davon schützen, wie viel Unterstützung sie geben können oder möchten.",
    example:
      "Regelmässige Pausen, eigene Hobbys pflegen, professionelle Unterstützung suchen, Grenzen setzen.",
    relatedPage: "/selbstfuersorge",
    relatedPageTitle: "Selbstfürsorge",
  },
  {
    claimIds: ["glossar-grenzen-setzen"],
    term: "Grenzen setzen",
    category: "selbsthilfe",
    definition:
      "Klare Kommunikation darüber, was für Sie möglich, sicher und tragbar ist. Grenzen können beide Seiten schützen; sie brauchen weder Zustimmung noch ein Versprechen auf späteren Kontakt.",
    example:
      "'Ich möchte dieses Gespräch so nicht weiterführen. Ich beende es jetzt und entscheide später, ob und wann ich wieder ansprechbar bin.'",
    relatedPage: "/grenzen",
    relatedPageTitle: "Grenzen setzen",
  },
  {
    claimIds: ["glossar-co-abhaengigkeit"],
    term: "Co-Abhängigkeit",
    category: "selbsthilfe",
    definition:
      "Ein uneinheitlich verwendeter Begriff aus der Angehörigen- und Suchthilfeliteratur, keine klar abgegrenzte klinische Diagnose. Er kann Angehörige vorschnell etikettieren. Hilfreicher ist es, konkret zu fragen, ob eigene Bedürfnisse, Gesundheit oder Beziehungen zu kurz kommen und ob jemand mehr Verantwortung übernimmt, als gewollt oder tragbar ist.",
    example:
      "Mögliche Fragen: «Habe ich noch Zeit für Erholung und eigene Beziehungen? Welche Verantwortung gehört zu mir — und welche nicht?»",
    relatedPage: "/selbstfuersorge",
    relatedPageTitle: "Selbstfürsorge",
  },
  {
    claimIds: ["glossar-enabling"],
    term: "Enabling",
    category: "selbsthilfe",
    definition:
      "Ein englischer Begriff aus der Sucht- und Angehörigenliteratur, der schnell vorwurfsvoll wirken kann. Statt eine helfende Handlung pauschal so zu etikettieren, sollte konkret geprüft werden: Entlastet sie kurzfristig? Überschreitet sie eigene Grenzen? Hat sie unbeabsichtigte Folgen? Verantwortlichkeiten und Unterstützung lassen sich möglichst gemeinsam klären.",
    example:
      "Wer wiederholt Termine für eine erwachsene Person absagt und sich damit überlastet, kann besprechen, wer künftig welche Aufgabe übernehmen möchte und kann.",
    relatedPage: "/grenzen",
    relatedPageTitle: "Grenzen setzen",
  },
  {
    claimIds: ["glossar-leuchtturm-prinzip"],
    term: "Leuchtturm-Prinzip",
    category: "selbsthilfe",
    definition:
      "Eine Metapher für die Selbstorientierung von Angehörigen: Sie können den eigenen nächsten Schritt an Werten, Grenzen, Möglichkeiten und verfügbarer Unterstützung ausrichten. Sie müssen nicht dauerhaft ruhig oder stabil sein und sind nicht für die Steuerung oder Genesung einer anderen Person verantwortlich.",
    example:
      "«Was ist mir wichtig? Was kann ich heute anbieten? Wo brauche ich eine Grenze, eine Pause oder Unterstützung?»",
    relatedPage: "/",
    relatedPageTitle: "Startseite",
  },
];

const categoryLabels: Record<GlossaryTerm["category"], string> = {
  therapie: "Therapie & Behandlung",
  kommunikation: "Kommunikation",
  symptome: "Symptome & Muster",
  selbsthilfe: "Selbsthilfe & Angehörige",
};

/** Liefert den ersten Buchstaben (uppercase) für Gruppierung. */
function firstLetter(term: string): string {
  return term.charAt(0).toUpperCase();
}

interface SortedGroup {
  letter: string;
  terms: GlossaryTerm[];
}

export default function Glossar() {
  const [location] = useLocation();

  const sortedGroups: SortedGroup[] = useMemo(() => {
    const sorted = [...glossaryTerms].sort((a, b) =>
      a.term.localeCompare(b.term, "de")
    );
    const groups = new Map<string, GlossaryTerm[]>();
    for (const term of sorted) {
      const letter = firstLetter(term.term);
      const arr = groups.get(letter) ?? [];
      arr.push(term);
      groups.set(letter, arr);
    }
    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b, "de"))
      .map(([letter, terms]) => ({ letter, terms }));
  }, []);

  // Cross-Page-Deeplink: /glossar?q=DBT scrollt zum passenden Term.
  // Auch /glossar#term-xyz wird vom Browser nativ behandelt — diese
  // useEffect ergänzt das nur für die ?q=-Variante.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (!q) return;
    const needle = q.toLowerCase().trim();
    const match = glossaryTerms.find(
      t =>
        t.term.toLowerCase() === needle ||
        t.abbreviation?.toLowerCase() === needle ||
        t.term.toLowerCase().includes(needle)
    );
    if (!match) return;
    const id = `term-${slugifyTerm(match.term)}`;
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location]);

  // Deep-Link /glossar#dsm-5-kriterien öffnet den <details>-Block automatisch.
  useEffect(() => {
    const openDetailsFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      const el = document.getElementById(hash);
      if (el && el.tagName === "DETAILS") {
        (el as HTMLDetailsElement).open = true;
      }
    };
    openDetailsFromHash();
    window.addEventListener("hashchange", openDetailsFromHash);
    return () => window.removeEventListener("hashchange", openDetailsFromHash);
  }, []);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, anchorId: string) => {
      e.preventDefault();
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  const dtStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-lg)",
    fontWeight: "var(--weight-display)",
    lineHeight: "var(--lh-snug)",
    color: "var(--fg-primary)",
    letterSpacing: "var(--tracking-tight)",
  };

  const ddStyle = {
    fontSize: "var(--text-md)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-secondary)",
  };

  const exampleStyle = {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-tertiary)",
    fontStyle: "italic" as const,
  };

  const labelStyle = {
    fontSize: "var(--text-xs)",
    letterSpacing: "var(--tracking-caps)",
    color: "var(--fg-tertiary)",
    fontWeight: 500,
  } as const;

  const letterHeaderStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-2xl)",
    fontWeight: "var(--weight-display)",
    color: "var(--accent-primary)",
    letterSpacing: "var(--tracking-tight)",
    lineHeight: 1,
  };

  return (
    <Layout>
      <SEO
        title="Glossar"
        description="Fachbegriffe rund um Borderline verständlich erklärt: von BPS über DBT bis Dysregulation – für Angehörige ohne Vorkenntnisse."
        path="/glossar"
      />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-16 pt-12 md:pb-24 md:pt-16">
          <EyebrowLabel spacing="compact">Glossar</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Glossar
          </DisplayHeading>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Fachbegriffe verständlich erklärt – für Angehörige, die sich neu
            einlesen oder bestimmte Konzepte nachschlagen möchten.
          </p>
          <p className="mt-4 uppercase" style={labelStyle}>
            {glossaryTerms.length} Begriffe
          </p>
          <ReviewBadge path="/glossar" className="mt-4" />
        </header>

        {/* ── Anker-Sprungleiste A–Z ── */}
        <nav
          aria-label="Buchstaben-Sprungleiste"
          className="border-t border-b py-4"
          style={{ borderColor: "var(--rule-color)" }}
        >
          <p
            className="flex flex-wrap gap-x-4 gap-y-2 uppercase"
            style={labelStyle}
          >
            {sortedGroups.map(group => (
              <a
                key={group.letter}
                href={`#letter-${group.letter.toLowerCase()}`}
                className="editorial-link"
                onClick={e =>
                  handleAnchorClick(e, `letter-${group.letter.toLowerCase()}`)
                }
              >
                {group.letter}
              </a>
            ))}
          </p>
        </nav>

        {/* ── Glossar-Liste ── */}
        {/* HTML-Spec: <dl> darf direkt nur <dt>, <dd>, <div>, <script>,
           <template> enthalten. Buchstaben-Sections + <h2> deshalb ausserhalb
           der einzelnen <dl>-Bloecke (eines pro Buchstabe). */}
        <div className="mt-12 space-y-12">
          {sortedGroups.map(group => (
            <section
              key={group.letter}
              id={`letter-${group.letter.toLowerCase()}`}
              className="space-y-8"
              aria-labelledby={`letter-${group.letter.toLowerCase()}-heading`}
            >
              <h2
                id={`letter-${group.letter.toLowerCase()}-heading`}
                className="border-b pb-3"
                style={{
                  ...letterHeaderStyle,
                  borderColor: "var(--rule-color)",
                }}
                aria-label={`Begriffe mit ${group.letter}`}
              >
                {group.letter}
              </h2>
              <dl className="space-y-8">
                {group.terms.map(t => {
                  const id = `term-${slugifyTerm(t.term)}`;
                  return (
                    <div key={t.term} id={id} className="space-y-3">
                      <dt style={dtStyle}>
                        {t.term}
                        {t.abbreviation && (
                          <span
                            className="ml-2"
                            style={{
                              fontSize: "var(--text-md)",
                              fontWeight: 400,
                              color: "var(--fg-tertiary)",
                            }}
                          >
                            ({t.abbreviation})
                          </span>
                        )}
                      </dt>
                      <dd>
                        <p className="uppercase" style={labelStyle}>
                          {categoryLabels[t.category]}
                        </p>
                      </dd>
                      <EditorialBody as="dd">{t.definition}</EditorialBody>
                      {t.example && (
                        <dd style={exampleStyle}>
                          <strong
                            style={{
                              color: "var(--fg-secondary)",
                              fontStyle: "normal",
                            }}
                          >
                            Beispiel:{" "}
                          </strong>
                          {t.example}
                        </dd>
                      )}
                      {t.criteria && (
                        <dd>
                          <details id="dsm-5-kriterien" className="mt-1">
                            <summary
                              className="cursor-pointer uppercase"
                              style={{
                                ...labelStyle,
                                color: "var(--accent-primary)",
                              }}
                            >
                              DSM-5-Kriterien anzeigen
                            </summary>
                            <div className="mt-3 space-y-2">
                              <EditorialBody>{t.criteria.intro}</EditorialBody>
                              <ol
                                className="ml-4 mt-2 space-y-1"
                                style={{ ...ddStyle, listStyleType: "decimal" }}
                              >
                                {t.criteria.items.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ol>
                            </div>
                          </details>
                        </dd>
                      )}
                      {t.relatedPage && t.relatedPageTitle && (
                        <dd style={{ fontSize: "var(--text-sm)" }}>
                          Siehe auch:{" "}
                          <Link href={t.relatedPage} className="editorial-link">
                            {t.relatedPageTitle}
                          </Link>
                        </dd>
                      )}
                      <dd>
                        <ClaimEvidence claimIds={t.claimIds} />
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          ))}
        </div>

        {/* ── Hinweis: Begriffe im Kontext verstehen ── */}
        <EditorialSectionBlock
          label="Hinweis"
          title="Begriffe im Kontext verstehen"
          rule
        >
          <EditorialProse>
            <p>
              Dieses Glossar bietet vereinfachte Erklärungen für Angehörige. Die
              Begriffe werden in der Fachliteratur und klinischen Praxis oft
              differenzierter verwendet. Bei Fragen zur Diagnose oder Behandlung
              wenden Sie sich bitte an Fachpersonen.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>
      </EditorialLayout>
    </Layout>
  );
}
