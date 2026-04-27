/**
 * Materialien — Editorial-Redesign Phase 5 (Page 6/9, Tier 2 — Abschluss
 * Gruppe A).
 *
 * Brief: docs/redesign/phase-5-tier2-master-brief.md, Abschnitt
 * «Page 6 — Materialien».
 *
 * Heftigster Fall der Tier-2-Welle (Phase-0-Inventur: 29 distinct
 * Background-Farben in MaterialienLibrarySection). Diese Page ist
 * editorialisiert in zwei Dateien:
 *   - Materialien.tsx (diese Datei): Editorial-Hero + Layout-Wrapper
 *   - MaterialienLibrarySection.tsx: Filter-Leiste + Item-Grid
 */
import {
  EditorialLayout,
  EditorialProse,
  EditorialSection,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import MaterialienLibrarySection from "@/sections/MaterialienLibrarySection";

export default function Materialien() {
  return (
    <Layout>
      <SEO
        title="Materialien"
        description="Ausgewählte Materialien, Infografiken und Notfallhilfen für Angehörige von Menschen mit Borderline."
        path="/materialien"
      />

      <EditorialLayout width="wide">
        {/* ── Hero ── */}
        <header className="pb-16 pt-16 md:pb-24 md:pt-24">
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Materialien
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
            Materialien für <em>Angehörige</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Hier finden Sie ausgewählte Handouts, Infografiken und
            Orientierungshilfen für belastende, unklare oder akute Situationen.
            Die Sammlung ist bewusst kuratiert: lieber wenige, wirklich
            hilfreiche Ressourcen als ein unübersichtliches Archiv.
          </p>
        </header>

        {/* ── Hinweis (vorher Sand-Card mit Eye-Icon) ── */}
        <EditorialSection rule>
          <EditorialProse>
            <p>
              Vorschau = Web-Bild. Wenn verfügbar, führt «Textversion lesen» zur
              lesbaren Web-Version. «PDF öffnen» öffnet die Druckversion im
              neuen Tab. Die Notfallkarte öffnet als HTML-Seite.
            </p>
          </EditorialProse>
        </EditorialSection>

        <MaterialienLibrarySection />
      </EditorialLayout>
    </Layout>
  );
}
