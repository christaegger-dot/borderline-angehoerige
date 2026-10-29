# Gestaltung Schritt 2 · r4-44 · 29.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 29.10.2026:** «ja, mach weiter mit Schritt 2». Während der Umsetzung entschieden, zu den Modellgrenzen in Abbildungen: «nein, bitte mach das nicht mehr, das lenkt einfach nur ab». Ausgangsstand `main` = `abf947d` (r4-43, [PR #714](https://github.com/christaegger-dot/borderline-angehoerige/pull/714) gemergt am 29.10.2026, 15:23 UTC, von Christa Egger). Branch `claude/dazzling-cerf-n6ci1w`, neu von `main` aufgesetzt.

Grundlage ist das Gestaltungssystem «Borderline Angehörige» (Design-System-Artefakt vom 29.10.2026). Schritt 2 dort heisst «Bausteine vereinheitlichen»: bestehender Text wird in die Bausteine gefasst. Das ändert Markup, nicht Wortlaut.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

## Was sich ändert

### «Was Sie tun können» als Kasten auf allen Seiten (G7)

Bisher war «Was Sie tun können» nur auf «Borderline verstehen» ein Kasten (`div.bl-tun`). Auf zehn anderen Seiten stand es als fetter Satzanfang im Fliesstext (Review Gestaltung vom 21.10.2026, Befund G7). Jetzt sind alle 37 Stellen derselbe Kasten: hellblaue Fläche mit dem Etikett «Was Sie tun können» in Blau 125.

| Seite | Stellen |
|---|---|
| Alltag und Beziehungen | 8 (davon 5 in der Stationenliste «Was den Spielraum … verengen kann») |
| Grenzen setzen, Auf sich achten, Zugewandt und klar sprechen, Ihre Rolle klären | je 4 |
| Genesung, Wenn Ihr jugendliches Kind betroffen ist | je 3 |
| Kinder | 2 |
| Behandlung, Diagnose | je 1 |
| Borderline verstehen | 3 (unverändert, schon Kasten) |

- Der Umbau lief mit einem Skript. `<p><strong>Was Sie tun können:</strong> …</p>` wurde zu `<div class="bl-tun"><p class="bl-tun__label">Was Sie tun können</p><p>…</p></div>`.
- Eine direkt anschliessende Liste gehört zum Kasten. Das betrifft 7 Stellen: Behandlung, Diagnose, Genesung, Grenzen, Kinder, Rolle und Auf sich achten.
- In «Kinder» › «Alltag» gehört auch der Satz zum Plan danach in den Kasten («Besprechen Sie den Plan in einfachen Worten mit dem Kind. …»).
- **Wortlaut:** Der sichtbare Text jeder geänderten Seite ist nach Entfernen der Tags gleich wie vorher. Einzige Abweichung ist der Doppelpunkt nach dem Etikett, der im Kasten entfällt, wie bei den bestehenden Kästen auf «Verstehen». Geprüft mit Skript auf allen zehn Seiten, 0 Abweichungen.

### Grenzen der Abbildungen in die Vertiefung

Fünf Abbildungen hatten ihre Grenzen schon in der Vertiefung «Grenzen des Bildes»: Genesung › Trieb, Zugewandt sprechen › Tassen, Rolle › Weg, Auf sich achten › Abend und Verstehen › Momentaufnahmen (dort mit eigenem Titel). Zwei Abbildungen zeigten sie noch sichtbar unter dem Bild (`div.bl-model-limit`). Diese stehen jetzt nach dem Entscheid von Christa Egger in derselben Vertiefung:

- **Borderline verstehen › Abbildung 1 «Die Anspannungskurve»:** «Die Kurve zeigt einen Verlauf beispielhaft. Sie ist kein validiertes Messinstrument und keine Beurteilung des Zustands einer Person; ob Gefahr besteht, lässt sich aus der Stelle auf der Kurve nicht ableiten. Solche Verläufe gibt es nicht nur bei Borderline.»
- **Kinder › Abbildung 1 «Wer trägt welche Aufgabe?»:** «Wer konkret zuständig ist, hängt von Familie, Alter, Entwicklung und Situation ab. Die Darstellung ersetzt keinen Schutzplan und keine fachliche Beurteilung des Kindeswohls.»

Der Wortlaut ist unverändert. Beim Drucken öffnet das Skript alle Vertiefungen (W3-01), auf Papier stehen die Grenzen also weiter. Die Regel in `authoring/DARSTELLUNGSREGELN.md` ist nachgeführt: Grenzen einer Abbildung stehen in «Grenzen des Bildes». Fachliche Unsicherheit, Grenzen einer Schlussfolgerung und Selbstschutz im Text bleiben sichtbar. Die nicht mehr benutzte Regel `.bl-model-limit` ist aus dem Stylesheet entfernt.

**Hinweis zur Sicherheit:** Beide Absätze enthalten je einen Satz mit Schutzbezug: «ob Gefahr besteht, lässt sich aus der Stelle auf der Kurve nicht ableiten» und «ersetzt keinen Schutzplan und keine fachliche Beurteilung des Kindeswohls». Sie sind jetzt erst nach einem Klick zu lesen. Das ist so entschieden. Wird einer der Sätze doch wieder sichtbar gewünscht, genügt eine Zeile.

### Was bewusst bleibt

- **Herkunft in der Bildlegende:** «Eigene didaktische Darstellung» bzw. «Quelle:» bleibt sichtbar. Das Gate verlangt diese Kennzeichnung in der Bildlegende (`figure-source`). DEAR nennt eine fremde Methode (Linehan 2015), die Quellenangabe gehört deshalb sichtbar dazu. Die Legende ist auf 11 von 14 Abbildungen eine Zeile in kleiner Schrift.
- **«Abbildung 1 · …»:** Die Nummern bleiben, weil Texte darauf verweisen (z. B. «Vier Schritte aus Abbildung 1» in Beziehungen).
- **Beispielsätze (G10):** Seit r4-43 haben alle Beispielsätze im Text dieselbe Form (Paar, die hilfreiche Fassung auf Blau). In Abbildungen bleibt die freigegebene Linienform. Das Markup ist bereits einheitlich (`div.puk-say`). Die Etiketten sind inhaltlich verschieden («Eher hilfreich», «Tragfähiger», Namen in Dialogen) und bleiben.
- **Sicherheitshinweise:** Es wurden keine neuen gelben Kästen eingeführt. Akut- und Sicherheitswortlaut sowie seine Platzierung sind unverändert.

### Technisch

- Build-Kennung r4-44 in `contract.js` (`BUILD`) und `site.config.json` (`assetVersion`). `independentReviewWaiver.version` ist r4-44 mit Vermerk in `appliedTo` (gestützt auf den fortgeltenden Entscheid vom 18.10.2026). `pendingScope` beginnt mit r4-44.
- `authoring/css/site.css`: Kommentar zu `.bl-tun`, `.bl-model-limit` entfernt. Keine neuen Regeln.

## Messung vorher und nachher

Seitenhöhe in Chromium (`scrollHeight`, r4-43 aus `main` gegenüber r4-44):

| Seite | 390 px vorher → nachher | 1440 px vorher → nachher |
|---|---|---|
| Alltag und Beziehungen | 13 977 → 14 586 (+4,4 %) | 9223 → 9864 (+7,0 %) |
| Grenzen setzen | 17 237 → 17 686 (+2,6 %) | 11 569 → 11 931 (+3,1 %) |
| Zugewandt und klar sprechen | 14 638 → 15 001 (+2,5 %) | 9867 → 10 201 (+3,4 %) |
| Wenn Ihr jugendliches Kind betroffen ist | 7718 → 7904 (+2,4 %) | 5238 → 5447 (+4,0 %) |
| Genesung | 13 684 → 13 987 (+2,2 %) | 9295 → 9468 (+1,9 %) |
| Ihre Rolle klären | 10 324 → 10 532 (+2,0 %) | 7075 → 7239 (+2,3 %) |
| Kinder | 8742 → 8897 (+1,8 %) | 6250 → 6411 (+2,6 %) |
| Auf sich achten | 14 089 → 14 312 (+1,6 %) | 9993 → 10 210 (+2,2 %) |
| Diagnose | 14 748 → 14 893 (+1,0 %) | 9762 → 9824 (+0,6 %) |
| Behandlung | 18 784 → 18 875 (+0,5 %) | 12 161 → 12 198 (+0,3 %) |
| Borderline verstehen | 14 313 → 14 201 (−0,8 %) | 9660 → 9641 (−0,2 %) |

Die Kästen kosten Platz (Innenabstand und Etikettzeile), höchstens 7 % auf «Alltag und Beziehungen» mit acht Kästen. Die Anspannungskurve ist bei 375 px 1926 px hoch statt 2037 px (r4-43). Sie liegt weiter über der Grenze des Layouttests von 1800 px (bekannte Ausnahme B2c).

## Ausgeführte Prüfungen

Lokal ausgeführt mit Node 22.22.0, Chromium und Playwright 1.63.0 über `PLAYWRIGHT_MODULE`:

| Prüfung | Ergebnis |
|---|---|
| Selbsttest `selftest.mjs` | 84/84 bestanden |
| Produktionsgate `build.mjs --production` | 23 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, unverändert) |
| Parität `--verify-site` | bestanden, 34 Dateien byte-gleich mit `site/` |
| Suchtest `suchtest.mjs` | 216 von 216 Erwartungen |
| Sprach-/UI-Test `sprachtest.mjs` | 73 Prüfungen bestanden, JS-Fehler 0 |
| Layouttest `layouttest.cjs` | 230 Zustände, 25 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, Ausnahme B2c) |
| Wortlaut | Text aller zehn geänderten Seiten ohne Tags gleich (ausser dem Doppelpunkt im Etikett) |
| Sichtprüfung | Kästen in Fliesstext, in Definitionslisten, nach Abbildungen und am Abschnittsanfang bei 390 und 1440 px. Beide Vertiefungen eingeklappt |

**Nicht geprüft:** Screenreader (keiner verfügbar), Safari und Firefox, reale Geräte. Erzwungene Farben und Druck sind nur über die bestehenden Regeln abgedeckt (`.bl-tun` mit Rahmen bzw. `break-inside:avoid`); eine eigene Sichtprüfung fehlt.

## Offen

- Screenreader-Prüfung; Nachprüfung durch eine Sitzung, die nicht gebaut hat.
- Schritt 3 des Gestaltungssystems (Struktur, Navigationsnamen, Startseite). Braucht die Freigabe von E2 und E8.
- Die Namensräume der Klassen (D1, 197 Klassen aus fünf Präfixen) sind nicht bereinigt. Das ist für Leserinnen und Leser unsichtbar und würde freigegebene Abbildungen berühren.

## Bildschirmfotos

- `vorher-nachher-beziehungen-stationen-390.png`: Stationenliste mit fünf Kästen
- `vorher-nachher-grenzen-erkennen-1440.png`: Kasten mit Liste
- `vorher-nachher-verstehen-kurve-1440.png`: Anspannungskurve, Grenzen in der Vertiefung
