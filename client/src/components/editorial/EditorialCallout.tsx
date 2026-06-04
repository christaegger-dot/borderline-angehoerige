import type { ReactNode } from "react";
import { Info, AlertTriangle, Sprout } from "lucide-react";

export type EditorialCalloutVariant = "hinweis" | "achtung" | "entlastung";

interface EditorialCalloutProps {
  /**
   * Semantisches Register:
   * - `hinweis` (Default): ruhiger, neutraler Cream-Deep-Block mit Sage-Schiene.
   *   Für Einordnung/Kontext.
   * - `achtung`: warm abgesetzter Terrakotta-Block — gedämpfte Fortsetzung der
   *   Soforthilfe-Ampel, damit Dringlichkeit innerhalb einer Seite erkennbar
   *   wird, ohne die Ruhe zu brechen.
   * - `entlastung`: ruhiger Salbei-Block für entlastende/beruhigende Aussagen
   *   (z.B. «Sie tragen keine Schuld»).
   */
  variant?: EditorialCalloutVariant;
  /** Sichtbares Label oben. Default je nach Variante («Hinweis» / «Achtung»). */
  title?: string;
  children: ReactNode;
  className?: string;
}

interface VariantStyle {
  label: string;
  Icon: typeof Info;
}

// Farben und Kontraste liegen zentral in `index.css`, damit Callouts dieselbe
// ruhige Paper-/Border-Sprache wie Materialien und neue Handouts verwenden.
const VARIANTS: Record<EditorialCalloutVariant, VariantStyle> = {
  hinweis: {
    label: "Hinweis",
    Icon: Info,
  },
  achtung: {
    label: "Achtung",
    Icon: AlertTriangle,
  },
  entlastung: {
    label: "Entlastung",
    Icon: Sprout,
  },
};

/**
 * Zurückhaltende semantische Register-Ebene als Ergänzung zur ruhigen
 * Sand/Aubergine/Salbei-Palette. Bewusst sparsam einsetzen — keine flächige
 * Callout-Inflation. Keine Animation (reduced-motion unkritisch).
 */
export function EditorialCallout({
  variant = "hinweis",
  title,
  children,
  className,
}: EditorialCalloutProps) {
  const { label, Icon } = VARIANTS[variant];
  const heading = title ?? label;

  return (
    <aside
      className={
        className
          ? `editorial-callout editorial-callout--${variant} ${className}`
          : `editorial-callout editorial-callout--${variant}`
      }
      aria-label={heading}
    >
      <Icon aria-hidden="true" className="editorial-callout__icon" />
      <div className="min-w-0">
        <p className="editorial-callout__title">{heading}</p>
        <div className="editorial-callout__body">{children}</div>
      </div>
    </aside>
  );
}
