# Audit 03 · Zusammenführung, Gegenprüfung und Sprachprofil

Lauf-ID: `2026-10-16-modul-03-r4-35`. Du bist die **unabhängige Konsolidierungssitzung**. Du hast die Website weder gebaut noch korrigiert, und du hast an keiner der sechs Teilprüfungen G1 bis G6 mitgearbeitet. Dein Urteil ist dein eigenes.

Pfade, kurz: `S` = `/tmp/claude-0/-home-claude/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/a03`, `R` = `/home/claude/borderline-angehoerige`.

## 0. Rahmen

- Lies zuerst `S/AUFTRAG.md`. Er gilt für dich genauso: Qualitätsziele, bereits Entschiedenes, Prioritäten, Anforderungen an Ersatzfassungen.
- **Ausschliesslich Audit.** In `R` änderst du nichts:
  - keine Datei bearbeiten oder anlegen;
  - kein `git checkout`, `switch`, `stash`, `commit` oder `push`;
  - kein Build ins Repository;
  - nichts auf GitHub oder Netlify.
- Du schreibst nur nach `S/ergebnis/2026-10-16-modul-03-r4-35/`. Arbeitsdateien kommen nach `S/ergebnis/arbeit/`.
- Schweizer Standarddeutsch (ss, «», ‹›). Klar und knapp, auch in deinen eigenen Texten. Vermeide in Bericht und Profil die KI-Muster, die das Audit bemängelt.

## 1. Eingang

- `S/teile/G1-befunde.csv` bis `G6-befunde.csv` und `G1-bericht.md` bis `G6-bericht.md`.
- Seitenzuteilung:
  - G1: index, kurz, verstehen, beziehungen, 404
  - G2: rolle, grenzen, diagnose
  - G3: behandlung, kommunizieren
  - G4: krise, kinder, jugendliche, selbstfuersorge
  - G5: genesung, unterstuetzung, buecher, fragen
  - G6: begriffe, quellen, suche, ueber, impressum-datenschutz und die seitenweiten Texte
- Lesefassung `S/text/*.md`, Quelle `R/authoring/content/*.html`, `R/authoring/site.config.json`, `R/authoring/js/interaktion.js`.
- Kennzahlen:
  - **Massgebend** sind `S/werkzeug/kennzahlen_v2.py` auf der Lesefassung `S/text-v2/` und die Ausgangswerte `S/werkzeug/kennzahlen-ff5016b-v2.csv`.
  - v2 zählt die Literaturangaben in Quellenblöcken (`.puk-longform__sources`) nicht als Fliesstext; das hatte G1 bemerkt.
  - Die Nummerierung §n ist in `text/` und `text-v2/` identisch.
  - Die Teilprüfungen G1 bis G6 haben noch mit `kennzahlen.py` und `kennzahlen-ff5016b.csv` gerechnet. Ihre Werte für Seiten mit Quellenblock sind deshalb leicht verzerrt. Gib im Bericht nur die v2-Werte an.
  - Die Simulation (Schritt 6) rechnest du mit v2 auf einer Kopie von `text-v2/`.
- Leitlinien: `S/leitlinien/project/guidelines/`; Audit-Skill: `R/.agents/skills/website-audit/SKILL.md`.
- Frühere Befunde und Entscheide: siehe `AUFTRAG.md`, Abschnitt 5.

### Hinweise der bauenden Sitzung nach den Teilprüfungen (rein sachlich, keine Bewertung)

- **Fehler im Auftrag:** `AUFTRAG.md` sagt, `primaryTask` erscheine auf der Suchseite. Das ist falsch. G6 hat festgestellt, dass `primaryTask` nur im unsichtbaren Suchindex (`data-search-text`) steht. `description` ist dagegen sichtbar: als Auszug in der Suche und in Linkvorschauen (`og:description`). Bitte im Prüfumfang korrekt festhalten.
- **Wortziele:** Mehrere Teilberichte nennen Wortziele je Seite aus Release C (z. B. `behandlung` ≤ 2400, `fragen` ≤ 2400, `krise` ≤ 1800) und rechnen nach, was die Ersatzfassungen ändern. Führe das in einer Tabelle je Seite zusammen: Wortzahl heute, Veränderung durch die Ersatzfassungen, Wortziel, Quelle des Ziels. Ob die Ziele weiter gelten, entscheidet die Auftraggeberin.
- **Suche:** Mehrere Befunde ändern Seitenbeschreibungen oder Abschnitte, die in den Suchindex eingehen. Nach einer Umsetzung muss der Suchtest (`authoring/tools/suchtest.mjs`, 216 Anfragen) laufen. Das gehört in die nächsten Schritte, nicht in dieses Audit.
- **Eingang:** Insgesamt 148 Teilbefunde (G1 20, G2 30, G3 24, G4 19, G5 31, G6 24). Nach Priorität: P1 1, P2 45, P3 102.

## 2. Arbeitsschritte

1. **Vollständigkeit.** Prüfe, dass jede der 23 Seiten und die seitenweiten Texte geprüft sind. Die Angabe «Blöcke gelesen» in den Teilberichten muss zur Lesefassung passen. Fehlt etwas, prüfe es selbst nach und vermerke das.

2. **Befund für Befund nachprüfen:**
   - Steht der Originaltext genau so an der Fundstelle?
   - Ist das Problem echt?
   - Ist die Stelle nicht doch gelungen?
   - Unterläuft der Befund keinen Entscheid aus `AUFTRAG.md` Abschnitt 5?
   - Ist es kein Duplikat eines früheren Befunds (A03-001 bis A03-038, A03-H01, A03-H02, S r4-29, A8-01 bis A8-11)? Duplikate bekommen keinen neuen Befund, sondern einen Querverweis.

3. **Gegenprüfung jeder Ersatzfassung.** Das ist der wichtigste Schritt; prüfe kritisch, als Gegenleserin. Lies dazu den Block davor und danach.
   - Ist sie wirklich natürlicher und verständlicher?
   - Bleibt die fachliche Bedeutung vollständig, mit allen Bedingungen, Einschränkungen, Warnungen und Abstufungen? Wird nirgends aus «kann» ein «wird», und fehlen weder «oft», «häufig» noch «grundsätzlich»?
   - Bleiben Sicherheits- und Schutzaussagen gleich klar und gleich dringlich?
   - Gleiche Anrede, Schweizer Orthografie?
   - Keine neuen Floskeln oder KI-Muster, keine neue Verneinungslast, nicht künstlich länger?
   - Passt sie in den Absatz und zum Begriffsgebrauch der Website?
   - Ist sie unmittelbar einsetzbar und ersetzt sie genau den zitierten Original-Block?
   - Klingt ein Gesprächsbeispiel laut gesprochen natürlich?

   Ergebnis je Befund in `gegenpruefung`:
   - `bestanden`
   - `überarbeitet: …`: Du schreibst die verbesserte Fassung in `ersatzfassung` und begründest kurz.
   - `verworfen: …`: Der Befund wird gestrichen und kommt in die Liste «Verworfen» im Bericht, mit Grund.

3a. **Gegenprobe Lesefluss.** Die Auftraggeberin nennt ausdrücklich abgehackte Kurzsätze, schematische Formulierungen und KI-Textmuster. Prüfe deshalb unabhängig, ob die Teilprüfungen diese Punkte richtig gewichtet haben, in beide Richtungen.
   - **Auswahl:** Ermittle mit `kennzahlen_v2.py`, auf Abschnittsebene gerechnet, je Seite die zwei Abschnitte mit dem höchsten Anteil sehr kurzer Sätze und die zwei mit dem höchsten Anteil Verneinungen.
   - **Lesen:** Lies diese Abschnitte selbst im Zusammenhang.
   - **Zählen:** Kurze Sätze sind nicht automatisch Stakkato. Listenpunkte, Beispielsätze und bewusste Merksätze können kurz sein. Massgebend ist, ob der Text beim Lesen abgehackt oder schematisch wirkt.
   - **Ergebnis:** Wo du Stakkato, schematische Muster oder Verneinungslast findest, die nicht als Befund erfasst sind, ergänzt du Befunde mit Ersatzfassung. Wo die Kennzahl täuscht, schreibst du das in den Bericht.
   - **Bericht:** Er hält fest, wie viele Abschnitte du so geprüft hast und mit welchem Ergebnis.

4. **Prioritäten kalibrieren.** Eine Skala über alle Gruppen, nach `AUFTRAG.md` Abschnitt 7. Wo du eine Priorität änderst, vermerkst du das.

5. **Seitenübergreifende Muster.**
   - Wiederkehrende Formeln, Begriffe, Satzmuster und Tonwechsel bündelst du als Muster `M-01`, `M-02` usw. Jedes Muster hat eine Regel und seine Fundstellen.
   - Jede Fundstelle bleibt ein eigener Befund mit eigener Ersatzfassung; in der Spalte `muster` steht die Musternummer.
   - Fehlen Fundstellen eines Musters, ergänzt du sie als eigene Befunde mit Ersatzfassung.
   - Achte auf Einheitlichkeit: Dieselbe Sache heisst überall gleich, und gleiche Probleme werden gleich gelöst.

6. **Wirkung messen** (Simulation, nur im Scratchpad).
   - Wende alle bestandenen und überarbeiteten Ersatzfassungen auf Kopien der Lesefassung `text-v2/` an, in `S/ergebnis/arbeit/text-neu/`.
   - Rechne dann `kennzahlen_v2.py` neu und vergleiche mit `kennzahlen-ff5016b-v2.csv`.
   - Erwartet ist weniger Stakkato und weniger Verneinungslast, aber keine überlangen Sätze.
   - Zeigt die Simulation Verschlechterungen (z. B. mehr Sätze über 25 Wörter), prüfst du die betroffenen Ersatzfassungen nach.

6a. **Ein Befund, eine Fundstelle.** Einige Teilbefunde verbinden zwei Fundstellen, z. B. `G3-003` (§3 und §55) und `G3-022` (§6 und §8). Teile sie so auf, dass jede Ersatzfassung genau einen Block ersetzt. Befunde zu Bedientexten aus `interaktion.js` (z. B. `G3-005`) nennen die Zeile im Skript. `S/werkzeug/pruefe_teil.py` prüft mechanisch, ob jedes Original wörtlich in der Quelle steht. Nutze es für die endgültige `BEFUNDE.csv` sinngemäss: Jedes `original` muss wörtlich auffindbar sein.

7. **IDs vergeben.** Die endgültigen IDs sind `A03-039` fortlaufend.
   - Reihenfolge: zuerst die Seitenreihenfolge der Navigation (index, kurz, verstehen, beziehungen, rolle, grenzen, diagnose, behandlung, kommunizieren, krise, kinder, jugendliche, selbstfuersorge, genesung, unterstuetzung, buecher, fragen, begriffe, quellen, suche, ueber, impressum-datenschutz, 404), danach die seitenweiten Texte.
   - Innerhalb einer Seite in Textreihenfolge.
   - Die vorläufige ID der Teilprüfung (z. B. `G3-014`) bleibt in einer eigenen Spalte erhalten.

## 3. Ausgabe in `S/ergebnis/2026-10-16-modul-03-r4-35/`

Die Dateien folgen dem Audit-Skill, Abschnitt «Verbindliche Ausgabe».

- **`METADATEN.json`**
  - Projekt, Repository, Branch, SHA `ff5016b`, Bezug Produktion `baf366d`, Deployment-URL `https://borderline-angehoerige.netlify.app` (nur Bezug, nicht abgerufen, ausser du hast sie gelesen)
  - Modus `modul-03`, Zeit, Testbedingungen
  - Sitzungen: G1 bis G6 und Konsolidierung, alle unabhängig
  - Hinweis: kein Lesetest mit Menschen
- **`PRUEFUMFANG.md`:** Seiten- und Textinventar mit Blockzahlen, geprüft und nicht geprüft.
- **`BEFUNDE.csv`** (Semikolon, UTF-8, mit dem Python-`csv`-Modul geschrieben). Spalten:
  `id;vorl_id;seite;fundstelle;element;original;problem;kriterien;prioritaet;kritikalitaet;ersatzfassung;begruendung_ersatz;bedeutung_erhalten;gegenpruefung;muster;evidenz;pruefmethode;nutzerwirkung;akzeptanzkriterium;querverweis;freigabe_noetig;pruefbedarf;status;nachteststatus`
  - `kritikalitaet`: kritisch, wichtig oder optional.
  - `pruefmethode`: z. B. «Lesen Block für Block, Laut-Lese-Probe, Abgleich Leitlinie 00-sprache-und-ton».
  - `status`: `offen`.
  - `nachteststatus`: `nicht nachgetestet`.
  - Verworfene Befunde stehen **nicht** in `BEFUNDE.csv`, sondern im Bericht.
- **`TESTMATRIX.csv`:** tatsächlich durchgeführte Prüfungen je Seite (Lesen, Laut-Lese-Probe der Beispiele, Kennzahlen, Simulation, Musterabgleich), mit Ergebnis. Dazu die nicht durchgeführten (Lesetest mit Menschen, Screenreader-Vorlesung, Lesbarkeitsindex mit Normwerten u. a.).
- **`QUELLEN.csv`:** nur Quellen, die tatsächlich verwendet wurden, mit Fassung oder Datum (Leitlinien des Profils mit Fassung, Audit-Skill, frühere Audits mit Pfad).
- **`BERICHT.md`**
  1. **Gesamtbewertung**, höchstens zehn Sätze: Wo steht die Website je Qualitätsziel?
  2. **Ergebnis je Qualitätsziel:** Tabelle mit Ziel, Stand (gut / teilweise / ungenügend), typische Befunde mit IDs und Beispielen.
  3. **Ergebnis je Seite:** Tabelle mit Seite, Befunde je Priorität, Kurzurteil und Musterstellen.
  4. **Muster M-xx:** Regel, Beispiel vorher und nachher, Fundstellen.
  5. **Priorisierte Massnahmen:** in welcher Reihenfolge, was zuerst, was gebündelt werden kann; welche Befunde eine fachliche oder rechtliche Prüfung brauchen.
  6. **Kennzahlen vorher und nachher** (Simulation), mit Zählweise.
  7. **Verworfen:** Befunde aus G1 bis G6, die du gestrichen hast, mit Grund.
  8. **Lücken und Grenzen:** kein Lesetest mit Menschen, keine fachliche oder juristische Freigabe, nicht geprüfte Teile.
  9. **Nächste Schritte:** Freigabe des Wortlauts durch die Fachstelle; Umsetzung auf eigenem Branch; Nachtest.
- **`SPRACHPROFIL.md`:** das verbindliche Sprach- und Tonalitätsprofil der Website, siehe Abschnitt 4.

## 4. Sprach- und Tonalitätsprofil

Das Profil konkretisiert die Leitlinie `00-sprache-und-ton.md` des PUK Website-Profils für diese Website. Es widerspricht ihr nicht. Regeln des PUK-Profils werden nicht in einzelnen Websites geändert; ein Vorschlag zur Profiländerung steht deshalb getrennt am Ende. Es soll verbindlich und anwendbar sein: Wer einen neuen Abschnitt schreibt oder einen Text überarbeitet, kann es Punkt für Punkt anwenden.

Es soll diese Themen enthalten. Die Reihenfolge darfst du ändern.

1. **Zweck und Geltung:** alle Texte der Website, auch Navigation, Figuren, Beispiele, Vertiefungen, Seitenbeschreibungen, Bedientexte und Texte nur für Screenreader. Status: gilt nach Freigabe durch die Fachstelle.
2. **Leserin und Leser:** wer liest, in welcher Lage, mit welchem Vorwissen.
3. **Stimme und Haltung:** wie die Website klingt, und wie nicht.
4. **Anrede und Perspektive:** «Sie» im Fliesstext, Beispiele in der Anrede der Beziehung, aus Sicht der Lesenden.
5. **Satzbau und Rhythmus:** Richtwerte aus den Kennzahlen (z. B. mittlere Satzlänge, Anteil sehr kurzer Sätze, Sätze über 25 Wörter), wie Gedanken verbunden werden, Absatzlänge.
6. **Wortwahl:**
   - Alltagsworte, Fachbegriffe mit Erklärung beim ersten Auftreten;
   - eine Liste «so schreiben wir» und «so nicht», mit echten Beispielen von der Website, je vorher und nachher;
   - eine Begriffsliste der zentralen Begriffe mit der einheitlichen Form.
7. **Empathie ohne Floskeln:** wie Belastung anerkannt wird; Liste der zu vermeidenden Wendungen.
8. **Verneinung, Vorbehalte und Absicherungen:** wann sie nötig sind (Aussagen über die betroffene Person, Ursachen, Diagnose, Verlauf) und wann nicht (Handlungshinweise); E9.
9. **Handlungsempfehlungen und Selbstbestimmung:** Modalverben, Wahlmöglichkeiten, Grenzen.
10. **Gesprächsbeispiele:** Kennzeichnung, Natürlichkeit, Laut-Lese-Probe, Zusagen nur im realen Umfang.
11. **Nichtstigmatisierende Sprache:** Personenzentrierung, keine Stereotype, Schuld und Verantwortung, Rollenbilder.
12. **Sicherheit, Dringlichkeit und Zuständigkeit:** ruhig und klar, keine Abschwächung; kein Krisenzugang; Zuständigkeitsverweis nur im geprüften Wortlaut; E7.
13. **Schweizer Standarddeutsch:** Orthografie, Anführungszeichen, Schweizer Begriffe und Institutionen, typische bundesdeutsche Ausdrücke, die zu vermeiden sind.
14. **Website-Elemente:** Titel, Navigationsbeschriftungen, Seitenbeschreibungen, Linktexte, Schaltflächen, Fehlermeldungen und leere Zustände der Suche, Figurtexte, Texte nur für Screenreader.
15. **KI-Textmuster, die vermieden werden:** je ein Beispiel von der Website, vorher und nachher.
16. **Prüffragen vor der Freigabe:** eine kurze Checkliste, höchstens 15 Fragen.
17. **Musterstellen:** gelungene Passagen von der Website als Referenz, unverändert zitiert.
18. **Vorschläge an das PUK-Profil,** falls sich Regeln für alle Websites ergeben; als Vorschlag gekennzeichnet.

## 5. Abschluss

Melde der bauenden Sitzung:
- die Pfade aller Dateien;
- die Zahl der Befunde je Priorität;
- die Zahl der verworfenen und der überarbeiteten Ersatzfassungen;
- die Muster;
- die Kennzahlen vorher und nachher, kurz;
- das Gesamturteil in drei Sätzen.
