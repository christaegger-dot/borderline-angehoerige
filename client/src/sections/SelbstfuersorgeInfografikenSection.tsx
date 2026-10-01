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
    "Eigene Bedürfnisse wahrnehmen und Überlastung früher erkennen.",
  "stopp-technik":
    "Wenn die Situation sicher ist: einen Moment innehalten und den nächsten Schritt wählen.",
  "energie-konto":
    "Für die ruhigere Nacharbeit: Was kostet Kraft, und welche Aufgaben oder Bedingungen müssten sich verändern?",
};

export default function SelbstfuersorgeInfografikenSection() {
  return (
    <CuratedMaterialsSection
      marginLabel="Zum Mitnehmen"
      title="Drei Materialien, die Selbstfürsorge greifbar machen"
      intro="Belastung bemerken, eine Pause finden und die eigene Kraft ernst nehmen: Wählen Sie das Blatt, das Ihnen jetzt hilft."
      curationNote="Sie müssen nicht alle Übungen anwenden. Ihre Erholung und Ihr eigenes Leben sind wichtig – unabhängig davon, wie viel Unterstützung Sie leisten können."
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
