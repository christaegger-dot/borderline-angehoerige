# Gestaltung Schritt 1 · r4-43 · 29.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 29.10.2026:** nach der Designanalyse «ja, setze den ersten Schritt um»; während der Umsetzung ergänzt: «Sprache und Inhalt: du darfst natürlich optimieren und korrigieren, auch kürzen bei Doppelspurigkeiten!» Ausgangsstand `main` = `a7f3073` (r4-42, PR #712 gemergt). Branch `claude/dazzling-cerf-n6ci1w`.

Grundlage ist das Gestaltungssystem «Borderline Angehörige» (Design-System-Artefakt vom 29.10.2026 mit Analyse, Tokens, Bauteilen und Seitenmustern). Schritt 1 dort: neuer Seitenrahmen und neues Stylesheet ohne Änderung der Aussagen. Die Struktur der Navigation (Schritt 3) und das Vereinheitlichen der Bausteine im Markup (Schritt 2) sind nicht Teil dieses Stands.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

## Was sich ändert

### Seitenrahmen (Renderer `authoring/tools/contract.js`)

- **Kopf:** Logo und Hauptnavigation stehen in einer Zeile. Darunter folgt eine leise Zeile mit der Absenderin samt E-Mail und den Direkteinstiegen «Kurz und klar» und «Website durchsuchen». Die graue Absenderleiste entfällt. Die Absenderin bleibt auf jeder Seite sichtbar im Kopf, wie es das Gate (`sender`) verlangt. Unter 78 rem (1248 px) erscheint der Menüknopf, und die Liste klappt über die ganze Breite unter dem Kopf auf. Ohne Skript steht sie offen.
- **«Auf dieser Seite»:** Der Renderer fasst die Leiste und den folgenden Inhalt in ein Seitenraster (`.puk-site-layout`). Ab 72 rem (1152 px) steht die Liste als eigene Spalte links und bleibt beim Scrollen stehen. Sie überdeckt keinen Inhalt (WCAG 2.4.11), und der gerade gelesene Abschnitt ist markiert (`aria-current="true"`, `interaktion.js` › `tocSpy`). Schmaler ist sie eine aufklappbare Zeile (`data-puk-disclosure`), ohne Skript offen. Wortlaut, Reihenfolge und Sprungziele der Fragmente sind unverändert.
- **«Weitere Themen in diesem Bereich»** steht in der Lesespalte als Liste statt als Kartenraster.
- Build-Kennung r4-43 (`BUILD`, `assetVersion`). `independentReviewWaiver.version` r4-43 stützt sich wie bei r4-41 und r4-42 auf den fortgeltenden Entscheid vom 18.10.2026 und ist in `appliedTo` vermerkt. `pendingScope` beschreibt r4-43.

### Stylesheet (`authoring/css/site.css`)

Neu geordnet in sieben Schichten, siehe Kopfkommentar der Datei. Tokens, Grundlagen, Interaktionsbausteine und Visualisierungsmuster des Kits sind unverändert übernommen. **Ersetzt, nicht überschrieben** sind die Rahmenregeln aus r4-24 bis r4-42: Kopf, Einstieg, Abschnittsraster, «Auf dieser Seite», Fusszeile und der Block «Gestaltung 2026-10-21». Vorher 1822 Zeilen, jetzt 1734. Die Regeln für `.puk-longform__section-heading` standen vorher an fünf Stellen, die einander überschrieben. Jetzt stehen sie einmal im Seitenrahmen (mit einer Breitenstufe) und einmal im übernommenen Druckblock.

- **Rangordnung:** Seitentitel 44 px (schmal 32), Abschnittstitel 30 px (schmal 25), Zwischentitel 23 px (schmal 21). Vorher war der Abschnittstitel mit 57 px grösser als der Seitentitel (52 px).
- **Leseschrift:** Rubik Regular 20/32 px, unter 760 px 19/30 px. Vorher war es Light 21 px. Das Profil sieht Regular für Text vor (`--type-body`). Light bleibt der Einleitung vorbehalten.
- **Flächen mit Bedeutung:** Der Einstieg steht auf Weiss. Blau (`#F5F7FF`) gilt für «Was Sie tun können», den hilfreichen Beispielsatz und die Einstiegskarten. Grau (`#F7F7F7`) gilt für Abbildungen und die Fusszeile. Gelb gilt für Hinweise zur Sicherheit (`.puk-longform__boundary`) und die erste Einstiegskarte («Ich sorge mich um Sicherheit …»). Rot ist nur für den Akuthinweis da (`.puk-site-inline-ref`, Wortlaut aus `site.config.json` unverändert). Das Band «Haltung» steht in `#182866` (Nachtblau, Schattierung von PUK Blau) statt in PUK Blau 100.
- **Abschnitte:** Es gibt keine Trennlinie mehr zwischen Abschnitten, nur Weissraum. Text und Kästen stehen in 45 rem (720 px), Abbildungen bis 64 rem (1024 px).
- **Beispielsätze («So könnte es klingen»):** Im Text gibt es jetzt eine Form für alle Seiten (Paar, der hilfreiche Satz auf Blau). Vorher gab es zwei Formen (Review 21.10.2026, G10). In Abbildungen bleibt die freigegebene Linienform.
- **Nebenbefund behoben:** Die Tokens `--surface-subtle` und `--border-width` waren nicht definiert. Filterfeld, Suchfeld, Brotkrumen und «Das Wichtigste» fielen deshalb still auf «transparent» bzw. «ohne Rahmen» zurück. Die Filterfläche ist jetzt grau, und das Suchfeld hat einen Rahmen in Schwarz 50 (3,2:1).

### Abbildungen

Aussage, Anordnung und Beschriftung bleiben wie freigegeben. Geändert sind nur zwei Dinge. Die Fläche ist grau statt hellblau. Die Phasenkarten der Anspannungskurve fragen ihren Container ab statt der Fensterbreite (zwei Spalten ab 35 rem, vier ab 60 rem), weil die Abbildung jetzt neben der Seitennavigation steht. Die Schwelle für die Beschriftungen im Bild der Kurve steht auf 48 em statt 45,71 em, weil die Containerschrift 20 statt 21 px ist. Die 960 px aus Korrektur 1h/1i bleiben damit gleich. Vergleichsbilder vor und nach der Änderung aller 14 Abbildungen bei 1440 und 390 px wurden erstellt und durchgesehen. Die breiten Anordnungen (Kreislauf, Versorgungskarte, DEAR waagrecht, drei Rollen) bleiben bei 1440 px erhalten.

### Inhalt (`authoring/content/`)

Gestützt auf die Erlaubnis, Doppelspurigkeiten zu kürzen. Es sind keine Aussagen, keine Sicherheits- oder Akutformulierungen und keine Kontaktangaben betroffen.

- **23 Bereichsetiketten über den Seitentiteln entfernt** (`p.puk-web-eyebrow`, z. B. «Verstehen» über «Borderline verstehen und die eigenen Grenzen im Blick behalten»). Sie wiederholten Navigation und Brotkrumen.
- **109 Kicker über Abschnittstiteln entfernt** (`p.puk-longform__kicker`): 105 nummerierte («04 · Anspannung») auf 17 Seiten, weil sie die Einträge von «Auf dieser Seite» wiederholten. Dazu kamen auf der Startseite «Was brauchen Sie?», «Verstehen und finden» und «Beratung» sowie auf «Begriffe» «Begriffe von A bis Z», das den einzigen Eintrag der Seitennavigation wiederholte. Erhalten bleiben «Haltung» (Startseite) und «Auswahl nach Zielgruppe» (Bücher), weil sie etwas sagen, was der Titel nicht sagt.
- **«Unterstützung finden», Einleitung:** Der dritte Satz «Hier finden Sie Beratung, Austausch und Selbsthilfe für Angehörige in der Schweiz.» ist gestrichen. Er wiederholte den zweiten. Das war im Review vom 21.10.2026 als «Prüfbedarf Sprache» offen.

Der Suchindex wird aus den Fragmenten erzeugt. Die festgeschriebenen 216 Ersttreffer bleiben unverändert (Suchtest unten).

## Messung vorher und nachher

Chromium, Standardschrift, 1440 × 900 und 390 × 844 px, eigenes Messskript auf dem gebauten Export (vorher: `site/` aus `a7f3073`).

| Seite | Breite | Kopf | Seitentitel ab | erster Absatz ab | Seitenhöhe |
|---|---|---|---|---|---|
| Startseite | 1440 | 159 → 138 | 265 → 178 | 914 → 774 | 4108 → 3374 |
| Borderline verstehen | 1440 | 159 → 138 | 313 → 218 | 1050 → 752 | 11 467 → 9 660 |
| Grenzen setzen | 1440 | 159 → 138 | 313 → 218 | 1053 → 768 | 13 952 → 11 569 |
| Krisen begleiten | 1440 | 159 → 138 | 313 → 218 | 1432 → 1070 | 10 964 → 9 370 |
| Behandlung | 1440 | 159 → 138 | 313 → 218 | 1347 → 1060 | 13 920 → 12 161 |
| Startseite | 390 | 207 → 169 | 281 → 193 | 973 → 861 | 5949 → 5329 |
| Borderline verstehen | 390 | 207 → 169 | 329 → 233 | 1449 → 907 | 15 327 → 14 313 |
| Grenzen setzen | 390 | 207 → 169 | 357 → 257 | 1691 → 919 | 19 051 → 17 237 |
| Krisen begleiten | 390 | 207 → 169 | 357 → 257 | 2240 → 1605 | 14 688 → 13 449 |
| Diagnose | 390 | 207 → 169 | 357 → 257 | 1377 → 886 | 15 656 → 14 748 |

Bei «Krisen begleiten» zählt hier der erste Absatz *nach* dem Kasten «Wenn Sie sich jetzt Sorgen machen». Der erste Schritt dieses Kastens steht bei 375 px bei 409 px (vorher 494, Layouttest). Kopfhöhe aus dem Layouttest: 375 px 207 → 169, 320 px 208 → 190.

Schriftgrade vorher → nachher: Seitentitel 52 → 44 px (schmal 34 → 32), Abschnittstitel 57 → 30 px (schmal 32 → 25), Fliesstext 21 px Light → 20 px Regular (schmal 19 px Light → 19 px Regular).

## Ausgeführte Prüfungen (lokal, Node 22.22.0, Playwright 1.63.0 über `PLAYWRIGHT_MODULE`, Chromium)

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 23 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, unverändert) |
| `build.mjs --production --verify-site` | Parität 34 Dateien bytegleich |
| Selbsttest | 84/84 (die Ankerstellen der Mutationen im Kopf sind unverändert) |
| Suchtest | 216/216, 0 JS-Fehler |
| Sprach-/UI-Test | 73/73, 0 JS-Fehler |
| Audit-04-Layouttest | 230 Seitenzustände, 25 Bedienproben, 1 Abweichung wie vorher: `tension core exceeds 1800px` (begründete Ausnahme B2c; bei 375 px 2037 statt 1974 px, weil Regular breiter läuft als Light). Kein waagrechter Überlauf, 0 Titelumbrüche ohne Trennstelle, Menü mit Pfeiltaste und Escape, breite Navigation bei 1440 px, ohne Skript sechs Navigationslinks sichtbar |
| Bedienzustände (eigenes Skript) | Menü bei 1024 und 390 px offen: 6 Links, über die ganze Breite. «Auf dieser Seite» bei 390 px aufgeklappt: 11 Einträge. Bei 1440 px nach Sprung zu `#saetze` markiert: «So könnte es klingen». Ohne Skript bei 390 px: 6 Navigations- und 11 Seitenlinks sichtbar |
| Druck (Chromium, A4) | Seitennavigation und Direkteinstiege entfallen, Text einspaltig, Band «Haltung» ohne Fläche mit Rahmen |
| Kontraste (berechnet) | Text #222 auf Weiss 15,9:1, auf Blau-, Grau-, Gelbfläche ≥ 14,3:1, auf Rot 13,7:1; #646464 auf Weiss 5,9:1, auf den Flächen ≥ 5,3:1; Links Blau 100 auf Weiss 4,7:1, Blau 125 auf allen Flächen ≥ 5,7:1; Akutnummern #9E2814 auf Rot 6,5:1; Weiss auf Nachtblau 13,7:1, Blau 25 auf Nachtblau 10,5:1 |

**Nicht geprüft:** Screenreader (kein Screenreader verfügbar), Safari und Firefox, reale Geräte, Theme «kontrast» (von dieser Website nicht angeboten). Der Druck wurde nur mit Chromium ohne Hintergrundgrafiken geprüft. Darin erscheinen die gelben und roten Flächen nur als Linie oben.

## Abweichungen vom Vorschlag im Gestaltungssystem

| Vorschlag | Umgesetzt | Grund |
|---|---|---|
| Absenderleiste entfällt (E7) | Absenderin als leise Zeile im Kopf | Das Gate verlangt Absenderin und E-Mail sichtbar im Kopf jeder Seite (`sender`). |
| Fünf Bereiche, Kopf in einer Zeile ab 1100 px | sechs Bereiche wie bisher, Menüknopf bis 78 rem | Bereichsnamen sind Wortlaut (Schritt 3, E2). Mit den heutigen Namen passt die Zeile erst ab etwa 1240 px. |
| Abbildungen in der Lesespalte | Abbildungen bis 64 rem, Text bis 45 rem | So behalten die freigegebenen Modelle ihre breite Anordnung (Kreislauf ab 700 px, Versorgungskarte ab 880 px, DEAR ab 992 px). |
| Ansatzpunkt der Anspannungskurve nicht als blaue Vollfläche | unverändert blau | Die Abbildung ist freigegeben; ihre Markierung bleibt. |
| Etikett «Zu Ihrer Sicherheit» | ohne Etikett, gelbe Fläche | Ein neues Etikett wäre neuer Wortlaut (E8). Der Text beginnt mit «Bei Bedrohung oder Gewalt». |
| «Was Sie tun können» überall als Kasten | Kasten nur, wo das Markup ihn schon trägt («Borderline verstehen») | Das Umfassen der übrigen Stellen ist Schritt 2 (Markup in den Fragmenten, G7). |
| Kein Sprungknopf «Mit meiner Frage beginnen» | bleibt, als zweitrangiger Knopf | Struktur der Startseite ist Schritt 3. |

## Offen

- Schritt 2: «Was Sie tun können» und «So könnte es klingen» im Markup vereinheitlichen (G7). Herkunft und Grenzen der Abbildungen in die Vertiefung legen.
- Schritt 3: Bereiche und Navigationsnamen (E2), Startseite, Absenderzeile (E7), neue Bedienwörter (E8), wenn freigegeben.
- Screenreader-Prüfung. Nachprüfung durch eine Sitzung, die nicht gebaut hat, wie bei r4-41. Merge und Veröffentlichung nur auf Auftrag von Christa Egger.

## Bildschirmfotos

`vorher-nachher-<seite>-<breite>.png` für Startseite, «Borderline verstehen» und «Grenzen setzen» bei 1440 px (halbe Grösse) und 390 px, jeweils erster Bildschirm, links r4-42 und rechts r4-43.
