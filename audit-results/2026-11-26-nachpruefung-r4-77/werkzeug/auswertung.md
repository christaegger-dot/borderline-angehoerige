# Auswertung des Rasters (Reproduktion)

1. Kopie des Rasters mit leerer Ausnahmenliste ausserhalb des Repositorys:
   `tools/suchraster.mjs` aus dem PR-Kopf, `tests/` mit `suchraster.json`, `suchraster-proben.txt`, beiden Testlisten und
   einer `suchraster-ausnahmen.tsv` nur mit Kopfzeilen.
2. Für die Vollauswertung schreibt eine Kopie (`dump.mjs`) jede Anfrage mit den ersten sechs Treffern und den Anheftungen
   beider Stände als JSON-Zeile (Änderung: `top: hrefs.slice(0, 6)` und eine `appendFileSync`-Zeile in der Vergleichsschleife).
3. Auswertung in Python: Tötungswort-/Alt-Anheftung geändert; Änderung ohne Anheftung; angehefteter Abschnitt nicht unter
   den ersten zwei; Vorrang-Fälle; Sicherheitsabschnitt aus den ersten drei ganz verschwunden (erste sechs).
4. Vorrang-Experiment: `site/` des PR-Kopfs kopiert, in `js/interaktion.js` `groups.pinsAfterSafetyLead = true;` entfernt,
   Raster mit leerer Ausnahmenliste gegen r4-76.
5. Eigene Proben: `node werkzeug/probe.cjs <r4-76-site> <r4-77-site> proben.tsv ergebnis/proben-r4-76-r4-77.tsv`
   (`PLAYWRIGHT_MODULE` gesetzt).
