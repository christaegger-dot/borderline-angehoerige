# Prüfumfang · Audit 03 · Lauf 2026-10-16-modul-03-r4-35

Geprüft wurde der Stand `ff5016b` auf dem Branch `claude/a8k-korrektur-1792143386` (Build r4-35, PR #699). Bezug Produktion ist `baf366d`. Die Live-Website wurde nicht abgerufen. Grundlage sind die Quelltexte in `authoring/` und die daraus erzeugte Lesefassung `scratchpad/a03/text-v2/`, die jeden Block mit Abschnitt, Nummer und Rolle (Kernaussage, Kurztext, Beispiel, Vertiefung, Nur-Screenreader, Tabelle) ausweist.

## Seiten

Alle 23 Seiten wurden vollständig gelesen. Die Teilberichte nennen für jede Seite «Blöcke gelesen: x von x»; die Konsolidierung hat jede Zahl gegen die Lesefassung nachgezählt (Zeilen `- §n` je Datei). Alle 23 Angaben stimmen.

| Seite | Teilprüfung | Abschnitte | Blöcke Lesefassung | Blöcke gelesen | zusätzlich gelesen (laut Teilbericht) | Fliesstext v2 (Wörter / Sätze) | Befunde |
| --- | --- | ---: | ---: | ---: | --- | ---: | --- |
| index | G1 | 5 | 48 | 48 | 6 Attributtexte, Beschreibung | 346 / 43 | 2 (A03-039–040) |
| kurz | G1 | 5 | 45 | 45 | 3 Attributtexte | 343 / 45 | 3 (A03-041–043) |
| verstehen | G1 | 9 | 143 | 143 | 3 Nur-Screenreader-Texte, 3 Vertiefungen | 1611 / 145 | 7 (A03-044–050) |
| beziehungen | G1 | 12 | 108 | 108 | 2 Abbildungen, 2 Nur-Screenreader-Texte | 1471 / 133 | 5 (A03-051–055) |
| rolle | G2 | 10 | 134 | 134 | 7 Attributtexte, Sprungliste | 1576 / 150 | 12 (A03-056–067) |
| grenzen | G2 | 13 | 141 | 141 | 9 Attributtexte, Sprungliste | 1741 / 158 | 10 (A03-068–077) |
| diagnose | G2 | 8 | 125 | 125 | 4 Attributtexte, Sprungliste | 1511 / 120 | 5 (A03-078–082) |
| behandlung | G3 | 11 | 190 | 190 | 12 Attribute, 11 Texte nur im HTML | 1938 / 178 | 12 (A03-083–094) |
| kommunizieren | G3 | 9 | 159 | 159 | 4 Attribute, 10 Texte nur im HTML | 2076 / 192 | 12 (A03-095–106) |
| krise | G4 | 10 | 116 | 116 | Sprungliste, Attributtexte | 1392 / 132 | 12 (A03-107–118) |
| kinder | G4 | 7 | 67 | 67 | Sprungliste, 4 Attributtexte | 760 / 68 | 6 (A03-119–124) |
| jugendliche | G4 | 9 | 45 | 45 | Sprungliste, 6 Attributtexte | 660 / 46 | 4 (A03-125–128) |
| selbstfuersorge | G4 | 9 | 159 | 159 | Sprungliste, 6 Attributtexte | 1853 / 177 | 5 (A03-129–133) |
| genesung | G5 | 7 | 118 | 118 | 5 Attributtexte, Sprungliste | 1289 / 114 | 16 (A03-134–149) |
| unterstuetzung | G5 | 6 | 59 | 59 | 4 Attributtexte, Sprungliste | 676 / 62 | 5 (A03-150–154) |
| buecher | G5 | 2 | 104 | 104 | Sprungliste | 957 / 132 | 7 (A03-155–161) |
| fragen | G5 | 10 | 140 | 140 | 30 `aria-label`, Sprungliste | 1756 / 159 | 12 (A03-162–173) |
| begriffe | G6 | 2 | 94 | 94 | 9 `aria-label`, Texte nur im HTML | 1560 / 131 | 13 (A03-174–186) |
| quellen | G6 | 9 | 269 | 269 | 6 `aria-label`, Sprungliste | 141 / 13 | 11 (A03-187–197) |
| suche | G6 | 2 | 46 | 46 | Label, Platzhalter, 1 `aria-label` | 219 / 27 | 1 (A03-198) |
| ueber | G6 | 5 | 41 | 41 | 4 `aria-label`, Sprungliste | 546 / 47 | 2 (A03-199–200) |
| impressum-datenschutz | G6 | 3 | 35 | 35 | Adresse, 2 externe Linktexte | 570 / 48 | 2 (A03-201–202) |
| 404 | G1 | 1 | 3 | 3 | Aktionslink «Zur Startseite» | 16 / 2 | 0 |
| **Summe** | | **164** | **2389** | **2389** | | **25 008 / 2322** | **164** |

Die Spalte «Fliesstext v2» zählt nach `kennzahlen_v2.py` nur p, li, dd, td und blockquote, ohne Kicker, Figurtitel, Quellenliste und Nur-Screenreader-Texte. Auf «Quellen» sind das nur Einleitung und Einordnung; die kommentierten Literaturangaben stehen in der Quellenliste und werden nicht als Fliesstext gezählt, wurden aber gelesen.

## Seitenweite Texte

Geprüft von G6, nachgeprüft in der Konsolidierung. 18 Befunde (A03-203–220).

| Bereich | Umfang | Ergebnis |
| --- | --- | --- |
| `site.config.json`: Titel, Navigationsnamen, `description` (23), `primaryTask` (23), Fusszeile, Absender | 89 Felder | 15 Befunde zu Beschreibungen (M-07), Titel und Navigation ohne Befund |
| Kopf und Fusszeile zweier gebauter Seiten (`site/index.html`, `site/behandlung.html`), aus `authoring/tools/contract.js` | 74 Einträge, 10 Attribute | ohne Befund; Zuständigkeitsverweis nur Prüfbedarf (siehe Bericht, Abschnitt 7) |
| `authoring/js/interaktion.js` | 572 Zeilen vollständig | 2 Befunde (Zeilen 192 und 517) |
| `authoring/tools/search-index.mjs` | Trefferbeschriftung (Zeile 67) | 1 Befund |
| Stoppwort- und Synonymlisten der Suche (`_seitenweit.md`, Zeilen 206–254) | gelesen | interne Suchdaten, kein Lesetext |

### Was sichtbar ist und was nicht

- `description` ist sichtbar: als Auszug jedes Seitentreffers in der Website-Suche und als `og:description` in Linkvorschauen. Suchmaschinen zeigen sie wegen `noindex` derzeit nicht. Deshalb wurden alle 23 Beschreibungen als Lesetext geprüft.
- `primaryTask` ist **nicht** sichtbar und wird nicht vorgelesen. Es steht nur im unsichtbaren Suchindex (`data-search-text`) und beeinflusst, welche Treffer die Suche findet. `AUFTRAG.md` sagt, `primaryTask` erscheine auf der Suchseite; das trifft nicht zu. `primaryTask` erhielt deshalb keine Sprachbefunde. Ein Hinweis zu `genesung.primaryTask` steht im Bericht unter Prüfbedarf.
- Die Schrittsteuerung der Abbildungen («Ganzes Modell zeigen», «Schritt … von …») und der Reiter-Rückfall in `interaktion.js` kommen auf keiner Seite vor (`data-vis-build`, `data-puk-tabs`: 0 Treffer in `site/`) und wurden nicht als Lesetext bewertet.

## Was die Konsolidierung selbst geprüft hat

- jedes der 182 Originale wörtlich in der Quelle (HTML-Text, Attribute, `site.config.json`, `interaktion.js`, `search-index.mjs`), mit der Logik von `werkzeug/pruefe_teil.py`; Skript `ergebnis/arbeit/pruefe_befunde.py`;
- jede Ersatzfassung mit dem Block davor und danach in der Lesefassung;
- die Gegenprobe zum Lesefluss in 70 Abschnitten (Auswahl nach Kennzahlen, `ergebnis/arbeit/gegenprobe-ergebnis.csv`);
- den Musterabgleich über alle Seiten für M-01, M-09, M-10 und M-12 (Suche nach dem Muster im ganzen Text) und für die übrigen Muster beim Lesen;
- die Simulation aller Ersatzfassungen auf einer Kopie der Lesefassung (`ergebnis/arbeit/text-neu/`);
- bei der Nachbesserung vom 16.10.2026 (Codex-Review von #700): die Grundlage jedes Befunds (Spalte `quelle`, jedes Kürzel gegen `QUELLEN.csv`), jede Ersatzfassung in Sicherheits-, Schutz- und Rechtsabschnitten auf verschobene Verbindlichkeit oder Zuständigkeit und die geerbten Texte der aufgeteilten Befunde; nach dem Review statt Codex zu #701 zusätzlich die Spaltenzahl jeder Zeile in allen CSV des Ordners.

## Nicht geprüft

- kein Lesetest mit Angehörigen oder mit Menschen mit Borderline-Erfahrung;
- keine Vorlesung mit einem Screenreader; Nur-Screenreader-Texte und `aria-label` wurden als Text gelesen, nicht gehört;
- kein Rendering im Browser, keine Live-Website, keine Prüfung von Umbrüchen, Schriftgrössen oder mobiler Darstellung;
- kein Lesbarkeitsindex mit Normwerten (die Kennzahlen sind Hilfsgrössen ohne Schwellen);
- keine fachliche, rechtliche oder bibliografische Prüfung; wo eine Ersatzfassung Fachliches oder Recht berührt, steht Prüfbedarf;
- der Suchtest (`authoring/tools/suchtest.mjs`, 216 Anfragen) lief nicht; er gehört nach einer Umsetzung zu den nächsten Schritten;
- `primaryTask` (unsichtbar), interne Suchdaten, nicht verwendete Bedientexte (siehe oben);
- Bilder ohne Text: Die Zeichnungen der Abbildungen tragen `aria-hidden`; ihr Inhalt wurde nur über Kurztext und Nur-Screenreader-Text geprüft.
