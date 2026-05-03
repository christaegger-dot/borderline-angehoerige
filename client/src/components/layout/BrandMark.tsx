import { Compass } from "@/icons/root-icons";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  iconClassName?: string;
  variant?: "light" | "dark" | "primary";
}

export function BrandMark({
  className,
  iconClassName,
  variant = "light",
}: BrandMarkProps) {
  const styles =
    variant === "dark"
      ? "border border-white/15 bg-white/10 text-white shadow-[0_16px_28px_-22px_rgba(15,23,42,0.9)] ring-1 ring-white/10 rounded-2xl h-10 w-10"
      : variant === "primary"
        ? "bg-[color:var(--accent-primary)] text-white shadow-[0_2px_8px_-2px_rgba(91,58,78,0.35)] rounded-full h-[42px] w-[42px]"
        : "border border-border/60 bg-white/90 text-sage-darker shadow-sm shadow-black/5 ring-1 ring-white/70 rounded-2xl h-10 w-10";

  const iconColor =
    variant === "dark"
      ? "text-white/90"
      : variant === "primary"
        ? "text-white"
        : "text-sage-darker";

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center",
        styles,
        className
      )}
    >
      <Compass className={cn("h-5 w-5", iconColor, iconClassName)} />
    </span>
  );
}
