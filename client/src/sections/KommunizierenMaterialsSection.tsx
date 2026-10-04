import CuratedMaterialsSection, {
  type CuratedMaterialCard,
} from "@/sections/CuratedMaterialsSection";
import { kommItems } from "@/content/kommunizieren";

const selectedIds = ["gespraeche-kippen", "beispiel-dialog"] as const;

const guidanceById: Record<(typeof selectedIds)[number], string> = {
  "gespraeche-kippen":
    "Für den Moment, in dem aus Austausch plötzlich Streit, Rückzug oder Rechtfertigung wird.",
  "beispiel-dialog":
    "Zeigt anpassbare Sätze für vorsichtiges Nachfragen, eine klare Grenze und einen optionalen späteren Wiedereinstieg.",
};

export default function KommunizierenMaterialsSection() {
  return (
    <CuratedMaterialsSection
      marginLabel="Auswahl"
      title="Zwei Materialien für schwierige Gespräche"
      intro="Gefühle anerkennen, Anspannung bemerken und ein Gespräch rechtzeitig unterbrechen."
      curationNote="Sie sind nicht allein für den Gesprächsverlauf verantwortlich. Ein hilfreicher Satz kann unterstützen, aber die Reaktion des Gegenübers nicht garantieren."
      items={curatedItems}
      ariaLabel="Ausgewählte Materialien für schwierige Gespräche"
      tone="terracotta"
    />
  );
}

const curatedItems: CuratedMaterialCard[] = selectedIds.map(id => {
  const item = kommItems.find(candidate => candidate.id === id);
  if (!item) {
    throw new Error(`Kommunikations-Material fehlt: ${id}`);
  }

  return {
    id: item.id,
    title: item.title,
    description: item.description,
    categoryLabel: categoryLabel(item.category),
    imageUrl: item.url,
    thumbnailUrl: item.thumbnailUrl,
    pdfUrl: item.pdfUrl,
    guidance: guidanceById[id],
  };
});

function categoryLabel(category: (typeof kommItems)[number]["category"]) {
  if (category === "techniken") return "Technik";
  if (category === "konflikte") return "Konfliktmoment";
  return "Praxis";
}
