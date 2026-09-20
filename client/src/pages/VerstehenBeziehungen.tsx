import { useCallback, useState } from "react";
import ContentSection from "@/components/ContentSection";
import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import { EditorialCallout } from "@/components/editorial/EditorialCallout";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import ReviewBadge from "@/components/ReviewBadge";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import { TableOfContents } from "@/components/UXEnhancements";
import {
  beziehungsBeispiel,
  beziehungsHilfen,
  beziehungsQuellen,
  beziehungsRessourcen,
  beziehungsSchritte,
  beziehungsSpruenge,
  beziehungsThemen,
  verantwortungsFragen,
} from "@/content/beziehungen";

const TITLE = "Borderline und Beziehungen";
const DESCRIPTION =
  "Warum gut gemeinte Unterstützung anders ankommen kann: Ereignis, Bedeutung, Gefühl und Reaktion zwischen Angehörigen und erkrankter Person — ohne Motive zu unterstellen oder Schuld zu verteilen.";

export default function VerstehenBeziehungen() {
  const [aktiverSchritt, setAktiverSchritt] = useState(0);

  const scrollToAnchor = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  const schritt = beziehungsSchritte[aktiverSchritt];

  return (
    <Layout>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        path="/verstehen/beziehungen"
      />
      <MedicalPageSchema
        title={TITLE}
        description={DESCRIPTION}
        path="/verstehen/beziehungen"
      />
      <TableOfContents />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-12 pt-12 md:pb-16 md:pt-16">
          <EyebrowLabel spacing="compact">
            Grundlagen · Beziehung verstehen
          </EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Borderline und Beziehungen — verstehen, was zwischen uns geschieht
          </DisplayHeading>
          <Lede className="mt-6">
            Warum kann gut gemeinte Unterstützung anders ankommen? Weshalb
            werden Nähe, Rückzug oder Kritik manchmal so bedeutsam? Diese Seite
            zeigt mögliche Zusammenhänge — ohne Motive zu unterstellen oder
            Schuld zu verteilen.
          </Lede>
          <p
            className="mt-4"
            style={{ fontSize: "var(--text-sm)", color: "var(--fg-tertiary)" }}
          >
            Vollständig ca. 12 Min · Auch abschnittweise lesbar.
          </p>
          <ReviewBadge path="/verstehen/beziehungen" />
        </header>

        {/* ── Einordnung und Sprungmarken ── */}
        <EditorialSectionBlock
          label="Überblick"
          title="Beziehung ist mehr als ein Symptom"
        >
          <EditorialProse>
            <p>
              Eine Diagnose kann beeinflussen, wie Gefühle, Nähe oder
              Zurückweisung erlebt werden. Sie erklärt aber weder die ganze
              Person noch jeden Konflikt. Eine Beschwerde kann berechtigt, eine
              Grenze unklar vermittelt und eine Reaktion trotzdem durch hohe
              Anspannung verstärkt worden sein.
            </p>
          </EditorialProse>
          <nav aria-label="Auf dieser Seite" className="mt-6">
            <p className="uppercase" style={{ fontSize: "var(--text-sm)" }}>
              Auf dieser Seite
            </p>
            <ul className="mt-3 ml-5 list-disc space-y-1">
              {beziehungsSpruenge.map(sprung => (
                <li key={sprung.id}>
                  <a
                    href={`#${sprung.id}`}
                    className="editorial-link"
                    onClick={event => scrollToAnchor(event, sprung.id)}
                  >
                    {sprung.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </EditorialSectionBlock>

        {/* ── 01 Ressourcen ── */}
        <EditorialSectionBlock
          label="01 · Ressourcen"
          title="Was verbindet uns bereits?"
        >
          <div id="verbindung" style={{ scrollMarginTop: "120px" }} />
          <EditorialProse>
            <p>
              Zuneigung, Humor, Fürsorge, Verlässlichkeit und gemeinsame Freude
              sind nicht weniger echt, weil es auch Krisen gibt. Ebenso machen
              gute Momente Verletzungen nicht ungeschehen. Ein vollständiges
              Bild braucht beides.
            </p>
            <p>
              Die hilfreiche Frage lautet nicht: «Was ist eine positive
              Borderline-Eigenschaft?» Sondern: «Was trägt genau diese Beziehung
              — und wann gelingt Kontakt?»
            </p>
          </EditorialProse>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {beziehungsRessourcen.map(ressource => (
              <li
                key={ressource.title}
                className="border border-border/50 bg-background p-4"
              >
                <p className="font-medium">{ressource.title}</p>
                <p className="mt-1" style={{ fontSize: "var(--text-sm)" }}>
                  {ressource.text}
                </p>
              </li>
            ))}
          </ul>
        </EditorialSectionBlock>

        {/* ── 02 Bedeutungsschleife ── */}
        <EditorialSectionBlock
          label="02 · Bedeutungsschleife"
          title="Nicht nur was geschieht, sondern was es bedeutet"
        >
          <div id="bedeutungsschleife" style={{ scrollMarginTop: "120px" }} />
          <EditorialProse>
            <p>
              Ein verspäteter Rückruf ist zunächst ein Ereignis. Für die eine
              Person bedeutet er «viel zu tun», für die andere vielleicht «ich
              bin unwichtig». Diese Bedeutung kann Gefühle und Reaktionen
              auslösen, die wiederum auf das Gegenüber wirken.
            </p>
          </EditorialProse>

          <div
            className="mt-6 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Stationen der Bedeutungsschleife"
          >
            {beziehungsSchritte.map((eintrag, index) => {
              const aktiv = index === aktiverSchritt;
              return (
                <button
                  key={eintrag.label}
                  type="button"
                  role="tab"
                  aria-selected={aktiv}
                  onClick={() => setAktiverSchritt(index)}
                  className={`min-h-11 border px-3 py-2 text-sm transition-colors ${
                    aktiv
                      ? "border-[color:var(--rule-color-strong)] bg-muted/50 font-medium"
                      : "border-border/50 bg-background hover:bg-muted/25"
                  }`}
                >
                  {index + 1}. {eintrag.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 border border-border/50 bg-background p-5">
            <p className="uppercase" style={{ fontSize: "var(--text-sm)" }}>
              {schritt.kicker}
            </p>
            <p className="mt-1 font-medium">{schritt.title}</p>
            <p className="mt-2">{schritt.text}</p>
            <p className="mt-3" style={{ fontSize: "var(--text-sm)" }}>
              <strong>Zum Innehalten:</strong> {schritt.question}
            </p>
          </div>

          <EditorialCallout variant="hinweis">
            Ein mögliches Erklärungsmodell, keine sichere Aussage darüber, was
            eine konkrete Person denkt oder beabsichtigt.
          </EditorialCallout>

          <div className="mt-6">
            <p className="font-medium">
              Beobachtung, Deutung und Gefühl auseinanderhalten
            </p>
            <dl className="mt-3 space-y-2">
              <div>
                <dt className="font-medium">Beobachtung</dt>
                <dd>
                  «Du hast während meines Erzählens auf dein Telefon geschaut.»
                </dd>
              </div>
              <div>
                <dt className="font-medium">Deutung</dt>
                <dd>«Meine Probleme interessieren dich nicht.»</dd>
              </div>
              <div>
                <dt className="font-medium">Gefühl</dt>
                <dd>«Ich bin verletzt und fühle mich allein.»</dd>
              </div>
            </dl>
            <p className="mt-3">
              Das Gefühl kann sehr real sein, während die Deutung überprüft
              werden darf: «Ich merke, dass ich dein Schweigen als Ablehnung
              verstehe. Ist das tatsächlich das, was gerade bei dir passiert?»
            </p>
          </div>
        </EditorialSectionBlock>

        {/* ── 03 Verletzlichkeit ── */}
        <EditorialSectionBlock
          label="03 · Was die Schleife verstärken kann"
          title="Was den Spielraum zwischen Ereignis und Reaktion verengen kann"
        >
          <div id="verletzlichkeit" style={{ scrollMarginTop: "120px" }} />
          <EditorialProse>
            <p>
              Die folgenden Modelle vertiefen einzelne Stellen der
              Bedeutungsschleife. Sie sind mögliche Einflussfaktoren, keine
              fertige Erklärung einer Person oder eines Konflikts. Auch die
              Kurzformel, Menschen mit Borderline reagierten immer schneller,
              stärker und länger, ist zu pauschal. Entscheidend bleibt: Was
              geschieht bei dieser Person unter dieser Belastung?
            </p>
            <p>
              Öffnen Sie die Themen, die zu Ihrer aktuellen Frage passen.
              Mehrere Abschnitte können gleichzeitig geöffnet bleiben.
            </p>
          </EditorialProse>
          <div className="mt-6 space-y-3">
            {beziehungsThemen.map(thema => (
              <ContentSection
                key={thema.id}
                id={thema.id}
                variant="editorial"
                title={thema.title}
                preview={thema.kicker}
              >
                <EditorialProse>
                  <p>{thema.text}</p>
                </EditorialProse>
                <p className="mt-3" style={{ fontSize: "var(--text-sm)" }}>
                  <strong>Hilfreiche Einordnung:</strong> {thema.takeaway}
                </p>
              </ContentSection>
            ))}
          </div>
        </EditorialSectionBlock>

        {/* ── 04 Wechselwirkung ── */}
        <EditorialSectionBlock
          label="04 · Wechselwirkung"
          title="Beide versuchen etwas Verständliches — und verfehlen sich"
        >
          <div id="wechselwirkung" style={{ scrollMarginTop: "120px" }} />
          <EditorialProse>
            <p>
              Eine Schwester sagt einen Besuch ab, weil sie erschöpft ist. Das
              folgende erfundene Beispiel zeigt, wie Absage, Bedeutung und
              Schutzreaktionen ineinandergreifen könnten. Erschöpfung und
              Enttäuschung können gleichzeitig wahr sein. Die Wirkung einer
              Absage sagt noch nichts Sicheres über ihre Absicht.
            </p>
          </EditorialProse>

          <ol className="mt-6 space-y-3">
            {beziehungsBeispiel.map(eintrag => (
              <li
                key={eintrag.n}
                className="border border-border/50 bg-background p-4"
              >
                <p className="font-medium">
                  {eintrag.n}. {eintrag.event}
                </p>
                <p className="mt-2" style={{ fontSize: "var(--text-sm)" }}>
                  <strong>Mögliche Sicht der betroffenen Person:</strong>{" "}
                  {eintrag.person}
                </p>
                <p className="mt-1" style={{ fontSize: "var(--text-sm)" }}>
                  <strong>Mögliche Sicht der Angehörigen:</strong>{" "}
                  {eintrag.relative}
                </p>
              </li>
            ))}
          </ol>

          <EditorialCallout variant="hinweis">
            Wechselseitiger Einfluss ist keine mathematische Schuldteilung. Er
            erklärt eine Schleife — nicht, wer «zu 50 Prozent» verantwortlich
            ist.
          </EditorialCallout>

          <div className="mt-6">
            <p className="font-medium">
              Auch Reaktionen von Angehörigen werden Teil der Schleife
            </p>
            <EditorialProse>
              <p>
                Vielleicht erklären Sie sich immer ausführlicher, sagen aus
                Konfliktangst zu, kontrollieren häufiger oder ziehen sich zum
                Schutz zurück. Diese Reaktionen sind verständlich und verdienen
                Aufmerksamkeit — einschliesslich ihrer Wirkung auf die andere
                Person.
              </p>
              <p>
                «Ich kann verstehen, weshalb diese Situation für dich schwierig
                war. Und ich darf ernst nehmen, was dein Verhalten bei mir
                ausgelöst hat.»
              </p>
            </EditorialProse>
          </div>

          <div className="mt-6">
            <p className="font-medium">
              Wie sich eine Schleife über längere Zeit festigen kann
            </p>
            <EditorialProse>
              <p>
                Wenn Angehörige zum Beispiel immer eigene Termine absagen,
                sobald grosse Verzweiflung entsteht, kann das heute entlasten.
                Mit der Zeit kann aber der Eindruck wachsen, Sicherheit sei nur
                möglich, wenn genau diese eine Person verfügbar bleibt.
              </p>
              <p>
                Die Alternative ist nicht, Trost zu verweigern. Hilfreiche
                Unterstützung lindert die aktuelle Not und öffnet zugleich
                mehrere Wege: eigene Strategien, weitere Bezugspersonen und
                professionelle Hilfe.
              </p>
            </EditorialProse>
          </div>

          <EditorialCallout variant="hinweis">
            <strong>Wichtig:</strong> Bei Suizidgedanken oder Selbstverletzung
            darf Hilfe nicht aus Sorge vor einer «Verstärkung» vorenthalten
            werden. Dann braucht es eine angemessene professionelle
            Einschätzung.
          </EditorialCallout>
        </EditorialSectionBlock>

        {/* ── 05 Handlungsspielraum ── */}
        <EditorialSectionBlock
          label="05 · Handlungsspielraum"
          title="Was Verbindung tragfähiger machen kann"
        >
          <div id="was-hilft" style={{ scrollMarginTop: "120px" }} />
          <EditorialProse>
            <p>
              Wenn beide stark angespannt sind, geht Beruhigung vor Klärung. Ist
              wieder Gesprächsraum da, kann die Schleife an mehreren Stellen
              unterbrochen werden: bei der Bedeutung eines Ereignisses, bei der
              Form der Unterstützung oder bei der späteren Wiedergutmachung.
              Kein einzelner Satz garantiert Beruhigung.
            </p>
          </EditorialProse>

          <ul className="mt-6 space-y-4">
            {beziehungsHilfen.map(hilfe => (
              <li
                key={hilfe.title}
                className="border border-border/50 bg-background p-4"
              >
                <p className="font-medium">{hilfe.title}</p>
                <p className="mt-1">{hilfe.text}</p>
                <p className="mt-2 italic">{hilfe.example}</p>
              </li>
            ))}
          </ul>

          <p className="mt-6">
            <strong>Ein realistischer Massstab für Veränderung:</strong> Ein
            Missverständnis wird früher erkannt. Eine Grenze wird möglich, ohne
            dass sofort alles geklärt ist. Nach einer Verletzung wird
            Verantwortung übernommen. Unterstützung verteilt sich auf mehrere
            Schultern.
          </p>
        </EditorialSectionBlock>

        {/* ── 06 Verantwortung und Schutz ── */}
        <EditorialSectionBlock
          label="06 · Verantwortung und Schutz"
          title="Verstehen ist keine Pflicht, alles auszuhalten"
        >
          <div id="verantwortung" style={{ scrollMarginTop: "120px" }} />
          <EditorialProse>
            <p>
              Eine Erklärung für ein Verhalten beantwortet nicht automatisch, ob
              dieses Verhalten akzeptabel oder die Beziehung sicher ist.
            </p>
          </EditorialProse>

          <ul className="mt-4 ml-5 list-disc space-y-1">
            {verantwortungsFragen.map(frage => (
              <li key={frage}>{frage}</li>
            ))}
          </ul>

          <EditorialProse>
            <p>
              Schmerz kann Verhalten erklären, macht Einschüchterung, Gewalt
              oder andere Übergriffe aber nicht in Ordnung. Wer Schutz braucht,
              muss nicht zuerst alle Motive des Gegenübers verstehen.
            </p>
            <p>
              Kinder tragen keine partnerschaftliche Verantwortung für die
              emotionale Stabilität eines Elternteils. Für sie gelten andere
              Rollen und besondere Schutzbedürfnisse.
            </p>
            <p>
              Behandlung kann Veränderung unterstützen. Angehörige dürfen
              beitragen, sind aber weder Therapeut:innen noch allein für den
              Verlauf oder die Beziehung verantwortlich. Die Beziehung wird
              nicht durch eine «perfekte» Reaktion der Angehörigen repariert.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        {/* ── Quellen ── */}
        <EditorialSectionBlock
          label="Fachliche Grundlage"
          title="Grundlage und Grenzen der Aussagen"
        >
          <EditorialProse>
            <p>
              Die Seite verbindet Leitlinien, Übersichtsarbeiten und klinische
              Erklärungsmodelle. Gruppenbefunde erklären keine bestimmte Person
              und lassen sich nicht automatisch auf ein konkretes Paar oder auf
              Beziehungen zu Eltern, Kindern, Geschwistern oder Freund:innen
              übertragen.
            </p>
          </EditorialProse>
          <ul className="mt-4 ml-5 list-disc space-y-1">
            {beziehungsQuellen.map(quelle => (
              <li key={quelle} style={{ fontSize: "var(--text-sm)" }}>
                {quelle}
              </li>
            ))}
          </ul>
        </EditorialSectionBlock>

        <RelatedLinksEditorial
          links={[
            {
              href: "/kommunizieren",
              title: "Gespräche gestalten",
              description:
                "Erleben anerkennen, Deutungen prüfen und bei hoher Anspannung kürzer werden.",
            },
            {
              href: "/unterstuetzen/uebersicht",
              title: "Unterstützung klären",
              description:
                "Zugewandtheit, Rolle und Begrenztheit der eigenen Unterstützung einordnen.",
            },
            {
              href: "/grenzen",
              title: "Grenzen und Schutz",
              description:
                "Eigene Grenzen erkennen, konkret formulieren und verlässlich halten.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
