/**
 * Unterstützen — Alltag — Editorial-Redesign Phase 4 Welle 2 (Page 5/10)
 *
 * Migriert nach Verstehen/Kommunizieren/Grenzen/Selbstfürsorge/Übersicht-
 * Pattern. Inhalt unverändert ausser Hero-Lesezeit und prosaischen
 * Verbindungssätzen.
 *
 * Out of scope: `EnergieHaushaltVisualisierung` (visuelle Sub-Komponente,
 * eigenständige Migration in späterer Welle), `UnterstuetzenSubNav`
 * (Cross-Page-Navigation), `LastVerifiedBadge` (page-level Meta-Info wie
 * in Grenzen-Migration).
 *
 * Sicherheits-Hinweis in `impulsivitaet`: dezent erhalten als
 * EditorialPullQuote-ähnliche Hervorhebung, weil der Verweis auf
 * Krisenbegleitung sicherheitsrelevant ist (Selbst-/Fremdgefährdung).
 */
import { useCallback } from "react";
import ContentSection from "@/components/ContentSection";
import {
  EditorialLayout,
  EditorialProse,
  EditorialPullQuote,
  EditorialSection,
} from "@/components/editorial";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import UnterstuetzenSubNav from "@/components/UnterstuetzenSubNav";
import { TableOfContents } from "@/components/UXEnhancements";
import EnergieHaushaltVisualisierung from "@/components/visualizations/EnergieHaushaltVisualisierung";
import { Link } from "wouter";

/** Öffnet eine ContentSection via Custom Event und scrollt dorthin. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

const wasHilft = [
  {
    title: "Verlässliche Absprachen",
    description:
      "Regelmässigkeit und angekündigte Änderungen entlasten oft stärker als spontane intensive Zuwendung.",
    example:
      "«Ich rufe dich heute Abend nach dem Essen an. Wenn ich mich verspäte, sage ich Bescheid.»",
    dialog: [
      {
        sprecher: "Betroffene Person",
        text: "Du hast dich gestern gar nicht gemeldet.",
      },
      {
        sprecher: "Sie",
        text: "Du hast recht — ich hätte Bescheid geben sollen. Das war nicht gut. Heute Abend um 20 Uhr rufe ich an.",
      },
      {
        sprecher: "Betroffene Person",
        text: "Und wenn wieder nichts kommt?",
      },
      {
        sprecher: "Sie",
        text: "Dann schreibe ich kurz. Aber ich halte das ein.",
      },
    ],
  },
  {
    title: "Klar sagen, was Sie meinen",
    description:
      "Doppeldeutigkeiten, Beschwichtigungen oder halbe Zusagen schaffen im Alltag oft mehr Unruhe als ehrliche Klarheit.",
    example:
      "«Ich brauche heute Abend Ruhe und bin morgen wieder ansprechbar.»",
    dialog: [
      {
        sprecher: "Betroffene Person",
        text: "Kannst du heute noch vorbeikommen?",
      },
      {
        sprecher: "Sie",
        text: "Nein, heute nicht. Ich brauche den Abend für mich.",
      },
      { sprecher: "Betroffene Person", text: "Du willst also nicht." },
      {
        sprecher: "Sie",
        text: "Ich will — und ich brauche heute Abstand. Morgen Nachmittag bin ich gerne da.",
      },
    ],
  },
  {
    title: "Ruhige Präsenz statt hektisches Reparieren",
    description:
      "Nicht jede Stimmung muss sofort gelöst werden. Oft hilft es mehr, ansprechbar und klar zu bleiben, ohne alles zu optimieren.",
    example:
      "«Ich merke, dass heute viel Anspannung da ist. Ich bin da, aber wir müssen das nicht sofort lösen.»",
    dialog: [
      {
        sprecher: "Betroffene Person",
        text: "Alles ist sinnlos. Es hat keinen Zweck mehr.",
      },
      { sprecher: "Sie", text: "Das klingt gerade sehr schwer. Ich bin da." },
      { sprecher: "Betroffene Person", text: "[Schweigen]" },
      {
        sprecher: "Sie",
        text: "Wir müssen das nicht sofort klären. Ich bleibe noch ein bisschen.",
      },
    ],
  },
  {
    title: "Begrenzte Verfügbarkeit",
    description:
      "Viele Angehörige fühlen sich verpflichtet, rund um die Uhr erreichbar zu sein – dieses Gefühl ist verständlich, aber auf Dauer nicht tragfähig. Grenzen bei der Erreichbarkeit sind keine Ablehnung, sondern ein Weg, langfristig präsent bleiben zu können.",
    example:
      "«Nach 22 Uhr bin ich nicht mehr am Handy. Wenn es ernst wird, holen wir zusätzliche Hilfe dazu.»",
    dialog: [
      {
        sprecher: "Betroffene Person",
        text: "Es ist 23 Uhr und ich kann nicht schlafen. Du gehst nicht ran.",
      },
      {
        sprecher: "Sie",
        text: "Ich sehe deine Nachricht erst morgen früh. Nach 22 Uhr bin ich offline.",
      },
      {
        sprecher: "Betroffene Person",
        text: "Was soll ich denn jetzt tun?",
      },
      {
        sprecher: "Sie",
        text: "Für Notfälle gibt es die 143. Die ist immer da. Morgen früh melden wir uns.",
      },
    ],
  },
] as const;

const beziehungsAchtsamkeitSchritte = [
  {
    title: "kurz innehalten",
    description:
      "Nicht sofort reagieren, wenn Sie merken, dass Sie innerlich in Alarm gehen.",
  },
  {
    title: "die Lage genauer lesen",
    description:
      "Was ist gerade wirklich los: Angst, Kränkung, Rückzug, Überforderung, alte Dynamik?",
  },
  {
    title: "auch sich selbst wahrnehmen",
    description:
      "Sind Sie gerade hilfsbereit, erschöpft, gereizt, schuldig oder im Rettungsmodus?",
  },
  {
    title: "bewusst und begrenzt handeln",
    description:
      "Nicht alles tun, was Beziehung sofort beruhigt, sondern das, was längerfristig tragfähig ist.",
  },
] as const;

const positiveInselnItems = [
  { title: "kurzer Spaziergang", examples: "ohne sofortiges Problemgespräch" },
  { title: "gemeinsames Essen", examples: "mit klarer zeitlicher Begrenzung" },
  {
    title: "etwas Vertrautes wiederholen",
    examples: "ein kleines Ritual, das nicht überfordert",
  },
  {
    title: "15 ruhige Minuten",
    examples: "ohne Lösungssuche, ohne Handy, ohne Druck",
  },
] as const;

const impulsivitaetZeichen = [
  {
    label: "Getriebensein",
    sub: "Ruhelosigkeit, Drang zu handeln, kann nicht warten",
  },
  {
    label: "Konsequenzblindheit",
    sub: "Folgen werden ausgeblendet oder kleingredet",
  },
  {
    label: "Grossausgaben",
    sub: "Spontankäufe, Schulden, finanzielle Risiken",
  },
  {
    label: "Abrupte Entscheidungen",
    sub: "Job kündigen, Beziehung beenden, umziehen",
  },
  {
    label: "Substanzkonsum",
    sub: "Alkohol, Cannabis oder andere Mittel als Ventil",
  },
  {
    label: "Risikoverhaltens",
    sub: "Fahren unter Einfluss, ungeschützter Sex, Gewalt",
  },
] as const;

const impulsivitaetSzenarien = [
  {
    titel: "Grossausgaben / finanzielle Risiken",
    hilft: [
      "Finanzielle Grenzen klar benennen: «Ich werde diese Ausgabe nicht mittragen.»",
      "Gemeinsame Konten getrennt halten, wenn das Muster bekannt ist",
      "In ruhiger Phase ansprechen: «Mir ist aufgefallen, dass du in letzter Zeit viel ausgibst. Das macht mir Sorge.»",
    ],
    nichtHilft: [
      "Ausgaben heimlich rückgängig machen",
      "Moralisieren («Du bist so unverantwortlich»)",
      "Einfach zahlen, um Streit zu vermeiden",
    ],
  },
  {
    titel: "Abrupte Entscheidungen (Kündigung, Umzug, Trennung)",
    hilft: [
      "Nicht sofort mitentscheiden – Reaktionszeit einfordern: «Lass uns das in drei Tagen nochmal besprechen.»",
      "Bedenken ruhig formulieren: «Ich mache mir Sorgen, weil... Hast du das bedacht?»",
      "Akzeptieren, dass Sie die Entscheidung nicht verhindern können",
    ],
    nichtHilft: [
      "Sofort in Panik verfallen oder Ultimaten stellen",
      "Die Entscheidung als Angriff auf Sie interpretieren",
      "Verantwortung für die Folgen übernehmen",
    ],
  },
  {
    titel: "Substanzkonsum / Risikoverhalten",
    hilft: [
      "Eigene Sicherheit priorisieren: Fahren mit unter Einfluss stehender Person ablehnen",
      "Konkret und ohne Urteil benennen: «Ich mache mir Sorgen, wie viel du trinkst.»",
      "Therapeutin oder Fachstelle einbeziehen, wenn das Muster anhält",
    ],
    nichtHilft: [
      "Konsum verstecken oder normalisieren",
      "Kontrolle übernehmen («Ich verstecke die Flaschen»)",
      "Drohen und nicht handeln",
    ],
  },
] as const;

export default function UnterstuetzenAlltag() {
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

  const exampleStyle = {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-primary)",
    fontStyle: "italic" as const,
  };

  return (
    <Layout>
      <SEO
        title="Unterstützen im Alltag"
        description="Wie Angehörige im Alltag hilfreich bleiben können: verlässlich, klar und ohne sich selbst zu verlieren."
        path="/unterstuetzen/alltag"
      />
      <MedicalPageSchema
        title="Unterstützen im Alltag"
        description="Wie Angehörige im Alltag hilfreich bleiben können: verlässlich, klar und ohne sich selbst zu verlieren."
        path="/unterstuetzen/alltag"
      />
      <TableOfContents />

      <UnterstuetzenSubNav />

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
            Unterstützen — Alltag
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
            Im Alltag <em>unterstützen</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Belastete Beziehungen bestehen nicht nur aus Krisen. Meist prägen
            sie den Alltag: Anspannung in der Luft, vorsichtiges Abtasten,
            Rückzug nach Konflikten, Schuldgefühle, Erreichbarkeitsdruck und die
            Frage, wie viel Nähe gerade hilfreich ist. Diese Seite geht darum,
            was im Alltag trägt und was eher erschöpft.
          </p>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Vollständig ca. 8 Min · Auch abschnittweise lesbar.
          </p>
          <LastVerifiedBadge date="16.04.2026" className="mt-6" />
        </header>

        {/* ── Intro: Was diese Seite im Alltag ordnet ── */}
        <EditorialSection
          label="Überblick"
          title="Was diese Seite im Alltag ordnet"
        >
          <EditorialProse>
            <p>
              Diese Seite hilft Ihnen, Alltagsunterstützung nicht nur als
              Reaktion auf einzelne Krisen zu sehen. Im Zentrum stehen
              Daueranspannung, vorhersehbare Absprachen, kleine
              Entlastungsinseln und die Frage, wie Unterstützung tragfähig
              bleibt, ohne dass Sie sich selbst verlieren.
            </p>
            <p>
              Drei Akzente ziehen sich durch die Seite: zuerst die
              Daueranspannung ernst nehmen — Alltag kann erschöpfend sein, auch
              wenn äusserlich gerade nichts eskaliert; dann Vorhersehbarkeit
              schaffen — klare Absprachen, ruhige Präsenz und begrenzte
              Verfügbarkeit tragen oft mehr als hektische Reparatur; und
              schliesslich die Beziehung atmungsfähig halten — kleine positive
              Inseln und klare Grenzen helfen, dass Unterstützung nicht in
              Überforderung kippt.
            </p>
            <p>
              Sie können auch direkt zu{" "}
              <a
                href="#alltagsspannung"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "alltagsspannung")}
              >
                Alltagsspannung
              </a>
              ,{" "}
              <a
                href="#was-hilft"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "was-hilft")}
              >
                was hilft
              </a>
              ,{" "}
              <a
                href="#impulsivitaet"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "impulsivitaet")}
              >
                Impulsivität
              </a>{" "}
              oder{" "}
              <a
                href="#grenzen"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "grenzen")}
              >
                Grenzen
              </a>{" "}
              springen.
            </p>
            <p>
              Wenn die Lage in Richtung Selbst- oder Fremdgefährdung, massiver
              Eskalation oder Kontrollverlust kippt, geht es nicht mehr primär
              um Alltagsbegleitung, sondern um{" "}
              <Link href="/unterstuetzen/krise" className="editorial-link">
                Krisenbegleitung
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSection>

        {/* ── Visualisierung (out-of-scope, eigenständige Komponente) ── */}
        <EnergieHaushaltVisualisierung />

        {/* ── ContentSection 1: alltagsspannung ── */}
        <ContentSection
          variant="editorial"
          title="Der Alltag ist oft nicht ruhig, sondern vorspannt"
          id="alltagsspannung"
          defaultOpen={true}
          preview="Viele Angehörige leben nicht in dauernder Krise, sondern in dauernder Vorahnung von Krise. Gerade das kann zermürbend sein."
        >
          <EditorialProse>
            <p>
              Viele Angehörige kennen weniger den permanenten Ausnahmezustand
              als einen Alltag, der unterschwellig unter Spannung steht: Man
              beobachtet Stimmungen, wägt Worte ab, rechnet mit plötzlichem
              Rückzug oder Ärger und versucht gleichzeitig, Normalität
              aufrechtzuerhalten.
            </p>
            <p>
              Diese dauernde innere Wachsamkeit ist anstrengend. Sie kostet
              Energie, auch wenn äusserlich gerade «nichts passiert». Hilfreiche
              Alltagsunterstützung beginnt oft damit, diese Belastung ernst zu
              nehmen und nicht nur auf sichtbare Eskalationen zu reagieren.
            </p>
          </EditorialProse>
          <div className="mt-4">
            <EditorialPullQuote>
              Alltagshilfe bedeutet deshalb nicht, immer mehr zu tun. Oft
              bedeutet sie, Beziehungen etwas vorhersehbarer, klarer und weniger
              reaktiv zu machen.
            </EditorialPullQuote>
          </div>
          <figure
            className="mt-8 border-t pt-6"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <p
              className="text-center uppercase"
              style={{
                fontSize: "var(--text-xs)",
                letterSpacing: "var(--tracking-caps)",
                color: "var(--fg-tertiary)",
                fontWeight: 500,
              }}
            >
              Spannungsverlauf im Alltag
            </p>
            <svg
              viewBox="0 0 300 72"
              className="mt-3 h-16 w-full"
              aria-hidden="true"
            >
              <path
                d="M 15,48 C 60,48 80,38 120,42 S 180,48 240,44 S 270,42 285,42"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4,3"
                opacity="0.25"
              />
              <path
                d="M 15,35 C 40,33 55,32 70,33 S 85,30 90,18 S 95,32 110,32 S 140,30 155,32 S 165,28 170,14 S 175,32 195,31 S 220,30 235,31 S 250,28 255,20 S 260,32 285,30"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="15"
                y="68"
                fontSize="7.5"
                fill="currentColor"
                opacity="0.45"
              >
                Mo
              </text>
              <text
                x="82"
                y="68"
                fontSize="7.5"
                fill="currentColor"
                opacity="0.45"
              >
                Di
              </text>
              <text
                x="160"
                y="68"
                fontSize="7.5"
                fill="currentColor"
                opacity="0.45"
              >
                Mi
              </text>
              <text
                x="244"
                y="68"
                fontSize="7.5"
                fill="currentColor"
                opacity="0.45"
              >
                Do
              </text>
              <line
                x1="15"
                y1="8"
                x2="32"
                y2="8"
                stroke="var(--accent-primary)"
                strokeWidth="2"
              />
              <text
                x="35"
                y="11"
                fontSize="7.5"
                fill="currentColor"
                opacity="0.6"
              >
                Mit Angehörigem
              </text>
              <line
                x1="140"
                y1="8"
                x2="157"
                y2="8"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="3,2"
                opacity="0.4"
              />
              <text
                x="160"
                y="11"
                fontSize="7.5"
                fill="currentColor"
                opacity="0.6"
              >
                Ohne Belastung
              </text>
            </svg>
            <figcaption
              className="mt-2 text-center"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--fg-tertiary)",
              }}
            >
              Erhöhte Grundspannung kostet Energie — auch wenn äusserlich
              «nichts passiert».
            </figcaption>
          </figure>
        </ContentSection>

        {/* ── ContentSection 2: was-hilft ── */}
        <ContentSection
          variant="editorial"
          title="Was im Alltag oft wirklich hilft"
          id="was-hilft"
          preview="Nicht grosse Gesten, sondern Klarheit, Verlässlichkeit, ruhige Präsenz und begrenzte Verfügbarkeit tragen häufig am meisten."
        >
          <div className="mt-2 space-y-10">
            {wasHilft.map(item => (
              <article key={item.title} className="space-y-3">
                <h4 style={h4Style}>{item.title}</h4>
                <p style={bodyStyle}>{item.description}</p>
                <p style={exampleStyle}>{item.example}</p>
                <div
                  className="border-t pt-3"
                  style={{ borderColor: "var(--rule-color)" }}
                >
                  <p
                    className="uppercase"
                    style={{
                      fontSize: "var(--text-xs)",
                      letterSpacing: "var(--tracking-caps)",
                      color: "var(--fg-tertiary)",
                      fontWeight: 500,
                    }}
                  >
                    Wie das klingen kann
                  </p>
                  <dl className="mt-2 space-y-1.5">
                    {item.dialog.map((zeile, i) => (
                      <div key={i} className="flex gap-3">
                        <dt
                          className="shrink-0"
                          style={{
                            fontSize: "var(--text-xs)",
                            color: "var(--fg-tertiary)",
                            fontWeight: 500,
                            minWidth: "5rem",
                          }}
                        >
                          {zeile.sprecher}
                        </dt>
                        <dd
                          style={{
                            fontSize: "var(--text-sm)",
                            lineHeight: "var(--lh-snug)",
                            color:
                              zeile.text === "[Schweigen]"
                                ? "var(--fg-tertiary)"
                                : "var(--fg-primary)",
                            fontStyle:
                              zeile.text === "[Schweigen]"
                                ? "italic"
                                : "normal",
                          }}
                        >
                          {zeile.text}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </ContentSection>

        {/* ── ContentSection 3: rueckzug ── */}
        <ContentSection
          variant="editorial"
          title="Nach Konflikten und Rückzug"
          id="rueckzug"
          preview="Viele Beziehungen leiden weniger nur an Streit als an dem, was danach folgt: Schweigen, Unsicherheit, Funkstille oder ein vorsichtiger Neustart."
        >
          <EditorialProse>
            <p>
              Nach Konflikten entsteht oft ein belastender Zwischenraum.
              Angehörige wissen nicht, ob sie nachgehen oder Abstand lassen
              sollen, ob Schweigen beruhigt oder eskaliert, ob ein Gespräch
              hilfreich wäre oder zu früh käme.
            </p>
          </EditorialProse>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <h4 style={h4Style}>Hilfreich kann sein</h4>
              <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                <li>ein kurzes, klares Kontaktangebot</li>
                <li>nicht drängen, aber auch nicht strafen</li>
                <li>später aufgreifen, was passiert ist</li>
                <li>zwischen Raum geben und Beziehungsabbruch unterscheiden</li>
              </ul>
            </div>
            <div>
              <h4 style={h4Style}>Weniger hilfreich ist oft</h4>
              <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                <li>mehrfach nachfassen aus Panik</li>
                <li>Gegenrückzug aus Verletzung</li>
                <li>so tun, als wäre nichts gewesen</li>
                <li>mitten im Alarm sofort alles klären wollen</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <EditorialPullQuote>
              Im Alltag ist nach einem Bruch oft nicht Perfektion gefragt,
              sondern ein ruhiger, begrenzter Wiedereinstieg in Kontakt.
            </EditorialPullQuote>
          </div>
        </ContentSection>

        {/* ── ContentSection 4: beziehungs-achtsamkeit ── */}
        <ContentSection
          variant="editorial"
          title="Beziehungs-Achtsamkeit im echten Alltag"
          id="beziehungs-achtsamkeit"
          preview="Bewusst wahrnehmen, was gerade passiert, hilft vor allem dann, wenn Sie sonst in Alarm, Rechtfertigung oder Überanpassung kippen würden."
        >
          <ol className="mt-2 ml-5 list-decimal space-y-4">
            {beziehungsAchtsamkeitSchritte.map(item => (
              <li key={item.title}>
                <h4 style={h4Style}>{item.title}</h4>
                <p className="mt-1" style={bodyStyle}>
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </ContentSection>

        {/* ── ContentSection 5: positive-inseln ── */}
        <ContentSection
          variant="editorial"
          title="Kleine positive Inseln schaffen"
          id="positive-inseln"
          preview="Beziehung darf nicht nur aus Klärung, Kontrolle, Sorge und Krisenmanagement bestehen. Kleine unbelastete Momente sind kein Luxus."
        >
          <EditorialProse>
            <p>
              Wenn eine Beziehung fast nur noch um Symptome, Anspannung und
              Konflikt kreist, verliert sie ihre tragenden Anteile. Alltagshilfe
              heisst deshalb auch, kleine gemeinsame Momente zu schützen, die
              nicht sofort funktional sein müssen.
            </p>
          </EditorialProse>
          <ul className="mt-6 space-y-4">
            {positiveInselnItems.map(item => (
              <li key={item.title}>
                <h4 style={h4Style}>{item.title}</h4>
                <p className="mt-1" style={bodyStyle}>
                  {item.examples}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <EditorialPullQuote>
              Positive Momente sind keine Gegenbeweise gegen Belastung. Sie sind
              eher kleine Ressourceninseln, die Beziehungen etwas atmungsfähiger
              machen können.
            </EditorialPullQuote>
          </div>
        </ContentSection>

        {/* ── ContentSection 6: konkrete-schritte ── */}
        <ContentSection
          variant="editorial"
          title="Was Sie konkret tun können"
          id="konkrete-schritte"
          preview="Praktische Alltagshilfen sind oft einfach, aber nicht leicht: klar bleiben, Rückmeldungen dosieren, Fortschritte benennen und nicht alles übernehmen."
        >
          <div className="mt-2 space-y-10">
            <article className="space-y-3">
              <h4 style={h4Style}>Fortschritte benennen</h4>
              <p style={bodyStyle}>
                Nicht überloben, aber wahrnehmen, wenn etwas weniger
                zerstörerisch, etwas bewusster oder etwas klarer gelungen ist.
              </p>
              <p style={exampleStyle}>
                «Ich habe gemerkt, dass du dich heute zurückgezogen hast, ohne
                dass es ganz eskaliert ist. Das war nicht leicht.»
              </p>
            </article>

            <article className="space-y-3">
              <h4 style={h4Style}>Fragen statt übernehmen</h4>
              <p style={bodyStyle}>
                Alltagshilfe wird tragfähiger, wenn Sie nicht alles lösen,
                sondern Beteiligung und Eigenanteil offenlassen.
              </p>
              <ul className="space-y-1.5" style={exampleStyle}>
                <li>«Was wäre dein Vorschlag?»</li>
                <li>«Was brauchst du gerade von mir, und was eher nicht?»</li>
                <li>«Soll ich einfach da sein oder mit dir mitdenken?»</li>
              </ul>
            </article>

            <article className="space-y-3">
              <h4 style={h4Style}>Vorhersehbar bleiben</h4>
              <ul className="ml-5 list-disc space-y-2" style={bodyStyle}>
                <li>Änderungen möglichst früh ankündigen</li>
                <li>Versprechen halten oder offen revidieren</li>
                <li>Erreichbarkeit klar benennen</li>
                <li>nicht jedes Mal völlig anders reagieren</li>
              </ul>
            </article>
          </div>
        </ContentSection>

        {/* ── ContentSection 7: impulsivitaet ── */}
        <ContentSection
          variant="editorial"
          title="Wenn Impulsivität ausbricht"
          id="impulsivitaet"
          preview="Plötzliche Entscheidungen, Ausgaben, Risikoverhalten – dieser Alltag ist anders als Depression. Wie Sie reagieren, ohne zu moralisieren, und Ihre Grenzen dennoch halten."
        >
          <EditorialProse>
            <p>
              Wird die Situation akut – Selbst- oder Fremdgefährdung,
              unkontrollierbare Eskalation? Dann geht es nicht mehr um
              Alltagsbegleitung, sondern um{" "}
              <Link href="/unterstuetzen/krise" className="editorial-link">
                Krisenbegleitung
              </Link>
              .
            </p>
            <p>
              Borderline zeigt sich nicht nur als Rückzug und Erschöpfung.
              Manche Phasen sind geprägt von <strong>Impulsivität</strong>:
              plötzliche Grossausgaben, Kündigung ohne Plan, riskante
              Beziehungsentscheidungen, Substanzkonsum, Fahrtabenteuer oder
              abrupte Ortsveränderungen. Für Angehörige kann das überraschender
              und belastender sein als depressive Phasen – weil es Konsequenzen
              hat, die beide betreffen.
            </p>
          </EditorialProse>

          <div className="mt-8">
            <h4 style={h4Style}>Zeichen einer impulsiven Phase erkennen</h4>
            <ul className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {impulsivitaetZeichen.map(item => (
                <li key={item.label}>
                  <p
                    style={{
                      ...bodyStyle,
                      color: "var(--fg-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </p>
                  <p style={bodyStyle}>{item.sub}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <EditorialPullQuote>
              Impulsive Handlungen entstehen oft aus intensivem emotionalen
              Druck, nicht aus Rücksichtslosigkeit oder bösem Willen. Das
              bedeutet nicht, dass Sie die Konsequenzen tragen müssen — aber
              moralische Vorwürfe in der Phase selbst verändern nichts und
              verstärken meist Scham und Eskalation.
            </EditorialPullQuote>
          </div>

          <div className="mt-8">
            <h4 style={h4Style}>Drei Szenarien — was hilft, was nicht</h4>
            <div className="mt-4 space-y-10">
              {impulsivitaetSzenarien.map(szenario => (
                <article key={szenario.titel} className="space-y-4">
                  <h5
                    style={{
                      ...h4Style,
                      fontSize: "var(--text-sm)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    {szenario.titel}
                  </h5>
                  <div className="grid gap-6 sm:grid-cols-2">
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
                        Hilft eher
                      </p>
                      <ul
                        className="mt-2 ml-5 list-disc space-y-1.5"
                        style={bodyStyle}
                      >
                        {szenario.hilft.map(p => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p
                        className="uppercase"
                        style={{
                          fontSize: "var(--text-xs)",
                          letterSpacing: "var(--tracking-caps)",
                          color: "var(--fg-tertiary)",
                          fontWeight: 500,
                        }}
                      >
                        Hilft weniger
                      </p>
                      <ul
                        className="mt-2 ml-5 list-disc space-y-1.5"
                        style={bodyStyle}
                      >
                        {szenario.nichtHilft.map(p => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h4 style={h4Style}>Nach der impulsiven Phase: Scham und Reue</h4>
            <p className="mt-2" style={bodyStyle}>
              Nach impulsiven Phasen folgt oft massive <strong>Scham</strong> –
              manchmal Rückzug, manchmal übermässige Entschuldigungen. Beides
              braucht eine ruhige Antwort: Anerkennen, was passiert ist, ohne es
              kleinzureden oder aufzubauschen. Erst wenn die Emotionen sich
              gelegt haben, ist der Moment für ein echtes Gespräch über
              Konsequenzen und nächste Schritte.
            </p>
          </div>
        </ContentSection>

        {/* ── ContentSection 8: grenzen ── */}
        <ContentSection
          variant="editorial"
          title="Grenzen der Alltagsunterstützung"
          id="grenzen"
          preview="Auch im Alltag gibt es Grenzen. Sie müssen nicht perfekt sein, aber Sie sollten Ihre Erschöpfung und Ihre roten Linien ernst nehmen."
        >
          <EditorialProse>
            <p>
              Auch im Alltag können Sie nicht alles halten. Sie können nicht:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>die Emotionen Ihres Angehörigen dauerhaft regulieren</li>
              <li>alle Trigger vermeiden</li>
              <li>jede Eskalation verhindern</li>
              <li>Therapie oder Krisenhilfe ersetzen</li>
            </ul>
          </EditorialProse>
          <div className="mt-6">
            <EditorialPullQuote>
              Das ist keine Niederlage. Alltag wird nicht durch Perfektion
              tragfähig, sondern durch Klarheit, Wiederholbarkeit und die
              Bereitschaft, auch Ihre eigene Grenze ernst zu nehmen.
            </EditorialPullQuote>
          </div>
        </ContentSection>

        {/* ── Schluss-Sektion: Übergang ── */}
        <EditorialSection label="Weiter" rule>
          <EditorialProse>
            <p>
              Wenn Spannung in akute Eskalation kippt, wird aus
              Alltagsbegleitung Krisenbegleitung —{" "}
              <Link href="/unterstuetzen/krise" className="editorial-link">
                weiter: Krisen begleiten
              </Link>
              . Zurück geht es zur{" "}
              <Link href="/unterstuetzen/uebersicht" className="editorial-link">
                Übersicht
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSection>

        <RelatedLinksEditorial
          links={[
            {
              href: "/unterstuetzen/krise",
              title: "Krisen begleiten",
              description:
                "Ampel-System, Deeskalation, Was sagen / Was vermeiden — wenn Alltag in Eskalation kippt.",
            },
            {
              href: "/grenzen",
              title: "Grenzen",
              description:
                "Wie Sie klare Grenzen setzen und halten — als Schutzraum für tragfähige Alltagsunterstützung.",
            },
            {
              href: "/selbstfuersorge",
              title: "Selbstfürsorge",
              description:
                "Eigene Belastung ernst nehmen, Warnsignale erkennen und Regeneration ermöglichen.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
