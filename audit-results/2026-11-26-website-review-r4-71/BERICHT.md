# r4-71 · Website-Review: Entscheide zu den Punkten 1, 3, 6, 8 und 9 · 26.11.2026 · Selbstprüfung

**Auftrag von Christa Egger, 26.11.2026:** «bearbeite: Aus dem Review warten ausserdem auf deinen Entscheid: 1 (Notrufnummern auf «Krisen begleiten» am Telefon), 3 (Kopf am Telefon, löst auch 2), 6 (Texte unter 16 px), 8 (doppelter Satz auf der Suchseite) und 9 (Platzhalter).»

Die Sitzung hat die Varianten zuerst am gerenderten Stand r4-70 gemessen, ohne etwas am Repository zu ändern, und sie Christa Egger mit den Messwerten zur Auswahl vorgelegt. **Entscheide von Christa Egger am 26.11.2026 (Auswahl in der Sitzung):**

| Punkt | Entscheid |
|---|---|
| 1 · Notrufnummern auf «Krisen begleiten» | «Kasten vor die Schritte» |
| 3 · Kopf am Telefon (löst teilweise 2) | «Direkteinstiege ins Menü» |
| 6 · Texte unter 16 px | «Alles auf 16 px» |
| 8 · doppelter Satz auf der Suchseite | «Doppelten Satz streichen» |
| 9 · Platzhalter im Suchfeld | keine Fassung gewählt, **keine Änderung** (P4-3 bleibt offen) |

Nicht gewählt wurden diese Varianten:
- 1: «Nummern in Schritt 3» (neuer Wortlaut) und «So lassen»;
- 3: «Menü + Startseite straffen», «Menü + nur ein Satz nach unten» und «So lassen»;
- 6: «Nur 13 px auf 16 px» und «So lassen».

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

- **Ausgangsstand:** `main` bei `8071c22`, Website r4-70 (#822).
- **Unabhängigkeit:** Gebaut von der Sitzung, die #809, #813, #815 und #822 gebaut hat. Prüfen muss eine andere Sitzung.
- **Umgebung:** Node 22.23.5, Playwright 1.64.0, Chrome Headless Shell 156.0.8078.4 (Revision 1248), axe-core 4.14.0 aus einem Ordner ausserhalb des Repositorys.

## Änderungen

- **Punkt 1, `authoring/content/krise.html`:** Im Abschnitt «Das Wichtigste» steht der Platzhalter `<p data-responsibility-inline></p>` vor statt nach den drei Schritten. Den Wortlaut füllt wie bisher der fachlich freigegebene Akuthinweis aus `site.config.json` › `responsibility.inline` (r4-38, freigegeben am 18.10.2026). Der Wortlaut ist unverändert, nur die Reihenfolge ist neu.
- **Punkt 3, `authoring/css/site.css`:** Bis 760 px Breite und mit Skript (`html[data-puk-js]`) ist die Zeile mit «Kurz und klar», «Nachschlagen» und «Suchen» unter dem Absender ausgeblendet. Die drei Links erscheinen im Menü unter den fünf Hauptbereichen; dort waren sie bisher nur unter 20rem eingeblendet. Ohne Skript bleibt die Zeile, damit das dann offene Menü weiter nur die fünf Hauptbereiche zeigt (Layouttest «no JS five navigation links visible»).
- **Punkt 6, `authoring/css/site.css`:** `:root{--size-body-sm:1rem;--size-caption:1rem}` statt .9375rem und .8125rem. Ausserdem fällt die Verkleinerung der Direkteinstiege auf .9375rem unter 22.5rem weg. Im Druck gilt weiter die verkleinerte Druckgrösse.
- **Punkt 8, `authoring/content/suche.html`:** Im Absatz unter dem Formular ist der erste Satz «Suchen Sie mit Ihren eigenen Worten.» gestrichen. Er steht weiter als Einleitung oben.
- **Kennung r4-71:** `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo` sind angepasst. `appliedTo` ist ergänzt um «r4-70 am 26.11.2026 gemergt (PR #822)».

Skript, Suche und Testdateien sind unverändert. Ersetzt man in `site/` r4-70 durch r4-71, unterscheiden sich nur `krise.html`, `suche.html` und `css/site.css`.

## Wirkung (Vorher r4-70, Nachher r4-71)

Messung mit `vergleich.cjs`, Ausgabe in `vergleich-ausgabe.txt`, Bilder unter `bilder/`:

| Telefon | Kopf | Sicherheitskarte Startseite | «144» auf «Krisen begleiten» | erster Krisenschritt |
|---|---|---|---|---|
| 390 × 844 | 192 → 148 px | 815 → 771 (beide im 1. Bildschirm) | 884 → 477 ✓ | 403 → 765 |
| 375 × 812 | 192 → 148 | 846 → **802 ✓** | 912 → **505 ✓** | 431 → 793 |
| 360 × 740 | 192 → 148 | 907 → 863 ✗ | 973 → **536 ✓** | 431 → 823 |
| 375 × 667 | 192 → 148 | 846 → 802 ✗ | 912 → **505 ✓** | 431 → 793 |

**Folge von Entscheid 1:** Die Notrufnummern stehen jetzt auf allen geprüften Telefonen im ersten Bildschirm. Dafür beginnen die drei Schritte tiefer. Bei 375 × 812 liegt der Anfang des ersten Schritts noch knapp im ersten Bildschirm (793 px), bei 360 × 740 und 375 × 667 darunter. Die Layouttest-Probe «first crisis step below first screen» (nur 375 × 812) besteht.

**Weitere Messungen:**
- **Menü mit Skript, 375 px:** Verstehen, Im Alltag, Krisen, Familie, Für Sie, dann Kurz und klar, Nachschlagen, Suchen (Bild `nachher-menue-375x812.png`). Ohne Skript, 375 px: Die Zeile mit den Direkteinstiegen bleibt sichtbar, das Menü zeigt 5 Links, vorher wie nachher.
- **Text unter 16 px** (alle Seiten, Vertiefungen offen, 320, 360, 375, 768 und 1440 px): vorher 161 bis 231 Stellen mit 15 px und 49 mit 13 px, nachher keine.
- **Anspannungskurve bei 375 px:** Die Figur wird 2029 statt 1992 px hoch (Grenze 2400 px). Die vierte Phase endet unverändert bei 1603 px (Grenze 1800 px).
- **Suchseite:** «Suchen Sie mit Ihren eigenen Worten.» steht vorher 2-mal, nachher 1-mal im Hauptinhalt.
- **Waagrechter Überlauf** bei 100, 200 und 300 % Schrift, 320, 375 und 768 px, alle Seiten (`audit-results/2026-11-26-website-review-r4-70/ueberlauf-300.cjs`): vorher 0 und nachher 0 von je 216 Läufen.

## Ausgeführte Prüfungen

Ausgaben in `tests-ausgabe.txt`, `axe-ausgabe.txt` und `ueberlauf-300-ausgabe.txt`:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel site` |
| `--verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | `125/125 bestanden` |
| Suchtest | `216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| Sprach-/UI-Test | `73 Prüfungen bestanden · JS-Fehler 0` |
| Layouttest | `240 Seitenzustände, 30 Bedienproben, 2 Abweichungen`, Exit 1: Sicherheitskarte bei 375 × 667 (802 px) und 360 × 740 (863 px). Die Probe bei 375 × 812 besteht jetzt. B2c bestanden (Figur 2029 px). |
| axe-core 4.14.0, 390 und 1280 px mit Standardschrift, 320 und 1440 px mit 200 % Schrift | `build r4-71 · Seiten: 24 · Läufe: 96 · Verstösse: 0` |

## Offen

- **Punkt 2 auf kleinen Telefonen:** Bei 375 × 667 und 360 × 740 liegt die Sicherheitskarte weiter unter dem ersten Bildschirm; die zwei Layouttest-Proben bleiben rot. Gemessen am Stand r4-70 mit Direkteinstiegen im Menü: Rückt der Satz «Die Fachstelle Angehörigenarbeit der PUK hat diese Orientierungshilfe als Ergänzung zu ihrer Beratung erstellt.» unter die Anliegen und entfällt «Beginnen Sie bei Ihrer aktuellen Frage. Die Seiten bauen nicht aufeinander auf.», liegt die Karte auf allen drei Telefonen im ersten Bildschirm (583–614 px). Diese Variante ist nicht gewählt.
- **Punkt 9 (P4-3):** Der Platzhalter bleibt bis 390 px abgeschnitten.
- Nachprüfung durch eine andere Sitzung; Prüfung auf einem echten Gerät; Merge nur auf Auftrag.
