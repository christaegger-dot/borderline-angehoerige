import { cn } from "@/lib/utils";
interface BrandMarkProps {
  className?: string;
  iconClassName?: string;
  variant?: "light" | "dark" | "primary";
}
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center bg-white",
        className
      )}
    >
      <img
        src="/puk/symbol.svg"
        alt=""
        width="40"
        height="40"
        className="h-full w-full object-contain"
      />
    </span>
  );
}
