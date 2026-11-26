# Nachprüfung r4-70 (PR #822) und r4-71 (PR #824) · Website-Review · 26.11.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger, 26.11.2026: «ok» auf die Frage «Soll ich eine gemeinsame Nachprüfung von r4-70 und r4-71 in einer neuen Sitzung starten …?».
- **Gegenstand:**
  - **r4-70:** [PR #822](https://github.com/christaegger-dot/borderline-angehoerige/pull/822), Kopf `d88564b`. Geprüft ist `git diff ff5c8d0 d88564b`, 45 Dateien:
    - `authoring/css/site.css`;
    - `authoring/tools/contract.js` (neue Gruppe `.puk-site-sender__beratung`, `BUILD`);
    - `authoring/tools/layouttest.cjs` (drei Telefonproben);
    - `authoring/site.config.json`;
    - 24 HTML-Dateien und `css/site.css` in `site/`;
    - Pendenzendatei und Nachweis.
  - **r4-71:** [PR #824](https://github.com/christaegger-dot/borderline-angehoerige/pull/824), Kopf `059d278`. Geprüft ist `git diff 8071c22 059d278`, 42 Dateien:
    - `authoring/content/krise.html` und `authoring/content/suche.html`;
    - `authoring/css/site.css`;
    - `contract.js` (nur `BUILD`) und `site.config.json`;
    - `site/`, Pendenzendatei und Nachweis.
- **Stand:** Beide sind **gemergt und veröffentlicht**.
  - **#822:** gemergt als `8071c22` am 26.11.2026 um 17:34:49 UTC (`merged_at`), über das Konto `christaegger-dot`. Der Baum von `8071c22` ist gleich wie der von `d88564b`: beide `8f187bf…`, `git diff --stat` leer. Die Eltern des Merges sind `ff5c8d0` und `d88564b`.
  - **#824:** gemergt als `70238ea` am 26.11.2026 um 17:53:39 UTC, über dasselbe Konto. Der Baum von `70238ea` ist gleich wie der von `059d278`: beide `50c960f…`, `git diff --stat` leer. Die Eltern sind `8071c22` und `059d278`, und `059d278` baut direkt auf `8071c22` auf.
  - Danach kam auf `main` noch #825 (`04fecbb`, 18:03:44 UTC). #825 ändert nur die Pendenzendatei; `site/` und `authoring/` sind gleich wie in `70238ea`.
- **Wer prüft:** eine Claude-Sitzung, die an r4-70 und r4-71 nicht gebaut hat. Zur Unabhängigkeit ist offenzulegen:
  - r4-70 und r4-71 hat die Sitzung gebaut, die auch #809, #813 und #815 gebaut hat. Dieselbe Sitzung hat diese Nachprüfung gestartet.
  - Der Startauftrag fasst den Inhalt beider PRs zusammen und nennt die Fragen. Gelesen habe ich die PR-Beschreibung von #824, beide `BERICHT.md` und die Pendenzenabschnitte. Das Website-Review selbst kenne ich nur aus den Berichten. Es wurde nur im Gespräch berichtet.
  - Die Messungen habe ich selbst gemacht, mit eigenen Skripten (siehe Beilagen) und einer eigenen axe-Installation. Ich habe die drei Stände r4-69, r4-70 und r4-71 nebeneinander gemessen. Für die Gates habe ich die Werkzeuge des Repositorys benutzt. Das axe-Skript stammt aus `audit-results/2026-11-26-text-scale-r4-68/axe.cjs`, so verlangt es der Auftrag. `domvergleich.py` habe ich unverändert aus der Nachprüfung von #815 übernommen.
- **Umgebung:**
  - Node 22.23.5. Playwright 1.64.0 aus `/opt/borderline-browser/node_modules/playwright` (`PLAYWRIGHT_MODULE` gesetzt). Chromium (Headless Shell) 156.0.8078.4.
  - axe-core 4.14.0, frisch installiert in einem Ordner ausserhalb des Repositorys (`npm install --ignore-scripts`). `axe.min.js` hat SHA-256 `20c09fe1…c46e878`, gleich wie bei der Nachprüfung von #815.
  - Die Gates liefen auf dem Arbeitsbaum von `70238ea`. Für die Browsermessungen habe ich `site/` aus `ff5c8d0` (r4-69), `8071c22` (r4-70) und `70238ea` (r4-71) mit `git archive` ausserhalb des Repositorys ausgepackt. Ausgeliefert hat sie je ein lokaler `python3 -m http.server`. `site/` im Repository habe ich nicht verändert; `git status` war danach leer.
  - Live: nur lesende `curl`-Abfragen an `borderline-angehoerige.netlify.app`, am 26.11.2026 um 18:09 UTC.
- **Beilagen in diesem Ordner:**
  - `messung.cjs` mit den Ausgaben `m-telefon.txt`, `m-menue.txt`, `m-zeilen.txt`, `m-klein.txt`, `m-ueberlauf.txt`, `m-druck.txt` und `m-misc.txt`. Gemessen sind: Telefone, Menü, Zeilenlängen, Text unter 16 px, Überlauf bei 100, 200 und 300 %, Druck, Abstand, Brotkrümel, Suchseite und die Reihenfolge des Akuthinweises.
  - `absender2.cjs` und `abs3.cjs` mit `m-absender.txt` und `m-absender-zeilen.txt`: die Absenderzeile von 300 bis 1440 px, bei 100, 200 und 300 %.
  - `kleinschrift.cjs` mit `m-kleinschrift.txt`: kleinere Standardschrift (siehe N824-1).
  - `fokus.cjs` mit `m-fokus.txt`: Tastatur, Fokus und Bildschirmleser-Baum des Kopfs.
  - `cls.cjs` mit `m-cls.txt`: Layoutverschiebung beim Laden.
  - `b2c.cjs` mit `m-b2c.txt`: die Anspannungskurve.
  - `domvergleich.py` und `live-abgleich.txt`: Abgleich der Produktion mit `site/`.
  - `gates.txt`: Schlusszeilen der Gates und von axe.
  - Die Skripte erwarten die drei Stände auf den Ports 8801 bis 8803 und `S` als Ausgabeordner.

Dies ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Ergebnis

**Inhaltlich wie beauftragt umgesetzt; ein gemessener Fehler (N824-1) und Nachbesserung bei Ablauf, Test und Dokumentation, ohne Blocker.**

- **Umgesetzt wie entschieden:**
  - Der Akuthinweis ist byte-gleich geblieben und nur verschoben.
  - Ohne Skript geht nichts verloren.
  - Bei Standardschrift ist auf keiner Seite und in keiner Breite Text unter 16 px.
  - Die Absenderzeile bricht auch bei 200 und 300 % ohne Überlauf und ohne Einrückung um.
- **Messwerte:** Alle Zahlen der beiden Berichte habe ich nachgemessen. Die Telefonwerte, die Kopfhöhe und die Anspannungskurve stimmen auf den Pixel. Die Zeilenlängen weichen um höchstens 6 Zeichen ab; das liegt am Messverfahren.
- **Gates und Live-Stand:** Alle Gates und axe sind wie angegeben. Die Produktion liefert genau `site/` von `main` aus.
- **Offen:**
  - **N824-1:** Ist die Standardschrift kleiner als etwa 15 px, läuft die Seite mit Skript zwischen 50rem und 760 px Breite waagrecht über, um 55 bis 209 px. Diesen Fehler hat r4-71 neu eingeführt.
  - **N822-1, N824-2:** Beide Releases sind ohne Nachprüfung live gegangen, vor dem Ende des Codex-Reviews und ohne Merge-Auftrag, der auf GitHub belegt ist.
  - **N824-3:** Die Layouttest-Probe zum ersten Krisenschritt besteht nur knapp und prüft nicht mehr das Wesentliche.
  - **N824-4:** Der Druck ändert sich, anders als der Bericht nahelegt.

## Befunde

### N824-1 · mittel (Regression r4-71) · Waagrechter Überlauf bei kleinerer Standardschrift zwischen 50rem und 760 px

- **Ort:** `authoring/css/site.css:690`, also `@media (max-width:760px){html[data-puk-js] .puk-site-subbar .puk-site-utility{display:none}html[data-puk-js] .puk-site-menu__utility{display:block}}`. Dazu gehört der Umbruch des Menüs `@media (min-width:50rem)` (`:649–655`).
- **Ursache:**
  - Die neue Regel gilt bis 760 px, in `px`. Das Menü wird dagegen ab 50rem zur waagrechten Leiste mit `white-space:nowrap`.
  - Bei Standardschrift 16 px sind 50rem 800 px. Die Bereiche überschneiden sich dann nicht.
  - Ist die Standardschrift kleiner als 15,2 px, liegt 50rem unter 760 px. Im Bereich dazwischen stehen dann alle acht Links (fünf Hauptbereiche und drei Direkteinstiege) in einer Zeile ohne Umbruch.
- **Beleg (`m-kleinschrift.txt`, `m-menue.txt`, Startseite):**

  | Standardschrift | betroffene Breite | Überlauf r4-71 | r4-70 |
  |---|---|---|---|
  | 12 px | 600–760 px | 209 bis 55 px | 0 |
  | 13 px | 680–760 px | 173 bis 96 px | 0 |
  | 14 px | 700–760 px | 189 bis 131 px | 0 |
  | 15 px | 760 px | 172 px | 0 |

  - Ab 761 px ist alles wie vorher. Ohne Skript tritt der Fehler nicht auf.
  - Bei Standardschrift 16, 32 und 48 px habe ich keinen Überlauf gefunden: 288 Läufe auf allen Seiten bei 320, 360, 375 und 768 px (`m-ueberlauf.txt`).
- **Einordnung:**
  - Erreichbar ist der Fall etwa so: Im Browser ist die Schriftgrösse auf «klein» gestellt, und das Fenster ist schmal. Oder ein Tablet hat eine Breite zwischen 600 und 760 px. Oder ein Telefon liegt quer, und in Android ist die Systemschrift unter 100 % gestellt. Diese Systemschrift übernimmt die Website seit r4-68 (`text-scale`). Ein Telefon mit 740 × 360 px quer und 90 % Systemschrift ergibt 14,4 px, also 50rem = 720 px. Dann ist der Bereich 720–760 px betroffen.
  - Die Seite verschiebt sich dann seitlich. Die Direkteinstiege «Nachschlagen» und «Suchen» liegen ausserhalb des Bildschirms.
  - Diesen Fall prüfen weder der Layouttest noch der Bericht. Beide messen nur mit 16 und 32 px Standardschrift.
  - N815-7 hat schon vermerkt, dass die Umbrüche teils in `px` und teils in `rem` gesetzt sind. Diese Mischung macht den Fehler erst möglich.
- **Vorschlag:** Das ist eine Gestaltungskorrektur mit eigener Kennung und gehört nicht in diesen Auftrag. Zwei Wege:
  - Die neue Regel an den Umbruch des Menüs binden, zum Beispiel `@media (max-width:760px) and (max-width:49.99rem)`.
  - Oder in der waagrechten Leiste (`min-width:50rem`) `.puk-site-menu__utility` ausdrücklich ausblenden.

  Dazu eine Layouttest-Probe mit Standardschrift 12 bis 14 px bei 700 und 740 px.

### N822-1 · wichtig (Ablauf) · r4-70 veröffentlicht vor Nachprüfung und Codex-Ende, ohne belegten Merge-Auftrag

- **Beleg:**
  - PR #822 angelegt um 17:28:04 UTC, gemergt um 17:34:49 UTC (`merged_at`). Gemergt hat das Konto `christaegger-dot`.
  - Das Codex-Review wurde durch «Draft marked ready» ausgelöst. Sein Kommentar ist um 17:34:49 UTC angelegt, in derselben Sekunde wie der Merge. Abgeschlossen hat es um 17:35:17 UTC ohne Befund, also **28 Sekunden nach dem Merge**. Reviews oder Review-Threads gibt es keine.
  - Den genauen Zeitpunkt von «bereit zur Prüfung» habe ich nicht selbst abgefragt. Die Pendenzendatei nennt «rund 11 Sekunden».
  - CI `build-and-compare` war grün, 17:28:22 bis 17:29:01 UTC. Die Netlify-Prüfungen Redirect und Header waren «success», Pages changed «neutral».
  - Der Merge-Commit hat nur den Standardtext. Einen Merge-Auftrag nennen weder PR noch Kommentare. Die Pendenzendatei auf `main` sagt selbst «auf GitHub nicht belegt».
  - Laut Pendenzendatei gilt R28-O01: erst mergen, wenn das Codex-Review abgeschlossen und geprüft ist. Die Datei vermerkt, dass das nicht eingehalten ist.
- **Einordnung:**
  - Es ist dasselbe Muster wie bei N815-1. Der Merge hat die öffentliche Website geändert.
  - Einen Schaden durch r4-70 habe ich nicht gefunden (siehe «Bestätigt»). Codex hat nichts gefunden.
- **Vorschlag:** Den Merge-Auftrag mit Quelle nachtragen, oder «auf GitHub nicht belegt» stehen lassen. Dazu auf diese Nachprüfung verweisen.

### N824-2 · wichtig (Ablauf, Freigabe) · r4-71 veröffentlicht vor Nachprüfung und Codex-Ende; Entscheide nur aus der Sitzung belegt

- **Beleg:**
  - PR #824 angelegt um 17:48:59 UTC, gemergt um 17:53:39 UTC, über das Konto `christaegger-dot`.
  - Der Codex-Kommentar ist um 17:53:43 UTC angelegt, ausgelöst durch «Draft marked ready». Abgeschlossen hat das Review um 17:54:06 UTC ohne Befund, also **27 Sekunden nach dem Merge**. Reviews gibt es keine.
  - CI grün, 17:49:18 bis 17:50:20 UTC.
  - Unter «Offen» steht in der PR-Beschreibung: «Nachprüfung durch eine andere Sitzung. Merge nur auf Auftrag; erst der Merge ändert die veröffentlichte Website.» Einen Merge-Auftrag nennt weder der PR noch der Merge-Commit.
  - Die fünf Entscheide (1 «Kasten vor die Schritte», 3, 6, 8 und 9) sind nur als «Auswahl in der Sitzung» belegt, in Bericht, PR und Pendenzendatei. Auf GitHub gibt es dazu keine Äusserung von Christa Egger.
- **Einordnung:**
  - Anders als r4-70 ändert r4-71 Inhalt. Es verschiebt den sicherheitsrelevanten Akuthinweis und streicht einen Satz auf der Suchseite. Den Wortlaut des Akuthinweises ändert es nicht; das habe ich geprüft, siehe unten.
  - `appliedTo` stützt auch r4-71 auf den fortgeltenden Entscheid vom 18.10.2026 («Die unabhängige Gesamtprüfung entfällt weiterhin»). Diese Ausnahme betrifft die unabhängige Gesamtprüfung. Eine fachliche Freigabe der neuen Reihenfolge ersetzt sie nicht. Ob für die Reihenfolge eine fachliche Freigabe nötig ist, entscheidet Christa Egger. Die Pendenzendatei führt die Bestätigung für r4-68 bis r4-71 bereits als offen.
- **Vorschlag:** In der Pendenzendatei die Entscheide und den Merge-Auftrag mit Quelle festhalten, zum Beispiel in einem kurzen Kommentar von Christa Egger auf GitHub, oder ausdrücklich «nur in der Sitzung». Ausserdem festhalten, ob die Reihenfolge im Kasten fachlich freigegeben ist.

### N824-3 · gering (Test) · «first crisis step below first screen» besteht knapp und prüft nicht mehr das Wesentliche

- **Ort:** `authoring/tools/layouttest.cjs:66` (`firstCrisisStep.y>=812`, nur bei 375 px).
- **Beleg (`BROWSER.json` des Layouttests, `m-telefon.txt`):**
  - Der erste Schritt beginnt bei 375 × 812 auf **793 px**. Bis zur Grenze bleiben 19 px.
  - Der Schritt ist 122 px hoch. Seine erste Zeile ist also im ersten Bildschirm nicht ganz sichtbar.
  - Vorher lag der Schritt auf 431 px. Bei 320 px liegt er jetzt auf 931 px, bei 360 × 740 auf 823 px und bei 375 × 667 auf 793 px. Diese Fälle prüft der Test nicht.
- **Einordnung:**
  - Mit Entscheid 1 ist das Ziel im ersten Bildschirm der Akuthinweis mit 144 und 117, nicht mehr der erste Schritt. Diesen Hinweis prüft kein Test.
  - Die Probe besteht nur noch zufällig. Wird der Kopf oder der Kasten auch nur eine Zeile höher, schlägt sie fehl, obwohl die Notrufnummern weiter sichtbar sind. Umgekehrt würde nichts auffallen, wenn die 144 wieder unter den Bildschirm rutscht.
- **Vorschlag:** Das ist ein Entscheid zum Test (Christa Egger). Eine Probe «144 in first screen» bei 390 × 844, 375 × 812, 360 × 740 und 375 × 667 ergänzen. Die Probe zum ersten Schritt neu fassen, zum Beispiel «Akuthinweis vor dem ersten Schritt», oder ausdrücklich entfernen.

### N824-4 · gering (Dokumentation) · Der Druck ändert sich mit Punkt 6

- **Beleg (`m-druck.txt`, A4, alle 24 Seiten):**
  - Im Druck gilt `html{font-size:81.25%}`, also 1rem = 13 px. Kleine Texte wie Bildunterschriften und Vertiefungen werden damit im Druck **13 statt 12,19 px** gross. Gemessen ist das auf `verstehen.html`. Zuvor waren sie mit .8125rem bis zu 10,56 px gross.
  - `verstehen.html` braucht im Druck **12 statt 11 Seiten**. Die anderen 23 Seiten haben gleich viele Seiten wie vorher.
  - Der Akuthinweis steht auch im Druck vor den Schritten. Kopf, Menü und Direkteinstiege bleiben im Druck ausgeblendet, wie vorher.
  - Sonst bleibt der Druck intakt.
- **Einordnung:** Der Bericht schreibt «Im Druck gilt weiter die verkleinerte Druckgrösse». Das stimmt für die Grundschrift. Die kleinen Texte werden im Druck aber grösser. Das ist nicht schlecht, aber nicht dokumentiert.
- **Vorschlag:** Im Pendenzenabschnitt r4-71 einen Satz ergänzen. Falls gewünscht: eine eigene Druckgrösse für die kleinen Texte.

### N824-5 · gering (Dokumentation) · Pendenzendatei auf `main` (`04fecbb`)

- Die Abschnitte r4-70 und r4-71 stimmen mit GitHub und mit meinen Messungen überein: Merge-Zeiten, Konto, Codex-Zeiten, CI, Live-Kennung und Messwerte.
- Abweichungen:
  - «kein waagrechter Überlauf bis 300 % Schrift» gilt nur mit Standardschrift 16 px oder grösser, siehe N824-1.
  - In der Kopfzeile ist der zweite fett gesetzte Block («Dokumentationsstand … GitHub main: `cb9d412`, r4-69 …») veraltet. Seither sind r4-70 und r4-71 auf `main`. Der erste Block nennt den Stand richtig.
  - «Nachprüfung … noch kein PR» ist mit dem PR dieser Nachprüfung überholt.
  - Die Abschnitte nennen nicht, dass sich der Druck ändert (N824-4) und dass Bildunterschriften jetzt bis 83 Zeichen lang sind (N824-6).
- Diese Datei ändere ich nicht, so verlangt es der Auftrag. Nachführen kann sie die bauende Sitzung.

### N824-6 · Hinweis · Bildunterschriften jetzt bis 83 Zeichen je Zeile

- **Beleg (`m-zeilen.txt`):** Die längste Zeile in einer Bildunterschrift hatte bei 1024 und 1440 px folgende Länge:
  - r4-69: 117 Zeichen;
  - r4-70: 75 Zeichen;
  - r4-71: **83** Zeichen, in `verstehen.html`.
- **Grund:** `max-width:36em` wächst mit der Schrift, jetzt 16 statt 15 px, also 576 px. Der Kommentar in `site.css:1253` («36em sind bei 15 px rund 540 px (etwa 75 Zeichen)») ist für Bildunterschriften überholt. In Vertiefungen bleiben es 77 Zeichen.
- **Einordnung:** Das liegt noch im üblichen Rahmen. Die Pendenzendatei führt die Breite der Bildunterschriften (36em statt `80ch`) als zu bestätigen. Bei dieser Bestätigung sollte der Wert von 83 Zeichen zugrunde liegen, nicht 76.

### N824-7 · Hinweis · Kleine Telefone, Layoutverschiebung, doppelter Satz im Kasten

- **320 × 568:** Hier liegt die 144 bei 559–582 px und ist nicht ganz im ersten Bildschirm. Vorher lag sie bei 1026–1049 px. Die Sicherheitskarte liegt bei 971 px. Die Aussage «überall im ersten Bildschirm» gilt für die vier geprüften Telefone.
- **Layoutverschiebung beim Laden** (375 × 812, je 4 Läufe, `m-cls.txt`):
  - Die Zeile mit den Direkteinstiegen verschwindet erst, wenn `interaktion.js` läuft (`defer`, `data-puk-js`).
  - Typisch gemessen: 0,036 auf der Startseite (r4-69: 0,03) und 0,038 auf «Krisen begleiten» (r4-69: 0,018).
  - Einzelne Läufe ergeben in allen drei Ständen 0,3 bis 0,4. Diese Spitzen kommen vom Zuklappen des Menüs, das es schon vorher gab.
  - Eine regelmässige Verschlechterung habe ich nicht gemessen. Auf einem echten Gerät mit langsamem Netz sollte man es ansehen.
- **Doppelter Satz:** Der Akuthinweis und der dritte Schritt enden beide mit «Warten Sie nicht auf eine Antwort der Fachstelle per E-Mail.». Das war schon vorher so; jetzt stehen die beiden Sätze weiter auseinander. Ob das so bleiben soll, ist eine Frage des Wortlauts, keine technische.

### N822-2 · Hinweis · Kleinigkeiten zu r4-70

- **Einrückung:** Laut Bericht begann eine umbrochene Zeile «vorher nie» eingerückt. Das gilt nur bei 100 %. Bei 200 und 300 % hatte r4-69 zwischen 780 und 1240 px eingerückte Zeilen von 8 px. r4-70 beseitigt sie, ohne es zu nennen (`m-absender.txt`).
- **«Beratung:» allein auf einer Zeile:** Auf schmalen Bildschirmen steht «Beratung:» allein über der Adresse, wenn beide nicht auf eine Zeile passen. Das betrifft bis 340 px bei 100 %, bis 660 px bei 200 % und bis 980 px bei 300 %. Die Gruppe bricht dann in sich um. Vorher war das gleich (`m-absender-zeilen.txt`). Der Fehler aus dem Review tritt nicht mehr auf: «Beratung:» am Zeilenende neben dem Namen und die Adresse allein darunter.
- **Unter 320 px:** Bei 300 px und 300 % läuft die Seite in allen drei Ständen um 5 px über. Das bestand schon vorher und liegt unter der Grenze von 320 px für das Umfliessen.
- **Branch-Name:** `claude/sharp-mendel-6ecwbi` verstösst gegen die Konvention. Das ist offengelegt und von der Cloud-Sitzung vorgegeben. Mit #825 gibt es auf diesem Branch drei aufeinanderfolgende PRs.
- **CI:** Die CI enthält weiterhin weder den Layouttest noch axe (N809-7).

## Bestätigt

### 1. Umsetzung

- **Akuthinweis (r4-71, Punkt 1):**
  - Das gerenderte `<p data-responsibility-inline>` auf `krise.html` ist **byte-gleich** in r4-69, r4-70 und r4-71 (`outerHTML` verglichen). Der Block `responsibility` in `site.config.json` ist in `ff5c8d0`, `8071c22` und `059d278` gleich (gleicher Hash).
  - In `authoring/content/krise.html` ist nur der Platzhalter verschoben.
  - Reihenfolge im Kasten: vorher `P, H2, OL, P[Hinweis], P`, nachher `P, H2, P[Hinweis], OL, P`.
  - Auf der Seite gibt es genau einen Link `tel:144`. Die Namen für Bildschirmleser («Rettungsdienst 144 anrufen», «Polizei 117 anrufen») sind gleich geblieben.
- **Direkteinstiege (r4-71, Punkt 3), `m-menue.txt`, `m-fokus.txt`:**
  - **Mit Skript bis 760 px:** Die Zeile ist ausgeblendet. Das Menü zeigt nach dem Öffnen 8 Links: Verstehen, Im Alltag, Krisen, Familie, Für Sie, Kurz und klar, Nachschlagen, Suchen. Geprüft bei 320, 375, 390 und 760 px, auch bei 200 und 300 %.
  - **Ab 761 px:** wie vorher. Bei 761 bis 799 px gibt es ein Menü mit 5 Links und die Zeile. Ab 800 px gibt es die waagrechte Leiste und die Zeile. Bei 1280 px und 200 % gibt es ein Menü mit 5 Links und die Zeile.
  - **Ohne Skript bei 375 px:** Die Zeile ist sichtbar, das offene Menü zeigt 5 Links. Das ist gleich wie in r4-70. Ohne Skript geht also nichts verloren.
  - **Tastatur:** Die Reihenfolge ist «Zum Hauptinhalt», Logo, Menü. Enter öffnet das Menü (`aria-expanded=true`). Danach folgen die 8 Links, danach die Adresse. Jeder Link hat eine Fokusanzeige (`:focus-visible`) und ist 44 px hoch.
  - `aria-current` ist auch im Menü gesetzt: auf `suche.html` «location» für Nachschlagen und «page» für Suchen.
  - Die Pfeiltasten im Menü nehmen nur sichtbare Links (`interaktion.js:96`), also auch die neuen. Verlässt der Fokus das Menü, schliesst es sich wie vorher.
  - **Bildschirmleser-Baum:** Die Navigation «Hauptnavigation» enthält 8 Listeneinträge. Die Navigation «Direkteinstiege» fehlt am Telefon mit Skript. Das ist folgerichtig, weil die Zeile ausgeblendet ist.
- **16 px (r4-71, Punkt 6), `m-klein.txt`:**
  - Geprüft sind alle 24 Seiten, mit geöffneten Vertiefungen, bei 320, 360, 375, 768, 1024 und 1440 px. Gemessen ist jeder sichtbare Textknoten, auch SVG-Text, umgerechnet mit dem Massstab der Grafik.
  - Unter 16 px: r4-69 und r4-70 hatten 211 bis 281 Stellen, alle mit 15 px. r4-71 hat **0**.
  - Text mit 13 px habe ich auch in r4-70 nicht gefunden. Der Bericht nennt «49 mit 13 px». Das kann an einer anderen Zählung liegen, etwa weil dort versteckte Elemente mitgezählt sind. Für das Ergebnis «nachher keine» spielt das keine Rolle.
  - `--size-micro` (.6875rem) ist definiert, wird aber nirgends benutzt.
- **Suchseite (r4-71, Punkt 8):** «Suchen Sie mit Ihren eigenen Worten.» steht im Hauptinhalt vorher 2-mal und nachher 1-mal. Der Rest des Absatzes ist unverändert.
- **Absenderzeile (r4-70, Punkt 4), `m-absender.txt`:**
  - Gemessen bei 300 bis 1440 px in Schritten von 20 px, bei 16, 32 und 48 px Schrift, auf Startseite, «Krisen begleiten» und 404.
  - Bei 16 px stand die Adresse in r4-69 bei 780 bis 900 px ohne «Beratung:» auf einer neuen Zeile. In r4-70 und r4-71 kommt das ab 360 px nicht mehr vor.
  - Bei 32 px gab es das in r4-69 auch bei 820 bis 1060 und 1260 bis 1440 px. Jetzt kommt es ab 680 px nicht mehr vor.
  - Eingerückte Zeilen und Überlauf ab 320 px: 0 bei allen drei Schriftgrössen.
  - Der Abstand zwischen Name und «Beratung:» beträgt bei 1440 px 16 px.
- **Lesebreite, Abstand, Brotkrümel (r4-70, Punkte 5, 7 und 10), `m-zeilen.txt`, `m-misc.txt`:**
  - **Längste Zeile bei 1440 px** (vorher → nachher):
    - Vertiefungen: 142 → 77 Zeichen;
    - Einleitung von «Krisen begleiten»: 126 → 70 Zeichen;
    - Bildunterschriften: 117 → 75 Zeichen in r4-70 und 83 Zeichen in r4-71 (N824-6).

    Der Bericht nennt 148/130 → 78/71. Die Abweichung liegt am Messverfahren: Ich zähle Zeichen je gerenderter Zeile und lasse versteckten Text aus.
  - **«Wenig Zeit oder Kraft?»:** Abstand vorher 0 px, nachher 20 px, bei 375 und bei 1440 px.
  - **Brotkrümel auf der Suchseite bei 375 px:** Die zweite Zeile beginnt jetzt mit «Website durchsuchen», nicht mehr mit «/». Das Zeichen steht als `::after` am vorderen Eintrag.

### 2. Wirkung (`m-telefon.txt`, `m-b2c.txt`)

| Telefon | Kopf | Sicherheitskarte | «144», unterer Rand | erster Krisenschritt |
|---|---|---|---|---|
| 390 × 844 | 192 → 148 | 815 → 771 | 884 → 477 | 403 → 765 |
| 375 × 812 | 192 → 148 | 846 → 802 | 912 → 505 | 431 → 793 |
| 360 × 740 | 192 → 148 | 907 → 863 | 973 → 536 | 431 → 823 |
| 375 × 667 | 192 → 148 | 846 → 802 | 912 → 505 | 431 → 793 |

- Alle Werte sind gleich wie in Bericht und PR. r4-69 und r4-70 sind auf den Telefonen gleich.
- Als «Sicherheitskarte» misst der Layouttest die erste Anliegenkarte, also «Ich sorge mich um Sicherheit …», mit dem Ziel `krise.html#krise-schnell`. So habe ich auch gemessen.
- **Anspannungskurve bei 375 px:** Die Figur ist 1992 px (r4-69 und r4-70) bzw. **2029 px** (r4-71) hoch. Die vierte Phase endet immer bei **1603 px**, und es sind 4 Karten. Das stimmt mit dem Bericht und mit dem Layouttest überein.

### 3. Barrierefreiheit und Überlauf

- **axe-core 4.14.0** auf r4-71: `build r4-71 · Seiten: 24 · Läufe: 96 · Verstösse: 0`. Darin ist die Kontrastprüfung enthalten. Die Farben der neuen Einträge sind die schon geprüften Menüfarben.
- **Überlauf** bei 16, 32 und 48 px Standardschrift, 320, 360, 375 und 768 px, alle 24 Seiten: **0 von 288 Läufen** in r4-69, r4-70 und r4-71 (`m-ueberlauf.txt`). Bei kleinerer Standardschrift siehe N824-1.

### 4. Gates auf `70238ea` (`gates.txt`)

| Gate | Bericht | gemessen |
|---|---|---|
| `selftest.mjs` | 125/125 | 125/125 bestanden |
| `build.mjs --production --verify-site` | 35 Dateien byte-gleich | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/`, 24 Seiten · 0 Blocker · 20 Hinweise |
| `suchtest.mjs site` | 216/216 | 216 von 216, JS-Fehler 0 |
| `sprachtest.mjs site` | 73 | 73 Prüfungen bestanden, JS-Fehler 0 |
| `layouttest.cjs` | 2 Abweichungen | 240 Seitenzustände, 30 Bedienproben, **2 Abweichungen**: Sicherheitskarte bei 375 × 667 (802 px) und 360 × 740 (863 px), Exit 1; B2c bestanden (2029/1603 px); «no JS five navigation links visible» besteht |
| axe | 96 Läufe, 0 | 96 Läufe, 0 Verstösse |

- **Wirkung in `site/`** (eigener Vergleich mit `git archive`, Kennung ersetzt):
  - r4-69 → r4-70: Jede der 24 HTML-Seiten unterscheidet sich nur in **einer Zeile**, der Absenderzeile mit `.puk-site-sender__beratung`. Dazu kommt `css/site.css`.
  - r4-70 → r4-71: Es unterscheiden sich nur `krise.html`, `suche.html` und `css/site.css`.
  - Die übrigen Dateien sind gleich. `interaktion.js` ist in beiden PRs unverändert.

### 5. Live-Stand (`live-abgleich.txt`, 26.11.2026, 18:09 UTC)

- Alle 24 Seiten tragen `data-puk-site-build="r4-71"` und `?v=r4-71`.
- **24 HTML-Seiten:** gleicher DOM wie `site/` auf `main`, nachdem die Netlify-Umschreibung der Links (Pretty URLs) zurückgeführt ist.
- **9 weitere Dateien byte-gleich:** `css/site.css`, `js/interaktion.js`, 2 SVG, 3 WOFF2, `OFL.txt` und `robots.txt`.
- `_headers` und `_redirects` werden nicht ausgeliefert (404). Das ist erwartet.

### 6. Freigabe, Kennungen, Codex

- **Kennungen:** `BUILD`, `assetVersion` und `independentReviewWaiver.version` lauten in `d88564b` r4-70 und in `059d278` r4-71.
- `pendingScope` beschreibt den jeweiligen Inhalt richtig. Bei r4-71 steht «kein Skript». Das stimmt: Die Regel nutzt das schon vorhandene `data-puk-js`, und `interaktion.js` ist unverändert.
- `appliedTo` ist bei r4-70 um r4-69 («gemergt (PR #821)») und r4-70 ergänzt, bei r4-71 um «r4-70 … gemergt (PR #822)» und r4-71. Der Verweis auf den jeweiligen Nachweis stimmt.
- In `site/` kommen r4-69 und r4-70 nur noch in Kommentaren des Stylesheets vor.
- **Codex:** beide «Completed», ohne Befund. Abgeschlossen bei #822 um 17:35:17 UTC und bei #824 um 17:54:06 UTC, beide Male nach dem Merge (N822-1, N824-2).
- **Merge-Auftrag:** auf GitHub für keinen der beiden PRs belegt.

## Nicht geprüft

- Ein echtes Gerät: Android mit veränderter Systemschrift, iOS Safari, Firefox, Bildschirmleser.
- Die fachliche Richtigkeit der Reihenfolge im Kasten.
- Das Website-Review selbst. Es ist nur aus den Berichten bekannt.
