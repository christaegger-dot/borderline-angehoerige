# Übergabe Gestaltung · 21.10.2026

Stand: **Entwurf, nicht gebaut, nicht geprüft.** Die Dateien wurden ausserhalb des Repositorys vorbereitet. Kein Build, kein Gate und keine Sichtprüfung am gebauten Stand wurden durchgeführt.

Grundlage: die Entwürfe «Borderline Startseite Entwurf» und «Borderline Verstehen Entwurf», mit Christa abgestimmt am 21.10.2026.

## Geänderte Dateien

| Datei | Änderung |
|---|---|
| `authoring/css/site.css` | Block «Gestaltung 2026-10-21» am Ende angehängt. Bestehende Regeln sind unverändert. Neue Klassen beginnen mit `.bl-`. |
| `authoring/content/index.html` | Reihenfolge Einstiege → Haltung → Themen → Beratung. Klassen `bl-section--wide`, `bl-paths-cards`, `bl-paths-lines`, `bl-band`. «Beratung per E-Mail anfragen» als Hauptaktion (`puk-link--action bl-action--primary`). Texte unverändert. |
| `authoring/content/verstehen.html` | Abbildung «Beobachten, nicht Gedanken lesen» entfernt und durch zwei Beispielsätze ersetzt (`puk-say`). «Was Sie tun können» als Kasten (`bl-tun`). Merkmale als Raster (`bl-merkmale`). Annahmen breit (`bl-annahmen`). Merksatz blau (`bl-merksatz`). Verweis im Text (`data-responsibility-inline`) entfernt, Entscheid Christa 21.10.2026. Abbildungen neu nummeriert (1 Anspannungskurve, 2 Momentaufnahmen). Quelle «Kanton Zürich, Notfall und Rettung» aus der Seitenliste entfernt. |
| `authoring/site.config.json` | `assetVersion` r4-39 → r4-40. Planzeile `v-vs-eisberg`: `format: text`, Begründung, `approvalStatus: ausstehend`. |

## Bauen und prüfen

```bash
node authoring/tools/build.mjs --production --out=dist/site
node authoring/tools/build.mjs --selftest
```

Die Paritätsprüfung (`--verify-site`) schlägt erwartungsgemäss fehl, bis `site/` nach der Freigabe neu geschrieben ist.

## Prüfbedarf

1. **Zwei neue Beispielsätze** (verstehen › eisberg): «Du willst mich doch nur provozieren.» und «Deine Stimme wird lauter. Wie ist es gerade für dich?» (am 22.10.2026 ersetzt, siehe «Beispielsätze nach Rückmeldung Christa»). Stand 22.10.2026: beide Sätze in der neuen Fassung fachlich freigegeben, Etikett «Musterentwurf» entfernt (siehe dort).
2. **Überschriften in Rubik Medium (500).** Das CD Manual nennt Light und Regular für Text. Entschieden am 22.10.2026: bleibt (siehe unten).
3. **Grundfläche #F5F7FF** ist eine Schattierung von PUK-Blau unter 25 %. Entschieden am 22.10.2026: bleibt, mit Auflage (siehe unten).
4. **Einspaltige Abschnitte gelten für alle Seiten** (`.puk-longform__section-grid`). Alle übrigen Seiten bei 1280 px und 360 px ansehen, besonders Figuren und Akkordeons.
5. **Kopf und Menü:** Nur die Abstände wurden verdichtet. Das Verhalten der Navigation (Menü) erzeugt der Renderer und wurde nicht geändert.
6. **Fusszeile** ist per CSS umgestaltet (helle Blaufläche, Kontakt als Karte), der Wortlaut ist unverändert. Wortlaut-Vorschläge: `WORTLAUT-VORSCHLAEGE-FUSSZEILE-2026-10-21.md` (Musterentwurf, nicht freigegeben).
7. **Bild im Einstieg** der Startseite: Im Entwurf steht dort ein Platzhalter, die echte Website hat keinen. Erst mit einer freigegebenen Zeichnung ergänzen.
8. **Anspannungskurve** ohne Achsen, wie im Plan festgehalten («keine Skala, keine Zahlen, keine Achse», Entscheid Fachstelle 09.10.2026).
9. **Momentaufnahmen:** Eine Zeichnung durch eine Illustratorin wird empfohlen.
10. **Prüfstufen** Visualisierungs-Check, Bedienung und Barrierefreiheit (Tastatur, 200 % Text, erzwungene Farben, reduzierte Bewegung) sowie W3 sind für diese Änderung offen. Sie werden in einer Sitzung geprüft, die nicht gebaut hat.
11. **Dekorative Pfeile** «→» bei «Weitere Themen» und im Kontaktlink kommen aus dem CSS und haben einen leeren Alternativtext (`content:"→" / ""`). Mit einem Screenreader prüfen, dass sie nicht vorgelesen werden. Ältere Browser ohne diese Syntax lesen sie eventuell mit.
12. **Bedienung und Barrierefreiheit** ist für den aktuellen CSS-Stand nicht geprüft (Tastatur, 200 % Text, erzwungene Farben, reduzierte Bewegung, Druck). Siehe auch `REVIEW-GESTALTUNG-2026-10-21.md`.

## Nachbesserung nach Prüfung PR #708 (21.10.2026)
- **Mitlaufende Leiste «Auf dieser Seite»:** entfernt. Sie verdeckte bei 1280 px Fokus und Sprungziele (WCAG 2.4.11). Die Leiste steht jetzt fest unter dem Einstieg.
- **Fusszeilenlinks:** von `--text-link` auf `--puk-blue-125`; vorher 4,40:1 auf der hellen Blaufläche. Nachmessen.
- **Vollbreite-Flächen:** mit `border-image` statt `box-shadow` und `clip-path`, damit Fokusringe (z. B. E-Mail-Link der Absenderzeile) nicht abgeschnitten werden.
- **Druck:** Band, Merksatz und Phasenkarte 2 drucken dunklen Text mit blauem Rahmen statt weissem Text auf fehlender Fläche.
- **Planzeile `v-vs-eisberg`:** nennt jetzt beide neuen Sätze.
- **Offen, braucht eine Werkzeugänderung im Repository:** `sprachtest.mjs` erwartet auf «Verstehen» noch den Akuthinweis. Die Erwartung ist nach dem Entscheid vom 21.10.2026 anzupassen.

## Nachbesserung 2 nach Nachprüfung PR #708 (22.10.2026)
Grundlage: Nachbesserungsauftrag zur Nachprüfung (`PRUEFBERICHT.md`, Abschnitt «Nachprüfung PR #708 · 21.10.2026»). Die Kreuze im Auftrag hat Christa am 22.10.2026 delegiert: «ok, kreuze an und fahre fort». Gewählt sind Teil A, B1a, B2c sowie C1–C8 und C10. Ausgeführt hat die Nachprüfsitzung von Commit 7; die nächste Nachprüfung macht deshalb eine Sitzung, die an diesem PR weder gebaut noch geprüft hat.

Alle Messwerte unten sind eine **Selbstprüfung, keine Prüfstufe**: Playwright 1.56.1 mit Chromium 141.0.7390.37, lokaler Server mit den Kopfzeilen aus `_headers`.

**Teil A · Pflicht**
- **N1 · Überlauf in «Auf dieser Seite»:** `white-space:nowrap` beim Link gestrichen (`site.css:1682`). Schrift 32 px, 760–1280 px in 8-px-Schritten, 23 Seiten: kein Überlauf mehr (vorher `beziehungen` 760–832 px, `scrollWidth` bis 838). Normalschrift: Lage und Höhe aller Links in «Auf dieser Seite» bei 1280, 1100, 1099, 924, 768 und 760 px auf allen 23 Seiten gleich wie vorher.
- **N3 · Helle Flächen bei erzwungenen Farben:** im Block für erzwungene Farben `.puk-longform__hero,.puk-site-sender{border-image:none}` (`site.css:1789–1790`). Dunkles Schema: Einstieg und Absenderzeile `#000000` statt `#F5F7FF` bzw. `#F4F4F4`; helles Schema `#FFFFFF`.

**Teil B · Entscheide**
- **B1a · Gate prüft die neuen Beispielsätze (P708-I1):** `contract.js` meldet jetzt auch eine Planzeile mit `format: text` im Produktionsgate, solange sie weder «freigegeben» noch «entfällt» ist. Heute betrifft das nur `v-vs-eisberg`. Neuer Selbsttest-Fall «Produktion blockiert ausstehende Textfassung im Visualisierungsplan».
  - Selbsttest 83/83 (vorher 82). `--production`: 6 BLOCK / 20 WARN, neu `BLOCK | verstehen | visual-approval | Textfassung v-vs-eisberg nicht freigegeben (ausstehend)`. Entwurf: 0 Blocker / 26 Hinweise (vorher 25).
  - Simulation in einer Wegwerfkopie: Mit den fünf übrigen Abbildungen auf «freigegeben» blockiert das Gate weiter (1 Befund, `v-vs-eisberg`). Erst mit `v-vs-eisberg` auf «freigegeben» läuft der Produktionsbuild durch.
  - Nach der Freigabe von F1 und F2: in der Planzeile `approvalStatus` mit Name, Datum und Beleg setzen und das Etikett «Musterentwurf, nicht fachlich geprüft» in `verstehen` › `#eisberg` entfernen. Das Etikett selbst prüft das Gate nicht.
- **B2c · Begründete Ausnahme zur Kurvenhöhe (NP708-N2):** Die Anspannungskurve ist bei 375 px als ganze Figur 1942 px hoch (`main` 1772 px); `layouttest.cjs` meldet deshalb `tension core exceeds 1800px`. Die Grenze stammt aus A04-2014: «Bei 375 px sind die vier Phasen und ihre grundlegenden Handlungsmöglichkeiten in höchstens 1800 px Figurhöhe ohne Aufklappen erfassbar.» Das ist erfüllt: Die vierte Phasenkarte endet bei 1508 px; danach folgen nur noch der Zugang zur Vertiefung, die Modellgrenze und die Kennzeichnung. Die Abweichung im Layouttest ist deshalb begründet und bleibt stehen; Werkzeug und Darstellung bleiben unverändert.

**Teil C · gering**
- **C1 · Druck, obere Linie des Bands (N4a):** `.puk-longform__section+.bl-band{border-top:2px solid var(--puk-blue-100)}` im Druckblock (`site.css:1799`). Sie ist so spezifisch wie `site.css:1668` und steht später. PDF Start S. 3: Band ringsum gerahmt.
- **C2 · Druck, Ring um «2» (N4b):** Rand der Nummer im Druck `--puk-blue-100` (`site.css:1800`). PDF Verstehen S. 5: «2» mit blauem Ring wie 1, 3 und 4.
- **C3 · Druck, Aktionslinks der Startseite (N5):** «Mit meiner Frage beginnen» und «Beratung per E-Mail anfragen» drucken ohne Fläche, dunkel, mit blauem Rahmen (`site.css:1801`). PDF Start ohne Hintergrund: `#222222` auf Weiss, 15,91:1 (vorher `#ABABAB`, 2,30:1); mit Hintergrund ebenfalls `#222222`.
- **C4 · Druck, Einstiegskarten (B7):** `.bl-paths-cards li{break-inside:avoid}` (`site.css:1802`). PDF Start: keine Karte mehr über zwei Seiten; weiterhin 4 Seiten, Verstehen 14.
- **C5 · Erzwungene Farben, Rahmen (B6):** Kontaktkarte und Figurflächen mit Rahmen, Band auch oben, Phasenkarte 2 mit 3 px statt 1 px (`site.css:1791–1793`). Emulation hell und dunkel, 1280 und 360 px, 23 Seiten: alle Rahmen vorhanden.
- **C6 · Container-Abfrage DEAR (V2):** `@container (min-width:62.01rem)` → `@container (width > 62rem)` (`site.css:1774`). Container auf 992,08 und 992,15 px gesetzt: 4 statt 5 Spalten. Fenster 1070 / 1080 / 1100 / 1280 px wie vorher.
- **C7 · Phasenkarten bei grosser Schrift (V3):** `@media (min-width:1100px)` → `@media (min-width:68.75em)` (`site.css:1708`). Normalschrift: 4 Spalten ab 1100 px wie vorher. Schrift 32 px bei 1280 px: 2 Spalten, 0 Wortbrüche in Figuren (vorher «Argumentier / en»).
- **C8 · Richtigstellung zu DEAR (V1):** DEAR wird erst ab etwa 1080 px Fensterbreite waagrecht, nicht «ab ~990 px» wie in `REVIEW-GESTALTUNG-2026-10-21.md` (Zeile zu «Grenzen»). Massgebend ist die Breite des Containers über 62 rem (992 px). Das Review bleibt als historische Selbstprüfung unverändert.
- **C10 · Quellenseite (I3):** In `quellen` › `#versorgung` nennt «Notfall und Rettung» unter «Verwendet auf» nicht mehr «Borderline verstehen». Folgeänderung zum Entscheid vom 21.10.2026 (Akuthinweis auf «Verstehen» entfällt). Satzvergleich: 831 Sätze, genau dieser eine geändert.

**Selbstprüfung nach Teil A–C**

| Prüfung | Ergebnis |
| --- | --- |
| Selbsttest | 83/83 |
| `--production` | blockiert, 6 BLOCK / 20 WARN (fünf Abbildungen und `v-vs-eisberg`) |
| Entwurf | 23 Seiten · 0 Blocker · 26 Hinweise |
| Suchtest | 216/216, JS-Fehler 0 |
| Sprach-/UI-Test | 73/73, JS-Fehler 0 |
| Layouttest (unveränderte Kopie gegen den Entwurf) | 1 Abweichung: `tension core exceeds 1800px` (B2c) |
| Tastatur | 23 Seiten bei 1280, 924 und 360 px, vorwärts und rückwärts: 5036 Fokusstellen, 0 verdeckt, alle mit Indikator, kein `fixed`/`sticky` |
| Sprungziele | 684 Sprünge über «Auf dieser Seite» und 422 Fragment-Ladevorgänge: alle Ziele sichtbar |
| Fusszeilenlinks | 5,95:1; Theme «kontrast» 11,85:1 |
| Absenderzeile | Fokusring der E-Mail auf allen vier Seiten vollständig (1280, 924, 360, 320 px); Flächen in voller Breite; kein waagrechtes Scrollen |
| Überlauf | 23 Seiten × 14 Bedingungen (7 Breiten, Zoom 200 und 400 %, Schrift 32 px bei 5 Breiten): kein waagrechtes Scrollen, keine innere Bildlaufleiste |

**Nicht bearbeitet:** C9 (P708-W6, doppelter Fokusindikator an den Einstiegskarten, Gestaltungsentscheid), P708-W2, W3, W4 und V4 sowie F1–F4. Kein Screenreader verfügbar.

## Beispielsätze nach Rückmeldung Christa (22.10.2026)
Rückmeldung von Christa Egger am 22.10.2026 zu F1 und F2 (`verstehen` › `#eisberg`):
- **F1** «Du willst mich doch nur provozieren.»: «OK».
- **F2** «Deine Stimme wird lauter. Wie ist es gerade für dich?»: «nicht ok, bitte formuliere es natürlicher, menschlicher». Drei Vorschläge vorgelegt; gewählt: «Ich höre, dass du lauter wirst. Magst du mir sagen, was gerade in dir vorgeht?»
- Geändert: der Satz in `content/verstehen.html` und `reason` der Planzeile `v-vs-eisberg`. Unverändert bleiben die Frage «Wie ist es gerade für dich?» im Kasten «Was Sie tun können» (Bestandstext), das Etikett «Musterentwurf, nicht fachlich geprüft» und `approvalStatus: ausstehend`. Beides ändert sich erst, wenn die Freigabe beider Sätze ausdrücklich dokumentiert ist.
- **Freigabe:** Am 22.10.2026, 09:14 Uhr, hat Christa beide Sätze ausdrücklich freigegeben («ich gebe beide sätze frei»). Nachweis: `audit-results/2026-10-22-v-vs-eisberg/FREIGABE.md`. Danach Planzeile auf «freigegeben» mit Name, Datum und Beleg; Etikett «Musterentwurf» entfernt. Das Produktionsgate meldet `v-vs-eisberg` nicht mehr.
- Damit ist diese Sitzung bauende Sitzung dieses PR; die Nachprüfung von `f50536e` und dieses Commits macht eine andere Sitzung.

## Gestaltungsentscheide F3, F4 und W6 (22.10.2026)
Christa hat am 22.10.2026 die Empfehlungen übernommen; Nachweis und Messwerte: `audit-results/2026-10-22-gestaltungsentscheide/ENTSCHEID.md`.
- **F3 · Rubik Medium für `h1`/`h2`:** bleibt. Als Profilentscheid im Design-System nachzutragen.
- **F4 · Grundfläche `#F5F7FF`:** bleibt, mit Auflage «kein kleiner Text in `#3C64FF` auf getönten Flächen». Drei Links verletzten sie (Absenderzeile 4,28:1, Einstieg `index` 4,40:1, «Was Sie tun können» auf `verstehen` 4,25:1) und stehen jetzt in `--puk-blue-125`. Als Profilton im Design-System nachzutragen.
- **W6 · Fokus an den Einstiegskarten:** ein Rahmen um die ganze Karte, nur bei Tastaturbedienung (`:has(a:focus-visible)`); ohne `:has()` bleibt der Doppelrahmen als Rückfall.

## Fünf Abbildungen aus r4-39 nach Rückmeldung Christa (22.10.2026)
Wortlaut der Rückmeldung und Status je Abbildung: `audit-results/2026-10-22-abbildungen/FREIGABE.md`.
- **Abbildung 3 `v-ju-uebergang`:** freigegeben wie gezeigt (Fassung `176444c`); Abbildungsnummer «Abbildung 1» ergänzt. Plan-Eintrag mit eigenen Angaben statt Sammelsätzen, Rechtsgrundlagen Art. 14 und Art. 296 Abs. 2 ZGB.
- **Abbildung 5 `v-ge-aspekte`:** als Text belassen. Figur entfernt; ihre drei Erläuterungen standen nicht schon im Abschnitt und stehen jetzt wörtlich als Unterabschnitte in `genesung` › `#begriffe`. Der Einleitungsabsatz endet schon mit «Diese verändern sich nicht unbedingt gleichzeitig.»; die gleichlautende Kernaussage entfällt. Plan-Eintrag `format: text`, freigegeben. Die Regeln `.bl-parallel-aspects` in `site.css` werden damit nicht mehr verwendet (wie P708-W4).
- **Abbildung 1 `v-vs-anspannung`:** Kernaussage «… oder das Gespräch vorerst beenden.»; Beispiel Phase 3 «Für mich ist es gerade zu viel. Ich mache eine Pause.». Freigabe der geänderten Fassung ausstehend.
- **Abbildung 2 `v-ki-alltag`:** Fachpersonen «Kinderarztpraxis, Schulsozialarbeit, schulpsychologischer Dienst, Familienberatung oder Kinder- und Jugendpsychiatrie». Bei breiter Darstellung (Container über 55 rem) je eine Linie vom Kasten oben senkrecht hinunter und waagrecht bis zur Kinderbox, Pfeilspitze an der Kinderbox; die Kästen oben gleich hoch. Beschriftungen und schmale Fassung (↓, ↑) unverändert. Freigabe ausstehend.
- **Abbildung 4 `v-sf-entlastung`:** Kernaussage «Sie dürfen für sich sorgen: begrenzen, abgeben oder sich beraten lassen.»; erste Frage «Was brauche ich für mich?», auch in der Screenreader-Fassung; «Abbildung 2» ergänzt. Plan-Eintrag mit eigenen Angaben. Freigabe ausstehend.
- Produktionsgate danach: 3 BLOCK (Abbildungen 1, 2 und 4).
- **Nachtrag 22.10.2026, 12:17 Uhr:** Christa gibt die geänderten Fassungen von `v-vs-anspannung`, `v-ki-alltag` und `v-sf-entlastung` frei (Stand `5b024ce`); Wortlaut im Nachweis. Produktionsgate: 0 BLOCK.

## Nachbesserung 3 nach Nachprüfung 2 (22.10.2026)
Entscheid Christa Egger, 22.10.2026: Die drei geringen Befunde NP2-1 bis NP2-3 und der Hinweis H1 der Nachprüfung 2 (`PRUEFBERICHT.md`, Abschnitt «Nachprüfung 2 PR #708 · 22.10.2026») werden vor dem Neuschreiben von `site/` behoben; danach Nachprüfung 3 durch eine unbeteiligte Sitzung, dann `site/` und Merge. Ausgeführt hat die Nachprüfsitzung 2; sie ist damit bauende Sitzung und für Nachprüfung 3 ausgeschlossen. Nachweis mit Messwerten und Bildschirmfotos: `audit-results/2026-10-22-nachbesserung-3/BERICHT.md`. Alle Werte dort sind eine Selbstprüfung, keine Prüfstufe.
- **NP2-1 · `v-ki-alltag`:** Die waagrechte Verbindungslinie sitzt an der Unterkante der Beschriftung statt auf fester Höhe; bei zweizeiliger Beschriftung (957–985 px) rückt sie mit. 760–1280 px in 1-px-Schritten: Mindestabstand Text–Linie 13,3 px (vorher −3,3 px bei 958–984 px), Pfeilspitze auf der Linienmitte, kein Überlauf. Bei 1280 px bis auf die um 2 px zentrierte Pfeilspitze pixelgleich. Wortlaut, Kennzeichnung und Screenreader-Fassung unverändert; Gestaltungskorrektur ohne neue Freigabe.
- **NP2-2 · 404-Seite:** `.puk-longform__hero .puk-link--action:not(.puk-site-start-actions .puk-link--action):hover{color:var(--puk-blue-125)}`. «Zur Startseite» überfahren 5,95:1 (vorher 4,40:1); alle Zustände mindestens 4,71:1. Alle 168 Links und Schaltflächen auf getönten Flächen, 23 Seiten, in Ruhe, überfahren und fokussiert: 0 unter 4,5:1. Startaktionen der Startseite unverändert.
- **NP2-3 · `contract.js`:** Der Selbsttest-Fall zur Textfassung meldet ohne freigegebene Textfassung «keine freigegebene Textfassung im Visualisierungsplan – Fall nicht prüfbar» als FAIL (Exit 1) statt `TypeError`. Neuer Fall dafür; Selbsttest 84/84.
- **H1 · `selbstfuersorge` › `#unterstuetzung`:** «Sie dürfen auch zuerst für sich sorgen.» statt «Sie dürfen zuerst oder ausschliesslich für sich sorgen.» (Wortlaut von Christa, Begründung wie bei der Figur: Die Seite lesen auch Eltern minderjähriger Kinder). Nur dieser Satz. «ausschliesslich» steht sonst nur in anderem Sinn auf `diagnose` und `impressum-datenschutz`; gemeldet, nicht geändert.
- Kennzahlen: Selbsttest 84/84; Produktion 23 Seiten · 0 Blocker · 20 Hinweise; Entwurf 0 / 20; Suchtest 216/216; Sprach-/UI-Test 73/73; Layouttest 1 Abweichung (B2c); `--verify-site` Exit 1, erwartet.

## Pull Request

Als Entwurf eröffnen, mit Verweis auf diese Datei und die offenen Stufen. `site/` erst nach Freigabe in einem separaten PR neu schreiben.
