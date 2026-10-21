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

1. **Neuer Beispielsatz** «Du willst mich doch nur provozieren.» (verstehen › eisberg) ist als Musterentwurf gekennzeichnet und braucht die fachliche Freigabe.
2. **Überschriften in Rubik Medium (500).** Das CD Manual nennt Light und Regular für Text.
3. **Grundfläche #F5F7FF** ist eine Schattierung von PUK-Blau unter 25 %.
4. **Einspaltige Abschnitte gelten für alle Seiten** (`.puk-longform__section-grid`). Alle übrigen Seiten bei 1280 px und 360 px ansehen, besonders Figuren und Akkordeons.
5. **Kopf und Menü:** Nur die Abstände wurden verdichtet. Das Verhalten der Navigation (Menü) erzeugt der Renderer und wurde nicht geändert.
6. **Fusszeile** wurde nicht umgestaltet. Der Entwurf zeigte sie dunkel; bei Bedarf als eigener Schritt.
7. **Bild im Einstieg** der Startseite: Im Entwurf steht dort ein Platzhalter, die echte Website hat keinen. Erst mit einer freigegebenen Zeichnung ergänzen.
8. **Anspannungskurve** ohne Achsen, wie im Plan festgehalten («keine Skala, keine Zahlen, keine Achse», Entscheid Fachstelle 09.10.2026).
9. **Momentaufnahmen:** Eine Zeichnung durch eine Illustratorin wird empfohlen.
10. **Prüfstufen** Visualisierungs-Check, Bedienung und Barrierefreiheit (Tastatur, 200 % Text, erzwungene Farben, reduzierte Bewegung) sowie W3 sind für diese Änderung offen. Sie werden in einer Sitzung geprüft, die nicht gebaut hat.

## Pull Request

Als Entwurf eröffnen, mit Verweis auf diese Datei und die offenen Stufen. `site/` erst nach Freigabe in einem separaten PR neu schreiben.
