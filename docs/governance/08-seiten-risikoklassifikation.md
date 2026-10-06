# Seiten-Risikoklassifikation

Diese Klassifikation steuert Reviewtiefe und Release-Freigabe.

## Hoch

Diese Seiten brauchen fachliche Prüfung und regelmässige Aktualisierung:

- `/soforthilfe`
- `/unterstuetzen/krise`
- `/wegweiser`
- Krisenausgang von `/selbsttest`
- `/diagnostik`
- `/begleiterkrankungen`
- `/grenzen`
- `/beratung`
- `/datenschutz`
- `/quellen`

Typische Risiken:

- falsche, veraltete oder mehrfach kopierte Notfallkontakte
- missverständliche Krisenempfehlungen
- unbeabsichtigte Triage oder Verantwortungsverschiebung auf Angehörige
- unklare medizinische Aussagen
- Datenschutz- oder Vertrauensprobleme

Zusätzlich gelten folgende klare Zielzustände:

- `/notfallkarte` ist eine Legacy-Route und leitet dauerhaft auf
  `/soforthilfe` um.
- `/notfallkarte/erstellen` ist hochriskant und gibt in der öffentlichen
  Produktion bis zu einem separaten Review `404` zurück. In einer geschützten
  Prüfumgebung darf das Werkzeug direkt erreichbar sein.

Das persönliche Werkzeug braucht zusätzlich eine klinische,
datenschutzrechtliche und nutzerbezogene Prüfung.

## Mittel

Diese Seiten brauchen redaktionelle und periodische fachliche Prüfung:

- `/verstehen`
- `/kommunizieren`
- `/selbstfuersorge`
- `/unterstuetzen/uebersicht`
- `/unterstuetzen/alltag`
- `/unterstuetzen/therapie`
- `/genesung`
- `/materialien`

Typische Risiken:

- zu starke Vereinfachung
- zu dichte Sprache
- fehlende Quellenanbindung
- unklare Grenzen zwischen Orientierung und Beratung

## Niedrig

Diese Seiten brauchen vor allem redaktionelle Pflege:

- `/glossar`
- `/faq`
- `/buchempfehlungen`
- `/impressum`
- `/barrierefreiheit`
- `/feedback`
- `/ueber-uns`

## Review-Frequenz

- hoch: alle 3 bis 6 Monate
- mittel: jährlich
- niedrig: nach Bedarf oder bei grösseren Änderungen

## Release-Regel

Änderungen an Hochrisiko-Seiten dürfen nicht ohne bewusste fachliche Freigabe gemergt werden.

Für `/soforthilfe` gilt zusätzlich: Kontakte und Links werden vor jedem
öffentlichen Release und mindestens alle drei Monate geprüft. Diese bewusst
strengere Sonderregel geht für Kontakte der allgemeinen Spanne von drei bis
sechs Monaten vor. Eine überfällige Prüfung blockiert die Veröffentlichung.
