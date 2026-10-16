# Freigabe r4-35

r4-35 setzt die Korrekturrunde A8-K aus dem Visualisierungs-Check und R2 R3C-A8 um (`PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`, A8-K, Frist 31.10.2026). Grundlage ist der Prüfbericht in `authoring/PRUEFBERICHT.md`, Abschnitt «Visualisierungs-Check und R2 der Abbildungen nach Release C», mit den Nachweisen in `audit-results/2026-10-16-r3c-a8/`. Bezugsstand ist `main` am Merge-Commit `baf366d` (#698); die Website darin ist r4-34.

## Entscheide vom 16. Oktober 2026

Vor der Korrektur, festgehalten in den Pendenzen (Abschnitt «Release C (r4-29) · Auflagen aus R3 und neue Pendenzen»):

- A8-01: «Technisch, Wortlaut bleibt»
- Spalte «Status» der Stufen bleibt «erledigt», für A8-01 und für A8-11
- A8-11: «Varianten vorlegen»
- optionale Befunde: «Drei Rückschritte jetzt» (A8-02, A8-08, A8-09)
- Frist: «31.10.2026»

## Freigabe des Wortlauts

Der Auftraggeberin wurden am 16. Oktober 2026 der neue Wortlaut und drei Varianten für A8-11 genau wie unten vorgelegt, dazu Fotos von `v-be-kontakt` bei 1280 px vor und nach der technischen Korrektur. Gefragt und geantwortet wurde wörtlich:

> «Gibst du den neuen Wortlaut für A8-02, A8-08 und A8-09 so frei, wie er oben steht?»
> «Freigabe»

> «Welche Variante für A8-11 gibst du frei? Mit der Auswahl gibst du genau diesen Wortlaut frei.»
> «V1 «Selbstgefährdend» (Recommended)»

Die Empfehlung V1 kam von der bauenden Sitzung. Begründung: V1 hebt die Gleichsetzung dort auf, wo sie entsteht, in der Überschrift, und fügt keine neue Aussage hinzu.

| Befund | Stelle | bisher | freigegeben |
| --- | --- | --- | --- |
| A8-02 | `behandlung` › `kontakt`, Abbildung 1 `v-be-kontakt`, Kasten «Für Ihre eigene Belastung» | «Eigene Angehörigenberatung ist unabhängig davon möglich.» | «Eine eigene Angehörigenberatung können Sie nutzen, ob Sie Auskunft erhalten oder nicht.» |
| A8-08 | `grenzen` › `dear`, Abbildung `v-gr-dear`, Schritt R | «Machen Sie daraus weder eine Drohung noch ein Versprechen.» | «Machen Sie daraus weder eine Drohung noch eine Garantie.» |
| A8-09 | `verstehen` › `anspannung`, Abbildung `v-vs-anspannung`, Liste, Stelle 2 | «Zeichen dafür können sein: Die Stimme wird lauter, …» | «Zeichen dafür können zum Beispiel sein: Die Stimme wird lauter, …» |
| A8-11 | `genesung` › `forschung`, Abbildung `v-ge-forschung`, linke Spalte | Überschrift «Impulsive Handlungen», Beispiele «Selbstverletzungen, Suizidversuche und andere impulsive Handlungen» | Variante V1: Überschrift «Selbstgefährdende und impulsive Handlungen», Beispiele «Selbstverletzungen, Suizidversuche und impulsive Handlungen» |

Zu A8-11 gehört die Textfassung für Screenreader (`ge-forschung-visual-text`): «Selbstverletzungen, Suizidversuche und impulsive Handlungen gingen in der Studie am schnellsten zurück.» statt «… und andere impulsive Handlungen …». Das war mit der Vorlage angekündigt («Bei V1 und V2 passe ich den Text für Screenreader gleich an»).

Nicht gewählt wurden:
- **V2 «Akute Krisen»:** Überschrift «Handlungen in akuten Krisen», Beispiele wie V1.
- **V3 «Ernst nehmen»:** Spalte unverändert, im Kurztext neu «Nehmen Sie Äusserungen über Suizid oder Selbstverletzung immer ernst.»

**Quelle zu A8-11.** Laut PubMed ordnet die Studie Selbstverletzungen und Suizidversuche den «core areas of impulsivity» zu. Sie beschreibt diese Symptome ausserdem als «manifestations of acute illness», im Gegensatz zu länger bleibenden Anteilen (Zanarini et al. 2007, Am J Psychiatry 164(6):929–935, [DOI 10.1176/ajp.2007.164.6.929](https://doi.org/10.1176/ajp.2007.164.6.929)). Die bisherige Fassung war also quellentreu. V1 ist eine didaktische Umgruppierung für Laien und bleibt durch «Eigene didaktische Darstellung nach Zanarini et al. (2007)» gedeckt.

## Umfang von r4-35

| Punkt | Änderung | Datei | sichtbar |
| --- | --- | --- | --- |
| A8-01 (= R3C-06) | Die Richtungszeile ist ein Flex-Container mit Umbruch statt drei gleich breiter Spalten. Sie nutzt `overflow-wrap:break-word` statt des geerbten `anywhere`; die Namen haben `min-width:0`. Ein Name rutscht als Ganzes auf die nächste Zeile. Ein Wort bricht nur, wenn es allein breiter ist als die Karte. In schmalen Containern (≤ 40rem) steht die Zeile wie bisher untereinander, Pfeil nach unten. | `authoring/css/site.css` | ja, nur die Anordnung |
| A8-02, A8-08, A8-09, A8-11 | Wortlaut wie oben | `authoring/content/behandlung.html`, `grenzen.html`, `verstehen.html`, `genesung.html` | ja |
| Plan | `visualPlan` › `v-ge-forschung` › `statement` beschreibt die neue Überschrift | `authoring/site.config.json` | nein |
| Build | r4-35, Assetversion r4-35; `releaseApproval.independentReview` «ausstehend», `reviewScope` ergänzt | `authoring/site.config.json` | nein |

Nicht geändert:
- **Textfassung für Screenreader von `v-be-kontakt`** («… Eigene Beratung ist unabhängig davon möglich.»): Dort hat «davon» einen Bezug im Satz davor.
- **Kernaussage von `v-ge-forschung`** («Oft gehen Selbstverletzungen und impulsive Handlungen zuerst zurück. …»): Sie nennt die Suizidversuche nicht.
- Kein weiterer Satz, kein Markup ausser diesen Textknoten, kein JavaScript.

## Selbstprüfung der bauenden Sitzung

- **Wortlaut.** Der Wortdiff von `authoring/content/` gegen `baf366d` enthält nur diese Wörter: «Eigene» → «Eine eigene»; «ist unabhängig davon möglich.» → «können Sie nutzen, ob Sie Auskunft erhalten oder nicht.»; «Impulsive» → «Selbstgefährdende und impulsive»; zweimal «andere» entfernt; «ein Versprechen.» → «eine Garantie.»; «zum Beispiel» eingefügt.
- **Messungen mit den Skripten aus `audit-results/2026-10-16-r3c-a8/skripte/`.** Verglichen wurden `site/` (`baf366d`, r4-34) und der Entwurf r4-35:
  - **Umfang:** 84 Messungen bei 100 %, 84 bei 200 % (Browserprofil 32 px) und 98 Ansichten aus `fotos.js`, also 266.
  - **Unterschiede bei 100 %:** `v-be-kontakt` bei 1280 und 1440 px, Standard und «kontrast». Der Wortbruch «Behandlungsteam» ist weg. Sonst gibt es keine Abweichung.
  - **Unterschiede bei 200 %:** Neu sind nur die Wortbrüche «Selbstgefährdende» in `v-ge-forschung` bei 320 und 360 px und «Beispiel» in `v-vs-anspannung` bei 320 px. Beide liegen bei 320 oder 360 px und damit unter der Profilausnahme SPZ-40; das neue Wort bricht wie die übrigen dort.
  - **Überlauf und Lage:** In keiner Ansicht gibt es Seitenüberlauf, Text ausserhalb einer Figur oder eine Überlappung.
- **Fotos angesehen:** `v-be-kontakt` bei 1280 und 360 px, `v-ge-forschung` bei 1280 und 360 px.
- **Suche:** «Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0» (Entwurf).
- **Build:**
  - Entwurf: 23 Seiten, 0 Blocker, 1 Hinweis («Die aktuelle Änderungsrunde wurde noch nicht unabhängig geprüft.»).
  - Produktion: blockiert, bis die unabhängige Prüfung vorliegt.

## Nächster Schritt

Eine Sitzung, die nicht gebaut hat, prüft r4-35 nach. Sie prüft:
- den Wortlaut gegen diese Freigabe;
- die Abbildungen mit den Skripten aus R3C-A8 bei 1280, 1440 und 360 px, Standard und «kontrast», sowie bei 200 %;
- die Suche.

Erst danach setzt die bauende Sitzung `independentReview` auf «bestaetigt» und schreibt den Produktionsexport nach `site/`.

## Nachtrag 1 · Unabhängige Prüfung und Produktionsexport (16.10.2026)

- **Prüfung:** Die Prüfsitzung, die R3C-A8 gemacht und r4-35 nicht gebaut hat, prüfte den Stand `56f29e1`. Urteil: «freigabefähig mit Auflagen» (`PRUEFUNG.md`, Commit `692bf37`).
  - Wortlaut, CSS, 312 Ansichten je Stand, Fotos, Visualisierungs-Check 1 bis 19 der vier Figuren, A8-11 und die Suche sind ohne Befund.
  - Einzige Auflage R35-01: Die Buildkennung `BUILD` in `authoring/tools/contract.js` und der Kopfkommentar von `authoring/css/site.css` standen noch auf r4-34.
- **Korrektur:** Beide Stellen stehen jetzt auf r4-35 (`b52e875`).
- **Abschlussbestätigung:** Stand `b52e875`, Urteil «freigabefähig» (`PRUEFUNG.md`, Commit `0e6c7dd`).
  - Nur die zwei Zeilen haben sich geändert.
  - Alle 23 Seiten tragen r4-35.
  - Mit «bestaetigt» meldet der Produktionsbuild 0 Blocker und 0 Hinweise.
- **Freigabe in `site.config.json`:** `releaseApproval.independentReview` steht danach auf «bestaetigt», `reviewedAt` auf 2026-10-16, und `reviewScope` nennt die Prüfung.
- **Export:**
  - `node authoring/tools/build.mjs --production --out=site --write-site` meldet «23 Seiten · 0 Blocker · 0 Hinweise».
  - `--verify-site` meldet «PARITÄT BESTANDEN: 34 Dateien byte-gleich mit site/».
  - Der Suchtest auf `site/` ergibt «216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0».
  - `site/` ist bytegleich mit dem Entwurf `dist/b52`, an dem die Prüfsitzung die Abschlussbestätigung gemacht hat.

## Nachtrag 2 · Veröffentlichung und Produktionsprüfung (16.10.2026)

- **Codex-Review von #699:** auf dem Stand `ff5016b`, abgeschlossen um 10:19:59 UTC, ohne Befund. Danach meldete die bauende Sitzung «mergen».
- **Merge:** #699 wurde um 16:57:03 UTC gemergt (Merge-Commit `8bbc8aa`), also nach dem Review und nach der Meldung. R28-O01 und R29-P20 sind eingehalten. Der Inhalt ist gleich `ff5016b`.
- **Deploy:** Netlify veröffentlichte den Deploy `6ad25762cfc3b8d0e814847a` zu `8bbc8aa` um 16:57:17 UTC; nur lesend abgefragt.
- **Produktionsprüfung (R35-P01):** in einer eigenen Sitzung, die nicht gebaut hat, von 16:59:48 bis 17:11:58 UTC (`PRODUKTIONSPRUEFUNG.md`). Ergebnis: **bestanden**, kein Befund.
  - 46 von 46 Dokumenten tragen r4-35.
  - Die fünf freigegebenen Stellen stehen wörtlich so, der alte Wortlaut kommt 0-mal vor.
  - `css/site.css` und `js/interaktion.js` sind bytegleich mit `site/` aus `ff5016b`.
  - `v-be-kontakt` zeigt bei 1280 und 1440 px keinen Wortbruch (12 Ansichten).
  - Suche: 216 von 216 über die Pretty URLs, 17 von 17 Handproben.
  - 0 `tel:`, kein Notfallblock.
