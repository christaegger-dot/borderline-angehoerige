import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import KommunikationsUebung from "@/components/interactive/KommunikationsUebung";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import ReviewBadge from "@/components/ReviewBadge";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function Uebungsszenarien() {
  return (
    <Layout>
      <SEO
        title="Kommunikations-Übungen"
        description="Vergleichen Sie mögliche Reaktionen in erfundenen Gesprächssituationen: Voraussetzungen, Grenzen und Perspektiven zu Zugewandtheit, DEAR und Validierung."
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

          <EyebrowLabel className="mt-8" spacing="compact">
            Interaktive Übungen
          </EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Kommunikation üben
          </DisplayHeading>

          <Lede className="mt-6">
            Erfundene Alltagssituationen und verschiedene Sprecherpositionen:
            Vergleichen Sie, wie Zugewandtheit, klare Grenzen, die vier
            DEAR-Schritte und Validierung klingen können und wann eine Reaktion
            passen könnte.
          </Lede>

          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-tertiary)",
            }}
          >
            Wählen Sie eine Reaktion, um mögliche Wirkungen, Voraussetzungen,
            eigene Grenzen und die andere Perspektive zu lesen. Sie können
            jederzeit eine andere Reaktion vergleichen. Die Beispiele sind
            kontextabhängig und werden nicht als richtige oder falsche Antworten
            bewertet.
          </p>
          <ReviewBadge path="/uebungen" className="mt-4" />
        </header>

        <EditorialSectionBlock label="Praxis" title="Interaktive Szenarien">
          <KommunikationsUebung />
        </EditorialSectionBlock>

        <EditorialSectionBlock label="Vertiefen" title="Theorie nachlesen" rule>
          <EditorialProse>
            <p>
              Wenn Sie die Muster hinter den Übungen vertiefen möchten, finden
              Sie hier die passenden Seiten.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        <RelatedLinksEditorial
          links={[
            {
              href: "/kommunizieren",
              title: "Kommunizieren",
              description:
                "Offene Fragen, Validierung, Timing und klare Grenzen.",
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
              description: "Deeskalation, Sicherheit und passende Akutwege.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
