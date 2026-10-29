# N49-1 und N51-1 · r4-52 · 29.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 29.10.2026:** «Nachbesserung N49-1 und N51-1 umsetzen». Zu N49-1 hat sie unter drei vorgelegten Lösungen entschieden: «Band ausblenden». Ausgangsstand ist `main` = `31ba96f` (r4-51, Nachprüfungen r4-47 bis r4-51 gemergt).

Die Befunde stammen aus:

- `audit-results/2026-10-29-nachpruefung-r4-47-r4-49/NACHPRUEFUNG.md` (N49-1)
- `audit-results/2026-10-29-nachpruefung-r4-50-r4-51/NACHPRUEFUNG.md` (N51-1)

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Rollenwechsel:** Diese Sitzung hat die drei Nachprüfungen r4-43 bis r4-51 erstellt und baut jetzt r4-52. Für r4-52 ist sie damit nicht mehr unabhängig. Eine Nachprüfung von r4-52 muss eine andere Sitzung machen.

## N49-1 · Titelbild auf dem Handy

### Befund

Seit r4-49 schob das Titelbild-Band unter dem Einstieg die Einstiegskarte «Ich sorge mich um Sicherheit, Selbstgefährdung oder Gewalt.» nach unten. Bei 390 × 844 stand die Karte deshalb nicht mehr im ersten Bildschirm.

### Umsetzung

`authoring/css/site.css`, nach der Regel `.bl-titelbild`:

```css
@media (max-width:61.99rem){.bl-titelbild{display:none}}
```

- **Unter 62 rem (992 px)** gibt es kein Titelbild.
- **Ab 62 rem** steht es unverändert rechts neben Titel und Einleitung.
- **Bei erzwungenen Farben und im Druck** bleibt es wie bisher ausgeblendet.
- **Markup:** Die Band-Fassung des SVG bleibt in `index.html`. Sie ist für Screenreader verborgen und wird nicht mehr angezeigt. Ich habe sie nicht entfernt, damit sich das Fragment nicht ändert. Sie kann bei der nächsten Arbeit an der Startseite wegfallen.
- **Kommentar:** Der Kopfkommentar des Blocks `.bl-titelbild` ist nachgeführt.

### Messung (Chromium, Startseite, oberer Rand der Sicherheitskarte)

| Fenster | r4-48 | r4-51 | **r4-52** |
|---|---|---|---|
| 390 × 844 | 783 px, sichtbar | 902 px, nicht sichtbar | **783 px, sichtbar** |
| 768 × 1024 | 743–915 px, ganz sichtbar | 895–1067 px, angeschnitten | **743–915 px, ganz sichtbar** |
| 375 × 667 | 844 px | 960 px | 844 px |
| 320 × 568 | 989 px | 1091 px | 989 px |
| 1440 × 900 | 690–806 px | 690–806 px | 690–806 px |

Das Titelbild ist 0 × 0 bei 320, 390 und 768 px sowie bei 390 px mit 200 % Schrift. Bei 1024 px ist es 447 × 268, bei 1280 und 1440 px 480 × 288, also wie in r4-51.

Bei 375 × 667 und 320 × 568 stand die Karte auch vor r4-49 nicht im ersten Bildschirm. Das liegt an Titel und Einleitung, nicht am Bild.

Foto: `startseite-erster-bildschirm-390x844-r4-52.png`. Unten beginnt die gelbe Sicherheitskarte, wie in r4-48.

### Probe im Layouttest

`authoring/tools/layouttest.cjs` hat eine neue Bedienprobe «safety card starts in first screen 390x844», jetzt 26 statt 25. Sie prüft, dass die erste Einstiegskarte der Startseite bei 390 × 844 vor 844 px beginnt.

- Auf r4-52 ist sie erfüllt.
- Auf r4-51 wäre sie gescheitert (902 px, Messung oben).

## N51-1 · Gate prüft fehlende Direkteinstiege im Menü

### Befund

Die Regel aus r4-51 meldete nur Abweichungen, wenn Einträge vorhanden waren (`menuUtility.length && …`). Fehlten alle Direkteinstiege im Menü, blieb sie still. Unter 20 rem wären «Kurz und klar», «Nachschlagen» und «Suchen» dann nicht erreichbar gewesen.

### Umsetzung

`authoring/tools/contract.js`, Regel `nav`:

- **Neue Bedingung:** Die Prüfung gilt jetzt auch ohne Einträge, wenn die Seite ein Menü (`data-puk-disclosure` in der Hauptnavigation) **und** die Zeile «Direkteinstiege» hat. Die 404-Seite hat keine Direkteinstiege und ist nicht betroffen.
- **Neuer Selbsttestfall:** «Direkteinstiege im Menü fehlen (r4-52, N51-1)». Er entfernt alle Einträge aus `index.html` und erwartet `nav`. Der Selbsttest hat jetzt 88 statt 87 Fälle.
- **Build-Kennung r4-52** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`.

Kein Wortlaut geändert. Fragmente, Suche, Akuthinweise und Sprungziele sind unverändert.

## Ausgeführte Prüfungen

Lokal ausgeführt mit Node 22.22.0, Chromium und Playwright über `PLAYWRIGHT_MODULE`:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| `build.mjs --production --verify-site` | Parität bestanden, 35 Dateien byte-gleich mit `site/` |
| Selbsttest | 88/88, darunter der neue Fall |
| Suchtest | 216 von 216 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 26 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c); neue Probe erfüllt |
| axe-core 4.14.0 | 0 Verstösse auf 24 Seiten bei 390 und 1280 px (48 Läufe). Dazu 0 Verstösse mit 200 % Schrift und offenem Menü bei 320 und 1440 px (48 Läufe) |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.

## Bildschirmfoto

- `startseite-erster-bildschirm-390x844-r4-52.png`: Startseite, erster Bildschirm bei 390 × 844.
