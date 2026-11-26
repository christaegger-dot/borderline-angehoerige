#!/bin/bash
# Nachprüfung r4-65: Selbsttest mit veränderten Fassungen von ctlTxt/accTxt in einem Arbeitsbaum ausserhalb des Repositorys.
# Aufruf: selbsttest-varianten.sh <arbeitsbaum-f7f8d18>
W=$1; F=$W/authoring/tools/contract.js
CT="const ctlTxt = c => c.tag === 'img' ? ' ' + (c.attrs.alt || '') + ' '"
CI="  : c.tag === 'input' ? (String(c.attrs.type || '').toLowerCase() === 'hidden' ? '' : ' ' + (c.attrs.value || '[Eingabefeld]') + ' ') : null;"
AC="const accTxt = node => (node.children || []).map(c => c.tag === '#text' ? c.text : RAW.has(c.tag) || hiddenFlag(c) ? '' : ctlTxt(c) ?? accTxt(c)).join('');"
run() { echo "== $1"; (cd $W && node authoring/tools/selftest.mjs 2>&1 | grep -E "^FAIL|Selbsttest:"); git -C $W checkout -q -- authoring/tools/contract.js; cmp <(git -C $W show HEAD:authoring/tools/contract.js) $F && echo "(zurückgesetzt, cmp gleich)"; }
grep -qF "$CT" $F && grep -qF -- "$CI" $F && grep -qF "$AC" $F || { echo "Ausgangszeilen nicht gefunden"; exit 1; }
rep() { node -e 'const fs=require("fs");const [f,a,b]=process.argv.slice(1);const s=fs.readFileSync(f,"utf8");if(!s.includes(a))throw new Error("fehlt: "+a);fs.writeFileSync(f,s.replace(a,()=>b));' "$F" "$1" "$2"; }
run "V0 unverändert"
rep "ctlTxt(c) ?? accTxt(c)" "accTxt(c)"; run "V1 accTxt ohne ctlTxt (wie d6dd542)"
rep "$CI" "  : null;"; run "V2 ctlTxt nur für img"
rep "c.tag === 'img' ? ' ' + (c.attrs.alt || '') + ' '" "false ? ''"; run "V3 ctlTxt nur für input"
rep "RAW.has(c.tag) || hiddenFlag(c) ? '' : ctlTxt(c) ?? accTxt(c)" "ctlTxt(c) ?? (RAW.has(c.tag) || hiddenFlag(c) ? '' : accTxt(c))"; run "V4 ctlTxt vor hiddenFlag (verborgene Bilder/Felder zählen)"
rep "(c.attrs.alt || '')" "(c.attrs.alt || 'Bild')"; run "V5 Bild ohne alt-Text zählt als «Bild»"
rep "=== 'hidden' ? ''" "=== 'hidden-x' ? ''"; run "V6 type=hidden zählt mit"
rep "(c.attrs.value || '[Eingabefeld]')" "(c.attrs.value || '')"; run "V7 ohne Platzhalter [Eingabefeld]"
rep "String(c.attrs.type || '').toLowerCase()" "String(c.attrs.type || '')"; run "V8 type ohne toLowerCase"
