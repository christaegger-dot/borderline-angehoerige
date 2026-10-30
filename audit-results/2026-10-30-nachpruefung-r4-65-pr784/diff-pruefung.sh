#!/usr/bin/env bash
# Nachprüfung r4-65 (PR #784): Diff d20973b..19a72dc und die Zwischenstände e1db2da, 7a21ee5, 2810994.
# Aufruf im Repository: bash audit-results/2026-10-30-nachpruefung-r4-65-pr784/diff-pruefung.sh <leeres-arbeitsverzeichnis>
set -u
W=$1; mkdir -p "$W"
A=d20973b; B=19a72dc; P=PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md
echo "## Commits $A..$B"; git log --format='%h %p | %an | %cI | %s' $A..$B
echo; echo "## git diff --stat $A $B (ohne Nachweisordner der bauenden Sitzung)"
git diff --stat $A $B -- . ':!audit-results' | tail -40
echo; echo "## geänderte Dateien in audit-results/"; git diff --name-status $A $B -- audit-results/
echo; echo "## unverändert? (Exit 0 = keine Änderung)"
for p in authoring/content authoring/css authoring/js authoring/tests authoring/tools/build.mjs authoring/tools/search-index.mjs authoring/tools/selftest.mjs authoring/tools/suchtest.mjs authoring/tools/sprachtest.mjs authoring/tools/layouttest.cjs authoring/tools/wortbilanz.mjs authoring/DARSTELLUNGSREGELN.md $P .github netlify.toml; do
  git diff --quiet $A $B -- $p; echo "  $p: Exit $?"; done
echo; echo "## site/: Dateien nach Ersetzen r4-64 -> r4-65 byte-gleich?"
n=0; d=0; for f in $(git ls-tree -r --name-only $B site/); do n=$((n+1))
  a=$(git show $A:$f 2>/dev/null | sed 's/r4-64/r4-65/g' | md5sum); b=$(git show $B:$f | md5sum); c=$(git show $A:$f | md5sum)
  if [ "$a" != "$b" ]; then if [ "$c" = "$b" ]; then echo "  unverändert ohne Ersetzung: $f"; else d=$((d+1)); echo "  ABWEICHUNG: $f"; fi; fi; done
echo "  Dateien: $n · Abweichungen: $d"
echo "  Ersetzungen im Diff von site/: $(git diff $A $B -- site/ | grep '^+[^+]' | grep -o 'r4-65' | wc -l) mal r4-65, $(git diff $A $B -- site/ | grep '^-[^-]' | grep -o 'r4-64' | wc -l) mal r4-64"
echo "  r4-64 in site/*.html auf $B: $(git grep -c 'r4-64' $B -- 'site/*.html' | wc -l) Dateien"
echo; echo "## contract.js: d6dd542 mit r4-62 -> r4-65 gleich 2810994?"
git show d6dd542:authoring/tools/contract.js | sed 's/r4-62/r4-65/g' > "$W/c62.js"; git show 2810994:authoring/tools/contract.js > "$W/c65.js"
cmp "$W/c62.js" "$W/c65.js" && echo "  gleich (Blob 2810994 = $(git rev-parse 2810994:authoring/tools/contract.js), 19a72dc = $(git rev-parse 19a72dc:authoring/tools/contract.js))"
echo "  r4-62 in contract.js auf 2810994: $(git show 2810994:authoring/tools/contract.js | grep -c 'r4-62')"
echo "  e1db2da gegen d6dd542:"; git diff d6dd542 e1db2da -- authoring/tools/contract.js | grep '^[-+][^-+]' | sed 's/^/    /'
echo; echo "## Pendenzendatei"
for c in a55ecb1 d20973b; do echo "  e1db2da gegen $c: $(git diff --shortstat $c e1db2da -- $P)"; done
echo "  7a21ee5 gegen d20973b: $(git diff --shortstat d20973b 7a21ee5 -- $P)"
echo "  19a72dc gegen d20973b: $(git diff --shortstat d20973b 19a72dc -- $P)"
echo "  Blob a55ecb1 = $(git rev-parse a55ecb1:$P), e1db2da = $(git rev-parse e1db2da:$P), d20973b = $(git rev-parse d20973b:$P), 19a72dc = $(git rev-parse 19a72dc:$P)"
echo; echo "## site.config.json"
for c in a55ecb1 d6dd542 e1db2da 7a21ee5 2810994 $B; do git show $c:authoring/site.config.json > "$W/cfg-$c.json"; done
node - "$W" <<'EOF'
const fs = require('fs'), d = process.argv[2];
const L = c => JSON.parse(fs.readFileSync(`${d}/cfg-${c}.json`, 'utf8'));
const s = x => x.releaseApproval.independentReviewWaiver.appliedTo.split('; ');
const ps = x => x.releaseApproval.pendingScope;
for (const c of ['a55ecb1', 'd6dd542', 'e1db2da', '7a21ee5', '2810994', '19a72dc']) { const j = L(c);
  console.log(`  ${c}: assetVersion=${j.assetVersion} waiver.version=${j.releaseApproval.independentReviewWaiver.version} appliedTo-Einträge=${s(j).length} pendingScope beginnt «${ps(j).slice(0, 40)}…»`); }
const m = L('a55ecb1'), r = L('d6dd542'), e = L('e1db2da'), f = L('19a72dc');
console.log('  pendingScope 19a72dc enthält pendingScope von a55ecb1 (r4-64) vollständig:', ps(f).includes(ps(m)));
console.log('  pendingScope e1db2da enthält pendingScope von a55ecb1 (r4-64) vollständig:', ps(e).includes(ps(m)));
console.log('  appliedTo: Einträge von a55ecb1, die auf 19a72dc fehlen:', JSON.stringify(s(m).filter(x => !s(f).includes(x))));
console.log('  appliedTo: Einträge von d6dd542, die auf e1db2da fehlen:', JSON.stringify(s(r).filter(x => !s(e).includes(x))));
console.log('  appliedTo: Einträge von d6dd542, die auf 19a72dc fehlen:', JSON.stringify(s(r).filter(x => !s(f).includes(x))));
console.log('  appliedTo: neu auf 19a72dc gegenüber a55ecb1:', JSON.stringify(s(f).filter(x => !s(m).includes(x))));
const flat = (o, p = '', q = {}) => { for (const [k, v] of Object.entries(o)) { if (v && typeof v === 'object') flat(v, p + k + '.', q); else q[p + k] = v; } return q; };
const FA = flat(m), FB = flat(f); console.log('  geänderte Schlüssel a55ecb1 -> 19a72dc:', [...new Set([...Object.keys(FA), ...Object.keys(FB)])].filter(k => FA[k] !== FB[k]).join(', '));
EOF
echo; echo "## Build-Kennung in den Zwischenständen"
for c in d6dd542 e1db2da 7a21ee5 2810994 f7f8d18; do echo "  $c: $(git show $c:authoring/tools/contract.js | grep -o "const BUILD = '[^']*'") · site/index.html $(git show $c:site/index.html | grep -o 'data-puk-site-build="[^"]*"') · Commit $(git show -s --format=%cI $c)"; done
