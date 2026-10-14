# Release A2 · Nachbesserung r4-26

## Ergebnis

Eine Prüfung am 14. Oktober 2026 ergab, dass Release A (r4-25) die Abnahmekriterien des Massnahmenplans nicht vollständig erfüllte: M1.1, M1.5, M1.6 und M1.8 waren nur teilweise erfüllt. Ausserdem waren R25-O01 (missverständlicher Gefährlichkeitssatz auf «Kurz und klar») und R25-O03 (Suche «Darf ich gehen») offen. r4-26 schliesst diese Punkte.

Die konkreten Fassungen wurden am 14. Oktober 2026 im Namen der PUK freigegeben (`FREIGABE.md`). Danach bestanden der Produktionsbuild mit 22 Seiten, 0 Blockern und 0 Hinweisen, die bytegleiche Parität aller 33 Exportdateien und der Delta-Test auf dem erzeugten `site/`-Export. r4-26 wurde am 14. Oktober 2026 mit PR #682 gemergt und veröffentlicht; der Produktionsnachtest bestand (siehe unten).

## Änderungen

- **Verstehen (M1.1):** Der fette Absatz endet mit «Nehmen Sie entsprechende Äusserungen immer ernst, auch wenn sie sich wiederholen.» Im Abschnitt «Wenn Sie sich wegen Suizid sorgen» steht jetzt, dass man auch dann direkt fragt, wenn die Person solche Gedanken schon öfter geäussert hat.
- **Beziehungen (M1.5):** Der Absatz nennt jetzt ruhig und sachlich reagieren, die Verletzung versorgen lassen, keinen Rückzug als Strafe und Zuwendung auch in ruhigen Zeiten. Project Air kommt in den Quellenblock.
- **Kommunizieren (M1.6):** «Muss ich bleiben?» ist an der Stelle beantwortet: Die Person muss nicht bleiben, darf gehen und holt dann zusätzliche Hilfe. Der Link auf die FAQ bleibt als Vertiefung.
- **Krisen begleiten (M1.8):** NICE NG225 ist jetzt der Beleg für die Begrenzung gefährlicher Mittel (Empfehlung 1.11.7, Sicherheitsplan). Der Verzeichniseintrag sagt offen, dass die Leitlinie dazu keine eigene Empfehlung für Angehörige enthält.
- **Kurz und klar, Über diese Website (R25-O01):** Der Satz grenzt jetzt auf eine Gefahr für andere ein. «Kurz und klar» nennt zusätzlich, dass Suizidgedanken und Selbstverletzungen häufig sind.
- **Suche (R25-O03):** «Darf ich gehen» und «Muss ich bleiben» führen jetzt zur FAQ «Darf ich die betroffene Person verlassen?».

## Quellenabgleich

Für M1.4 und M1.5 wurde der Wortlaut nachträglich gegen Project Air (2018), die Family Guidelines (2006) und NICE NG225 abgeglichen. Gedeckt sind:

- **Ruhig bleiben, nicht übergehen:** Project Air und Family Guidelines, Leitlinie 7.
- **Einfache Erste Hilfe:** Project Air.
- **Keine Geheimhaltung, Fachpersonen informieren:** Family Guidelines, Leitlinie 7.
- **Später in Ruhe besprechen, eigene Unterstützung:** Project Air.
- **Zeigen, dass die Person weiterhin wichtig ist:** Project Air.
- **Gemeinsame gute Zeiten:** Family Guidelines, Leitlinien 4 und 5.

Nicht wörtlich gedeckt sind die Schwellen «tiefe, stark blutende» Verletzungen und «auch wenn die Person das nicht möchte» in M1.4. Project Air spricht von potenziell lebensgefährlichen Verletzungen und von Zweifeln. Das ist als R26-O01 vermerkt.

## Technischer Nachtest

- Produktionsbuild: 22 Seiten, 0 Blocker, 0 Hinweise. Exportparität 33 von 33 Dateien.
- Alle Seiten: 44 von 44 Läufen bei 320 und 1440 CSS-Pixel mit Buildmarker r4-26.
- Geänderte Seiten: 56 von 56 Läufen bei vier Breiten und zwei Textgrössen; axe ohne gemeldete Violation.
- Suche: 53 von 54 Ersttreffern unverändert. Beabsichtigt geändert hat sich «gefährlich»: Die Suche führt jetzt zu «Während einer Krise», weil «Kurz und klar» das Wort nicht mehr enthält. «Borderline gefährlich» führt zu «Verstehen». 11 von 11 festgeschriebenen Suchintentionen führen zum vorgesehenen Ziel.
- Texte: 14 von 14 neuen Formulierungen vorhanden, 3 von 3 ersetzten entfernt. Deep-Links 3 von 3, No-JavaScript-Fallback, 0 `tel:`-Links.
- Quellen: Für fünf betroffene Einträge stimmen Verzeichnis und Quellenblöcke überein (Skriptprüfung).

## Wortbilanz

r4-26 fügt 164 Wörter hinzu, davon 62 auf «Beziehungen». «Krisen begleiten» wächst nur im Quellenblock und hat jetzt 1949 Wörter. Für das Ziel von höchstens 1800 Wörtern nach Release C muss M6.5 dort mindestens 149 Wörter einsparen.

## Offene Punkte

- R26-O01: Schwellen und «auch gegen den Willen» in M1.4 sind nicht wörtlich durch die Quellen gedeckt.
- R26-O02: Die gelockerte Suche verlangt bei zwei Wörtern weiterhin beide Treffer.
- R26-O03: Wortbilanz «Krisen begleiten», siehe oben.
- R26-O04: Das Gate prüft «Verwendet auf» nicht.

## Produktionsnachweis

PR #682 wurde am 14. Oktober 2026 als Merge-Commit `b1815260ff77901e29fdfcd001a92391aa907b77` übernommen. Netlify veröffentlichte den Produktionsdeploy `6acfb7f924705af6e61b1e33` um 17:12 UTC. Der anschliessende Test gegen `https://borderline-angehoerige.netlify.app` bestand:

- 42 von 42 Läufen über 21 Seiten bei 320 und 1440 CSS-Pixel, alle mit Buildmarker r4-26, Assets r4-26 und ohne Lade- oder Laufzeitfehler;
- 54 von 54 Such-Ersttreffern wie im lokalen Export und 11 von 11 festgeschriebenen Suchintentionen, darunter «Darf ich gehen» und «Muss ich bleiben»;
- 14 von 14 neuen und 3 von 3 entfernten Formulierungen;
- No-JavaScript-Fallback auf «Krisen begleiten», eigene 404-Seite, unveränderte Sicherheitsheader und `robots.txt`;
- 9 von 9 ausgelieferten Nicht-HTML-Dateien bytegleich mit `site/`. Die HTML-Dateien schreibt Netlify beim Ausliefern auf saubere Pfade um; sie sind deshalb nicht bytegleich.

## Evidenzgrenzen

Nicht behauptet werden reale Screenreader-, Hardwaregeräte- oder Nutzendentests sowie eine vollständige WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe. Die 200-Prozent-Textgrösse ist über die Wurzelschrift simuliert.
