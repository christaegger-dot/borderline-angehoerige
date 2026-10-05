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
      title="Wenn Nähe und Belastung zusammenkommen"
      id="beziehungsdynamik"
    >
      <EditorialProse>
        <p>
          In engen Beziehungen können Bindung, Hoffnung, Verletzbarkeit und
          unterschiedliche Bedürfnisse nach Nähe oder Abstand besonders viel
          Gewicht bekommen. Manche Menschen mit Borderline erleben dabei starke
          Unsicherheit oder Schmerz; andere erleben Beziehungen anders. Ähnliche
          Wechselwirkungen kommen auch ohne Borderline-Diagnose vor.
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
          Gerade deshalb können Konflikte in engen Beziehungen heftiger erlebt
          werden. Vorwürfe oder rasch wechselnde Bewertungen sind mögliche
          Reaktionen unter hoher Anspannung, aber kein verlässlicher Hinweis auf
          Absicht oder Charakter.
        </EditorialPullQuote>
      </div>
      <p className="editorial-small-copy mt-6">
        Ausführlich, mit Bedeutungsschleife, wechselseitigen Reaktionen und den
        Grenzen der Verantwortung:{" "}
        <Link href="/verstehen/beziehungen" className="editorial-link">
          Borderline und Beziehungen
        </Link>
        .
      </p>
      <EvidenceNote
        variant="editorial"
        title="Quellen zu Beziehungsmustern und Validierung"
        definition="Die beschriebenen Erfahrungen und Wechselwirkungen können vorkommen, sind aber weder diagnoseexklusiv noch bei jeder Person vorhanden. Sie erklären Verhalten nicht vollständig."
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
          Klassifikationssysteme ordnen Borderline unterschiedlich ein. Das
          DSM-5-TR beschreibt neun Kriterien; für eine Diagnose müssen davon
          mindestens fünf als überdauerndes Muster vorliegen und zu relevantem
          Leiden oder Beeinträchtigungen beitragen. Die folgende Liste ist eine
          gekürzte Orientierung, keine Checkliste zur Selbst- oder
          Fremddiagnose.
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
        Die ICD-11 verwendet ein anderes Modell: Zuerst werden Vorliegen und
        Schweregrad einer Persönlichkeitsstörung beurteilt; ein
        Borderline-Muster kann zusätzlich angegeben werden. Mehr zu den beiden
        Systemen und zum Schweizer Kodierkontext finden Sie unter{" "}
        <Link href="/verstehen/diagnostik#wie" className="editorial-link">
          Diagnostik
        </Link>
        .
      </p>

      <EvidenceNote
        variant="editorial"
        title="Klassifikationsgrundlagen"
        sources={[
          {
            label: "DSM-5-TR (American Psychiatric Association, 2022)",
            href: quellenLinks.apa2022,
            type: "wissenschaft",
          },
          {
            label: "ICD-11 CDDR (World Health Organization, 2024)",
            href: quellenLinks.icd11,
            type: "wissenschaft",
          },
        ]}
      />

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
    "Depressive Erkrankungen (in klinischen Stichproben häufig beschrieben)",
    "Angststörungen (Panik, soziale Phobie, generalisierte Angst)",
    "Posttraumatische Belastungsstörung (PTBS)",
    "Essstörungen (Bulimie, Binge-Eating)",
    "Substanzgebrauch (Alkohol, Medikamente, illegale Substanzen)",
    "Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung (ADHS)",
  ] as const;

  return (
    <ContentSection
      variant="editorial"
      title="Begleiterkrankungen — mögliche Kombinationen"
      id="begleiterkrankungen-ueberblick"
      preview="In Studien hatten viele, aber nicht alle Menschen mit Borderline weitere psychische Diagnosen. Welche Kombination vorliegt, wird individuell abgeklärt."
    >
      <EditorialProse>
        <p>
          In Studien hatten viele, aber nicht alle Menschen mit Borderline im
          Verlauf ihres Lebens auch andere psychische Diagnosen. Welche
          Beschwerden zu welcher Erkrankung gehören oder unabhängig davon
          bestehen, lässt sich nur individuell fachlich beurteilen. Angehörige
          müssen diese Zuordnung nicht selbst vornehmen.
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
        Häufigkeitsangaben unterscheiden sich je nach Stichprobe,
        Erhebungszeitraum und Diagnoseverfahren. Die Liste sagt deshalb nichts
        über die Wahrscheinlichkeit bei einer einzelnen Person aus.
      </p>

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
