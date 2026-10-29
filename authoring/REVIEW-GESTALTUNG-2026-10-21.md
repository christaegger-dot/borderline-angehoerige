# Review Gestaltung · Seite für Seite · 21.10.2026

Selbstprüfung der bauenden Sitzung an den Vorschauen `borderline-angehoerige/vorschau-*.html` (neues `site.css`, gebaute Seiten r4-39 bzw. neue Inhalte für Start und Verstehen). Angesehen bei etwa 920 px und in Übersicht (Zoom 40–50 %). Ersetzt keine Prüfstufe.

Legende: **behoben** = in `authoring/css/site.css` korrigiert · **offen** = braucht Inhalts- oder Rendereränderung.

## Seitenübergreifend

| Nr. | Befund | Beleg | Status |
|---|---|---|---|
| G1 | «Auf dieser Seite» scrollte bei mittlerer Breite waagrecht, mit sichtbarer Bildlaufleiste; der letzte Punkt war abgeschnitten. | Verstehen, Beziehungen, Kommunizieren, Krise bei ~920 px | behoben: Punkte brechen um; die Leiste bleibt nur ab 1280 px beim Scrollen stehen, darunter verdeckte sie bei Sprungzielen den Abschnittskopf |
| G2 | Überschriften h2 ausserhalb der Abschnittsköpfe (z. B. «Das Wichtigste für Angehörige», «Weitere Themen») blieben im dünnen Schnitt. Dadurch war die Hierarchie uneinheitlich. | Behandlung, Kommunizieren, alle Seiten mit «Weitere Themen» | behoben: `.puk-web-h2` Medium |
| G3 | Kasten «Das Wichtigste» (`.puk-site-quick`) mit blauer Randlinie, Text über die Lesebreite. Auf «Krise» stand er bündig am linken Fensterrand. | Behandlung, Kommunizieren, Krise | behoben: weisser Kasten mit hellblauem Rahmen, Text in Lesebreite |
| G4 | «Weitere Themen in diesem Bereich» als kleine, lose blaue Links ohne Gewicht. | alle Themenseiten | behoben: Karten mit Pfeil auf heller Blaufläche |
| G5 | Tabelle «Sechs Stufen der Validierung» in der Lesespalte eingeengt, Silbentrennung und Bildlaufleiste. | Kommunizieren › Validierung | behoben: Tabelle nutzt die volle Breite |
| G6 | Zweiter Absatz im Einstieg ohne Abstand zum Einleitungstext. | Beziehungen, Kurz | behoben |
| G7 | «Was Sie tun können:» steht auf allen Seiten ausser Verstehen als fetter Satzanfang im Fliesstext, nicht als Kasten. Das ist uneinheitlich. | z. B. Beziehungen › 01, Rolle › 01, Grenzen › 07, Jugendliche › 05 | behoben in r4-44 (29.10.2026): alle 37 Stellen als Kasten `div.bl-tun`, Nachweis `audit-results/2026-10-29-bausteine-r4-44/BERICHT.md` |
| G8 | Kopf: «Kurz und klar» und «Website durchsuchen» stehen bei mittlerer Breite in einer eigenen Zeile. Der Kopf wird hoch. | alle Seiten bei ~920 px | offen: Renderer (`tools/`) |
| G9 | Fusszeile in altem Stil (graue Fläche, kleine Schrift, senkrechte Linie). Wirkt neben dem neuen Kopf schwach. | alle Seiten | behoben (CSS): helle Blaufläche, Kontakt als weisse Karte vorn, Überschriften in Satzschreibung, Angaben zur Website als leise zweite Ebene. Wortlaut unverändert. |
| G10 | Beispielsätze (`puk-say`) erscheinen auf Verstehen als Kästen, sonst als Zeilen mit Randlinie. | Verstehen › 03 vs. Behandlung › 04, Genesung | behoben in r4-43 (29.10.2026, CSS): eine Form im Text (Paar, hilfreiche Fassung auf Blau), in Abbildungen die freigegebene Linienform |

## Einzelne Seiten

| Seite | Befund | Status |
|---|---|---|
| Startseite | Einstiege als Karten, Haltung als blaues Band, Themen liniert: stimmig. | ok |
| Verstehen | Kurve, Annahmen-Raster und Merksatz stimmig. Abbildung 2 (Momentaufnahmen) ohne Fläche, weil Profilvariante «open». | ok |
| Alltag und Beziehungen | Figuren (Schleife, zwei Sichten) tragen gut auf der Blaufläche. | ok |
| Behandlung | Angebotskarten und Akkordeons ok. | ok |
| Kommunizieren | Tabelle siehe G5. | behoben |
| Krise | Kasten «Wenn Sie sich jetzt Sorgen machen» siehe G3. Akuthinweis mit 144/117 bleibt hier unverändert. | behoben |
| Grenzen | DEAR-Pfad bei ~920 px mit Silbentrennung in vier schmalen Spalten. | behoben (Pfad ab ~990 px waagrecht, darunter senkrecht) |
| Rolle, Selbstfürsorge, Genesung, Diagnose, Fragen, Kinder, Jugendliche | Keine gestalterischen Fehler gefunden. Genesung › Abbildung 1 steht in der Lesespalte (schmaler als andere Figuren). | ok / vertretbar |
| Unterstützung | Einstieg wiederholt sich inhaltlich: «Hier finden Sie Angebote für Angehörige in der Schweiz sowie Möglichkeiten für Austausch und Selbsthilfe. Hier finden Sie Beratung, Austausch und Selbsthilfe für Angehörige in der Schweiz.» | offen: Prüfbedarf Sprache (S), nicht geändert |
| Kurz, Begriffe, Bücher, Quellen, Über | Keine Befunde. | ok |

Nicht geprüft: Tastaturbedienung, 200 % Text, erzwungene Farben, reduzierte Bewegung, Druck. Mobile Ansicht (360 px) nur automatisch auf Überlauf und eingeengte Textblöcke geprüft, ohne Befund.
