import { Children, isValidElement, type ReactNode } from "react";
import { EditorialSectionMarginNote } from "./EditorialSection.MarginNote";
import { EditorialSectionBody } from "./EditorialSection.Body";
import { EditorialSectionAside } from "./EditorialSection.Aside";

export type EditorialSectionVariant =
  | "cream"
  | "aubergine"
  | "sage-wash"
  | "cream-deep";

interface EditorialSectionProps {
  /** Hintergrund-Variant der Sektion */
  variant: EditorialSectionVariant;
  /**
   * Compound-Children: `<EditorialSection.MarginNote>`,
   * `<EditorialSection.Body>` und `<EditorialSection.Aside>`. Reihenfolge
   * im JSX ist egal — der Parent slottet sie via Grid-Areas in die
   * richtigen Positionen.
   */
  children: ReactNode;
}

const VARIANT_BG: Record<EditorialSectionVariant, string> = {
  cream: "var(--bg-primary)",
  aubergine: "var(--accent-primary)",
  "sage-wash": "var(--bg-sage-wash)",
  "cream-deep": "var(--bg-cream-deep)",
};

/**
 * Editorial-Layout-Hülle mit drei Slots: MarginNote (links), Body (Lese-
 * Spalte 608 px), Aside (rechts). Lese-Spalte bleibt typografisch
 * unverändert — die Hülle organisiert nur das Layout drumherum, damit
 * keine leeren Cream-Flächen entstehen.
 *
 * Slot-API via Compound-Component-Pattern:
 *
 * ```tsx
 * <EditorialSection variant="cream">
 *   <EditorialSection.MarginNote>...</EditorialSection.MarginNote>
 *   <EditorialSection.Body>...</EditorialSection.Body>
 *   <EditorialSection.Aside>...</EditorialSection.Aside>
 * </EditorialSection>
 * ```
 *
 * Aside hat einen optionalen `background`-Prop für eigene Container-
 * Optik (`sage-wash` | `cream-deep`).
 *
 * Alle drei Slots sind optional — fehlende Slots werden nicht gerendert.
 * Wenn weder MarginNote noch Aside vorhanden sind, bleibt die Body-Spalte
 * trotzdem auf 608 px (kein Auto-Fill auf Container-Breite — das wäre
 * eine Lese-Spalte, die zu breit ist).
 *
 * Layout-Verhalten:
 * - Desktop (≥1024 px): 3 Spalten `200px / minmax(0, 608px) / 1fr`
 * - Tablet (768-1023 px): 2 Spalten (Body + Aside) wenn Aside vorhanden,
 *   sonst einspaltig. MarginNote wird zu Inline-Eyebrow oben.
 * - Mobile (<768 px): einspaltig in Reihenfolge MarginNote → Body → Aside.
 */
export function EditorialSection({ variant, children }: EditorialSectionProps) {
  const slots = collectSlots(children);
  const hasAside = slots.aside !== null;

  return (
    <section
      className="editorial-section px-[var(--container-pad)] py-20 md:px-[var(--container-pad-md)] md:py-[120px]"
      style={{ background: VARIANT_BG[variant] }}
      data-variant={variant}
    >
      <div
        className={`mx-auto max-w-[1240px] editorial-section-grid${hasAside ? " editorial-section-grid--has-aside" : ""}`}
      >
        {slots.marginNote}
        {slots.body}
        {slots.aside}
      </div>
    </section>
  );
}

interface SectionSlots {
  marginNote: ReactNode | null;
  body: ReactNode | null;
  aside: ReactNode | null;
}

function collectSlots(children: ReactNode): SectionSlots {
  const slots: SectionSlots = {
    marginNote: null,
    body: null,
    aside: null,
  };

  Children.forEach(children, child => {
    if (!isValidElement(child)) return;
    if (child.type === EditorialSectionMarginNote) {
      slots.marginNote = child;
    } else if (child.type === EditorialSectionBody) {
      slots.body = child;
    } else if (child.type === EditorialSectionAside) {
      slots.aside = child;
    }
  });

  return slots;
}

EditorialSection.MarginNote = EditorialSectionMarginNote;
EditorialSection.Body = EditorialSectionBody;
EditorialSection.Aside = EditorialSectionAside;
