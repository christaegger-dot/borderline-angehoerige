# r4-70 · Website-Review: Punkte 4, 5, 7, 10 und Telefonproben · 26.11.2026 · Selbstprüfung

**Auftrag von Christa Egger, 26.11.2026:** «starte mit: Ohne fachlichen Entscheid umsetzbar sind 4, 5, 7 und 10; dazu im Layouttest die zusätzlichen Telefongrössen aus Punkt 2.»

Grundlage ist ein Website-Review derselben Sitzung (Skill «web-review»). Die Website wurde in Chromium bei 375, 768 und 1440 px gerendert, dazu bei 360 × 740, 375 × 667 und 390 × 844 und auf der Startseite nur mit der Tastatur. Die Punktnummern stammen aus diesem Review, das nur im Gespräch berichtet wurde.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

- **Ausgangsstand:** `main` bei `ff5c8d0`, Website r4-69 (#821).
- **Kennung:** r4-70. r4-67 ist übersprungen (Entscheid Christa Egger), r4-69 ist mit #821 auf `main`.
- **Unabhängigkeit:** Gebaut von der Sitzung, die #809, #813 und #815 gebaut hat. Prüfen muss eine andere Sitzung.
- **Umgebung:** Node 22.23.5, Playwright 1.64.0, Chrome Headless Shell 156.0.8078.4 (Revision 1248), axe-core 4.14.0 aus einem Ordner ausserhalb des Repositorys.

## Änderungen

| Punkt | Befund im Review | Änderung |
|---|---|---|
| 4 · Absenderzeile auf dem Tablet | Bei 780 bis 900 px stand «Beratung:» am Zeilenende und die Adresse allein auf der nächsten Zeile | Im Seitenrahmen (`contract.js`) stehen «Beratung:» und Adresse in der neuen Gruppe `.puk-site-sender__beratung`, die als Ganzes umbricht. Der zusätzliche Abstand von 8 px vor «Beratung:» steht jetzt rechts am vorderen Element statt links an der Bezeichnung. So beginnt eine umbrochene Zeile nicht eingerückt, und auf dem Desktop bleiben es 16 px. |
| 5 · Zeilenlänge | Bei 1440 px rund 148 Zeichen je Zeile in Vertiefungen, rund 113 in Bildunterschriften (`max-width:80ch`) und rund 130 in der Einleitung von «Krisen begleiten» (eigener Abschnitt `.bl-crisis-intro` ausserhalb des Seitenkopfs, ohne Lesebreite) | `.puk-vis-more__body p` und `.puk-vis-caption` neu `max-width:36em` (bei 15 px rund 540 px, bei 20 px 720 px wie `--lesebreite`); `.bl-crisis-intro>*` erhält `--lesebreite` wie der Seitenkopf |
| 7 · «Wenig Zeit oder Kraft?» | 0 px Abstand zum Kartenraster: `.puk-longform__copy p` setzt den oberen Rand auf 0 und ist spezifischer als `.puk-site-quick-entry` | `.puk-site-paths+.puk-site-quick-entry{margin-top:var(--space-5)}` |
| 10 · Brotkrümel | Auf der Suchseite begann bei 375 px die zweite Zeile mit «/» | Das Trennzeichen steht als `::after` hinter dem vorderen Eintrag statt als `::before` vor dem nächsten |
| 2 · Telefonproben im Layouttest | Die Sicherheitskarte der Startseite wurde nur bei 390 × 844 und 1024 × 768 geprüft | `layouttest.cjs` prüft zusätzlich 375 × 812, 375 × 667 und 360 × 740, nach dem Laden der Schriften, und nennt bei einer Abweichung die gemessene Lage |

Wortlaut, Skript und Suche sind unverändert.

**Gestaltung:** Bildunterschriften waren vorher auf `80ch` begrenzt; jetzt sind es 36em. Das ist eine bewusste Änderung am Stylesheet und keine Nebenwirkung.

## Wirkung

In `site/` ändern sich die 24 HTML-Seiten und `css/site.css`. Ersetzt man in der alten Fassung r4-69 durch r4-70, ändert sich je HTML-Seite nur die Zeile mit der Absenderzeile: Die Gruppe `<span class="puk-site-sender__beratung">` umschliesst neu Bezeichnung und Adresse.

Vorher/Nachher (`vergleich.cjs`, Ausgabe `vergleich-ausgabe.txt`, Bilder unter `bilder/`):

| Messung | Vorher (r4-69) | Nachher (r4-70) |
|---|---|---|
| Absenderzeile: Adresse ohne «Beratung:» auf eigener Zeile (760–1440 px, Schritt 20) | 780–900 px | nie |
| Absenderzeile: umbrochene Zeile eingerückt | nie | nie |
| Abstand Name → «Beratung:» bei 1440 px | 16 px | 16 px |
| Längste Zeile in Vertiefungen bei 1440 px | 148 Zeichen | 78 |
| Längste Zeile in Bildunterschriften bei 1440 px | 113 | 76 |
| Längste Zeile in der Krisen-Einleitung bei 1440 px | 130 | 71 |
| Abstand Kartenraster → «Wenig Zeit oder Kraft?» bei 375 / 1440 px | 0 / 0 px | 20 / 20 px |
| Brotkrümel Suche, 375 px: zweite Zeile beginnt mit | «/» | «Website durchsuchen» |

Waagrechter Überlauf bei 100, 200 und 300 % Schrift, 320, 375 und 768 px, alle 24 Seiten (`ueberlauf-300.cjs`): vorher 0 und nachher 0 von je 216 Läufen.

## Ausgeführte Prüfungen

Ausgaben in `tests-ausgabe.txt` und `axe-ausgabe.txt`. Das axe-Skript ist `audit-results/2026-11-26-text-scale-r4-68/axe.cjs`.

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel site` |
| `--verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | `125/125 bestanden` |
| Suchtest | `216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| Sprach-/UI-Test | `73 Prüfungen bestanden · JS-Fehler 0` |
| Layouttest | `240 Seitenzustände, 30 Bedienproben, 3 Abweichungen`, Exit 1: genau die drei neuen Proben (siehe unten). B2c ist bestanden. |
| axe-core 4.14.0, 390 und 1280 px mit Standardschrift, 320 und 1440 px mit 200 % Schrift | `build r4-70 · Seiten: 24 · Läufe: 96 · Verstösse: 0` |

## Bewusst offen: Layouttest mit drei Abweichungen

Die drei neuen Proben schlagen fehl, weil die Sicherheitskarte der Startseite dort unter dem ersten Bildschirm liegt:

| Viewport | Lage der Sicherheitskarte |
|---|---|
| 375 × 812 | 846 px |
| 375 × 667 | 846 px |
| 360 × 740 | 907 px |

Das ist Punkt 2 des Reviews. Gelöst wird er erst mit einem Entscheid zum Kopf am Telefon (Punkt 3, heute 192 px hoch). Die Proben sind nicht als Ausnahme gewertet. Sie sollen sichtbar bleiben, bis der Punkt gelöst ist.

## Nicht in diesem Auftrag

Diese Punkte brauchen einen fachlichen Entscheid, einen Gestaltungsentscheid oder eine Freigabe des Wortlauts:
- 1: Notrufnummern auf «Krisen begleiten» am Telefon unter dem ersten Bildschirm;
- 3: Höhe des Kopfs am Telefon;
- 6: Texte unter 16 px;
- 8: doppelter Satz auf der Suchseite;
- 9: abgeschnittener Platzhalter (P4-3).

Ausserdem offen: 11 (Vorschaubild) und 12 (Raster auf der Startseite).
