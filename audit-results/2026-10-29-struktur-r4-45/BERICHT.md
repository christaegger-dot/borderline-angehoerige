# Gestaltung Schritt 3 · r4-45 · 29.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 29.10.2026:**

- zu Schritt 3: «nachher weiter mit Schritt 3, ich gebe Freigabe»
- zu den zwei Schutzsätzen der Abbildungen: «entscheide selber»

Ausgangsstand `main` = `e7eb137` (r4-44 mit PR #715, Pendenzen mit PR #716). Branch `claude/dazzling-cerf-n6ci1w`, neu von `main` aufgesetzt.

Die Freigabe gilt für zwei Entscheide des Gestaltungssystems «Borderline Angehörige»:

- E2: fünf Bereiche und ihre Navigationsnamen
- E8: neue Bedienwörter

Andere offene Entscheide sind nicht berührt: E7 (Absenderleiste), E9 (Telefonlinks), E10 (Teilung «Grenzen setzen», «Das Wichtigste» auf weiteren Seiten).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

## Was sich ändert

### Navigation: fünf Bereiche statt sechs (E1, E2)

| Bereich im Kopf | Einstiegsseite | Seiten im Bereich | vorher |
|---|---|---|---|
| Verstehen | Borderline verstehen | Diagnose und Begleiterkrankungen · Behandlung und Ihre Rolle darin · Genesung | «Verstehen» und «Behandlung» (eigener Bereich mit einer Seite) |
| Im Alltag | Alltag und Beziehungen | Ihre Rolle klären · Grenzen setzen · Zugewandt und klar sprechen | «Alltag und Beziehungen» mit sieben Seiten |
| Krisen | Krisen begleiten | – | Unterseite von «Alltag und Beziehungen» |
| Familie | Wenn Kinder mitbetroffen sind | Wenn Ihr jugendliches Kind betroffen ist | Unterseiten von «Alltag und Beziehungen» |
| Für Sie | Auf sich achten | Unterstützung finden · Bücher für Angehörige | «Unterstützung» |

Was sonst noch gilt:

- **«Übersicht» ist kein Navigationseintrag mehr.** Das Logo führt zur Startseite. Die Brotkrumen beginnen weiter mit «Übersicht».
- **Direkteinstiege unter dem Kopf:** «Kurz und klar», «Nachschlagen» (Fragen und Nachschlagen) und «Suchen» (bisher «Website durchsuchen»). Auf den Seiten des Bereichs Nachschlagen (Begriffe, Quellen, Suche) ist «Nachschlagen» als aktueller Ort markiert (`aria-current="location"`).
- **Die Adressen aller Seiten bleiben gleich.** Es gibt keine Weiterleitungen und keine Änderung an Suche oder Sprungzielen.
- **Menüknopf:** Er erscheint nur noch unter 50 rem (800 px) statt unter 78 rem (1248 px). Die fünf Namen brauchen mit dem Logo etwa 620 px. Bei 768 px bleibt der Knopf, wie es der Layouttest vorsieht.
- **«Krisen begleiten» ist ein Bereich mit einer Seite.** Dort steht deshalb keine Liste «Weiter im Bereich» mehr. Bisher standen dort die sechs übrigen Seiten von «Alltag und Beziehungen». Die Verweise im Text bleiben.
- **Einstiegsseite von «Für Sie»:** «Auf sich achten» steht in der Tabelle des Gestaltungssystems zuerst. «Unterstützung finden» bleibt über «Beratung» auf vielen Seiten, die Startseite («Beratung für Sie») und «Weiter im Bereich» direkt erreichbar.

### Bedienwörter (E8)

- **«Weiter im Bereich «…»»** ersetzt «Weitere Themen in diesem Bereich». Der Name ist der des Bereichs im Kopf, für Nachschlagen der Name des Direkteinstiegs.
- **«Auf dieser Seite · 11 Abschnitte»:** Die aufklappbare Zeile unter 72 rem nennt die Zahl der Abschnitte. Die stehende Spalte heisst weiter «Auf dieser Seite».
- **«Das Wichtigste»** ist das Etikett über den Schnelleinstiegen auf sechs Seiten: Krisen, Zugewandt sprechen, Rolle, Auf sich achten, Kinder, Jugendliche. Nicht auf «Behandlung», deren Titel schon «Das Wichtigste für Angehörige» heisst, und nicht auf «Fragen» («Anders einsteigen» ist eine Linkliste).
- **«Zu Ihrer Sicherheit»** ist das Etikett der zwei gelben Sicherheitshinweise («Grenzen setzen», «Fragen»). Der Wortlaut der Hinweise ist unverändert.

### Startseite (E3)

- Der Knopf «Mit meiner Frage beginnen» ist entfernt. Er sprang nur zum nächsten Abschnitt.
- «Was beschäftigt Sie im Moment?» folgt jetzt mit kleinem Abstand gleich unter der Einleitung. Das Anliegen zur Sicherheit steht weiter zuerst, gelb und über die ganze Breite.
- «Wenig Zeit oder Kraft? Das Wichtigste kurz und klar lesen.» steht unter den Anliegen statt im Einstieg.
- Es gibt jetzt einen einzigen Hauptknopf, «Beratung per E-Mail anfragen». Haltung, «Ich möchte etwas verstehen oder nachschlagen» und «Beratung für Sie» bleiben unverändert.

### Schutzsätze der Abbildungen wieder sichtbar

Der Entscheid war an Claude delegiert («entscheide selber»). Je ein Satz steht wieder sichtbar als eigene Zeile unter dem Bild (`p.bl-fig-schutz`). Die übrigen Grenzen bleiben in «Grenzen des Bildes».

- **Anspannungskurve:** «Ob Gefahr besteht, lässt sich aus der Stelle auf der Kurve nicht ableiten.» Der Teilsatz ist aus dem Grenzabsatz gelöst. Dort steht jetzt «… keine Beurteilung des Zustands einer Person. Solche Verläufe …»; nur die Satzzeichen ändern sich.
- **Zuständigkeitskarte «Kinder»:** «Die Darstellung ersetzt keinen Schutzplan und keine fachliche Beurteilung des Kindeswohls.»

Begründung: Die beiden Sätze verhindern, dass die Kurve als Gefahrenbeurteilung oder die Karte als Kindesschutzbeurteilung gelesen wird. «Verstehen» trägt seit dem 21.10.2026 keinen Akuthinweis mehr. `DARSTELLUNGSREGELN.md` nennt die Ausnahme.

### Technisch

- `authoring/site.config.json`:
  - `navLabel` und `groupRootId` der Seiten sind umgestellt.
  - `utilityNav` enthält drei Einträge.
  - Build-Kennung r4-45, Verzichtsvermerk und `pendingScope` sind nachgeführt.
- `authoring/tools/contract.js`:
  - `BUILD` r4-45
  - Zahl der Abschnitte in der aufklappbaren Zeile
  - Bereichsname in «Weiter im Bereich»
  - `aria-current="location"` für den Direkteinstieg des eigenen Bereichs
- `authoring/css/site.css`:
  - Menüschwelle 50 rem
  - Etiketten «Das Wichtigste» und «Zu Ihrer Sicherheit»
  - `.bl-fig-schutz`
  - kleiner Abstand zwischen Einstieg und Anliegen auf der Startseite
- `authoring/tools/layouttest.cjs`: Die Probe «ohne JavaScript sind alle Navigationslinks sichtbar» zählt die erwarteten Links jetzt aus dem Seitenvertrag (fünf) statt fest sechs. Die Prüfabsicht bleibt gleich.

## Messung

Kopfhöhe in px auf «Grenzen setzen», gemessen in Chromium:

| Breite | vorher | nachher | was sich zeigt |
|---|---|---|---|
| 1440 | 138 | 138 | fünf statt sechs Namen |
| 1100 | 152 | 152 | fünf Namen statt Menüknopf |
| 900 | 147 | 147 | fünf Namen statt Menüknopf |
| 768 | 169 | 169 | Menüknopf (unverändert) |
| 390 | 169 | 169 | Menüknopf (unverändert) |

Die Anspannungskurve ist bei 375 px 1992 px hoch, mit der wieder sichtbaren Zeile (r4-44: 1926 px, Ausnahme B2c).

## Ausgeführte Prüfungen

Lokal ausgeführt mit Node 22.22.0, Chromium und Playwright 1.63.0:

| Prüfung | Ergebnis |
|---|---|
| Selbsttest `selftest.mjs` | 84/84 bestanden |
| Produktionsgate | 23 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, unverändert) |
| Parität `--verify-site` | bestanden, 34 Dateien byte-gleich mit `site/` |
| Suchtest | 216 von 216 Erwartungen |
| Sprach-/UI-Test | 73 Prüfungen bestanden, JS-Fehler 0 |
| Layouttest | 230 Zustände, 25 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, Ausnahme B2c) |
| Sichtprüfung | Kopf bei 1440, 1100, 900, 768 und 390 px; Startseite 1440 und 390 px; Sicherheitshinweis und «Auf dieser Seite · 11 Abschnitte» auf «Grenzen setzen»; «Das Wichtigste» auf «Krisen»; «Weiter im Bereich «Im Alltag»»; Anspannungskurve; «Fragen» 390 px |

**Nicht geprüft:** Screenreader (keiner verfügbar), Safari und Firefox, reale Geräte, Menü bei 200 % Schrift über die Bedienproben des Layouttests hinaus.

## Abweichungen vom Vorschlag im Gestaltungssystem

| Vorschlag | Umsetzung | Grund |
|---|---|---|
| Kurz und klar, Nachschlagen und Suchen rechts in der Kopfzeile | in der Zeile unter dem Kopf, neben der Absenderin | Die Absenderin bleibt im Kopf (Gate `sender`, E7 nicht freigegeben). So bleibt der Kopf in der Höhe unverändert. |
| eine Zeile ab 1100 px | eine Zeile ab 800 px | Fünf kurze Namen passen früher. |
| «Das Wichtigste» als Kasten auf allen Themenseiten | Etikett nur dort, wo ein Schnelleinstieg besteht (6 Seiten) | Neue Kästen brauchen neuen Wortlaut (E10, nicht freigegeben). |

## Offen

- Screenreader-Prüfung; Nachprüfung durch eine Sitzung, die nicht gebaut hat.
- E7 (Absenderleiste), E9 (Telefonlinks 144/117), E10 (Teilung «Grenzen setzen», «Das Wichtigste» auf weiteren Seiten).
- Auf dem Handy ist «Krisen» über den Menüknopf erreichbar, also mit zwei Fingertipps.

## Bildschirmfotos

- `vorher-nachher-kopf-1100.png`: Kopf bei 1100 px, Menüknopf gegenüber fünf Bereichen
- `vorher-nachher-startseite-1440.png`: Startseite, erster Bildschirm
