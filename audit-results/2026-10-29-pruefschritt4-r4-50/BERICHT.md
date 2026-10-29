# Prüfschritt 4 · r4-50 · 29.10.2026 · Sichtprüfung und Korrekturen

**Auftrag von Christa Egger, 29.10.2026:** «mach weiter mit Prüfschritt 4». Gemeint ist Schritt 4 des Gestaltungssystems «Borderline Angehörige». Dort heisst es: «Eine Sichtprüfung bei 320, 390, 768, 1100 und 1440 px, bei 200 % Schrift und mit erzwungenen Farben folgt.» Den Druck habe ich zusätzlich geprüft. Ausgangsstand `main` = `bce1263` (r4-49).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung. **Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte, Druck auf Papier.

## Was geprüft ist

Alle 24 Seiten aus `site/` wurden in Chromium (Playwright) geladen. Das Skript dafür liegt bei: [`durchlauf.cjs`](durchlauf.cjs), die Rohwerte in [`messwerte.json`](messwerte.json).

| Prüfung | Umfang | Ergebnis |
|---|---|---|
| Breiten | 320, 390, 768, 1100 und 1440 px, je mit Standardschrift und 200 % Browserschrift (`defaultFontSize=32`), zusammen 240 Zustände | In keinem Zustand gibt es waagrechtes Scrollen, ein Element über dem Rand oder abgeschnittenen Text. JS-Fehler: 0. |
| Erzwungene Farben | 390 und 1440 px, 48 Zustände | Alle Kästen haben einen Rahmen: Sicherheitshinweis und Akuthinweis (18), «Was Sie tun können» (74), Beispielsätze (58), Einstiegskarten (18), Band «Haltung», Vertiefungen. «Das Wichtigste» ist mit einer Linie oben markiert. Ohne Rahmen sind nur die offenen Abbildungen (`puk-vis-figure--open`), die auch normal keinen Rahmen haben. In den ersten 12 Tabulatorschritten jeder Seite hat jeder Fokus einen sichtbaren Umriss. Das Titelbild ist ausgeblendet. |
| Druck | A4, alle 24 Seiten. Drei Seiten als PDF ohne Hintergrundfarben angesehen (Startseite, Grenzen setzen, Wenn es riskant oder bedrohlich wird). | Navigation, Suche und Titelbild sind ausgeblendet. Alle Vertiefungen sind offen. Externe Links stehen mit Adresse da. Der Akuthinweis bleibt rot (Linie, 144 und 117). Das Band «Haltung» und der Hauptknopf werden dunkel mit blauem Rahmen gedruckt. |
| Sichtprüfung | Übersichtsbilder des ersten Bildschirms: 390 und 1100 px (alle Seiten), 320 px mit 200 % Schrift, erzwungene Farben, Druck | Befunde siehe unten |

Eine automatische Meldung «weisser Text im Druck» beim Hauptknopf der Startseite war ein Messartefakt. Im PDF ist der Knopf dunkel mit blauem Rahmen, und die Druckregel greift (CSS-Regelabgleich über CDP).

## Befunde

| Nr. | Gewicht | Befund | Beleg | Stand |
|---|---|---|---|---|
| P4-1 | mittel | Bei 320 und 390 px mit 200 % Schrift ist der Kopf **562 bzw. 514 px** hoch, gut 60 % des ersten Bildschirms. Der Seitentitel beginnt erst im unteren Drittel des ersten Bildschirms. Ursache: die Absenderzeile (fünf Zeilen) und die drei Direkteinstiege «Kurz und klar», «Nachschlagen», «Suchen» untereinander. Bei Standardschrift sind es 213 und 191 px. | [`kopf-320-200prozent.png`](kopf-320-200prozent.png) | **Offen, Entscheid nötig.** Vorschlag unten. |
| P4-2 | gering | Das Titelbild-Band unter dem Einstieg wuchs mit der Breite mit: bei 768 px 707 × 177 px, bei 1440 px mit 200 % Schrift über die ganze Spalte. Das Band ist reiner Schmuck und schob die Anliegen nach unten. | Messung vorher: 768 px, Anliegen ab 805 px | **Behoben in r4-50:** Das Band ist höchstens 480 px breit, also höchstens 120 px hoch. 768 px: 480 × 120, Anliegen ab 749 px. 1440 px mit 200 %: 480 × 120. Ab 62 rem steht das Bild wie bisher rechts (480 × 288 bei 1440 px). |
| P4-3 | gering | Der Platzhalter im Suchfeld von «Website durchsuchen» ist bei 390 px abgeschnitten («… Eltern oder Medikar»). Die Beschriftung «Suchwort oder Frage» steht darüber, der Platzhalter ist nur ein Beispiel. | [`uebersicht-390-b.png`](uebersicht-390-b.png) | **Offen.** Ein kürzerer Platzhalter wäre Wortlaut. |
| P4-4 | gering | Im Druck fällt die gelbe Fläche weg. Vom Sicherheitshinweis bleibt nur eine blassgelbe Linie (Gelb auf Weiss 1,2 : 1); dasselbe gilt für die Sicherheitskarte der Startseite. Die Bedeutung trägt das Etikett «Zu Ihrer Sicherheit». | [`druck-sicherheitshinweis-vorher.png`](druck-sicherheitshinweis-vorher.png) | **Behoben in r4-50:** Im Druck ist die Linie Schwarz 75 (5,9 : 1). [`druck-sicherheitshinweis-nachher.png`](druck-sicherheitshinweis-nachher.png). Am Bildschirm bleibt sie gelb. |

### Vorschlag zu P4-1

Unter 20 rem stehen die drei Direkteinstiege im Menü statt in einer eigenen Zeile. 20 rem sind bei 200 % Schrift alle Handybreiten bis 640 px, bei Standardschrift nur Breiten unter 320 px. Bei Standardschrift bleibt also alles wie heute. Das spart bei 320 px mit 200 % Schrift geschätzt 150 px.

Die Absenderzeile bleibt im Kopf, weil das Profil das verlangt. Die Änderung betrifft den Seitenrahmen (Renderer, Menü, Tests). Ich setze sie deshalb erst um, wenn Christa Egger zustimmt.

## Geändert in r4-50

- `authoring/css/site.css`:
  - `.bl-titelbild` erhält `max-width:480px` (P4-2).
  - Im Druck ist die Linie über `.puk-longform__boundary:not(.puk-site-inline-ref)` und `.bl-paths-cards li:first-child` in `--tinte-leise` (P4-4).
- Die Build-Kennung r4-50 steht in `contract.js`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`.

Kein Wortlaut geändert.

## Ausgeführte Prüfungen nach der Korrektur

| Prüfung | Ergebnis |
|---|---|
| Selbsttest | 86/86 bestanden |
| Produktionsgate | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| Parität `--verify-site` | bestanden, 35 Dateien byte-gleich mit `site/` |
| Suchtest | 216 von 216 Erwartungen |
| Sprach-/UI-Test | 73 Prüfungen bestanden, JS-Fehler 0 |
| Layouttest | 240 Zustände, 25 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, Ausnahme B2c) |
| Titelbild | 320: 280 × 70 · 390: 350 × 88 · 768: 480 × 120 · 1100 und 1440: 480 × 288 rechts · mit 200 % Schrift höchstens 480 × 120 |
| Druck | Linie über dem Sicherheitshinweis auf «Grenzen setzen» und über der Sicherheitskarte der Startseite: `rgb(100, 100, 100)`, 4 px |

## Beilagen

- `uebersicht-390-a.png`, `uebersicht-390-b.png`: erster Bildschirm aller Seiten bei 390 px
- `uebersicht-1100-a.png`, `uebersicht-1100-b.png`: dasselbe bei 1100 px
- `kopf-320-200prozent.png`: 320 px mit 200 % Schrift (zwei Seiten), daneben 320 und 390 px mit Standardschrift
- `erzwungene-farben-1440.png`: vier Seiten mit erzwungenen Farben
- `druck-startseite-vorher.png`: Startseite im Druck, Seiten 1 bis 3, dazu Seite 1 von «Grenzen setzen»
- `druck-sicherheitshinweis-vorher.png`, `druck-sicherheitshinweis-nachher.png`
- `durchlauf.cjs`, `messwerte.json`
