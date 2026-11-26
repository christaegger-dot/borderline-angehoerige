#!/usr/bin/env bash
# Abschnitt A: site/ von main gegen site/ von r4-73 (3764d45). Aufruf aus dem Repository-Wurzelverzeichnis.
# Erstes Argument: Pfad zu einem Worktree von 3764d45.
set -u; R73=${1:?Worktree von 3764d45}
echo "main: $(git rev-parse --short HEAD) · r4-73: $(git -C "$R73" rev-parse --short HEAD)"
diff <(cd site && find . -type f | sort) <(cd "$R73/site" && find . -type f | sort) && echo "Dateiliste gleich: $(cd site && find . -type f | wc -l) Dateien"
for f in js/interaktion.js css/site.css _redirects _headers; do cmp -s site/$f "$R73/site/$f" && echo "byte-gleich: $f" || echo "UNGLEICH: $f"; done
n=0; for f in site/*.html; do b=$(basename "$f"); diff <(sed 's/r4-76/r4-XX/g' "$f") <(sed 's/r4-73/r4-XX/g' "$R73/site/$b") >/dev/null && n=$((n+1)) || echo "UNGLEICH nach Gleichsetzen: $b"; done; echo "HTML gleich nach Gleichsetzen der Kennung: $n von $(ls site/*.html | wc -l)"
echo "Vorkommen r4-76 in site/ (main), nach Form:"; grep -oh '[^ ]\{0,40\}r4-76[^ ]\{0,20\}' -r site | sort | uniq -c
echo "Dateien mit r4-73 in site/ (main): $(grep -rl 'r4-73' site | tr '\n' ' ')"
echo "Dateien mit r4-76 in r4-73/site: $(grep -rl 'r4-76' "$R73/site" | wc -l)"
for x in authoring/js/interaktion.js authoring/tools/search-index.mjs authoring/css/site.css; do cmp -s $x "$R73/$x" && echo "byte-gleich: $x" || echo "UNGLEICH: $x"; done
node -e 'const a=require("./authoring/site.config.json"),b=require(process.argv[1]+"/authoring/site.config.json");for(const o of [a,b]){delete o.assetVersion;delete o.releaseApproval};console.log("site.config.json ohne assetVersion/releaseApproval gleich:",JSON.stringify(a)===JSON.stringify(b))' "$R73"
echo "authoring/ gegen 3764d45:"; git diff --stat 3764d45 HEAD -- authoring/
