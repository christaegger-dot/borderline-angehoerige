/**
 * Editorial-Primitive Showcase
 *
 * Visuelle Test-Route für die fünf Editorial-Primitive aus Phase 2.
 * Wird in Phase 7 wieder entfernt — nicht in der Sitemap, nicht von der
 * Navigation verlinkt. Direktaufruf via /editorial-test.
 */
import {
  EditorialFootnotes,
  EditorialLayout,
  EditorialProse,
  EditorialPullQuote,
  EditorialSection,
} from "@/components/editorial";

export default function EditorialTest() {
  return (
    <EditorialLayout width="narrow">
      <header>
        <p
          className="text-xs uppercase"
          style={{
            color: "var(--accent-label)",
            letterSpacing: "var(--tracking-caps)",
            fontWeight: 500,
          }}
        >
          Test-Route — wird in Phase 7 entfernt
        </p>
        <h1
          className="mt-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-3xl)",
            lineHeight: "var(--lh-tight)",
            color: "var(--fg-primary)",
            fontWeight: "var(--weight-display)",
            letterSpacing: "var(--tracking-tight)",
          }}
        >
          Editorial-Primitive · Visual Showcase
        </h1>
        <p
          className="mt-5"
          style={{
            fontSize: "var(--text-lg)",
            lineHeight: "var(--lh-snug)",
            color: "var(--fg-secondary)",
          }}
        >
          Diese Seite rendert alle fünf Phase-2-Primitive mit demselben
          Layout-Wrapper. Sie dient als Referenz beim Aufbau der Home-Seite in
          Phase 3 und bei der Tier-1-Migration in Phase 4.
        </p>
      </header>

      <EditorialSection
        label="Anerkennung"
        title="Eine Sektion mit Label, Titel und Body"
      >
        <EditorialProse>
          <p>
            Dies ist gewöhnlicher Fliesstext mit einem{" "}
            <a href="/verstehen">Inline-Link</a> in Aubergine. Hier folgt ein
            Teil mit <em>kursiver Hervorhebung</em>, sowie ein{" "}
            <strong>Strong-Element</strong>, das laut Brief NICHT bold, sondern
            in Aubergine bei normalem Weight gesetzt ist — eine subtile
            editoriale Disziplin.
          </p>
          <p>
            Zweiter Absatz, getrennt durch konsistenten Vertikalrhythmus (
            <code>&gt; * + *</code> mit <code>1.25rem</code> Abstand). Der
            Lesemass-Container hält die Zeilenlänge im 38rem-Bereich (≈ 60–65
            Zeichen).
          </p>
        </EditorialProse>
      </EditorialSection>

      <EditorialSection
        label="Grundgedanke"
        title="Sektion mit Drop-Cap als Magazin-Detail"
      >
        <EditorialProse dropCap>
          <p>
            Drop-Cap-Demonstration. Der erste Buchstabe dieses Absatzes wird
            gross gesetzt, in Source Serif Display, in Aubergine, mit float left
            und etwas Padding. Nur der erste Absatz erhält die Behandlung — das
            ist eine bewusste Editorial-Geste, die ihren Effekt verliert, wenn
            sie zu oft auftritt. Auf sehr schmalen Mobile-Viewports (unter 380
            px) wird die Schriftgrösse auf 3.5rem reduziert, damit das Layout
            nicht bricht.
          </p>
          <p>
            Zweiter Absatz ohne Drop-Cap — läuft in normaler Typografie weiter.
          </p>
        </EditorialProse>
      </EditorialSection>

      <EditorialSection label="Aus der Beratungspraxis" rule>
        <EditorialPullQuote cite="Eine redaktionell verdichtete Erfahrung. Keine Einzelperson.">
          «Pull-Quote in italic Display-Serif, mit linkem Akzent-Border in
          rule-color-strong. Caption darunter in fg-tertiary, in kleinerer
          Sans-Schrift. Die obere Hairline dieser Sektion wurde via
          <code> rule</code>-Prop gesetzt.»
        </EditorialPullQuote>
      </EditorialSection>

      <EditorialSection label="Quellen" title="Fussnoten am Sektionsende">
        <EditorialProse>
          <p>
            Hauptinhalt mit Verweis auf die erste Fussnote¹ und eine zweite
            Fussnote². Die Fussnoten erscheinen unten als geordnete Liste, durch
            eine Hairline vom Inhalt getrennt — typografisch sauberes
            Editorial-Pattern, das eingebettete Quellenboxen ersetzt.
          </p>
        </EditorialProse>
        <EditorialFootnotes
          notes={[
            {
              id: "1",
              content: (
                <>
                  Beispiel-Quelle mit{" "}
                  <a href="#" className="editorial-link">
                    externem Inline-Link
                  </a>{" "}
                  in der Footnote.
                </>
              ),
            },
            {
              id: "2",
              content: (
                <>
                  Zweite Quelle, kompakter formuliert; demonstriert
                  Mehrzeiligkeit nur wenn nötig.
                </>
              ),
            },
          ]}
        />
      </EditorialSection>

      <EditorialSection
        label="Width-Modus"
        title='EditorialLayout mit width="wide" (46rem)'
      >
        <EditorialProse>
          <p>
            Diese Test-Route nutzt <code>width=&quot;narrow&quot;</code> (38rem)
            für maximalen Lesefluss. Der wide-Modus (46rem) ist für
            Hero-Sektionen und etwas breitere Listen gedacht und wird in Phase 3
            auf der neuen Home-Seite zum Einsatz kommen.
          </p>
        </EditorialProse>
      </EditorialSection>
    </EditorialLayout>
  );
}
