import { Link } from "wouter";
import ContentSection from "@/components/ContentSection";
import {
  EditorialCallout,
  EditorialProse,
  EditorialPullQuote,
} from "@/components/editorial";
import {
  diagnosticOverviewItems,
  meaningForRelativesCards,
  relationshipPatterns,
} from "@/content/verstehen";
import { quellenLinks } from "@/content/quellenLinks";
import EvidenceNote from "@/components/EvidenceNote";

export function VerstehenRelationshipSection() {
  return (
    <ContentSection
      variant="editorial"
      collapsible={false}
      title="Warum gerade nahe Beziehungen so schnell kippen können"
      id="beziehungsdynamik"
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
            <h3 className="editorial-item-heading">{item.title}</h3>
            <p className="editorial-small-copy mt-1">{item.text}</p>
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
        variant="editorial"
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
  return (
    <ContentSection
      variant="editorial"
      collapsible={false}
      title="Was das für Angehörige bedeutet"
      id="bedeutung-fuer-angehoerige"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {meaningForRelativesCards.map(item => (
          <article key={item.text}>
            <h3 className="editorial-item-heading">{item.text}</h3>
            <p className="editorial-small-copy mt-1">{item.sub}</p>
          </article>
        ))}
      </div>

      <EditorialCallout
        variant="entlastung"
        title="Ursachen sind nie monokausal"
        className="mt-8"
      >
        Borderline entsteht nicht durch eine einzige Ursache, sondern im
        Zusammenspiel biologischer Empfindlichkeit, Bindungs- und
        Entwicklungserfahrungen sowie Belastungsfaktoren. Schuldzuweisungen an
        Betroffene oder Angehörige greifen zu kurz und helfen niemandem.
      </EditorialCallout>
    </ContentSection>
  );
}

export function VerstehenDiagnosticSection() {
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
          <li key={item} className="editorial-small-copy">
            {item}
          </li>
        ))}
      </ul>

      <p className="editorial-small-copy mt-6">
        Mehr zum Diagnostik-Prozess (wer stellt wie eine Diagnose, was sie für
        Angehörige bedeutet, wo sie im Kanton Zürich gestellt werden kann):{" "}
        <Link href="/verstehen/diagnostik" className="editorial-link">
          Diagnostik
        </Link>
        .
      </p>
    </ContentSection>
  );
}

export function VerstehenBegleitOverviewSection() {
  const komorbiditaeten = [
    "Depression (häufigste Komorbidität, ca. 75–80 %)",
    "Angststörungen (Panik, soziale Phobie, generalisierte Angst)",
    "Posttraumatische Belastungsstörung (PTBS)",
    "Essstörungen (Bulimie, Binge-Eating)",
    "Substanzgebrauch (Alkohol, Medikamente, illegale Substanzen)",
  ] as const;

  return (
    <ContentSection
      variant="editorial"
      title="Begleiterkrankungen — selten allein"
      id="begleiterkrankungen-ueberblick"
      preview="Borderline tritt selten isoliert auf. Komorbiditäten verschärfen die Belastung und verändern, was Angehörige beobachten."
    >
      <EditorialProse>
        <p>
          Borderline tritt selten allein auf. Studien zeigen, dass die meisten
          Betroffenen im Verlauf ihres Lebens auch andere psychische
          Erkrankungen entwickeln. Für Angehörige bedeutet das: Vieles, was Sie
          beobachten, gehört möglicherweise nicht (nur) zu Borderline, sondern
          zu einer parallelen Belastung — und braucht eigene Aufmerksamkeit.
        </p>
      </EditorialProse>

      <ul className="mt-5 space-y-2 pl-5 list-disc marker:text-[color:var(--accent-label)]">
        {komorbiditaeten.map(item => (
          <li key={item} className="editorial-small-copy">
            {item}
          </li>
        ))}
      </ul>

      <p className="editorial-small-copy mt-6">
        Mehr zu den einzelnen Komorbiditäten (Depression, Suizidrisiko,
        Behandlungsfolgen, was Angehörige wissen sollten):{" "}
        <Link href="/verstehen/begleiterkrankungen" className="editorial-link">
          Begleiterkrankungen
        </Link>
        .
      </p>
    </ContentSection>
  );
}
