import { cn } from "@/lib/utils";

export default function HandoutVisualPlaceholder({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${title}: aktuelle Textversion verfügbar; Druckgrafik in Überarbeitung`}
      className={cn(
        "flex aspect-[3/4] w-full flex-col justify-between rounded-md border p-5",
        className
      )}
      style={{
        borderColor: "var(--rule-color)",
        background:
          "linear-gradient(145deg, color-mix(in srgb, var(--accent-primary) 10%, var(--bg-primary)), var(--bg-elevated))",
      }}
    >
      <span
        className="text-xs font-semibold uppercase"
        style={{
          color: "var(--accent-label)",
          letterSpacing: "var(--tracking-caps)",
        }}
      >
        Aktuelle Lesefassung
      </span>
      <div>
        <p
          className="text-lg font-semibold leading-snug"
          style={{ color: "var(--fg-primary)" }}
        >
          {title}
        </p>
        <p
          className="mt-3 text-sm leading-relaxed"
          style={{ color: "var(--fg-secondary)" }}
        >
          Druckgrafik wird fachlich und visuell überarbeitet.
        </p>
      </div>
    </div>
  );
}
