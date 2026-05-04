import { useCallback } from "react";
import ContentSection from "@/components/ContentSection";
import {
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
} from "@/components/editorial";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import ReviewBadge from "@/components/ReviewBadge";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import UnterstuetzenSubNav from "@/components/UnterstuetzenSubNav";
import { TableOfContents } from "@/components/UXEnhancements";
import KrisenampelVisualisierung from "@/components/visualizations/KrisenampelVisualisierung";
import AppLink from "@/components/AppLink";
import { kontaktByIdStrict } from "@/data/kontakte";
import { Link } from "wouter";

const rot144 = kontaktByIdStrict("ROT_144");
const gruen143 = kontaktByIdStrict("GRUEN_143");

/** Öffnet eine ContentSection via Custom Event und scrollt dorthin. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

const ampelStufen = [
  {
    level: "Grün – Stabil",
    description: "Alltägliche Stimmungsschwankungen, normale Belastungen",
    action: "Präsent sein, zuhören, Routinen beibehalten",
    panelClass: "border-l-emerald-500 bg-background",
  },
  {
    level: "Gelb – Angespannt",
    description: "Erhöhte Reizbarkeit, Rückzug, erkennbare Trigger",
    action: "Validieren, Skills anbieten, Raum geben",
    panelClass: "border-l-amber-400 bg-background",
  },
  {
    level: "Orange – Eskalierend",
    description: "Starke Emotionen, verbale Aggression, Kontrollverlust",
    action: "Deeskalieren, Sicherheit prüfen, Grenzen setzen",
    panelClass: "border-l-amber-500 bg-background",
  },
  {
    level: "Rot – Akute Krise",
    description: "Suizidgedanken, Selbstverletzung, akute Gefahr",
    action: "Professionelle Hilfe holen, Notruf wenn nötig",
    panelClass: "border-l-alert bg-alert/10",
  },
] as const;

const ampelHandlungen = [
  {
    label: "Rot",
    tone: "border-alert/25 bg-alert/8",
    fg: "text-alert",
    items: [
      "Professionelle Hilfe holen",
      "Eigene Sicherheit sichern",
      "Nicht ohne Hilfe oder Notfallplan allein lassen",
    ],
  },
  {
    label: "Orange",
    tone: "border-amber-300/60 bg-background",
    fg: "text-amber-700",
    items: [
      "Nicht diskutieren",
      "Körperabstand anbieten",
      "Kurze, ruhige Sätze",
    ],
  },
  {
    label: "Gelb",
    tone: "border-[color:var(--rule-color-strong)] bg-background",
    fg: "text-[color:var(--accent-label)]",
    items: ["Validieren", "Raum geben", "Skills gemeinsam erinnern"],
  },
] as const;

const deeskalationsSchritte = [
  {
    title: "Sicherheit prüfen",
    description:
      "Sind Sie und Ihr Angehöriger sicher? Gibt es gefährliche Gegenstände in der Nähe?",
    example: "Entfernen Sie unauffällig scharfe Gegenstände oder Medikamente.",
  },
  {
    title: "Ruhe bewahren",
    description:
      "Ihre Ruhe kann ansteckend sein. Atmen Sie tief, sprechen Sie langsam und leise.",
    example: "«Ich bin hier. Wir schaffen das zusammen.»",
  },
  {
    title: "Validieren",
    description:
      "Anerkennen Sie die Gefühle, ohne sie zu bewerten oder zu lösen.",
    example:
      "«Ich sehe, dass du gerade sehr viel Schmerz fühlst. Das muss furchtbar sein.»",
  },
  {
    title: "Skills anbieten",
    description:
      "Erinnern Sie sanft an Strategien, die in der Vergangenheit geholfen haben.",
    example:
      "«Möchtest du die Atemübung ausprobieren, die dir letztens geholfen hat?»",
  },
] as const;

const formulierungen: ReadonlyArray<{
  title: string;
  quote: string;
  note?: string;
}> = [
  {
    title: "Präsenz zeigen",
    quote: "«Ich bin hier. Ich gehe nicht weg. Du bist nicht allein.»",
    note: "Wenn Nähe die Situation verschärft, kann auch eine ruhig angekündigte Distanz hilfreich sein: «Ich bleibe in der Nähe und komme in ein paar Minuten wieder.»",
  },
  {
    title: "Gefühle validieren",
    quote:
      "«Ich sehe, dass du gerade unglaublich viel Schmerz fühlst. Das muss sich furchtbar anfühlen.»",
  },
  {
    title: "Hoffnung vermitteln",
    quote:
      "«Dieses Gefühl wird vorbeigehen. Es fühlt sich jetzt endlos an, aber es wird sich verändern.»",
  },
  {
    title: "Konkrete Hilfe anbieten",
    quote:
      "«Was brauchst du gerade am meisten? Soll ich einfach hier sitzen? Oder sollen wir zusammen atmen?»",
  },
  {
    title: "Bei Suizidgedanken direkt ansprechen",
    quote:
      "«Ich mache mir Sorgen um dich. Hast du gerade Gedanken, dir etwas anzutun?»",
    note: "Hinweis: Direktes Fragen erhöht das Risiko nicht, sondern zeigt, dass Sie die Situation ernst nehmen.",
  },
];

const krisenphasen = [
  {
    titel: "Anspannung",
    dauer: "Minuten–Stunden",
    tone: "border-[color:var(--rule-color-strong)] bg-background",
    fg: "text-[color:var(--fg-secondary)]",
  },
  {
    titel: "Eskalation",
    dauer: "15–90 Min",
    tone: "border-amber-300/60 bg-background",
    fg: "text-amber-700",
  },
  {
    titel: "Peak",
    dauer: "Spitze",
    tone: "border-alert/25 bg-alert/8",
    fg: "text-alert",
  },
  {
    titel: "Abklingen",
    dauer: "1–4 Std",
    tone: "border-amber-200/60 bg-background",
    fg: "text-amber-600",
  },
  {
    titel: "Erschöpfung",
    dauer: "Stunden–Tage",
    tone: "border-border/50 bg-muted/30",
    fg: "text-[color:var(--accent-label)]",
  },
] as const;

const fuerBetroffene = [
  "Scham anerkennen, ohne sie zu bestätigen: «Ich sehe, dass es dir schlecht damit geht. Mir auch. Lass uns das besprechen, wenn du dich bereit fühlst.»",
  "Nicht sofort eine Aufarbeitung fordern – Wartezeit einplanen (1–2 Tage)",
  "Therapeutin informieren, damit die Krise dort aufgearbeitet werden kann",
  "Krisenursachen gemeinsam benennen: Was war der Auslöser? Was hätte früher geholfen?",
] as const;

const fuerSiePersoenlich = [
  "Eigene Erschütterung ernst nehmen – Sie dürfen erschöpft, wütend oder traurig sein",
  "Gespräch suchen: Fachstelle, Selbsthilfegruppe oder eigene Therapie",
  "Dauernde Alarmbereitschaft beobachten: Sie erschöpft schnell – versuchen Sie, bewusst zu regulieren",
  "Keine Aufarbeitung leisten, solange Sie selbst noch in Aufruhr sind",
] as const;

const krisenanalyseFragen = [
  {
    frage: "Was hat die Krise ausgelöst?",
    beispiel: "«Dir ist aufgefallen, dass ich distanzierter war ab Montag»",
  },
  {
    frage: "Was hätte früher geholfen?",
    beispiel: "«Ein kurzes Gespräch, bevor es eskalierte»",
  },
  {
    frage: "Was machen wir nächstes Mal anders?",
    beispiel: "«Du sagst mir, wenn du merkst, dass es kommt»",
  },
] as const;

const vertrauensaufbau = [
  "Kleine Zusagen, kleine Erfüllungen – nicht grosse Versprechen",
  "Transparenz über eigene Gefühle: «Mir ist noch beklemmend zumute. Ich bin trotzdem hier.»",
  "Keine impliziten Kontoschuld-Bilanzen führen («Du hast mir das angetan»)",
  "Realistischer Zeitrahmen: 2–4 Wochen bis spürbar mehr Stabilität",
] as const;

const tagFuerTag = [
  {
    tage: "Tag 1–2",
    titel: "Ruhe und Sicherheit",
    farbe: "border-border/50 bg-background",
    punkte: [
      "Keine Aufarbeitung, keine Erklärungen, kein Warum",
      "Sagen Sie: «Ich bin froh, dass du da bist. Wir müssen jetzt nichts besprechen.»",
      "Grundbedürfnisse sichern: Schlafen, Essen, körperliche Anwesenheit",
    ],
  },
  {
    tage: "Tag 3–4",
    titel: "Kurze Check-ins",
    farbe: "border-border/50 bg-muted/20",
    punkte: [
      "Kurzes, konkretes Nachfragen erlaubt: «Wie geht es dir gerade – in diesem Moment?»",
      "Keine Bewertungen, keine Rückblicke auf die Krise",
      "Therapeut oder Krisentelefon kontaktieren, falls nötig",
    ],
  },
  {
    tage: "Tag 5–7",
    titel: "Aufarbeitung vorbereiten",
    farbe: "border-border/50 bg-muted/30",
    punkte: [
      "Erst wenn beide bereit sind: Was hat geholfen? Was hat die Krise ausgelöst?",
      "Kein Vorwurf, kein Schuldaufbau – gemeinsames Lernen",
      "Nächsten Termin beim Therapeuten koordinieren",
    ],
  },
] as const;

const frueherkennung = [
  {
    label: "Persönliche Warnsignale benennen",
    sub: "Was hat die betroffene Person beobachtet? Was haben Sie bemerkt?",
  },
  {
    label: "Miniplan vereinbaren",
    sub: "«Wenn du merkst, dass es kommt, sagst du mir das Stichwort X»",
  },
  {
    label: "Notfallkarte aktualisieren",
    sub: "Neue Erkenntnisse eintragen, Kontakte überprüfen",
  },
  {
    label: "Professionelle Unterstützung intensivieren",
    sub: "Falls Krisen häufiger werden: Therapiedichte erhöhen",
  },
] as const;

export default function UnterstuetzenKrise() {
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

  const labelStyle = {
    fontSize: "var(--text-xs)",
    letterSpacing: "var(--tracking-caps)",
    color: "var(--fg-tertiary)",
    fontWeight: 500,
  } as const;

  return (
    <Layout>
      <SEO
        title="Krisenbegleitung"
        description="Krisenbegleitung bei Borderline: Wie Sie in akuten Situationen deeskalieren, Grenzen wahren und professionelle Hilfe richtig einbeziehen."
        path="/unterstuetzen/krise"
      />
      <MedicalPageSchema
        title="Krisenbegleitung"
        description="Krisenbegleitung bei Borderline: Wie Sie in akuten Situationen deeskalieren, Grenzen wahren und professionelle Hilfe richtig einbeziehen."
        path="/unterstuetzen/krise"
      />
      <TableOfContents />

      <UnterstuetzenSubNav />

      {/* ── Sicherheits-Banner: bleibt prominent (sicherheitskritisch) ── */}
      <section className="bg-alert py-3 sm:py-4">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-sm leading-relaxed text-white sm:text-left sm:text-base">
              <strong>Bei akuter Suizidgefahr:</strong> Rufen Sie sofort den
              Notruf{" "}
              <a href={`tel:${rot144.tel}`} className="font-bold underline">
                {rot144.nummer}
              </a>
              . Zur Entlastung danach:{" "}
              <a href={`tel:${gruen143.tel}`} className="underline">
                {gruen143.label} ({gruen143.nummer})
              </a>
            </p>
            <AppLink
              href="/soforthilfe"
              className="rounded bg-white px-3 py-2 text-sm font-medium text-alert transition-colors hover:bg-white/90"
            >
              Alle Notfallnummern
            </AppLink>
          </div>
        </div>
      </section>

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-10 pt-8 md:pb-16 md:pt-16">
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Unterstützen — Krise
          </p>
          <h1
            className="mt-6 font-display text-[var(--text-3xl)] md:mt-8 md:text-[var(--text-4xl)]"
            style={{
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
            }}
          >
            In der Krise <em>unterstützen</em>
          </h1>
          <p
            className="mt-5 md:mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Viele Angehörige erleben Phasen starker Anspannung, Eskalation oder
            Rückzug. Hier erfahren Sie, wie Sie Krisen besser einordnen,
            deeskalierend reagieren und Sicherheit im Blick behalten können,
            ohne Ihre eigene Grenze aus dem Blick zu verlieren.
          </p>
          <p
            className="mt-3 md:mt-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Vollständig ca. 6 Min · Auch abschnittweise lesbar.
          </p>
          <LastVerifiedBadge path="/unterstuetzen/krise" className="mt-5" />
        </header>

        {/* ── Disclaimer ── */}
        <p
          className="text-center"
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--fg-tertiary)",
          }}
        >
          Diese Inhalte ersetzen keine professionelle Krisenberatung. Bei akuter
          Gefahr direkt{" "}
          <strong style={{ color: "var(--fg-primary)" }}>144 / 117</strong>{" "}
          anrufen.
        </p>

        {/* ── Visualisierung (out-of-scope) ── */}
        <KrisenampelVisualisierung />

        <ReviewBadge path="/unterstuetzen/krise" />

        {/* ── Intro: Was diese Seite in Krisen ordnet ── */}
        <EditorialSectionBlock
          label="Überblick"
          title="Was diese Seite in Krisen ordnet"
        >
          <EditorialProse>
            <p>
              Diese Seite hilft Ihnen, Krisen nicht nur als Chaos, sondern als
              Folge unterschiedlicher Eskalationsstufen zu lesen. Im Zentrum
              stehen Einordnung, Deeskalation, sichere Sprache und die Frage,
              was nach der akuten Spitze für beide Seiten tragfähig weiterhilft.
            </p>
            <p>
              Drei Akzente ziehen sich durch die Seite: zuerst Krise genauer
              einordnen — nicht jede belastende Situation ist gleich ein
              Notfall, das Ampel-System hilft, die Intensität klarer zu lesen;
              dann ruhig und sicher handeln — in akuten Momenten zählen
              Sicherheit, kurze Sätze, Validierung und ein begrenztes Vorgehen
              mehr als Diskussionen; und schliesslich auch das Danach mitdenken
              — nach der Eskalation braucht es oft Scham, Erschöpfung und
              Aufarbeitung mit derselben Ruhe wie in der Krise selbst.
            </p>
            <p>
              Sie können auch direkt zu{" "}
              <a
                href="#ampel-system"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "ampel-system")}
              >
                Krise einschätzen
              </a>
              ,{" "}
              <a
                href="#deeskalation"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "deeskalation")}
              >
                Deeskalation
              </a>
              ,{" "}
              <a
                href="#krise-formulierungen"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "krise-formulierungen")}
              >
                Formulierungen
              </a>{" "}
              oder{" "}
              <a
                href="#nach-der-krise"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "nach-der-krise")}
              >
                Nach der Krise
              </a>{" "}
              springen.
            </p>
            <p>
              <strong>Unterschied Krise vs. Notfall:</strong> Diese Seite ist
              für emotionale Eskalationen, starke Anspannung und Rückzug. Bei
              akuter Gefahr, Suizidgefahr oder Selbstverletzung gehen Sie direkt
              zu{" "}
              <AppLink href="/soforthilfe" className="editorial-link">
                Soforthilfe &amp; Notfallnummern
              </AppLink>
              .
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        {/* ── ContentSection 1: ampel-system (sicherheitskritisch — Farben bleiben) ── */}
        <ContentSection
          variant="editorial"
          title="Das Ampel-System: Krisen erkennen"
          id="ampel-system"
          defaultOpen={true}
          preview="Nicht jede schwierige Situation ist eine Krise. Das Ampel-System hilft Ihnen, die Intensität einzuschätzen."
        >
          <EditorialProse>
            <p>
              Nicht jede schwierige Situation ist eine Krise. Das Ampel-System
              hilft Ihnen, die Intensität einzuschätzen und angemessen zu
              reagieren.
            </p>
          </EditorialProse>
          <div className="mt-6 space-y-3">
            {ampelStufen.map(item => (
              <article
                key={item.level}
                className={`border border-border/50 border-l-4 p-5 ${item.panelClass}`}
              >
                <h4 style={h4Style}>{item.level}</h4>
                <p className="mt-2" style={bodyStyle}>
                  {item.description}
                </p>
                <p className="mt-2" style={bodyStyle}>
                  <strong style={{ color: "var(--fg-primary)" }}>
                    Ihre Reaktion:
                  </strong>{" "}
                  {item.action}
                </p>
              </article>
            ))}
          </div>

          <div
            className="mt-8 border-t pt-6"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <p className="uppercase" style={labelStyle}>
              Was konkret hilft – je nach Stufe
            </p>
            <div className="mt-3 space-y-2">
              {ampelHandlungen.map(stufe => (
                <div
                  key={stufe.label}
                  className={`flex items-start gap-3 rounded-md border p-3 ${stufe.tone}`}
                >
                  <span
                    className={`min-w-[52px] pt-0.5 text-xs font-bold ${stufe.fg}`}
                  >
                    {stufe.label}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stufe.items.map(s => (
                      <span
                        key={s}
                        className="rounded border border-border/30 bg-background/70 px-2 py-0.5 text-xs text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentSection>

        {/* ── ContentSection 2: deeskalation ── */}
        <ContentSection
          variant="editorial"
          title="4 Schritte der Deeskalation"
          id="deeskalation"
          preview="Sicherheit prüfen, Ruhe bewahren, Validieren, Skills anbieten – ein bewährtes Vorgehen."
        >
          <ol className="mt-2 space-y-6">
            {deeskalationsSchritte.map((item, index) => (
              <li key={item.title} className="flex items-start gap-4">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "var(--accent-primary)",
                    color: "var(--bg-primary)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </span>
                <div className="space-y-2">
                  <h4 style={h4Style}>{item.title}</h4>
                  <p style={bodyStyle}>{item.description}</p>
                  <p style={exampleStyle}>{item.example}</p>
                </div>
              </li>
            ))}
          </ol>
        </ContentSection>

        {/* ── ContentSection 3: krise-formulierungen ── */}
        <ContentSection
          variant="editorial"
          title="Was Sie in der Krise sagen können"
          id="krise-formulierungen"
          preview="In einer Krise zählt jedes Wort. Diese Formulierungen haben sich bewährt."
        >
          <EditorialProse>
            <p>
              In einer Krise zählt jedes Wort. Diese Formulierungen haben sich
              bewährt:
            </p>
          </EditorialProse>
          <div className="mt-8 space-y-8">
            {formulierungen.map(item => (
              <article key={item.title} className="space-y-2">
                <h4 style={h4Style}>{item.title}</h4>
                <p style={exampleStyle}>{item.quote}</p>
                {item.note && <p style={bodyStyle}>{item.note}</p>}
              </article>
            ))}
          </div>
        </ContentSection>

        {/* ── ContentSection 4: vermeiden (sicherheitskritisch — Alert-Akzent bleibt) ── */}
        <ContentSection
          variant="editorial"
          title="Was Sie in der Krise vermeiden sollten"
          id="vermeiden"
          preview="Drohen, Vorwürfe machen oder Gefühle herunterspielen – diese Reaktionen können die Krise verschärfen."
        >
          <aside className="mt-2 border border-alert/20 border-l-4 border-l-alert bg-alert/6 p-6">
            <ul className="space-y-2.5" style={bodyStyle}>
              <li className="flex items-start gap-2">
                <span className="text-alert" aria-hidden="true">
                  ✗
                </span>
                Drohen oder Ultimaten stellen
              </li>
              <li className="flex items-start gap-2">
                <span className="text-alert" aria-hidden="true">
                  ✗
                </span>
                Vorwürfe machen oder Schuld zuweisen
              </li>
              <li className="flex items-start gap-2">
                <span className="text-alert" aria-hidden="true">
                  ✗
                </span>
                Die Gefühle herunterspielen («So schlimm ist es doch nicht»)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-alert" aria-hidden="true">
                  ✗
                </span>
                Logisch argumentieren oder überzeugen wollen
              </li>
              <li className="flex items-start gap-2">
                <span className="text-alert" aria-hidden="true">
                  ✗
                </span>
                Die Person ohne Hilfe, Notfallplan oder professionelle
                Einschätzung allein lassen – sofern Sie selbst sicher bleiben
                können
              </li>
              <li className="flex items-start gap-2">
                <span className="text-alert" aria-hidden="true">
                  ✗
                </span>
                Sich selbst in Gefahr bringen
              </li>
            </ul>
          </aside>
        </ContentSection>

        {/* ── ContentSection 5: nach-der-krise ── */}
        <ContentSection
          variant="editorial"
          title="Nach der Krise: Verarbeitung und Neubeginn"
          id="nach-der-krise"
          preview="Die akute Krise ist vorbei – aber die innere Landschaft braucht Zeit. Was jetzt hilft: für die betroffene Person, für Sie, und gemeinsam."
        >
          {/* Krisenphase-Timeline (sicherheitskritische Klassifikation, Farben bleiben) */}
          <figure className="mt-2 rounded-lg border border-border/40 bg-background p-4">
            <figcaption
              className="mb-3 text-center uppercase"
              style={labelStyle}
            >
              Typischer Krisenverlauf
            </figcaption>
            <div className="flex flex-col items-center gap-1.5 sm:flex-row">
              {krisenphasen.map((phase, i) => (
                <div
                  key={phase.titel}
                  className="flex w-full flex-1 items-center gap-1.5"
                >
                  <div
                    className={`flex-1 rounded-md border px-3 py-2 text-center ${phase.tone}`}
                  >
                    <p className={`text-xs font-semibold ${phase.fg}`}>
                      {phase.titel}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {phase.dauer}
                    </p>
                  </div>
                  {i < krisenphasen.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="shrink-0 rotate-90 text-xs text-muted-foreground sm:rotate-0"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p
              className="mt-3 text-center"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--fg-tertiary)",
              }}
            >
              Zeitangaben sind Richtwerte — jede Krise verläuft anders.
            </p>
          </figure>

          {/* Für die betroffene Person */}
          <article className="mt-10 space-y-3">
            <h4 style={h4Style}>Für die betroffene Person</h4>
            <p style={bodyStyle}>
              Nach einer schweren Krise folgt oft eine Phase massiver{" "}
              <strong style={{ color: "var(--fg-primary)" }}>
                Scham und Reue
              </strong>
              . Manche ziehen sich zurück, andere entschuldigen sich übermässig.
              Beides braucht eine ruhige, nicht-wertende Antwort – weder
              Verharmlosen noch Aufbauschen.
            </p>
            <ul className="ml-5 list-disc space-y-1.5" style={bodyStyle}>
              {fuerBetroffene.map(p => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>

          {/* Für Sie persönlich */}
          <article className="mt-10 space-y-3">
            <h4 style={h4Style}>Für Sie persönlich</h4>
            <p style={bodyStyle}>
              Schwere Krisen hinterlassen auch bei Angehörigen Spuren. Dauernde
              Alarmbereitschaft, Schreckhaftigkeit, Angst vor der nächsten
              Eskalation oder emotionale Taubheit sind normale Reaktionen – kein
              Zeichen von Schwäche.
            </p>
            <ul className="ml-5 list-disc space-y-1.5" style={bodyStyle}>
              {fuerSiePersoenlich.map(p => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>

          {/* Gemeinsame Krisenanalyse */}
          <article className="mt-10 space-y-3">
            <h4 style={h4Style}>
              Gemeinsame Krisenanalyse (wenn beide bereit sind)
            </h4>
            <p style={bodyStyle}>
              Nicht direkt nach der Krise – aber in den nächsten Tagen, in einem
              ruhigen Moment, kann ein kurzes Gespräch helfen. Nicht als
              Vorwurf, sondern als gemeinsames Lernen.
            </p>
            <dl className="mt-3 grid gap-4 sm:grid-cols-3">
              {krisenanalyseFragen.map(item => (
                <div key={item.frage} className="space-y-1">
                  <dt
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      color: "var(--fg-primary)",
                    }}
                  >
                    {item.frage}
                  </dt>
                  <dd style={exampleStyle}>{item.beispiel}</dd>
                </div>
              ))}
            </dl>
          </article>

          {/* Vertrauenswiederaufbau */}
          <article className="mt-10 space-y-3">
            <h4 style={h4Style}>Vertrauenswiederaufbau – realistisch</h4>
            <p style={bodyStyle}>
              Vertrauen baut sich nicht durch ein Gespräch wieder auf – sondern
              durch{" "}
              <strong style={{ color: "var(--fg-primary)" }}>
                viele kleine Momente der Verlässlichkeit
              </strong>{" "}
              über Zeit. Erwarten Sie keine sofortige Rückkehr zur Normalität.
            </p>
            <ul className="ml-5 list-disc space-y-1.5" style={bodyStyle}>
              {vertrauensaufbau.map(p => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>

          {/* Tag-für-Tag (Phasen-Tints bleiben dezent) */}
          <article className="mt-10">
            <h4 style={h4Style}>Erste Woche nach der Krise – Tag für Tag</h4>
            <div className="mt-4 space-y-3">
              {tagFuerTag.map(phase => (
                <div
                  key={phase.tage}
                  className={`rounded-md border p-4 ${phase.farbe}`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className="rounded-full border border-border/60 bg-background px-2 py-0.5 text-xs font-semibold"
                      style={{ color: "var(--accent-primary)" }}
                    >
                      {phase.tage}
                    </span>
                    <span
                      style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}
                    >
                      {phase.titel}
                    </span>
                  </div>
                  <ul className="ml-5 list-disc space-y-1.5" style={bodyStyle}>
                    {phase.punkte.map(p => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          {/* Früherkennung */}
          <article className="mt-10 space-y-3">
            <h4 style={h4Style}>Früherkennung trainieren</h4>
            <p style={bodyStyle}>
              Jede überstandene Krise ist eine Lernchance für die nächste. Nicht
              um sie zu erzwingen, sondern um früher zu erkennen, wann
              Unterstützung nötig ist.
            </p>
            <ul className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {frueherkennung.map(item => (
                <li key={item.label}>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      color: "var(--fg-primary)",
                    }}
                  >
                    {item.label}
                  </p>
                  <p style={bodyStyle}>{item.sub}</p>
                </li>
              ))}
            </ul>
          </article>

          {/* Warnsignale Stagnation (sicherheitskritisch — amber-Akzent bleibt) */}
          <aside
            className="mt-10 border border-amber-300/60 border-l-4 bg-amber-50/40 p-5"
            style={{ borderColor: "#d97706" }}
          >
            <h4 style={{ ...h4Style, color: "#92400e" }}>
              Warnsignale: wenn die Nachphase nicht besser wird
            </h4>
            <ul className="mt-3 ml-5 list-disc space-y-1.5" style={bodyStyle}>
              <li>
                Die betroffene Person zieht sich weiter zurück oder eskaliert
                erneut
              </li>
              <li>
                Sie selbst werden zynisch, gleichgültig oder dauerhaft
                hypervigilant
              </li>
              <li>Keine Änderung der Muster, die zur Krise geführt haben</li>
              <li>Krisen häufen sich ohne erkennbaren Fortschritt</li>
            </ul>
            <p className="mt-3" style={bodyStyle}>
              <strong style={{ color: "var(--fg-primary)" }}>Dann:</strong>{" "}
              Professionelle Unterstützung intensivieren – für die betroffene
              Person, für Sie, oder für beide gemeinsam.
            </p>
          </aside>
        </ContentSection>

        {/* ── Situations-Wegweiser-Übergang ── */}
        <EditorialSectionBlock rule>
          <EditorialProse>
            <p>
              In der akuten Situation ist klares Denken schwer. Der{" "}
              <Link href="/wegweiser" className="editorial-link">
                Situations-Wegweiser «Was tun wenn…»
              </Link>{" "}
              führt Sie Schritt für Schritt durch verschiedene Krisenszenarien.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        {/* ── Materialien ── */}
        <EditorialSectionBlock
          label="Materialien"
          title="Materialien zum Thema"
        >
          <EditorialProse>
            <p>
              Infografiken und Handouts zum Thema Krisenbegleitung finden Sie
              gesammelt auf der{" "}
              <Link href="/materialien" className="editorial-link">
                Materialien-Seite
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        {/* ── Schluss-Sektion: Übergang ── */}
        <EditorialSectionBlock label="Weiter" rule>
          <EditorialProse>
            <p>
              Wenn die Spitze überstanden ist, hilft sprachliche Klarheit:{" "}
              <Link href="/kommunizieren" className="editorial-link">
                weiter zu Kommunizieren
              </Link>
              . Zurück geht es zu{" "}
              <Link href="/unterstuetzen/therapie" className="editorial-link">
                Therapie begleiten
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        <RelatedLinksEditorial
          links={[
            {
              href: "/soforthilfe",
              title: "Soforthilfe & Notfallnummern",
              description:
                "Akute Notfall-Kontakte, Krisenkarten und 24/7-Hotlines für Suizidgedanken oder Selbstverletzung.",
            },
            {
              href: "/wegweiser",
              title: "Situations-Wegweiser",
              description:
                "Interaktive Schritt-für-Schritt-Hilfe für konkrete Krisenszenarien.",
            },
            {
              href: "/kommunizieren",
              title: "Kommunizieren",
              description:
                "Validierung und DEAR-Technik — wie Sie Krisen sprachlich tragen, ohne in Eskalation zu kippen.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
