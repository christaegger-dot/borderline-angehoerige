import { LearningGoal, LearningExtensionNav } from "@/components/LearningPath";
import AppLink from "@/components/AppLink";
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
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import UnterstuetzenSubNav from "@/components/UnterstuetzenSubNav";
import { TableOfContents } from "@/components/UXEnhancements";
import EnergieHaushaltVisualisierung from "@/components/visualizations/EnergieHaushaltVisualisierung";

const wasHilft = [
  {
    title: "Verlässliche Absprachen",
    description:
      "Regelmässigkeit und angekündigte Änderungen entlasten oft stärker als spontane intensive Zuwendung.",
    example:
      "«Ich rufe dich heute Abend nach dem Essen an. Wenn ich mich verspäte, sage ich Bescheid.»",
    dialog: [
      {
        sprecher: "Person A",
        text: "Du hast dich gestern gar nicht gemeldet.",
      },
      {
        sprecher: "Person B",
        text: "Du hast recht — ich hätte Bescheid geben sollen. Das war nicht gut. Heute Abend um 20 Uhr rufe ich an.",
      },
      {
        sprecher: "Person A",
        text: "Und wenn wieder nichts kommt?",
      },
      {
        sprecher: "Person B",
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
        sprecher: "Person A",
        text: "Kannst du heute noch vorbeikommen?",
      },
      {
        sprecher: "Person B",
        text: "Nein, heute nicht. Ich brauche den Abend für mich.",
      },
      { sprecher: "Person A", text: "Du willst also nicht." },
      {
        sprecher: "Person B",
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
        sprecher: "Person A",
        text: "Heute ist mir alles zu viel. Ich möchte gerade nicht reden.",
      },
      {
        sprecher: "Person B",
        text: "Das klingt gerade sehr schwer. Möchtest du Ruhe oder soll ich noch etwas bleiben?",
      },
      { sprecher: "Person A", text: "[Schweigen]" },
      {
        sprecher: "Person B",
        text: "Du musst jetzt nicht antworten. Ich gehe, wenn du Ruhe möchtest.",
      },
    ],
  },
  {
    title: "Begrenzte Verfügbarkeit",
    description:
      "Sie müssen nicht rund um die Uhr erreichbar sein. Ihre Erholung und Ihr eigenes Leben sind wichtig. Vereinbaren Sie eine Verfügbarkeit, die Sie freiwillig übernehmen können, und klären Sie professionelle Hilfewege für Krisen.",
    example:
      "«Nach 22 Uhr bin ich nicht mehr am Handy. Wenn es ernst wird, holen wir zusätzliche Hilfe dazu.»",
    dialog: [
      {
        sprecher: "Person A",
        text: "Es ist 23 Uhr und ich kann nicht schlafen. Du gehst nicht ran.",
      },
      {
        sprecher: "Person B",
        text: "Ich sehe deine Nachricht erst morgen früh. Nach 22 Uhr bin ich offline.",
      },
      {
        sprecher: "Person A",
        text: "Was soll ich denn jetzt tun?",
      },
      {
        sprecher: "Person B",
        text: "Bei Sorge um Sicherheit finden wir passende professionelle Hilfe unter «Akute Hilfe und Notfallkontakte». Morgen früh melde ich mich.",
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
      "Was beobachte ich konkret? Was vermute ich nur? Was könnte ich offen erfragen?",
  },
  {
    title: "auch sich selbst wahrnehmen",
    description:
      "Sind Sie gerade hilfsbereit, erschöpft, gereizt, schuldig oder unter dem Druck, alles lösen zu müssen?",
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

const beobachtbareRisiken = [
  {
    label: "Starker Handlungsdruck",
    sub: "Ruhelosigkeit oder Entscheidungen unter hohem Zeitdruck",
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
    sub: "Beobachtbarer oder riskanter Konsum von Alkohol, Cannabis oder anderen Substanzen; die mögliche Funktion bleibt offen",
  },
  {
    label: "Riskante Situationen",
    sub: "Zum Beispiel Fahren unter Einfluss oder ungeschützter Sex",
  },
] as const;

const risikoSzenarien = [
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
      "Wenn die Person das möchte, das Behandlungsteam einbeziehen; eigene Beratung können Sie unabhängig nutzen",
    ],
    nichtHilft: [
      "Konsum verstecken oder normalisieren",
      "Kontrolle übernehmen («Ich verstecke die Flaschen»)",
      "Drohen und nicht handeln",
    ],
  },
] as const;

export default function UnterstuetzenAlltag() {
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

      {/* ── 1 Hero ── EditorialSection ohne Aside (Sub-Page-Identität) */}
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
            Alltag und Beziehung
          </span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel className="mb-3" spacing="compact">
            Im Alltag
          </EyebrowLabel>
          <DisplayHeading level={1} size="topic">
            Im Alltag <em>unterstützen</em>
          </DisplayHeading>
          <Lede className="max-w-[40em]">
            Manche Angehörige berichten in belastenden Phasen von Anspannung,
            vorsichtigem Abtasten, Rückzug nach Konflikten, Schuldgefühlen oder
            Erreichbarkeitsdruck. Andere erleben den Alltag anders; aus einer
            Diagnose lässt sich der Beziehungsverlauf nicht vorhersagen. Diese
            Seite bietet freiwillige Möglichkeiten für den Alltag und nimmt
            zugleich Ihre eigenen Grenzen ernst.
          </Lede>
          <LearningGoal path="/unterstuetzen/alltag" />
          <TopicQuickLinks
            items={[
              { href: "#alltagsspannung", label: "Alltagsspannung" },
              { href: "#was-hilft", label: "Was hilft" },
              { href: "#impulsivitaet", label: "Riskante Entscheidungen" },
              { href: "#grenzen", label: "Grenzen" },
            ]}
          />
          <div
            className="mt-8 border-t pt-3"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <EyebrowLabel spacing="compact">
              Vollständig ca. 8 Min · Auch abschnittweise lesbar
            </EyebrowLabel>
            <LastVerifiedBadge path="/unterstuetzen/alltag" className="mt-3" />
          </div>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 2 Orientierung ── EnergieHaushaltVisualisierung
           (verschoben von zwischen Intro und CS1, jetzt nach Hero —
           analog Krise-«ORIENTIERUNG»-Pattern) */}
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
            Orientierung
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EnergieHaushaltVisualisierung />
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 3 Intro: Was diese Seite im Alltag ordnet ── */}
      <EditorialSection variant="cream" density="compact">
        <EditorialSection.Body>
          <ul className="topic-takeaways">
            <li>Kleine Absprachen können den Alltag übersichtlicher machen.</li>
            <li>
              Sie müssen nicht ständig erreichbar sein oder jede Stimmung
              ausgleichen.
            </li>
            <li>
              Bei akuter Gefahr oder Unsicherheit führt der direkte Weg zur
              Soforthilfe.
            </li>
          </ul>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 4 Group A: Was belastet, was hilft ── CS1 alltagsspannung + CS2 was-hilft */}
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
            Was belastet, was hilft
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
            title="Wenn der Alltag angespannt erlebt wird"
            id="alltagsspannung"
          >
            <EditorialProse>
              <p>
                Einige Angehörige berichten von Phasen, in denen sie Stimmungen
                genauer beobachten, Worte abwägen oder mit Rückzug und Ärger
                rechnen. Das ist eine mögliche Erfahrung, kein typischer oder
                aus der Diagnose vorhersehbarer Beziehungsverlauf.
              </p>
              <p>
                Wenn Sie sich häufig wachsam oder erschöpft fühlen, verdient
                diese Belastung Aufmerksamkeit — auch wenn äusserlich gerade
                wenig sichtbar ist. Sie können prüfen, welche Absprachen Sie
                freiwillig anbieten möchten und welche Entlastung Sie selbst
                brauchen.
              </p>
            </EditorialProse>
            <div className="mt-4">
              <EditorialPullQuote>
                Klarheit oder Absprachen können eine freiwillige Möglichkeit
                sein, wenn sie für die Beteiligten passen. Angehörige sind weder
                für die Vorhersehbarkeit einer Beziehung noch für die Regulation
                einer anderen Person verantwortlich.
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
                Beispiel für die eigene Anspannung
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
                  Beispielverlauf
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
                  Eigene Basislinie
                </text>
              </svg>
              <figcaption
                className="mt-2 text-center"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--fg-tertiary)",
                }}
              >
                Schematisches Beispiel: Die eigene Anspannung kann auch ohne
                sichtbares Ereignis schwanken. Verlauf und Basislinie sind
                individuell und hängen von vielen Einflüssen ab.
              </figcaption>
            </figure>
          </ContentSection>

          {/* ── ContentSection 2: was-hilft ── */}
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Was im Alltag oft wirklich hilft"
            id="was-hilft"
          >
            <p className="mt-2 mb-8" style={bodyStyle}>
              Die folgenden Situationen sind erfunden. «Person A» und «Person B»
              bezeichnen keine festen Rollen und lassen sich nicht aus einer
              Diagnose ableiten. Die Sätze sind anpassbare Möglichkeiten, keine
              Vorgaben für ein richtiges Gespräch.
            </p>
            <div className="mt-2 space-y-10">
              {wasHilft.map(item => (
                <article key={item.title} className="space-y-3">
                  <h3 style={h4Style}>{item.title}</h3>
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
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 5 Group B: Verbindung halten ── CS3 rueckzug + CS4 achtsamkeit + CS5 inseln */}
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
            Verbindung halten
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
            title="Nach Konflikten und Rückzug"
            id="rueckzug"
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
                <h3 style={h4Style}>Hilfreich kann sein</h3>
                <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                  <li>ein kurzes, klares Kontaktangebot</li>
                  <li>nicht drängen, aber auch nicht strafen</li>
                  <li>später aufgreifen, was passiert ist</li>
                  <li>
                    zwischen Raum geben und Beziehungsabbruch unterscheiden
                  </li>
                </ul>
              </div>
              <div>
                <h3 style={h4Style}>Weniger hilfreich ist oft</h3>
                <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                  <li>mehrfach nachfassen aus Panik</li>
                  <li>Gegenrückzug aus Verletzung</li>
                  <li>so tun, als wäre nichts gewesen</li>
                  <li>mitten im Alarm sofort alles klären wollen</li>
                </ul>
              </div>
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
                  <h3 style={h4Style}>{item.title}</h3>
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
                Konflikt kreist, verliert sie ihre tragenden Anteile.
                Alltagshilfe heisst deshalb auch, kleine gemeinsame Momente zu
                schützen, die nicht sofort funktional sein müssen.
              </p>
            </EditorialProse>
            <ul className="mt-6 space-y-4">
              {positiveInselnItems.map(item => (
                <li key={item.title}>
                  <h3 style={h4Style}>{item.title}</h3>
                  <p className="mt-1" style={bodyStyle}>
                    {item.examples}
                  </p>
                </li>
              ))}
            </ul>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 6 Group C: Konkrete Alltagshilfe ── CS6 konkrete-schritte */}
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
            Konkrete Alltagshilfe
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
            title="Was Sie konkret tun können"
            id="konkrete-schritte"
          >
            <div className="mt-2 space-y-10">
              <article className="space-y-3">
                <h3 style={h4Style}>Bedeutsame Veränderungen erfragen</h3>
                <p style={bodyStyle}>
                  Beschreiben Sie konkrete Beobachtungen und fragen Sie die
                  andere Person, ob die Veränderung für sie bedeutsam war, statt
                  ihren Verlauf von aussen zu bewerten.
                </p>
                <p style={exampleStyle}>
                  «Mir ist aufgefallen, dass du heute früher eine Pause gemacht
                  hast. War das für dich hilfreich oder eher nicht?»
                </p>
              </article>

              <article className="space-y-3">
                <h3 style={h4Style}>Fragen statt übernehmen</h3>
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
                <h3 style={h4Style}>Absprachen klar und anpassbar halten</h3>
                <p style={bodyStyle}>
                  Verlässlichkeit entsteht durch klare, anpassbare Absprachen –
                  nicht dadurch, dass Sie immer gleich reagieren oder jederzeit
                  verfügbar bleiben. Ihre Möglichkeiten, Grenzen und Ihre
                  Verfügbarkeit dürfen sich ändern. Sprechen Sie Veränderungen
                  offen an und vereinbaren Sie neu, was für beide Seiten passt.
                </p>
                <ul className="ml-5 list-disc space-y-2" style={bodyStyle}>
                  <li>Absprachen konkret und verständlich formulieren</li>
                  <li>Änderungen möglichst früh ankündigen</li>
                  <li>Versprechen halten oder offen revidieren</li>
                  <li>Erreichbarkeit und Grenzen klar benennen</li>
                  <li>Absprachen an veränderte Möglichkeiten anpassen</li>
                </ul>
              </article>
            </div>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 7 Group D: Wenn es schwer wird ── CS7 impulsivität + CS8 grenzen-alltag */}
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
            Wenn es schwer wird
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
            title="Wenn Entscheidungen oder Verhalten riskant werden"
            id="impulsivitaet"
          >
            <EditorialProse>
              <p>
                Bei unmittelbarer Selbst- oder Fremdgefährdung oder bei Gewalt
                holen Sie Hilfe und schützen sich. Der direkte Zugang führt zu{" "}
                <AppLink href="/soforthilfe" className="editorial-link">
                  Akute Hilfe und Notfallkontakte
                </AppLink>
                .
              </p>
              <p>
                Riskante oder abrupte Entscheidungen können in unterschiedlichen
                Belastungslagen vorkommen. Sie treten nicht bei allen Menschen
                mit Borderline auf und sagen nichts über Charakter oder Absicht
                aus. Orientieren Sie sich daran, was Sie konkret beobachten, was
                Sie selbst betrifft und welche Unterstützung die Person möchte.
              </p>
            </EditorialProse>

            <div className="mt-8">
              <h3 style={h4Style}>
                Beobachtungen, die Anlass für ein Gespräch sein können
              </h3>
              <ul className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {beobachtbareRisiken.map(item => (
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
                Starker emotionaler Druck kann Entscheidungen beeinflussen. Aus
                einer Handlung allein lassen sich weder Motiv noch Charakter
                eines Menschen ableiten.
              </EditorialPullQuote>
            </div>

            <div className="mt-8">
              <h3 style={h4Style}>Drei Alltagssituationen — was eher hilft</h3>
              <div className="mt-4 space-y-10">
                {risikoSzenarien.map(szenario => (
                  <article key={szenario.titel} className="space-y-4">
                    <h4
                      style={{
                        ...h4Style,
                        fontSize: "var(--text-sm)",
                        color: "var(--fg-secondary)",
                      }}
                    >
                      {szenario.titel}
                    </h4>
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
              <h3 style={h4Style}>
                Nach einer belastenden Situation: Erleben offen lassen
              </h3>
              <p className="mt-2" style={bodyStyle}>
                Danach können Scham, Reue, Erleichterung, Ärger, Rückzug oder
                ganz andere Reaktionen auftreten. Fragen Sie nach, statt ein
                bestimmtes Erleben vorauszusetzen. Wenn beide bereit sind, kann
                später ein Gespräch darüber helfen, was passiert ist, was die
                Folgen sind und welche nächsten Schritte gewünscht werden.
              </p>
            </div>
          </ContentSection>

          {/* ── ContentSection 8: grenzen ── */}
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Grenzen der Alltagsunterstützung"
            id="grenzen"
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
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 8 Pull-Quote (dominant, eigene Sektion) ── */}
      <EditorialSection variant="cream">
        <EditorialSection.Body>
          <EditorialPullQuote>
            Das ist keine Niederlage. Alltag wird nicht durch Perfektion
            tragfähig, sondern durch Klarheit, Wiederholbarkeit und die
            Bereitschaft, auch Ihre eigene Grenze ernst zu nehmen.
          </EditorialPullQuote>
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
                href: "/unterstuetzen/krise",
                title: "Krisen begleiten",
                description:
                  "Hilfe bei Gefahr oder Unsicherheit, Selbstschutz und sichere Gesprächsführung — wenn Alltag in Eskalation kippt.",
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
        </EditorialSection.Body>
      </EditorialSection>
      <LearningExtensionNav path="/unterstuetzen/alltag" />
    </Layout>
  );
}
