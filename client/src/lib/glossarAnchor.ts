/**
 * Glossar-Anker: erzeugt aus einem Begriff die URL-sichere Anker-ID, mit der
 * der Glossar-Eintrag deep-linkbar ist (/glossar#term-<slug>).
 *
 * Single Source of Truth für die Slug-Regel — Glossar-Seite und die
 * GlossarBegriff-Verlinkung im Fliesstext teilen sich diese Funktion, damit
 * Anker und Links nie auseinanderlaufen.
 */
export function slugifyTerm(term: string): string {
  return term
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Href zum Glossar-Eintrag eines Begriffs, z. B. /glossar#term-komorbiditaet */
export function glossarHref(term: string): string {
  return `/glossar#term-${slugifyTerm(term)}`;
}
