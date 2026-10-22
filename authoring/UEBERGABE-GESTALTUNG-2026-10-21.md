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

1. **Zwei neue Beispielsätze** (verstehen › eisberg): «Du willst mich doch nur provozieren.» und «Deine Stimme wird lauter. Wie ist es gerade für dich?». Beide sind als Musterentwurf gekennzeichnet und brauchen die fachliche Freigabe. Das Gate erkennt die ausstehende Freigabe nicht; vor dem Neuschreiben von `site/` von Hand prüfen.
2. **Überschriften in Rubik Medium (500).** Das CD Manual nennt Light und Regular für Text.
3. **Grundfläche #F5F7FF** ist eine Schattierung von PUK-Blau unter 25 %.
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

## Pull Request

Als Entwurf eröffnen, mit Verweis auf diese Datei und die offenen Stufen. `site/` erst nach Freigabe in einem separaten PR neu schreiben.
