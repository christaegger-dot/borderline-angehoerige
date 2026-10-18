# Audit 04 umgesetzt · r4-39

Die 16 Befunde A04-2003 bis A04-2018 sind in den kanonischen Quellen bearbeitet. Die vollständige Zuordnung und verbleibende einzelne Fachfreigaben stehen in [UMSETZUNG.csv](UMSETZUNG.csv); die Ausgangsbefunde in [AUDIT-BEFUNDE.csv](AUDIT-BEFUNDE.csv). Die dortigen Screenshotpfade beziehen sich auf das vollständige ursprüngliche Auditpaket; ausgewählte neue Ansichten stehen hier unter `ansichten/`.

Basis: `main` **c54139cd043ed1e2079306c4b98bcaf700d27be4**. Vor der Bearbeitung wurden alle vorhandenen kanonischen Quelldateien mit den Git-Blob-Hashes dieses Standes abgeglichen: keine Abweichung. Die bestehende lokale Arbeitskopie wurde erhalten; die Bearbeitung erfolgte separat. Das Referenzprofil wurde nicht verändert.

## Ergebnis

Die erste Krisenorientierung folgt direkt dem Seitentitel. Ihre genehmigten Handlungsschritte und der Akuthinweis bleiben unverändert. Der mobile Kopf ist kompakter, die Navigation wechselt bis 60 rem ins bedienbare Menü. Suchfelder stehen vor den langen Erläuterungen. Das Abschnittsraster reagiert früher auf den verfügbaren Textraum und die Schriftgrösse. Die Validierungstabelle wird bei engem Container zur beschrifteten Datensatzansicht.

Diagramme verwenden für Erklärungen und Handlungen die Leseschrift, behalten ihre Reihenfolge auch schmal und zeigen notwendige Unsicherheit sichtbar. Die drei neuen Modelle zu Genesung, Übergang ins Erwachsenenalter und Entlastung übernehmen die bestehenden Erläuterungen. Die Wissensgrenze, Zuständigkeiten rund um Kinder und die Anspannungskurve sind visuell überarbeitet. Wortlaut und Zahlen der Forschungsgrafik bleiben erhalten.

Das globale Subgrid gilt nur für direkte Vergleichsspalten. Die «Zwei Sichten» haben wieder natürlich hohe Zitatkarten. Auf der breiten Startseite nutzen neun Einstiege zwei ruhige Spalten. Die Kurzseite bleibt als sequenziell lesbare Akutorientierung einspaltig: Der optionale Gestaltungsbefund begründet dort keinen zusätzlichen Umbau. Die fünf offenen Illustrationen und der bewusst kompakte Footer bleiben erhalten.

Die Suchindex-Grenze der schnellen Krisenorientierung wurde an die neue Reihenfolge angepasst: Die nachfolgende Einleitung und Kapitelübersicht gehören nicht zu diesem Suchabschnitt. Ohne diese Begrenzung änderte sich der Ersttreffer für «Polizei». Die bestehende Suchregression bestätigt die Korrektur; keine Such-Sicherheitsregel wurde geändert. Weiche Trennstellen werden aus Suchbegriffen entfernt.

## Selbstprüfung

Dies ist eine technische Selbstprüfung der Umsetzung, keine behauptete unabhängige Gesamtprüfung.

- 82/82 Selbsttests des Seitenvertrags.
- 216/216 festgeschriebene Suchfälle; 0 JavaScript-Fehler.
- 75/75 vorhandene Sprach-/UI-Prüfungen.
- 230 Browserzustände: 23 Seiten × 320/375/768/1024/1440 px × normale/verdoppelte Browserschrift; 25 zusätzliche Bedienproben.
- Kein horizontaler Seitenüberlauf in diesen Zuständen; alle Layout-Akzeptanzprüfungen bestanden.
- 34 Exportdateien bytegleich mit einem erneuten Entwurfsbuild.

Die Rohmessungen stehen in [BROWSER.json](BROWSER.json), die maschinelle Zusammenfassung in [ERGEBNIS.json](ERGEBNIS.json), die Aufrufe und Logausgaben in [TESTS.txt](TESTS.txt). Der portable Regressionstest liegt unter `authoring/tools/layouttest.cjs` und startet einen eigenen lokalen HTTP-Server. Die Prüfung der verdoppelten Schrift verwendet Chromium `defaultFontSize=32` und dokumentiert den tatsächlichen Root-Schriftgrad; sie ist kein behaupteter manueller Browser-Zoom.

## Gemessene Hauptkriterien

- `krise`: `firstCrisisStep` {'y': 500, 'h': 99, 'width': 293}.
- `suche`: `input` {'y': 529, 'h': 44, 'width': 295}.
- `begriffe`: `input` {'y': 653, 'h': 44, 'width': 295}.
- `quellen`: `input` {'y': 616, 'h': 44, 'width': 295}.
- `verstehen`: `curve` {'y': 6697, 'h': 1795, 'width': 335}.
- `beziehungen`: `firstQuote` {'y': 5656, 'h': 113, 'width': 499}.

[Mobile Krisenorientierung](ansichten/krise-375.jpg), [frühe Suche](ansichten/suche-375.jpg), [Kinder: Zuständigkeiten](ansichten/kinder-1440.jpg), [Anspannung](ansichten/verstehen-1440.jpg), [Genesung](ansichten/genesung-1440.jpg), [Übergang](ansichten/jugendliche-1440.jpg), [Entlastung](ansichten/selbstfuersorge-1440.jpg).

## Freigabegrenze

Die beiden vorgeschriebenen Produktionsaufrufe wurden ausgeführt. Sie blockieren ausschliesslich die sechs im [Entscheidbeleg](ENTSCHEIDE.md) benannten einzelnen Visualfreigaben. Der dokumentierte Verzicht auf eine unabhängige Gesamtprüfung bleibt wirksam; `change-review` und `inline-review` blockieren nicht. Der generierte Export ist ein geprüfter **Entwurf**, keine Veröffentlichungsfreigabe. Der PR bleibt Entwurf. Kein Merge oder Deployment.

Nicht neu geprüft: echte Screenreader, Hardware-Touch, reale Kontrastbetriebssysteme sowie Firefox und WebKit. Die automatisierten Befunde belegen Chromium und die gemessenen Zustände.
