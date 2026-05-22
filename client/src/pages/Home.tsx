import {
  DisplayHeading,
  EditorialBody,
  EditorialProse,
  EditorialSection,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import { VisualOrientationGrid } from "@/components/visualizations/VisualOrientationGrid";
import AppLink from "@/components/AppLink";
import Layout from "@/components/Layout";
import SEO, { MedicalPageSchema, WebsiteSchema } from "@/components/SEO";
import { ADRESSEN, EMAILS, INFO } from "@/data/kontakte";

// Single-source-of-truth: keine Telefon-/E-Mail-/Adress-Hardcoding im Markup
const FACHSTELLE = INFO.find(k => k.id === "INFO_FACHSTELLE");
const EMAIL_ANGEHOERIGEN = EMAILS.find(e => e.id === "EMAIL_ANGEHOERIGEN");
const ADRESSE_PUK = ADRESSEN.find(a => a.id === "ADRESSE_PUK");

const HERO_INDEX = [
  {
    label: "Akut",
    title: "Soforthilfe",
    text: "Wenn Gefahr, Suiziddruck oder Gewalt im Raum steht.",
    href: "/soforthilfe",
  },
  {
    label: "Einordnen",
    title: "Verstehen",
    text: "Wenn Sie erst wissen möchten, was gerade passiert.",
    href: "/verstehen",
  },
  {
    label: "Handeln",
    title: "Kommunizieren",
    text: "Wenn Sie Sätze, Grenzen und weniger Eskalation brauchen.",
    href: "/kommunizieren",
  },
];

const PATHWAYS = [
  {
    kicker: "Gefahr oder Krise",
    title: "Schnell den richtigen Kontakt finden",
    body: "Notfallnummern, psychiatrische Krisenstellen und Gewalt-/Opferhilfe ohne Umwege.",
    href: "/soforthilfe",
    link: "Soforthilfe öffnen",
  },
  {
    kicker: "Ich will verstehen",
    title: "Muster erkennen, ohne zu entschuldigen",
    body: "Was emotionale Überflutung, Scham, Angst und Bindungsstress bedeuten können.",
    href: "/verstehen",
    link: "Mit Verstehen beginnen",
  },
  {
    kicker: "Ich brauche Worte",
    title: "Ruhiger sprechen, klarer bleiben",
    body: "Validieren, Grenzen formulieren und Konflikte weniger stark anheizen.",
    href: "/kommunizieren",
    link: "Gesprächshilfen ansehen",
  },
  {
    kicker: "Ich bin am Limit",
    title: "Die eigene Kraft wieder schützen",
    body: "Selbstfürsorge, Beratung und Entlastung, ohne sich dafür rechtfertigen zu müssen.",
    href: "/selbstfuersorge",
    link: "Selbstfürsorge einordnen",
  },
];

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Startseite"
        description="Orientierung für Angehörige von Menschen mit Borderline: differenziert, fachlich fundiert und transparent eingeordnet."
        path="/"
      />
      <WebsiteSchema />
      <MedicalPageSchema
        title="Borderline: Orientierung für Angehörige"
        description="Psychoedukative Unterstützung für Angehörige von Menschen mit Borderline-Muster."
        path="/"
        lastReviewed="2026-04-30"
      />

      <EditorialSection variant="cream" density="hero">
        <EditorialSection.MarginNote>
          <HomeMarginLabel>
            Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik
            Zürich
          </HomeMarginLabel>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <DisplayHeading level={1}>
            Wenn jemand, den Sie lieben, <em>Borderline</em> hat
          </DisplayHeading>
          <Lede size="hero">
            Eine Orientierung zur Borderline-Persönlichkeitsstörung für
            Partnerinnen, Eltern, Geschwister und erwachsene Kinder, die
            verstehen, unterstützen und sich selbst schützen möchten.
          </Lede>
          <p
            className="mt-8 max-w-[34rem]"
            style={{
              color: "var(--fg-secondary)",
              fontSize: "var(--text-md)",
              lineHeight: "var(--lh-relaxed)",
            }}
          >
            Wenn Sie seit Monaten zwischen Sorge, Schuld und Erschöpfung
            schwanken: Sie sind hier richtig. Sie müssen nicht zuerst alles
            sortieren, um anfangen zu dürfen.
          </p>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <StartIndex />
        </EditorialSection.Aside>
      </EditorialSection>

      <PathwaySection />

      <EditorialSection variant="cream" density="compact">
        <EditorialSection.MarginNote>
          <HomeMarginLabel>Warum diese Seite</HomeMarginLabel>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel>Anerkennung</EyebrowLabel>
          <DisplayHeading level={2}>
            Viele Angehörige kommen nicht mit einer klaren Frage, sondern mit
            einem Knäuel.
          </DisplayHeading>
          <EditorialProse>
            <p>
              Sie fragen sich, ob das, was Sie erleben, Krankheit ist,
              Charakter, Krise oder Ihre eigene Schuld. Oft liegt die Antwort
              nicht in einem einzigen Begriff, sondern in wiederkehrenden
              Dynamiken: Überflutung, Rückzug, Angst, Scham, Nähe und Grenze.
            </p>
            <p>
              Diese Website soll nicht bewerten. Sie soll sortieren: Was ist
              akut? Was lässt sich verstehen? Wo können Sie unterstützen? Und wo
              braucht es Schutz, Abstand oder professionelle Hilfe?
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>

      <EditorialSection variant="aubergine" density="compact">
        <EditorialSection.MarginNote>
          <HomeMarginLabel tone="light">Grundsatz</HomeMarginLabel>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <EyebrowLabel tone="light">Mitgefühl und Selbstschutz</EyebrowLabel>
          <DisplayHeading level={2} tone="light">
            Grenzen sind nicht das Gegenteil von Beziehung.
          </DisplayHeading>
          <EditorialProse>
            <p>
              Viele Angehörige tragen die stille Sorge, dass Abstand lieblos
              sei. Dabei ist Selbstschutz oft die Voraussetzung dafür, morgen
              noch ruhig, präsent und ansprechbar sein zu können.
            </p>
            <p>
              Sie dürfen verstehen <em>und</em> sich schützen. Sie dürfen
              bleiben <em>und</em> Distanz wahren. Sie dürfen lieben{" "}
              <em>und</em> müde sein.
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>

      <VisualOrientationGrid
        maxItems={4}
        title="Vier Schlüsselbilder für den Anfang."
        intro="Die Bilder führen nicht weg vom Inhalt, sondern hinein: erst verstehen, dann Krise einordnen, Gespräche beruhigen und Grenzen sichtbar machen."
      />

      <EditorialSection variant="cream-deep" density="compact">
        <EditorialSection.MarginNote>
          <HomeMarginLabel>Fachstelle</HomeMarginLabel>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <DisplayHeading level={2}>
            Wenn Sie nicht wissen, wo anfangen: bringen Sie einfach die Lage
            mit.
          </DisplayHeading>
          <EditorialProse>
            <p>
              Die Fachstelle Angehörigenarbeit berät auch Sie – nicht nur die
              betroffene Person. Orientierung, Gespräch und Materialien für
              Partnerinnen, Eltern, Geschwister und erwachsene Kinder.
            </p>
          </EditorialProse>
        </EditorialSection.Body>
        {FACHSTELLE && EMAIL_ANGEHOERIGEN && ADRESSE_PUK && (
          <EditorialSection.Aside>
            <ContactPanel />
          </EditorialSection.Aside>
        )}
      </EditorialSection>

      <section className="bg-[var(--bg-primary)] px-[var(--container-pad)] py-[var(--section-y-compact-mobile)] md:px-[var(--container-pad-md)] md:py-[var(--section-y-compact-desktop)]">
        <div
          className="mx-auto flex max-w-page flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--rule-color)" }}
        >
          <EditorialBody as="p">
            In einer akuten Krise zählt der schnellste funktionierende Weg.
          </EditorialBody>
          <AppLink
            href="/soforthilfe"
            className="editorial-link text-sm font-medium"
          >
            Notfallnummern öffnen
          </AppLink>
        </div>
      </section>
    </Layout>
  );
}

function HomeMarginLabel({
  children,
  tone = "default",
}: {
  children: string;
  tone?: "default" | "light";
}) {
  return (
    <>
      <span
        className="block text-[13px] font-medium uppercase"
        style={{
          color: tone === "light" ? "#d6c8be" : "var(--accent-label)",
          letterSpacing: "var(--tracking-caps)",
          lineHeight: 1.35,
        }}
      >
        {children}
      </span>
      <div
        aria-hidden="true"
        className="mt-3 border-t"
        style={{
          borderColor:
            tone === "light"
              ? "rgba(245, 236, 230, 0.22)"
              : "var(--rule-color)",
        }}
      />
    </>
  );
}

function StartIndex() {
  return (
    <nav
      aria-label="Schneller Einstieg"
      className="border-y"
      style={{ borderColor: "var(--rule-color)" }}
    >
      <p
        className="py-3 text-xs font-medium uppercase"
        style={{
          color: "var(--accent-label)",
          letterSpacing: "var(--tracking-caps)",
        }}
      >
        Beginnen Sie hier
      </p>
      <ol className="divide-y" style={{ borderColor: "var(--rule-color)" }}>
        {HERO_INDEX.map((item, index) => (
          <li key={item.href}>
            <AppLink
              href={item.href}
              className="group grid grid-cols-[2.5rem_1fr] gap-4 py-5 no-underline"
            >
              <span
                aria-hidden="true"
                className="font-display text-2xl"
                style={{ color: "var(--fg-tertiary)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span
                  className="block text-xs font-medium uppercase"
                  style={{
                    color: "var(--fg-tertiary)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {item.label}
                </span>
                <span
                  className="mt-1 block font-display text-[1.35rem] transition-colors group-hover:text-[color:var(--accent-primary)]"
                  style={{
                    color: "var(--fg-primary)",
                    lineHeight: "var(--lh-snug)",
                  }}
                >
                  {item.title}
                </span>
                <span
                  className="mt-2 block text-sm"
                  style={{
                    color: "var(--fg-secondary)",
                    lineHeight: "var(--lh-snug)",
                  }}
                >
                  {item.text}
                </span>
              </span>
            </AppLink>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function PathwaySection() {
  return (
    <section className="bg-[var(--bg-primary)] px-[var(--container-pad)] pb-[var(--section-y-normal-mobile)] md:px-[var(--container-pad-md)] md:pb-[var(--section-y-normal-desktop)]">
      <div className="mx-auto max-w-page">
        <div
          className="grid gap-6 border-y py-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-10"
          style={{ borderColor: "var(--rule-color)" }}
        >
          <div>
            <EyebrowLabel spacing="compact">Erste Orientierung</EyebrowLabel>
            <h2
              className="mt-4 font-display text-[2rem] md:text-[2.4rem]"
              style={{
                color: "var(--fg-primary)",
                lineHeight: "var(--lh-tight)",
                letterSpacing: "var(--tracking-tight)",
                fontWeight: "var(--weight-display)",
              }}
            >
              Was brauchen Sie gerade?
            </h2>
          </div>
          <ul className="grid divide-y md:grid-cols-2 md:gap-x-8 md:divide-y-0">
            {PATHWAYS.map(item => (
              <li
                key={item.href}
                className="py-5 first:pt-0 md:border-t md:first:pt-5"
                style={{ borderColor: "var(--rule-color)" }}
              >
                <p
                  className="text-xs font-medium uppercase"
                  style={{
                    color: "var(--accent-label)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {item.kicker}
                </p>
                <h3
                  className="mt-2 font-display text-[1.35rem]"
                  style={{
                    color: "var(--fg-primary)",
                    lineHeight: "var(--lh-snug)",
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-sm"
                  style={{
                    color: "var(--fg-secondary)",
                    lineHeight: "var(--lh-relaxed)",
                  }}
                >
                  {item.body}
                </p>
                <AppLink
                  href={item.href}
                  className="editorial-link mt-4 inline-block text-sm"
                >
                  {item.link}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ContactPanel() {
  if (!FACHSTELLE || !EMAIL_ANGEHOERIGEN || !ADRESSE_PUK) return null;

  return (
    <div
      className="border p-6"
      style={{
        borderColor: "var(--rule-color-strong)",
        borderRadius: "0.25rem",
        background: "var(--bg-primary)",
      }}
    >
      <p
        className="text-[11px] font-medium uppercase"
        style={{
          color: "var(--accent-label)",
          letterSpacing: "var(--tracking-caps)",
          marginBottom: "var(--space-3)",
        }}
      >
        Kontakt
      </p>
      <p
        className="font-display"
        style={{
          fontSize: "var(--text-md)",
          color: "var(--fg-primary)",
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        {FACHSTELLE.label}
      </p>
      <p
        className="mt-1"
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--fg-secondary)",
          lineHeight: 1.5,
        }}
      >
        {ADRESSE_PUK.adresse}
      </p>
      <ul
        className="mt-4 space-y-2"
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--fg-secondary)",
        }}
      >
        <li>
          <a href={`tel:${FACHSTELLE.tel}`} className="editorial-link">
            {FACHSTELLE.nummer}
          </a>
        </li>
        <li>
          <a
            href={`mailto:${EMAIL_ANGEHOERIGEN.adresse}`}
            className="editorial-link break-all"
          >
            {EMAIL_ANGEHOERIGEN.adresse}
          </a>
        </li>
      </ul>
    </div>
  );
}
