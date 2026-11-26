#!/bin/bash
# Nachprüfung #842: layouttest-report.cjs (Fassung des Arbeitsbaums $1) mit konstruierten ERGEBNIS.json-Dateien.
# Aufruf: report-probe.sh <Arbeitsbaum> <Arbeitsordner>
set -u; W="$1"; D="$2"; rm -rf "$D"; mkdir -p "$D"; R="$W/authoring/tools/layouttest-report.cjs"
K1='safety card starts in first screen 375x667 (top 802px)'; K2='safety card starts in first screen 360x740 (top 863px)'; N1='index 375px text200=false: horizontal overflow'
mk(){ printf '%s' "$2" > "$D/$1.json"; }
mk A "{\"states\":240,\"interactions\":38,\"issues\":[\"$K1\",\"$K2\"],\"knownIssues\":[\"$K1\",\"$K2\"],\"newIssues\":[],\"knownNotSeen\":[]}"
mk B "{\"states\":240,\"interactions\":38,\"issues\":[\"$K1\",\"$K2\",\"$N1\"],\"knownIssues\":[\"$K1\",\"$K2\"],\"newIssues\":[\"$N1\"],\"knownNotSeen\":[]}"
mk C "{\"states\":240,\"interactions\":38,\"issues\":[\"$N1\"],\"knownIssues\":[],\"newIssues\":[\"$N1\"],\"knownNotSeen\":[\"safety-card-375x667\",\"safety-card-360x740\"]}"
mk M "{\"states\":240,\"interactions\":38,\"issues\":[],\"knownIssues\":[],\"newIssues\":[],\"knownNotSeen\":[\"safety-card-375x667\",\"safety-card-360x740\"]}"
mk E ""
mk F '{"states":240,"issues":['
mk G 'null'
mk H '[]'
mk I '42'
mk Js '"text"'
mk T 'true'
mk Alt "{\"states\":240,\"interactions\":38,\"issues\":[\"$K1\",\"$K2\"]}"
mk L "{\"issues\":[\"$K1\"],\"knownIssues\":null,\"newIssues\":[]}"
mk Nz "{\"issues\":[\"$K1\",\"$K2\",\"$N1\"],\"knownIssues\":[\"$K1\",\"$K2\"],\"newIssues\":[]}"
mk Ni "{\"knownIssues\":[\"$K1\"],\"newIssues\":[]}"
mk Ks "{\"issues\":[\"$K1\"],\"knownIssues\":[\"$K1\"],\"newIssues\":[],\"knownNotSeen\":\"x\"}"
mk S '{"states":1,"interactions":1,"issues":["a\n::warning::eingeschleust\r\n### Titel <b>fett</b> `code` *s* _u_ [l](http://x) | t & 100% ~~d~~ @someone https://example.org"],"knownIssues":[],"newIssues":["a\n::warning::eingeschleust\r\n### Titel <b>fett</b> `code` *s* _u_ [l](http://x) | t & 100% ~~d~~ @someone https://example.org"],"knownNotSeen":[]}'
mk Sk '{"states":1,"interactions":1,"issues":["<img src=x onerror=alert(1)>\n- zweite Zeile"],"knownIssues":["<img src=x onerror=alert(1)>\n- zweite Zeile"],"newIssues":[],"knownNotSeen":[]}'
for c in A B C M E F G H I Js T Alt L Nz Ni Ks S Sk; do for o in success failure cancelled skipped UNSET; do
  rm -f "$D/sum.md"
  if [ $o = UNSET ]; then env -u LAYOUT_OUTCOME GITHUB_STEP_SUMMARY="$D/sum.md" node "$R" "$D/$c.json" > "$D/out.txt" 2>&1; x=$?
  else LAYOUT_OUTCOME=$o GITHUB_STEP_SUMMARY="$D/sum.md" node "$R" "$D/$c.json" > "$D/out.txt" 2>&1; x=$?; fi
  printf '%-4s %-9s exit %s | %s | %s\n' "$c" "$o" "$x" "$(grep -o '^::[a-z]*' "$D/out.txt" | sort | uniq -c | tr -s ' ' | tr '\n' ' ')" "$(head -1 "$D/sum.md" 2>/dev/null)"
done; done
echo; echo "--- Fehlende Datei"; LAYOUT_OUTCOME=failure GITHUB_STEP_SUMMARY="$D/sum.md" node "$R" "$D/gibtsnicht.json" >/dev/null 2>&1; echo "exit $?"
echo; echo "--- Sonderzeichen S, failure: Konsole"; LAYOUT_OUTCOME=failure GITHUB_STEP_SUMMARY="$D/sumS.md" node "$R" "$D/S.json"; echo "--- Zusammenfassung S"; cat "$D/sumS.md"
echo; echo "--- Sk (bekannt), failure: Zusammenfassung"; LAYOUT_OUTCOME=failure GITHUB_STEP_SUMMARY="$D/sumSk.md" node "$R" "$D/Sk.json" >/dev/null; cat "$D/sumSk.md"
echo "--- G null, failure: Konsole"; LAYOUT_OUTCOME=failure node "$R" "$D/G.json"
