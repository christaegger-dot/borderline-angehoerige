import { useCallback, useEffect, useMemo } from "react";
import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Link, useLocation } from "wouter";

interface GlossaryTerm {
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

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Borderline-Persönlichkeitsstörung",
    abbreviation: "BPS",
    category: "symptome",
    definition:
      "Ein komplexes Störungsbild mit starker emotionaler Reagibilität, Schwierigkeiten mit innerer Stabilität und einem Beziehungserleben, das unter Bindungsstress schnell ins Wanken geraten kann. Klassifiziert im DSM-5 als eigenständige Persönlichkeitsstörung und im ICD-11 als «Borderline-Muster» (Code 6D11.5). Die englische Bezeichnung lautet Borderline Personality Disorder (BPD).",
    example:
      "Ausprägung und Verlauf unterscheiden sich deutlich: Manche Menschen wirken vor allem impulsiv und explosiv, andere eher verzweifelt, zurückgezogen, leer oder selbstabwertend.",
    criteria: {
      intro:
        "Für eine Diagnose nach DSM-5 müssen mindestens 5 der folgenden 9 Merkmale zutreffen:",
      items: [
        "Verzweifeltes Bemühen, reales oder vorgestelltes Verlassenwerden zu vermeiden",
        "Instabile und intensive zwischenmenschliche Beziehungen (abwechselnd Idealisierung und Entwertung)",
        "Instabiles Selbstbild oder instabile Selbstwahrnehmung",
        "Impulsivität in mindestens zwei potenziell selbstschädigenden Bereichen (z.B. Geldausgaben, Substanzkonsum, Sexualität, rücksichtsloses Fahren, Essanfälle)",
        "Wiederkehrende suizidale Handlungen, Drohungen oder Selbstverletzungen",
        "Ausgeprägte Stimmungsinstabilität (intensive Episoden von Dysphorie, Reizbarkeit oder Angst)",
        "Chronisches Gefühl der Leere",
        "Unangemessene, intensive Wut oder Schwierigkeiten, Wut zu kontrollieren",
        "Vorübergehende, stressabhängige paranoide Vorstellungen oder schwere dissoziative Symptome",
      ],
    },
    relatedPage: "/verstehen",
    relatedPageTitle: "Borderline verstehen",
  },
  {
    term: "Dialektisch-Behaviorale Therapie",
    abbreviation: "DBT",
    category: "therapie",
    definition:
      "Die DBT ist eine der am besten untersuchten und am breitesten etablierten Therapieformen für Borderline. Sie wurde von Marsha Linehan entwickelt und kombiniert Verhaltenstherapie mit Achtsamkeitspraktiken. Der Begriff 'dialektisch' bezieht sich auf die Balance zwischen Akzeptanz (so wie es ist) und Veränderung (was besser werden kann).",
    example:
      "In der DBT lernen Betroffene konkrete Fertigkeiten (Skills) zur Emotionsregulation, Stresstoleranz, zwischenmenschlichen Effektivität und Achtsamkeit.",
    relatedPage: "/unterstuetzen/therapie",
    relatedPageTitle: "Therapie unterstützen",
  },
  {
    term: "Skills",
    category: "therapie",
    definition:
      "Skills sind konkrete Fertigkeiten, die in der DBT erlernt werden. Sie sollen helfen, mit intensiven Emotionen, Krisen und zwischenmenschlichen Spannungen anders umzugehen, ohne sofort auf selbstschädigende oder eskalierende Muster zurückzugreifen.",
    example:
      "Ein Skill bei starker Anspannung kann sein, die Hände in eiskaltes Wasser zu tauchen – der intensive Reiz lenkt vom emotionalen Schmerz ab.",
    relatedPage: "/unterstuetzen/alltag",
    relatedPageTitle: "Im Alltag unterstützen",
  },
  {
    term: "Komorbidität",
    category: "symptome",
    definition:
      "Mehrere Erkrankungen, die gleichzeitig oder nacheinander auftreten. Bei Borderline besonders häufig: Depression, Angststörungen, PTBS, Essstörungen, Substanzgebrauchsstörungen. Der Begriff bedeutet nicht «doppelt schlimm», sondern beschreibt eine Kombination, die behandelt werden kann.",
    relatedPage: "/begleiterkrankungen",
    relatedPageTitle: "Begleiterkrankungen",
  },
  {
    term: "Mentalisierung",
    category: "therapie",
    definition:
      "Die Fähigkeit, das eigene Verhalten und das Verhalten anderer Menschen als Ausdruck von Gedanken, Gefühlen, Wünschen und Absichten zu verstehen. Bei Menschen mit Borderline ist diese Fähigkeit oft beeinträchtigt, besonders in emotional aufgeladenen Situationen.",
    example:
      "Wenn jemand mentalisiert, denkt er: 'Sie ist vielleicht gereizt, weil sie einen stressigen Tag hatte' – statt: 'Sie hasst mich'.",
  },
  {
    term: "Übertragungsfokussierte Psychotherapie",
    abbreviation: "TFP",
    category: "therapie",
    definition:
      "Eine evidenzbasierte Psychotherapie für Borderline, entwickelt von Otto Kernberg und Mitarbeitenden. TFP arbeitet mit dem Beziehungserleben in der therapeutischen Beziehung selbst: innere Konflikte werden im «Hier und Jetzt» zwischen Therapeut:in und Patient:in sichtbar und können dort bearbeitet werden. In der Schweizer Versorgungsrealität weniger verbreitet als DBT, aber als evidenzbasierte Therapie etabliert.",
    example:
      "Wenn eine Patientin in der Therapie wechselnd Idealisierung und Entwertung der Therapeutin erlebt, wird genau diese Schwankung zum Bearbeitungs-Material — als gelebte Form innerer Spaltung.",
    relatedPage: "/unterstuetzen/therapie",
    relatedPageTitle: "Therapie unterstützen",
  },
  {
    term: "Remission",
    category: "therapie",
    definition:
      "In der Borderline-Forschung bedeutet Remission, dass eine Person nicht mehr genügend Kriterien für die Diagnose erfüllt. Studien zeigen, dass 85–93% der Betroffenen innerhalb von 10 Jahren eine Remission erreichen (u.a. Zanarini et al., 2010). Diese Zahlen stammen aus Spezialzentren und sind nicht direkt auf die Allgemeinbevölkerung übertragbar.",
    relatedPage: "/genesung",
    relatedPageTitle: "Genesung ist möglich",
  },
  {
    term: "Recovery",
    category: "therapie",
    definition:
      "Recovery geht über Remission hinaus und meint eine umfassendere alltagsbezogene Genesung, also mehr funktionelle Stabilität in Beziehungen, Arbeit oder Ausbildung und im eigenen Leben. Etwa 50% der Betroffenen erreichen nach 10 Jahren eine solche umfassendere Genesung (Zanarini et al., 2012).",
    relatedPage: "/genesung",
    relatedPageTitle: "Genesung ist möglich",
  },
  {
    term: "Validierung",
    category: "kommunikation",
    definition:
      "Validierung bedeutet, die Gefühle und Erfahrungen einer Person als verständlich und nachvollziehbar anzuerkennen, auch wenn man das Verhalten nicht gutheisst. Für Angehörige ist sie oft ein hilfreicher Ausgangspunkt, weil sie Druck aus Gesprächen nehmen kann, ohne alles zu bestätigen.",
    example:
      "'Ich verstehe, dass du dich verletzt fühlst, wenn ich später nach Hause komme als angekündigt. Das macht Sinn, weil du dir Sorgen machst.'",
    relatedPage: "/kommunizieren",
    relatedPageTitle: "Kommunizieren",
  },
  {
    term: "SET-Kommunikation",
    category: "kommunikation",
    definition:
      "SET steht für Support (Unterstützung), Empathy (Empathie) und Truth (Wahrheit/Realität). Gemeint ist ein Gesprächsrahmen aus der Angehörigenliteratur, der helfen soll, Zugewandtheit, Mitgefühl und Klarheit zusammenzuhalten.",
    example:
      "Support: 'Ich bin für dich da.' Empathy: 'Ich sehe, wie sehr dich das belastet.' Truth: 'Gleichzeitig können wir nicht jede Nacht bis 3 Uhr diskutieren.'",
    relatedPage: "/kommunizieren",
    relatedPageTitle: "Kommunizieren",
  },
  {
    term: "DEARMAN",
    category: "kommunikation",
    definition:
      "DEARMAN ist eine DBT-Struktur für klare Bitten und Grenzen: Describe (beschreiben), Express (ausdrücken), Assert (klar benennen), Reinforce (verstärken), Mindful (achtsam bleiben), Appear confident (klar auftreten), Negotiate (verhandeln).",
    example:
      "Statt 'Du hörst mir nie zu!' → 'Wenn ich spreche und du aufs Handy schaust (D), fühle ich mich unwichtig (E). Ich wünsche mir, dass du das Handy weglegst (A).'",
    relatedPage: "/kommunizieren",
    relatedPageTitle: "Kommunizieren",
  },
  {
    term: "Invalidierung",
    category: "kommunikation",
    definition:
      "Das Gegenteil von Validierung: Die Gefühle oder Erfahrungen einer Person werden abgewertet, ignoriert oder als übertrieben dargestellt. Invalidierung kann Krisen verschärfen und ist besonders schmerzhaft für Menschen mit Borderline.",
    example:
      "Invalidierende Aussagen: 'Das ist doch nicht so schlimm', 'Du übertreibst mal wieder', 'Andere haben es viel schwerer'.",
  },
  {
    term: "Emotionale Dysregulation",
    category: "symptome",
    definition:
      "Die Schwierigkeit, Emotionen zu regulieren – sie werden intensiver erlebt, schneller ausgelöst und klingen langsamer ab. Dies ist ein Kernmerkmal von Borderline und erklärt viele der beobachtbaren Verhaltensweisen.",
    example:
      "Eine kleine Enttäuschung kann sich anfühlen wie ein Weltuntergang. Die Emotion ist real und intensiv – nur die Auslöser-Reaktion-Verhältnis ist anders.",
    relatedPage: "/verstehen",
    relatedPageTitle: "Borderline verstehen",
  },
  {
    term: "Splitting",
    category: "symptome",
    definition:
      "Ein Denkmuster, bei dem Menschen oder Situationen als 'ganz gut' oder 'ganz schlecht' wahrgenommen werden, ohne Grautöne. Dies ist keine bewusste Manipulation, sondern eine automatische Reaktion auf emotionale Überforderung.",
    example:
      "Gestern war der Partner 'der beste Mensch der Welt', heute nach einem Streit 'hat er mich nie geliebt'. Beide Extreme fühlen sich im Moment absolut wahr an.",
    relatedPage: "/verstehen",
    relatedPageTitle: "Borderline verstehen",
  },
  {
    term: "Verlassensangst",
    category: "symptome",
    definition:
      "Eine intensive, oft überwältigende Angst vor dem Verlassenwerden – real oder eingebildet. Diese Angst kann zu verzweifelten Versuchen führen, Beziehungen aufrechtzuerhalten, oder paradoxerweise dazu, andere zuerst zu verlassen.",
    example:
      "Schon eine kurze Verzögerung bei einer Antwort kann Panik auslösen: 'Er antwortet nicht – er will mich verlassen!'",
    relatedPage: "/verstehen",
    relatedPageTitle: "Borderline verstehen",
  },
  {
    term: "Dissoziation",
    category: "symptome",
    definition:
      "Ein Zustand, in dem sich Menschen von sich selbst, ihrem Körper oder ihrer Umgebung abgetrennt fühlen. Es ist eine Schutzreaktion des Gehirns auf überwältigende Emotionen oder Stress.",
    example:
      "Betroffene beschreiben es als 'neben sich stehen', 'wie in Watte gepackt sein' oder 'die Welt wirkt unwirklich'.",
  },
  {
    term: "Identitätsdiffusion",
    category: "symptome",
    definition:
      "Ein instabiles oder unklares Selbstbild. Menschen mit Borderline haben oft Schwierigkeiten zu beschreiben, wer sie sind, was sie wollen oder was ihre Werte sind – unabhängig von anderen Menschen.",
    example:
      "'Ich weiss nicht, wer ich bin, wenn ich alleine bin. Ich übernehme immer die Interessen meines Partners.'",
    relatedPage: "/verstehen",
    relatedPageTitle: "Borderline verstehen",
  },
  {
    term: "Selbstfürsorge",
    category: "selbsthilfe",
    definition:
      "Bewusste Handlungen, um die eigene körperliche, emotionale und mentale Gesundheit zu erhalten. Für Angehörige von Menschen mit Borderline ist Selbstfürsorge keine Selbstsucht, sondern notwendig, um langfristig unterstützen zu können.",
    example:
      "Regelmässige Pausen, eigene Hobbys pflegen, professionelle Unterstützung suchen, Grenzen setzen.",
    relatedPage: "/selbstfuersorge",
    relatedPageTitle: "Selbstfürsorge",
  },
  {
    term: "Grenzen setzen",
    category: "selbsthilfe",
    definition:
      "Klare Kommunikation darüber, welches Verhalten akzeptabel ist und welches nicht – mit konsequenter Umsetzung. Grenzen schützen beide Seiten und sind ein Zeichen von Respekt, nicht von Ablehnung.",
    example:
      "'Ich bin bereit, mit dir zu sprechen, aber nicht, wenn du schreist. Wenn du ruhiger bist, bin ich wieder da.'",
    relatedPage: "/grenzen",
    relatedPageTitle: "Grenzen setzen",
  },
  {
    term: "Co-Abhängigkeit",
    category: "selbsthilfe",
    definition:
      "Ein Beziehungsmuster, bei dem das eigene Wohlbefinden übermässig vom Zustand des anderen abhängt. Angehörige vernachlässigen dabei oft eigene Bedürfnisse und versuchen, die Lage des anderen ständig mitzutragen oder zu kontrollieren.",
    example:
      "Warnsignale: 'Ich kann nur glücklich sein, wenn es ihr gut geht', 'Ich habe keine eigenen Freunde mehr', 'Ich sage nie Nein'.",
    relatedPage: "/selbstfuersorge",
    relatedPageTitle: "Selbstfürsorge",
  },
  {
    term: "Enabling",
    category: "selbsthilfe",
    definition:
      "Verhaltensweisen von Angehörigen, die problematische Muster unbeabsichtigt mittragen oder verstärken, oft aus dem Wunsch zu helfen. Das Gegenstück ist nicht Härte, sondern klarere Grenzen und das Zulassen natürlicher Konsequenzen.",
    example:
      "Immer wieder Geld leihen, obwohl es nie zurückkommt; Ausreden für verpasste Termine erfinden; alle Konflikte vermeiden.",
    relatedPage: "/grenzen",
    relatedPageTitle: "Grenzen setzen",
  },
  {
    term: "Leuchtturm-Prinzip",
    category: "selbsthilfe",
    definition:
      "Eine Metapher für die Rolle von Angehörigen: Sie können ein Leuchtturm sein – stabil, verlässlich, orientierungsgebend – aber sie können nicht das Schiff steuern. Die Verantwortung für die Genesung liegt beim Betroffenen.",
    example:
      "'Ich bin da, ich leuchte, ich zeige die Richtung – aber ich kann nicht für dich schwimmen.'",
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

/** Slugifiziert einen Term zu URL-sicherer Anker-ID. */
function slugifyTerm(term: string): string {
  return term
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
        <header className="pb-16 pt-16 md:pb-24 md:pt-24">
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
        <dl className="mt-12 space-y-12">
          {sortedGroups.map(group => (
            <section
              key={group.letter}
              id={`letter-${group.letter.toLowerCase()}`}
              className="space-y-8"
            >
              <h2
                className="border-b pb-3"
                style={{
                  ...letterHeaderStyle,
                  borderColor: "var(--rule-color)",
                }}
                aria-label={`Begriffe mit ${group.letter}`}
              >
                {group.letter}
              </h2>
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
                    <p className="uppercase" style={labelStyle}>
                      {categoryLabels[t.category]}
                    </p>
                    <dd style={ddStyle}>{t.definition}</dd>
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
                            <p style={ddStyle}>{t.criteria.intro}</p>
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
                  </div>
                );
              })}
            </section>
          ))}
        </dl>

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
