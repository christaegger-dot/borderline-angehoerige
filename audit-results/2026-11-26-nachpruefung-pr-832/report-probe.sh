#!/bin/bash
# Nachprüfung #832: layouttest-report.cjs (Fassung a26bcca = main) mit konstruierten ERGEBNIS.json, je mit eigener Zusammenfassungsdatei.
# Aufruf: report-probe.sh <Pfad zu layouttest-report.cjs> <Arbeitsordner>
R="$1"; T="$2"; rm -rf "$T"; mkdir -p "$T"; cd "$T"
K1='safety card starts in first screen 375x667 (top 802px)'; K2='safety card starts in first screen 360x740 (top 863px)'
probe(){ # Name, outcome ('-' = Variable nicht gesetzt), Datei ('-' = fehlt)
  local n="$1" o="$2" f="$3"; rm -f sum.md
  if [ "$o" = "-" ]; then GITHUB_STEP_SUMMARY=sum.md node "$R" "$f" > out.txt 2>&1; else LAYOUT_OUTCOME="$o" GITHUB_STEP_SUMMARY=sum.md node "$R" "$f" > out.txt 2>&1; fi; local x=$?
  echo "### $n · outcome=$o · exit $x => $([ $x = 0 ] && echo grün || echo ROT)"; echo "stdout:"; sed 's/^/  | /' out.txt; echo "Zusammenfassung:"; sed 's/^/  | /' sum.md 2>/dev/null; echo
}
j(){ node -e 'const [f,i,k,n,s]=process.argv.slice(1);const o={states:240,interactions:38,issues:JSON.parse(i)};if(k!=="-")o.knownIssues=JSON.parse(k);if(n!=="-")o.newIssues=JSON.parse(n);if(s!=="-")o.knownNotSeen=JSON.parse(s);o.exceptions=[];require("fs").writeFileSync(f,JSON.stringify(o))' "$@"; }
B="[\"$K1\",\"$K2\"]"
j a.json "$B" "$B" '[]' '[]';                         for o in failure success cancelled skipped -; do probe "A nur bekannte" $o a.json; done
j b.json "[\"neu X\",\"$K1\",\"$K2\"]" "$B" '["neu X"]' '[]'; for o in failure success cancelled skipped -; do probe "B eine neue + zwei bekannte" $o b.json; done
j c.json '["neu X"]' '[]' '["neu X"]' '["safety-card-375x667","safety-card-360x740"]'; probe "C nur neue" failure c.json
probe "D Datei fehlt" failure fehlt.json; probe "D Datei fehlt" cancelled fehlt.json; probe "D Datei fehlt" success fehlt.json
: > leer.json; probe "E leere Datei" failure leer.json
echo '{"states":240,"issues":[' > kaputt.json; probe "F abgeschnittenes JSON" failure kaputt.json
echo 'null' > null.json; probe "G JSON null" failure null.json
echo '[]' > arr.json; probe "H JSON Array" failure arr.json
echo '"text"' > str.json; probe "I JSON String" failure str.json
j alt.json "$B" - - -; probe "J altes Format (ohne neue Felder)" failure alt.json
j k.json "$B" "$B" - '[]'; probe "K newIssues fehlt" failure k.json
node -e 'require("fs").writeFileSync("l.json",JSON.stringify({states:240,interactions:38,issues:["x"],knownIssues:"x",newIssues:[]}))'; probe "L knownIssues kein Array" failure l.json
j m.json '[]' '[]' '[]' '["safety-card-375x667","safety-card-360x740"]'; probe "M alles behoben" success m.json; probe "M2 keine Abweichung, Schritt aber failure" failure m.json; probe "M3 keine Abweichung, cancelled" cancelled m.json
j n.json "[\"neu X\",\"$K1\"]" "[\"$K1\"]" '[]' '[]'; probe "N issues nennt eine Abweichung, die in keiner der beiden Listen steht" failure n.json
j o.json "[\"$K1\"]" "[\"$K1\",\"neu X\"]" '[]' '[]'; probe "O neue Abweichung steht fälschlich in knownIssues, Zählung daher ungleich" failure o.json
j p.json "[\"neu X\",\"$K1\"]" "[\"$K1\",\"neu X\"]" '[]' '[]'; probe "P neue Abweichung steht in knownIssues, Zählung gleich (nur bei geändertem layouttest.cjs möglich)" failure p.json
node -e 'const s=["100% breit\nzweite Zeile","a::b ::error title=x::y","mit `Backticks` und ``` Zaun","<b>fett</b> <script>x</script> | * _ [l](http://x)","\r\n::warning::eingeschleust","- Listenpunkt\n\n### Titel"];require("fs").writeFileSync("s.json",JSON.stringify({states:240,interactions:38,issues:s,knownIssues:[],newIssues:s,knownNotSeen:["a\nb%"],exceptions:[]}))'; probe "S Sonderzeichen in neuen Abweichungen" failure s.json
node -e 'require("fs").writeFileSync("t.json",JSON.stringify({issues:[],knownIssues:[],newIssues:[]}))'; probe "T ohne states/interactions" success t.json
echo "### U ohne GITHUB_STEP_SUMMARY (lokal)"; LAYOUT_OUTCOME=failure node "$R" b.json; echo "exit $?"
