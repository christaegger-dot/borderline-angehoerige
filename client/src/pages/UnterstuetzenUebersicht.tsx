import { useCallback } from "react";
import ContentSection from "@/components/ContentSection";
import {
  EditorialProse,
  EditorialPullQuote,
  EditorialSection,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import UnterstuetzenSubNav from "@/components/UnterstuetzenSubNav";
import { TableOfContents } from "@/components/UXEnhancements";
import { getHandoutOpenHref } from "@/content/handouts";
import { getHandoutTextVersionHrefBySource } from "@/content/handoutTextVersions";
import { unterstuetzenItems } from "@/content/unterstuetzen";
import { Link } from "wouter";

/** Öffnet eine ContentSection via Custom Event und scrollt dorthin. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

export default function UnterstuetzenUebersicht() {
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
        title="Unterstützen – Übersicht"
        description="Wie Angehörige hilfreich bleiben können: Rolle, Krisenlogik, Grenzen und tragfähige Unterstützung."
        path="/unterstuetzen/uebersicht"
      />
      <MedicalPageSchema
        title="Unterstützen – Übersicht"
        description="Wie Angehörige hilfreich bleiben können: Rolle, Krisenlogik, Grenzen und tragfähige Unterstützung."
        path="/unterstuetzen/uebersicht"
      />
      <TableOfContents />

      <UnterstuetzenSubNav />

      {/* ── 1 Hero ── EditorialSection ohne Aside (Sub-Page-Identität) */}
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
            Rolle und Haltung
          </span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
              marginBottom: "var(--space-5)",
            }}
          >
            Übersicht
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: "var(--text-hero)",
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
              marginBottom: "var(--space-5)",
            }}
          >
            Wie Angehörige <em>hilfreich</em> bleiben können
          </h1>
          <p
            className="max-w-[40em]"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Angehörige möchten oft gleichzeitig beruhigen, schützen, verstehen,
            Grenzen wahren und die Beziehung nicht verlieren. Genau diese
            Gleichzeitigkeit macht die Rolle so anspruchsvoll. Diese Seite hilft
            Ihnen, Unterstützung realistischer und tragfähiger zu denken.
          </p>
          <div
            className="mt-8 border-t pt-3"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <p
              className="text-xs uppercase"
              style={{
                color: "var(--accent-label)",
                letterSpacing: "var(--tracking-caps)",
                fontWeight: 500,
              }}
            >
              Vollständig ca. 8 Min · Auch abschnittweise lesbar
            </p>
          </div>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 2 Intro: Was auf dieser Seite besonders trägt ── */}
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
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
              marginBottom: "var(--space-4)",
            }}
          >
            Überblick
          </p>
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
            Was auf dieser Seite besonders trägt
          </h2>
          <EditorialProse>
            <p>
              Diese Seite klärt, was Angehörige tatsächlich beitragen können —
              und wo Unterstützung an realistische Grenzen kommt. Im Zentrum
              stehen die Rolle, die Ambivalenz beim Helfen, die Familiendynamik
              und Hinweise, woran tragfähige Unterstützung erkennbar wird.
            </p>
            <p>
              Sie können auch direkt zu{" "}
              <a
                href="#unterstuetzung-ist-begrenzt"
                className="editorial-link"
                onClick={e =>
                  handleAnchorClick(e, "unterstuetzung-ist-begrenzt")
                }
              >
                Begrenztheit der Unterstützung
              </a>
              ,{" "}
              <a
                href="#rolle"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "rolle")}
              >
                Rolle klären
              </a>
              ,{" "}
              <a
                href="#ambivalenz"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "ambivalenz")}
              >
                Ambivalenz
              </a>{" "}
              oder{" "}
              <a
                href="#familiendynamik"
                className="editorial-link"
                onClick={e => handleAnchorClick(e, "familiendynamik")}
              >
                Familiendynamik
              </a>{" "}
              springen.
            </p>
          </EditorialProse>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 3 Group A: Rolle und Möglichkeit ── unterstuetzung-ist-begrenzt + rolle */}
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
            Rolle und Möglichkeit
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
            title="Unterstützung ist wichtig, aber nicht allmächtig"
            id="unterstuetzung-ist-begrenzt"
            defaultOpen={true}
            preview="Sie können viel beitragen. Sie können aber weder Krisen vollständig verhindern noch Entwicklung für einen anderen Menschen herstellen."
          >
            <EditorialProse>
              <p>
                Angehörige können in belasteten Beziehungen eine wichtige Rolle
                spielen. Sie können beruhigen, orientieren, Struktur geben,
                emotionale Anerkennung vermitteln und mithelfen, dass
                Situationen weniger zerstörerisch verlaufen.
              </p>
              <p>
                Gleichzeitig ist Unterstützung nie allmächtig. Sie können nicht
                jede Krise verhindern, keine Entwicklung erzwingen und nicht
                dauerhaft die innere Regulation eines anderen Menschen
                übernehmen. Gerade diese Grenze ist oft schwer auszuhalten.
              </p>
            </EditorialProse>
            <div className="mt-4">
              <EditorialPullQuote>
                Hilfreiche Unterstützung ist deshalb nicht totale Verfügbarkeit,
                sondern eine Form von tragfähiger Beziehung: zugewandt, klar,
                begrenzt und längerfristig durchhaltbar.
              </EditorialPullQuote>
            </div>
          </ContentSection>

          <ContentSection
            variant="editorial"
            title="Die Angehörigenrolle realistisch klären"
            id="rolle"
            preview="Hilfreich ist oft eine Rolle, die gleichzeitig zugewandt, klar und begrenzt bleibt."
          >
            <div className="mt-2 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 style={h4Style}>Was Sie sein können</h4>
                <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                  <li>eine verlässliche Bezugsperson</li>
                  <li>jemand, der Gefühle ernst nimmt</li>
                  <li>ein Mensch, der Orientierung gibt</li>
                  <li>ein Gegenüber mit realistischer Hoffnung</li>
                  <li>jemand, der Grenzen klar benennt und hält</li>
                </ul>
              </div>
              <div>
                <h4 style={h4Style}>Was nicht Ihre Aufgabe ist</h4>
                <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                  <li>Therapeut oder Therapeutin zu sein</li>
                  <li>jeden Spannungszustand aufzufangen</li>
                  <li>alles Schwierige stellvertretend zu regulieren</li>
                  <li>Verhalten permanent zu kontrollieren</li>
                  <li>für den Verlauf der Genesung verantwortlich zu sein</li>
                </ul>
              </div>
            </div>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 4 Group B: Was es schwer macht ── ambivalenz */}
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
            Was es schwer macht
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
            title="Was Unterstützung so schwierig macht"
            id="ambivalenz"
            preview="Unterstützung scheitert nicht nur an fehlendem Wissen, sondern oft an Erschöpfung, Angst, Wut, Schuld und widersprüchlichen Erwartungen."
          >
            <EditorialProse>
              <p>
                Viele Angehörige erleben nicht nur die Belastung der betroffenen
                Person, sondern auch die eigene Ambivalenz: helfen wollen und
                gleichzeitig wegwollen, verstehen wollen und gleichzeitig
                innerlich hart werden, Grenzen setzen wollen und dann aus Schuld
                doch wieder nachgeben.
              </p>
              <p>Typische Muster sind unter anderem:</p>
              <ul className="ml-6 list-disc space-y-1">
                <li>
                  aus Angst deeskalieren und dadurch problematische Muster
                  stabilisieren
                </li>
                <li>aus Schuld zu viel übernehmen</li>
                <li>aus Erschöpfung kalt oder kurz angebunden werden</li>
                <li>
                  zwischen Mitgefühl, Wut, Loyalität und Rückzug schwanken
                </li>
              </ul>
            </EditorialProse>
            <div className="mt-4">
              <EditorialPullQuote>
                Diese Ambivalenz ist kein Zeichen fehlender Haltung. Sie ist oft
                Ausdruck einer langandauernden Belastung, in der Beziehung,
                Verantwortung und Selbstschutz gleichzeitig Platz brauchen.
              </EditorialPullQuote>
            </div>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 5 Dispatch: Was möchten Sie vertiefen? ── */}
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
            Vertiefung
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
              marginBottom: "var(--space-4)",
            }}
          >
            Vertiefen
          </p>
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
            Was möchten Sie vertiefen?
          </h2>
          <ul className="space-y-6">
            <li>
              <h3 style={h4Style}>
                <Link href="/unterstuetzen/alltag" className="editorial-link">
                  Im Alltag unterstützen
                </Link>
              </h3>
              <p className="mt-1" style={bodyStyle}>
                Verlässlichkeit, Klarheit, Konflikt-Repair und kleine stabile
                Kontaktangebote.
              </p>
            </li>
            <li>
              <h3 style={h4Style}>
                <Link href="/unterstuetzen/krise" className="editorial-link">
                  Krisen begleiten
                </Link>
              </h3>
              <p className="mt-1" style={bodyStyle}>
                Ampel-System, Deeskalation, Was sagen / Was vermeiden, Nach der
                Krise.
              </p>
            </li>
            <li>
              <h3 style={h4Style}>
                <Link href="/unterstuetzen/therapie" className="editorial-link">
                  Therapie unterstützen
                </Link>
              </h3>
              <p className="mt-1" style={bodyStyle}>
                Wie Sie den therapeutischen Prozess sinnvoll begleiten — ohne zu
                übernehmen.
              </p>
            </li>
          </ul>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 6 Group C: Woran es tragfähig wird ── familiendynamik + woran-erkennbar + grenzen-der-unterstuetzung
           Plus Grenzen-Übergangs-Block als typografisch markierter Intro
           (kursiv, Hairline-Trenner darüber) — Christa-Decision Variante d */}
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
            Woran es tragfähig wird
          </span>
          <div
            aria-hidden="true"
            className="mt-3 border-t"
            style={{ borderColor: "var(--rule-color)" }}
          />
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          {/* Grenzen-Übergang als typografisch markierter Intro-Absatz vor Group-C-Inhalten */}
          <div
            className="mb-10 border-t pt-5"
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
              Ohne Grenzen wird Unterstützung oft unklar, erschöpfend oder
              inkonsistent.{" "}
              <Link href="/grenzen" className="editorial-link">
                Wie Sie klare Grenzen setzen und halten
              </Link>
              .
            </p>
          </div>

          <ContentSection
            variant="editorial"
            title="Wenn mehrere Angehörige beteiligt sind"
            id="familiendynamik"
            preview="Unterschiedliche Haltungen in Familien sind normal. Problematisch wird es, wenn sie verdeckt gegeneinander arbeiten."
          >
            <EditorialProse>
              <p>
                Wenn mehrere Angehörige beteiligt sind, entstehen oft
                Spannungen: Eine Person grenzt ab, eine andere rettet, eine
                dritte will Ruhe um jeden Preis. Solche Unterschiede sind
                normal. Schwierig wird es, wenn Betroffene und Angehörige in
                widersprüchliche Bündnisse geraten.
              </p>
            </EditorialProse>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 style={h4Style}>Hilfreich</h4>
                <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                  <li>gemeinsame Grundlinien klären</li>
                  <li>Absprachen ausserhalb akuter Krisen treffen</li>
                  <li>einander nicht unterlaufen</li>
                  <li>Unterschiede offen besprechen</li>
                </ul>
              </div>
              <div>
                <h4 style={h4Style}>Belastend</h4>
                <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                  <li>widersprüchliche Botschaften</li>
                  <li>heimliche Sonderabsprachen</li>
                  <li>guter Cop, böser Cop</li>
                  <li>sich gegeneinander ausspielen lassen</li>
                </ul>
              </div>
            </div>
          </ContentSection>

          <ContentSection
            variant="editorial"
            title="Woran hilfreiche Unterstützung erkennbar ist"
            id="woran-erkennbar"
            preview="Hilfreiche Unterstützung macht nicht alles ruhig. Sie macht Beziehungen eher klarer, berechenbarer und weniger zerstörerisch."
          >
            <EditorialProse>
              <p>
                Hilfreiche Unterstützung zeigt sich nicht daran, dass alles
                ruhig wird, sondern an Veränderungen wie diesen:
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>weniger hektisches Reagieren auf jede Krise</li>
                <li>mehr Benennbarkeit von Belastung und Grenzen</li>
                <li>mehr Berechenbarkeit in Beziehungen</li>
                <li>weniger Schuld und Gegenschuld</li>
                <li>mehr Bereitschaft, Hilfe von aussen einzubeziehen</li>
                <li>mehr Selbstschutz ohne vollständigen Beziehungsabbruch</li>
              </ul>
            </EditorialProse>
          </ContentSection>

          <ContentSection
            variant="editorial"
            title="Wann Unterstützung an Grenzen kommt"
            id="grenzen-der-unterstuetzung"
            preview="Es gibt Situationen, in denen Angehörige nicht weiter stabilisieren können und andere Hilfe oder mehr Distanz nötig wird."
          >
            <EditorialProse>
              <p>
                Es gibt Konstellationen, in denen Angehörige nicht mehr nur
                unterstützen, sondern vor allem schützen müssen: bei eigener
                Erschöpfung, bei Gewalt oder massiver Grenzverletzung, wenn
                Kinder mitbetroffen sind oder wenn sich das ganze Leben nur noch
                um Krisen dreht.
              </p>
              <p>
                Spätestens dann braucht es zusätzliche Hilfe, klarere Grenzen
                oder auch mehr Distanz. Das ist kein Versagen, sondern oft
                Ausdruck verantwortlichen Handelns.
              </p>
            </EditorialProse>
          </ContentSection>
        </EditorialSection.Body>
      </EditorialSection>

      {/* ── 7 Materialien ── EditorialSection cream + full-width tile section */}
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
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
              marginBottom: "var(--space-4)",
            }}
          >
            Materialien
          </p>
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
            Materialien zum Thema
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
        aria-label="Materialien zum Thema — Tile-Liste"
      >
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {unterstuetzenItems.map(item => {
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

      {/* ── 8 Pull-Quote (dominant, eigene Sektion) ── */}
      <EditorialSection variant="cream">
        <EditorialSection.Body>
          <EditorialPullQuote>
            Unterstützen heisst nicht, sich selbst aufzugeben. Sie können nur
            dann tragfähig unterstützen, wenn Ihr eigenes Fundament geschützt
            bleibt.
          </EditorialPullQuote>
        </EditorialSection.Body>
      </EditorialSection>

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
              Im Alltag wird aus dieser Haltung konkret, was Verlässlichkeit,
              Konflikt-Repair und kleine Kontaktangebote in der Praxis bedeuten
              —{" "}
              <Link href="/unterstuetzen/alltag" className="editorial-link">
                weiter: Im Alltag unterstützen
              </Link>
              . Zurück geht es zu{" "}
              <Link href="/verstehen" className="editorial-link">
                Verstehen
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
                href: "/grenzen",
                title: "Grenzen",
                description:
                  "Wie Sie klare Grenzen setzen und halten — als Schutzraum für tragfähige Unterstützung.",
              },
              {
                href: "/selbstfuersorge",
                title: "Selbstfürsorge",
                description:
                  "Eigene Belastung ernst nehmen, Warnsignale erkennen und Regeneration ermöglichen.",
              },
              {
                href: "/materialien",
                title: "Materialien & Handouts",
                description:
                  "Spickzettel und Infografiken zur Unterstützung – als PDF und Textversion.",
              },
            ]}
          />
        </EditorialSection.Body>
      </EditorialSection>
    </Layout>
  );
}
