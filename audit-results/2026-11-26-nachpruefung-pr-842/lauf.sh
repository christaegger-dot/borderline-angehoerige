#!/bin/bash
# Nachprüfung #842: Layouttest einer Fassung gegen eine Variante in eigener Kopie, leerer Ausgabeordner, danach der Berichtsschritt wie im Workflow.
# Aufruf: lauf.sh <Arbeitsbaum> <Name> <Variante> <Zielordner>
set -u; W="$1"; N="$2"; V="$3"; Z="$4/$N-$V"; HERE="$(cd "$(dirname "$0")" && pwd)"
export PLAYWRIGHT_MODULE=${PLAYWRIGHT_MODULE:-/opt/borderline-browser/node_modules/playwright}
rm -rf "$Z"; mkdir -p "$Z/authoring/tools"; cp -r "$W/site" "$Z/site"; cp "$W/authoring/site.config.json" "$Z/authoring/"; cp "$W"/authoring/tools/layouttest*.cjs "$Z/authoring/tools/"
python3 "$HERE/varianten.py" "$Z/site" "$V" || exit 2
cd "$Z"; { echo "### $N-$V"
node authoring/tools/layouttest.cjs > layouttest.log 2>&1; L=$?; grep -E "^Audit-04|^Bekannte Abweichung nicht" layouttest.log; echo "layouttest exit $L"
node -e "const r=require('./dist/audit04-layout/ERGEBNIS.json');const s=a=>a.map(i=>i.length>90?i.slice(0,90)+'…':i);console.log('issues',r.issues.length,'| knownIssues',JSON.stringify(s(r.knownIssues)),'| newIssues',r.newIssues.length,JSON.stringify(s([...new Set(r.newIssues)])),'| knownNotSeen',JSON.stringify(r.knownNotSeen))" 2>&1
O=failure; [ $L = 0 ] && O=success
LAYOUT_OUTCOME=$O GITHUB_STEP_SUMMARY="$Z/summary.md" node authoring/tools/layouttest-report.cjs dist/audit04-layout/ERGEBNIS.json > report.log 2>&1; R=$?
grep -E "^::" report.log | cut -c1-160 | sort | uniq -c | sed 's/^ *//'; echo "report exit $R (outcome $O) => Job $([ $R = 0 ] && echo grün || echo ROT)"; echo; } > "$4/$N-$V.txt"
