# Titelbild der Startseite · r4-49 · 29.10.2026 · Entwurf und Selbstprüfung

**Auftrag von Christa Egger, 29.10.2026:** Zur Titelkarte «Cover» des Gestaltungssystems schrieb sie: «das hier gefällt mir super gut!». Danach: «ja, bau eine Fassung als Netlify-Vorschau» und «aber wir sind doch dabei ein neues Design zur erstellen??». Zum Nachtblau: «unbedingt beibehalten: E5 Nachtblau #182866». Ausgangsstand `main` = `cd17c2e` (r4-48).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung. **Der Stand ist eine Vorschau und nicht zum Merge bestimmt, bis Christa Egger entscheidet.**

## Was sich ändert

Die Startseite bekommt im Einstieg das Bild der Titelkarte des Gestaltungssystems. Komposition und Farben sind unverändert übernommen:

- **Vier Flächen ohne Fuge:** Blau 25 (links, niedriger), PUK Blau (hoch, über die ganze Höhe), Gelb (oben rechts), Nachtblau (unten rechts).
- **Linie:** eine weisse Kurve mit vier runden Marken. Sie ist das Motiv der Anspannungskurve aus «Borderline verstehen», ohne Nummern und ohne Beschriftung.
- **Unterzeile der Titelkarte:** Der Leitsatz «Beruhigen, ordnen, zum nächsten Schritt führen.» ist **nicht** übernommen. Er wäre neuer Wortlaut auf der Website.

**Anordnung:**

| Breite | Darstellung |
|---|---|
| ab 62 rem (992 px) | rechts neben Titel und Einleitung, 480 × 288 px bei 1440 px |
| unter 62 rem | als flaches Band derselben Anordnung unter dem Einstieg, 88 px hoch bei 390 px, 177 px bei 768 px |
| erzwungene Farben, Druck | ausgeblendet |

Das Band ist dieselbe Komposition im Verhältnis 4 : 1, die Kurve ist flacher. Die Marken bleiben rund.

**Barrierefreiheit:** Das Bild ist reiner Schmuck. Es ist mit `aria-hidden="true"` und `focusable="false"` für Screenreader und Tastatur verborgen, der Barrierefreiheitsbaum des Einstiegs ist unverändert (Titel und zwei Absätze). Die Farben stehen als Tokens im Stylesheet, nicht als Hexwerte im HTML; es gibt kein `style`-Attribut (Profilregel).

**Regeln, die sich dafür ändern** (`authoring/DARSTELLUNGSREGELN.md` und Kopfkommentar in `site.css`):

- «gelb = hier geht Schutz vor» und «nachtblau nur für das Band «Haltung»» gelten weiter, **ausser im Titelbild**. Dort tragen die Flächen keine Bedeutung.
- Nachtblau bleibt: Entscheid Christa Egger vom 29.10.2026.

**Technisch:**

- `authoring/content/index.html`: Bild im Einstieg, zwei SVG-Fassungen (breit, Band).
- `authoring/css/site.css`: Block `.bl-titelbild` nach dem Band «Haltung».
- Build-Kennung r4-49 in `contract.js`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope`, `appliedTo`.

## Wirkung auf die Startseite

| Breite | «Was beschäftigt Sie im Moment?» beginnt bei | vorher |
|---|---|---|
| 1440 px | 544 px (das Bild steht neben dem Text) | 544 px |
| 768 px | 805 px | 596 px |
| 390 px | 744 px, noch im ersten Bildschirm von 844 px | 624 px |

## Ausgeführte Prüfungen

Lokal ausgeführt mit Node 22.22.0, Chromium und Playwright 1.63.0:

| Prüfung | Ergebnis |
|---|---|
| Selbsttest | 86/86 bestanden |
| Produktionsgate | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| Parität `--verify-site` | bestanden, 35 Dateien byte-gleich mit `site/` |
| Suchtest | 216 von 216 Erwartungen |
| Sprach-/UI-Test | 73 Prüfungen bestanden, JS-Fehler 0 |
| Layouttest | 240 Zustände, 25 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, Ausnahme B2c) |
| Erzwungene Farben, Druck | Bild ausgeblendet (`display: none`) |
| 200 % Seitenzoom bei 1440 px (720 CSS-px) | Band statt breiter Fassung, kein waagrechtes Scrollen |
| 320 px | Band 70 px hoch, kein waagrechtes Scrollen |
| Sichtprüfung | 1440, 1100, 992, 768 und 390 px |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte. **Nicht geprüft ist auch die Nebenbedeutung der Kurve** (Profilregel «auf Nebenbedeutungen prüfen»): Das Motiv stammt aus einem Fachmodell. Ob es als Schmuck auf der Startseite fachlich passt, entscheidet die Fachstelle.

## Bildschirmfotos

- `vorher-startseite-1440.png`: Startseite r4-48
- `startseite-1440.png`, `startseite-768.png`, `startseite-390.png`: Startseite r4-49
