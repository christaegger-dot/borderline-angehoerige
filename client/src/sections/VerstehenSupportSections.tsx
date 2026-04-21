import { BookOpen, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ContentSection from "@/components/ContentSection";
import {
  diagnosticOverviewItems,
  meaningForRelativesCards,
  relationshipPatterns,
} from "@/content/verstehen";
import EvidenceNote from "@/components/EvidenceNote";

export function VerstehenRelationshipSection() {
  return (
    <ContentSection
      title="Warum gerade nahe Beziehungen so schnell kippen können"
      icon={<Users className="w-7 h-7 text-terracotta" />}
      id="beziehungsdynamik"
      preview="Was für Aussenstehende klein wirkt, kann in engen Beziehungen als Zurückweisung, Kontrollverlust oder drohender Verlust erlebt werden."
    >
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Viele Menschen mit Borderline haben ihre grössten Schwierigkeiten
          nicht in oberflächlichen Kontakten, sondern in engen Beziehungen.
          Gerade dort, wo viel Bindung, Hoffnung und Verletzbarkeit im Spiel
          sind, werden Unsicherheit, Unklarheit oder Distanz besonders
          schmerzhaft erlebt.
        </p>
        <div className="grid gap-4">
          {relationshipPatterns.map(item => (
            <Card key={item.title} className="border-border/50">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="bg-terracotta-wash border-terracotta-mid/20">
          <CardContent className="p-5">
            <p className="text-foreground leading-relaxed">
              Gerade deshalb erleben Angehörige oft etwas Paradoxes: Je
              wichtiger sie der betroffenen Person sind, desto stärker können
              Konflikte, Vorwürfe oder Grenztests ausfallen.
            </p>
          </CardContent>
        </Card>
        <EvidenceNote
          title="Quellen zu Beziehungsmustern und Validierung"
          definition="Die beschriebenen Muster sind klinisch gut belegt, treten aber individuell unterschiedlich stark auf und erklären Verhalten nicht vollständig."
          reviewDate="24.03.2026"
          sources={[
            {
              label:
                "Fruzzetti, The High-Conflict Couple / DBT-informed family work",
              type: "wissenschaft",
            },
            {
              label: "NEA-BPD / Family Connections",
              href: "https://www.borderlinepersonalitydisorder.org/family-connections/",
              type: "versorgung",
              note: "Angehörigenprogramm mit DBT-bezogener Vermittlung",
            },
          ]}
          className="mt-4"
        />
      </div>
    </ContentSection>
  );
}

export function VerstehenMeaningSection() {
  return (
    <ContentSection
      title="Was das für Angehörige bedeutet"
      icon={<Users className="w-7 h-7 text-sand-mid" />}
      id="bedeutung-fuer-angehoerige"
      preview="Wenn Sie diese Dynamiken kennen, können Sie manches klarer einordnen. Das schützt nicht vor Schmerz, hilft aber oft gegen vorschnelle Selbstanklage."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {meaningForRelativesCards.map(item => (
          <div
            key={item.text}
            className="flex items-start gap-3 p-4 rounded-xl bg-cream border border-border/30"
          >
            <span className="text-2xl flex-shrink-0">•</span>
            <div>
              <span className="font-medium text-foreground block">
                {item.text}
              </span>
              <span className="text-sm text-muted-foreground">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </ContentSection>
  );
}

export function VerstehenDiagnosticSection() {
  return (
    <ContentSection
      title="Diagnostischer Überblick"
      icon={<BookOpen className="w-7 h-7 text-sage-dark" />}
      id="diagnostischer-ueberblick"
      preview="Die diagnostische Perspektive kann hilfreich sein, sollte aber die Beziehungsperspektive nicht dominieren."
    >
      <div className="space-y-5">
        <p className="text-muted-foreground leading-relaxed">
          Für eine Diagnose müssen Fachpersonen mehrere Merkmale über längere
          Zeit und in verschiedenen Lebensbereichen beurteilen. Entscheidend ist
          nicht ein einzelnes Verhalten, sondern das Gesamtbild.
        </p>

        <div className="grid gap-3">
          {diagnosticOverviewItems.map(item => (
            <Card key={item} className="border-border/50">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-t-4 border-t-sage-mid">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-2">
              Ursachen sind nie monokausal
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Borderline entsteht nicht durch eine einzige Ursache, sondern im
              Zusammenspiel biologischer Empfindlichkeit, Bindungs- und
              Entwicklungserfahrungen sowie Belastungsfaktoren.
              Schuldzuweisungen an Betroffene oder Angehörige greifen zu kurz
              und helfen niemandem.
            </p>
          </CardContent>
        </Card>
      </div>
    </ContentSection>
  );
}
