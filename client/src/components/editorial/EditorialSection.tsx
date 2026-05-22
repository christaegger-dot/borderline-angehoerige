import {
  Children,
  isValidElement,
  type CSSProperties,
  type ReactNode,
} from "react";
import { EditorialSectionMarginNote } from "./EditorialSection.MarginNote";
import { EditorialSectionBody } from "./EditorialSection.Body";
import { EditorialSectionAside } from "./EditorialSection.Aside";

export type EditorialSectionVariant =
  | "cream"
  | "aubergine"
  | "sage-wash"
  | "cream-deep";

export type EditorialSectionDensity =
  | "compact"
  | "normal"
  | "spacious"
  | "hero";

interface EditorialSectionProps {
  /** Hintergrund-Variant der Sektion */
  variant: EditorialSectionVariant;
  /** Vertikaler Makro-Rhythmus. Default `normal` ersetzt rohe py-Utilities. */
  density?: EditorialSectionDensity;
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

const DENSITY_Y: Record<
  EditorialSectionDensity,
  { mobile: string; desktop: string }
> = {
  compact: {
    mobile: "var(--section-y-compact-mobile)",
    desktop: "var(--section-y-compact-desktop)",
  },
  normal: {
    mobile: "var(--section-y-normal-mobile)",
    desktop: "var(--section-y-normal-desktop)",
  },
  spacious: {
    mobile: "var(--section-y-spacious-mobile)",
    desktop: "var(--section-y-spacious-desktop)",
  },
  hero: {
    mobile: "var(--section-y-hero-mobile)",
    desktop: "var(--section-y-hero-desktop)",
  },
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
export function EditorialSection({
  variant,
  density = "normal",
  children,
}: EditorialSectionProps) {
  const slots = collectSlots(children);
  const hasAside = slots.aside !== null;
  const rhythm = DENSITY_Y[density];
  const style = {
    background: VARIANT_BG[variant],
    "--section-y-mobile": rhythm.mobile,
    "--section-y-desktop": rhythm.desktop,
  } as CSSProperties;

  return (
    <section
      className="editorial-section px-[var(--container-pad)] py-[var(--section-y-mobile)] md:px-[var(--container-pad-md)] md:py-[var(--section-y-desktop)]"
      style={style}
      data-variant={variant}
      data-density={density}
    >
      <div
        className={`mx-auto max-w-page editorial-section-grid${hasAside ? " editorial-section-grid--has-aside" : ""}`}
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
