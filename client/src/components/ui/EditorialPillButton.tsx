import type React from "react";
import { cn } from "@/lib/utils";

// Shared button primitive for Editorial pill/choice patterns.
// Encapsulates the onMouseEnter/onMouseLeave border-color hover logic and
// focus-visible classes that are duplicated across Wegweiser, Selbsttest,
// Materialien, and Notfallkarte.
//
// Variants:
//   primary  — filled accent (Notfallkarte Drucken-Button)
//   secondary — border + bg-elevated + hover (NavPillButton, SecondaryButton)
//   choice   — full-width block + border + hover (ChoiceButton, OptionButton)
//   filter   — pill + border, transparent when unselected, no hover (FilterPill)

export type EditorialPillButtonVariant =
  | "primary"
  | "secondary"
  | "choice"
  | "filter";

interface EditorialPillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: EditorialPillButtonVariant;
  selected?: boolean;
}

const BASE =
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const VARIANT_CLASS: Record<EditorialPillButtonVariant, string> = {
  primary: "rounded-full border px-5 py-2 text-sm",
  secondary: "rounded-full border px-4 py-1.5 text-sm",
  choice:
    "block w-full rounded-md border px-5 py-4 text-left disabled:cursor-not-allowed",
  filter: "whitespace-nowrap shrink-0 rounded-full border px-4 py-1.5 text-sm",
};

function getStyle(
  variant: EditorialPillButtonVariant,
  selected: boolean
): React.CSSProperties {
  if (variant === "primary") {
    return {
      borderColor: "var(--accent-primary)",
      backgroundColor: "var(--accent-primary)",
      color: "var(--bg-primary)",
      fontWeight: 500,
    };
  }
  if (variant === "filter") {
    return {
      borderColor: selected ? "var(--accent-primary)" : "var(--rule-color)",
      backgroundColor: selected ? "var(--bg-elevated)" : "transparent",
      color: selected ? "var(--fg-primary)" : "var(--fg-secondary)",
      fontWeight: selected ? 500 : 400,
    };
  }
  if (variant === "choice") {
    return {
      borderColor: selected ? "var(--accent-primary)" : "var(--rule-color)",
      backgroundColor: "var(--bg-elevated)",
      color: "var(--fg-primary)",
      fontSize: "var(--text-md)",
      lineHeight: "var(--lh-snug)",
      fontWeight: selected ? 500 : 400,
    };
  }
  // secondary
  return {
    borderColor: selected ? "var(--accent-primary)" : "var(--rule-color)",
    backgroundColor: "var(--bg-elevated)",
    color: "var(--fg-secondary)",
  };
}

export function EditorialPillButton({
  variant = "secondary",
  selected = false,
  disabled,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  children,
  ...props
}: EditorialPillButtonProps) {
  const needsHover = variant === "secondary" || variant === "choice";

  const handleMouseEnter = needsHover
    ? (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!selected && !disabled) {
          e.currentTarget.style.borderColor = "var(--accent-primary)";
        }
        onMouseEnter?.(e);
      }
    : onMouseEnter;

  const handleMouseLeave = needsHover
    ? (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!selected && !disabled) {
          e.currentTarget.style.borderColor = "var(--rule-color)";
        }
        onMouseLeave?.(e);
      }
    : onMouseLeave;

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(BASE, VARIANT_CLASS[variant], className)}
      style={{ ...getStyle(variant, selected), ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
