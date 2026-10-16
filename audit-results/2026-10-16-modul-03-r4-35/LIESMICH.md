# Audit 03 · Sprache, Tonalität, Empathie und Verständlichkeit · Lauf 2026-10-16-modul-03-r4-35

Dieser Ordner enthält die Nachweise des Audits 03 vom 16. Oktober 2026. Den Auftrag gab die Auftraggeberin um 17:26 MESZ: «Führe ein vollständiges und unabhängiges Audit 03 – Sprache, Tonalität, Empathie und Verständlichkeit der gesamten Website durch.» Das Modul ist `modul-03` aus `.agents/skills/website-audit/SKILL.md`. Diese Datei hat die bauende Sitzung geschrieben; alle anderen Dateien stammen unverändert von den Prüfsitzungen.

## Wer geprüft hat

- **Sechs Teilprüfungen G1 bis G6**, je eine eigene Sitzung mit einer Seitengruppe. Keine dieser Sitzungen hat die Website gebaut oder korrigiert.
- **Eine Konsolidierung**, ebenfalls eine eigene Sitzung, die an G1 bis G6 nicht mitgearbeitet hat. Sie hat:
  - jeden Befund nachgeprüft;
  - jede Ersatzfassung gegengeprüft (bestanden, überarbeitet oder verworfen);
  - eine Gegenprobe zum Lesefluss gemacht;
  - die Wirkung der Ersatzfassungen simuliert;
  - Bericht und Sprachprofil geschrieben.
- **Die bauende Sitzung** hat:
  - die Aufträge (`auftrag/`) und die Werkzeuge (`werkzeug/`) geschrieben;
  - die Seiten verteilt;
  - die Ergebnisse mechanisch geprüft: Spalten, IDs, Fundstellen, Originale im Quelltext, Repository unverändert.

  Inhaltlich bewertet hat sie nichts.

## Stand

- **Geprüft:** Commit `ff5016b` (Build r4-35, PR #699). Während des Audits wurde #699 gemergt, am 16.10.2026 um 16:57:03 UTC (Merge-Commit `8bbc8aa`). Der Inhalt ist gleich, `git diff ff5016b 8bbc8aa` ist leer.
- **Live:** Der geprüfte Stand ist der, der seither veröffentlicht ist. Die Angabe «noch nicht gemergt» in `METADATEN.json` gilt für die Zeit der Prüfung.
- **Repository:** Während des Audits war es unverändert. Vorher und nachher waren 205 Dateien in `authoring/`, `site/` und `audit-results/` SHA-gleich. Die Ergebnisse lagen bis zum Auftrag «Leg los» (16.10.2026, 19:33 MESZ) nur im Scratchpad.

## Inhalt

| Pfad | Inhalt |
| --- | --- |
| `BERICHT.md` | Gesamtbewertung, Ergebnis je Qualitätsziel und je Seite, Muster M-01 bis M-12, priorisierte Massnahmen, Kennzahlen vorher und nachher, Wortziele, Verworfenes, Lücken |
| `SPRACHPROFIL.md` | Sprach- und Tonalitätsprofil der Website; verbindlich nach Freigabe durch die Fachstelle |
| `BEFUNDE.csv` | 182 Befunde A03-039 bis A03-220 mit Original, Problem, Ersatzfassung und Gegenprüfung (Semikolon, UTF-8) |
| `PRUEFUMFANG.md`, `TESTMATRIX.csv`, `QUELLEN.csv`, `METADATEN.json` | Pflichtdateien nach Audit-Skill |
| `teile/` | Teilbefunde und Teilberichte von G1 bis G6, mit vorläufigen IDs (`G1-001` …) |
| `auftrag/` | gemeinsamer Auftrag (`AUFTRAG.md`) und Auftrag der Konsolidierung (`KONSOLIDIERUNG.md`) |
| `werkzeug/` | Lesefassung mit Fundstellen (`textfassung_v2.py`), Kennzahlen (`kennzahlen_v2.py`, Ausgangswerte), mechanische Prüfung der Teil-CSV |
| `arbeit/` | Auswahl aus der Arbeit der Konsolidierung: Simulation, Gegenprobe mit Ergebnis, Wortveränderung je Befund, Kennzahlenvergleich |

## Pfade in den Berichten

Die Berichte nennen Pfade im Scratchpad der Sitzung, meist abgekürzt als `S/…`, `S` steht für `/tmp/claude-0/…/scratchpad/a03`. Das Scratchpad besteht nach der Sitzung nicht mehr. Im Repository entsprechen ihm:

| im Bericht | hier |
| --- | --- |
| `S/ergebnis/2026-10-16-modul-03-r4-35/` | dieser Ordner |
| `S/teile/` | `teile/` |
| `S/AUFTRAG.md`, `S/KONSOLIDIERUNG.md` | `auftrag/` |
| `S/werkzeug/` | `werkzeug/` |
| `S/ergebnis/arbeit/` | `arbeit/` (Auswahl) |
| `S/text-v2/`, `S/ergebnis/arbeit/text-neu/` | nicht abgelegt; die Lesefassung lässt sich neu erzeugen, siehe unten |
| `S/leitlinien/` | Design-System-Artefakt «PUK Zürich Website-Profil», Fassung `1792129173-abbb`, `project/guidelines/` |

## Wiederholen

```sh
python3 -I audit-results/2026-10-16-modul-03-r4-35/werkzeug/textfassung_v2.py . /tmp/text-v2
python3 -I audit-results/2026-10-16-modul-03-r4-35/werkzeug/kennzahlen_v2.py /tmp/text-v2
python3 -I audit-results/2026-10-16-modul-03-r4-35/werkzeug/kennzahlen_v2.py --abschnitte /tmp/text-v2 krise
```

`textfassung_v2.py` braucht BeautifulSoup 4. Die Ausgangswerte für `ff5016b` stehen in `werkzeug/kennzahlen-ff5016b-v2.csv`. Die Lesefassung nummeriert die Blöcke je Abschnitt (`§n`); daraus sind die Fundstellen der Befunde.

## Korrektur am Auftrag

`auftrag/AUFTRAG.md` sagt, `primaryTask` erscheine auf der Suchseite. Das ist falsch. G6 hat festgestellt, dass es nur im unsichtbaren Suchindex steht. Der Auftrag der Konsolidierung hält das fest, und `PRUEFUMFANG.md` gibt es richtig wieder.

## Was offen ist

Siehe `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`, Pendenz A03-R35:
- Entscheid über die Wortziele aus Release C;
- Freigabe des Wortlauts, paketweise nach `BERICHT.md`, Abschnitt 5;
- vorher Klärung des fachlichen und rechtlichen Prüfbedarfs (27 Befunde);
- Freigabe des Sprachprofils.
