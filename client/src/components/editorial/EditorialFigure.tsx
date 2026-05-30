import type { ReactNode } from "react";

interface EditorialFigureProps {
  /** Bildpfad (öffentliches Asset) — `<img>`-Modus. Alternativ `children`. */
  src?: string;
  /** Alt-Text — inhaltlich, nicht dekorativ (nur img-Modus). */
  alt?: string;
  /** Intrinsische Breite/Höhe → reservierter Platz, kein Layout-Shift (CLS). */
  width?: number;
  height?: number;
  /** Bildunterschrift (figcaption). */
  caption: ReactNode;
  className?: string;
  /**
   * Inline-Grafik (z. B. eine SVG-Komponente) statt `<img>`. So erbt sie
   * Source Serif 4, die var(--…)-Tokens und druckt gestochen — und ist
   * screenreader-zugänglich über ihre eigenen `<title>`/`<desc>`.
   */
  children?: ReactNode;
  /**
   * Optionale «Textversion lesen»-Aufklappung (Lesefluss & Barrierefreiheit):
   * der Inhalt der Grafik als Fliesstext, standardmässig eingeklappt.
   */
  textVersion?: ReactNode;
}

/**
 * Inline-Infografik am Wirkort: `<figure>`/`<figcaption>` im editorialen Stil.
 * Im `<img>`-Modus halten `loading="lazy"` + width/height das Bild aus dem
 * kritischen Pfad und verhindern Layout-Shift. Mit `children` rendert stattdessen
 * eine Inline-Grafik (kein zusätzlicher Netzwerk-Request). Für erklärende
 * Diagramme direkt neben dem passenden Abschnitt — eine Metapher entschlüsselt
 * schneller als 600 Wörter.
 */
export function EditorialFigure({
  src,
  alt,
  width,
  height,
  caption,
  className,
  children,
  textVersion,
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
        {children ??
          (src ? (
            <img
              src={src}
              alt={alt ?? ""}
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          ) : null)}
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
      {textVersion && (
        <details className="evidence-note__disclosure mt-3">
          <summary className="evidence-note__summary">
            Textversion lesen
          </summary>
          <div
            className="evidence-note__body"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-secondary)",
            }}
          >
            {textVersion}
          </div>
        </details>
      )}
    </figure>
  );
}
