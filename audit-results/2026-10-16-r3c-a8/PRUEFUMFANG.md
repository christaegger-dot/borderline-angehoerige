# Prüfumfang R3C-A8 · Visualisierungs-Check und R2 der Abbildungen nach Release C

Der Bericht steht in `authoring/PRUEFBERICHT.md`, Abschnitt «Visualisierungs-Check und R2 der Abbildungen nach Release C (R3C-A8, Stand 03cb635)». Dieser Ordner enthält nur die Nachweise: `METADATEN.json`, `BEFUNDE.csv`, `TESTMATRIX.csv` und die Skripte in `skripte/`.

## Geprüft

- **Stand:** `main` am Commit `03cb635` (Build r4-34), `site/` über einen lokalen Server auf 127.0.0.1. Produktion nur gelesen (Text in `main` und `css/site.css` gleich).
- **13 Abbildungen:** `v-vs-eisberg`, `v-vs-anspannung`, `v-vs-bewertungen` (`verstehen`), `v-bz-schleife`, `v-bz-sichten` (`beziehungen`), `v-ro-weg` (`rolle`), `v-gr-dear` (`grenzen`), `v-be-kontakt` (`behandlung`), `v-ko-tassen` (`kommunizieren`), `v-ki-alltag` (`kinder`), `v-sf-abend` (`selbstfuersorge`), `v-ge-forschung`, `v-ge-trieb` (`genesung`).
- **Eine Textdarstellung:** Tabelle «Sechs Stufen der Validierung» (`kommunizieren` › `anerkennen`).
- **Punkte:** Teil 1 (1 bis 25, davon 1 bis 19 aus Leitlinie 07) und Teil 2 (B1 bis B6, Bewertung). Teil 3 (Lesetest) und Kennzahlen entfallen laut Auftrag.
- **Grundlagen:** Leitlinien `00-visuelle-wissensvermittlung.md`, `07-visualisierung-umsetzen.md`, `06-langform-und-psychoedukation.md`, `00-sprache-und-ton.md`, `README.md` › «Zuständigkeit statt Krisenzugang» (Design-System-Artefakt, Fassung `1792129173-abbb`); `authoring/site.config.json` › `visualPlan`; `WORTLAUT.md` und `FREIGABE.md` von Release C; Freigabe von Release B (`2026-10-14-delta-release-b-r4-27/FREIGABE.md`).

## Nicht geprüft

Lesetest mit Menschen; fachliche Richtigkeit (eine Frage als Prüfbedarf A8-11); reale Screenreader, Tastaturen, Touch und Geräte; Firefox und WebKit; Silbentrennung mit Trennwörterbuch; Druckansicht. Gegenprobe-Fotos bei 100 % im vollen Chromium sind gemessen, angesehen nur `v-be-kontakt` bei 1280 px.

## Fotos

Im Repository liegen keine Fotos (auch sonst keine Bilder in `audit-results/`). Die 133 Fotos und 28 Gegenprobe-Fotos lassen sich mit den Skripten aus `03cb635` neu erzeugen. Eine Wiederholung am 16.10.2026 ergab bei allen 98 Messungen bei 100 % und allen 84 bei 200 % dieselben Werte (Überlauf, Text ausserhalb, Wortbrüche, Überlappungen).

## Wiederholen

Voraussetzung: Node mit Playwright, Chromium (voller Browser für 200 %), Python 3 mit BeautifulSoup und Pillow. `PLAYWRIGHT_MODULE` zeigt auf das Playwright-Modul, falls es nicht global installiert ist.

1. `site/` aus `03cb635` lokal ausliefern, z. B. `python3 -m http.server <port> --bind 127.0.0.1` im Ordner `site/`.
2. `node skripte/fotos.js <url> <ausgabe>`: Fotos bei 1280 und 360 px (Standard, «kontrast»), ohne Text, Zeichnung allein, sieben Abschnitte bei 360 px; Messungen bei 100 % in `messung.json`.
3. `node skripte/schrift32.js <url> <ausgabe> <profil> 32`: 200 % bei 320 bis 1440 px, Fotos bei 1280 und 360 px, `messung-schrift32.json`. Mit `16` statt `32` die Gegenprobe bei 100 %.
4. `node skripte/kern768.js <url> <ausgabe> <profil>`: drei Kernaussagen bei 768 px mit 200 % (A8-10).
5. `node skripte/tablewrap.js <url> <profilbasis>`: waagrechtes Scrollen der Tabelle (A8-07).
6. `node skripte/profil-probe.js <url> <profil> <foto.png>`: zeigt, dass die Schriftgrösse aus dem Profil nach einem Foto erhalten bleibt.
7. `python3 -I skripte/figtext.py <basis>`: Wortlaut je Figur alt gegen neu (Ordner `old/` und `new/` laut Kopf des Skripts); `python3 -I skripte/sectext.py <seite.html> <abschnitt>`: Text eines Abschnitts mit Kennzeichnung (Figur, Vertiefung, nur Screenreader).
8. `python3 -I skripte/montage.py <fotos> <ausgabe>`: Bildtafeln zum Ansehen.

Die Skripte enthalten keine Probensätze und keine Inhalte der Website; sie lesen nur die gebauten Seiten.
