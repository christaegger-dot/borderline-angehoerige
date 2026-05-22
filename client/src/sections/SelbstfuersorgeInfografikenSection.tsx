import CuratedMaterialsSection, {
  type CuratedMaterialCard,
} from "@/sections/CuratedMaterialsSection";
import { selbstfuersorgeInfografiken } from "@/content/selbstfuersorge";

const selectedIds = [
  "sauerstoffmaske",
  "stopp-technik",
  "energie-konto",
] as const;

const guidanceById: Record<(typeof selectedIds)[number], string> = {
  sauerstoffmaske:
    "Der visuelle Kern dieser Seite: Selbstfürsorge ist kein Extra, sondern das, was den Kreislauf stabilisiert.",
  "stopp-technik":
    "Für akute Überforderung: ein kurzer Ablauf, bevor Sie antworten, retten oder weiterdiskutieren.",
  "energie-konto":
    "Für die ruhigere Nacharbeit: Was entzieht Kraft, was gibt sie zurück, und wo braucht es Ausgleich?",
};

export default function SelbstfuersorgeInfografikenSection() {
  return (
    <CuratedMaterialsSection
      marginLabel="Bildführung"
      title="Drei Materialien, die Selbstfürsorge greifbar machen"
      intro="Diese Seite braucht vor allem eine klare innere Logik: erkennen, stoppen, Kräfte wieder auffüllen. Die Auswahl folgt genau dieser Reihenfolge."
      curationNote="Die Sauerstoffmaske bleibt der visuelle Hauptanker. Weitere Selbstfürsorge-PDFs sind bewusst in die Materialbibliothek ausgelagert, damit diese Seite nicht zur Galerie wird."
      items={curatedItems}
      ariaLabel="Ausgewählte Materialien zu Selbstfürsorge"
      allMaterialsLabel="Weitere Selbstfürsorge-Materialien ansehen"
    />
  );
}

const curatedItems: CuratedMaterialCard[] = selectedIds.map(id => {
  const item = selbstfuersorgeInfografiken.find(
    candidate => candidate.id === id
  );
  if (!item) {
    throw new Error(`Selbstfürsorge-Material fehlt: ${id}`);
  }

  return {
    id: item.id,
    title: item.title,
    description: item.desc,
    categoryLabel: categoryLabel(item.category),
    imageUrl: item.webp,
    thumbnailUrl: item.thumbnailUrl,
    pdfUrl: item.pdf,
    guidance: guidanceById[id],
  };
});

function categoryLabel(
  category: (typeof selbstfuersorgeInfografiken)[number]["category"]
) {
  if (category === "erkennen") return "Erkennen";
  if (category === "techniken") return "Technik";
  return "Ressource";
}
