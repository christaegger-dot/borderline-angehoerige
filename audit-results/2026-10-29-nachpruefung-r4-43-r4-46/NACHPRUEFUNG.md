# Nachprüfung r4-43 bis r4-46 · 29.10.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger (Fachstelle Angehörigenarbeit, PUK Zürich), 29.10.2026: unabhängige Nachprüfung der vier Stände r4-43 bis r4-46 nach dem PUK-Website-Profil.
- **Gegenstand:** alle Änderungen zwischen `a7f3073` (r4-42) und `main` = `1f2788a` (r4-46, Merge PR #720). `git diff --stat a7f3073 1f2788a`: 80 Dateien, davon 24 Fragmente in `authoring/content/` (neu: `gefahr.html`), `site.css`, `interaktion.js`, `site.config.json`, `suche-ersttreffer.tsv`, `contract.js`, `layouttest.cjs`, `sprachtest.mjs` und `suchtest.mjs`. `selftest.mjs` ist **nicht** geändert.
- **Wer prüft:** eine Claude-Sitzung, die an r4-43 bis r4-46 **nicht gebaut** hat. Die Sitzung ändert keine Inhalte und keinen Code. Sie hat nur diese Datei und zwei Bildschirmfotos in diesem Ordner angelegt. `site/` wurde nicht beschrieben (`git status` vor dem Commit: nur dieser Ordner neu).
- **Grundlage:** `AGENTS.md`, `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (Abschnitte r4-43 bis r4-46), die vier Selbstberichte unter `audit-results/2026-10-29-*/BERICHT.md`.
- **Umgebung:** Node 22.22.0, Playwright über `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`, Chromium. axe-core 4.14.0 liegt in einem Ordner ausserhalb des Repositorys (Sitzungs-Scratchpad) und wird per `page.addScriptTag` geladen. Geprüft wird der Export `dist/site` (paritätsgleich mit `site/`). Zum Vergleich dient `site/` aus `a7f3073` (per `git archive` ausserhalb des Repositorys).

Dies ist eine technische und redaktionelle Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Befunde

### N46-1 · wichtig · Link im gelben Sicherheitshinweis unter 4,5:1

- **Ort:** `grenzen.html` und `gefahr.html`, Einstieg, «Zu Ihrer Sicherheit», Link «Wenn Gewalt oder Bedrohung vorkommt». Ursache `authoring/css/site.css:685`: `.puk-longform__hero a.puk-link--inline{color:var(--blau)}` (Spezifität 0,2,1). Diese Regel schlägt `site.css:833`: `.puk-longform__boundary a{color:var(--blau-125)}` (0,1,1).
- **Beleg:**
  - axe-core, `color-contrast` (serious) auf `grenzen.html` und `gefahr.html` bei 390 und 1280 px: «insufficient color contrast of 4.24 (foreground color: #3c64ff, background color: #f8f5cb, font size: 14.3pt (19px)».
  - Eigene Berechnung aller sichtbaren Text-/Hintergrundpaare auf 24 Seiten bei 390 und 1280 px: einziges Paar unter 4,5:1 ist `#3C64FF auf #F8F5CB = 4,24:1` (4 Vorkommen, 2 Seiten).
  - Rückschritt: In `a7f3073` stand `.puk-longform__hero a.puk-link--inline{color:var(--puk-blue-125)}` (alte `site.css:1777`). axe meldete auf allen 23 Seiten von r4-42 bei beiden Breiten 0 Verstösse. Seit r4-43 (`abf947d`) steht die Regel mit `--blau`.
  - Der Bericht r4-43 schreibt «Blau 125 auf allen Flächen ≥ 5,7:1». Für dieses Paar trifft das nicht zu. Das Profil verlangt Blau 125 auf jeder Fläche ausser Weiss (`--text-link-on-tint`, `site.css:125`).
  - Foto: `befund-sicherheitslink-kontrast-390.png`.
- **Folge:** WCAG 2.2 SC 1.4.3 (AA) ist nicht erfüllt, ausgerechnet beim Link, der auf «Grenzen setzen» zum Schutzabschnitt führt. Der Link ist unterstrichen und lesbar. Die Abweichung ist klein, aber eindeutig.
- **Vorschlag:** `site.css:685` auf `.puk-longform__hero > p a.puk-link--inline` begrenzen, oder `.puk-longform__boundary a.puk-link--inline{color:var(--blau-125)}` ergänzen. Danach axe auf beiden Seiten wiederholen. Den Bericht r4-43 in der Kontrastzeile berichtigen.

### N46-2 · wichtig · E-Mail-Link der Absenderin zu klein, auf dem Handy ohne Abstand

- **Ort:** Kopf jeder Seite, `.puk-site-sender a` (`site.css:643` und `site.css:647`), bei 390 px direkt über «Kurz und klar · Nachschlagen · Suchen» (Renderer `contract.js`, `.puk-site-subbar`).
- **Beleg:**
  - axe-core `target-size` (serious) auf 23 von 24 Seiten bei 390 px (alle ausser 404): «Target has insufficient size (213.5px by 21.8px, should be at least 24px by 24px) / insufficient space to its closest neighbour».
  - Messung bei 390 px: E-Mail-Link y = 98, Höhe 21,8 px. «Kurz und klar» beginnt bei y = 120. Damit fehlt der 24-px-Abstand.
  - Bei 1280 px ist der Link gleich klein, steht aber frei. Dort meldet axe keinen Verstoss.
  - r4-42 (`a7f3073`): Der Link war 199,2 × 44 px. Das ist der dokumentierte Stand in `authoring/PRUEFBERICHT.md:1068` («Absender-E-Mail 199,2 × 44»).
  - Foto: `befund-absender-email-390.png`.
- **Folge:** WCAG 2.2 SC 2.5.8 (AA) ist auf dem Handy nicht sicher erfüllt. Die Ausnahme «im Satz» lässt sich für eine Kopfzeile kaum geltend machen, weil der Link direkt über drei Bedienzielen steht. Das ist ein Rückschritt gegenüber r4-42 und gegenüber dem früher entschiedenen 44-px-Ziel. Es betrifft den wichtigsten Kontaktweg.
- **Vorschlag:** den Link mindestens 24 px, besser 44 px hoch machen (`min-height`/`padding-block` mit `display:inline-flex`), oder zwischen Absenderzeile und Direkteinstiegen mindestens 24 px Abstand lassen. Dabei den Fokusring nicht beschneiden (früherer Befund P708-B4).

### N46-3 · wichtig · Neuer und angepasster Wortlaut, auch mit Suizidbezug, ohne dokumentierte Fachfreigabe veröffentlicht

- **Ort:** r4-46.
  - `diagnose.html`, Kasten «Das Wichtigste» › «Wenn vieles noch unklar ist»
  - `verstehen.html`, Kasten «Wenn ein Moment gerade schwierig ist»
  - `gefahr.html`, Einstieg
  - Titel der neuen Seite und der Kästen
- **Beleg:**
  - Bericht r4-46: «Die neuen Titel und die angepassten Sätze … brauchen die Fachfreigabe von Christa Egger.»
  - Pendenzen r4-46: «Eine ausdrückliche Fachfreigabe des neuen Wortlauts ist nicht dokumentiert; der Merge erfolgte durch Christa Egger.»
  - Mein Satzvergleich der fünf neuen Kästen mit dem Bestand derselben Seite in `a7f3073` ergibt 26 Satzteile. Davon stehen 19 wörtlich im Bestand, 7 weichen ab. Das stimmt mit dem Bericht überein.
  - Darunter ist ein gekürzter Satz mit Suizidbezug: «Suizidale Aussagen oder Hinweise auf konkrete Pläne brauchen eine professionelle Einschätzung.» Im Bestand folgt «, unabhängig davon, welcher Diagnose man sie zuordnet».
  - Neu sichtbar ist auch «Bei Bedrohung oder Gewalt hat Ihre Sicherheit Vorrang.» (Einstieg `gefahr.html`). Bisher stand der Satz nur im Suchausschnitt.
  - Der Satz im Bericht «Akut- und Sicherheitswortlaut ist nicht neu formuliert» stimmt für den Akuthinweis (Platzhalter, siehe Bestätigungen). Für die Kurzfassung des Suizidsatzes stimmt er nur eingeschränkt.
- **Folge:** Der Wortlaut ist live. Die vorgesehene Fachfreigabe fehlt in der Dokumentation.
- **Vorschlag:** Christa Egger gibt die Liste «Zur Fachfreigabe» im Bericht r4-46 ausdrücklich frei oder korrigiert sie, und die Freigabe wird in den Pendenzen vermerkt. Beim Suizidsatz im Kasten prüft sie, ob die Kürzung fachlich trägt. Der Satz verlinkt auf `#suizidalitaet`, wo der vollständige Satz und der Akuthinweis stehen.

### N46-4 · gering · «Grenzen setzen» sagt «im Abschnitt», der Abschnitt liegt jetzt auf einer anderen Seite

- **Ort:** `authoring/content/grenzen.html:1`, Sicherheitshinweis: «Mehr dazu im Abschnitt «Wenn Gewalt oder Bedrohung vorkommt».» In «Grenzen in verschiedenen Angehörigenrollen» steht: «Mehr zu Geld im Abschnitt «Wenn Entscheidungen oder Verhalten riskant werden».»
- **Beleg:** Beide Links führen auf `gefahr.html#…`. Nur das `aria-label` nennt die andere Seite («…, auf der Seite Wenn es riskant oder bedrohlich wird»). Sichtbar steht weiter «im Abschnitt». Auf `gefahr.html` ist derselbe Wortlaut richtig, weil der Abschnitt dort auf der Seite steht.
- **Folge:** Sehende Nutzerinnen und Nutzer erwarten einen Sprung auf derselben Seite. WCAG 2.5.3 ist erfüllt, weil das Label mit dem sichtbaren Text beginnt.
- **Vorschlag:** Sichtbar «auf der Seite «Wenn es riskant oder bedrohlich wird»» schreiben. Das ist neuer Wortlaut im Sicherheitshinweis und braucht die Freigabe von Christa Egger. Der offene Entscheid zu 144/117 auf «Grenzen setzen» bleibt davon unberührt (Pendenzen r4-46).

### N46-5 · gering · Weiterleitung alter Sprungziele ohne Prüfung im Gate

- **Ort:** `authoring/site.config.json:833` (`movedAnchors`), `contract.js:236` (`data-moved-anchors`), `interaktion.js:583` und `interaktion.js:600` (`movedAnchor()`).
- **Beleg:**
  - `grep -rn movedAnchors authoring/tools` findet nur die Ausgabe in `contract.js:236`.
  - Keine Gate-Regel prüft, dass die Ziele bestehen und dem Muster `^[a-z0-9-]+\.html#[a-z0-9-]+$` entsprechen.
  - Keine Gate-Regel prüft, dass keine Gegenrichtung besteht. Zwei Seiten, die nicht vorhandene Anker gegenseitig aufeinander abbilden, würden einander endlos weiterleiten.
- **Heute:** korrekt (siehe Bestätigungen). Nur `grenzen.html` trägt das Attribut. Die Ziele bestehen.
- **Vorschlag:** Gate-Regel ergänzen:
  - Ziel ist eine veröffentlichte Seite mit dieser `id`.
  - Das Ziel erfüllt das Muster.
  - Die Zielseite hat für denselben Anker keine eigene Weiterleitung.
  - Der Quellanker ist auf der Quellseite nicht mehr vorhanden.

### N46-6 · gering · Layouttest zählt die Navigationslinks aus der Konfiguration statt fest

- **Ort:** `authoring/tools/layouttest.cjs:7`: `navCount=cfgPages.filter(p=>p.status==='published'&&p.navLabel).length`. Vorher stand dort die feste Zahl `===6`.
- **Beleg:** Diff `a7f3073..1f2788a`. Die Probe heisst jetzt «no JS all navigation links visible».
- **Bewertung:** Die Prüfabsicht bleibt gleich, die Probe ist aber leicht **abgeschwächt**. Sie ist jetzt selbstbezüglich: Fällt ein `navLabel` versehentlich weg, passt sich die Erwartung an und die Probe bleibt grün.
- **Vorschlag:** die Erwartung fest auf die fünf freigegebenen Namen setzen («Verstehen», «Im Alltag», «Krisen», «Familie», «Für Sie») und die Linktexte vergleichen.

### N46-7 · gering · «Wenn es riskant oder bedrohlich wird» hat keine Liste «Weiter im Bereich»

- **Ort:** `dist/site/gefahr.html`. `grep -c puk-site-related` ergibt 0. Ursache ist `showInSectionNav: false` bei `krise`, schon in `a7f3073`.
- **Beleg:** Barrierefreiheitsbaum `gefahr`: Landmarks `header | nav[Hauptnavigation] | nav[Direkteinstiege] | nav[Brotkrümelnavigation] | main | nav[Weg durch die Seite] | footer | …`, ohne «Weiter im Bereich». `krise.html` zeigt «Weiter im Bereich «Krisen»» mit `gefahr.html`. Der Bericht r4-46 («Damit hat dieser Bereich wieder eine Liste») stimmt also nur für «Krisen begleiten».
- **Folge:** Der Rückweg zu «Krisen begleiten» geht nur über die Brotkrumen und den Kopf.
- **Vorschlag:** Entscheiden, ob `krise` in der Bereichsliste erscheinen soll. Die Brotkrumen genügen, wenn das so gewollt ist. Dann den Bericht präzisieren.

## Bestätigt, mit Beleg

### 1 · Wortlaut

Methode: Für jedes Fragment in `a7f3073` und `1f2788a` werden Kommentare, Tags und `&shy;` entfernt. Danach folgt ein Wortvergleich mit `difflib`. Skripte `text.py` und `wdiff.py` liegen im Sitzungs-Scratchpad.

- **Bereichsetiketten:** 23 `p.puk-web-eyebrow` vorher, 0 nachher. Das stimmt mit dem Bericht r4-43 überein.
- **Kicker:** 111 vorher, 2 nachher («Haltung», «Auswahl nach Zielgruppe»). Entfernt sind 105 nummerierte auf 17 Seiten und 4 nicht nummerierte: «Begriffe von A bis Z», «Was brauchen Sie?», «Verstehen und finden», «Beratung». Zusammen 109, wie im Bericht.
- **«Was Sie tun können»:**
  - 37 Kästen `div.bl-tun` mit Etikett, gleich viele Vorkommen des Texts wie vorher. Je Seite: Beziehungen 8, Grenzen, Kommunizieren, Rolle und Auf sich achten je 4, Genesung, Jugendliche und Verstehen je 3, Kinder 2, Behandlung und Diagnose je 1.
  - Im Wortvergleich ist die einzige Änderung `können:` → `können`.
- **Gestrichener Satz:** In «Unterstützung finden» fehlt «Hier finden Sie Beratung, Austausch und Selbsthilfe für Angehörige in der Schweiz.» (berichtet).
- **Startseite:**
  - «Mit meiner Frage beginnen» ist entfernt.
  - «Wenig Zeit oder Kraft? Das Wichtigste kurz und klar lesen.» ist wortgleich hinter die Anliegen verschoben.
  - Beides ist berichtet.
- **Etiketten im Markup:** «Zu Ihrer Sicherheit» (`grenzen`, `fragen`, `gefahr`) und «Das Wichtigste» (sechs Seiten aus r4-45, fünf aus r4-46) stehen im Markup, nicht als CSS-Inhalt (berichtet).
- **Schutzsätze der Abbildungen:**
  - Anspannungskurve: «Ob Gefahr besteht, lässt sich aus der Stelle auf der Kurve nicht ableiten.» steht sichtbar (`.bl-fig-schutz`, im Browser gelesen). In «Grenzen des Bildes» ist «Person; ob Gefahr …» zu «Person.» geworden; nur die Satzzeichen ändern sich.
  - Kinder: «Die Darstellung ersetzt keinen Schutzplan …» steht wortgleich vor der Vertiefung.
- **Quellen:**
  - `quellen.html`: 6 × «Grenzen setzen» → «Wenn es riskant oder bedrohlich wird», 1 × ergänzt (NICE CG78).
  - `grenzen.html`: 6 Angaben entfernt, bei NICE die Verwendung «Wenn Gewalt …» gestrichen. Vorher 13, nachher 7.
- **Verschobene Abschnitte:**
  - `#riskant` und `#gewalt` in `gefahr.html` sind **bytegleich** mit `grenzen.html` in r4-45 (`352c716`): 3017 bzw. 2947 Zeichen, `==` wahr.
  - Gegenüber `a7f3073` fehlt je nur der Kicker («10 · Riskante Entscheidungen», «11 · Schutz»), Teil der 109.
- **Nicht berichtete Textänderungen:** keine gefunden. Jede Abweichung im Wortvergleich fällt unter eine der oben genannten, berichteten Gruppen oder unter die verschobenen Abschnitte und die neuen Kästen aus r4-46.
- **Kopf:** Die geänderten Bedienwörter («Im Alltag», «Krisen», «Familie», «Für Sie», «Nachschlagen», «Suchen», «Weiter im Bereich «…»», «Auf dieser Seite · N Abschnitte») entsprechen den Berichten r4-45. Fusszeile, `<title>` und `meta description` von `grenzen.html` sind unverändert.
- **Verglichene Aussagen:** 37, alle mit dem Bestand abgeglichen.
  - 26 Satzteile in den fünf neuen Kästen: 19 wörtlich, 7 abweichend, wie im Bericht. Beispiele für wörtliche: «Sie dürfen eine Grenze setzen, bevor Sie überlastet sind.», «Schmerz kann Verhalten erklären, macht Einschüchterung, Gewalt oder andere Übergriffe aber nicht in Ordnung.», «Studienzahlen beschreiben Gruppen und keine persönliche Prognose.»
  - Die zwei Einleitungssätze von `gefahr.html`: der erste wörtlich aus `#riskant`, der zweite aus dem Suchausschnitt.
  - Die zwei Schutzsätze.
  - Der gestrichene Satz in «Unterstützung finden».
  - Die sieben Quellenzeilen auf `gefahr.html`: wörtlich wie in `grenzen.html` von `a7f3073`.

### 2 · Sicherheit

- **Platzhalter `<p data-responsibility-inline></p>`:**

| Seite › Abschnitt | `a7f3073` | `1f2788a` |
|---|---|---|
| Diagnose › `#suizidalitaet` | ja | ja |
| Grenzen setzen › `#gewalt` | ja | – (Abschnitt umgezogen) |
| Wenn es riskant oder bedrohlich wird › `#gewalt` | – | ja |
| Kinder › `#eskalation` | ja | ja |
| Zugewandt sprechen › `#worte` | ja | ja |
| Krisen begleiten › Einstieg («Wenn Sie sich jetzt Sorgen machen») | ja | ja |
| Kurz und klar › `#jetzt` | ja | ja |

  Kein Platzhalter steht in einer Vertiefung (`details_open=0` an allen Stellen). Gebaut tragen genau diese sechs Seiten `tel:144` und `tel:117`. Vorher waren es dieselben mit `grenzen` statt `gefahr`. Der Sprachtest prüft den Akuthinweis auf `gefahr` (`sprachtest.mjs:65`).
- **Suche:**
  - `interaktion.js:252`: `safetyTargets.gewalt` `grenzen.html#gewalt` → `gefahr.html#gewalt`. Die drei übrigen Ziele sind unverändert.
  - Weitere Änderungen in `interaktion.js` sind nur `tocSpy` (Anzeige `aria-current`) und `movedAnchor`.
  - Wörter, Gewichte und Rangfolge der Suche sind **unverändert**. Der Diff zeigt in der Suchlogik keine weitere Zeile.
- **`suche-ersttreffer.tsv`:**
  - 82 Zeilen geändert, 225 Zeilen vorher und nachher.
  - Jede geänderte Zeile ist nach Ersetzen von `grenzen.html#gewalt` → `gefahr.html#gewalt` (76) und `grenzen.html#riskant` → `gefahr.html#riskant` (6) gleich der alten.
  - Andere Änderungen: 0. Die Aussage des Berichts trifft zu.
- **Tote Links:** In `dist/site` wurden 1047 interne Links samt Sprungzielen geprüft, keiner ist tot. Die 13 wurzelrelativen Links der 404-Seite zeigen auf bestehende Dateien. Kein Link zeigt mehr auf `grenzen.html#gewalt` oder `#riskant`. Vorher waren es 9 in Fragmenten plus 2 in `suche.html`.
- **Weiterleitung alter Sprungziele** (Playwright, 1280 px):
  - `grenzen.html#gewalt` → `gefahr.html#gewalt` mit Fokus auf `#gewalt`. Für `#riskant` gilt dasselbe.
  - `#dear` und `#rollen` bleiben auf «Grenzen setzen».
  - Beim Hashwechsel auf der Seite wird ebenfalls weitergeleitet.
  - **Keine offene Weiterleitung:** `#__proto__`, `#constructor`, `#toString`, `#%`, `#%E2%80%A8`, `#..%2F..%2Fevil` und `#https:%2F%2Fevil.example` bleiben auf `grenzen.html`. Der Hash dient nur als Schlüssel.
  - Ein manipuliertes Attribut mit `https://evil.example/…`, `//evil.example/…` oder `javascript:` wird vom Muster abgewiesen (1 Navigation, keine Weiterleitung).
  - **Keine Schleife:** Eine Selbstabbildung `grenzen.html#x` endet nach 2 Navigationen. `gefahr.html` trägt kein `data-moved-anchors`.
  - Ohne Skript bleibt `grenzen.html#gewalt` auf der Seite. Der Sicherheitshinweis zuoberst ist sichtbar und verlinkt auf `gefahr.html#gewalt`.
- **Sicherheitsrelevante Sätze nur in einer Vertiefung:** Ich habe in allen `details` beider Stände nach Sätzen mit Gefahr, Sicherheit, Schutz, Notfall, 144, 117, Suizid, Gewalt, Polizei, Kindeswohl, Bedrohung, Selbstverletzung und akut gesucht. Neu hinzugekommen sind nur die Zeilen «Verwendet auf: …» der Quellenseite. **Kein** Schutzsatz ist neu in eine Vertiefung gewandert. Die zwei Schutzsätze der Abbildungen stehen seit r4-45 wieder sichtbar.

### 3 · Tests und Gate

| Datei | Änderung | Bewertung |
|---|---|---|
| `selftest.mjs` | keine | – |
| `contract.js`, Gate-Regeln | keine Regel geändert. Geändert sind `BUILD`, der Renderer (`tocLayout`, Kopf mit `puk-site-subbar`, `aria-current="location"` für den Direkteinstieg, Überschrift «Weiter im Bereich «…»») und das Attribut `data-moved-anchors` | gleichwertig. Neue Funktion ohne Prüfregel, siehe N46-5 |
| `sprachtest.mjs:65` | `grenzen` → `gefahr` bei der Prüfung des Akuthinweises | gleichwertig, folgt dem umgezogenen Hinweis |
| `suchtest.mjs:42` | Sicherheitsmenge `grenzen.html#gewalt` → `gefahr.html#gewalt` | gleichwertig |
| `layouttest.cjs:7` und `:46` | feste 6 → Zahl aus der Konfiguration | leicht abgeschwächt, siehe N46-6 |
| `suche-ersttreffer.tsv` | nur Adressen (82) | gleichwertig |

### 4 · Bedienung und Barrierefreiheit

- **axe-core 4.14.0**, Regeln wcag2a/aa, wcag21a/aa, wcag22aa und best-practice. Geprüft sind 24 Seiten × 390 und 1280 px = 48 Läufe.
  - Ergebnis: 27 Verstösse. Davon sind 23 `target-size` (E-Mail-Link, N46-2, nur bei 390 px) und 4 `color-contrast` (N46-1, `grenzen` und `gefahr` je bei beiden Breiten).
  - Sonst keine Verstösse. Insbesondere fehlen landmark-, heading-, aria-, name- und duplicate-id-Meldungen.
  - Vergleich r4-42: 46 Läufe, 0 Verstösse.
  - «Unvollständig» meldet axe nur `color-contrast` auf Flächen mit Hintergrundbild oder -verlauf (behandlung, kinder, grenzen). Die eigene Berechnung unten deckt die Textpaare ab.
- **Barrierefreiheitsbaum** (`locator('body').ariaSnapshot()` und DOM-Auswertung, 390 und 1280 px) für Startseite, «Grenzen setzen», «Wenn es riskant oder bedrohlich wird», «Borderline verstehen» und «Krisen begleiten»:
  - **Landmarks:**
    - Alle Seiten: `header`, `nav «Hauptnavigation»`, `nav «Direkteinstiege»`, `main`, `footer` mit `nav «Informationen zur Website»`.
    - Themenseiten zusätzlich: `nav «Brotkrümelnavigation»`, `nav «Weg durch die Seite»`, `nav` mit Titel «Weiter im Bereich «…»» (ausser `gefahr`, N46-7).
  - **Überschriften:** genau eine `h1`, danach `h2`/`h3` ohne Sprung (0 Sprünge auf allen fünf Seiten). Ein Beispiel für «Grenzen setzen»: h1 «Grenzen setzen, das eigene Leben schützen», h2 «Wenn Sie nur die nächsten Schritte brauchen», h2 «Woran Sie merken, …», …, h2 «DEAR: …» mit vier h3, h2 «Quellen zu dieser Seite», h2 «Weiter im Bereich «Im Alltag»».
  - **Linknamen:**
    - 0 leere Links.
    - 0 `aria-label`, die den sichtbaren Text nicht enthalten.
    - 0 doppelte `id`.
    - Der Sicherheitslink auf «Grenzen setzen» heisst «Wenn Gewalt oder Bedrohung vorkommt, auf der Seite Wenn es riskant oder bedrohlich wird».
  - **Aufklapper:**
    - «Menü» `aria-expanded=false`, sichtbar nur unter 800 px.
    - «Auf dieser Seite · 9 Abschnitte» (grenzen), «· 2» (gefahr), «· 7» (verstehen) und «· 8» (krise) stehen auf `false`, sichtbar nur bei 390 px. Bei 1280 px steht die Liste als Spalte, der Knopf ist verborgen.
    - «Quellen zu dieser Seite» steht auf `false`.
    - `details` geschlossen: «Herkunft des Modells», «Mehr zu den vier Phasen», «Grenzen des Bildes», «Was den Blick färben kann – …».
  - **`aria-current`:**
    - Hauptnavigation `location` auf «Im Alltag» (grenzen) und «Krisen» (gefahr), `page` auf «Verstehen» (verstehen) und «Krisen» (krise).
    - Brotkrumen `page`.
    - Die Startseite hat keines.
    - `tocSpy` bei 1280 px nach `verstehen.html#anspannung`: `aria-current="true"` auf «Anspannung».
- **Tastaturgang:**
  - **«Grenzen setzen», 390 px:** Zum Hauptinhalt → Logo → Menü → E-Mail → Kurz und klar → Nachschlagen → Suchen → Übersicht → Im Alltag → Sicherheitslink → «Auf dieser Seite · 9 Abschnitte» → Inhalt.
  - **Dasselbe bei 1280 px:** Die fünf Bereiche folgen auf das Logo, die Liste «Auf dieser Seite» folgt auf den Einstieg. Die Reihenfolge entspricht der Lesefolge (Einstieg, Sicherheitshinweis, «Das Wichtigste», Seitennavigation, erster Abschnitt). An allen Tabstopps ist ein Fokusring vorhanden.
  - **Menü bei 390 px:**
    - Enter: `aria-expanded=true`, 5 Links sichtbar.
    - Tab: «Verstehen». Pfeil nach unten: «Im Alltag».
    - Escape: zu, Fokus zurück auf «Menü», 0 Links sichtbar.
  - **«Auf dieser Seite» bei 390 px:**
    - Enter: offen, 9 Einträge sichtbar.
    - Tab: «Erkennen», 350 × 44 px. Enter springt nach `#erkennen`, der Fokus liegt auf dem Abschnitt.
    - Escape schliesst die Liste nicht. Das Muster «Disclosure» verlangt das nicht, darum ist das kein Befund.
  - **Vertiefung** «Grenzen des Bildes» (verstehen, 390 px): `summary` 326 × 44 px. Enter öffnet, Leertaste schliesst. Inhalt: «Die Kurve zeigt einen Verlauf beispielhaft. …»
- **Kontraste der Rollenfarben:** Ich habe jedes sichtbare Textstück auf 24 Seiten × 2 Breiten gegen den tatsächlichen Hintergrund berechnet (WCAG-Formel, `details` geöffnet). Verhältnisse:
  - **Text #222222:** 15,91 auf Weiss, 14,87 auf Blau #F5F7FF, 14,85 auf Grau #F7F7F7, 14,37 auf #F0F3FF, 14,33 auf Gelb #F8F5CB, 13,66 auf Rot #FBEAE7.
  - **Leise #646464:** 5,92 auf Weiss, 5,53 auf Blau, 5,52 auf Grau, 5,35 auf #F0F3FF, 5,33 auf Gelb.
  - **Blau 125 #2B4FE0:** 6,37 auf Weiss, 5,95 auf Blau, 5,94 auf Grau.
  - **Blau 100 #3C64FF:** 4,71 auf Weiss (870 Vorkommen, Links). Weiss auf Blau 100 (Hauptknopf): 4,71.
  - **Akutnummern** #9E2814 auf Rot: 6,51.
  - **Nachtblau #182866:** Weiss 13,69, #D8E0FF («Haltung») 10,45.
  - **Einzige Unterschreitung:** #3C64FF auf Gelb 4,24 (N46-1).
- **Bedienziele** (alle sichtbaren `a`, `button`, `summary`, `input` ausser Links im Fliesstext; 24 Seiten, 390 und 1280 px):
  - Kopf ≥ 44 px, ausser dem E-Mail-Link 213 × 22 (N46-2).
  - Menüknopf 86 × 44.
  - Direkteinstiege 59–110 × 44.
  - Hauptnavigation bei 1280 px 49–81 × 44, im offenen Menü 350 × 44.
  - «Weiter im Bereich» und Fusszeile ≥ 44.
  - Brotkrumen 24 px hoch, vorher 23. Das erfüllt WCAG 2.5.8, liegt aber unter dem 44-px-Ziel.
  - «Auf dieser Seite» bei 1280 px 240 × 36, bei 390 px 350 × 44.
  - Einstiegskarten der Startseite: Der Linktext ist 30 px hoch, über `a::after{inset:0}` ist aber die ganze Karte klickbar (`site.css:898`).

### 5 · Tests selbst ausgeführt (`1f2788a`)

| Befehl | Ergebnis |
|---|---|
| `node authoring/tools/build.mjs --production` | «Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel dist/site», Exit 0. Alle 20 Hinweise sind `crisis-number-check` |
| `node authoring/tools/build.mjs --production --verify-site` | «PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/», Exit 0 |
| `node authoring/tools/selftest.mjs` | «Selbsttest: 84/84 bestanden», Exit 0 |
| `node authoring/tools/suchtest.mjs dist/site` | «Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0», Exit 0 |
| `node authoring/tools/sprachtest.mjs` | «Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0», Exit 0 |
| `node authoring/tools/layouttest.cjs` | «240 Seitenzustände, 25 Bedienproben, 1 Abweichungen. tension core exceeds 1800px», **Exit 1** |

Die einzige Abweichung des Layouttests ist die bekannte Ausnahme B2c: Die Kurve auf `verstehen` ist bei 375 px 1992 px hoch, wie im Bericht r4-45. Die Prüfregel bestand schon in `a7f3073`. Der Test endet deshalb planmässig mit Exit 1. Die Berichte nennen die Abweichung, aber nicht den Exit-Code.

Kennzahlen der Berichte, nachgerechnet:

- Stylesheet 1822 → 1734 Zeilen (r4-43), danach 1732, 1743 und 1741.
- 24 Seiten, 35 Dateien.
- 216 Erwartungen: 217 Datenzeilen einschliesslich Kopfzeile.
- 82 geänderte Adressen (76 + 6).
- 37 Kästen «Was Sie tun können».
- 109 Kicker, 23 Etiketten.
- 19 von 26 Satzteilen wörtlich.
- 9 Links auf andere Seiten umgestellt.

Alle Zahlen stimmen.

## Nicht prüfbar

- **Echte Screenreader** (VoiceOver, NVDA, TalkBack): Hier gibt es keinen. Der Ersatz ist oben beschrieben, eine Anleitung folgt unten.
- **Safari, Firefox, reale Geräte, Touch.** Druck und erzwungene Farben habe ich nicht erneut geprüft.
- **Fachliche, juristische und sicherheitsfachliche Richtigkeit** des neuen Wortlauts. Das ist Sache der Fachfreigabe (N46-3).
- **Live-Site auf Netlify:** keine Abfrage; geprüft ist der lokale Export.
- **Das Design-System-Artefakt** vom 29.10.2026, auf das sich die Berichte stützen, war nicht greifbar. Abweichungen davon habe ich nur aus den Berichten übernommen.

## Anleitung: Screenreader-Prüfung mit VoiceOver auf dem iPhone (etwa 10 Minuten)

1. Einstellungen › Bedienungshilfen › VoiceOver einschalten. Wer es ausprobieren will, legt es zuerst unter «Kurzbefehl» auf dreimal Seitentaste.
2. In Safari «Grenzen setzen» öffnen. Mit zwei Fingern nach oben wischen: VoiceOver liest die ganze Seite vor. Nach Titel und Einleitung muss «Zu Ihrer Sicherheit … Bei Bedrohung oder Gewalt …» kommen.
3. Mit einem Finger nach rechts wischen, bis der Link «Wenn Gewalt oder Bedrohung vorkommt» kommt. VoiceOver muss «…, auf der Seite Wenn es riskant oder bedrohlich wird, Link» sagen. Doppeltippen.
4. Auf der neuen Seite prüfen: Wird der Seitentitel «Wenn es riskant oder bedrohlich wird» genannt? Nach rechts wischen bis zum roten Hinweis mit 144 und 117. Beide Nummern müssen als Link angesagt werden.
5. Zurück zur Startseite. Den Rotor öffnen (zwei Finger auf dem Bildschirm drehen) und «Überschriften» wählen. Mit einem Finger nach unten wischen: «Was beschäftigt Sie im Moment?», «Mitgefühl und Selbstschutz …», «Ich möchte etwas verstehen …», «Beratung für Sie».
6. Den Rotor auf «Orientierungspunkte» stellen. Es müssen unter anderem «Hauptnavigation», «Direkteinstiege» und «Haupt» (Inhalt) kommen.
7. Ganz oben «Menü» antippen und doppeltippen. VoiceOver muss «ausgeklappt» sagen. Danach sollen die fünf Bereiche folgen: Verstehen, Im Alltag, Krisen, Familie, Für Sie. Auf der Seite «Krisen begleiten» muss bei «Krisen» «aktuelle Seite» oder Ähnliches angesagt werden.
8. Auf «Borderline verstehen» «Auf dieser Seite · 7 Abschnitte» suchen. VoiceOver muss «eingeklappt, Taste» sagen. Doppeltippen ergibt «ausgeklappt», danach einen Eintrag wählen.
9. Zur Abbildung «Die Anspannungskurve» wischen. Der Satz «Ob Gefahr besteht, lässt sich aus der Stelle auf der Kurve nicht ableiten.» muss ohne Aufklappen vorgelesen werden. «Grenzen des Bildes» muss als ausklappbar angesagt werden.
10. Notieren, was fehlt, doppelt oder unverständlich vorgelesen wird, mit Seite und Stelle, und es dieser Datei als Ergebnis nachtragen lassen.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.**

Sicherheitslogik, Suche, Sprungziele und die Weiterleitung alter Links halten: unveränderte Platzierung der Akuthinweise, bytegleich verschobene Schutzabschnitte, 0 tote Links, keine offene Weiterleitung. Zu beheben sind zwei Rückschritte in der Barrierefreiheit seit r4-43: der Kontrast des Sicherheitslinks (N46-1) und das Bedienziel des E-Mail-Links (N46-2). Ausserdem fehlt die Fachfreigabe des neuen Wortlauts aus r4-46 (N46-3). N46-4 bis N46-7 sind gering und können gebündelt werden.
