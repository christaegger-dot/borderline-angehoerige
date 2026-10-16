# Audit 03 · Sprache, Tonalität, Empathie und Verständlichkeit · gemeinsamer Auftrag

Lauf-ID: `2026-10-16-modul-03-r4-35`. Dieser Auftrag gilt für alle Prüfsitzungen des Laufs. Jede Sitzung bekommt zusätzlich ihre Seitengruppe.

## 1. Rolle und Unabhängigkeit

- Du bist eine **unabhängige Prüfsitzung**: Du hast die Website weder gebaut noch korrigiert. Gestartet hat dich die bauende Sitzung im Auftrag der Auftraggeberin (Fachstelle Angehörigenarbeit PUK). Dein Urteil ist dein eigenes; Vorbewertungen der bauenden Sitzung gibt es nicht.
- **Ausschliesslich Audit.** Im Repository `/home/claude/borderline-angehoerige` änderst du nichts: keine Datei bearbeiten oder anlegen, kein `git checkout`, `switch`, `stash`, `commit`, `push`, kein Build ins Repository, nichts auf GitHub oder Netlify. Lesen ist erlaubt (Dateien, `git show`, `git log`, `git diff`).
- Du schreibst nur in deine Teil-Dateien unter `/tmp/claude-0/-home-claude/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/a03/teile/`.

## 2. Prüfstand

- Repository `christaegger-dot/borderline-angehoerige`, ausgecheckt in `/home/claude/borderline-angehoerige`. Branch `claude/a8k-korrektur-1792143386`, Commit `ff5016b` (Build r4-35, PR #699, Wortlaut freigegeben und unabhängig geprüft, noch nicht gemergt).
- Produktion (`main`, `baf366d`, r4-34) unterscheidet sich davon nur in fünf am 16.10.2026 freigegebenen Textstellen (`audit-results/2026-10-16-delta-r4-35/FREIGABE.md`).
- **Kanonische Textquelle:** `authoring/content/<seite>.html`. Seitenweite Texte: `authoring/site.config.json` (Titel, Navigation, Beschreibungen, Fusszeile, Zuständigkeitsverweis), `authoring/js/interaktion.js` (Bedientexte der Suche und der Komponenten).
- **Lesefassung mit Fundstellen:** `scratchpad/a03/text/<seite>.md` (eine Zeile je Block, nummeriert `§n` je Abschnitt, mit Rolle des Blocks: Kernaussage, Kurztext, Beispiel, Vertiefung, Nur-Screenreader, Tabelle). Seitenweite Texte: `scratchpad/a03/text/_seitenweit.md`. Die Lesefassung ist ein Hilfsmittel; bei Zweifel gilt das HTML. Prüfe auch Attribute mit Text (aria-label, alt), Inhalte in `details` und Texte nur für Screenreader (`puk-sr`).
- **Fundstelle** immer als `seite › abschnitt-id › §n` (wie in der Lesefassung), dazu das Element (Absatz, Listenpunkt, Überschrift, Beispiel, Kernaussage der Figur …).

## 3. Qualitätsziele (Auftrag der Auftraggeberin, wörtlich)

- Natürlichkeit: Die Sprache soll fliessend, authentisch und ungekünstelt wirken. Vermeide abgehackte Kurzsätze, schematische Formulierungen und typische KI-Textmuster.
- Nahbarkeit: Die Texte sollen zugewandt und menschlich wirken, ohne kumpelhaft, anbiedernd oder übertrieben fürsorglich zu sein.
- Empathie: Sorgen, Unsicherheit und Belastungen sollen ernst genommen werden, ohne Betroffenheitsfloskeln, Dramatisierung oder künstliche Anteilnahme.
- Professionalität: Die Texte sollen fachlich kompetent und glaubwürdig sein, aber nicht wie ein klinisches Fachbuch oder ein therapeutisches Manual klingen.
- Laienverständlichkeit: Menschen ohne psychologische, psychiatrische oder juristische Vorkenntnisse sollen die Inhalte gut verstehen können.
- Nichtstigmatisierende Sprache: Vermeide pauschale Diagnosestereotype, abwertende Zuschreibungen, Schuldzuweisungen und problematische Rollenbilder.
- Selbstbestimmung: Handlungsempfehlungen sollen persönliche Grenzen, Wahlmöglichkeiten und individuelle Unterschiede respektieren.
- Alltagstauglichkeit: Gesprächsbeispiele und praktische Empfehlungen sollen natürlich klingen und tatsächlich verwendbar sein.
- Lesefluss: Bevorzuge zusammenhängende, angenehm lesbare Absätze mit einem natürlichen Wechsel kurzer und längerer Sätze.

Dazu: Schweizer Standarddeutsch. Sämtliche Seiten vollständig prüfen. Jeder relevante Befund mit genauer Fundstelle, Originaltext, Problembeschreibung, Priorität und einer **vollständig ausformulierten, unmittelbar einsetzbaren Ersatzfassung**. Kritisch prüfen, ob die Ersatzfassung tatsächlich natürlicher und verständlicher ist, ohne fachliche Genauigkeit oder wichtige Nuancen zu verlieren. **Bereits gelungene Textstellen bleiben unverändert.**

## 4. Grundlagen (vor dem Prüfen lesen)

- `.agents/skills/website-audit/SKILL.md` im Repository: Modul 03 und «Einheitliche Befundregeln».
- Leitlinien des PUK Website-Profils (Design-System-Artefakt, Fassung `1792129173-abbb`), lokal unter `scratchpad/a03/leitlinien/project/guidelines/`:
  - `00-sprache-und-ton.md` (verbindliche Schreibregeln)
  - `00-fachliche-qualitaet-und-haltung.md`
  - `00-gesamtkohaerenz-und-aufbau.md`
  - `06-langform-und-psychoedukation.md`
- Profilregeln, die hier gelten:
  - Anrede «Sie» im Fliesstext. Gesprächsbeispiele in der Anrede der Beziehung, unter Angehörigen meist «du», gekennzeichnet als Beispiel («So könnte es klingen»).
  - Personenzentriert («Person mit Borderline»), keine Etiketten.
  - Keine unterstellten Gefühle, keine Therapieformeln, kein Pathos, keine Verniedlichung.
  - Aus Sicht der Lesenden schreiben, nicht aus Sicht der Institution.

## 5. Bereits entschieden (nicht neu aufmachen)

Wenn du einen dieser Punkte trotzdem für falsch hältst, schreib das als Befund mit «berührt Entscheid …» und einer Begründung. Eine Ersatzfassung, die einen Entscheid unterläuft, ist nicht einsetzbar.

- **Kein Krisenzugang.** Keine Telefonnummern, keine `tel:`-Links, kein Notfallblock; keine Krisennummern vorschlagen. Der Zuständigkeitsverweis (`site.config.json` › `responsibility`, `responsibility.inline`) ist ein von der Fachstelle geprüfter Wortlaut. Sprachliche Hinweise dazu nur als Prüfbedarf, ohne eigene Ersatzfassung.
- **E7:** Der Zuständigkeitssatz steht im Text höchstens einmal pro Seite, und nur auf Seiten zu Selbstgefährdung, Gewalt oder akuter Krise.
- **E9:** höchstens ein Vorbehalt pro Abschnitt (ausgenommen Sicherheits- und Rechtsgrenzen); dieselbe Regel gilt für Entlastungssätze; ein Kernsatz pro Seite.
- Die Auftraggeberin hat einen Abschnitt zur eigenen Krise der Lesenden ausdrücklich als «deplatziert» abgelehnt. Nichts in diese Richtung vorschlagen.
- **Fachliche Aussagen nicht ändern.** Fakten, Zahlen, Quellenbezüge, Bedingungen, Einschränkungen, Warnzeichen und Rechtsvoraussetzungen bleiben. Fachlich Fragwürdiges nur als «Prüfbedarf» markieren, ohne den Inhalt umzuschreiben. Rechtstexte (Paket 3) sprachlich vereinfachen nur ohne jede Bedeutungsänderung; dann Prüfbedarf «Recht».
- **Frühere Sprachbefunde:**
  - A03-001 bis A03-038 sowie die Hypothesen A03-H01 und A03-H02: `audit-results/2026-10-13-bestand-13a7e4f/BEFUNDE.csv`, `audit-results/2026-10-14-delta-sprach-r4-23/`.
  - Sprach-Review S zu Release C: `audit-results/2026-10-15-sprache-s-r4-29/s1.md` bis `s3.md`.
  - Wortlaut und Entscheide zu Release C: `audit-results/2026-10-15-release-c-r4-29/WORTLAUT.md` und `FREIGABE.md`.
  - R3C-A8: `audit-results/2026-10-16-r3c-a8/BEFUNDE.csv` (A8-01 bis A8-11; A8-03 bis A8-06 und A8-10 sind offen und gesammelt).
  - Wer denselben Punkt findet, verweist mit `querverweis` auf die frühere ID, statt einen neuen Befund zu eröffnen. Dasselbe gilt, wenn dein Vorschlag einen dort bewusst gewählten Wortlaut rückgängig macht.
- **Keine Gewaltsätze erfinden.** Zitiere Originaltext, wo nötig. Erfinde keine eigenen Beispielsätze zu Gewalt, Töten oder Suizid und lege keine Listen solcher Sätze an. Die Auftraggeberin hat das ausdrücklich nicht gewollt.

## 6. Prüfmethode

1. Lies jede zugewiesene Seite **vollständig**, Block für Block in der Lesefassung, mit dem HTML zur Kontrolle: Überschriften, Einleitung, Fliesstext, Listen, Figuren (Kernaussage, Kurztext, Beschriftungen, Vertiefung), Beispiele, Tabellen, Hinweiskästen, Linktexte, aria-label, Nur-Screenreader-Texte und die Seitenbeschreibung (`description`) in `_seitenweit.md`. Halte im Teilbericht je Seite fest: «Blöcke gelesen: x von x».
2. Lies jedes Gesprächsbeispiel gedanklich laut. Würde eine Mutter, ein Partner oder eine Schwester das in dieser Lage so sagen?
3. Prüfe gegen die neun Qualitätsziele und die Leitlinie `00-sprache-und-ton.md`. Achte besonders auf:
   - **Stakkato:** Ketten kurzer Hauptsätze ohne Verbindung, abrupte Einschränkungen.
   - **Schachtelsätze** über 25 bis 30 Wörter.
   - **Nominalstil und Amtsdeutsch.**
   - **Fachwörter ohne Erklärung** beim ersten Auftreten auf der Seite (Quereinstieg).
   - **Verneinungslast:** Der Text sagt vor allem, was nicht gilt.
   - **Absicherungen:** Häufung von «kann», «können», «möglicherweise».
   - **Wiederholte Formeln** über Seiten hinweg.
   - **Abstrakte Wendungen** statt der gemeinten Handlung.
   - **«es», «sie», «davon» ohne klaren Bezug.**
   - **Links, die wie Satzteile dastehen.**
   - **Bevormundung:** Häufungen von «Sie müssen», «Sie sollten», «Sie dürfen».
   - **Unterstellte Gefühle, Floskeln und Pathos.**
   - **Schuld und Verantwortung:** Schuldzuweisungen an Angehörige oder die betroffene Person; unausgesprochene Verantwortung der Angehörigen für Beruhigung, Behandlung oder Verlauf.
   - **Diagnosestereotype.**
   - **Rollenbilder:** z. B. die Mutter als selbstverständliche Pflegeperson.
   - **Selbstbestimmung:** Wahlmöglichkeiten, Grenzen und individuelle Unterschiede.
   - **Schweizer Standarddeutsch:** ss statt ß, «» und ‹›, Schweizer Begriffe und Institutionen, keine bundesdeutschen Ausdrücke wie «Jugendamt».
4. **Typische KI-Textmuster** (gezielt suchen):
   - Dreierreihungen ohne Not
   - «nicht nur … sondern auch»
   - «nicht X, sondern Y» in Serie
   - «X heisst nicht, dass Y» oder «Das bedeutet nicht, dass …» gehäuft
   - Satzanfänge wie «Wichtig ist», «Dabei», «Gleichzeitig», «Es ist wichtig, …», «Denken Sie daran»
   - Doppelpunkt-Konstruktionen im Telegrammstil («Das Ziel: …»)
   - gehäufte Gedankenstrich-Einschübe
   - gleich gebaute Listenpunkte ohne Not
   - leere Bestätigungen («Das ist völlig normal», «Sie sind nicht allein» als Formel)
   - Überschriften als Fragen in Serie
   - künstlich symmetrische Gegenüberstellungen
   - Schlusssätze, die das Gesagte nur wiederholen
5. **Kennzahlen:** `python3 -I scratchpad/a03/werkzeug/kennzahlen.py scratchpad/a03/text <seite …>`. Die Ausgangswerte aller Seiten stehen in `scratchpad/a03/werkzeug/kennzahlen-ff5016b.csv`; die Zählweise steht im Kopf des Skripts. Hinweis: «ohne» zählt als Verneinung. Deute die Zahlen für deine Seiten mit Beispielen aus dem Text; die Zahlen allein sind kein Befund.

## 7. Priorität

| Priorität | entspricht | Wann |
| --- | --- | --- |
| P0 | kritisch | Der Text kann in einer belasteten Lage zu einer gefährlichen Fehlhandlung oder schweren Fehldeutung führen (Sicherheit, Schutz, Suizidalität, Recht), oder er stigmatisiert oder beschuldigt deutlich. |
| P1 | wichtig | Die Kernaussage eines Abschnitts wird von Laien wahrscheinlich falsch oder nicht verstanden; oder eine wichtige Stelle wirkt deutlich bevormundend, schuldzuweisend, kalt, floskelhaft oder wie ein Manual; oder ein zentrales Gesprächsbeispiel würde so niemand sagen. |
| P2 | optional (deutlich) | Spürbare Stolperstelle im Lesefluss oder im Ton (Stakkato, Schachtelsatz, Nominalstil, unerklärtes Fachwort, gehäufte Verneinung, KI-Muster), ohne dass die Kernaussage verloren geht. |
| P3 | optional (Feinschliff) | Kleine, eindeutig bessere Formulierung. Nur, wenn die Verbesserung unstrittig ist, keine Geschmacksfragen. |

Gelungene Stellen bekommen keinen Befund. Lieber ein klarer P2 als fünf P3.

## 8. Ersatzfassung: Anforderungen

- **Vollständig und einsetzbar.** Die Ersatzfassung ist ausformuliert und ersetzt genau den zitierten Originaltext. Zitiere den Original-Block ganz oder den ganzen Satz, nicht nur ein Teilstück. Linktexte markierst du so: `[Linktext](ziel-wie-im-original)`.
- **Gleiche Bedeutung.** Gleiche Anrede, gleiche fachliche Aussage, alle Bedingungen, Einschränkungen und Warnungen bleiben. Keine neue Aussage, kein neues Versprechen, keine neue Quelle; aus «kann» wird nicht «wird».
- **Form.** Schweizer Orthografie (ss, «»). Nicht länger als nötig; länger nur, wenn es das Verständnis verlangt (begründen). Keine neuen KI-Muster und keine neuen Floskeln.
- **Selbstprüfung je Ersatzfassung**, festgehalten in `begruendung_ersatz`. Natürlicher? Verständlicher? Bedeutung und Nuancen vollständig erhalten? Passt sie zum Absatz davor und danach? Ist das Original vielleicht doch besser? Wenn die Ersatzfassung nicht klar besser ist: Befund streichen.
- **Gesprächsbeispiele** müssen laut gesprochen natürlich klingen, in der Anrede der Beziehung.

## 9. Ausgabe je Prüfsitzung

Schreibe mit Python (`csv`-Modul, `delimiter=';'`, UTF-8) die Datei `scratchpad/a03/teile/<Gruppe>-befunde.csv`. Spalten in dieser Reihenfolge:

`vorl_id;seite;fundstelle;element;original;problem;kriterien;prioritaet;ersatzfassung;begruendung_ersatz;bedeutung_erhalten;evidenz;nutzerwirkung;akzeptanzkriterium;querverweis;freigabe_noetig;pruefbedarf`

- `vorl_id`: `<Gruppe>-001` ff.
- `kriterien`: eines oder mehrere von `Natürlichkeit`, `Nahbarkeit`, `Empathie`, `Professionalität`, `Laienverständlichkeit`, `Nichtstigmatisierung`, `Selbstbestimmung`, `Alltagstauglichkeit`, `Lesefluss`, `Schweizer Standarddeutsch`.
- `prioritaet`: P0 bis P3.
- `bedeutung_erhalten`: `ja` oder `Prüfbedarf: …`.
- `evidenz`: `belegt` (am Text nachweisbar) oder `heuristisch` (Wirkung auf Lesende angenommen).
- `freigabe_noetig`: immer `ja (Wortlaut)`, weil jede Textänderung die Freigabe der Fachstelle braucht.
- `pruefbedarf`: leer, oder `fachlich: …` bzw. `Recht: …`.

Dazu `scratchpad/a03/teile/<Gruppe>-bericht.md` mit:

1. Je Seite: «Blöcke gelesen: x von x», ein Gesamturteil in drei bis fünf Sätzen, Kennzahlen mit Deutung.
2. Musterstellen: je Seite ein bis drei gelungene Passagen mit Zitat und einem Satz, warum sie gelingen. Sie bleiben unverändert und dienen dem Sprachprofil.
3. Seitenübergreifende Muster, die du siehst (wiederkehrende Formeln, Begriffe, Tonwechsel).
4. Prüfbedarf (fachlich, Recht), getrennt aufgeführt.
5. Was du nicht prüfen konntest, und warum.

Zum Schluss meldest du der bauenden Sitzung die Pfade, die Zahl der Befunde je Priorität und dein Gesamturteil in drei Sätzen.
