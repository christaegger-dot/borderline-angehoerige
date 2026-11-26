#!/bin/bash
# Nachprüfung PR #829: Der Berichtsschritt aus verify-authoring.yml (aus der YAML-Datei gelesen, scripts/report-step.sh),
# mit eingesetztem Ausdruck ${{ steps.layouttest.outcome }}, unter "bash -e" wie auf GitHub. Aufruf: report-probe.sh
S="$(cd "$(dirname "$0")/.." && pwd)"
for fall in "success mit" "failure mit" "failure ohne" "cancelled ohne"; do set -- $fall
  T=$(mktemp -d); cd "$T"; export GITHUB_STEP_SUMMARY=$T/summary.md
  [ "$2" = mit ] && mkdir -p dist/audit04-layout && cp "$S/out/pr-s0/ERGEBNIS.json" dist/audit04-layout/
  sed "s/\${{ steps.layouttest.outcome }}/$1/g" "$S/scripts/report-step.sh" > step.sh
  echo "== outcome=$1, ERGEBNIS.json $2"; bash -e step.sh; echo "exit $?"; head -4 summary.md; echo "… ($(wc -l < summary.md) Zeilen)"; tail -2 summary.md
done
