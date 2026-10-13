---
name: website-audit
description: Koordiniert die Audits 01–06 für psychoedukative und rechtliche Informationswebsites; Bestand, Vollprüfung, Delta und Abschluss.
---

# Website-Audit-Koordinator V1.2

## Auftrag und Schutzregeln
Prüfe genau das **aktuell geöffnete Repository**, nicht andere gleichzeitig laufende Projekte. Arbeite für Prüfungen read-only bezüglich Anwendungscode, produktiver Einstellungen, Authentifizierung, Deployments und Designsystem. Auch nach einem Audit keine Commits, PRs, Merges oder Deployments ohne gesonderten Auftrag. Auditberichte als Arbeitsartefakte sind erlaubt. Berichte und Testdateien dürfen keine personenbezogenen Klienten-/Patientendaten, geheimen Zugangsdaten oder internen Tokens enthalten.

Vor jeder Prüfung erfassen: repo, Branch, Commit-SHA, tatsächliche Deployment-URL, Quellrepository falls Export, Zielgruppe, bestehende Audit-Berichte, Testzugänge, Prüfstand und vorhandene Qualitätsanforderungen. Übernehme alte Ergebnisse nur als versionsgebundene Evidenz; nicht als aktuellen Befund.

## Arbeitsmodi
- `bestand`: Vorhandene Audits, Befund-IDs, Prüfläufe und Restpunkte rekonstruieren; fehlende Nachweise kennzeichnen. Nicht grundlos nochmals alles prüfen.
- `voll`: Audits 01–05 gründlich prüfen und konsolidieren. Audit 06 **erst nach Korrekturphase**.
- `delta`: Änderungen seit bekanntem Commit/PR erfassen und relevante Qualitätsmodule sowie Regressionen überprüfen.
- `abschluss`: Audit 06 anhand eines fixierten korrigierten Commits und Deployments; begründete GO/CONDITIONAL GO/NO-GO/NICHT BEURTEILBAR Empfehlung.
- `modul-01` bis `modul-06`: einzelne Prüfmodule.

## Fachmodule
**01 – Struktur, IA und Nutzerführung:** Vollständige Sitemap/Seiteninventar, hierarchische Logik, mentale Modelle, Auffindbarkeit, Querverweise, Redundanzmatrix, Sackgassen, mindestens sechs Zielgruppen-Aufgaben, Soll-Struktur. Trenne notwendige Wiederholungen von überflüssigen.

**02 – Fachliche Richtigkeit, Evidenz, Sicherheit:** Behauptungen und Empfehlungen quellengestützt prüfen; offizielle und aktuelle medizinische bzw. juristische Quellen, Schweizer und Zürcher Versorgungs-/Rechtslage. Kausalität, Verallgemeinerungen, Angehörigenperspektive, Risiken, praktische Umsetzbarkeit, fachliche Lücken, Quellen-/Unsicherheitsmatrix. Kein ungeprüftes Literaturzitat, keine medizinische oder juristische Freigabe behaupten. Für Rechtswebsite: Gesetzesartikel, Fassung, Zuständigkeiten und Geltungsbereich exakt kontrollieren.

**03 – Sprache und Didaktik:** Schweizer Standarddeutsch, natürliche empathische nicht-abgehackte Sprache, klare Begriffe, guter Lesefluss, didaktische Reihenfolge, authentische Dialoge, Selbstbestimmung, wenig Floskeln, keine Schuldzuschreibungen. Zu wichtigen Befunden genaue Originalstelle und sofort verwendbare Ersatzfassung; fachliche Aussage nicht verändern.

**04 – Visuelles Wissen und Design:** Gerenderte Seiten bei Desktop/Mobil prüfen. PUK-Designprofil als Referenz, wenn erreichbar. Jede Grafik auf Erkenntnisnutzen statt Dekoration, fachliche Korrektheit, Hierarchie, Kontrast, Weissraum, Typografie, mobile Darstellung und textliche Alternative beurteilen. Konkrete Visualisierungskonzepte nur mit Nutzen.

**05 – Interaktion, Accessibility und Geräte:** Reale Browser-/Maus-/Tastatur-/Touch-Interaktionen der vorhandenen Komponenten sowie relevante Zustände prüfen. WCAG 2.2 AA als Qualitätsziel; automatisierte axe-/Browser-/Build-Tests getrennt von manuellen Tests und echten Screenreader-Tests. Viewports einschliesslich 320, 375, 768, 1024 und 1440 CSS-Pixeln sowie Zoom und Reflow. Keine erdachten Tests oder pauschale WCAG-Konformität.

**06 – Unabhängiges Abschlussaudit:** Frühere IDs nachtesten; neue Regressionen, Fach-/Sprach-/Design-Kohärenz, Nutzerreisen, Accessibility und technische Freigabegates am fixierten Stand. GO nur nach belegten Kriterien; CONDITIONAL GO nur bei akzeptierten nicht-blockierenden Restpunkten; NO-GO bei bestätigtem Blocker; NICHT BEURTEILBAR bei fehlenden wesentlichen Nachweisen. Empfehlung ist keine Veröffentlichungsfreigabe.

## Einheitliche Befundregeln
Jeder Befund: stabile ID (A01-001 ... A06-001), URL/Pfad + Fundstelle, Ist-Zustand, Prüfmethode, Evidenzstatus (`belegt`, `heuristisch`, `Hypothese`, `nicht geprüft`), Nutzerwirkung, Priorität P0–P3, konkret ausführbare Empfehlung, Akzeptanzkriterium, Quelle und Nachteststatus. Erhalte bisherige IDs; Duplikate als Querverweis, nicht neue Befunde. Status: offen / teilweise / verifiziert abgeschlossen / Regression / nicht überprüfbar / begründet zurückgestellt / nicht anwendbar. Vor allem bei P0/P1 echte Nachweise. Fehlende Zugänge, Browser, Screenreader und Quellen transparent als *nicht geprüft* darstellen.

Ein automatischer Test ohne Fehler beweist nicht vollständige Zugänglichkeit. HTTP 200 beweist nicht den richtigen Linkinhalt. `noindex` schützt nicht vor öffentlichem Zugriff. Eine Schutzkonfiguration niemals während des Audits umgehen oder deaktivieren. Kritische Schutz- und Datenschutzrisiken melden; keine unbewiesenen formalen Freigabehürden erfinden.

## Verbindliche Ausgabe
Berichte in `audit-results/<lauf-id>/` als Arbeitsartefakte erzeugen, wenn der Arbeitsbereich es ermöglicht:
- `METADATEN.json`: Projekt, Zeit, Branch, SHA, Deployment, Modus, Testbedingungen.
- `PRUEFUMFANG.md`: Seiten-/Zustandsinventar, geprüfte und ungeprüfte Teile.
- `BEFUNDE.csv`: semikolongetrennte Befundmatrix mit stabilen IDs.
- `TESTMATRIX.csv`: reproduzierbare tatsächliche Tests inklusive nicht getesteter.
- `QUELLEN.csv`: Quellen und Aktualitätsangaben.
- `BERICHT.md`: Gesamtbewertung, Ergebnisse je Modul, priorisierte Massnahmen, Lücken.
- `FREIGABE.md`: nur Abschlussmodus mit klarer Entscheidung und Begründung.

Innerhalb eines Projekts dürfen unabhängige Prüfmodule an Subagenten verteilt werden, wenn verfügbar. Der Koordinator vereinigt und überprüft ihre Ergebnisse. Nicht vier Repositories in einem Arbeitsbaum mischen.

## Exportquellen
Bei migrierten Export-Repositories ist `authoring/` im **aktuellen Repo** die kanonische Inhaltsquelle; `site/` ist nur die erzeugte Version. Wo noch kein `authoring/` existiert, den bisherigen externen Quellenort erfassen, aber keine Migration eigenmächtig starten. PUK-Website-Profil dient nach Migration ausschliesslich als Design- und Qualitätsreferenz.

## Nach der Analyse
Zuerst konsolidierte Auditberichte liefern. Änderungen nur nach separater konkreter Freigabe auf eigenem Branch. Eine tatsächliche medizinisch-fachliche, juristische, Datenschutz- oder Produktionsfreigabe wird von einem Agenten nicht ersetzt.
