// Diakritik- + Transliterations-Normalisierung fuer die Suche.
//
// Ziel: User sollen "Zürich", "zürich", "Zuerich", "zuerich", "zurich"
// alle gleich treffen. Drei Stufen:
//
// 1. lowercase + trim + whitespace-collapse  ("base")
// 2. DE/CH-Transliteration (ä→ae, ö→oe, ü→ue, ß→ss)
// 3. NFD-Normalize + Combining-Marks strippen (café→cafe, naïve→naive)
//
// Query-Side: Stufen 1→2→3, ergibt eine kanonische Form.
// Index-Side: Stufen 1→2→3 PLUS Stufe 1→3 ("ohne Translit"). Beide
// Formen werden in den searchText gehaengt, damit sowohl "zuerich"
// als auch "zurich" auf "Zürich" matchen.

function base(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function transliterateGerman(s: string): string {
  return s
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

function stripDiacritics(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Fuer User-Queries: Eine kanonische normalisierte Form. */
export function normalizeQuery(input: string): string {
  return stripDiacritics(transliterateGerman(base(input)));
}

/** Fuer Index-Eintraege: Translit-Form, plus Bare-Strip falls verschieden. */
export function normalizeForIndex(input: string): string {
  const baseForm = base(input);
  const translitStripped = stripDiacritics(transliterateGerman(baseForm));
  const bareStripped = stripDiacritics(baseForm);
  return translitStripped === bareStripped
    ? translitStripped
    : `${translitStripped} ${bareStripped}`;
}
