#!/bin/bash
# Nachprüfung #832: ein Lauf des Layouttests einer Fassung gegen eine Variante, in einer eigenen Kopie mit leerem Ausgabeordner,
# danach der Berichtsschritt (wenn die Fassung ihn hat) so, wie ihn der Workflow aufruft.
# Aufruf: lauf.sh <Arbeitsbaum der Fassung> <Name> <Variante> <Zielordner>
set -u; W="$1"; N="$2"; V="$3"; Z="$4/$N-$V"; HERE="$(cd "$(dirname "$0")" && pwd)"
rm -rf "$Z"; mkdir -p "$Z/authoring/tools"; cp -r "$W/site" "$Z/site"; cp "$W/authoring/site.config.json" "$Z/authoring/"; cp "$W"/authoring/tools/layouttest*.cjs "$Z/authoring/tools/"
python3 "$HERE/varianten.py" "$Z/site" "$V" || exit 2
cd "$Z"; echo "### $N-$V"
node authoring/tools/layouttest.cjs > layouttest.log 2>&1; L=$?; grep -v "^Bekannte Ausnahme" layouttest.log | cut -c1-400; echo "layouttest exit $L"
if [ -f dist/audit04-layout/ERGEBNIS.json ]; then node -e "const r=require('./dist/audit04-layout/ERGEBNIS.json');console.log('ERGEBNIS: issues',r.issues.length,'knownIssues',JSON.stringify(r.knownIssues),'newIssues',JSON.stringify(r.newIssues),'knownNotSeen',JSON.stringify(r.knownNotSeen))"; else echo "ERGEBNIS.json fehlt"; fi
echo "Screenshots: $(ls dist/audit04-layout/screenshots 2>/dev/null | wc -l)"
if [ -f authoring/tools/layouttest-report.cjs ]; then
  O=failure; [ $L = 0 ] && O=success
  LAYOUT_OUTCOME=$O GITHUB_STEP_SUMMARY="$Z/summary.md" node authoring/tools/layouttest-report.cjs dist/audit04-layout/ERGEBNIS.json > report.log 2>&1; R=$?
  cat report.log; echo "--- Zusammenfassung:"; cat summary.md; echo "report exit $R (outcome $O) => Job $([ $R = 0 ] && echo grün || echo ROT)"
fi
echo
