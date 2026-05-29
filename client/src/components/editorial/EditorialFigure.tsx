import type { ReactNode } from "react";

interface EditorialFigureProps {
  /** Bildpfad (öffentliches Asset). */
  src: string;
  /** Alt-Text — inhaltlich, nicht dekorativ. */
  alt: string;
  /** Intrinsische Breite/Höhe → reservierter Platz, kein Layout-Shift (CLS). */
  width: number;
  height: number;
  /** Bildunterschrift (figcaption). */
  caption: ReactNode;
  className?: string;
}

/**
 * Inline-Infografik am Wirkort: `<figure>`/`<figcaption>` im editorialen Stil.
 * `loading="lazy"` + width/height halten das Bild aus dem kritischen Pfad und
 * verhindern Layout-Shift. Für erklärende Diagramme direkt neben dem
 * passenden Abschnitt — eine Metapher entschlüsselt schneller als 600 Wörter.
 */
export function EditorialFigure({
  src,
  alt,
  width,
  height,
  caption,
  className,
}: EditorialFigureProps) {
  return (
    <figure className={className ? `my-8 ${className}` : "my-8"}>
      <div
        className="overflow-hidden rounded-md border"
        style={{
          borderColor: "var(--rule-color)",
          background: "var(--bg-elevated)",
        }}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      <figcaption
        className="mt-3"
        style={{
          fontSize: "var(--text-sm)",
          lineHeight: "var(--lh-relaxed)",
          color: "var(--fg-tertiary)",
        }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}
