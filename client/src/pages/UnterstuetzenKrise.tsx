import KinderEntlasten from "@/components/KinderEntlasten";
import TopicQuickLinks from "@/components/TopicQuickLinks";
import ContentSection from "@/components/ContentSection";
import {
  DisplayHeading,
  EditorialCallout,
  EditorialProse,
  EditorialSection,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import ReviewBadge from "@/components/ReviewBadge";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import UnterstuetzenSubNav from "@/components/UnterstuetzenSubNav";
import { TableOfContents } from "@/components/UXEnhancements";
import BelastungHandlungsraeume from "@/components/visualizations/BelastungHandlungsraeume";
import AppLink from "@/components/AppLink";
import { kontaktByIdStrict } from "@/data/kontakte";
import {
  belastungLead,
  handlungsraeume,
  keineSicherheitsbewertung,
  wichtigeAbgrenzung,
} from "@/content/belastungHandlungsraeume";
import { Link } from "wouter";

const rot144 = kontaktByIdStrict("ROT_144");
const gruen143 = kontaktByIdStrict("GRUEN_143");

const deeskalationsSchritte = [
  {
    title: "Sicherheit prüfen",
    description:
      "Sind Sie und Ihr Angehöriger sicher? Gibt es gefährliche Gegenstände in der Nähe?",
    example:
      "Begrenzen Sie den Zugang zu Medikamenten oder gefährlichen Gegenständen nur ohne Eigengefährdung, möglichst gemeinsam und nach professioneller Anleitung. Nehmen Sie nichts aus der Hand oder gegen Widerstand weg; greifen Sie nicht körperlich ein. Bei unmittelbarer Gefahr holen Sie Hilfe über den Notruf.",
  },
  {
    title: "Mit wenigen Worten sprechen",
    description:
      "Wenn es Ihnen möglich ist, sprechen Sie kurz und ohne zusätzliche Vorwürfe. Sie dürfen selbst erschrocken sein und müssen keine Beruhigung erreichen.",
    example: "«Ich bin gerade auch erschrocken. Ich hole Unterstützung.»",
  },
  {
    title: "Nachfragen und zuhören",
    description:
      "Fragen Sie offen, was die Person erlebt. Sie können Anteil nehmen, ohne einer Forderung zuzustimmen.",
    example: "«Das wirkt gerade sehr schmerzhaft. Verstehe ich dich richtig?»",
  },
  {
    title: "An vereinbarte Strategien erinnern",
    description:
      "Wenn die Person das möchte, können Sie an bereits mit Fachpersonen vereinbarte Strategien erinnern. Drängen Sie keine Übung auf; bei Gefahr geht Hilfeholen vor.",
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
    quote:
      "«Möchtest du, dass ich bei dir sitze? Wir können Unterstützung holen.»",
    note: "Bieten Sie nur Nähe oder Erreichbarkeit an, die für Sie möglich und sicher ist. Bei Bedrohung bringen Sie sich in Sicherheit und informieren die Leitstelle.",
  },
  {
    title: "Gefühle validieren",
    quote:
      "«Das wirkt gerade sehr schmerzhaft. Magst du sagen, was dich beschäftigt?»",
  },
  {
    title: "Hoffnung vermitteln",
    quote:
      "«Wir müssen jetzt nicht alles lösen. Lass uns schauen, welche Unterstützung gerade erreichbar ist.»",
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

const fuerBetroffene = [
  "Scham anerkennen, ohne sie zu bestätigen: «Ich sehe, dass es dir schlecht damit geht. Mir auch. Lass uns das besprechen, wenn du dich bereit fühlst.»",
  "Eine gemeinsame Nachbesprechung kann warten, bis sie für beide möglich ist. Nötige medizinische oder psychiatrische Hilfe hat keine Wartefrist.",
  "Mit dem Behandlungsteam klären, welche fachliche Nachsorge nötig ist und welche Rolle Sie freiwillig übernehmen können",
  "Wenn beide möchten: Was wurde vor der Krise bemerkt, was hat geholfen und wo braucht es zusätzliche Unterstützung?",
] as const;

const fuerSiePersoenlich = [
  "Eigene Erschütterung ernst nehmen – Sie dürfen erschöpft, wütend oder traurig sein",
  "Gespräch suchen: Fachstelle, Selbsthilfegruppe oder eigene Therapie",
  "Bei anhaltender Alarmbereitschaft oder gesundheitlichen Beschwerden eigene Beratung oder ärztliche Hilfe nutzen",
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
  "Eigene Verletzungen und Verantwortung besprechen dürfen, ohne gegenseitig Schuld aufzurechnen",
  "Vertrauen hat keinen festen Zeitplan. Auch Abstand oder eine Veränderung der Beziehung darf Thema sein.",
] as const;

const tagFuerTag = [
  {
    tage: "Erholung",
    titel: "Was wird jetzt gebraucht?",
    farbe: "border-border/50 bg-background",
    punkte: [
      "Eine ausführliche Nachbesprechung muss nicht sofort stattfinden",
      "Fragen Sie, was gerade hilfreich wäre, und beachten Sie Ihre eigenen Bedürfnisse",
      "Nötige Betreuung gemeinsam organisieren; Sie müssen sie nicht allein übernehmen",
    ],
  },
  {
    tage: "Unterstützung",
    titel: "Wer ist wofür zuständig?",
    farbe: "border-border/50 bg-muted/20",
    punkte: [
      "Fachliche Nachsorge und erreichbare Kontakte mit dem Behandlungsteam klären",
      "Nur konkrete Aufgaben zusagen, die Sie freiwillig übernehmen können",
      "Bei erneuten Sorgen um die Sicherheit sofort Hilfe holen, unabhängig vom Zeitpunkt",
    ],
  },
  {
    tage: "Nachbesprechung",
    titel: "Was möchten wir gemeinsam klären?",
    farbe: "border-border/50 bg-muted/30",
    punkte: [
      "Wenn beide bereit sind: Was hat geholfen und was möchten wir verändern?",
      "Eigene Verletzungen und Grenzen ansprechen dürfen",
      "Für Fragen, die gemeinsam nicht geklärt werden können, Unterstützung nutzen",
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
              className="rounded bg-white px-3 py-2 text-sm font-medium text-alert-dark transition-colors hover:bg-white/90"
            >
              Alle Notfallnummern
            </AppLink>
          </div>
        </div>
      </section>

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
            Wenn es kippt
          </span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel className="mb-3" spacing="compact">
            In der Krise
          </EyebrowLabel>
          <DisplayHeading level={1} size="topic">
            In der Krise <em>unterstützen</em>
          </DisplayHeading>
          <Lede className="max-w-[40em]">
            Viele Angehörige erleben Phasen starker Anspannung, Eskalation oder
            Rückzug. Hier erfahren Sie, wie Sie Krisen besser einordnen,
            deeskalierend reagieren und Sicherheit im Blick behalten können,
            ohne Ihre eigene Grenze aus dem Blick zu verlieren.
          </Lede>
          <TopicQuickLinks
            items={[
              { href: "#belastung-handlungsraeume", label: "Belastung ordnen" },
              { href: "#deeskalation", label: "Deeskalation" },
              { href: "#krise-formulierungen", label: "Formulierungen" },
              { href: "#nach-der-krise", label: "Nach der Krise" },
            ]}
          />
          <div
            className="mt-8 border-t pt-3"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <EyebrowLabel spacing="compact">
              Vollständig ca. 6 Min · Auch abschnittweise lesbar
            </EyebrowLabel>
            <LastVerifiedBadge path="/unterstuetzen/krise" className="mt-3" />
            <ReviewBadge path="/unterstuetzen/krise" />
          </div>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 2 Orientierung ── Disclaimer als Auftakt + BelastungHandlungsraeume */}
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
          {/* Disclaimer: Hairline-Trenner darüber + italic + Sage-Akzent
              (Sage-Color für italic Body schafft visuelle Differenzierung
              zum normalen Body-Text, analog Wegweiser-Übergangs-Pattern in
              Group C body) */}
          <EditorialCallout variant="hinweis">
            Diese Inhalte ersetzen keine professionelle Krisenberatung. Bei
            akuter Gefahr direkt{" "}
            <strong style={{ color: "var(--fg-primary)" }}>144 / 117</strong>{" "}
            anrufen.
          </EditorialCallout>
          <BelastungHandlungsraeume />
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 3 Intro: Was diese Seite in Krisen ordnet ── */}
      <EditorialSection variant="cream" density="compact">
        <EditorialSection.Body>
          <ul className="topic-takeaways">
            <li>
              Bei unmittelbarer Gefahr holen Sie sofort Hilfe und schützen sich
              selbst.
            </li>
            <li>
              Bei Unsicherheit ist professionelle Einschätzung sinnvoll; ein
              unbekannter Plan bedeutet keine Sicherheit.
            </li>
            <li>
              Nach der Krise können Absprachen und Unterstützung in Ruhe geklärt
              werden.
            </li>
          </ul>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 4 Group A: Belastung ordnen ── CS1 belastung-handlungsraeume */}
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
            Belastung ordnen
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
            title="Wenn Belastung zunimmt"
            id="belastung-handlungsraeume"
          >
            <EditorialProse>
              <p>
                Nicht jede schwierige Situation ist eine Krise. Die drei
                Bereiche ordnen beobachtbare Belastung und
                Handlungsmöglichkeiten — sie zeigen, wie weit die eigenen Mittel
                gerade tragen.
              </p>
              <p>{belastungLead}</p>
            </EditorialProse>

            <div
              className="mt-6 border-l-4 bg-background p-5"
              style={{ borderColor: "var(--rule-color-strong)" }}
            >
              <h3 style={h4Style}>{keineSicherheitsbewertung.titel}</h3>
              <p className="mt-2" style={bodyStyle}>
                {keineSicherheitsbewertung.text}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {handlungsraeume.map((raum, idx) => (
                <article
                  key={raum.id}
                  className="border border-border/50 bg-background p-5"
                >
                  <h3 style={h4Style}>
                    {idx + 1}. {raum.label}
                  </h3>
                  <p className="mt-2" style={bodyStyle}>
                    {raum.beschreibung}
                  </p>
                  <p className="mt-2" style={bodyStyle}>
                    <strong style={{ color: "var(--fg-primary)" }}>
                      Eher hilfreich:
                    </strong>{" "}
                    {raum.hilfreich.join(", ")}.
                  </p>
                </article>
              ))}
            </div>

            <div
              className="mt-8 border-t pt-6"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <p className="uppercase" style={labelStyle}>
                Wichtige Abgrenzung
              </p>
              <p className="mt-3" style={bodyStyle}>
                {wichtigeAbgrenzung}
              </p>
            </div>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 5 Group B: Während der Krise ── CS2 deeskalation + CS3 krise-formulierungen + CS4 vermeiden */}
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
            Während der Krise
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
            title="Was während einer Krise helfen kann"
            id="deeskalation"
          >
            <p className="mb-5" style={bodyStyle}>
              Sicherheit hat Vorrang. Die Gesprächsvorschläge sind eine Auswahl;
              Sie müssen sie nicht der Reihe nach umsetzen oder erst ruhig
              werden, bevor Sie Hilfe holen.
            </p>
            <ul className="mt-2 space-y-6">
              {deeskalationsSchritte.map(item => (
                <li key={item.title} className="border-t border-border pt-4">
                  <div className="space-y-2">
                    <h3 style={h4Style}>{item.title}</h3>
                    <p style={bodyStyle}>{item.description}</p>
                    <p style={exampleStyle}>{item.example}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ContentSection>

          {/* ── ContentSection 3: krise-formulierungen ── */}
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Was Sie in der Krise sagen können"
            id="krise-formulierungen"
          >
            <EditorialProse>
              <p>
                Sie müssen keine perfekten Worte finden. Diese Beispiele können
                eine Orientierung sein; keine Formulierung garantiert einen
                bestimmten Verlauf.
              </p>
            </EditorialProse>
            <div className="mt-8 space-y-8">
              {formulierungen.map(item => (
                <article key={item.title} className="space-y-2">
                  <h3 style={h4Style}>{item.title}</h3>
                  <p style={exampleStyle}>{item.quote}</p>
                  {item.note && <p style={bodyStyle}>{item.note}</p>}
                </article>
              ))}
            </div>
          </ContentSection>

          {/* ── ContentSection 4: vermeiden (sicherheitskritisch — Alert-Akzent bleibt) ── */}
          <ContentSection
            variant="editorial"
            collapsible={false}
            title="Was Sie in der Krise vermeiden sollten"
            id="vermeiden"
          >
            <aside className="mt-2 border border-[--color-sos-amber-border] border-l-2 border-l-[--color-sos-amber-text] bg-[--color-sos-amber-wash] p-6">
              <ul className="space-y-2.5" style={bodyStyle}>
                <li className="flex items-start gap-2">
                  <span
                    className="text-[--color-sos-amber-text]"
                    aria-hidden="true"
                  >
                    ✗
                  </span>
                  Drohen oder Ultimaten stellen
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="text-[--color-sos-amber-text]"
                    aria-hidden="true"
                  >
                    ✗
                  </span>
                  Vorwürfe machen oder Schuld zuweisen
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="text-[--color-sos-amber-text]"
                    aria-hidden="true"
                  >
                    ✗
                  </span>
                  Die Gefühle herunterspielen («So schlimm ist es doch nicht»)
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="text-[--color-sos-amber-text]"
                    aria-hidden="true"
                  >
                    ✗
                  </span>
                  Logisch argumentieren oder überzeugen wollen
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="text-[--color-sos-amber-text]"
                    aria-hidden="true"
                  >
                    ✗
                  </span>
                  Die Person ohne Hilfe, Notfallplan oder professionelle
                  Einschätzung allein lassen – sofern Sie selbst sicher bleiben
                  können
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="text-[--color-sos-amber-text]"
                    aria-hidden="true"
                  >
                    ✗
                  </span>
                  Sich selbst in Gefahr bringen
                </li>
              </ul>
            </aside>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 6 Group C: Nach der Krise ── CS5 nach-der-krise + Wegweiser-Übergang am Ende */}
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
            Nach der Krise
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
            title="Nach der Krise: Verarbeitung und Neubeginn"
            id="nach-der-krise"
            preview="Die akute Krise ist vorbei – aber die innere Landschaft braucht Zeit. Was jetzt hilft: für die betroffene Person, für Sie, und gemeinsam."
          >
            <p className="mt-3" style={bodyStyle}>
              Krisen verlaufen unterschiedlich. Ein ruhigerer Eindruck oder
              verstrichene Zeit beweist keine Sicherheit. Bei erneuter Sorge
              holen Sie professionelle Einschätzung; bei möglicher unmittelbarer
              Lebensgefahr rufen Sie den Rettungsdienst.
            </p>

            {/* Für die betroffene Person */}
            <article className="mt-10 space-y-3">
              <h3 style={h4Style}>Für die betroffene Person</h3>
              <p style={bodyStyle}>
                Nach einer Krise können Scham, Rückzug, Erleichterung oder
                andere Gefühle auftreten. Fragen Sie nach, statt ein bestimmtes
                Erleben vorauszusetzen. Auch Ihre eigene Erschütterung darf Raum
                haben.
              </p>
              <ul className="ml-5 list-disc space-y-1.5" style={bodyStyle}>
                {fuerBetroffene.map(p => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>

            {/* Für Sie persönlich */}
            <article className="mt-10 space-y-3">
              <h3 style={h4Style}>Für Sie persönlich</h3>
              <p style={bodyStyle}>
                Schwere Krisen hinterlassen auch bei Angehörigen Spuren.
                Dauernde Alarmbereitschaft, Schreckhaftigkeit, Angst vor der
                nächsten Eskalation oder emotionale Taubheit sind normale
                Reaktionen – kein Zeichen von Schwäche.
              </p>
              <ul className="ml-5 list-disc space-y-1.5" style={bodyStyle}>
                {fuerSiePersoenlich.map(p => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>

            {/* Gemeinsame Krisenanalyse */}
            <article className="mt-10 space-y-3">
              <h3 style={h4Style}>
                Gemeinsame Krisenanalyse (wenn beide bereit sind)
              </h3>
              <p style={bodyStyle}>
                Nicht direkt nach der Krise – aber in den nächsten Tagen, in
                einem ruhigen Moment, kann ein kurzes Gespräch helfen. Nicht als
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
              <h3 style={h4Style}>Vertrauenswiederaufbau – realistisch</h3>
              <p style={bodyStyle}>
                Vertrauen baut sich nicht durch ein Gespräch wieder auf –
                sondern durch{" "}
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
              <h3 style={h4Style}>Nach der Krise: drei mögliche Anliegen</h3>
              <p className="mt-3" style={bodyStyle}>
                Dafür gibt es keinen festen Tagesplan. Dringende Hilfe kann zu
                jedem Zeitpunkt nötig sein; eine gemeinsame Nachbesprechung
                richtet sich danach, was für beide möglich ist.
              </p>
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
                    <ul
                      className="ml-5 list-disc space-y-1.5"
                      style={bodyStyle}
                    >
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
              <h3 style={h4Style}>Früherkennung trainieren</h3>
              <p style={bodyStyle}>
                Jede überstandene Krise ist eine Lernchance für die nächste.
                Nicht um sie zu erzwingen, sondern um früher zu erkennen, wann
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
              <h3 style={{ ...h4Style, color: "#92400e" }}>
                Warnsignale: wenn die Nachphase nicht besser wird
              </h3>
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
            <KinderEntlasten />
          </ContentSection>

          {/* Wegweiser-Übergang als typografisch markierter Block am Ende von Group C body */}
          <div
            className="mt-10 border-t pt-5"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <p
              style={{
                fontSize: "var(--text-md)",
                lineHeight: "var(--lh-relaxed)",
                color: "var(--fg-secondary)",
                fontStyle: "italic",
              }}
            >
              In der akuten Situation ist klares Denken schwer. Der{" "}
              <Link href="/wegweiser" className="editorial-link">
                Situations-Wegweiser «Was tun wenn…»
              </Link>{" "}
              führt Sie Schritt für Schritt durch verschiedene Krisenszenarien.
            </p>
          </div>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 7 Weiter-Hinweis ── */}
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
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 8 Querverweise ── EditorialSection variant="cream-deep" */}
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
        </EditorialSection.Body>
      </EditorialSection>
    </Layout>
  );
}
