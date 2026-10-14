# Audit 06 – Abschlussprüfung des veröffentlichten Stands r4-22

## Gesamtentscheidung

**CONDITIONAL GO für den fortgesetzten Produktionsbetrieb von r4-22.** Auf dem fixierten Repository-Stand `160a42f` und der öffentlichen Produktion wurden keine neuen P0-/P1-Regressions-, Sicherheits-, IA-, Sprach-, Design- oder Funktionsbefunde gefunden. Sämtliche sofort umsetzbaren Massnahmen des aktuellen Website-Plans sind abgeschlossen.

Die Einschränkung betrifft nicht die technische Releasequalität. Sie bleibt notwendig, weil eine formelle Gesamtprüfung von Impressum und Datenschutz durch den PUK-Rechtsdienst nicht nachgewiesen ist und reale Screenreader-, Geräte- und Nutzendentests gemäss Institutionsentscheid nicht durchgeführt wurden. Deshalb werden keine juristische, Datenschutz-, WCAG- oder ISO-Gesamtfreigabe behauptet.

## Versions- und Deploymentbezug

Der Website-Release r4-22 wurde mit PR #676 und Merge-Commit `7864dab6f48ef4e52db1e783387032a0c0de8e93` veröffentlicht. PR #677 ergänzte ausschliesslich den Produktionsnachweis. `authoring/` und `site/` unterscheiden sich zwischen Release-Merge und aktuellem `main`-Commit `160a42f92eb78e4a0af806fc74babea1ab712937` nicht. Die öffentliche Website lieferte im Abschlusslauf den Buildmarker und die Assets von r4-22.

## Ergebnisse

- Produktionsbuild: 22 Seiten, 0 Blocker, 0 Hinweise.
- Exportparität: 33 Dateien bytegleich.
- Kompakter Produktions-Smoke-Test: 169 von 169 Prüfungen bestanden, 0 Laufzeitfehler.
- Vollständige Live-Matrix: 110 Seiten-/Viewport-Läufe über 22 Seiten und fünf Breiten ohne blockierenden Befund.
- Automatisierte Barrierefreiheit: 66 axe-Läufe ohne erkannten Verstoss im geprüften Regelumfang.
- Reflow: alle 22 Seiten bei 200 Prozent Basisschrift ohne horizontalen Seitenüberlauf.
- Suche: alle 36 festgeschriebenen Ersttreffer korrekt; Safety- und Überlastungsformulierungen führen zum vorgesehenen Ziel.
- Nutzerführung: 6 von 6 realistischen Nutzerreisen bestanden.
- Tastaturbasis, Sprungzielfokus, Akkordeons, Filter, No-JavaScript-Fallback und eigene 404-Seite bestanden.
- CSP, HSTS, `X-Robots-Tag: noindex, nofollow`, `robots.txt` und drei repräsentative 301-Weiterleitungen bestätigt.

Die Browserheuristik meldete bei 75 Kombinationen keinen eigenen Hauptnavigationslink mit `aria-current="page"`. Das betrifft Unterseiten und Serviceseiten, die bewusst keinen eigenen Hauptpunkt besitzen. Zugeordnete Unterseiten markieren stattdessen den übergeordneten Bereich mit `aria-current="location"`; die Beobachtung ist gegenüber dem Referenzlauf unverändert und kein WCAG- oder Regressionsbefund.

## Nutzerreisen

1. «Mein Kind will nicht mehr leben» führt als erster Suchtreffer zu «Wenn Suizidgedanken ein Thema sind»; der Zuständigkeitsverweis bleibt sichtbar.
2. Der Einstieg «Kurz und klar» ist von der Startseite erreichbar und enthält einen direkten Krisenweg.
3. Der Direktlink zu Behandlung und Vertraulichkeit öffnet den richtigen Abschnitt und dessen Vertiefung.
4. «Kind erlebt Streit» führt zu «Wenn Kinder mitbetroffen sind» mit klarer Entlastung von Erwachsenenaufgaben.
5. «Ich kann nicht mehr» führt zu «Warnsignale für Überlastung».
6. Die Angehörigenberatung ist mit E-Mail, Kosten- und Vertraulichkeitsangaben auffindbar; es wird keine Erwachsenenbegrenzung behauptet.

## Status der früheren A06-Befunde

- **A06-001:** unverändert offen, empfohlen und nicht blockierend. Die interne Rechts-/Datenschutz-Gesamtprüfung bleibt nachzuweisen.
- **A06-002:** materiell nicht geprüft, organisatorisch abgeschlossen. Die fehlenden realen Tests bleiben als akzeptierte Evidenzgrenze sichtbar.
- **A06-003:** verifiziert abgeschlossen. Der Preview war zwar weiterhin geschützt, aber Commit-/Exportbezug und der direkte vollständige Produktionsnachtest sind nun vorhanden.

## Weitere Massnahmen

Es gibt derzeit keine weitere sofort umsetzbare lokale Website-Massnahme. AR3-5 ist ein gemeinsames, terminiertes Profilpaket und beginnt gemäss aktuellem Entscheid erst nach Veröffentlichung der Depressions-Website, spätestens ab 16. November 2026. Die nächste turnusmässige Prüfung der dynamischen Angebote ist spätestens am 14. April 2027 fällig.

Neue Inhalte, Codeänderungen oder Profilübernahmen benötigen einen versionsbezogenen Delta-Nachtest. Die aktuelle Entscheidung rechtfertigt keine pauschale Freigabe künftiger Stände.
