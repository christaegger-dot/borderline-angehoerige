import {
  EditorialLayout,
  EditorialProse,
  EditorialSection,
} from "@/components/editorial";
import KommunikationsUebung from "@/components/interactive/KommunikationsUebung";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function Uebungsszenarien() {
  return (
    <Layout>
      <SEO
        title="Kommunikations-Übungen"
        description="Üben Sie SET, DEAR MAN und Validierung anhand realistischer Szenarien – interaktiv, mit Feedback und Erklärungen."
        path="/uebungen"
      />

      <EditorialLayout width="wide">
        <header className="pb-12 pt-12 md:pb-16 md:pt-16">
          <Link
            href="/kommunizieren"
            className="editorial-link text-sm"
            style={{ color: "var(--fg-secondary)" }}
          >
            ← Zur Kommunikations-Seite
          </Link>

          <p
            className="mt-8 text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Interaktive Übungen
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
            Kommunikation <em>üben</em>
          </h1>

          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Realistische Situationen, verschiedene Antwortmöglichkeiten und
            sofortiges Feedback. Probieren Sie aus, wie SET, DEAR MAN und
            Validierung in der Praxis klingen.
          </p>

          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-tertiary)",
            }}
          >
            Es gibt kein starres «richtig» im echten Leben, aber oft
            hilfreichere und weniger hilfreiche Reaktionen. Diese Übungen zeigen
            bewährte Muster, die Sie für Ihre eigene Situation anpassen können.
          </p>
        </header>

        <EditorialSection label="Praxis" title="Interaktive Szenarien">
          <KommunikationsUebung />
        </EditorialSection>

        <EditorialSection label="Vertiefen" title="Theorie nachlesen" rule>
          <EditorialProse>
            <p>
              Wenn Sie die Muster hinter den Übungen vertiefen möchten, finden
              Sie hier die passenden Seiten.
            </p>
          </EditorialProse>
        </EditorialSection>

        <RelatedLinksEditorial
          links={[
            {
              href: "/kommunizieren",
              title: "Kommunizieren",
              description: "SET, Validierung, Timing und Deeskalation.",
            },
            {
              href: "/grenzen",
              title: "Grenzen setzen",
              description: "Klare Grenzen formulieren und halten.",
            },
            {
              href: "/wegweiser",
              title: "Situations-Wegweiser",
              description: "Orientierung für konkrete Belastungssituationen.",
            },
            {
              href: "/unterstuetzen/krise",
              title: "Krisenbegleitung",
              description: "Ampel-System, Deeskalation und Akutlogik.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
