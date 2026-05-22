import CuratedMaterialsSection, {
  type CuratedMaterialCard,
} from "@/sections/CuratedMaterialsSection";
import { kommItems } from "@/content/kommunizieren";

const selectedIds = [
  "zuhoeren-ohne-zustimmen",
  "gespraeche-kippen",
  "pause-statt-streit",
] as const;

const guidanceById: Record<(typeof selectedIds)[number], string> = {
  "zuhoeren-ohne-zustimmen":
    "Als Erstes öffnen, wenn ein Gespräch emotional hochgeht und Sie bei Beziehung bleiben möchten, ohne allem zuzustimmen.",
  "gespraeche-kippen":
    "Für den Moment, in dem aus Austausch plötzlich Streit, Rückzug oder Rechtfertigung wird.",
  "pause-statt-streit":
    "Hilft, eine Unterbrechung nicht als Abbruch, sondern als Schutz des Gesprächs zu formulieren.",
};

export default function KommunizierenMaterialsSection() {
  return (
    <CuratedMaterialsSection
      marginLabel="Auswahl"
      title="Drei Materialien für schwierige Gespräche"
      intro="Nicht jede Gesprächssituation braucht eine ganze Bibliothek. Diese Auswahl führt von Validierung über Deeskalation zur rechtzeitigen Pause."
      curationNote="Die vollständige Materialsammlung bleibt auf der Bibliotheksseite. Hier stehen nur die drei Hilfen, die beim Lesen dieser Seite unmittelbar weiterführen."
      items={curatedItems}
      ariaLabel="Ausgewählte Materialien für schwierige Gespräche"
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
