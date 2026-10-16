# Audit 03 · Sprache, Tonalität, Empathie und Verständlichkeit · Lauf 2026-10-16-modul-03-r4-35

Dieser Ordner enthält die Nachweise des Audits 03 vom 16. Oktober 2026. Den Auftrag gab die Auftraggeberin um 17:26 MESZ: «Führe ein vollständiges und unabhängiges Audit 03 – Sprache, Tonalität, Empathie und Verständlichkeit der gesamten Website durch.» Das Modul ist `modul-03` aus `.agents/skills/website-audit/SKILL.md`. Diese Datei, `auftrag/` und `werkzeug/` hat die bauende Sitzung geschrieben. Die übrigen Dateien stammen von den Prüfsitzungen; nachgebessert wurden sie nach den Reviews zu #700 und #701, siehe unten.

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
| `werkzeug/` | Lesefassung mit Fundstellen (`textfassung_v2.py`), seitenweite Texte (`seitenweit.py`, `_seitenweit.md`), Kennzahlen (`kennzahlen_v2.py`, Ausgangswerte), mechanische Prüfung der Teil-CSV (`pruefe_teil.py`) |
| `arbeit/` | Auswahl aus der Arbeit der Konsolidierung: Simulation, Gegenprobe mit Ergebnis, Wortveränderung je Befund, Kennzahlenvergleich |

## Pfade in den Berichten

Die Berichte nennen Pfade im Scratchpad der Sitzung, meist abgekürzt als `S/…`, `S` steht für `/tmp/claude-0/…/scratchpad/a03`. Das Scratchpad wird nach der Sitzung abgebaut. Im Repository entsprechen ihm:

| im Bericht | hier |
| --- | --- |
| `S/ergebnis/2026-10-16-modul-03-r4-35/` | dieser Ordner |
| `S/teile/` | `teile/` |
| `S/AUFTRAG.md`, `S/KONSOLIDIERUNG.md` | `auftrag/` |
| `S/werkzeug/` | `werkzeug/` |
| `S/ergebnis/arbeit/` | `arbeit/` (Auswahl) |
| `S/text-v2/<seite>.md`, `S/ergebnis/arbeit/text-neu/` | nicht abgelegt; die Lesefassung der Seiten lässt sich neu erzeugen, siehe unten |
| `S/text/_seitenweit.md`, `S/text-v2/_seitenweit.md` | `werkzeug/_seitenweit.md` (ohne interne Suchdaten, siehe unten) und Erzeuger `werkzeug/seitenweit.py` |
| `S/leitlinien/` | Design-System-Artefakt «PUK Zürich Website-Profil», Fassung `1792129173-abbb`, `project/guidelines/` |

## Wiederholen

```sh
python3 -I audit-results/2026-10-16-modul-03-r4-35/werkzeug/textfassung_v2.py . /tmp/text-v2
python3 -I audit-results/2026-10-16-modul-03-r4-35/werkzeug/kennzahlen_v2.py /tmp/text-v2
python3 -I audit-results/2026-10-16-modul-03-r4-35/werkzeug/kennzahlen_v2.py --abschnitte /tmp/text-v2 krise
```

`textfassung_v2.py` braucht BeautifulSoup 4. Die Ausgangswerte für `ff5016b` stehen in `werkzeug/kennzahlen-ff5016b-v2.csv`. Die Lesefassung nummeriert die Blöcke je Abschnitt (`§n`); daraus sind die Fundstellen der Befunde.

**Seitenweite Texte.** `textfassung_v2.py` liest nur die 23 Seiten. Die seitenweiten Texte (Titel, Navigation, Seitenbeschreibungen, `primaryTask`, Kopf und Fusszeile, Bedientexte aus `interaktion.js`) erzeugt `werkzeug/seitenweit.py`:

```sh
python3 -I audit-results/2026-10-16-modul-03-r4-35/werkzeug/seitenweit.py . /tmp/_seitenweit.md
```

Die erste Zeile nennt den Stand; ohne `--stand <text>` ist das der Commit, auf dem das Skript läuft.

`werkzeug/_seitenweit.md` ist mit `--stand "ff5016b, r4-35"` erzeugt und unterscheidet sich in einem Punkt von der Datei, mit der der Lauf gearbeitet hat:
- **Weggelassen:** 49 Zeilen im Abschnitt zu `interaktion.js`, nämlich Zeichenketten nur aus Kleinbuchstaben.
- **Was sie sind:** interne Suchdaten (Stoppwörter, Suchwendungen, darunter Wendungen zu Gewalt und Suizid aus den Suchregeln). Niemand sieht oder hört sie, und das Audit hat sie nicht bewertet. Die Befunde A03-218 und A03-219 betreffen Statustexte, und die bleiben in der Datei.
- **Was bleibt:** die sieben Bedientexte, z. B. «Keine passenden Inhalte gefunden.».

Die Datei des Laufs entsteht Byte für Byte mit:

```sh
python3 -I audit-results/2026-10-16-modul-03-r4-35/werkzeug/seitenweit.py . /tmp/_seitenweit-lauf.md --stand "ff5016b, r4-35" --mit-suchdaten
```

`authoring/tools/search-index.mjs` ist darin nicht enthalten. Die Konsolidierung hat es direkt im Quelltext gelesen (A03-220).

**Mechanische Prüfung der Teil-CSV.**

```sh
python3 -I audit-results/2026-10-16-modul-03-r4-35/werkzeug/pruefe_teil.py audit-results/2026-10-16-modul-03-r4-35/teile/G1-befunde.csv
```

Das Skript findet das Repository selbst, ab seinem eigenen Ordner oder dem Arbeitsverzeichnis; sonst gilt `--repo <pfad>`, an beliebiger Stelle im Aufruf. Es sucht in den Seiten, in `site.config.json`, `interaktion.js` und `search-index.mjs`.

Teilbefunde, die mehrere Fundstellen in einem Feld verbinden («§25: … §26: …») oder eine Code-Vorlage umschreiben («Vorlage: … → z. B. …»), meldet es als «nicht wörtlich gefunden». Für G1 bis G6 sind das 24, und genau diese sind zu erwarten:

| Datei | erwartet «nicht wörtlich gefunden» |
| --- | --- |
| `G1-befunde.csv`, `G2-befunde.csv` | keine |
| `G3-befunde.csv` | G3-003, G3-005, G3-022 |
| `G4-befunde.csv` | G4-002, G4-003, G4-007, G4-008, G4-010 |
| `G5-befunde.csv` | G5-001, G5-006, G5-007, G5-021 |
| `G6-befunde.csv` | G6-005, G6-007, G6-009, G6-010, G6-012, G6-014, G6-016, G6-020, G6-021, G6-022, G6-023, G6-024 |

Die Konsolidierung hat diese Teilbefunde in `BEFUNDE.csv` je Fundstelle aufgeteilt, und dort steht jedes Original wörtlich in der Quelle; das prüft `arbeit/pruefe_befunde.py`.

## Nachbesserung nach dem Codex-Review von #700

#700 wurde gemergt, bevor das Codex-Review fertig war. Es meldete sechs P2-Befunde zu diesen Nachweisen, keinen zur Website.
- **Werkzeuge, behoben von der bauenden Sitzung** (`e4ce9a4`): `pruefe_teil.py` hat keinen festen Pfad mehr und liest `search-index.mjs` mit; `_seitenweit.md` und sein Erzeuger `seitenweit.py` sind abgelegt.
- **Befunde, nachgebessert von der Konsolidierung** (`d5706c7`):
  - eine Spalte `quelle` je Befund, mit Kürzeln in `QUELLEN.csv`;
  - fachlicher Prüfbedarf für elf Befunde in Sicherheits- und Schutztexten, deren Ersatzfassung Verbindlichkeit oder Zuständigkeit verschiebt (z. B. A03-108, A03-122 bis A03-124);
  - eigene Begründungen und Akzeptanzkriterien für aufgeteilte Befunde (z. B. A03-217);
  - Skripte in `arbeit/` ohne feste Pfade.

  Die Einzelheiten stehen in `BERICHT.md`, Abschnitt 10.

## Nachbesserung nach dem Review zu #701

Auf #701 scheiterte das Codex-Review am Nutzungslimit. An seiner Stelle prüfte auf Entscheid der Auftraggeberin eine eigene Review-Sitzung, die an Audit 03 nicht mitgearbeitet hat. Ihr Urteil auf `98e33ad` war «nicht mergen»: ein P1, drei P2, sieben P3.
- **Werkzeuge, diese Datei und Pendenzen, behoben von der bauenden Sitzung** (`033f7d5` und der Commit danach):
  - `seitenweit.py`: Der Stand ist nicht mehr fest eingetragen, interne Suchdaten fallen standardmässig weg, und `_seitenweit.md` ist neu abgelegt (siehe «Wiederholen»).
  - `pruefe_teil.py`: `--repo` an beliebiger Stelle; ohne Argument bricht das Skript mit einer Meldung ab. Die erwarteten Treffer stehen oben.
  - In diesem LIESMICH: Urheberschaft, Scratchpad und Zahlen.
  - In den Pendenzen: Die Zeitangabe zum Merge von #700 ist belegt.
- **Befunde, nachgebessert von der Konsolidierung** (`b42a46a`):
  - `QUELLEN.csv` ist korrekt gequotet (P1). `arbeit/pruefe_befunde.py` prüft jetzt die Spaltenzahl und die Zeilenenden aller CSV im Ordner.
  - A03-121 hat fachlichen Prüfbedarf; damit sind es 39 (30 fachlich, 9 Recht).
  - A03-119 und A03-120 haben ein Akzeptanzkriterium mit zwei Zweigen.
  - A03-147, A03-188 und A03-189: `bedeutung_erhalten` ist bereinigt.
  - Wortangaben und Sprachprofil sind nachgeführt.

  Die Einzelheiten stehen in `BERICHT.md`, Abschnitt 10, Teil «Nach dem Review statt Codex zu #701».

`werkzeug/kennzahlen-ff5016b-v2.csv` hat als einzige CSV im Ordner LF statt CRLF. So gibt `kennzahlen_v2.py` sie aus, Byte für Byte; `arbeit/pruefe_befunde.py` meldet das als Hinweis.

## Korrektur am Auftrag

`auftrag/AUFTRAG.md` sagt, `primaryTask` erscheine auf der Suchseite. Das ist falsch. G6 hat festgestellt, dass es nur im unsichtbaren Suchindex steht. Der Auftrag der Konsolidierung hält das fest, und `PRUEFUMFANG.md` gibt es richtig wieder.

## Was offen ist

Siehe `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`, Pendenz A03-R35:
- Entscheid über die Wortziele aus Release C;
- Freigabe des Wortlauts, paketweise nach `BERICHT.md`, Abschnitt 5;
- vorher Klärung des fachlichen und rechtlichen Prüfbedarfs (39 Befunde: 30 fachlich, 9 Recht, Stand nach dem Review zu #701);
- Freigabe des Sprachprofils.
