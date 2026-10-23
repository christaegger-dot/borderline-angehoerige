# Aktueller Pendenzen- und Entscheidstatus

**Dokumentationsstand: 23. Oktober 2026 · GitHub main: r4-41 (`67f6f6d`, PR #711 gemergt am 23.10.2026, 14:49 UTC, von Christa Egger). Offener Arbeitsentwurf: r4-42 auf Branch `gestaltung/2026-10-23-nachbesserung-r4-42` ([PR #712](https://github.com/christaegger-dot/borderline-angehoerige/pull/712), Entwurf; Status geprüft am 23.10.2026).**

Dieses Dokument ist nach der Migration die verbindliche Übersicht für offene Arbeiten an der Website. Der ausführliche Bericht unter `authoring/PRUEFBERICHT.md` dokumentiert frühere Prüfungen und Entscheidungen, ist aber kein aktueller Aufgabenplan.

**Suchproben, die ein Töten, eine Suizidabsicht oder eine Gewalttat ausdrücken,** zitiert diese Übersicht nicht wörtlich. Sie beschreibt die Proben und nennt den Prüfbericht unter `audit-results/`, der den Wortlaut enthält. Festgeschriebene Anfragen stehen in `authoring/tests/suche-ersttreffer.tsv`. Drei Proben stehen in keinem Prüfbericht; sie sind mit «Wortlaut nur in `f700885`» gekennzeichnet (`git show f700885:PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`).

## Nachbesserung · r4-42 · Entwurf vom 23.10.2026

**GitHub:** Branch `gestaltung/2026-10-23-nachbesserung-r4-42`, [PR #712](https://github.com/christaegger-dot/borderline-angehoerige/pull/712) (Entwurf, nicht gemergt). Anlass: Befund N41-W1 der Nachprüfung von r4-41 ([NACHPRUEFUNG.md](audit-results/2026-10-23-r4-41-nachfuehrung/NACHPRUEFUNG.md)); die Nachprüfung selbst ist in diesem Entwurf enthalten (Commit der Nachprüfsitzung, nach dem Merge von r4-41 entstanden). Nachweis: [`BERICHT.md`, Abschnitt «Nachbesserung r4-42»](audit-results/2026-10-23-r4-41-nachfuehrung/BERICHT.md).

**Inhalt:** weiche Trennstellen «Begleit-erkran-kungen», «mit-betrof-fen», «Nach-schla-gen», «Be-hand-lung» (vierter Fall beim Umsetzen gefunden); Layouttest prüft Titelumbrüche auf Zeichenebene statt Wortebene; N41-G1 (Kennzahl) und N41-G2 (`appliedTo`) berichtigt; Build-Kennung r4-42 mit Verzicht wie bei r4-41. Kein Wortlaut, keine Abbildung, keine Kontaktangabe geändert.

**Technischer Stand des Entwurfs:** Selbsttest 84/84; Produktionsgate 23 Seiten · 0 Blocker · 20 Hinweise; `--verify-site` Parität 34 Dateien; Suchtest 216/216; Sprach-/UI-Test 73/73; Layouttest 230 Zustände, 25 Bedienproben, 1 Abweichung (Ausnahme B2c), 0 Titelumbrüche ohne Trennstelle; Segmentprüfung der Nachprüfsitzung 47 Wörter, 0 verletzt.

**Offen:** Screenreader-Prüfung; Prüfbedarf der Nachprüfung (kurze Vorsilben «Dia-gnose», «Ange-hörige», «Gene-sung», Grenzwert `8 4 4` gegenüber 3-Zeichen-Trennstellen, gierige Trennung «Gene- / sung») als gestalterischer Entscheid von Christa Egger; Merge und Veröffentlichung nur auf Auftrag.

## Gestaltungsnachführung · r4-41 · veröffentlicht am 23.10.2026

**GitHub:** Branch `gestaltung/2026-10-23-nachfuehrung-r4-41`, [PR #711](https://github.com/christaegger-dot/borderline-angehoerige/pull/711), gemergt als `67f6f6d` am 23.10.2026, 14:49 UTC, von Christa Egger; damit über Netlify veröffentlicht. Die Nachprüfung (Stand `e1d0952`) lag beim Merge noch nicht vor und ist mit r4-42 nachgetragen. Auftrag von Christa Egger vom 23.10.2026 nach der Beurteilung der Releasefähigkeit von r4-40: «einverstanden, setze um die offenen Pendenzen. du kannst selbständig entscheiden!» Nachweis: [`audit-results/2026-10-23-r4-41-nachfuehrung/BERICHT.md`](audit-results/2026-10-23-r4-41-nachfuehrung/BERICHT.md).

**Inhalt (technisch-gestalterisch, kein Wortlaut, keine Abbildung, keine Kontaktangabe geändert):**
- Profilregel 2026.10.9 W-2: Titel werden bei Standardschrift nie getrennt; ist der Einstieg schmaler als 12 em seiner Schrift (320–375 px bei 200 % Schrift), trennen sie Wörter ab 8 Zeichen nach Silben statt beliebig zu brechen; 17 Seitentitel tragen weiche Trennstellen. Ausnahme Diagnose («Begleit-erkrankungen» auch bei Standardschrift länger als die Zeile). Vorher brachen bei 200 % auf 17 von 23 Seiten Titelwörter ohne Trennstelle.
- Profilregel 2026.10.9 W-3: Hover-Zustände auf `--ui-wash` in Blau 125 (`--text-link-on-tint`); keine Seite nutzt die betroffenen Klassen, die Regel ist vorsorglich.
- Build-Kennung r4-41 in `contract.js` und `assetVersion` (vorher r4-39 neben r4-40); `independentReviewWaiver.version` r4-41 auf den fortgeltenden Entscheid vom 18.10.2026 gestützt, mit Vermerk; `pendingScope` r4-41.
- P708-W4: verwaiste CSS-Regeln entfernt. P708-W2: Markierung des Ansatzpunkts ohne `:has()` erhalten.
- Profilstand nachgetragen: `christaegger-dot/puk-website-profil` hat das Paket 2026.10.8 unabhängig geprüft (PR #138), die Befunde als 2026.10.9 umgesetzt (PR #139) und 2026.10.9 unabhängig geprüft (PR #140, alle gemergt am 23.10.2026). Dort offen: nichts.

**Technischer Stand des Entwurfs:** Selbsttest 84/84; Produktionsgate 23 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, unverändert); `--verify-site` Parität 34 Dateien bytegleich; Suchtest 216/216; Sprach-/UI-Test 73/73; Audit-04-Layouttest 230 Zustände, 25 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, Ausnahme B2c), neu mit Titelprüfung (0 Brüche ohne Trennstelle).

**Bewusst belassen:** P708-W3, P708-V4, H2. **Offen:** Screenreader-Prüfung (kein Screenreader verfügbar); Nachprüfung durch eine Sitzung, die nicht gebaut hat (Stand `e1d0952`, [NACHPRUEFUNG.md](audit-results/2026-10-23-r4-41-nachfuehrung/NACHPRUEFUNG.md)): Kennzahlen bestätigt, 0 blockierend, 1 wichtig (N41-W1: bei 200 % Schrift brechen «erkrankungen» bei 320 und 375 px sowie «betroffen» und «schlagen» bei 320 px innerhalb des Segments ohne Trennstelle; der Layouttest prüft nur auf Wortebene), 2 gering (N41-G1 Zeilenbilanz im Nachweis, N41-G2 Vermerk `appliedTo`), Empfehlung «Nachbesserung nötig (N41-W1), ohne Blocker; nach dem erfolgten Merge als Folge-PR»; Merge und Veröffentlichung nur auf Auftrag.

## Gestaltung 2026-10-21 · r4-40 · veröffentlicht am 22.10.2026

**GitHub:** [PR #708](https://github.com/christaegger-dot/borderline-angehoerige/pull/708), gemergt als `670c29f` am 22.10.2026 um 19:32 UTC auf Auftrag von Christa Egger («kannst du die offenen PR mergen?»). Vorher [PR #709](https://github.com/christaegger-dot/borderline-angehoerige/pull/709) (Nachprüfbericht 3 und `site/`), gemergt als `3f4968e` in den Branch `gestaltung/2026-10-21`. Beide Merges nach grünem CI-Lauf `build-and-compare` auf dem jeweiligen Kopf. Die Live-Site lieferte um 19:33 UTC `site.css?v=r4-40` und den neuen Satz auf «Auf sich achten» aus (eigene Abfrage mit `curl`, keine Prüfstufe).

**Inhalt:** Gestaltungsentwurf vom 21.10.2026 für die Startseite und «Borderline verstehen» (Dateien von Christa Egger ausserhalb des Repositorys vorbereitet), zwei neue Beispielsätze in `verstehen` › `#eisberg`, die fünf ausstehenden Abbildungen aus r4-39 (drei bestätigt, eine als Text, drei geändert), der Entscheid vom 21.10.2026 «Auf ‹Verstehen› entfällt der Akuthinweis; der Link ‹Wenn Suizidgedanken ein Thema sind› bleibt», drei Nachbesserungsrunden und der Satz «Sie dürfen auch zuerst für sich sorgen.» auf `selbstfuersorge`. Vollständige Beschreibung: `authoring/UEBERGABE-GESTALTUNG-2026-10-21.md`.

**Prüfstufen und Freigaben (alle in `authoring/PRUEFBERICHT.md`, Abschnitte «Prüfung PR #708», «Nachprüfung PR #708», «Nachprüfung 2 PR #708», «Nachprüfung 3 PR #708»):**
- Prüfung 21.10.2026 (Stand `3ae7916`): 20 Befunde, davon 3 blockierend; Nachbesserung 1 mit Commit `9f1eccd` und `d2dc969`.
- Nachprüfung 21.10.2026 (Stand `d2dc969`): B1–B5 behoben, neu N1 und N3 wichtig; Nachbesserung 2 mit Commit `4af037f`, `c741fe9`, `f50536e` (Ankreuzen delegiert: «ok, kreuze an und fahre fort»).
- **Fachfreigaben Christa Egger, 22.10.2026:** Beispielsätze F1 und F2 um 09:14 Uhr («ich gebe beide sätze frei», `audit-results/2026-10-22-v-vs-eisberg/FREIGABE.md`); Gestaltungsentscheide F3, F4 und W6 um 09:19 Uhr (`audit-results/2026-10-22-gestaltungsentscheide/ENTSCHEID.md`); die fünf Abbildungen aus r4-39 um 12:17 Uhr (`audit-results/2026-10-22-abbildungen/FREIGABE.md`). Produktionsgate danach 0 Blocker; `releaseApproval` unverändert.
- Nachprüfung 2 (Stand `45451ea`): 0 blockierend, 0 wichtig, 3 gering (NP2-1 bis NP2-3) und Hinweis H1; Empfehlung «weiter zu `site/` und Merge». Entscheid Christa Egger: die vier Punkte vorher beheben; Nachbesserung 3 mit Commit `2089968` (`audit-results/2026-10-22-nachbesserung-3/BERICHT.md`).
- Nachprüfung 3 (Stand `2089968`) durch eine Sitzung, die an PR #708 weder gebaut noch geprüft hatte: alle vier Punkte mit eigener Messung bestätigt, keine neuen Befunde, Empfehlung «weiter zu `site/` und Merge» (Commit `e01059f`).
- Die unabhängige Gesamtprüfung entfällt weiterhin nach dem Entscheid vom 18.10.2026 (siehe r4-38). Ein Screenreader stand in keiner Prüfung zur Verfügung; dieser Teil bleibt offen.

**Technischer Stand beim Merge:** Selbsttest 84/84; Produktionsgate 23 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, unverändert); `--verify-site` Parität 34 Dateien bytegleich; Suchtest 216/216; Sprach-/UI-Test 73/73; Audit-04-Layouttest 1 Abweichung (`tension core exceeds 1800px`, begründete Ausnahme B2c: die vier Phasen enden bei 375 px nach 1540 px, die Figur ist 1974 px hoch).

**Offen nach r4-40:**
- Screenreader-Prüfung der neuen Gestaltung (kein Screenreader verfügbar).
- Geringe Befunde W2, W3, W4 (verwaiste CSS-Regeln, u. a. `.bl-parallel-aspects`, `bl-observe`, `bl-knowledge-boundary`) und V4 aus der Prüfung vom 21.10.2026; nicht bearbeitet, optional.
- Hinweis H2 der Nachprüfung 3 ohne Befund: Die Hover-Regel für Aktionslinks im Einstieg nutzt `:not()` mit zusammengesetztem Selektor; ältere Browser zeigen den Zustand von vor der Nachbesserung 3 (4,40:1), keinen Rückschritt.
- Profilentscheid F3 (Rubik Medium für `h1`/`h2`) und Profilton F4 (Grundfläche `#F5F7FF` mit Auflage «kein kleiner Text in `#3C64FF` auf getönten Flächen»): **nachgetragen** im Repository `christaegger-dot/puk-website-profil` als Profil 2026.10.8 ([PR #137](https://github.com/christaegger-dot/puk-website-profil/pull/137), gemergt als `365dbb3` am 22.10.2026, 10:12 UTC; Entscheiddokument `ENTSCHEIDE-PROFIL-2026-10-8.md`, Tokens `--ui-tint`, `--surface-tint`, `--text-link-on-tint`, `--web-fw-title`). Nachtrag 23.10.2026: Paket 2026.10.8 unabhängig geprüft (PR #138), Befunde als Profil 2026.10.9 umgesetzt und geprüft (PR #139, #140); die Website übernimmt die Regeln W-2 und W-3 mit r4-41.

## Audit 04 · Gestaltung und Didaktik · r4-39

**GitHub:** [PR #707](https://github.com/christaegger-dot/borderline-angehoerige/pull/707), gemergt als `dccc8a3` (Status geprüft am 22.10.2026; am 18.10.2026 noch offen als Entwurf). Umsetzungscommit: `a3f810be76a51c6370644ac2137c7fcdd0b8494e`.

Die 16 Befunde A04-2003 bis A04-2018 sind technisch bearbeitet. Auftrag: «sehr gut. kannst du die Verbesserungen gleich direkt in github vornehmen?» [Umsetzungsbericht und Nachweise](audit-results/2026-10-18-a04-umsetzung/BERICHT.md).

**Status:** Entwurf, noch nicht zur Veröffentlichung freigegeben. Sechs neue bzw. visuell neu angeordnete Darstellungen sind zur einzelnen Fachfreigabe ausstehend; der unveränderte Produktionsaufruf benennt ausschliesslich diese sechs. **Nachtrag 22.10.2026:** Die ausstehenden Fachfreigaben wurden am 22.10.2026 im Rahmen von PR #708 erteilt (Abbildungen und Textfassung `v-vs-eisberg`, Nachweise siehe Abschnitt r4-40); der Produktionsaufruf läuft seither ohne Blocker. Die unabhängige Gesamtprüfung entfällt weiterhin nach dem ausdrücklichen Entscheid der Auftraggeberin. Keine neue Gesamtprüfung, keine erfundene Freigabe. [Umfang und Entscheide](audit-results/2026-10-18-a04-umsetzung/ENTSCHEIDE.md).

Technische Selbstprüfung: 82/82 Selbsttests, 216/216 Suchfälle, 75 UI-Prüfungen, 230 responsive Browserzustände und 25 Bedienproben ohne Abweichung, 34 bytegleiche Exportdateien. Kein Merge oder Deployment durch diese Sitzung.

## Sprachliche Überarbeitung · r4-38 · Fachfreigabe vom 18.10.2026

**GitHub:** [PR #706](https://github.com/christaegger-dot/borderline-angehoerige/pull/706), gemergt als `c54139c` (Status geprüft am 18.10.2026). Umsetzungscommit: `968573fae9a5690b271704b4b535469b9e73e230`.

Auftrag der Projektverantwortlichen vom 18.10.2026 nach Audit 03: «sehr gut, danke. Bitte überarbeite die Befunde direkt in github». Die 66 Befunde des Audits vom 18.10.2026 sind in den kanonischen Quellen umgesetzt, einschliesslich ihrer Querverweise. Nachweis, vollständige Befundzuordnung und Tests: [Überarbeitungsbericht](audit-results/2026-10-18-a03-umsetzung/BERICHT.md).

**Fachliche Freigabe durch Christa Egger am 18.10.2026:** Die drei überarbeiteten Abbildungen `v-bz-sichten`, `v-gr-dear`, `v-ge-forschung` und der neue Akuthinweis von r4-38 sind ausdrücklich freigegeben. Originalerklärung, Bezugscommit und Umfang: [FREIGABE.md](audit-results/2026-10-18-a03-umsetzung/FREIGABE.md). Die vier Freigabefelder sind mit Name, Datum und Beleg aktualisiert; die freigegebenen Texte und Abbildungen bleiben unverändert.

**Entscheid zur Gesamtprüfung, 18.10.2026, 19:49 Uhr:** Christa Egger verlangt keine unabhängige Gesamtprüfung mehr. Sie entfällt für r4-38; `releaseApproval.independentReview` ist als «entfaellt» mit versioniertem Entscheidbeleg dokumentiert. [Originalerklärung und Umsetzung](audit-results/2026-10-18-a03-umsetzung/VERZICHT-GESAMTPRUEFUNG.md). Die ursprünglichen fünf Freigabesperren in Prüflauf #58 und der einzelne Prüfpunkt nach der Fachfreigabe sind frühere Zwischenstände.

Die lokale technische Selbstprüfung der Überarbeitung bestand mit 79 Selbsttests, 216 Suchfällen und 75 Browserprüfungen. Der Nachtest der Freigabefelder bestätigte erneut 79/79 Selbsttests und die Byte-Parität aller 34 Exportdateien: [Nachtest der Fachfreigabe](audit-results/2026-10-18-a03-umsetzung/NACHTEST-FACHFREIGABE.txt). Nach dem Entscheid zur Gesamtprüfung bestehen 82/82 Selbsttests und beide Produktionsaufrufe ohne Blocker; 34 Exportdateien sind bytegleich. [Aktueller Nachtest](audit-results/2026-10-18-a03-umsetzung/NACHTEST-VERZICHT.txt). Kein Merge oder Deployment durch diese Sitzung.

Die frühere Tabelle mit 182 Sprachbefunden wird durch diese 66 gezielten Überarbeitungen nicht pauschal geschlossen. Der Merge von PR #706 ist als `c54139c` bestätigt. Audit 04 hat die Live-Ausgabe dieses Standes geprüft; die früheren Produktionsprotokolle weiter unten bleiben historische Nachweise.

## Gestaltung · r4-37

Auftrag der Projektverantwortlichen vom 17.10.2026: die optischen Verbesserungen selbstständig umsetzen. Proportionierte Bildschirmtitel, kompaktere Seitenköpfe und ein direkter Einstieg nach der eigenen Frage. Die lokale Grössenwahl bleibt innerhalb der Maximalgrade des PUK-Profils; Leseschrift, Fachtexte und Grafikaussagen bleiben erhalten. Nachweis und genaue Reichweite: `audit-results/2026-10-17-design/BERICHT.md`. Die Umsetzungssitzung bezeichnet ihren Nachtest als Selbstprüfung, nicht als unabhängige R3-Freigabe.

## Reparaturrunde · r4-36

Die Projektverantwortliche hat nach dem kritischen Audit die selbstständige Entscheidung und Umsetzung beauftragt. Korrigiert sind A03-178 (schriftliche gerichtliche Eingabe), A01-1001 (reguläre Telefonkontakte), A04-1001 (ruhiger Footer), der Selbsttest-Teil von R3C-A11/R29-P11 und R29-P12 (kompakter Mobilkopf). Nachweis: `audit-results/2026-10-17-umsetzung/BERICHT.md`. r4-36 wurde mit PR #703 gemergt; der Produktionsabgleich vom 17.10.2026 bestätigt 23/23 HTML-Seiten und 9/9 Nicht-HTML-Dateien. Die folgenden früheren Produktionsprotokolle bleiben historisch.

Die lokale technische Selbstprüfung ist keine neue fachjuristische oder unabhängige R3-Freigabe. Der weitergehende Teil von R3C-A11 zur versionsgebundenen Freigabe bleibt als ausdrücklich begrenzter Prozesspunkt erhalten; er wird nicht durch das Umbenennen einer Selbstprüfung als erledigt ausgewiesen. Externe fachliche und institutionelle Tatsachen werden nicht erfunden.

## Historische Produktionsnachweise

Die nachfolgenden r4-35- und älteren Nachweise dokumentieren ihren damaligen Stand. Der aktuelle Anwendungsstand und seine Prüfungen stehen am Anfang dieser Datei; historische Versionsangaben und damalige Telefonzählungen sind keine heutigen Arbeitsvorgaben.

### r4-35 veröffentlicht und nachgeprüft

#699 wurde am 16. Oktober 2026 um 16:57:03 UTC gemergt (Merge-Commit `8bbc8aa`, Stand `ff5016b`). Das war nach dem Codex-Review ohne Befund (10:19:59 UTC) und nach der Meldung «mergen» der bauenden Sitzung. R28-O01 und R29-P20 sind damit eingehalten.

r4-35 setzt die Korrekturrunde A8-K aus R3C-A8 um: Der Wortbruch «Behandlungsteam» ist behoben, und der Wortlaut von A8-02, A8-08, A8-09 und A8-11 (Variante V1) ist geändert, beides nach Freigabe vom 16.10.2026.

Die Produktionsprüfung lief am 16. Oktober 2026 von 16:59:48 bis 17:11:58 UTC in einer eigenen Sitzung (`audit-results/2026-10-16-delta-r4-35/PRODUKTIONSPRUEFUNG.md`). Ergebnis: bestanden, kein Befund.

- 46 von 46 Dokumenten tragen r4-35; die fünf Textstellen stehen wörtlich so.
- `css/site.css` und `js/interaktion.js` sind bytegleich mit `ff5016b`.
- `v-be-kontakt` zeigt bei 1280 und 1440 px keinen Wortbruch.
- 216 von 216 Anfragen der Testliste über die Pretty URLs; 0 `tel:`.

Nachweise: `audit-results/2026-10-16-r3c-a8/` und `audit-results/2026-10-16-delta-r4-35/`.

#700 (Nachweise zu Audit 03 und zur Produktionsprüfung r4-35, keine Website-Dateien) wurde am 16. Oktober 2026 um 17:36:38 UTC gemergt. Das war 28 Sekunden nach dem Eröffnen des PR (17:36:10 UTC, Auslöser des Codex-Reviews), 11 Sekunden nach dem ersten Codex-Kommentar (17:36:27 UTC) und vor der Meldung «mergen» der bauenden Sitzung; R28-O01 und R29-P20 sind damit nicht eingehalten. Das Review endete um 17:43:54 UTC mit sechs P2-Befunden zu den Nachweisen, keiner betraf die Website. Behoben sind sie im Folge-PR #701 (Branch `claude/a03-nachweise-korrektur-1792172998`). Auf #701 scheiterte das Codex-Review am Nutzungslimit; an seiner Stelle prüfte auf Entscheid der Auftraggeberin eine eigene Review-Sitzung.

### r4-34 veröffentlicht und nachgeprüft

#696 wurde am 15. Oktober 2026 um 20:51:27 UTC gemergt (Merge-Commit `4abe92c`, Stand `46442fb`). Das war nach dem Codex-Review (20:40:27 UTC) und nach der Meldung «mergen» der bauenden Sitzung (etwa 20:42 UTC). R28-O01 und R29-P20 sind damit eingehalten. Keiner der fünf Codex-Befunde blockiert nach R34-P01. Die vier Befunde zur Suche stehen in R34-P02; der fünfte betraf dieses Dokument und ist im Nachweis-PR #697 korrigiert.

Die Produktionsprüfung lief am 15. Oktober 2026 von 20:54 bis 21:26 UTC in einer eigenen Sitzung (`audit-results/2026-10-15-delta-r4-34/PRODUKTIONSPRUEFUNG.md`). Sie prüft r4-34. Ergebnis: bestanden mit Hinweisen, kein Befund.

- 23 Seiten mit Build r4-34; `interaktion.js` bytegleich mit `4abe92c`, auch unter alten Adressen
- Seiten inhaltlich gleich r4-31, ausser Buildmarker, `id="suizid-angesprochen"` und dem Suchindex
- 216 von 216 Anfragen der Testliste über die Pretty URLs, 12 von 12 Handproben (Codex-Fälle, Kinder, «Wenn Suizid angesprochen wird», harmlose Sätze)
- 0 `tel:`; ein einmaliger Status 502 auf `interaktion.js`, bei der Wiederholung nicht mehr

Ablauf r4-32 bis r4-34: Codex-Reviews von #694, #695 und #696, Varianten P, Q und R der Prüfsitzung, Stopp-Regel R34-P01. Nachweise: `audit-results/2026-10-15-delta-r4-32/` bis `…-r4-34/`.

Entscheide vom 15.10.2026 (`audit-results/2026-10-15-delta-r4-34/FREIGABE.md`, Nachtrag 2):
- «PR, Merge nach Meldung»: Die Auftraggeberin mergt erst nach der Meldung der bauenden Sitzung.
- «r4-32, Suizid unter Top 2»: die Stopp-Regel R34-P01. Sie ersetzt R31-P03; damit ist auch dessen Lesart unter «beide oben» erledigt.
- «Nein, so lassen» zu R32-P01.

Eine Branch-Regel auf `main` bleibt eine Option der Auftraggeberin.

Offen für die Auftraggeberin: Den Branch `claude/r4-30-suche-links-1792061353` löschen.

### r4-33 veröffentlicht, abgelöst durch r4-34

#695 wurde am 15. Oktober 2026 um 20:06:30 UTC gemergt (Merge-Commit `7bd5e6a`, Stand `ce56c1d`). Acht Sekunden vorher war der Entwurf auf «ready for review» gesetzt worden. Das war eine Minute nach dem Codex-Review und vor dessen Prüfung. R28-O01 und R29-P20 sind damit zum dritten Mal nicht eingehalten (#689, #694, #695). Ein Entwurf allein verhindert den Merge nicht.

r4-33 hat den Rückschritt aus r4-32 behoben, aber drei neue Rückschritte gebracht. Diese sind mit r4-34 behoben. Eine Produktionsprüfung von r4-33 wurde nicht durchgeführt und ist rückwirkend nicht mehr möglich. Die Seiteninhalte von r4-33 sind über die Prüfung von r4-34 abgedeckt: Nach Ersetzen der Build- und Assetmarker unterscheidet sich `site/` von r4-34 nur in `interaktion.js` (lokaler Vergleich der Git-Stände). Für das Suchskript von r4-33 gibt es nur eine Stichprobe (20:18 UTC: Marker r4-33, `interaktion.js` gleich `ce56c1d`).

### r4-32 veröffentlicht, abgelöst durch r4-33 und r4-34

#694 wurde am 15. Oktober 2026 um 19:32:36 UTC gemergt (Merge-Commit `4790653`, Stand `37b963f`). Das war 12 Sekunden nach dem Codex-Review und vor dessen Prüfung. R28-O01 und R29-P20 sind damit erneut nicht eingehalten.

r4-32 heftet bei Anfragen mit Tötungswort «Suizid» und «Gewalt» oben an (R31-P05). Ein Befund aus diesem Codex-Review blockiert nach R31-P03: Eine Gewaltaussage mit getrenntem Verb («bringt … um») und Zeit- und Ortsangabe dazwischen hat in der Produktion keinen Treffer, in r4-31 kam «Gewalt». Wortlaut: `audit-results/2026-10-15-delta-r4-32/FREIGABE.md`, Nachtrag 3.

Die Korrektur kam mit r4-33 und r4-34. Nachweise: `audit-results/2026-10-15-delta-r4-32/` und `audit-results/2026-10-15-delta-r4-33/`. Eine Produktionsprüfung von r4-32 wurde nicht durchgeführt und ist rückwirkend nicht mehr möglich. Die Seiteninhalte sind über die Prüfung von r4-34 abgedeckt: Nach Ersetzen der Build- und Assetmarker unterscheidet sich `site/` von r4-34 nur in `interaktion.js` (lokaler Vergleich der Git-Stände). Für das Suchskript von r4-32 gibt es nur eine Stichprobe (19:44 UTC: Marker r4-32, `interaktion.js` gleich `37b963f`).

### r4-31 veröffentlicht und nachgeprüft

#690 wurde am 15. Oktober 2026 um 17:28:49 UTC gemergt (Merge-Commit `5776316`, Stand `bd3d903`). Das fünfte Codex-Review war zu diesem Zeitpunkt noch nicht abgeschlossen; es endete 39 Sekunden später. R28-O01 und R29-P20 sind damit erneut nicht eingehalten. Der einzige Befund dieses Reviews ist nach R31-P03 nicht blockierend: Eine wiedergegebene Drohung mit «du … dich» und anderem Subjekt dazwischen geht auf Suizid statt Gewalt, also in die sichere Richtung. Er steht in R31-P04. Wortlaut: `audit-results/2026-10-15-delta-r4-31/FREIGABE.md`, Nachtrag 14.

Die Produktionsprüfung lief am 15. Oktober 2026 von 17:35 bis 18:00 UTC in einer eigenen Sitzung (`audit-results/2026-10-15-delta-r4-31/PRODUKTIONSPRUEFUNG.md`). Ergebnis: bestanden mit Hinweisen, alle 11 Punkte erfüllt.

- 23 Seiten mit Build r4-31; `interaktion.js` bytegleich
- 207 von 207 Textvergleichen gleich
- 9 von 9 Dateien bytegleich, 44 von 44 Sprungziele, 88 von 88 Weiterleitungen
- 317 von 317 Such-Ersttreffer wie festgeschrieben, darunter 19 Anfragen mit Satzzeichen
- Header, Robots und kein `Set-Cookie` wie entschieden; 0 `tel:`

Ablauf von r4-31: neun Runden mit Prüfsitzung und Codex, Varianten J, K, L und N der Prüfsitzung, Stopp-Regeln R31-P02 und R31-P03. Nachweis: `audit-results/2026-10-15-delta-r4-31/FREIGABE.md`, Nachträge 1 bis 14.

Offen für die Auftraggeberin: Den Branch `claude/r4-30-suche-links-1792061353` löschen; die bauende Sitzung kann es über den Proxy nicht. Den Pull Request #691 schliessen, einen leeren Copilot-Entwurf ohne Änderungen.

Inhalt von r4-31: zwei P1-Befunde aus dem zweiten Codex-Review von #689 korrigiert. Beide betreffen nur die Suche:

- Jedes Tötungsverb wird gewertet, und Suizid hat Vorrang. Bisher ging ein Satz mit einer Drohung gegen die eigene Person und einer eigenen Suizidaussage in r4-30 auf «Gewalt».
- Die Infinitivregel gilt nur noch mit Steuerverb. Bisher ging eine Gewaltaussage in zwei Teilsätzen mit «zu»-Infinitiv auf «Suizid». Wortlaut beider Fälle: `audit-results/2026-10-15-delta-r4-30/FREIGABE.md`, Nachtrag 9.

Den Entscheid hat die Auftraggeberin am 15. Oktober 2026 gefällt: «r4-31 jetzt». Nachweis: `audit-results/2026-10-15-delta-r4-31/`.

### r4-30 veröffentlicht und nachgeprüft

#689 wurde am 15. Oktober 2026 um 13:50:44 UTC gemergt (Merge-Commit `0fda233`, Stand `615bdd3`). Das war 13 Sekunden nach den zwei Codex-Befunden auf diesem Stand und bevor sie geprüft waren. R28-O01 und R29-P20 sind damit nicht eingehalten. Der veröffentlichte Stand ist von der Prüfsitzung bestätigt (Abschlussbestätigung 2, `0c711b8`). Die zwei Codex-Befunde behebt r4-31.

Die Produktionsprüfung lief am 15. Oktober 2026 von 13:59 bis 14:25 UTC in einer eigenen Sitzung (`audit-results/2026-10-15-delta-r4-30/PRODUKTIONSPRUEFUNG.md`). Ergebnis: bestanden mit Hinweisen, alle 11 Punkte erfüllt.

- 23 Seiten mit Build r4-30
- 207 von 207 Textvergleichen gleich
- 9 von 9 Nicht-HTML-Dateien bytegleich
- 44 von 44 Sprungziele
- 88 von 88 Weiterleitungen
- 272 von 272 Such-Ersttreffer gleich wie in der lokalen Kopie und wie festgeschrieben
- Header, Robots und kein `Set-Cookie` wie entschieden; 0 `tel:`

Optionale Hinweise: PC30-1 (Zählkorrektur im r4-29-Bericht) und PC30-2 (`suchtest.mjs` um eine Basis-URL und die Umrechnung auf Pretty URLs ergänzen, damit die Produktion direkt geprüft werden kann; Pendenz R31-P01).

r4-30 korrigiert drei Punkte aus r4-29:

- den P1-Befund aus dem Codex-Review von #687: «die sorgeberechtigten Eltern» auf «Fragen», «Behandlung» und der Jugendlichen-Seite; der Wortlaut ist von der Auftraggeberin am 15. Oktober 2026 um 13:13 Uhr freigegeben;
- die Suchlücken aus R3 (R3C-A9);
- die Linkregel auf «Quellen» (R3C-A10), dazu nach D30-02 das EBG-Blatt A1 ohne Link.

Dazu kommen der Zwischenspeicher der Suche (W3C-12) und die festgeschriebenen Suchtests (`authoring/tests/suche-ersttreffer.tsv`, `authoring/tools/suchtest.mjs`). Nachweis: `audit-results/2026-10-15-delta-r4-30/`.

Auslegung der Linkregel (Entscheid vom 15. Oktober 2026, D30-05): Ein eingeklappter Notfall-Knopf, dessen Nummern erst nach einem Klick erscheinen, gilt nicht als Notfallblock. Die PUK-Seiten bleiben deshalb verlinkt.

### r4-29 (Release C) veröffentlicht und nachgeprüft

Release C (r4-29) setzt die Pakete 4 und 6 des Massnahmenplans vom 14. Oktober 2026 um, dazu die Befunde W2-001 bis W2-023 und die Entscheide E4, E7 und E9: neue Seite «Wenn Ihr jugendliches Kind betroffen ist», Kürzungen auf fast allen Seiten (30 666 statt 35 422 Wörter), Verweis im Text 7-mal statt 28-mal. Die Fassungen hat die Auftraggeberin am 15. Oktober 2026 freigegeben. Geprüft wurde in eigenen Sitzungen: Rechtsabgleich, Sprach-Review S, W3 und R3 («Go mit Auflagen», angenommen).

Ablauf des Merge:

- Pull Request #687 (Stand `a7c5ec1`, Produktionsexport) wurde am 15. Oktober 2026 um 09:48 UTC eröffnet und um 09:49:24 UTC gemergt (Merge-Commit `0fc0474`). Das war vor der Annahme von R3 und bevor das Codex-Review fertig war (09:53:30 UTC). R28-O01 ist damit nicht eingehalten.
- Codex meldete danach zwei Befunde. Der P2-Befund (Pendenzen nicht nachgeführt) ist mit #688 erledigt. Der P1-Befund («die Eltern» statt «die sorgeberechtigten Eltern») wird in r4-30 korrigiert.
- Die Nachweise kamen mit #688 (Merge-Commit `53c5655`, 10:11:46 UTC); `site/` blieb dabei unverändert. Das Codex-Review von #688 sah nur die Nachweis-Commits.

Die Produktionsprüfung (R3C-A6) lief am 15. Oktober 2026 von 10:18 bis 10:44 UTC in einer eigenen Sitzung. Ergebnis: bestanden mit Hinweisen, alle 11 Punkte erfüllt.

- 23 Seiten mit Build r4-29
- 207 von 207 Textvergleichen gleich
- 9 von 9 Nicht-HTML-Dateien bytegleich
- 36 von 36 Sprungziele
- 88 von 88 Weiterleitungen
- 102 von 102 Such-Ersttreffer wie lokal
- Header, Robots und kein `Set-Cookie` wie entschieden

Nachweis: `audit-results/2026-10-15-release-c-r4-29/`, darin `PRODUKTIONSPRUEFUNG.md`.

### r4-28 veröffentlicht und nachgeprüft

r4-28 korrigiert fünf Aussagen aus r4-27, die das Codex-Review von PR #684 beanstandet hat: den Fristbeginn für das Verlängerungsgesuch beim Gewaltschutz (§ 6 Abs. 1 GSG) und die Höchstdauer im Gesetzeswortlaut (§ 6 Abs. 3 GSG), die Aussage zur ipw, die Definition hinter 85 % Remission, die neun Kriterien nach DSM-5-TR und die Einschränkung von Blades et al. (2018) auf Befragungen in Studien. Die konkreten Fassungen wurden am 14. Oktober 2026 im Namen der PUK freigegeben. Der Produktionsbuild meldet 22 Seiten, 0 Blocker und 0 Hinweise; 33 Dateien sind bytegleich. PR #685 wurde als Merge-Commit `86304d428e8fd7de7eb3d9a0d4b3d9ed13527b41` übernommen. Netlify veröffentlichte am 15. Oktober 2026 um 04:37 UTC den Produktionsdeploy `6ad05887e9398ce80e74cab8`. Der anschliessende Produktionstest bestand 44 von 44 Seitenläufen mit Buildmarker und Assets r4-28, 54 von 54 Such-Ersttreffer wie lokal, 26 von 26 Suchintentionen, alle 7 neuen und 5 entfernten Formulierungen, 8 von 8 Sprungziele, den No-JavaScript-Fallback, die 404-Seite, Sicherheitsheader und `robots.txt`; die 9 ausgelieferten Nicht-HTML-Dateien sind bytegleich mit `site/`. Die fünf beanstandeten Stellen standen vom 14. Oktober 2026, 20:53 UTC, bis zum 15. Oktober 2026, 04:37 UTC, online. Der Nachweis liegt unter `audit-results/2026-10-14-delta-codex-r4-28/`. Neu offen ist R28-O01: einen Pull Request erst nach abgeschlossenem und geprüftem Codex-Review mergen.

### r4-27 veröffentlicht und nachgeprüft

Release B (r4-27) setzt die Pakete 2 (Kernwissen), 3 (Schweizer Recht), 5 (Anlaufstellen und Literatur) und 7 (Quellen) des Massnahmenplans vom 14. Oktober 2026 um und zieht M6.7 vor. Die konkreten Fassungen wurden am 14. Oktober 2026 im Namen der PUK freigegeben; Paket 3 hat der Auftraggeber ohne Prüfung durch den Rechtsdienst freigegeben. PR #684 wurde als Merge-Commit `8dbf1be6b291cb3fd8f5daa5db5202e9f8eac3fb` übernommen. Netlify veröffentlichte am 14. Oktober 2026 um 20:53 UTC den Produktionsdeploy `6acfebd961b825c290b87077`. Der anschliessende Produktionstest bestand 44 von 44 Seitenläufen mit Buildmarker und Assets r4-27, 54 von 54 Such-Ersttreffer wie lokal, 26 von 26 Suchintentionen, alle 40 neuen und 14 entfernten Formulierungen, 8 von 8 Sprungziele, den No-JavaScript-Fallback auf vier Seiten, die 404-Seite, Sicherheitsheader und `robots.txt`; die 9 ausgelieferten Nicht-HTML-Dateien sind bytegleich mit `site/`. Der Nachweis liegt unter `audit-results/2026-10-14-delta-release-b-r4-27/`. Offen bleiben R27-O01 bis R27-O05: die juristische Prüfung der Rechtstexte, R2 für die neue Abbildung auf «Genesung», die Wortbilanz (+1312 Wörter; «Behandlung» 3145, Ziel nach Release C unter 2400), die Teilwortsuche bei «FU» und die direkte Bestätigung der Angebote von ipw und iks.

### r4-26 veröffentlicht und nachgeprüft

Die Nachbesserung von Release A (r4-26) wurde mit PR #682 als Merge-Commit `b1815260ff77901e29fdfcd001a92391aa907b77` übernommen. Netlify veröffentlichte am 14. Oktober 2026 um 17:12 UTC den Produktionsdeploy `6acfb7f924705af6e61b1e33`. Der anschliessende Produktionstest bestand 42 von 42 Seitenläufen mit Buildmarker und Assets r4-26, 54 von 54 Such-Ersttreffer wie lokal, 11 von 11 festgeschriebene Suchintentionen, alle neuen und entfernten Formulierungen, den No-JavaScript-Fallback, die 404-Seite, Sicherheitsheader und `robots.txt`; die 9 ausgelieferten Nicht-HTML-Dateien sind bytegleich mit `site/`. r4-26 schliesst die nur teilweise erfüllten Abnahmekriterien von M1.1, M1.5, M1.6 und M1.8 sowie R25-O01 und R25-O03. Der Nachweis liegt unter `audit-results/2026-10-14-delta-nachbesserung-r4-26/`. Offen bleiben R26-O01 bis R26-O04, darunter die Wortbilanz von «Krisen begleiten» (1949 Wörter, Ziel nach Release C höchstens 1800).

### r4-25 veröffentlicht und nachgeprüft

Release A (r4-25, Paket 1 Sicherheit: Suizidalität und Selbstverletzung) wurde mit PR #681 als Merge-Commit `d29ca85d207ae9162bda329bec3d9073748e50ab` übernommen. Netlify veröffentlichte am 14. Oktober 2026 um 15:18 UTC den Produktionsdeploy `6acf9d4d6d2b65496d1a1775`. Der anschliessende Produktionstest bestand 42 von 42 Seitenläufen mit Buildmarker und Assets r4-25, 54 von 54 Such-Ersttreffer wie lokal, 9 von 9 neue Suchintentionen, alle neuen und entfernten Formulierungen, den No-JavaScript-Fallback, die 404-Seite, Sicherheitsheader und `robots.txt`. Grundlage sind der inhaltliche Review W1 (`audit-results/2026-10-14-inhalt-w1-r4-24/`) und der Massnahmenplan vom 14. Oktober 2026; der Nachweis liegt unter `audit-results/2026-10-14-delta-sicherheit-r4-25/`.

### r4-23 und r4-24 gemergt und ausgeliefert

PR #679 (r4-23, Sprachmassnahmen A03-019 bis A03-038) wurde als Merge-Commit `9dad4ba9b5b24b055ce0defb23e9de32b7e8f5ad` übernommen, PR #680 (r4-24, Footer als visuelle Sekundärebene) als Merge-Commit `38007a024e73703b132ab7ae9e34c6b4623e54b5`. Laut Netlify war vom 14. Oktober 2026, 12:26 UTC, bis zur Veröffentlichung von r4-25 der Produktionsdeploy `6acf74dbec424b04acd344d1` mit Commit `38007a0` aktiv. Ein eigener Produktions-Smoke-Test für r4-23 und r4-24 ist nicht dokumentiert; ihre Seiten wurden im Produktionstest von r4-25 strukturell mitgeprüft. Der Nachweis zu r4-23 liegt unter `audit-results/2026-10-14-delta-sprach-r4-23/`.

### r4-22 veröffentlicht und nachgeprüft

PR #676 wurde als Merge-Commit `7864dab6f48ef4e52db1e783387032a0c0de8e93` übernommen. Die öffentliche Website lieferte danach r4-22. Der anschliessende Produktions-Smoke-Test bestand 169 von 169 Browserprüfungen ohne Laufzeitfehler. Bestätigt wurden alle 21 regulären Seiten, die eigene 404-Seite, 320-Pixel-Reflow, Tastaturbasis, No-JavaScript-Fallback, alle 36 festgeschriebenen Such-Ersttreffer, Sicherheitsheader, Robots-Steuerung und repräsentative Weiterleitungen. Das Produktionsergebnis ist in PR #676 und unter `audit-results/2026-10-14-delta-review-r4-22/` dokumentiert.

Das abschliessende Audit 06 wurde auf dem damals aktuellen `main`-Commit `160a42f92eb78e4a0af806fc74babea1ab712937` und der öffentlichen Produktion wiederholt. Es fand keine neuen P0-/P1-Befunde oder Release-Blocker und bestätigt ein **CONDITIONAL GO** für den fortgesetzten Betrieb von r4-22. Die Einschränkung betrifft weiterhin die fehlende interne Rechts-/Datenschutz-Gesamtprüfung und die bewusst nicht durchgeführten realen Screenreader-, Geräte- und Nutzendentests; sie ist keine technische Releaseblockade. Der aktuelle Abschlussnachweis liegt unter `audit-results/2026-10-14-abschluss-r4-22/`.

### r4-21 veröffentlicht und nachgeprüft

Die P1- sowie die fachlichen, rechtlichen, sprachlichen und visuellen P2-Korrekturen des Bestandsaudits vom 13. Oktober 2026 wurden mit PR #672 gemergt. Die Produktion unter `https://borderline-angehoerige.netlify.app` lieferte danach zunächst Build r4-19; der danach nachgeprüfte Produktionsstand war Build r4-21.

Der anschliessende Produktions-Smoke-Test bestätigte Seiten, Nutzerwege, 404, Weiterleitungen, Header, Robots-Steuerung, Cache-Regeln und Buildparität. Er fand jedoch eine P1-Suchlücke: direkte Begriffe wie «Suizidgedanken» funktionierten, gleichbedeutende Mehrwortformulierungen wie «Mein Kind will nicht mehr leben» führten nicht zuverlässig zu den Kriseninhalten. Damit war die Produktionsbedingung aus Audit 06 nicht vollständig erfüllt.

Der eng begrenzte Hotfix wurde mit PR #673 gemergt. Build r4-20 erkennt Mehrwort-Intentionen vor Einzelwörtern und priorisiert die längste passende Phrase. Der lokale Delta-Smoke-Test bestand 134 von 134 Prüfungen; der anschliessende Produktions-Smoke-Test bestand 154 von 154 Prüfungen. Alle 14 gezielten Safety-/Überlastungssuchen führen zum vorgesehenen Ersttreffer. Der P1-Suchbefund ist damit geschlossen. Der Nachweis liegt unter `audit-results/2026-10-13-delta-suche-r4-20/`; das Produktionsergebnis ist zusätzlich in PR #673 dokumentiert.

Die Rechts-/Datenschutzdurchsicht bleibt zudem als Evidenzgrenze bestehen: Die Texte sind am Zürcher IDG ausgerichtet, aber noch nicht nachweislich durch die zuständige interne Stelle geprüft. Die technische Umsetzung ist dadurch nicht blockiert; eine vollständige Schliessung der rechtlichen Audit-Akzeptanzkriterien wäre ohne diesen Nachweis jedoch falsch.

### P3-Optimierungspaket r4-21

Mit PR #674 wurden die redaktionellen Befunde A03-010 bis A03-018 und die visuell-didaktischen Befunde A04-005 bis A04-007 umgesetzt. Die Änderungen vereinfachen Schnellorientierungen, bereinigen Grammatik und Satzzeichen, entlasten dichte Passagen und schärfen die Aussagen der drei betroffenen Wissensdarstellungen. Der Krisenhinweis beim DEAR-Modell steht nun ausserhalb der Figur im zugehörigen Abschnitt.

Die Altersinklusion der Angehörigenberatung wurde über alle 22 ausgelieferten Seiten und die kanonischen Quellen geprüft. Es gibt keine Aussage, welche die Beratung auf Erwachsene begrenzt. Der bestätigte Satz steht im Footer nun auch typografisch als eigener vollständiger Satz: «Die Fachstelle Angehörigenarbeit der PUK berät Angehörige kostenlos und vertraulich.»

Der lokale Produktions-Build meldet 22 Seiten, 0 Blocker und 0 Hinweise; 33 Dateien sind bytegleich zum generierten Export. Eine Browsermatrix aus 22 Seiten, vier Breiten und zwei Textgrössen bestand 1150 von 1150 Einzelprüfungen ohne Laufzeitfehler. Alle 36 Such-Ersttreffer sind gegenüber der Produktion r4-20 unverändert; die sechs Safety- und drei Überlastungssuchen bleiben korrekt. Die drei geänderten Wissensdarstellungen wurden bei 320 und 1440 CSS-Pixel visuell kontrolliert.

A03-H01 bleibt als nicht empirisch überprüfte Wirkungshypothese dokumentiert. Der Titel «Krisen begleiten» wurde nicht geändert; ohne reale Nutzendentests wird weder eine belastende noch eine entlastende Wirkung behauptet.

PR #674 wurde als Merge-Commit `1cb33e0a1bd499c7b8367213851373b6dd027ab5` übernommen. Die öffentliche Website lieferte danach r4-21. Der anschliessende Produktions-Smoke-Test bestand 169 von 169 Browserprüfungen ohne Laufzeitfehler. Alle 21 regulären Seiten, die eigene 404-Seite, Tastaturbasis, No-JavaScript-Fallback, alle 36 festgeschriebenen Such-Ersttreffer, Sicherheitsheader, Robots-Steuerung und repräsentative Weiterleitungen wurden bestätigt. Das Produktionsergebnis ist in PR #674 dokumentiert.

## Aktuell sofort umsetzbare Pendenzen

### Entscheide zum Massnahmenplan vom 14. Oktober 2026

| Nr. | Frage | Stand | Datum | Entschieden von |
| --- | --- | --- | --- | --- |
| E1 | Zahl zu Suizidversuchen nennen? | entschieden: keine Zahl, qualitativ «häufig» | 14.10.2026 | Auftraggeber, Fachstelle Angehörigenarbeit |
| E2 | Erblichkeit beziffern? | entschieden: «rund 40 bis 50 %» mit Einordnung (M2.8, r4-27) | 14.10.2026 | Auftraggeber |
| E3 | Bezeichnung zu F60.31 ergänzen (Neuentscheid zu V-1)? | entschieden: ICD-10-GM-Wortlaut ergänzt (M2.2, r4-27) | 14.10.2026 | Auftraggeber |
| E4 | Wie Eltern von Jugendlichen ansprechen? | entschieden: eigene Seite «Wenn Ihr jugendliches Kind betroffen ist» (r4-29) | 15.10.2026 | Auftraggeberin |
| E5 | Mason und Kreger als Beleg? | entschieden: (a) auf «Krisen begleiten» ersetzt, sonst als Praxisanregung kennzeichnen | 14.10.2026 | Claude, vom Auftraggeber delegiert |
| E6 | Nicht zitierte Quellen im öffentlichen Verzeichnis? | entschieden: ins interne Prüfprotokoll `authoring/QUELLEN-HINTERGRUND.md` verschoben (M7.2, r4-27) | 14.10.2026 | Claude, vom Auftraggeber delegiert |
| E7 | Zuständigkeitssatz im Text | entschieden: höchstens einmal pro Seite, nur auf Seiten zu Selbstgefährdung, Gewalt oder akuter Krise (sieben Seiten, r4-29) | 15.10.2026 | Auftraggeberin |
| E8 | Am 14.10.2026 freigegebene Stellen wieder öffnen? | entschieden: A03-019 nach «Behandlung» verschoben (M3.4), A03-025 nur ergänzt (M3.5), A03-026 nicht geöffnet (r4-27) | 14.10.2026 | Claude, vom Auftraggeber delegiert |
| E9 | Redaktionsregel für Vorbehalte | entschieden: höchstens ein Vorbehalt pro Abschnitt, ausgenommen Sicherheits- und Rechtsgrenzen; dieselbe Regel für Entlastungssätze, ein Kernsatz pro Seite (r4-29) | 15.10.2026 | Auftraggeberin |
| E10 | Abbildung 2 auf «Genesung» | entschieden: ersetzt durch «Was sich oft zuerst bessert, was länger bleibt» (M2.6, r4-27; R2 offen) | 14.10.2026 | Claude, vom Auftraggeber delegiert |

Zu Paket 3 (Schweizer Recht) entschied der Auftraggeber am 14. Oktober 2026, es in Release B umzusetzen und die Fassungen selbst freizugeben, ohne Prüfung durch den Rechtsdienst. Das Abnahmekriterium «Rechtsdienst hat den Wortlaut bestätigt» (M3.1, M3.3) ist damit nicht erfüllt; die juristische Prüfung bleibt als R27-O01 empfohlen.

Für Release C hat die Auftraggeberin am 15. Oktober 2026 ausserdem entschieden:

- Selbstbeschreibung in der Fusszeile: «Sie richtet sich an Angehörige und Bezugspersonen und ergänzt die Beratung der Fachstelle.» (W2-012)
- neue Seite ohne vorherige KJPP-Abstimmung veröffentlichen (F0, Option A)
- W3-Korrekturen «Suche und Kleines jetzt»
- R3 «Go mit Auflagen» annehmen; W1 und R1 für r4-29 «entfällt»
- drei Links auf «Quellen» entfernen, die auf Seiten mit Notfallblock führen
- Suchlücken und Linkentfernung in r4-30 direkt nach dem Merge

Belege: `audit-results/2026-10-15-release-c-r4-29/FREIGABE.md` mit den Nachträgen 1 und 2.

### Release C (r4-29) · Auflagen aus R3 und neue Pendenzen

| Nr. | Pendenz | Frist | Wer |
| --- | --- | --- | --- |
| R3C-A5 | Codex-Review abschliessen und prüfen; Merge nur auf ausdrücklichen Auftrag (wie R28-O01) | bei #687 nicht eingehalten (siehe «r4-29 veröffentlicht»); gilt weiter für jeden Pull Request | bauende Sitzung, Auftraggeberin |
| R3C-A6 | Produktionsprüfung r4-29 | erledigt 15.10.2026: bestanden mit Hinweisen (`PRODUKTIONSPRUEFUNG.md`) | Prüfsitzung, die nicht gebaut hat |
| R3C-A8 | Visualisierungs-Check und R2 für die 12 Abbildungen mit neuem Wortlaut und für `v-ge-forschung` (R27-O02) | erledigt 16.10.2026 (PR #698): 11 von 13 Abbildungen tragen, die Validierungstabelle trägt als Text; 1 wichtig (A8-11), 10 optional (A8-01 bis A8-10, davon A8-01 = R3C-06 und A8-07 = W3C-04 als Querverweise). Bericht in `authoring/PRUEFBERICHT.md`, Abschnitt «Visualisierungs-Check und R2 der Abbildungen nach Release C»; Nachweise und Skripte in `audit-results/2026-10-16-r3c-a8/`. Die Spalte «Status» beider Stufen bleibt «erledigt» (Entscheid 16.10.2026); die Korrekturen stehen in A8-K und A8-S | Prüfsitzung |
| A8-K | Korrekturrunde aus R3C-A8: (1) A8-01 (= R3C-06, «Behandlungstea / m» bei 1280 und 1440 px in `v-be-kontakt`) technisch beheben, ohne neuen Wortlaut und ohne den Profilentscheid R29-P10 abzuwarten; (2) A8-02 (Bezug von «davon»), A8-08 («Garantie» statt «Versprechen») und A8-09 («zum Beispiel» an Stelle 2 der Anspannungskurve) mit genauem Wortlaut zur Freigabe vorlegen; (3) A8-11 (Suizidversuche unter «Impulsive Handlungen» in `v-ge-forschung`, Wortlaut vom 14.10.2026): Varianten vorlegen, die Fachstelle entscheidet am Wortlaut; (4) danach Nachprüfung durch eine Prüfsitzung, die nicht gebaut hat (1280, 1440 und 360 px, 200 %, Skripte aus `audit-results/2026-10-16-r3c-a8/skripte/`) | umgesetzt in r4-35: Wortlaut am 16.10.2026 freigegeben («Freigabe»; A8-11 «V1 ‹Selbstgefährdend›»), unabhängig geprüft («freigabefähig» nach Auflage R35-01), Export geschrieben (`audit-results/2026-10-16-delta-r4-35/`); veröffentlicht mit #699 (Merge-Commit `8bbc8aa`, 16.10.2026) und in der Produktion nachgeprüft (R35-P01: bestanden) | bauende Sitzung; Freigabe: Auftraggeberin (Fachstelle); Nachprüfung: Prüfsitzung |
| A8-S | Gesammelte optionale Befunde aus R3C-A8, ohne Frist: A8-03 (Kurztext von `v-ko-tassen` ohne «links … rechts»), A8-04 (Oberkante der Kindkarte in `v-ki-alltag`, «Verantwortung für Krisen»), A8-05 (Spaltentitel und Kurztext von `v-ge-forschung`), A8-06 (Einleitung der Validierungstabelle), «überarbeiten» für `v-vs-bewertungen` (Variante 1 aus dem R2 vom 13.10.2026). A8-07 gehört zu R29-P09, A8-10 zu R29-P10. Hinweise aus Audit 03 (A03-R35, `audit-results/2026-10-16-modul-03-r4-35/BERICHT.md`, Abschnitt 5): zu A8-03 ein Wortlaut ohne «den Schmerz» (`teile/G3-befunde.csv`, G3-014), zu A8-06 der Wortlaut von G3-017, zu A8-04 die sechsfache Reihe «Kinder müssen weder …» | offen | bauende Sitzung, Freigabe |
| R3C-A9 | Suchlücken schliessen: «Selbstmordgedanken», «Selbstmordversuch», «lebensmüde», «Todeswunsch», «Suizidandrohung», «Überdosis» u. a. ohne Treffer; eine Drohung gegen die eigene Person («droht» mit Infinitiv) auf Gewalt statt Suizid (Wortlaut: `audit-results/2026-10-15-delta-r4-30/PRUEFUNG.md`, Ergebnis je Prüfpunkt); Anfragen festschreiben | in r4-30 umgesetzt; festgeschrieben in `authoring/tests/suche-ersttreffer.tsv` (317 Anfragen); Tötungsverben nach Teilsatz, Sprecher und Objekt gewertet, mit Suizid-Vorrang bei «sich», Suizid-Phrasen und Suizidwörtern (D30-09, D30-13, D30-16 bis D30-20, Codex P1 auf #689); veröffentlicht mit r4-30 (#689) und in der Produktion nachgeprüft; Suchregel ergänzt in r4-31 | bauende Sitzung; Nachprüfung durch Prüfsitzung |
| R3C-A10 | Drei Links auf «Quellen» entfernen (Forensic Nurses, Opferhilfe «Schutz», Pro Juventute), nach D30-02 auch EBG-Blatt A1; Angabe bleibt als Text, Linkregel bleibt | in r4-30 umgesetzt; veröffentlicht mit r4-30 (#689) und in der Produktion nachgeprüft; Suchregel ergänzt in r4-31 | bauende Sitzung |
| R3C-A11 | Selbsttest des Gates auf diese Website umstellen, Aufruf über Schalter und CI; R3 im Gate an die Änderungsrunde binden (W3C-07, R3C-04) | 13.11.2026 | bauende Sitzung; Nachprüfung durch Prüfsitzung |
| R29-P01 | PatG ZH § 15 Abs. 2 (vermutetes Einverständnis gegenüber Bezugspersonen in Spitälern): mit der PUK klären; Musterbrief auf «Behandlung» allenfalls anpassen | offen | Auftraggeberin, PUK |
| R29-P02 | Mögliche Ergänzungen aus dem Rechtsabgleich: Bezugsperson und Patientenverfügung ab 18, gewaltfreie Erziehung (Art. 302 ZGB), Auskunft für Eltern ohne elterliche Sorge (Art. 275a ZGB) | offen | Auftraggeberin |
| R29-P03 | KJPP-Abstimmung der Seite «Wenn Ihr jugendliches Kind betroffen ist» (M4.3) | offen | Auftraggeberin, KJPP |
| R29-P04 | Impressum: rechtliche Bezeichnung der PUK; wessen «schriftliche Zustimmung» | offen | Auftraggeberin |
| R29-P05 | Bücher › Aguirre: ist «leitet das McLean-Hospital-Programm» aktuell? | offen | bauende Sitzung |
| R29-P06 | Stellen mit Platzbedarf aus S: «Remission» und DBT, MBT, TFP auf «Fragen», DSM-5-TR und ICD-11 im Glossar, zwei Verweise auf «Grenzen setzen» | offen | bauende Sitzung, Freigabe |
| R29-P07 | Quellenzuordnung: äussere Zeichen der Anspannungskurve; Mason und Kreger auf «Auf sich achten» | offen | bauende Sitzung, Freigabe |
| R29-P08 | Angebote für junge Erwachsene auf «Behandlung» (M5.5) | offen | Auftraggeberin |
| R29-P09 | W3C-04 Validierungstabelle: ARIA-Rollen, doppelte Ansage, Container-Abfrage (dazu A8-07: bei 200 % Schrift ab 761 px waagrechtes Scrollen) | Profilentscheid | Auftraggeberin (Profil) |
| R29-P10 | W3C-05 Silbentrennung in Überschriften und `-webkit-hyphens` (dazu R3C-06 «Behandlungsteam», in r4-35 technisch behoben (A8-K); A8-10: Wortbrüche in drei Kernaussagen bei 768 px mit 200 %, Vorschlag der Prüfsitzung: W3C-05 auf Kernaussagen und Schrittlisten ausdehnen) | Profilentscheid | Auftraggeberin (Profil) |
| R29-P11 | W3C-07 Selbsttest (siehe R3C-A11) | umgesetzt am 17.10.2026: aktuelle Seiten statt fremder Vorlagenseiten; 79/79 Fälle, eigener CLI-Einstieg und CI | technische Selbstprüfung; Nachweise im Umsetzungslauf |
| R29-P12 | W3C-10 Kopfbereich auf dem Smartphone (`NAV_MAX`) | umgesetzt am 17.10.2026: sechs Hauptpunkte im vorhandenen bedienbaren Mobilmenü; Desktop-Navigation unverändert | lokaler Nutzerauftrag, kein gemeinsamer Profilumbau |
| R29-P13 | W3C-11 Strategie für `aria-label` an Inhaltslinks | Wartung | bauende Sitzung |
| R29-P14 | W3C-12 Leistung der Suche (Zwischenspeicher) | in r4-30 umgesetzt | bauende Sitzung |
| R29-P15 | W3C-13 Kommentare im ausgelieferten CSS und JS | Wartung | bauende Sitzung |
| R29-P16 | W2-017 Begriffe in «Wann Sie Auskunft erhalten können»: Reihenfolge nach Häufigkeit prüfen | offen | bauende Sitzung, Freigabe |
| R29-P17 | R3C-05 `responsibility.reviewedAt` nachführen; R3C-07 «Quellen» beim nächsten S lesen; R3C-08 Alias-Anker `begriffe#b-set` nur bei Bedarf | optional | bauende Sitzung |
| R29-P18 | PC29-1: Netlify setzt die Kopfzeilen aus `_headers` auf 301-Antworten nur teilweise (114 von 440 Abrufen); Seiten und Dateien nicht betroffen. PC29-2: Netlify liefert `Strict-Transport-Security` mit `preload`, das in `_headers` nicht steht (strenger). | optional, nur vermerken | – |
| R29-P19 | P1 aus #687 (sorgeberechtigte Eltern) | erledigt: in r4-30 korrigiert, veröffentlicht mit #689 und in der Produktion nachgeprüft | bauende Sitzung |
| R29-P20 | Vor jedem Merge prüfen, dass genau ein Pull Request für die Änderung offen ist und das Codex-Review auf dessen Stand mit dem vollständigen Inhalt lief. Die bauende Sitzung holt `main` jeweils frisch (Fetch ohne veraltete Branches). | ab sofort; bei #689 nicht eingehalten (Merge 13 s nach den Codex-Befunden, siehe r4-31) | bauende Sitzung, Auftraggeberin |
| R30-P01 | Weitere Suchlücken aus D30-04, D30-08 und D30-12: «Sorgerecht», «Klinik sagt mir nichts», «sie trinkt jeden Abend», «er zerstört Sachen in der Wohnung», «er hat mir gedroht», eine wiedergegebene Suizidankündigung in der Ich-Form, «lebensmüde Frau» (Ersttreffer «Quellen»); schwache Treffer «Überdosis Alkohol», «Medikamente gegen Angst»; mehrdeutig «sie hat ihre Tabletten genommen» (→ «Suizid») und «Mord» allein (→ «Suizid», weil «mord» in «Selbstmord» steckt). Aus D30-14 (fachlich abwägen): Redewendungen «das bringt mich um», «der Stress bringt mich um» → «Suizid»; eine verneinte Suizidaussage zusammen mit Erschöpfung → «Suizid» (r4-29: «Warnsignale»). Aus D30-15: Zitate mit «bringe … mich … um» (zwei wiedergegebene Suizidankündigungen) und «bringt … sich … um» mit Nebensatz (eine wiedergegebene Suizidankündigung mit Bedingung) ohne Treffer; «töten» und «umgebracht» allein ohne Treffer. Aus der dritten Nachprüfung: eine Tötung im Passiv und eine Suizidsorge in Stichwörtern ohne Treffer; zwei wiedergegebene Drohungen mit «dich» ohne Treffer oder unpassend; eine umschriebene Suizidsorge um die Mutter → «Schuld» (Wortlaut nur in `f700885`); Stichwörter aus Familienwort und Tötungsverb unpassend (wie r4-29). Aus der vierten Nachprüfung, bewusst in der sicheren Richtung: Drohungen mit reflexivem Verb in einem früheren Teilsatz → «Suizid» (Wortlaut der zweiten Probe nur in `f700885`); erweiterter Suizid → «Suizid» statt «Gewalt», Zuordnung durch die Fachstelle zu bestätigen. D30-21 (optional): verneinte Suizidwörter zählen als Suizid-Signal (eine Drohung nach verneintem «suizidal» → «Suizid»). Aus der Nachprüfung von #690 (Grenzfälle nach R31-P02): G1 eine Drohung gegen die Kinder mit anschliessender Angstaussage, ohne Satzzeichen (mit Variante K wieder Gewalt), G2 eine Gewaltaussage in zwei Teilsätzen ohne Satzzeichen mit «zu»-Infinitiv → «Suizid» wie in r4-30, G3 eine Suizidankündigung nach «dann» mit der Wortstellung Verb, «ich», «mich» → «Gewalt» (diese Wortstellung nach R25-010 ausgenommen, Fachstelle bestätigen), G4 mehrdeutige Sätze mit Tötungsverb ohne Objekt; mit Variante K gehen fünf Gewaltsätze in die sichere Richtung auf «Suizid», z. B. eine Drohung mit «schwören». Aus Abschlussbestätigung 3: G5 (mit Variante L behoben; nach dem Code auch ohne Satzzeichen, dafür keine eigene Probe), G6 fehlende Hilfsverben («werde», «sollte», «habe», «darf», «mag»; wie r4-29); offen bleibt eine Aussage, die mit einem Tötungsverb im Infinitiv ohne Satzzeichen beginnt und als Frage über die Beziehung weitergeht: Die Suche unterscheidet sie nicht von einer Drohung mit derselben Wortstellung und führt sie auf «Gewalt» (`audit-results/2026-10-15-delta-r4-31/PRUEFUNG.md`, Abschlussbestätigung 3, «Grenzfälle (R30-P01)», Punkt «Bleibt auch mit L»). Hinweis der Prüfsitzung: Meldet Codex an der Stelle «Infinitiv mit Hilfsverb» nochmals einen Rückschritt, auf die einseitige Form M′ wechseln (nach Infinitiv nur «ich» → Suizid), statt L weiter zu verfeinern. Die in r4-30 schon zugeordneten Fälle aus D30-12 (Drohungen gegen «uns», «die Kinder», «meine Familie»; «Angst vor meinem Sohn, meiner Tochter, meinem Vater …»; «Morddrohung», «Todesdrohung», «Würgen», Drohungen mit «Tod» oder «Mord» als Nomen, «Angst vor meinem Ex») führen zu «Grenzen setzen» › Gewalt; die fachliche Zuordnung bestätigt die Fachstelle. Synonyme auch über Wortanfang oder Beugung prüfen. Wortlaut der Proben: `audit-results/2026-10-15-delta-r4-30/PRUEFUNG.md` (D30-12 bis D30-21: Nachprüfungen 1 bis 4 und Nachprüfung Codex #689), `audit-results/2026-10-15-delta-r4-30/FREIGABE.md` (Nachträge 4, 5 und 8) und `audit-results/2026-10-15-delta-r4-31/PRUEFUNG.md` (Nachprüfung Codex #690, Abschlussbestätigung 3) | offen | bauende Sitzung; Nachprüfung durch Prüfsitzung; Zuordnung: Fachstelle |
| R30-P02 | D30-07: «entscheidet die betroffene Person» gilt nur für Urteilsfähige; der Fall des Vormunds (Art. 327a ZGB) fehlt | optional | Auftraggeberin |
| R31-P01 | PC30-2: `suchtest.mjs` um eine Basis-URL und die Umrechnung `.html` → Pretty URL ergänzen, damit die Produktionsprüfung die Testliste direkt nutzen kann | optional | bauende Sitzung |
| R31-P02 | Stopp-Regel für Codex-Befunde zur Suchregel (Entscheid vom 15.10.2026, «Nur Rückschritte blockieren»): blockierend nur, wenn eine Anfrage schlechter liegt als in r4-29 (Suizidsorge → Gewalt oder klare Ich-Aussage ohne Treffer). Andere Grenzfälle kommen als Testzeile in R30-P01. Jeder Befund wird gegen r4-29 geprüft und gemeldet. | ersetzt durch R31-P03 | bauende Sitzung, Prüfsitzung |
| R31-P03 | Stopp-Regel ab 15.10.2026 abends (Entscheid «N veröffentlichen»): Ein Pull Request mit Änderungen an der Suchregel blockiert nur, wenn er eine Anfrage gegenüber der Produktion verschlechtert (Suizidsorge → Gewalt oder klare Ich-Aussage ohne Treffer). Abweichungen gegenüber r4-29, die schon in der Produktion stehen, gehen sofort in den nächsten Patch (r4-32). Lesart ab r4-32 (R31-P05 (1), «beide oben»): schlechter liegt eine Anfrage, wenn Suizid nicht mehr unter den ersten drei Treffern steht oder eine klare Ich-Aussage keinen Treffer hat; eine andere Reihenfolge der Sicherheitsabschnitte wird gemeldet, blockiert aber nicht (`2026-10-15-delta-r4-32/FREIGABE.md`). | ersetzt durch R34-P01 | bauende Sitzung, Prüfsitzung |
| R31-P04 | r4-32: «du … dich» mit anderem Subjekt dazwischen (wiedergegebene Drohung → Suizid; Codex auf #690, Runde 5), die in der Produktion verbliebenen Abweichungen gegenüber r4-29, etwa zehn reine Gewaltaussagen, die mit N in sicherer Richtung auf «Suizid» gehen (z. B. eine Drohung mit «schwören»), die Phrase «ans Umbringen»/«ans Töten», die auch Gewaltsorgen (Gedanken ans Töten zusammen mit einer Bedrohung; Wortlaut nur in `f700885`) in sicherer Richtung auf «Suizid» führt, und die Idee eines Sicherheitsnetzes (ergibt die Regel «Gewalt» und enthält die Anfrage eine Suizidaussage in der ersten Person, gilt Suizid). Wortlaut: `audit-results/2026-10-15-delta-r4-31/FREIGABE.md`, Nachträge 4, 11, 12 und 14 | in r4-32 aufgegangen: statt Sicherheitsnetz stehen Suizid und Gewalt bei jeder Anfrage mit Tötungswort oben (R31-P05); die Reihenfolge ist Best-Effort | bauende Sitzung; Prüfsitzung |
| R31-P05 | Vorschläge der bauenden Sitzung vom 15.10.2026 zu R31-P04, zur Entscheidung: (1) Statt eines Sicherheitsnetzes bei jeder Anfrage mit Tötungsverb beide Abschnitte oben zeigen («Wenn Suizidgedanken ein Thema sind» und «Wenn Gewalt oder Bedrohung vorkommt»); die Regel bestimmt nur die Reihenfolge. (2) Erweiterter Suizid und Drohungen gegen Kinder zuerst auf «Kinder» › «Bei Eskalation, Gewalt oder fehlender Betreuung», dann «Gewalt», dann «Suizid». (3) R25-010 beibehalten; der Teil «Wenn Suizid angesprochen wird» in «Wenn Worte treffen» erhält einen eigenen Anker und Sucheintrag (Markup, Freigabe nötig). (4) Prüfbedarf: «Würgen» als Warnzeichen im Gewalt-Abschnitt. Entscheide vom 15.10.2026: (1) «Ja, beide oben», (2) «Kinder › Eskalation zuerst», (3) «Ja, eigener Anker», (4) «Nicht aufnehmen»; dazu «ja» zur radikalen Vereinfachung der Suchregel. Umgesetzt in r4-32 (`audit-results/2026-10-15-delta-r4-32/FREIGABE.md`). | entschieden; umgesetzt in r4-32 (veröffentlicht mit #694), Korrekturen in r4-33 und r4-34 (veröffentlicht mit #696, nachgeprüft) | bauende Sitzung; Prüfsitzung |
| R32-P01 | Codex P2 auf #694: Sollen Drohungen gegen Sohn oder Tochter (Wortlaut: `audit-results/2026-10-15-delta-r4-32/FREIGABE.md`, Nachtrag 3) wie Drohungen gegen «die Kinder» zuerst auf «Kinder» › «Bei Eskalation, Gewalt oder fehlender Betreuung» gehen? Heute: Gewalt › Suizid. Offen ist, ob auch erwachsene Söhne und Töchter gemeint sind. | entschieden 15.10.2026: «Nein, so lassen» (Kinder-Abschnitt für minderjährige Kinder) | – |
| R34-P01 | Stopp-Regel ab r4-34 (Entscheid vom 15.10.2026, «r4-32, Suizid unter Top 2»), ersetzt R31-P03: Bezugsstand r4-32 (`37b963f`). Ein Codex-Befund zur Suchregel blockiert nur in drei Fällen: Bei einer Anfrage mit Tötungswort fällt Suizid aus den ersten zwei Treffern (ausser Kinder stehen zuerst), eine Anheftung geht verloren, oder eine klare Ich-Aussage hat keinen Treffer. Andere Befunde werden gemeldet und kommen in den nächsten Patch. Gemergt wird erst nach der Meldung der bauenden Sitzung («PR, Merge nach Meldung»). | ab sofort | bauende Sitzung, Prüfsitzung, Auftraggeberin |
| R35-P01 | Produktionsprüfung r4-35 nach dem Merge: Buildmarker, die fünf Textstellen und `css/site.css` in der Produktion, `v-be-kontakt` bei 1280 und 1440 px ohne Wortbruch, Suchtest über die Pretty URLs | erledigt 16.10.2026: bestanden, kein Befund (`audit-results/2026-10-16-delta-r4-35/PRODUKTIONSPRUEFUNG.md`) | Prüfsitzung, die nicht gebaut hat |
| A03-R35 | Sprach-Audit 03 (Lauf `2026-10-16-modul-03-r4-35`, Stand `ff5016b`, `audit-results/2026-10-16-modul-03-r4-35/`). Ergebnis: 182 Befunde A03-039 bis A03-220 mit Ersatzfassungen, davon 0 kritisch, 1 wichtig (A03-178), 41 P2 und 140 P3; dazu die Muster M-01 bis M-12 und ein Sprach- und Tonalitätsprofil (`SPRACHPROFIL.md`). Offen: (1) Entscheid, ob die Wortziele aus Release C weiter gelten; mit allen Ersatzfassungen lägen mehrere Seiten leicht darüber (`BERICHT.md`, Abschnitt 6). (2) Prüfbedarf klären, 30 Befunde fachlich und 9 rechtlich (Stand nach dem Review zu #701). Darunter sind zwölf Sicherheits- und Schutztexte, deren Ersatzfassung Verbindlichkeit oder Zuständigkeit verschiebt, z. B. A03-108 («dürfen Sie fragen» → «fragen Sie»), A03-121 (Aufforderung wird Aussage) und A03-122 bis A03-124 («Erwachsene» → «Sie»). Zuerst A03-178 (Glossar «Fürsorgerische Unterbringung»: «schriftlich» und Frist). (3) Freigabe des Wortlauts, paketweise nach `BERICHT.md`, Abschnitt 5. (4) Freigabe des Sprachprofils. (5) Vorschläge an das PUK-Profil (`SPRACHPROFIL.md`, Abschnitt 18) an die Profilpflege. Umsetzung auf eigenem Branch; danach Suchtest, Visualisierungs-Check der betroffenen Figuren und Nachtest je Befund | offen | Auftraggeberin (Entscheide, Freigabe); bauende Sitzung (Umsetzung); Prüfsitzung (Nachtest) |
| R34-P02 | Nicht blockierende Befunde aus dem Codex-Review von #696 für den nächsten Patch: zwei Täteraussagen in der dritten Person über Kinder ohne Kinder zuerst (Adjektive, Zahlwörter vor «Kind»); zwei Täteraussagen in der Ich-Form über Kinder ohne Kinder zuerst (Ich-Form als Täterin gegen Ich-Form reflexiv); eine Suizidaussage in der Ihr-Form mit Gewalt vor Suizid («ihr … euch» wie «du … dich»); eine Gewaltaussage mit getrenntem Verb und Relativsatz dazwischen ohne Treffer (Relativsatz, wie in r4-32). Dazu bekannte Fehlanheftungen ohne Satzzeichen wie in r4-32 («die Therapie bringt nichts ich mache mir Sorgen um sie», «Er bringt die Kinder und zieht sich um») und ein konstruierter Satz, in dem «bringt mich» und «um» weit auseinanderstehen. Wortlaut der Proben: `audit-results/2026-10-15-delta-r4-34/FREIGABE.md`, Nachtrag 3 und Abschnitt «Vergleich» | nächster Patch | bauende Sitzung; Prüfsitzung |

Entscheide der Auftraggeberin vom 16. Oktober 2026 zu R3C-A8 (Antworten wörtlich):

- A8-01: «Technisch, Wortlaut bleibt»
- Spalte «Status» bis zur Korrektur von A8-01: «Bleibt ‹erledigt›, Pendenz»; dieselbe Antwort, gesondert gefragt, für A8-11, nachdem A8-01 als Querverweis auf R3C-06 optional wurde
- A8-11 (vorher Prüfbedarf in A8-05): «Varianten vorlegen»
- optionale Befunde: «Drei Rückschritte jetzt» (A8-02, A8-08, A8-09 mit A8-01, die übrigen gesammelt)
- Frist der Korrekturrunde: «31.10.2026»

Das Codex-Review von PR #698 hatte vorgeschlagen, beide Stufen bis zur Lösung von A8-01 und A8-05 auf «offen» zu setzen (P1). Die Auftraggeberin hat stattdessen die Empfehlung der bauenden Sitzung gewählt. Deren Begründung: Beide Stellen sind schon veröffentlicht (der Wortbruch aus R3C-06 spätestens seit r4-28, der Satz zu A8-11 seit Release B), und eine offene Stufe blockiert jede Veröffentlichung.

### r4-22 · visuelle Befunde A04-008 bis A04-013, abgeschlossen

Die technische und redaktionelle Umsetzung der visuellen Befunde A04-008 bis A04-013 liegt als r4-22 vor. Die unabhängige Delta-Prüfung fand für A04-009 bis A04-013 keinen fachlichen, rechtlichen, sicherheitsbezogenen oder didaktischen Korrekturbedarf. Der Auftraggeber bestätigte am 14. Oktober 2026 ausdrücklich im Namen der PUK die institutionelle Freigabe dieser fünf Befunde. Der Nachweis liegt unter `audit-results/2026-10-14-delta-review-r4-22/`.

Die vier zuvor blockierenden Visualisierungen sind damit freigegeben. Der anschliessende Produktionsbuild meldete 22 Seiten, 0 Blocker und 0 Hinweise; 33 Dateien sind bytegleich. Der vollständige lokale Delta-Smoke-Test umfasste 110 Seiten-/Viewport-Läufe, 66 axe-Läufe, 22 Prüfungen bei 200 Prozent Basisschrift, 140 vertiefte Zustandsprüfungen der geänderten Seiten und 36 Such-Ersttreffer. Es gab keinen blockierenden Befund und keine Suchregression. GitHub-Build, Netlify-Regelprüfungen und Deploy-Build waren erfolgreich; der externe Preview-Browsertest blieb wegen des vorgesehenen Netlify-Teamzugangs mit HTTP 401 nicht durchführbar. Die Produktion wurde nach dem Merge vollständig nachgeprüft. Aus diesem Paket besteht keine weitere inhaltliche, institutionelle oder technische Pendenz.

Die nachfolgenden Punkte sind entweder terminiert und noch nicht fällig, von einer internen institutionellen Prüfung abhängig, nur nach neuen bestätigten Angaben umsetzbar oder als Evidenzgrenze bewusst akzeptiert. Sie dürfen nicht als von der Website-Entwicklung eigenständig lösbare Restarbeiten behandelt werden.

## Terminiert, derzeit nicht fällig

### AR3-5 · gemeinsames Profilpaket P-1 bis P-15

Die für diese Website relevanten Entscheidungen P-1 bis P-15 wurden in r4-19 lokal vorgezogen und nachgeprüft. P-8 ist in diesem eigenständigen Repository nicht anwendbar; P-13 bleibt aufgrund des bestätigten Institutionsentscheids zu `noindex, nofollow` und `Disallow: /` bewusst eine websitespezifische Ausnahme.

Offen bleibt die Übernahme in das gemeinsame PUK-Website-Profil sowie die getrennte Prüfung und Übernahme für die Depressions-Website. Diese Arbeiten dürfen nicht aus dem lokalen Nachweis dieser Website abgeleitet werden.

Für diese Website besteht daraus aktuell keine lokale Implementierungspendenz.

- Umsetzung nach der Veröffentlichung der Depressions-Website, spätestens ab **16. November 2026**
- Abschlussfrist: **13. Januar 2027**
- Beschluss und Abnahmekriterien: `christaegger-dot/puk-website-profil`, Datei `ENTSCHEIDE-PROFIL-2026-10-2.md`
- Bis zum geprüften Neubau gelten die dokumentierten Ausnahmen R1-1 und SPZ-F-32 weiter.

Änderungen aus dem Profilpaket werden künftig in diesem Repository in `authoring/` übernommen, geprüft und anschliessend kontrolliert nach `site/` gebaut. Das archivierte Website-Verzeichnis im Profil-Repository ist keine Bearbeitungsquelle mehr.

## Dauerhaft akzeptierte Einschränkung

### AR3-3 · reale Nutzungs- und Geräteprüfungen

Die Fachstelle hat am 13. Oktober 2026 entschieden, die vorgeschlagenen Tests mit Angehörigen, Menschen mit Borderline-Erfahrung, AT-Nutzenden und unabhängigen Fachpersonen nicht durchzuführen. Ebenso sind derzeit keine vollständigen realen Läufe mit NVDA/Firefox, VoiceOver/Safari, Hardwaretastatur, Touchgeräten oder Windows-Hochkontrastmodus vorgesehen.

Damit ist AR3-3 **materiell nicht erfüllt, aber organisatorisch abgeschlossen**: Die frühere Umsetzungsfrist vom 13. Januar 2027 ist aufgehoben. Die fehlenden Tests bleiben als dauerhaft akzeptierte Aussage- und Evidenzgrenze dokumentiert und dürfen weder als durchgeführt noch durch KI-Personas oder simulierte Nutzerforschung ersetzt werden.

Eine WCAG- oder ISO-Gesamtkonformität wird nicht behauptet. Eine erneute operative Pendenz entsteht nur durch einen neuen Institutionsentscheid.

Im Auftrag für R3 vom 15. Oktober 2026 nannte die bauende Sitzung für AR3-3 irrtümlich noch die Frist 13. Januar 2027. R3 ist diesem Dokument gefolgt und hat keine Frist gesetzt. Es gilt der Text oben.

## Empfohlen, nicht blockierend

### Rechtliche Durchsicht

Die Durchsicht von Impressum und Datenschutz durch den Rechtsdienst bleibt empfohlen. Sie ist keine technische Veröffentlichungs- oder Mergevoraussetzung. Die vorbereitete Unterlage liegt im archivierten Quellstand des Profil-Repositorys unter `templates/website/borderline-angehoerige/UNTERLAGE-RECHTSDIENST.md`.

## Nur nach institutioneller Bestätigung ergänzen

Folgende Angaben fehlen nicht versehentlich. Sie werden erst veröffentlicht, wenn die Fachstelle sie verbindlich bestätigt:

- konkrete Telefonnummern mit belegter Zuständigkeit und Erreichbarkeit; die allgemeine Erlaubnis für hilfreiche Nummern gilt bereits nach dem Entscheid vom 17.10.2026;
- verbindliche Erreichbarkeitszeiten;
- eine garantierbare oder typische Antwortzeit;
- bestätigte Angaben zur baulichen Zugänglichkeit des Beratungsorts.

## Bewusste Institutionsentscheide · keine Pendenz

### Altersinklusive Angehörigenberatung

Die Angehörigenberatung der Fachstelle ist nicht auf Erwachsene begrenzt; auch junge Angehörige werden beraten. Der öffentliche Satz «Die Fachstelle Angehörigenarbeit der PUK berät Angehörige kostenlos und vertraulich.» ist absichtlich altersinklusiv. Eine Kennzeichnung als Erwachsenenangebot darf nicht ergänzt werden. Die vollständige Fundstellenprüfung vom 13. Oktober 2026 fand in den Beratungs- und Fachstellentexten keine ausdrückliche oder indirekte Altersbegrenzung.

### Telefonkontakte und Krisenhinweise · Entscheid vom 17.10.2026

Die Auftraggeberin erlaubt hilfreiche reguläre Telefonnummern und `tel:`-Links ohne Sonderausnahme. Krisenangebote und ihre Platzierung werden je Thema bewusst gewählt; es gibt keine automatisch ergänzte globale Notrufliste. Die Fusszeile dient dem Kontakt und den Website-Angaben. Der situative Akutwortlaut bleibt in passenden Themenabschnitten erhalten. Diese aktuelle Vorgabe ersetzt das frühere pauschale Telefonverbot und die Pflicht zur Krisenabgrenzung im Footer; historische Nachweise bleiben versionsgebunden gültig.

## Wiederkehrende Wartung

Die zehn dynamischen Beratungs-, Austausch- und Behandlungsangebote wurden am 13. Oktober 2026 geprüft. Die nächste Prüfung ist spätestens am **14. April 2027** fällig. Das Produktionsgate blockiert überfällige Einträge.

## Abgeschlossene Hauptarbeiten

Die Informationsarchitektur, Schnellorientierung, kanonischen Inhalte, Begriffskonsistenz, globale Kurzorientierung, Footer-Wege, Fokusführung und automatisierten Strukturprüfungen des bisherigen Massnahmenplans sind umgesetzt. Der historische Produktionsbeleg vom 15. Oktober 2026 betrifft Build r4-29; den aktuellen Stand r4-37 führt die Übersicht am Anfang dieser Datei. AR3-4 (Quellenangaben vollständig, mit Jahr und Abrufdatum) ist seit dem 13. Oktober 2026 erfüllt (`authoring/PRUEFBERICHT.md`, «Freigabe AR3-4»). R3 vom 15. Oktober 2026 hat das bestätigt (Punkt 14: 82 Einträge, alle mit Jahr oder «laufend»). Der im Produktions-Smoke-Test von r4-19 gefundene Suchbefund ist seit r4-20 behoben.

Am 18.10.2026 wurden ausschliesslich Dokumentation und Agentenanweisungen bereinigt: gemeinsame Regelquelle, überprüfbare Branch-Konvention, Inhaltsvergleich möglicher Sync-Dubletten sowie die Einordnung historischer Produktions- und Telefonangaben. Websitequellen und Export bleiben unverändert; keine neue Fach- oder R3-Freigabe wird behauptet.

Die früheren GitHub-Issues #631, #641 und #645 bis #651 bezogen sich auf die abgelöste React-/Handout-Architektur. Sie wurden nach dem Abgleich mit dem aktuellen statischen Neubau, den Audits 01–06, den Delta-Prüfungen und den dokumentierten Institutionsentscheiden als überholt geschlossen. Noch gültige Aussage- und Evidenzgrenzen bleiben in diesem Dokument erhalten; die Schliessung der alten Issues ist keine nachträgliche Behauptung einer Rechts-, Fach-, WCAG- oder Nutzendenfreigabe.
