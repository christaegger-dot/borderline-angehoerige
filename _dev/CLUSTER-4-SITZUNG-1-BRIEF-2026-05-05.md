---
Datum: 2026-05-05
Zweck: Implementierungs-Brief für Claude Code — Cluster 4 Sitzung 1
Decisions-Quelle: `_dev/CLUSTER-4-DECISIONS-2026-05-05.md`
Scope: 5 Edits in 4 Dateien + 1 neue _dev-Datei
Tests: 178/178 müssen grün bleiben
PR-Titel: `feat(cluster-4-s1): Recovery-Zeit, Aguirre, Sprachregelung, Geschlecht`
---

# Cluster 4 — Sitzung-1-Brief

## Übersicht der Änderungen

| Edit | Datei                                   | Art                    | Aufwand |
| ---- | --------------------------------------- | ---------------------- | ------- |
| A    | `client/src/pages/Genesung.tsx`         | Text-Edit (1 Satz)     | trivial |
| B    | `client/src/pages/Buchempfehlungen.tsx` | Neuer Eintrag (Objekt) | klein   |
| C    | `client/src/pages/Home.tsx`             | Text-Edit (1 Wort)     | trivial |
| D    | `client/src/pages/Verstehen.tsx`        | Text-Edit (1 Satz)     | trivial |
| E    | `_dev/STYLE-SPRACHREGELUNG.md`          | Neue Datei             | klein   |

---

## Edit A — Genesung.tsx: Recovery-Zeit in 50%-Zelle

**Datei:** `client/src/pages/Genesung.tsx`

**Suche:**

```
erreichen eine umfassendere Genesung mit funktioneller
                Stabilität.
```

**Ersetze durch:**

```
erreichen eine umfassendere Genesung mit funktioneller
                Stabilität — meist innerhalb von 10 bis 20 Jahren.
```

**Kontext:** Die 50%-Zelle im Kennzahlen-Trio (~Zeile 365). Kein neuer Quellenbeleg nötig — Zanarini et al. (2010, 2012) sind bereits in der bestehenden EvidenceNote direkt darunter verlinkt.

---

## Edit B — Buchempfehlungen.tsx: Aguirre-Eintrag

**Datei:** `client/src/pages/Buchempfehlungen.tsx`

**Suche** (letzter Eintrag in der «Für Eltern»-Kategorie, ~Zeile 120):

```
      {
        title: "Borderline verstehen und bewältigen",
        author: "Psychiatrie-Verlag",
        publisher: "Psychiatrie-Verlag",
        description:
          "Mit passendem Begleitbuch. Liefert Tipps und Anleitungen, um die Erkrankung zu erkennen und Mut zu fassen für den gemeinsamen Weg.",
        forWhom: "Eltern, Familien",
      },
    ],
  },
  {
    id: "kinder",
```

**Ersetze durch:**

```
      {
        title: "Borderline verstehen und bewältigen",
        author: "Psychiatrie-Verlag",
        publisher: "Psychiatrie-Verlag",
        description:
          "Mit passendem Begleitbuch. Liefert Tipps und Anleitungen, um die Erkrankung zu erkennen und Mut zu fassen für den gemeinsamen Weg.",
        forWhom: "Eltern, Familien",
      },
      {
        title: "Borderline Personality Disorder in Adolescents",
        author: "Blaise Aguirre",
        publisher: "Fair Winds Press",
        year: "2014",
        description:
          "Englischsprachiges Standardwerk zu BPS bei Jugendlichen. Erklärt Entstehung, Diagnose und Behandlung aus der Perspektive von Eltern und Fachpersonen. Aguirre leitet das McLean-Hospital-Programm für Adoleszente.",
        forWhom: "Eltern, deren Kind (Jugendliche) betroffen ist",
      },
    ],
  },
  {
    id: "kinder",
```

**Hinweis:** Kein `highlight: true`, kein `shopLink` nötig. Position: letzter Eintrag in «Für Eltern», vor der «Kinderbücher»-Kategorie.

---

## Edit C — Home.tsx: «erkrankte» → «betroffene»

**Datei:** `client/src/pages/Home.tsx`

**Suche:**

```
erkrankte Person. Orientierung, Gespräch und Materialien für
```

**Ersetze durch:**

```
betroffene Person. Orientierung, Gespräch und Materialien für
```

**Kontext:** Fachstelle-Sektion (~Zeile 364). Genau ein Treffer im File.

---

## Edit D — Verstehen.tsx: Geschlecht-Satz ergänzen

**Datei:** `client/src/pages/Verstehen.tsx`

**Suche:**

```
                Borderline kann Menschen aller Geschlechter betreffen. Männer
```

**Ersetze durch:**

```
                Borderline kommt bei allen Geschlechtern vor — klinisch werden Frauen häufiger diagnostiziert. Männer
```

**Kontext:** Mythen-Block «Borderline betrifft nur Frauen» (~Zeile 800). Nur der erste Satz ändert sich; der Rest des Absatzes bleibt unverändert.

---

## Edit E — Neue Datei: `_dev/STYLE-SPRACHREGELUNG.md`

**Datei:** `_dev/STYLE-SPRACHREGELUNG.md` (neu erstellen)

**Inhalt:**

```markdown
---
Datum: 2026-05-05
Zweck: Interne Sprachregelung für konsistente Formulierungen auf der Site
Geltungsbereich: Alle .tsx-Seiten und -Komponenten
---

# Sprachregelung — Interne Stilnotiz

## Primäre Formulierung: «betroffene Person»

Verwende «betroffene Person» (nicht «erkrankte Person») als Standardformulierung,
wenn auf die Person mit BPS verwiesen wird.

**Begründung:** «erkrankt» impliziert einen passiven, dauerhaften Krankheitszustand
und steht im Widerspruch zum Recovery-orientierten Framing der Site. «betroffen»
ist offener und entstigmatisierender.

**Ausnahmen:** Medizinische und klinische Kontexte (EvidenceNotes, Diagnostik-Seite,
Quellen-Belege) dürfen «erkrankt» verwenden, wenn es dem Quellen-Kontext entspricht.

## Bekannte normalisierte Stellen

- `Home.tsx:364` — korrigiert 2026-05-05 (Cluster-4-S1-PR)

## Bekannte Ausnahmen (bewusst belassen)

- `Diagnostik.tsx` — klinischer Kontext, «erkrankt» zulässig
- EvidenceNotes mit direkten Quellen-Zitaten — unverändert lassen
```

---

## Abnahme-Kriterien

Nach dem PR sind folgende Punkte zu verifizieren:

1. `/genesung` — 50%-Zelle zeigt «... meist innerhalb von 10 bis 20 Jahren.»
2. `/buchempfehlungen#cat-eltern` — Aguirre-Eintrag am Ende der Eltern-Liste sichtbar, kein Highlight-Styling
3. `/` (Home) — Fachstelle-Sektion zeigt «betroffene Person»
4. `/verstehen` — Geschlecht-Abschnitt zeigt «klinisch werden Frauen häufiger diagnostiziert»
5. `_dev/STYLE-SPRACHREGELUNG.md` — Datei im Repository vorhanden
6. 178/178 Tests grün

---

## Was dieser PR nicht macht

- Keine Änderungen an Quellen.tsx (Aguirre kein Quellen-Beleg)
- Kein Konsistenz-Pass über alle .tsx-Dateien (Sitzung 2 oder später)
- Keine Architektur-Entscheide (Mythen, DSM-5, Selbsttest — Sitzung 2)
