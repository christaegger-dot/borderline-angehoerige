# Freigabe r4-23

Am 14. Oktober 2026 bestätigte der Auftraggeber ausdrücklich, dass die konkreten r4-23-Fassungen zu A03-019 bis A03-038 geprüft und freigegeben sind. Die Bestätigung erfolgte im zuvor geklärten Namen der PUK und umfasst die in der Befundmatrix ausgewiesenen Fach-, Safety-, Rechts- und Institutionsfragen.

Die Freigabe gilt ausschliesslich für den auf dem Branch `codex/audit-03-massnahmen-r4-23` dokumentierten Wortlaut. Sie ersetzt keine reale Nutzenden-, Screenreader- oder Hardwaregeräteprüfung und keine darüber hinausgehende WCAG-, ISO- oder Rechts-Gesamtfreigabe.

Nach der Bestätigung wurde `authoring/site.config.json` › `releaseApproval.independentReview` auf `bestaetigt` gesetzt. Der anschliessende Produktionsbuild bestand mit 22 Seiten, 0 Blockern und 0 Hinweisen; 33 Exportdateien waren bytegleich reproduzierbar. Der vollständige Delta-Smoke-Test auf dem erzeugten `site/`-Export bestand mit 44 von 44 Seiten-/Viewport-Läufen, 28 von 28 axe-Läufen, 36 von 36 unveränderten Such-Ersttreffern und ohne Fehler in den Sicherheits-, Text-, Interaktions- und No-JavaScript-Prüfungen.
