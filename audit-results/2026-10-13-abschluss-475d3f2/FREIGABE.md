# Audit-06-Empfehlung

## CONDITIONAL GO

Für Commit `475d3f2e29b595c9614cdd208c25bec0a98a5777` wurden keine neuen P0-/P1-Funktions-, Sicherheits-, IA-, Sprach- oder visuellen Regressionen gefunden. Die früheren technischen und inhaltlichen P1/P2-Korrekturen sind mit den unten genannten Grenzen nachgetestet. Diese Empfehlung ist keine institutionelle Veröffentlichungs-, medizinische, juristische, Datenschutz- oder WCAG-Freigabe.

### Bedingungen

1. Merge beziehungsweise Produktionsdeployment darf nur aus dem geprüften PR #672 erfolgen; spätere inhaltliche oder technische Änderungen erfordern einen neuen Delta-Nachtest.
2. Unmittelbar nach dem Produktionsdeployment sind r4-19, zentrale Nutzerwege, Safety-Suche, 404, CSP/X-Robots/HSTS/Cache-Header und repräsentative Weiterleitungen auf der öffentlichen URL zu prüfen. Bei Abweichung gilt kein GO.
3. Die fehlende interne Rechts-/Datenschutzprüfung für A02-001/A02-004 bleibt ausdrücklich dokumentiert. Ohne diesen Nachweis darf keine juristische oder Datenschutz-Freigabe behauptet werden.
4. Die akzeptierten Evidenzgrenzen zu realen Screenreadern, Geräten, Firefox/Safari und Nutzendentests bleiben sichtbar; keine WCAG- oder ISO-Gesamtkonformität behaupten.

### Nicht blockierend

Die P3-Punkte A03-010 bis A03-018 und A04-005 bis A04-007 können als separates Optimierungspaket folgen. Sie begründen auf dem geprüften Stand kein NO-GO.
