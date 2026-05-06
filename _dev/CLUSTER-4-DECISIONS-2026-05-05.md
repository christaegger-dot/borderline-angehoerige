---
Datum: 2026-05-05
Quelle: Christa-Antworten auf Cluster-4-Mapping §9 (Sitzung 1)
Zweck: Verbindliche Entscheid-Dokumentation für Sitzung 1. Kein Code-Edit ohne diese Bestätigung.
Status: BESTÄTIGT — Sitzung 1 freigegeben
---

# Cluster 4 — Decisions Sitzung 1

## Sitzungs-Modell

**Entscheid #16:** Modell II — zwei Sitzungen nach Aufwand.
Sitzung 1: niedrige Hängefrucht (~30 Min). Sitzung 2: Editorial-Arbeit (Mythen, DSM-5, Selbsttest).

---

## Entscheide Sitzung 1

### #6 — Recovery-Zeit (`/genesung`)

**Entscheid:** Option A — Zeitangabe direkt in der 50%-Zelle ergänzen.

Konkret: Die 50%-`<dd>` in `Genesung.tsx` erhält einen Zeitrahmen-Zusatz.
Aktueller Text: «erreichen eine umfassendere Genesung mit funktioneller Stabilität.»
Neuer Text: «erreichen eine umfassendere Genesung mit funktioneller Stabilität — meist innerhalb von 10 bis 20 Jahren.»

Quelle: Zanarini et al. (2010, 2012) — bereits in der bestehenden EvidenceNote verlinkt, kein neuer Quellenbeleg nötig.

---

### #13 — Aguirre 2014 (Buchempfehlungen)

**Entscheid:** Option A — Zur Kategorie «Für Eltern» hinzufügen.

Eintrag-Daten:

- `title`: "Borderline Personality Disorder in Adolescents"
- `author`: "Blaise Aguirre"
- `publisher`: "Fair Winds Press"
- `year`: "2014"
- `description`: "Englischsprachiges Standardwerk zu BPS bei Jugendlichen. Erklärt Entstehung, Diagnose und Behandlung aus der Perspektive von Eltern und Fachpersonen. Aguirre leitet das McLean-Hospital-Programm für Adoleszente (Zanarini-Standort)."
- `forWhom`: "Eltern, deren Kind (Jugendliche) betroffen ist"
- `highlight`: false (siehe #14)
- `shopLink`: optional, kein Pflichtfeld

Position: Am Ende der «Für Eltern»-Liste, nach dem bestehenden letzten Eintrag.

---

### #14 — Aguirre `highlight: true`

**Entscheid:** Nein — kein Highlight.

Begründung für Brief: Trasselli ist Highlight, weil es das einzige DBT-Familienskills-Buch auf Deutsch ist. Aguirre füllt eine Lücke, ist aber nicht das einzige englischsprachige Adoleszenz-Werk. Kein Highlight.

---

### #15 — Aguirre in `Quellen.tsx`

**Entscheid:** Nein — kein Eintrag in Quellen.tsx.

Begründung für Brief: Aguirre ist eine Leseempfehlung, kein Seiten-Beleg. Mason & Kreger stehen in Quellen, weil sie als direkte Quellen-Belege für Seiteninhalte dienen. Quellen.tsx nicht aufblähen.

---

### #11 — Sprachregelung

**Entscheid:** Option B — `_dev/STYLE-SPRACHREGELUNG.md`-Memo (intern).

Inhalt des Memos:

- Primäre Formulierung: «betroffene Person» (nicht «erkrankte Person»)
- Begründung: «erkrankt» impliziert einen passiven, dauerhaften Krankheitszustand; «betroffen» ist offener und entspricht dem Entstigmatisierungs-Framing der Site
- Ausnahmen: Medizinische/klinische Kontexte (z.B. EvidenceNotes, Diagnostik-Seite) dürfen «erkrankt» verwenden, wenn es dem Quellen-Kontext entspricht
- Bekannte Ausreisser: `Home.tsx:364` (wird mit #12 korrigiert)

---

### #12 — Home.tsx:364 normalisieren

**Entscheid:** Ja — «erkrankte Person» → «betroffene Person».

Datei: `client/src/pages/Home.tsx`, Zeile 364.
Aktuell: «Die Fachstelle Angehörigenarbeit berät auch Sie – nicht nur die erkrankte Person.»
Neu: «Die Fachstelle Angehörigenarbeit berät auch Sie – nicht nur die betroffene Person.»

---

### #5 — Geschlechterverteilung Wortlaut (`/verstehen`)

**Entscheid:** Kurz-neutral.

Aktueller Text (Verstehen.tsx ~Zeile 800):
«Borderline kann Menschen aller Geschlechter betreffen. Männer suchen teilweise später Hilfe oder werden mit anderen Problembildern gelesen, etwa Substanzkonsum, Wut oder Rückzug. Angehörige männlicher Betroffener sind hier ausdrücklich mit gemeint.»

Neuer Text:
«Borderline kommt bei allen Geschlechtern vor — klinisch werden Frauen häufiger diagnostiziert. Männer suchen teilweise später Hilfe oder werden mit anderen Problembildern gelesen, etwa Substanzkonsum, Wut oder Rückzug. Angehörige männlicher Betroffener sind hier ausdrücklich mit gemeint.»

Änderung: Erster Satz erhält die Diagnose-Häufigkeits-Aussage als Ergänzung. Rest bleibt unverändert.

---

## Nicht in Sitzung 1 (Sitzung 2)

Die folgenden Rückfragen werden in Sitzung 2 behandelt:

- #1 Mythen-Sektion-Architektur
- #2 Mythen-Inhalt
- #3 Mythen-Sub-Nav
- #4 Geschlechterverteilung Architektur
- #7 DSM-5-Kriterien Architektur
- #8 DSM-5 vs. ICD-11
- #9 Selbsttest Frage 3
- #10 Selbsttest UX (8 Fragen)

---

## Nächster Schritt

Brief für Claude Code liegt in `_dev/CLUSTER-4-SITZUNG-1-BRIEF-2026-05-05.md`.
