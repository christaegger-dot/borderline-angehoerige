import { Link } from "wouter";
import ContentSection from "@/components/ContentSection";
import { EditorialProse, EditorialPullQuote } from "@/components/editorial";
import {
  diagnosticOverviewItems,
  meaningForRelativesCards,
  relationshipPatterns,
} from "@/content/verstehen";
import { quellenLinks } from "@/content/quellenLinks";
import EvidenceNote from "@/components/EvidenceNote";

export function VerstehenRelationshipSection() {
  const titleStyle = {
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
    <ContentSection
      variant="editorial"
      title="Warum gerade nahe Beziehungen so schnell kippen können"
      id="beziehungsdynamik"
      preview="Was für Aussenstehende klein wirkt, kann in engen Beziehungen als Zurückweisung, Kontrollverlust oder drohender Verlust erlebt werden."
    >
      <EditorialProse>
        <p>
          Viele Menschen mit Borderline haben ihre grössten Schwierigkeiten
          nicht in oberflächlichen Kontakten, sondern in engen Beziehungen.
          Gerade dort, wo viel Bindung, Hoffnung und Verletzbarkeit im Spiel
          sind, werden Unsicherheit, Unklarheit oder Distanz besonders
          schmerzhaft erlebt.
        </p>
      </EditorialProse>
      <ul className="mt-6 space-y-6">
        {relationshipPatterns.map(item => (
          <li key={item.title}>
            <h3 style={titleStyle}>{item.title}</h3>
            <p className="mt-1" style={bodyStyle}>
              {item.text}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <EditorialPullQuote>
          Gerade deshalb erleben Angehörige oft etwas Paradoxes: Je wichtiger
          sie der betroffenen Person sind, desto stärker können Konflikte,
          Vorwürfe oder Grenztests ausfallen.
        </EditorialPullQuote>
      </div>
      <EvidenceNote
        title="Quellen zu Beziehungsmustern und Validierung"
        definition="Die beschriebenen Muster sind klinisch gut belegt, treten aber individuell unterschiedlich stark auf und erklären Verhalten nicht vollständig."
        reviewDate="24.03.2026"
        sources={[
          {
            label: "Fruzzetti (2006) zur DBT-informierten Angehörigenarbeit",
            href: quellenLinks.fruzzetti2006,
            type: "wissenschaft",
          },
          {
            label: "Hoffman et al. (2005) zu Family Connections",
            href: quellenLinks.hoffman2005,
            type: "wissenschaft",
          },
          {
            label:
              "Gunderson, Berkowitz & Ruiz-Sancho (1997) zur psychoedukativen Familienarbeit",
            href: quellenLinks.gunderson1997,
            type: "wissenschaft",
          },
        ]}
        className="mt-4"
      />
    </ContentSection>
  );
}

export function VerstehenMeaningSection() {
  const titleStyle = {
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
    <ContentSection
      variant="editorial"
      title="Was das für Angehörige bedeutet"
      id="bedeutung-fuer-angehoerige"
      preview="Wenn Sie diese Dynamiken kennen, können Sie manches klarer einordnen. Das schützt nicht vor Schmerz, hilft aber oft gegen vorschnelle Selbstanklage."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {meaningForRelativesCards.map(item => (
          <article key={item.text}>
            <h3 style={titleStyle}>{item.text}</h3>
            <p className="mt-1" style={bodyStyle}>
              {item.sub}
            </p>
          </article>
        ))}
      </div>
    </ContentSection>
  );
}

export function VerstehenDiagnosticSection() {
  const titleStyle = {
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
    <ContentSection
      variant="editorial"
      title="Diagnostischer Überblick"
      id="diagnostischer-ueberblick"
      preview="Die diagnostische Perspektive kann hilfreich sein, sollte aber die Beziehungsperspektive nicht dominieren."
    >
      <EditorialProse>
        <p>
          Für eine Diagnose müssen Fachpersonen mehrere Merkmale über längere
          Zeit und in verschiedenen Lebensbereichen beurteilen. Entscheidend ist
          nicht ein einzelnes Verhalten, sondern das Gesamtbild.
        </p>
      </EditorialProse>

      <ul className="mt-5 space-y-2 pl-5 list-disc marker:text-[color:var(--accent-label)]">
        {diagnosticOverviewItems.map(item => (
          <li key={item} style={bodyStyle}>
            {item}
          </li>
        ))}
      </ul>

      <div
        className="mt-6 border-t pt-5"
        style={{ borderColor: "var(--rule-color)" }}
      >
        <h3 style={titleStyle}>Ursachen sind nie monokausal</h3>
        <p className="mt-2" style={bodyStyle}>
          Borderline entsteht nicht durch eine einzige Ursache, sondern im
          Zusammenspiel biologischer Empfindlichkeit, Bindungs- und
          Entwicklungserfahrungen sowie Belastungsfaktoren. Schuldzuweisungen an
          Betroffene oder Angehörige greifen zu kurz und helfen niemandem.
        </p>
      </div>

      <p className="mt-6" style={bodyStyle}>
        Mehr zum Diagnostik-Prozess (wer stellt wie eine Diagnose, was sie für
        Angehörige bedeutet, wo sie im Kanton Zürich gestellt werden kann):{" "}
        <Link href="/diagnostik" className="editorial-link">
          Diagnostik
        </Link>
        .
      </p>
    </ContentSection>
  );
}
