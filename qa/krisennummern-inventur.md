# Schritt 1 — Inventur & Vorschlag: Krisennummern aus `kontakte.ts` speisen

**Status: STOP-Gate — read-only, keine Inhalte geändert. Warte auf Christas Freigabe.**
Verifikationsstand 30.05.2026. Keine Nummer aus dem Web geladen.

---

## A. Wichtigste Korrektur zur Prompt-Prämisse

Die zwei angeblich **fehlenden** Einträge **existieren bereits** in `kontakte.ts` —
es muss **kein neuer Eintrag** angelegt werden:

| Prompt sagt „fehlt evtl."   | tatsächlich in `kontakte.ts`  | Wert          | als 24/7?                                                 |
| --------------------------- | ----------------------------- | ------------- | --------------------------------------------------------- |
| Ärztefon 0800 33 66 55      | **`INFO_AERZTEFON`** (Z. 259) | 0800 33 66 55 | keine `verfuegbarkeit` gesetzt                            |
| Pro Mente Sana 0848 800 858 | **`INFO_PROMENTE`** (Z. 355)  | 0848 800 858  | **keine `verfuegbarkeit`** → korrekt **nicht** als 24/7 ✓ |

Beide Werte stimmen mit den autoritativen Vorgaben überein. → **Schritt 2 braucht keine neuen Einträge**, nur Ziffern-Bindung. (Falls gewünscht: Pro Mente Sana `hinweis` könnte „kein Einsatzdienst, feste Beratungszeiten" präzisiert werden — redaktionelle Entscheidung, optional.)

---

## B. Hartkodierte Nummern-Literale (alle Fundstellen)

### B1 · `soforthilfe.content.ts` — **zwei** unterschiedlich zusammengesetzte Listen

**Liste 1 «Wichtige Nummern im Akutfall»** (Z. 24–55), 7 Einträge:
| Reihenfolge | Literal | passende ID |
| --- | --- | --- |
| 1 | 144 Sanität | `ROT_144` |
| 2 | 117 Polizei | `ROT_117` |
| 3 | 0800 33 66 55 Ärztefon | `INFO_AERZTEFON` |
| 4 | 058 384 20 00 PUK Erwachsene | `GELB_PUK_ERW` |
| 5 | 058 384 66 66 PUK Kinder/Jugend | `GELB_PUK_KJP` |
| 6 | 058 384 46 82 PUK ab 65 | `GELB_PUK_65` |
| 7 | 143 Dargebotene Hand | `GRUEN_143` |

**Liste 2 «Notfallnummern – Kurzreferenz»** (Z. 140–167), 6 Einträge:
| Reihenfolge | Literal | passende ID |
| --- | --- | --- |
| 1 | 144 Sanität | `ROT_144` |
| 2 | 0800 33 66 55 Ärztefon | `INFO_AERZTEFON` |
| 3 | 058 384 20 00 PUK Erwachsene | `GELB_PUK_ERW` |
| 4 | 143 Dargebotene Hand | `GRUEN_143` |
| 5 | 117 Polizei | `ROT_117` |
| 6 | 058 384 38 00 Fachstelle | `INFO_FACHSTELLE` |

→ **Satz-Unterschiede der beiden Listen:** Liste 1 hat `ROT_117`, `GELB_PUK_KJP`, `GELB_PUK_65`, **aber keine Fachstelle**. Liste 2 hat `INFO_FACHSTELLE`, **aber keine Kinder/65/117** (117 erst an 5. Stelle, andere Sortierung). **KIZ (`INFO_KIZ`, 058 384 65 00) fehlt in beiden.**

### B2 · `kommunizieren.content.ts` — kontextuelle Einzelerwähnungen

| Zeile | Literale                                      | IDs                                           |
| ----- | --------------------------------------------- | --------------------------------------------- |
| 66    | 144 · 117                                     | `ROT_144`, `ROT_117`                          |
| 70    | 058 384 20 00 · 058 384 66 66 · 058 384 46 82 | `GELB_PUK_ERW`, `GELB_PUK_KJP`, `GELB_PUK_65` |
| 74    | 143 · 0848 800 858                            | `GRUEN_143`, `INFO_PROMENTE`                  |
| 186   | 144 · 117                                     | `ROT_144`, `ROT_117`                          |

### B3 · `SelbstfuersorgeCheck.tsx`

| Zeile | Inhalt                                                      | ID                                                                                        |
| ----- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 98    | `kontaktById("INFO_FACHSTELLE")?.nummer ?? "058 384 38 00"` | `INFO_FACHSTELLE` — **bezieht schon aus Quelle**, aber mit hartkodiertem Literal-Fallback |

### B4 · `GrenzenCheck.tsx`

| Zeile | Literal                    | ID                |
| ----- | -------------------------- | ----------------- |
| 301   | „Beratung: 058 384 38 00." | `INFO_FACHSTELLE` |

### B5 · Weitere Fundstellen (Repo-weiter grep) — **ausserhalb des Scopes, zur Info**

- `KrisenampelVisualisierung.tsx` (Z. 62, 257, 260): „144 / 117 / 112", `tel:144` → `ROT_144`/`ROT_117`/`ROT_112`.
- `SituationsWegweiser.tsx` Z. 168: „sofort 144 anrufen" → `ROT_144`.
- `KommunikationsUebung.tsx` Z. 103/106: „143" im Übungsdialog → `GRUEN_143`.
- `searchIndex.ts` Z. 301–307, 1399: „144/143/117" als Such-Keywords.

→ **Vorschlag:** B5 in **diesem** PR **nicht** anfassen (Wegweiser/Ampel/Übung/Such-Index sind anderer Scope; der Prompt nennt die vier Kern-Dateien). Nur erwähnen, damit nichts übersehen wirkt. Bei Wunsch separat.

---

## C. Vorschläge zur Freigabe (redaktionelle Entscheidungen — **deine** Wahl)

### C1 · Kanonischer Akutblock `AKUT_KONTAKT_IDS`

Vorschlag einer **einen** geordneten ID-Liste in `kontakte.ts`, aus der **beide** `soforthilfe`-Listen identisch gerendert werden. Vorgeschlagene Reihenfolge (akut → entlastend):

```ts
export const AKUT_KONTAKT_IDS = [
  "ROT_144", // Sanität
  "ROT_117", // Polizei
  "INFO_AERZTEFON", // Ärztefon 0800 33 66 55, Triage 24/7
  "GELB_PUK_ERW", // PUK Erwachsene
  "GELB_PUK_KJP", // PUK Kinder/Jugendliche
  "GELB_PUK_65", // PUK ab 65
  "GRUEN_143", // Dargebotene Hand
] as const;
```

**Offene Entscheidung C1a:** Soll **`INFO_KIZ`** (058 384 65 00, ambulante Krisenintervention) in diesen Akutblock? Aktuell in **keinem** Handout. (Prompt nennt das ausdrücklich als deine Entscheidung.)
**Offene Entscheidung C1b:** Gehört **`INFO_FACHSTELLE`** in den Akutblock (steht aktuell nur in Liste 2) oder bleibt sie eine bewusste Angehörigen-Ergänzung am Ende?

### C2 · Wie die beiden `soforthilfe`-Listen rendern

- **Vorschlag:** Beide aus `AKUT_KONTAKT_IDS` rendern → identische Zusammensetzung/Sortierung. Der **beschreibende `text`** pro Karte bleibt handgeschrieben (eigene Stimme je Liste — z. B. Liste 2 kürzer). Nur die **Ziffern im `title`** kommen aus `kontakte.ts`.
- **Entscheidung C2a:** Liste 2 ist aktuell kürzer (6 statt 7) und nennt die Fachstelle. Soll sie wirklich **denselben** Satz wie Liste 1 zeigen, oder bleibt sie bewusst eine kürzere „Kurzreferenz" (dann eigener, kürzerer ID-Satz)?

### C3 · Einzel-Bindungen (kein Block)

`kommunizieren.content.ts`, `SelbstfuersorgeCheck.tsx`, `GrenzenCheck.tsx`: nur die **Ziffern** je Vorkommen aus `kontakte.ts` binden, Beschreibungstext unverändert. Kein Akutblock hineinkopieren.

### C4 · Drift-Schutz-Test (empfohlen)

Neuer Test, der prüft, dass die in den Handout-Textversionen gerenderten Ziffern exakt `kontaktByIdStrict(id).nummer` entsprechen → fängt künftige Hartkodierung ab.

---

## D. Was Schritt 2 NICHT tut (laut Prompt)

- Keine neuen `kontakte.ts`-Einträge (existieren bereits).
- Beschreibungstexte werden **nicht** vereinheitlicht (nur Ziffern gebunden).
- `/soforthilfe`-Seite und Notfallkarte werden **nicht** angefasst.
- B5-Fundstellen (Wegweiser/Ampel/Übung/Suche) bleiben unangetastet (anderer Scope).

---

## Zu entscheiden, bevor Schritt 2 startet

1. **C1a** — KIZ in den Akutblock? (ja/nein)
2. **C1b** — Fachstelle in den Akutblock oder nur als Angehörigen-Ergänzung?
3. **C2a** — `soforthilfe` Liste 2 = identisch zu Liste 1, oder bewusst kürzere Kurzreferenz mit eigenem ID-Satz?
4. **C4** — Drift-Schutz-Test mitbauen? (empfohlen ja)
5. Optional: Pro-Mente-Sana-`hinweis` präzisieren («kein Einsatzdienst, feste Zeiten»)?
