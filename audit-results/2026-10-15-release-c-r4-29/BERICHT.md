# Release C · Struktur, Kürzung und Eltern von Jugendlichen (r4-29)

## Ergebnis

r4-29 setzt die Pakete 4 und 6 des Massnahmenplans vom 14. Oktober 2026 um, ausserdem die Befunde W2-001 bis W2-023 und die Entscheide E4, E7 und E9 vom 15. Oktober 2026. Im Einzelnen:

- eine neue Seite «Wenn Ihr jugendliches Kind betroffen ist»
- ein Rollenblock und ein Abschnitt zu riskanten Entscheidungen auf «Grenzen setzen»
- ein eigener Abschnitt «Wenn die Person keine Behandlung möchte oder abbricht» auf «Behandlung»
- die Anspannungskurve als einziges Eskalationsmodell
- der Zuständigkeitssatz im Text nur noch auf sieben Seiten je einmal
- die neue Selbstbeschreibung in der Fusszeile

Die Website hat 30 666 Wörter, bisher 35 422 (Ziel ≤ 33 000).

Die Auftraggeberin hat die Fassungen am 15. Oktober 2026 im Namen der PUK freigegeben. Für Release C gibt es keine Prüfung durch den Rechtsdienst. Die rechtsnahen Sätze hat eine unabhängige Sitzung gegen den Gesetzeswortlaut abgeglichen. Die Belege:

- `FREIGABE.md` mit Nachtrag 1 (W3) und Nachtrag 2 (R3)
- `FREIGABE-VORLAGE.md` (F0 bis F14) und `WORTLAUT.md` (Wortlaut)
- `RECHTSABGLEICH.md`

R3 lautet «Go mit Auflagen» (`R3-BERICHT.md`), und die PUK hat das angenommen. Vor dem Merge stehen noch zwei Schritte aus: das Codex-Review und der ausdrückliche Auftrag zum Merge (R3C-A5).

## 1 · Status der Prüfstufen für r4-29 (R3C-A1)

Laut Massnahmenplan vom 14.10.2026, Abschnitt «Fachliche Freigabe» (Claude Docs, Projekt 2706826d-23c5-439f-9394-a8bb9de52a8c, nicht im Repository): «Vor Release C: Sprach-Review S über alle in A bis C geänderten Texte, danach W3 und R3 (Go/No-Go); R2 für die neue Abbildung aus M2.6.» Die Reihenfolge war W2, dann die Pakete 4 und 6, dann S, dann W3 und zuletzt R3.

| Stufe | Status | Datum | Sitzung und Beleg |
| --- | --- | --- | --- |
| W1 Fachliche Prüfung | entfällt: Release C kürzt und verschiebt Inhalt, den W1 am Stand r4-24 geprüft hat. Die neuen Sachaussagen stehen auf der neuen Seite und in den Rechtssätzen. Gedeckt sind sie durch den Rechtsabgleich, die Wortlautvorlage und die Freigabe der PUK. Bestätigt von der Fachstelle am 15.10.2026, 11.59 Uhr (`FREIGABE.md`, Nachtrag 2). | 15.10.2026 | W1 des Bestands: `2026-10-14-inhalt-w1-r4-24/` |
| W2 Gesamtkohärenz | erledigt | 15.10.2026 | eine Prüfsitzung (Claude, hat nicht gebaut), Stand `02dba06`: `2026-10-15-struktur-w2-r4-28/`. Befunde: 22 von 23 umgesetzt, W2-017 teilweise (`BEFUNDE.csv`) |
| S Sprach-Review | erledigt | 15.10.2026 | drei Prüfsitzungen s1 bis s3 auf getrennten Seiten (Claude, haben nicht gebaut), Stand `f5d3d74`: `2026-10-15-sprache-s-r4-29/`. Auf «Quellen» hat keine S-Sitzung gelesen (R3C-07); die Änderungen dort sind wörtlich freigegeben. |
| Rechtsabgleich (statt Rechtsdienst) | erledigt | 15.10.2026 | eine Prüfsitzung (Claude, hat nicht gebaut), Stand `3e63cce`: `RECHTSABGLEICH.md`; F1 bis F5 umgesetzt |
| Visualisierungs-Check | **offen**, Auflage R3C-A8 mit Frist 31.10.2026. Release C ändert den Wortlaut von 12 der 13 Abbildungen; die Form bleibt. | – | – |
| Bedienung und Barrierefreiheit | erledigt (automatisiert). Reale Screenreader-, Tastatur- und Touchtests sind eine dauerhaft akzeptierte Einschränkung (AR3-3, `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`). | 15.10.2026 | W3, Abschnitt 9: axe in 46 Läufen, Tastatur, Fokus. Bauende Sitzung am Kandidaten: 184 Layout- und axe-Läufe (Abschnitt 3). R3, Punkte 15, 18 und 21. |
| W3 Code-Review | erledigt; Korrekturen nach Freigabe umgesetzt (`FREIGABE.md`, Nachtrag 1) | 15.10.2026 | eine Prüfsitzung (Claude, hat nicht gebaut), Stand `40474e0`: `W3-BERICHT.md`. Die Korrekturen in `32afa3f` hat R3 nachgeprüft (R3, Abschnitt 4.3). |
| R1 Profil-Audit | entfällt: Release C ändert keine Profilkomponente. Neu sind Navigationsnamen, Fusszeilentext, die Zahl der Verweise im Text und die Website-Tabelle `.bl-tabelle`. R3 hält R1 vom 13.10.2026 für ausreichend (R3, Abschnitt 5.1). Bestätigt von der Fachstelle am 15.10.2026, 11.59 Uhr. | 15.10.2026 | R1 vom 13.10.2026: `authoring/PRUEFBERICHT.md`, «R1 Profil-Audit» |
| R2 Visualisierung und Laienverständlichkeit | **offen**, Auflage R3C-A8 mit Frist 31.10.2026; dazu `v-ge-forschung` (R27-O02, seit r4-27) | – | R2 vom 13.10.2026 umfasst 10 Figuren und reicht für Release C nicht (R3, Abschnitt 5.1) |
| R3 Freigabe-Audit | erledigt: «Go mit Auflagen», von der PUK am 15.10.2026, 11.59 Uhr angenommen | 15.10.2026 | eine Prüfsitzung (Claude, hat nicht gebaut), Stand `a7c5ec1`: `R3-BERICHT.md` |
| Produktionsprüfung | offen, am Tag des Merge (R3C-A6) | – | – |

## 2 · Änderungen

- **Eltern von Jugendlichen (Paket 4, E4):**
  - Die neue Seite `jugendliche.html` hat 898 Wörter (Ziel ≤ 900). Sie enthält Rolle und elterliche Sorge, Abklärung vor dem 18. Geburtstag, Vertraulichkeit und Auskunft auch ab 18, Grenzen im Familienalltag, Geschwister und Unterstützung.
  - Die bisher verstreuten Sätze zu Minderjährigen sind durch Verweise ersetzt.
  - Neu verweisen der Startseiteneintrag und «Kurz und klar» (M4.1) auf die Seite.
  - Die KJPP-Abstimmung bleibt offen (F0, R29-P03).
- **Kürzung und Struktur (Paket 6, W2):**
  - Auf «Behandlung» ist die Reihenfolge umgebaut, nichts ist mehr eingeklappt; neu ist der Abschnitt «Wenn die Person keine Behandlung möchte oder abbricht».
  - «Ihre Rolle klären» ist auf 1981 Wörter gekürzt; «Schuld» ist der kanonische Ort.
  - «Grenzen setzen» hat Rollen mit fünf Rollen und riskante Entscheidungen.
  - «Zugewandt und klar sprechen» ist auf 2421 Wörter gekürzt und hat eine Tabelle mit den sechs Stufen der Validierung.
  - «Krisen begleiten» hat eine neue Reihenfolge, die Anker #selbstverletzung und #krisenplan und gekürzte Vorbehalte.
  - «Auf sich achten» ist gekürzt.
  - «Fragen und Nachschlagen» hat 2397 Wörter, zwei Antworten bleiben immer offen.
  - «Diagnose» hat einen eigenen Abschnitt «Suizidgedanken und Selbstverletzung».
- **Website als Ganzes:**
  - E7: Der Verweis im Text steht 7-mal statt 28-mal.
  - E9: höchstens ein Vorbehalt und ein Entlastungssatz je Abschnitt.
  - Seitentitel stehen in allen Verweisen, Beratungslinks gehen direkt auf «Unterstützung finden».
  - Navigation: «Unterstützung», «Fragen und Nachschlagen».
  - Fusszeile: «Sie richtet sich an Angehörige und Bezugspersonen und ergänzt die Beratung der Fachstelle.»
- **Freigabe:** F1 bis F14 aus der Vorlage, davon F1 bis F5 aus dem Rechtsabgleich. F14 ist in der Ausweichfassung umgesetzt (`FREIGABE.md`).
- **W3-Korrekturen** (`32afa3f`):
  - Suche: Umlaute, Rückfallstufe, Gewalt-Wortfeld
  - Sprungziele in eingeklappte Abschnitte
  - Gate-Prüfung «fold-config»
  - Datum der Erklärung zur Barrierefreiheit
  - drei Alias-Anker
- **Werkzeuge:** `authoring/tools/wortbilanz.mjs` (Zählregel vom 15.10.2026); FAQ-Faltung mit `openFaqIds` in `contract.js`.

## 3 · Technischer Nachtest am Release-Kandidaten (`a7c5ec1`, `site/`)

| Prüfung | Ergebnis |
| --- | --- |
| Produktionsbuild `--production --out=site --write-site` | 23 Seiten, 0 Blocker, 0 Hinweise |
| Parität `--production --verify-site` | 34 Dateien byte-gleich, auch nach dem Eintrag von R3 in `reviewScope` |
| Layout und axe (23 Seiten, 320, 768, 1024 und 1440 px, Text 100 und 200 %) | 184 von 184 Läufen ohne Überlauf, ohne axe-Verstoss, ohne JS-Fehler |
| Sprungziele aus anderen Seiten (Deep Links) | 13 von 13 mit Anker sichtbar am Ziel |
| Sprungziele direkt, inkl. eingeklappte und Alias-Anker | 32 von 32 sichtbar und offen (320 und 1280 px); Simulation ohne natives Aufklappen: Ziel im Sichtbereich |
| Ohne JavaScript | 7 Seiten ohne Überlauf |
| Suche mit echtem `interaktion.js`, 116 Anfragen | 0 ohne Treffer (bisher 11). Von den 91 bisherigen Testanfragen sind genau die 19 beabsichtigten Ersttreffer geändert (`FREIGABE-VORLAGE.md`, Teil 4). |
| Gate-Gegenprobe «fold-config» | mit zwei Tippfehlern 2 Blocker, korrekt 0 |
| Zuständigkeit | Verweis im Text je einmal auf `diagnose`, `grenzen`, `kinder`, `kommunizieren`, `krise`, `kurz`, `verstehen`; 0 `tel:`, 0 «Notruf» |
| Quellenabgleich | 82 Einträge, 0 Abweichungen |
| Tabelle `.bl-tabelle` | bei 320 px gestapelt mit Beschriftung, bei 1440 px drei Spalten (Bildschirmfotos angesehen) |

## 4 · Wortbilanz (mit Quellenblock)

| Seite | r4-28 | r4-29 | Ziel |
| --- | --- | --- | --- |
| Zugewandt und klar sprechen | 3653 | 2421 | < 2800 |
| Ihre Rolle klären | 3251 | 1981 | < 2000 |
| Behandlung und Ihre Rolle darin | 3476 | 2399 | < 2400 |
| Auf sich achten | 2928 | 2257 | < 2300 |
| Krisen begleiten | 2014 | 1792 | ≤ 1800 |
| Grenzen setzen | 1994 | 2199 | ≤ 2200 |
| Fragen und Nachschlagen | 3067 | 2397 | ≤ 2400 |
| Wenn Ihr jugendliches Kind betroffen ist | – | 898 | ≤ 900 |
| Website (ohne Quellen, Suche, 404) | 35 422 | 30 666 | ≤ 33 000 |

Gewachsen sind nur die Startseite (352 → 383: zwei neue Einstiege und die Selbstbeschreibung) und «Kurz und klar» (415 → 418, M4.1).

## 5 · Offene Punkte

- **Vor dem Merge:** Codex-Review abschliessen und prüfen, ausdrücklicher Merge-Auftrag (R3C-A5).
- **Am Tag des Merge:** Produktionsprüfung r4-29 (R3C-A6).
- **r4-30 direkt nach dem Merge** (Entscheid vom 15.10.2026):
  - Suchlücken schliessen (R3C-A9): «Selbstmordgedanken», «Selbstmordversuch», «lebensmüde», «Todeswunsch», «Suizidandrohung», «Überdosis» u. a.; Drohung gegen die eigene Person vor der Suizidgruppe auswerten.
  - Die drei Links auf «Quellen» entfernen, die auf Seiten mit Notfallblock führen (R3C-A10).
  - Dazu W3C-12, die Leistung der Suche.
- **Mit Frist:**
  - Visualisierungs-Check und R2 für die geänderten Abbildungen und `v-ge-forschung` bis 31.10.2026 (R3C-A8)
  - Selbsttest des Gates und Bindung von R3 an die Änderungsrunde bis 13.11.2026 (R3C-A11)
- **Pendenzen:** R29-P01 bis R29-P17 in `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`.

## 6 · Evidenzgrenzen

- Keine juristische Prüfung; der Rechtsabgleich vergleicht nur den Gesetzeswortlaut.
- Keine Abstimmung mit der KJPP.
- Alle Browsertests liefen nur in Chromium. WebKit, Firefox, Screenreader und Geräte wurden nicht geprüft (AR3-3).
- Für die Silbentrennung fehlt das Trennwörterbuch.
- Die Ziel-Adresse wird erst nach dem Merge geprüft.
