/**
 * SelbsttestPage — Editorial-Redesign Phase 5 (Page 8/9, Tier 2).
 *
 * Brief: docs/redesign/phase-5-tier2-master-brief.md, Abschnitt
 * «Page 8 — Selbsttest».
 *
 * Identitätsentscheidung (D, getroffen vor Migration):
 *   Bezeichnung «Selbsttest» bleibt überall (Navigation, Home-
 *   Verlinkung, SEO-Title, URL `/selbsttest`). Auf der Page selbst
 *   wird der H1 von «Finden Sie Ihren Weg» zu
 *   «Selbsttest: Wo soll ich anfangen?» angepasst, sodass der
 *   Routing-Charakter im H1 selbst klar wird.
 *   Begründung: Suchwort-Vertrauen erhalten ohne Inhalts-Neuprojekt.
 *
 * Page-Wrapper editorial. Eigentlicher `Selbsttest`-Component
 * (Form mit Routing-Logik) ebenfalls editorialisiert — siehe
 * components/Selbsttest.tsx.
 */
import {
  EditorialLayout,
  EditorialProse,
  EditorialSection,
} from "@/components/editorial";
import AppLink from "@/components/AppLink";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Selbsttest from "@/components/Selbsttest";

export default function SelbsttestPage() {
  return (
    <Layout>
      <SEO
        title="Selbsttest"
        description="Selbsttest für Angehörige: Wie stark sind Sie gerade belastet? Anonyme Einschätzung in wenigen Minuten – mit Hinweisen auf passende Hilfsangebote."
        path="/selbsttest"
      />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-12 pt-16 md:pb-16 md:pt-24">
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Selbsttest
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
            Selbsttest: <em>Wo soll ich anfangen?</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Dieser kurze Test hilft Ihnen, die für Ihre aktuelle Situation
            passenden Inhalte zu finden. Er dauert nur etwa 2 Minuten.
          </p>
        </header>

        {/* ── Hairline-Trenner Editorial-Hero → funktionales Tool ── */}
        <hr
          className="border-0 border-t"
          style={{ borderColor: "var(--rule-color)" }}
        />

        {/* ── Form-Tool ── */}
        <div className="mt-12 md:mt-16">
          <Selbsttest />
        </div>

        {/* ── Hinweis ── */}
        <EditorialSection rule>
          <EditorialProse>
            <p>
              Dieser Test ersetzt keine professionelle Beratung. Er dient
              lediglich als Orientierungshilfe, um Ihnen den Einstieg in unsere
              Inhalte zu erleichtern. Bei akuten Krisen wenden Sie sich bitte an
              die{" "}
              <AppLink href="/soforthilfe" className="editorial-link">
                Notfallressourcen
              </AppLink>
              .
            </p>
          </EditorialProse>
        </EditorialSection>
      </EditorialLayout>
    </Layout>
  );
}
