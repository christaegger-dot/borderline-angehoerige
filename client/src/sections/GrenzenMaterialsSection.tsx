import CuratedMaterialsSection, {
  type CuratedMaterialCard,
} from "@/sections/CuratedMaterialsSection";
import { grenzenItems } from "@/content/grenzen";

const selectedIds = [
  "4-arten-von-grenzen",
  "grenzen-erkennen",
  "grenzen-spickzettel",
] as const;

const guidanceById: Record<(typeof selectedIds)[number], string> = {
  "4-arten-von-grenzen":
    "Als Überblick: Welche Grenze ist gerade gemeint — körperlich, emotional, zeitlich oder materiell?",
  "grenzen-erkennen":
    "Für den Moment davor: Körpersignale ernst nehmen, bevor eine Grenze erst im Konflikt sichtbar wird.",
  "grenzen-spickzettel":
    "Für die Umsetzung: kurze Sätze, die Sie in ruhigen Momenten vorbereiten können.",
};

export default function GrenzenMaterialsSection() {
  return (
    <CuratedMaterialsSection
      marginLabel="Auswahl"
      title="Drei Materialien für klare Grenzen"
      intro="Erkennen Sie Ihre Grenze, benennen Sie sie und finden Sie einen passenden Satz."
      curationNote="Eine Grenze muss nicht perfekt formuliert sein. Bei Bedrohung oder Gewalt zählt Ihre Sicherheit mehr als das Gespräch."
      items={curatedItems}
      ariaLabel="Ausgewählte Materialien zu Grenzen"
      tone="terracotta"
    />
  );
}

const curatedItems: CuratedMaterialCard[] = selectedIds.map(id => {
  const item = grenzenItems.find(candidate => candidate.id === id);
  if (!item) {
    throw new Error(`Grenzen-Material fehlt: ${id}`);
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

function categoryLabel(category: (typeof grenzenItems)[number]["category"]) {
  if (category === "erkennen") return "Erkennen";
  if (category === "kommunizieren") return "Formulieren";
  return "Handeln";
}
