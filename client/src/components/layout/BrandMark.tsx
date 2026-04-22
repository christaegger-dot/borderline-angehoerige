import { Compass } from "@/icons/root-icons";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  iconClassName?: string;
  variant?: "light" | "dark";
}

export function BrandMark({
  className,
  iconClassName,
  variant = "light",
}: BrandMarkProps) {
  const isDark = variant === "dark";

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
        isDark
          ? "border border-white/15 bg-white/10 text-white shadow-[0_16px_28px_-22px_rgba(15,23,42,0.9)] ring-1 ring-white/10"
          : "border border-border/60 bg-white/90 text-sage-darker shadow-sm shadow-black/5 ring-1 ring-white/70",
        className
      )}
    >
      <Compass
        className={cn(
          "h-5 w-5",
          isDark ? "text-white/90" : "text-sage-darker",
          iconClassName
        )}
      />
    </span>
  );
}
