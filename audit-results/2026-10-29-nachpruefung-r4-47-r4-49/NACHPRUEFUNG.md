# Nachprüfung r4-47 bis r4-49 · 29.10.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger (Fachstelle Angehörigenarbeit, PUK Zürich), 29.10.2026: «Nachprüfung r4-47 bis r4-49 starten».
- **Gegenstand:** alle Änderungen zwischen `1f2788a` (r4-46, Gegenstand der Nachprüfung r4-43 bis r4-46) und `f300e7d` (r4-49, Merge PR #728).
  - Laut `git diff --stat 1f2788a f300e7d -- authoring` sind geändert: `content/grenzen.html`, `content/index.html`, `css/site.css`, `site.config.json`, `tools/contract.js`, `tools/layouttest.cjs` und `DARSTELLUNGSREGELN.md`.
  - Nicht geändert sind `interaktion.js`, `selftest.mjs`, `sprachtest.mjs`, `suchtest.mjs` und `suche-ersttreffer.tsv`.
  - Die Selbstberichte heissen `audit-results/2026-10-29-kontrast-r4-47/BERICHT.md`, `…/2026-10-29-n46-4-r4-48/BERICHT.md` und `…/2026-10-29-titelbild-r4-49/BERICHT.md`.
- **Nicht Gegenstand:** r4-50 (Prüfschritt 4, PR #733) und r4-51 (Direkteinstiege bei grosser Schrift, PR #735), die inzwischen auf `main` liegen (`7f6e5de`). Ebenfalls nicht Gegenstand sind die Pendenzen-Commits zwischen den Merges.
- **Wer prüft:** eine Claude-Sitzung, die an r4-47 bis r4-49 **nicht gebaut** hat. Dieselbe Sitzung hat die Nachprüfung r4-43 bis r4-46 erstellt. Deren Befunde N46-1 bis N46-7 sind der Anlass für r4-47 und r4-48. Diese Nachprüfung prüft also auch, ob die Befunde richtig behoben sind. Die Sitzung ändert keine Inhalte und keinen Code. Sie committet nur diesen Ordner.
- **Umgebung:** Node 22.22.0, Playwright über `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`, Chromium, axe-core 4.14.0 aus einem Ordner ausserhalb des Repositorys.
  - Die Tests laufen in einem eigenen Arbeitsbaum von `f300e7d` ausserhalb des Repositorys (`git worktree`). Dort entsteht `dist/site`.
  - `site/` im Repository wurde nicht beschrieben.
  - Zum Vergleich dienen `site/` aus `1f2788a` (r4-46) und aus `cd17c2e` (r4-48), beide per `git archive` entpackt.

Dies ist eine technische und redaktionelle Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Befunde

### N49-1 · wichtig · Auf dem Handy liegt das Sicherheitsanliegen der Startseite nicht mehr im ersten Bildschirm

- **Ort:**
  - `index.html`, Einstieg: Titelbild `.bl-titelbild`, unter 62 rem als Band, aus r4-49. Die Regeln stehen in `authoring/css/site.css` im Block «r4-49: Titelbild».
  - Zusätzlich der Kopf, der seit r4-47 22 px höher ist (N46-2).
- **Beleg:** Lage der ersten Einstiegskarte «Ich sorge mich um Sicherheit, Selbstgefährdung oder Gewalt.» (`.bl-paths-cards li:first-child`), Chromium, Startseite:

| Fenster | r4-46 (`1f2788a`) | r4-48 (`cd17c2e`) | r4-49 (`f300e7d`) |
|---|---|---|---|
| 390 × 844 | oben bei 761 px, **sichtbar** | 783 px, **sichtbar** | 902 px, **nicht sichtbar** |
| 768 × 1024 | 721–892 px, ganz sichtbar | 743–915 px, ganz sichtbar | 952–1123 px, nur angeschnitten |
| 375 × 667 | 822 px, nicht sichtbar | 844 px | 960 px |
| 320 × 568 | 967 px, nicht sichtbar | 989 px | 1091 px |
| 1440 × 900 | 690–806 px | 690–806 px | 690–806 px, unverändert |

  - Das Band ist bei 390 px 350 × 88 px gross und bei 768 px 707 × 177 px. Mit Abstand rückt es die Anliegen bei 390 px um 119 px nach unten, bei 768 px um 209 px.
  - Der Bericht r4-49 misst nur die Überschrift «Was beschäftigt Sie im Moment?» (744 px, «noch im ersten Bildschirm»), nicht die Sicherheitskarte darunter.
  - Fotos: `startseite-erster-bildschirm-390x844-vorher-r4-48.png` und `…-nachher-r4-49.png`. Vorher ist der gelbe Rand der Sicherheitskarte unten zu sehen, nachher an derselben Stelle das gelb-blaue Titelbild.
  - Auf `main` r4-51 (`7f6e5de`) ist es gleich: 390 × 844 902 px, 768 × 1024 895 px.
- **Folge:** Auf dem häufigsten Handyformat sah man bisher im ersten Bildschirm, dass es einen Einstieg für Sicherheitsfragen gibt. Jetzt steht dort ein Schmuckbild in Gelb. Gelb ist sonst die Farbe für Schutz. WCAG wird dadurch nicht verletzt. Betroffen ist aber der Grundsatz, dass das Anliegen zur Sicherheit zuerst kommt (Bericht r4-45: «Das Anliegen zur Sicherheit steht weiter zuerst»).
- **Vorschlag** (Gestaltungsentscheid für Christa Egger, nicht selbst behoben):
  - Das Band unter 62 rem weglassen oder erst nach den Anliegen zeigen.
  - Oder es so flach machen, dass die Sicherheitskarte bei 390 × 844 wieder anfängt.
  - In jedem Fall gehört eine Probe «Sicherheitskarte beginnt im ersten Bildschirm bei 390 × 844» in den Layouttest.

### N49-2 · gering · Freigegebener Satz nur auf einer der zwei genannten Seiten umgesetzt

- **Ort:** `gefahr.html`, gelber Sicherheitshinweis im Einstieg.
- **Beleg:**
  - Die Freigabe in `audit-results/2026-10-29-n46-4-r4-48/BERICHT.md:13` lautet: «Im Sicherheitshinweis auf «Grenzen setzen» und auf «Wenn es riskant oder bedrohlich wird»: «… Mehr dazu auf der Seite «Wenn es riskant oder bedrohlich wird».»»
  - Umgesetzt ist der Satz nur auf `grenzen.html`. Auf `gefahr.html` steht weiter «Mehr dazu im Abschnitt «Wenn Gewalt oder Bedrohung vorkommt».»
  - Der Bericht r4-48 nennt das offen als «Entscheid der bauenden Sitzung». Der freigegebene Satz würde dort auf die eigene Seite verweisen.
  - Der stehende Wortlaut ist durch die Freigabe von r4-46 gedeckt (`FREIGABE.md:15`, «Wortlaut wie auf «Grenzen setzen»»). Die beiden Hinweise sind seit r4-48 nicht mehr gleich.
- **Bewertung:** Die Abweichung ist sachlich richtig und offen dokumentiert. Sie weicht aber vom Wortlaut der Freigabe ab.
- **Vorschlag:** Christa Egger bestätigt den Entscheid kurz, und die Bestätigung wird in den Pendenzen vermerkt. Den Wortlaut nicht ändern.

## Bestätigt, mit Beleg

### Behebung der Befunde N46-1 bis N46-7

| Befund | Prüfung auf `f300e7d` | Ergebnis |
|---|---|---|
| N46-1 Kontrast Sicherheitslink | eigene Berechnung aller Text-/Hintergrundpaare, 24 Seiten × 390/1280 px; axe | `#2B4FE0` auf `#F8F5CB` **5,74 : 1** (4 Vorkommen, `grenzen`, `gefahr`). 144/117 im Akuthinweis bleiben `#9E2814` auf `#FBEAE7` 6,51 : 1 (24 Vorkommen, 6 Seiten). Kleinstes Paar der Website: 4,71 : 1 (Blau 100 auf Weiss) |
| N46-2 E-Mail-Link | Messung | 213 × 44 px bei 320, 390, 768, 1024, 1280 und 1440 px. Kopf 213 / 191 / 191 / 172 / 134 / 138 px, wie im Bericht r4-47. Kein Vorfahr mit `overflow` oder `clip-path`, der Fokusring ist vollständig (früherer Befund P708-B4) |
| N46-3 Fachfreigabe | Dokument | `audit-results/2026-10-29-e10-r4-46/FREIGABE.md` (PR #722) |
| N46-4 «im Abschnitt» | Wortvergleich | Auf `grenzen.html` steht wortgleich der freigegebene Satz: «Bei Bedrohung oder Gewalt geht Schutz vor jedem Gespräch. Mehr dazu auf der Seite «Wenn es riskant oder bedrohlich wird».» Der Link zeigt auf `gefahr.html#gewalt`. Das `aria-label` entfällt, der zugängliche Name ist gleich dem sichtbaren Text. «Mehr zu Geld im Abschnitt …» bleibt auf Entscheid «nein». Zu `gefahr.html` siehe N49-2 |
| N46-5 Gate `moved-anchor` | Regel `contract.js:403–411` und eigene Mutationen über `C.gate` | Blockiert: absolute URL als Ziel, Ziel ohne Anker, unveröffentlichte Zielseite (2 Treffer), gegenseitige Weiterleitung auf fehlende Anker (2 Treffer). Der Bestand ergibt 0 Treffer. Weiterleitung im Browser unverändert richtig: `grenzen.html#gewalt` → `gefahr.html#gewalt` mit Fokus, `#dear` bleibt, kein Ziel mit fremdem Ursprung oder `javascript:` |
| N46-6 Layouttest | `layouttest.cjs:7`, `:46` | vergleicht die sichtbaren Linktexte ohne Skript mit `['Verstehen','Im Alltag','Krisen','Familie','Für Sie']`. Das ist **verschärft** gegenüber r4-42 (feste Zahl 6) und r4-46 (Zahl aus der Konfiguration) |
| N46-7 «Weiter im Bereich» | Barrierefreiheitsbaum | `gefahr.html` hat jetzt `nav` «Weiter im Bereich «Krisen»». `showInSectionNav:false` bei `krise` ist entfernt (`site.config.json`). Andere Listen sind unverändert |

### Wortlaut

- Im sichtbaren Text aller 24 Fragmente (Tags und `&shy;` entfernt, Wortvergleich `1f2788a` → `f300e7d`) gibt es genau **eine** Änderung: im Sicherheitshinweis von `grenzen.html` «im Abschnitt «Wenn Gewalt oder Bedrohung vorkommt»» → «auf der Seite «Wenn es riskant oder bedrohlich wird»».
- Das Titelbild in `index.html` enthält keinen Text: 2 SVG mit `rect`, `path` und `circle`, ohne `title`, `desc` oder `text`. Die Unterzeile der Titelkarte ist nicht übernommen, wie berichtet.
- **Unberichtete Textänderungen:** keine.

### Sicherheit

- `data-responsibility-inline`, `tel:144` und `tel:117` sind unverändert, keine Fragmentänderung betrifft sie. Der Sprachtest prüft den Akuthinweis auf sechs Seiten, 73/73.
- Die Suche ist unverändert: `interaktion.js` und `suche-ersttreffer.tsv` sind nicht geändert, Suchtest 216/216.
- Keine sicherheitsrelevante Aussage ist neu in eine Vertiefung gewandert, denn kein `details` ist geändert.

### Tests und Gate

| Datei | Änderung | Bewertung |
|---|---|---|
| `contract.js` | `BUILD`, neue Gate-Regel `moved-anchor` (block), zwei neue Selbsttestfälle (84 → 86) | verschärft |
| `layouttest.cjs` | feste Namen statt Zahl | verschärft |
| `selftest.mjs`, `sprachtest.mjs`, `suchtest.mjs`, `suche-ersttreffer.tsv` | keine | – |

### Barrierefreiheit und Bedienung (auf `f300e7d`)

- **axe-core:** 24 Seiten × 390/1280 px = 48 Läufe, **0 Verstösse** (r4-46: 27). «Unvollständig» meldet axe nur `color-contrast` auf Flächen mit Hintergrundbild (behandlung, grenzen, kinder). Die eigene Berechnung deckt diese Stellen ab.
- **Titelbild:**
  - `div` und beide `svg` tragen `aria-hidden="true"`, die `svg` dazu `focusable="false"`.
  - 0 fokussierbare Elemente.
  - Der Barrierefreiheitsbaum des Einstiegs besteht nur aus Überschrift 1 und zwei Absätzen.
  - Bei erzwungenen Farben und im Druck gilt `display:none`.
  - Kein waagrechtes Scrollen bei 320 bis 1440 px: `scrollWidth` gleich Fensterbreite, auch bei 200 % Schrift bei 390 px.
  - Grössen wie berichtet: 480 × 288 px bei 1280 und 1440 px, Band 350 × 88 bei 390 px, 707 × 177 bei 768 px, 280 × 70 bei 320 px.
- **Barrierefreiheitsbaum** (Startseite, «Grenzen setzen», «Wenn es riskant oder bedrohlich wird», «Borderline verstehen», «Krisen begleiten»; 390 und 1280 px):
  - Je eine Überschrift 1, 0 Sprünge in der Überschriftenfolge.
  - 0 leere Links, 0 doppelte `id`, 0 `aria-label` ohne den sichtbaren Text.
  - `aria-current` wie in r4-46.
  - «Weiter im Bereich» steht jetzt auf allen vier Themenseiten.
- **Tastaturgang:**
  - «Grenzen setzen», 390 und 1280 px: Reihenfolge wie in r4-46. Der Sicherheitslink heisst jetzt «Wenn es riskant oder bedrohlich wird».
  - Menü bei 390 px: Enter öffnet, Pfeil nach unten bewegt, Escape schliesst und gibt den Fokus an «Menü» zurück.
  - «Auf dieser Seite · 9 Abschnitte»: öffnet mit Enter.
  - Fokusring an allen Tabstopps.
- **Bedienziele:**
  - Kopf ist überall ≥ 44 px, der E-Mail-Link eingeschlossen (r4-46: 22 px).
  - Brotkrumen 24 px und «Auf dieser Seite» bei 1280 px 36 px. Das ist unverändert gegenüber r4-46, erfüllt WCAG 2.5.8 und liegt unter dem 44-px-Ziel.

### Tests selbst ausgeführt (Arbeitsbaum `f300e7d`)

| Befehl | Ergebnis |
|---|---|
| `node authoring/tools/build.mjs --production` | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`) · Ziel dist/site, Exit 0 |
| `node authoring/tools/build.mjs --production --verify-site` | PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/, Exit 0 |
| `node authoring/tools/selftest.mjs` | Selbsttest: 86/86 bestanden, Exit 0 |
| `node authoring/tools/suchtest.mjs dist/site` | 216 von 216 Erwartungen · JS-Fehler 0, Exit 0 |
| `node authoring/tools/sprachtest.mjs` | 73 Prüfungen bestanden · JS-Fehler 0, Exit 0 |
| `node authoring/tools/layouttest.cjs` | 240 Seitenzustände, 25 Bedienproben, 1 Abweichung «tension core exceeds 1800px» (bekannte Ausnahme B2c), Exit 1 wie seit r4-42 |

Die Kennzahlen der drei Berichte stimmen mit den Messungen überein:

- Kontrast 5,74 : 1.
- Kopf 213 / 191 / 134 px.
- Selbsttest 86.
- «Was beschäftigt Sie im Moment?» bei 744 / 805 / 544 px.
- Band 88 / 177 / 70 px.

## Nicht prüfbar oder nicht geprüft

- **Echte Screenreader:** im Container nicht vorhanden. Die Anleitung für VoiceOver auf dem iPhone steht in `audit-results/2026-10-29-nachpruefung-r4-43-r4-46/NACHPRUEFUNG.md`. Schritt 2 dort nennt jetzt «Mehr dazu auf der Seite «Wenn es riskant oder bedrohlich wird»» statt des alten Linknamens.
- **Safari, Firefox, reale Geräte, Touch.**
- **Fachliche Passung der Kurve als Schmuck:** im Bericht r4-49 als offen vermerkt, Sache der Fachstelle.
- **Profilkonformität des Titelbilds:** nach Pendenzen durch Profil 2026.10.10 gedeckt (`puk-website-profil#141`). Das Profil selbst habe ich nicht nachgeprüft.
- **r4-50 und r4-51:** nicht Gegenstand. Nur N49-1 habe ich zusätzlich auf r4-51 gemessen.
- **Live-Site:** keine Abfrage.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.**

Die Befunde N46-1, N46-2 und N46-4 bis N46-7 sind richtig behoben, N46-3 ist mit der Freigabe erledigt. Gate und Layouttest sind schärfer geworden. Wortlaut, Sicherheitslogik und Suche sind bis auf den freigegebenen Satz unverändert. Neu ist N49-1: Das Titelbild schiebt auf dem Handy die Sicherheitskarte der Startseite aus dem ersten Bildschirm. Das braucht einen Gestaltungsentscheid. N49-2 braucht nur eine kurze Bestätigung.
