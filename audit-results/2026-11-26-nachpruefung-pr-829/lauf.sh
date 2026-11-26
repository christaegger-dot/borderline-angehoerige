#!/bin/bash
# Nachprüfung PR #829: ein Lauf des Layouttests. Aufruf: lauf.sh <fassung: base|pr|main|merged> <variante: s0..s5>
# Erwartet neben dem Ordner scripts/ (ausserhalb des Repositorys):
#   base/   Arbeitsbaum von 46753a5 (Grundlage von #829)      pr/     Arbeitsbaum von 56a56df (Kopf von #829)
#   main/   Arbeitsbaum von 9a5341c (main bei der Prüfung)    merged/ 9a5341c mit "git merge --no-commit 56a56df"
#   sites/  Ausgabe von varianten.py (aus pr/site)
# Jeder Lauf bekommt eine eigene Kopie von Werkzeug, site.config.json und site/ und einen leeren Ausgabeordner.
S="$(cd "$(dirname "$0")/.." && pwd)"; T=$1; V=$2; W=$S/v/$T-$V; O=$S/out/$T-$V
rm -rf "$W" "$O"; mkdir -p "$W/authoring/tools" "$O"
cp "$S/$T/authoring/tools/layouttest.cjs" "$W/authoring/tools/"; cp "$S/$T/authoring/site.config.json" "$W/authoring/"
cp -r "$S/sites/$V/site" "$W/site"
start=$(date +%s)
( cd "$W" && PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright node authoring/tools/layouttest.cjs "$O" ) > "$O.log" 2>&1
echo "exit $? · $(( $(date +%s)-start )) s · ERGEBNIS.json $( [ -f "$O/ERGEBNIS.json" ] && echo vorhanden || echo fehlt )" >> "$O.log"
