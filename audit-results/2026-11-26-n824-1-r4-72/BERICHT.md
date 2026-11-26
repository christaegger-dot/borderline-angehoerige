# r4-72 · Korrektur N824-1 (Überlauf bei kleiner Standardschrift) und Werkzeugänderung aus #795 · 26.11.2026 · Selbstprüfung

**Anlass:** Die Nachprüfung von r4-70 und r4-71 ([PR #827](https://github.com/christaegger-dot/borderline-angehoerige/pull/827)) meldet N824-1 (mittel): eine Regression von r4-71, gebaut von dieser Sitzung. Die Sitzung hat die Korrektur am 26.11.2026 als nächsten Schritt nach #828 angekündigt.

**Entscheid von Christa Egger, 26.11.2026 (Auswahl in der Sitzung) zu [PR #795](https://github.com/christaegger-dot/borderline-angehoerige/pull/795):** «Beim nächsten Release mitnehmen».

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

- **Ausgangsstand:** `main` bei `9a5341c` (#828), Website r4-71.
- **Unabhängigkeit:** Gebaut von der Sitzung, die r4-70 und r4-71 gebaut hat; sie korrigiert ihren eigenen Fehler. Prüfen muss eine andere Sitzung.
- **Umgebung:** Node 22.23.5, Playwright 1.64.0, Chrome Headless Shell 156.0.8078.4 (Revision 1248), axe-core 4.14.0 aus einem Ordner ausserhalb des Repositorys.

## Der Fehler (N824-1)

- Seit r4-71 stehen die Direkteinstiege mit Skript bis 760 px nur im Menü: `@media (max-width:760px){…}`, in `px`.
- Das Menü wird ab 50rem zur waagrechten Leiste mit `white-space:nowrap`, in `rem`.
- Bei Standardschrift 16 px sind 50rem 800 px; die Bereiche überschneiden sich nicht. Ist die Standardschrift kleiner als rund 15 px, liegt 50rem unter 760 px. Dazwischen standen alle acht Links in einer Zeile, und die Seite lief seitlich über.

## Änderungen

- **`authoring/css/site.css`:** Die Regel gilt nur noch, solange das Menü ein Aufklappmenü ist: `@media (max-width:760px) and (max-width:49.99rem)`. Das ist der erste der zwei Wege, die die Nachprüfung vorschlägt.
- **`authoring/tools/layouttest.cjs`:** neue Probe «no overflow with small default font» für 12, 13, 14 und 15 px Standardschrift, je bei 560 bis 800 px in 20er-Schritten. Sie verlangt: kein waagrechter Überlauf und kein sichtbarer Direkteinstieg ausserhalb des Bildschirms.
- **`authoring/tools/contract.js`, aus #795 (dort r4-67, Befund N62-2):** `inSvg` behandelt HTML in `<foreignObject>` wie Chromium als HTML; dazu die zwei Selbsttestfälle aus #795 (N62-2 und die Gegenprobe N67-2). Übernommen per 3-Wege-Patch aus `93c91d2`, ohne dessen Kennung. Kommentare und Fallnamen nennen jetzt r4-72 und die Herkunft.
- **Kennung r4-72:** `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo` (ergänzt um «r4-71 am 26.11.2026 gemergt (PR #824), nachgeprüft in PR #827»).

Wortlaut und Skript sind unverändert. Ersetzt man in `site/` r4-71 durch r4-72, unterscheidet sich nur `css/site.css`, und dort nur diese eine Regel mit ihrem Kommentar.

**Nicht enthalten:** die Berichtigung der Nummernhistorie in `site.config.json` (N65-2, N65-8, N65b-2, N65b-3, N66-5, N66-4). Sie bleibt offen.

## Wirkung

`kleinschrift.cjs` (Ausgabe `kleinschrift-ausgabe.txt`): Startseite und «Krisen begleiten», mit Skript, 560 bis 800 px.

| Standardschrift | r4-71: Überlauf | r4-72: Überlauf |
|---|---|---|
| 12 px | 600 bis 760 px, 209 bis 55 px; «Nachschlagen» und «Suchen» ausserhalb des Bildschirms | keiner |
| 13 px | 660 bis 760 px, bis 196 px | keiner |
| 14 px | 700 bis 760 px, bis 190 px | keiner |
| 15 px | 760 px, 173 px | keiner |
| 16 px | keiner | keiner |

Die Werte für r4-71 stimmen mit der Nachprüfung überein.

**Unverändert bei Standardschrift 16 und 32 px** (`kopf-ausgabe.txt`): Kopfhöhe, Sichtbarkeit der Zeile und Menüknopf sind bei 375, 360, 768, 820 und 1440 px gleich wie in r4-71 (zum Beispiel 375 px: Kopf 148 px, Zeile aus, Menü).

## Ausgeführte Prüfungen

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel site` |
| `--verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | `127/127 bestanden` (zwei neue Fälle aus #795) |
| Suchtest | `216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| Sprach-/UI-Test | `73 Prüfungen bestanden · JS-Fehler 0` |
| Layouttest | `240 Seitenzustände, 38 Bedienproben, 2 Abweichungen`, Exit 1: Sicherheitskarte bei 375 × 667 und 360 × 740, wie vorher. Die vier neuen Proben bestehen. |
| Gegenprobe (`gegenprobe.txt`): neuer Layouttest auf `site/` von r4-71 | 6 Abweichungen: die vier neuen Proben schlagen fehl, mit den Werten der Tabelle oben |
| Überlauf bei 100, 200 und 300 % Schrift, 320, 375 und 768 px, alle Seiten | 0 von 216 Läufen, vorher wie nachher |
| axe-core 4.14.0, 390 und 1280 px mit Standardschrift, 320 und 1440 px mit 200 % Schrift | `build r4-72 · Seiten: 24 · Läufe: 96 · Verstösse: 0` |

## Offen

- Nachprüfung durch eine andere Sitzung; Merge nur auf Auftrag.
- #795 schliessen, sobald r4-72 auf `main` ist.
- N824-3 (Layouttest-Probe zum ersten Krisenschritt, Probe für die «144») ist nicht Teil dieses Release.
- Die Umbrüche im Stylesheet sind weiter teils in `px`, teils in `rem` gesetzt (N815-7). Diese Korrektur behebt nur die Überschneidung aus r4-71.
