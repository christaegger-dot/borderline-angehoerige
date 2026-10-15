# R3 Freigabe-Audit · Release C (r4-29)

| | |
| --- | --- |
| Website | «Borderline – Orientierung für Angehörige» |
| Repository | `christaegger-dot/borderline-angehoerige`, Branch `claude/release-c-r4-29-1792043306` |
| Stand (Commit) | `a7c5ec1f9b48b2f74dde9d6a815e5f7f856b85c9` («Release C (r4-29): Produktionsexport») |
| Release-Kandidat | Ordner `site/` in `a7c5ec1`, Build r4-29 |
| Vergleichsbasis | `02dba06` (r4-28, live) |
| Vorschau | keine (Pull Request noch nicht eröffnet); geprüft lokal über einen Server, der `site/_headers` anwendet |
| Ziel-Adresse | `https://borderline-angehoerige.netlify.app` (zeigt am 15.10.2026, 09.13 UTC, Build r4-28) |
| Datum | 15.10.2026, abgeschlossen 11.42 Uhr (UTC+2) |
| Auftrag | R3 aus `guidelines/00-pre-release-audits.md` (Wortlaut im Auftrag dieser Sitzung), Zuordnung der Pfade nach Auftrag |
| Rolle | unabhängige Prüfsitzung: hat die Website nicht gebaut, nichts korrigiert, nichts entschieden und an keiner früheren Prüfung dieser Änderungsrunde mitgearbeitet |
| Geändert | nur diese Datei; keine git-Schreibbefehle, Netlify nicht angefasst, `authoring/PRUEFBERICHT.md` nicht geändert |

## 1 Entscheid

**«Go mit Auflagen»: Der Kandidat r4-29 ist technisch und in der Umsetzung der Freigabe einwandfrei (Gate, Parität, Datenschutz, Zuständigkeit, Wortlaut ohne Abweichung), veröffentlicht werden darf er aber erst, wenn die Nachweise R3C-A1 bis R3C-A5 vor dem Merge vorliegen und die Fachstelle zustimmt; die übrigen Auflagen folgen mit Frist.**

Kein Punkt ist kritisch. Was vor dem Merge fehlt, sind Nachweise und Entscheide, keine Änderungen an `site/`; keine Auflage vor dem Merge verlangt einen neuen Export.

### Auflagen

| Nr. | Auflage | Frist | Wer |
| --- | --- | --- | --- |
| R3C-A1 | **Stufenstatus r4-29 dokumentieren** (Punkt 1). Im Nachweisordner eine Statustabelle für Release C: W1, W2, S, Visualisierungs-Check, Bedienung und Barrierefreiheit, W3, R1, R2, je «erledigt» mit Verweis, Datum und Sitzung oder «entfällt: Begründung». Die Regel aus dem Massnahmenplan vom 14.10.2026 («Vor Release C: Sprach-Review S …, danach W3 und R3») mit Fundstelle übernehmen; der Massnahmenplan liegt nicht im Repository. Für W1 (neue Seite und Rechtssätze: Rechtsabgleich und Freigabe statt W1), R1 und R2 die Begründung nennen. | vor dem Merge | bauende Sitzung; die «entfällt»-Begründungen bestätigt die Fachstelle |
| R3C-A2 | **Freigabe der W3-Korrekturen und Zurückstellungen in den Nachweisordner** (Punkte 1 und 2). Nachtrag zu `FREIGABE.md`: Antwort der Auftraggeberin «Suche und Kleines jetzt» mit Datum und Uhrzeit; umgesetzt in `32afa3f`: W3C-01, -02, -03, -06, -08, -09, darunter die sichtbare Änderung «Stand: 15.10.2026»; zurückgestellt: W3C-04, -05, -07, -10, -11, -12, -13, je mit Begründung. Dazu den Stand der W2-Befunde nachführen: `2026-10-15-struktur-w2-r4-28/BEFUNDE.csv` führt alle 23, darunter 12 «wichtig», als «offen». | vor dem Merge | bauende Sitzung (Übertragung des Chat-Entscheids) |
| R3C-A3 | **Annahme dieses Ergebnisses und `releaseApproval`** (Punkt 11, R3C-04). Die Fachstelle nimmt «Go mit Auflagen» an oder nicht. Danach `releaseApproval.reviewScope` um R3 (`R3-BERICHT.md`) und die Annahme ergänzen. `releaseApproval` wird nicht gerendert; `site/` und die Parität ändern sich dadurch nicht. | vor dem Merge | Fachstelle (Annahme), bauende Sitzung (Eintrag) |
| R3C-A4 | **Drei PUK-Adressen im Browser öffnen** (Punkt 13): `pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/` (Quellen), `…/erwachsenenpsychiatrie/behandlungsschwerpunkte/persoenlichkeitsstoerungen/` (Behandlung), `…/toolbox/datenschutzerklaerung/` (Impressum). Automatisch nicht prüfbar (siehe Punkt 13). Ergebnis festhalten. | bis zum Tag des Merge | Fachstelle oder eine Prüfsitzung mit Browserzugang |
| R3C-A5 | **Codex-Review und Auftrag** (R28-O01, V-9): den Pull Request erst mergen, wenn das Codex-Review abgeschlossen und geprüft ist; Merge und Veröffentlichung nur auf ausdrücklichen Auftrag der Fachstelle. | vor dem Merge | bauende Sitzung, Fachstelle |
| R3C-A6 | **Produktionsprüfung r4-29** (Punkte 17 und 21) nach dem Muster r4-25 bis r4-28: Buildmarker und Assets r4-29 auf allen 23 Seiten, `jugendliche` erreichbar, Nicht-HTML-Dateien bytegleich, Sprungziele mit den neuen Ankern und den Alias-Ankern unter den Pretty URLs von Netlify, 88 Weiterleitungen, 404, Sicherheitsheader, `X-Robots-Tag` und `robots.txt` nach P-13, Suchtests einschliesslich der neuen Gewalt- und Umlaut-Anfragen, kein Link auf eine Vorschau. | am Tag des Merge | eine Prüfsitzung, die nicht gebaut hat |
| R3C-A7 | **`PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` nachführen** (Stand dort 14.10.2026): E4, E7 und E9 sind mit der Freigabe vom 15.10.2026 entschieden, stehen aber noch als «offen»; R29-P01 bis -P08, die zurückgestellten W3-Befunde und diese Auflagen ergänzen; AR3-3 und AR3-4 eindeutig führen (Abschnitt 5.4). | mit dem Produktionsnachweis r4-29 | bauende Sitzung |
| R3C-A8 | **Visualisierungs-Check und R2 für die geänderten Abbildungen** (Punkt 3, R3C-03): Release C ändert den Wortlaut in 12 von 13 Abbildungen; R2 für `v-ge-forschung` ist seit r4-27 offen (R27-O02). Mindestens `v-vs-anspannung`, `v-bz-sichten`, `v-be-kontakt`, `v-ge-trieb`, `v-gr-dear`, `v-ge-forschung` und die neue Validierungstabelle. | 31.10.2026 | Prüfsitzung; Korrekturen nur nach Freigabe der Fachstelle |
| R3C-A9 | **Sicherheitsrelevante Suchlücken schliessen** (R3C-02), schon in r4-28 vorhanden: Synonyme oder Aliase ergänzen und die Anfragen in die festgeschriebenen Suchtests aufnehmen. | 31.10.2026 (nächster Patch) | bauende Sitzung; Nachprüfung durch eine Prüfsitzung |
| R3C-A10 | **Linkregel für Seiten mit Notfallblock** (R3C-01): Drei Links auf «Quellen» verletzen seit r4-27 die dokumentierte Regel. Die Fachstelle entscheidet: Links entfernen (Angabe bleibt als Text) oder Regel ausdrücklich ändern. | Entscheid bis 31.10.2026, Umsetzung im nächsten Patch | Fachstelle; Umsetzung bauende Sitzung |
| R3C-A11 | **Gate-Selbsttest wirksam machen** (Punkt 10, W3C-07): Mutationen auf die Seiten dieser Website umstellen, Aufruf über einen Schalter und in der CI; dazu prüfen, wie das Gate R3 an die jeweilige Änderungsrunde bindet (R3C-04). | 13.11.2026 | bauende Sitzung; Nachprüfung durch eine Prüfsitzung |

## 2 Ergebnis je Prüfpunkt

| Nr. | Prüfpunkt | Ergebnis | Beleg | Priorität |
| --- | --- | --- | --- | --- |
| 1 | Stufen W1, W2, S, Visualisierungs-Check, Bedienung und Barrierefreiheit, W3 mit Status, Datum, Sitzung | **nicht erfüllt** | Für r4-29 gibt es keine Statustabelle. `authoring/PRUEFBERICHT.md` ist historisch (Zeile 3; Statustabelle bis 13.10.2026). Nachweise einzeln: W1 `2026-10-14-inhalt-w1-r4-24` (14.10., Stand r4-24, vor dem Umbau); W2 `2026-10-15-struktur-w2-r4-28` (15.10., Stand `02dba06`, vor dem Umbau, wie vorgesehen); S `2026-10-15-sprache-s-r4-29` s1 bis s3 (15.10., Stand `f5d3d74`); Rechtsabgleich (15.10., Stand `3e63cce`); W3 `W3-BERICHT.md` (15.10., Stand `40474e0`, mit automatisierter Bedienung und Barrierefreiheit in Abschnitt 9). **Nicht dokumentiert:** Visualisierungs-Check für Release C; ein «entfällt: Begründung» für W1, Visualisierungs-Check, R1 und R2; die Massnahmenplan-Regel (nicht im Repository). Die W3-Korrekturen `32afa3f` hat keine Prüfstufe gesehen; diese Sitzung hat sie nachgeprüft (Abschnitt 4). Zur Frage nach Commit `32afa3f`: Abschnitt 5.2. | wichtig · R3C-A1, -A2 |
| 2 | Keine offenen kritischen oder wichtigen Befunde; optionale zurückgestellt und begründet | **nicht erfüllt** | Materiell umgesetzt, aber nicht abgeschlossen dokumentiert. **W2:** `BEFUNDE.csv` führt W2-001 bis -012 (wichtig) als «offen»; `FREIGABE-VORLAGE.md` nennt sie als Teil von Release C. Stichprobe dieser Sitzung, alle 12 umgesetzt, z. B.: neue Seite `jugendliche` (W2-001), Reihenfolge «Therapieformen · Angebote · Wartezeit · Behandlungsteam · Auskunft …» ohne Einklappen auf `behandlung` (W2-002), Verweis im Text 7-mal statt 28-mal (W2-004), `grenzen#riskant` (W2-005), `behandlung#keine-behandlung` (W2-006), Navigation «Unterstützung» und «Fragen und Nachschlagen» (W2-007), Glossardefinition gleich `verstehen` (W2-009), 0 Verweise mehr über `index.html#beratung` (W2-011), Selbstbeschreibung in der Fusszeile (W2-012). **W3:** W3C-01 und -02 (wichtig) in `32afa3f` umgesetzt und hier nachgeprüft (Abschnitt 4.3); die Zurückstellung von sieben optionalen W3-Befunden steht nur im Chat. **S:** wichtige Punkte von den S-Sitzungen selbst umgesetzt; die drei Prüfbedarfe sind nach `FREIGABE-VORLAGE.md` («Nach dem Sprach-Review S bereits umgesetzt») erledigt. **Rechtsabgleich:** F1 bis F5 umgesetzt (21 von 21 Ersetzungen, Abschnitt 4.2). **Neu aus R3:** R3C-01 bis R3C-03 (wichtig). | wichtig · R3C-A2, -A8, -A9, -A10 |
| 3 | Prüftiefe: 20 Aussagen gegen den Bestand, Kennzahlen, Visualisierungs-Check je Figur, zweite unabhängige Prüfung | **nicht erfüllt** (Visualisierungs-Check) | **Bestand:** `WORTLAUT.md` stellt jeden geänderten Satz gegen r4-28 und ist freigegeben; Rechtsabgleich 13 Zeilen gegen den Gesetzeswortlaut. Eigener Abgleich dieser Sitzung in beiden Richtungen: 681 Zeilen «Neu» mit F1 bis F14 im sichtbaren Text von `site/` gesucht, 679 wörtlich, 2 nur anders umbrochen (Musterbrief, Validierungstabelle; von Hand bestätigt); Rückrichtung 689 neue oder geänderte Textstellen gegenüber `02dba06`, keine ohne Grundlage in `WORTLAUT.md`, F1 bis F14 oder W3C-08 (Abschnitt 4.2). **Kennzahlen:** `node authoring/tools/wortbilanz.mjs` und eine eigene Zählung: Summe 30 666, alle acht Seitenziele eingehalten, gleich `FREIGABE.md`. **Visualisierungs-Check je Figur:** für Release C nicht gemacht. 12 von 13 Abbildungen haben neuen Wortlaut (z. B. `v-vs-anspannung`: neu «Zeichen dafür können sein: Die Stimme wird lauter, Vorwürfe beginnen, der Körper spannt sich an.», gestrichen «Wie sich Anspannung zeigt, ist individuell und von aussen nicht sicher erkennbar.»). R2 für `v-ge-forschung` offen (R27-O02). **Zweite unabhängige Prüfung:** W3 eine Sitzung, S drei Sitzungen auf getrennten Seiten; die W3-Korrekturen erst durch R3 geprüft. | wichtig · R3C-A8 |
| 4 | Zwei reale Screenreader-Läufe, Hardwaretastatur, Touch | **nicht erfüllt** (entschieden) | Nicht durchgeführt. Entschieden und dokumentiert: `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`, «AR3-3 · reale Nutzungs- und Geräteprüfungen»: «materiell nicht erfüllt, aber organisatorisch abgeschlossen», Frist 13.01.2027 «aufgehoben». Auf der Website offen benannt: `ueber.html#barrierefreiheit`, «Bekannte Einschränkungen». Automatisierter Ersatz dieser Sitzung (kein Ersatz für reale Läufe): Tastatur auf 23 Seiten, Sprunglink jeweils erster Tabstopp und Fokus auf `#main-content`, 508 Fokusstopps alle sichtbar. Zum Widerspruch mit dem Auftrag: Abschnitt 5.4. | – (entschieden) |
| 5 | Jede Figur im `visualPlan` «freigegeben» | erfüllt | `authoring/site.config.json`: 132 Zeilen, 131 «freigegeben», 1 «entfällt» (`v-404-text`); alle 13 Abbildungen (`v-vs-eisberg`, `v-vs-anspannung`, `v-vs-bewertungen`, `v-bz-schleife`, `v-bz-sichten`, `v-ro-weg`, `v-gr-dear`, `v-be-kontakt`, `v-ko-tassen`, `v-ki-alltag`, `v-sf-abend`, `v-ge-forschung`, `v-ge-trieb`) «freigegeben». Die 12 neuen Zeilen von Release C sind nach `FREIGABE.md` («Freigegeben mit allen Empfehlungen», 15.10.2026, 09.41 Uhr) gesetzt. | – |
| 6 | Keine Platzhalter, oder freigegeben | erfüllt | Kein `data-placeholder` in `site/`, kein Platzhalter-Eintrag in der Konfiguration; alle 23 Seiten `status` «published». Sichtbarer Text aller 23 Seiten: 0 Treffer für «Entwurf», «fachliche Prüfung ausstehend», «Platzhalter», «Musterentwurf», «Prüfbedarf», «verifiziert». | – |
| 7 | `responsibility` und `inline` geprüft, mit Person und Datum; Wortlaut gleich Standard oder dokumentiert abweichend | erfüllt | Beide `reviewStatus` «geprueft», `reviewedBy` «Fachstelle Angehörigenarbeit PUK», `reviewedAt` «09.10.2026». Der Wortlaut weicht vom Standard des Profils ab («Die Fachstelle Angehörigenarbeit PUK berät Angehörige: … In akuten Krisen kann sie nicht weiterhelfen. …», Skill «PUK Website-Profil 2026.10»). Die Abweichung ist dokumentiert: von der Fachstelle am 09.10.2026 geprüft, Verweis im Text nach Profilentscheid 09.10.2026 (`$comment` in `responsibility.inline`), Begrenzung auf sieben Seiten nach E7 (`FREIGABE-VORLAGE.md`, Teil 6, freigegeben). Gerendert in 23 von 23 Fusszeilen, je einmal; Verweis im Text auf 7 Seiten je einmal (`diagnose`, `grenzen`, `kinder`, `kommunizieren`, `krise`, `kurz`, `verstehen`), auf `jugendliche` keiner. Hinweis R3C-05. | optional (R3C-05) |
| 8 | Inhaltsverantwortung und Prüfdatum sichtbar; keine Entwurfsmarkierung; «fachlich freigegeben», nie «verifiziert» | erfüllt | Kopf jeder Seite: «Eine Orientierungshilfe der Fachstelle Angehörigenarbeit der PUK · Beratung: angehoerigenarbeit@pukzh.ch» (mailto). Fusszeile: «Fachliche Redaktion: Ch. Egger, Soziale Arbeit, Fachstelle Angehörigenarbeit PUK.», «Inhaltlicher Stand: Oktober 2026.». Impressum: «Anbieterin und verantwortlich für dieses Angebot: Psychiatrische Universitätsklinik Zürich, Fachstelle Angehörigenarbeit». Datiert sind ausserdem die Angebote («Angaben und Link geprüft: 13. Oktober 2026»), Barrierefreiheit («Stand: 15.10.2026») und Datenschutz («Stand: 13.10.2026»). Keine Entwurfsmarkierung (Punkt 6), «verifiziert» 0-mal. Ein ausdrückliches «fachlich freigegeben am …» steht seit der IA-Runde vom 13.10.2026 nicht mehr in der Fusszeile (`c3e9b3a`); das ist von der PUK freigegeben (`authoring/PRUEFBERICHT.md`, «Änderungsrunde IA 13.10.2026»). | – |
| 9 | Entwurfsbuild: 0 blockierende Befunde | erfüllt | `node authoring/tools/build.mjs --out=dist/r3`: «Build draft: 23 Seiten · 0 Blocker · 0 Hinweise». | – |
| 10 | Selbsttest: alle Fälle bestanden | **nicht erfüllt** | Kein Schalter vorhanden. `C.selftest()` aus `authoring/tools/contract.js` mit eigenem Skript gegen die gerenderten Seiten: **29 von 76 bestanden**, 44 «Mutation nicht anwendbar» (Starter-IDs `behandlung-verstehen`, `beziehungen-verstehen`, `unterstuetzung-finden`), 2 nicht erkannt («Seite nicht erreichbar», «Verweis im Text auf Seite ohne sensibles Thema»), 1 nur teilweise («… ungeklärte Absenderin, Zuständigkeitsverweise, Platzhalter und Visualisierungen»: erkannt `sender-status`, `safety-review`, nicht `placeholder-approval`, `visual-approval`). Bestätigt W3C-07. Die Zurückstellung ist nur im Chat dokumentiert. Die Fehlerklassen, auf die es bei r4-29 ankommt, hat diese Sitzung direkt geprüft (Punkte 12, 15, 16, 21); deshalb nicht kritisch. Beurteilung: Abschnitt 5.3. | wichtig · R3C-A11 |
| 11 | Produktionsgate: 0 blockierende Befunde | erfüllt (mit Vorbehalt R3C-04) | `node authoring/tools/build.mjs --production --out=dist/r3p`: «23 Seiten · 0 Blocker · 0 Hinweise». **Vorbehalt:** (a) Die 0 hängen an `releaseApproval.independentReview` «bestaetigt». Den Wert hat die bauende Sitzung in `a7c5ec1` vor R3 gesetzt, entgegen `FREIGABE.md` («bleibt `ausstehend`, bis W3 und R3 abgeschlossen sind»). Gegenprobe im Speicher mit «ausstehend»: 1 Blocker `change-review`. (b) Die Prüfung `review-report` liest die historische Zeile R3 in `authoring/PRUEFBERICHT.md` («erledigt: Go mit Auflagen, …, 13.10.2026, V-8»). Sie bindet R3 also nicht an diese Änderungsrunde. Gegenprobe `fold-config` (W3C-06): mit zwei Tippfehlern 2 Blocker, mit der Konfiguration 0. | wichtig · R3C-A3 |
| 12 | Keine Krisennummern, kein `tel:`, kein Notfallblock (jede Seite) | erfüllt | Alle 23 Seiten, ganzer `body`: 0 `href="tel:"`; 0 Telefonnummernmuster; 0 Treffer für 112, 117, 118, 142, 143, 144, 145, 147 als eigenständige Zahl. «Notfall…» und «Polizei» nur im geprüften Zuständigkeitsverweis (Fusszeile, 7 Verweise im Text), in «keine heutige Notfallanleitung» (`buecher`, `quellen`) und im Eintrag zum Gewaltschutzgesetz (`quellen`). Kein Notfallblock, keine Seite «Hilfe in der Krise». Zu den Zielen externer Links: R3C-01 (Punkt 13). | – |
| 13 | Externe Links erreichbar und offiziell; E-Mail korrekt | **nicht erfüllt** (3 Adressen ohne Beleg; Linkregel) | **E-Mail:** nur `mailto:angehoerigenarbeit@pukzh.ch` (29 Links), gleich `sender.email`. **Abruf (eigener, 15.10.2026):** 91 Adressen auf 33 Hosts. `curl` (Weiterleitungen gefolgt): 54 × 200, 23 × 203, 14 × 403. Die 23 PubMed-Adressen liefern über den Proxy nur eine Platzhalterseite; alle 23 PMIDs über die PubMed-Schnittstelle bestätigt (Titel, Jahr). Die 9 DOI-Adressen mit 403 lösen über `doi.org` auf die Verlagsseite auf (dort Bot-Schutz); Crossref bestätigt alle 9 mit Titel, Erstautor und Jahr passend zum Eintrag. Mit Bot-Schutz: `ipw.ch` per WebFetch erreichbar («Psychotherapiestation für junge Erwachsene», 17 bis 25 Jahre, wie auf `behandlung`); `pukzh.ch` KJPP «Persönlichkeitsstörungen» per WebFetch erreichbar (nennt HYPE Züri). **Ohne Beleg (3):** die drei PUK-Adressen aus R3C-A4 (`curl` 403, WebFetch ohne Freigabe des Abrufs). Belegt 88 von 91, kein 404, keine Umleitung auf ein fremdes Ziel. **Herkunft:** Schutz und Recht bei offiziellen Stellen (`fedlex.data.admin.ch`, `zh.ch`, `bag.admin.ch`, `ebg.admin.ch`, `opferhilfe-schweiz.ch` der SODK), Fachliteratur über PubMed, DOI, NICE, WHO, AWMF, BfArM. **Linkregel:** R3C-01. | wichtig · R3C-A4, -A10 |
| 14 | Quellenangaben vollständig, mit Jahr; keine Zuschreibung ohne Grundlage | erfüllt | `site/quellen.html`: 82 Einträge, alle mit Jahr oder «laufend»; 33 Online-Einträge mit Web- oder PDF-Link, alle mit Abrufdatum; 156 Kurzangaben in den Quellenblöcken der Themenseiten, alle mit Jahr, «laufend» oder Erlass. Zuschreibungen: Rechtsabgleich (13 Zeilen, keine Aussage unzutreffend); F5 berichtigt die ZGB-Zuordnung. Offen und dokumentiert: R29-P07 (Quellenzuordnung der äusseren Zeichen der Kurve, Mason und Kreger auf «Auf sich achten»), B13 (Pro Juventute bei «Geschwister im Haushalt» nur für «kindgerecht erklären»; «Grenzen im Familienalltag» nur mit ZGB), beide in der freigegebenen Vorlage. | – |
| 15 | Keine externen Schriften, Skripte, Karten, Videos; kein Tracking, keine Cookies | erfüllt | Chromium 141 (Playwright 1.56.0), 23 Seiten × 320 und 1280 px = 46 Läufe mit den Kopfzeilen aus `site/_headers`: 0 Anfragen an fremde Hosts, 0 Konsolenfehler oder -warnungen (CSP aktiv), 0 Cookies (`document.cookie` und Kontext), 0 Einträge in `localStorage`, `sessionStorage`, IndexedDB, 0 `iframe`, `video`, `audio`, `embed`, `object`. 0 `style`-Attribute, 0 Inline-Skripte; einziges Skript `js/interaktion.js`. Schriften Rubik selbst gehostet (`site/fonts/`, mit `OFL.txt`). CSP `default-src 'self'` … `frame-ancestors 'none'`. 0 `target="_blank"`. Externe Links haben kein `rel="noopener noreferrer"`; ohne neues Fenster und mit `Referrer-Policy: no-referrer` ohne Wirkung. | – |
| 16 | `title` und `description` je Seite, `lang="de-CH"`, `siteUrl`, Favicon | erfüllt | 46 von 46 Läufen: `title` vorhanden («… \| Borderline – Orientierung für Angehörige»), `meta description` vorhanden, `html lang="de-CH"`, `link rel="icon"` auf `assets/favicon.svg`, Buildmarker `data-puk-site-build="r4-29"`. `siteUrl` «https://borderline-angehoerige.netlify.app»; `canonical` aller Seiten ausser `404` zeigt auf diese Adresse. Je Seite genau ein `h1`. | – |
| 17 | Vorschau nicht indexierbar, Ziel-Adresse indexierbar | **nicht prüfbar** (Ziel-Adresse mit r4-29); Kandidat erfüllt | **Kandidat:** alle 23 Seiten `meta robots` «noindex, nofollow» und `X-Robots-Tag: noindex, nofollow` (aus `site/_headers`, gilt damit für jede Vorschau); `robots.txt` «Disallow: /»; keine Sitemap. Dass die Ziel-Adresse **nicht** indexierbar ist, ist entschieden und dokumentiert: P-13 als websitespezifische Ausnahme «aufgrund des bestätigten Institutionsentscheids zu `noindex, nofollow` und `Disallow: /`» (`PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`, AR3-5), Suchmaschinen-Sperre freigegeben in der IA-Runde 13.10.2026. Ziel-Adresse heute (r4-28): `x-robots-tag: noindex, nofollow`, `robots.txt` «Disallow: /», also wie entschieden. Den Schutz der Vorschauen regelt V-9 (`requiresSSOTeamLogin`, `non_production`); nicht geprüft, Netlify nicht angefasst. | wichtig · R3C-A6 |
| 18 | Druckansicht jeder Seite lesbar, ohne Bedienelemente; 404-Seite | erfüllt | Alle 23 Seiten mit `emulateMedia print` als A4-PDF. Sichtbar im Druck: 0 Hauptnavigation, 0 Sprunglink, 0 Brotkrümel, 0 Eingabefelder. Alle 31 Akkordeon-Panels offen, 0 Pfeile; die Akkordeon-Schaltflächen bleiben als Überschrift ihres Panels (wie in R3 vom 13.10.2026 angenommen); «Auf dieser Seite» bleibt als Inhaltsübersicht. Kein eingeklapptes `<details>` mit verborgenem Inhalt. `kommunizieren` (11 Seiten) als Bild angesehen: lesbar; Validierungstabelle vollständig («Stolperstein», «Radikale Echtheit»). **404:** unbekannter Pfad antwortet lokal mit Status 404 und der eigenen Seite, Ressourcen über absolute Pfade, `noindex, nofollow`; `/404` mit Status 404 über `netlify.toml`. | – |
| 19 | Export statt Arbeitsordner; keine Arbeitsdateien | erfüllt | `site/` hat 34 Dateien: 23 HTML, `_headers`, `_redirects`, `robots.txt`, `css/site.css`, `js/interaktion.js`, 3 × woff2 und `OFL.txt`, `assets/logo.svg`, `assets/favicon.svg`. Kein `UMBAUPLAN.md`, `KORREKTUR-*`, `abgleich/`, `PRUEFBERICHT*`, `tools/`, keine Selbsttest- und Bestandsdateien. Parität: `node authoring/tools/build.mjs --production --verify-site` und `--out=dist/r3v --verify-site`: «PARITÄT BESTANDEN: 34 Dateien byte-gleich mit site/». `netlify.toml`: `publish = "site"`, kein Build. CI `verify-authoring.yml` prüft dasselbe bei Pull Requests. Hinweis: `css/site.css` trägt interne Prüfvermerke als Kommentare (W3C-13, optional). | – |
| 20 | Navigation nur freigegebene Seiten; keine Entwurfsseite erreichbar | erfüllt | Hauptnavigation auf allen Seiten: Übersicht, Verstehen, Alltag und Beziehungen, Behandlung, Unterstützung, Fragen und Nachschlagen. Alle 23 Seiten «published» und mit dem Wortlaut aus `3ceb220` und F1 bis F14 freigegeben (`FREIGABE.md`); die neue Seite nach F0, Option A, mit offener KJPP-Abstimmung (R29-P03). Keine Entwurfsseite im Export. | – |
| 21 | Links und Sprungziele auf der Ziel-Adresse; kein Link auf die Vorschau | **nicht prüfbar** (Ziel-Adresse vor dem Merge); lokal erfüllt | **Lokal:** 1056 interne Verweise, 585 mit Fragment, 209 verschiedene Ziele, 0 defekt, 0 doppelte IDs; 88 Weiterleitungen in `_redirects`, alle Ziele und Anker vorhanden; 0 Links auf eine Vorschau. Im Browser: 18 Sprungziele geladen, darunter alle 6 eingeklappten Ziele (geöffnet, im Sichtbereich, Fokus auf `summary`), die Alias-Anker `kommunizieren#validierung`, `#rollen`, `selbstfuersorge#kraft-vertiefung` und die neuen Anker; Simulation ohne natives Aufklappen 3 von 3 im Sichtbereich (W3C-03). **Ziel-Adresse:** Netlify schreibt Links dort auf Pretty URLs um (live in r4-28: `/krise#suizid`). Mit r4-29 erst nach dem Merge prüfbar. | wichtig · R3C-A6 |

## 3 Blockierende Punkte

Kein Punkt ist **kritisch**. Vor dem Merge fehlen nur Nachweise und Entscheide; keiner davon ändert `site/`:

| Punkt | Was fehlt | Wer erledigt es |
| --- | --- | --- |
| 1, 2 | Stufenstatus r4-29 mit «erledigt» oder «entfällt: Begründung» (R3C-A1); Freigabe der W3-Korrekturen und Zurückstellungen sowie Stand der W2-Befunde im Nachweisordner (R3C-A2) | bauende Sitzung; Bestätigung der «entfällt»-Begründungen durch die Fachstelle |
| 11 | Annahme dieses Ergebnisses; `reviewScope` nennt bisher W3, aber nicht R3 (R3C-A3) | Fachstelle; Eintrag bauende Sitzung |
| 13 | Beleg für 3 PUK-Adressen (R3C-A4), spätestens am Tag des Merge | Fachstelle oder Prüfsitzung mit Browser |
| – | Codex-Review abgeschlossen und geprüft, ausdrücklicher Merge-Auftrag (R3C-A5) | bauende Sitzung, Fachstelle |

Nach dem Merge prüfbar: Punkte 17 und 21 (R3C-A6). Mit Frist nach der Veröffentlichung: R3C-A7 bis R3C-A11.

## 4 Befunde und Nachprüfungen dieser Sitzung

### 4.1 Neue Befunde

| ID | Priorität | Fundstelle | Befund | Vorschlag |
| --- | --- | --- | --- | --- |
| R3C-01 | wichtig | `site/quellen.html`, Einträge «Kanton Zürich … Opferbetreuung durch Forensic Nurses», «Opferhilfe Schweiz … Schutz», «Pro Juventute … Wenn ein Elternteil psychisch krank ist»; seit r4-27 (`8dbf1be`), in r4-29 unverändert | Die Regel für Links (`authoring/PRUEFBERICHT.md`, «Freigabe AR3-4», wie NAR3-2): «Kein Link auf eine Seite, die oben oder in einem hervorgehobenen Kasten einen Krisen- oder Notfallblock mit Telefonnummern zeigt.» Genau diese drei Seiten waren deshalb unverlinkt (E3, F5, NAR34-1). Abruf am 15.10.2026: Forensic Nurses zeigt «Brauchen Sie dringend Hilfe? 24/7-Nummer der Opferhilfe 142 anrufen», ein Gratis-Telefon und `tel:`-Links; «Schutz» hat einen hervorgehobenen Abschnitt «Wenn Sie in akuter Gefahr sind … rufen Sie die Polizei an (117)»; Pro Juventute zeigt in der Navigation «147 – für Kinder & Jugendliche … Die Notrufnummer für Kinder und Jugendliche». Einen Entscheid, der die Regel ändert, finde ich in `audit-results/2026-10-14-delta-release-b-r4-27/` nicht; die Freigabevorlage von Release B zeigt nur den Text der Einträge. Geprüft und regelkonform: `kinderseele.ch` (Notfallhinweis 143 nur im Fliesstext unten, kein hervorgehobener Block), «Für wen ist die Opferhilfe?» (keine Nummer). | R3C-A10: Fachstelle entscheidet; bei «entfernen» die drei Links durch Text ersetzen, Freigabe, Export, Nachprüfung. |
| R3C-02 | wichtig | `authoring/js/interaktion.js` (Synonyme), `site.config.json` (Aliase); schon in r4-28 | Sicherheitsrelevante Anfragen ohne passenden Treffer, live und im Kandidaten gleich: 0 Treffer für «Selbstmordgedanken», «Selbstmordversuch», «lebensmüde», «Lebensmüdigkeit», «Todeswunsch», «Suizidandrohung», «Abschiedsbrief», «Überdosis»; «Suizidalität» → `fragen#f-depression`, «Suizidgefahr» → `diagnose#zweifel`, «Tabletten genommen» → `quellen#forschung`, «Psychiatrie Notfall» → `buecher#auswahl`. Mit r4-29 neu falsch geleitet: «er droht mich umzubringen» → `krise#suizid` (r4-28 `kommunizieren#worte`), «bedroht mich mit dem Tod» → `begriffe#b-selbstverletzung`, «Gewalt gegen Kinder» → `begriffe#b-urteilsfaehigkeit`, «fühle mich bedroht» → `fragen#f-bewertungen`. Die Fusszeile der Suchseite zeigt in jedem Fall den Zuständigkeitsverweis mit «holen Sie sofort Hilfe»; deshalb nicht kritisch. | R3C-A9: Wörter in die Synonymgruppen Suizid und Gewalt, Drohung gegen die eigene Person vor der Suizidgruppe auswerten, Anfragen festschreiben. |
| R3C-03 | wichtig | 12 Abbildungen, Liste in Punkt 3 | Release C ändert den Wortlaut von 12 der 13 Abbildungen, darunter Kernaussagen, Kurztexte und «Grenzen des Bildes». Ein Visualisierungs-Check oder R2 für diese Fassungen ist nicht dokumentiert. Die Wortlaute sind freigegeben und von S gelesen (s3 nennt «Abbildung (Kernaussage, Kurztext, Vertiefung, Textfassung, Legende)»), technisch ohne Überlauf (W3, 138 Läufe; hier 46 Läufe). Die didaktische Prüfung je Figur fehlt. | R3C-A8 |
| R3C-04 | wichtig | `authoring/site.config.json` › `releaseApproval`; `authoring/tools/contract.js` Z. 576–580 | `independentReview` «bestaetigt» vor R3 gesetzt (Punkt 11); `review-report` stützt sich auf die R3-Zeile vom 13.10.2026. Das Produktionsgate kann damit nicht belegen, dass R3 für diese Runde gemacht ist. | R3C-A3 für r4-29; R3C-A11 für das Gate. |
| R3C-05 | optional | `responsibility.reviewedAt` | «09.10.2026» liegt vor der typografischen Anpassung vom 13.10.2026 (`a61a602`: «… kostenlos und vertraulich: angehoerigenarbeit@pukzh.ch.» → «… kostenlos und vertraulich. Kontakt: angehoerigenarbeit@pukzh.ch.»). Beschrieben in `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (P3-Paket), seit r4-21 live. | Beim nächsten Eintrag Datum und Grund nachführen. |
| R3C-06 | optional | `site/behandlung.html`, Abbildung 1 `v-be-kontakt`, `.bl-infoflow__direction` | «Behandlungsteam» bricht bei 1280 und 1440 px in beiden Richtungszeilen mitten im Wort um («Behandlungstea» / «m»), in allen Browsern, weil `hyphens:manual` und `overflow-wrap:break-word` gelten (Spalte 111 bis 113 px). Gleich in r4-28; nicht in der Liste von W3C-05 (dort nur 320 und 360 px). | Mit W3C-05 lösen, z. B. Label umbrechen lassen oder Spalte verbreitern. |
| R3C-07 | optional | `audit-results/2026-10-15-sprache-s-r4-29/` | s1 bis s3 decken 22 von 23 Seiten ab; «Quellen» hat kein S gelesen. Die Änderungen dort (F5, F13, «Verwendet auf» mit Seitentiteln) sind wörtlich freigegeben. | Beim nächsten S mitnehmen. |
| R3C-08 | optional | `begriffe#b-set` | Kein Alias-Anker für den entfernten Glossareintrag SET; W3C-09 hat nur drei Alias-Anker gesetzt. | Nur bei Bedarf. |

### 4.2 Freigabe gegen Umsetzung

- **F1 bis F14:** Alle 21 Ersetzungen aus `ersetzungen.py` stehen in `authoring/content/`, keine alte Fassung ist übrig. F14 ist wie dokumentiert die Ausweichfassung.
- **`WORTLAUT.md`:** 681 Zeilen «Neu» (mit F1 bis F14) stehen im sichtbaren Text von `site/`, davon 679 wörtlich. Die anderen 2 sind nur anders umbrochen (Musterbrief; Zellen der Validierungstabelle mit dem Beispiel aus F10); von Hand bestätigt.
- **Rückrichtung:** 689 neue oder geänderte Textstellen gegenüber `02dba06`. 52 hat der automatische Abgleich nicht zugeordnet. Von Hand durchgesehen sind das:
  - Kurzangaben in den Quellenblöcken mit «Verwendet in», in `WORTLAUT.md` vorhanden, nur anders zusammengesetzt;
  - unveränderte Nachbarsätze in Absätzen, die F4, F7 oder F8 ändern;
  - der Satz «Vollständige Angaben zu den Quellen …», der sich nur im Markup geändert hat;
  - der Vorlagentext «Weitere Themen in diesem Bereich»;
  - «Stand: 15.10.2026» (W3C-08).

  Keine sichtbare Änderung ist ohne Grundlage.
- **Nach W3:** Zwischen `40474e0` und `a7c5ec1` ändern sich in `authoring/` nur:
  - Alias-Anker (`kommunizieren`, `selbstfuersorge`) und das Datum (`ueber`);
  - `interaktion.js` (W3C-01 bis -03);
  - `contract.js` (W3C-06);
  - `site.config.json` (Alias «riskantes Verhalten», `releaseApproval`).

### 4.3 Nachprüfung der W3-Korrekturen (`32afa3f`)

- **Suche:** 94 Anfragen, je gegen die Ziel-Adresse (r4-28) und den Kandidaten.
  - Alle Anfragen zu Suizid führen wie bisher auf `krise#suizid`. Ausnahme wie bisher: «Wenn du gehst, bringe ich mich um» → `kommunizieren#worte`.
  - W3C-01 wirkt: «Ich bin überfordert» r4-28 1 Treffer (`rolle#alltag`), jetzt `selbstfuersorge#warnsignale`; «Selbsttötung» 2 → 20 Treffer.
  - W3C-02 wirkt: «schlägt mich», «er schlägt mich», «bedroht mich», «sie bedroht mich», «Angst vor ihm» r4-28 0 Treffer, jetzt `grenzen#gewalt`; «nimmt Drogen», «riskantes Verhalten» → `grenzen#riskant`.
  - Die 19 beabsichtigten Ersttreffer der Freigabevorlage, Teil 4, sind bestätigt, unter anderem `krise#selbstverletzung`, `behandlung#keine-behandlung`, `jugendliche`, `jugendliche#geschwister`, `jugendliche#volljaehrig`, `grenzen#rollen`, `krise#krisenplan`, `verstehen#anspannung`.
  - Neu falsch geleitet und schon vorher bestehende Lücken: R3C-02.
- **Sprungziele (W3C-03):** wie Punkt 21.
- **Gate (W3C-06):** wie Punkt 11.
- **Datum (W3C-08):** `ueber#barrierefreiheit` «Stand: 15.10.2026».
- **Barrierefreiheit nach den Korrekturen:** axe-core 4.10.2 (wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa), 46 Läufe, 0 Verstösse. «incomplete» color-contrast wie in W3: `behandlung` 2 Knoten bei 320 und 1280 px, `verstehen` 3 Knoten bei 1280 px. Kein Überlauf in 46 Läufen.

## 5 Beurteilung der gestellten Fragen

### 5.1 Reichen R1 und R2 vom 13.10.2026 für Release C?

- **R1 (Profil):** Ja, mit einer Einschränkung.
  - Release C ändert keine Profilkomponente. Neu sind Navigationsnamen, Fusszeilentext, die Zahl der Verweise im Text und die website-eigene Tabelle `.bl-tabelle`.
  - Die Profilregeln, die davon betroffen sind, hat diese Sitzung direkt geprüft: Absenderin, Hinweis «ersetzt keine Abklärung», Zuständigkeitsverweis an fester Stelle, keine Nummern, lokale Schriften, Sicherheitsheader.
  - Die Tabelle und die Silbentrennung brauchen einen Profilentscheid (W3C-04, -05, -10). Das ist offen und nach R3C-A2 zu dokumentieren.
  - Die Ausnahme R1-1 gilt weiter (AR3-5, Abschlussfrist 13.01.2027).
- **R2 (Visualisierung und Laienverständlichkeit):** Nein.
  - R2 vom 13.10.2026 umfasst 10 Figuren und 17 Seiten. Seither sind drei Figuren dazugekommen: `v-be-kontakt` und `v-ki-alltag` (r4-22, didaktisch in der Delta-Prüfung r4-22 geprüft) und `v-ge-forschung` (r4-27, R2 offen, R27-O02).
  - Release C ändert den Wortlaut von 12 Figuren und bringt eine neue Seite.
  - Das ist kein Grund für ein «No-Go»: Die Form der Figuren bleibt, der Wortlaut ist freigegeben und von S gelesen, technisch gibt es keinen Befund. Der Visualisierungs-Check und R2 dieser Fassungen sind aber nachzuholen (R3C-A8).

### 5.2 Genügt die Freigabe der W3-Korrekturen im Commit `32afa3f` als Dokumentation für Punkt 1 und 2?

Nein, nicht allein.

- Die Commit-Nachricht nennt die Antwort «Suche und Kleines jetzt» und die sechs umgesetzten Befunde. Sie nennt weder Uhrzeit noch Fragestellung, und sie nennt nicht, welche sieben Befunde zurückgestellt sind und warum.
- Der Nachweisordner enthält dazu nichts. `FREIGABE.md` sagt im Gegenteil, `independentReview` bleibe «ausstehend», bis W3 und R3 abgeschlossen sind.
- Für eine sichtbare Änderung (W3C-08) und für die Zurückstellung wichtiger Arbeiten am Gate (W3C-07) gehört der Entscheid in den Nachweisordner. Nachvollziehbar ist er schon heute; mit R3C-A2 vor dem Merge genügt er.

### 5.3 W3C-07, Selbsttest 29 von 76

- Ich bestätige den Befund W3C-07 (Punkt 10).
- Für r4-29 ist die Zurückstellung vertretbar. Die Fehlerklassen, auf die es hier ankommt, sind direkt geprüft: `tel:` und Nummern, fremde Ressourcen, Metadaten, Links und Anker, `h1`, Sprunglink, Hinweis und Zuständigkeit, Aufklapp-Konfiguration.
- Als Dauerzustand ist sie nicht vertretbar, aus zwei Gründen:
  - Das Gate ist der Freigabebeleg («0 Blocker»). Sein Selbsttest prüft auf dieser Website zwei Drittel der Fehlerklassen nicht, und weder Build noch CI rufen ihn auf.
  - Das Gate bindet R3 nicht an die Änderungsrunde (R3C-04).
- Deshalb Auflage mit Frist (R3C-A11), nicht nur Pendenz.

### 5.4 Abweichungen zwischen Auftrag und Repository

- **AR3-3:** Der Auftrag nennt «reale Tests als Auflage bis 13.01.2027». Das verbindliche Dokument `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` sagt dagegen: Die Frist ist «aufgehoben», die Tests sind eine «dauerhaft akzeptierte Aussage- und Evidenzgrenze».
  - Ich folge dem Repository und setze keine Frist.
  - Gilt die Frist doch, ist sie nicht dokumentiert. Die Fachstelle klärt das mit R3C-A7.
- **AR3-4:** Der Auftrag nennt «Quellenangaben bis 13.01.2027». AR3-4 ist seit dem 13.10.2026 erfüllt («Freigabe AR3-4», Nachprüfung, «Prüfung der Produktion AR3-4»). Der heutige Stand bestätigt das (Punkt 14).
- **Zugangsschutz:** Der Auftrag nennt die Ziel-Adresse «zugangsgeschützt». Am 15.10.2026 um 09.13 UTC antwortete `https://borderline-angehoerige.netlify.app/` ohne Anmeldung mit HTTP 200 und Build r4-28. Dokumentiert ist der Schutz der Vorschauen (V-9).
  - Nur gelesen, nichts geändert.
  - Ob die Produktion geschützt sein soll, ist im Repository nicht als Entscheid zu finden. Das ist kein Befund dieser Prüfung, weil Änderungen daran ausgeschlossen sind.

## 6 Bereits entschieden; geprüft ist nur, ob es dokumentiert ist

| Entscheid | Fundstelle | Dokumentiert |
| --- | --- | --- |
| AR3-3 reale Tests | `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`, «Dauerhaft akzeptierte Einschränkung»; `ueber.html#barrierefreiheit` | ja (Abweichung zum Auftrag in 5.4) |
| AR3-4 Quellenangaben | `authoring/PRUEFBERICHT.md`, «Freigabe AR3-4» | ja, erfüllt |
| R1-1 Verweis im Text 16 px | `authoring/PRUEFBERICHT.md`, «Begründete Ausnahme · Verweis im Text (R1-1)»; PENDENZEN, AR3-5 (bis 13.01.2027) | ja |
| P-13 `noindex, nofollow`, `Disallow: /` | PENDENZEN, AR3-5; `authoring/PRUEFBERICHT.md`, IA-Runde 13.10.2026 | ja |
| Schutz der Vorschauen | `authoring/PRUEFBERICHT.md`, «Annahme von «Go mit Auflagen»», V-9 | ja |
| E7 Verweis im Text höchstens sieben Seiten je einmal | `FREIGABE-VORLAGE.md`, Teil 6; `FREIGABE.md` | ja; umgesetzt: 7 Seiten × 1. In PENDENZEN noch «offen» (R3C-A7) |
| E4 eigene Seite für Eltern von Jugendlichen, E9 Vorbehalte | `FREIGABE-VORLAGE.md`; `releaseApproval.reviewScope` | ja; in PENDENZEN noch «offen» (R3C-A7) |
| F0 Option A, «Geschwister» bleibt | `FREIGABE.md`, «Entscheide mit Bedingung», gestützt auf den Institutionsentscheid «auch junge Angehörige werden beraten» | ja |
| F14 Ausweichfassung | `FREIGABE.md` | ja |
| Keine Rechtsdienstprüfung | `FREIGABE.md`, «Was die Freigabe nicht ersetzt»; R27-O01, R29-P01, -P02, -P04 | ja |
| Keine Krisenintervention, kein Notfallblock | PENDENZEN, «Keine Krisenintervention» | ja, eingehalten (Punkt 12) |

## 7 Vorgehen

- **Gelesen:**
  - `README.md`, `AGENTS.md`, `AUDIT-AGENT-START.md`, `MIGRATION-NACHWEIS-2026-10-13.md`, `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`, `netlify.toml`, `.github/workflows/verify-authoring.yml`;
  - `authoring/PRUEFBERICHT.md`: Kopf, Statustabelle, «Fachliche Freigabe», V-1 bis V-9, R1-1, «Annahme von «Go mit Auflagen»», «Freigabe AR3-4», «R3 Freigabe-Audit» vom 13.10.2026;
  - der Nachweisordner dieser Runde ganz (ohne den vollen Text von `WORTLAUT.md`, der maschinell abgeglichen ist);
  - W2 (Bericht und Befunde), S s1 bis s3 (Befunde), `authoring/tools/build.mjs`, die Gate-, Selbsttest- und Renderteile von `contract.js` und den Suchteil von `interaktion.js`.
  - Die Profilleitlinien liegen nicht im Repository. Für den Standardwortlaut der Zuständigkeit habe ich die Kurzfassung «PUK Website-Profil 2026.10» (Skill) beigezogen.
- **Gebaut:**
  - `node authoring/tools/build.mjs --out=dist/r3`;
  - `--production --out=dist/r3p`;
  - `--production --out=dist/r3v --verify-site`;
  - `--production --verify-site` (überschreibt den ignorierten Ordner `dist/site`).
  - Alle Ausgaben liegen in `dist/`, das ignoriert ist.
- **Gate:** Selbsttest und Gegenproben (Tippfehler, `independentReview`) im Speicher, ohne Datei im Repository zu ändern.
- **Browser:**
  - eigener Node-Server nach dem Beispiel `serve-headers.mjs` (kopiert), der `_headers` anwendet;
  - Chromium 141.0.7390.37 über Playwright 1.56.0, headless;
  - axe-core 4.10.2 in einem eigenen Kontext mit `bypassCSP`, nur zum Einschleusen; alle anderen Läufe mit aktiver CSP;
  - Druck als PDF, ein PDF mit `pdftoppm` angesehen.
- **Externe Links:**
  - `curl` mit Browser-Kennung über den Proxy;
  - PubMed-Schnittstelle (23 PMIDs), Crossref-API (9 DOIs);
  - WebFetch für die fünf Adressen mit Bot-Schutz: 2 abgerufen, für 3 wurde der Abruf nicht freigegeben;
  - drei Zielseiten heruntergeladen und auf Notrufnummern und `tel:`-Links durchsucht (R3C-01).
- **Ziel-Adresse:** nur gelesen (Kopfzeilen, `robots.txt`, Buildmarker, Suche). Netlify nicht angefasst.
- **Skripte und Rohdaten:** im Arbeitsordner dieser Sitzung, `…/scratchpad/r3/`, ausserhalb des Repositorys: `selftest.mjs`, `foldcheck.mjs`, `browser.cjs`, `browser-result.json`, `search*.cjs` und `search-*.json`, `jumps.cjs`, `kbd.cjs`, `links.py`, `ext_status.tsv`, `wortlaut.py`, `rueck.py`, `pdf/`.
- **Nebenwirkung, behoben:** Das Laden von `ersetzungen.py` hat einen Python-Cache `__pycache__/ersetzungen.cpython-313.pyc` im Nachweisordner angelegt. Datei und Ordner sind einzeln gelöscht; `git status` zeigt danach nur diese Datei.
- **Eintrag:** Nach dem Auftrag dieser Sitzung steht das Ergebnis hier statt in `authoring/PRUEFBERICHT.md`. Committet ist nichts; das übernimmt die bauende Sitzung, ohne den Bericht zu ändern.

## 8 Nicht prüfbar und warum

- **Ziel-Adresse mit r4-29** (Punkte 17, 21, Sicherheitsheader live): erst nach dem Merge, R3C-A6.
- **Vorschau:** Es gibt noch keine. Ihr Schutz (V-9) ist nicht geprüft, Netlify nicht angefasst.
- **Drei PUK-Adressen** (R3C-A4): Bot-Schutz (`curl` 403), Abruf per WebFetch nicht freigegeben.
- **Inhalt externer Zielseiten** über Titel, Stichworte und Notrufnummern hinaus; 9 Verlagsseiten hinter DOIs (403 beim Verlag, Metadaten über Crossref bestätigt).
- **Reale Screenreader-Läufe, Hardwaretastatur, Touch, Windows-Kontrastmodus, Safari und Firefox:** nicht verfügbar und nach AR3-3 bewusst nicht vorgesehen.
- **Silbentrennung mit Wörterbuch:** Diesem Chromium fehlt das deutsche Trennwörterbuch. R3C-06 hängt davon nicht ab (`hyphens:manual`).
- **Fachliche, rechtliche und didaktische Richtigkeit:** Fachliche Freigaben erteilt R3 nicht. Geprüft ist nur, dass sie dokumentiert sind und dem Text entsprechen.
