#!/bin/bash
# Nachprüfung r4-66: Selbsttest mit absichtlich falschen Fassungen von ctlTxt/accTxt (Kopie von authoring/ ausserhalb des Repositorys)
WT=$1; OUT=$2
ORIG='const accTxt = node => (node.children || []).map(c => c.tag === '"'"'#text'"'"' ? c.text : RAW.has(c.tag) || hiddenFlag(c) ? '"'"''"'"' : ctlTxt(c) ?? accTxt(c)).join('"'"''"'"');'
run() { name=$1; py=$2; rm -rf $OUT/v; mkdir -p $OUT/v; cp -r $WT/authoring $OUT/v/authoring; python3 -I -c "$py" $OUT/v/authoring/tools/contract.js || { echo "== $name: Ersetzung fehlgeschlagen"; return; }; echo "== $name"; node $OUT/v/authoring/tools/selftest.mjs 2>&1 | grep -E '^FAIL|Selbsttest:'; }
P='import sys;p=sys.argv[1];s=open(p).read();a,b=OLD,NEW;assert s.count(a)==1,a;open(p,"w").write(s.replace(a,b))'
run "V0 unverändert" "OLD='x';NEW='x';import sys;p=sys.argv[1];s=open(p).read();s=s+'';open(p,'w').write(s)"
run "V1 ohne ctlTxt (accTxt wie r4-65)" "OLD=\"ctlTxt(c) ?? accTxt(c)\";NEW=\"accTxt(c)\";$P"
run "V2 nur img, kein input" "OLD=\": c.tag === 'input' ?\";NEW=\": false ?\";$P"
run "V3 nur input, kein img" "OLD=\"c.tag === 'img' ?\";NEW=\"false ?\";$P"
run "V4 ctlTxt vor hiddenFlag" "OLD=\"RAW.has(c.tag) || hiddenFlag(c) ? '' : ctlTxt(c) ?? accTxt(c)\";NEW=\"ctlTxt(c) ?? (RAW.has(c.tag) || hiddenFlag(c) ? '' : accTxt(c))\";$P"
run "V5 img alt ohne Leerzeichen-Trennung" "OLD=\"' ' + (c.attrs.alt || '') + ' '\";NEW=\"(c.attrs.alt || '')\";$P"
run "V6 img ohne alt zählt als [Bild]" "OLD=\"(c.attrs.alt || '')\";NEW=\"(c.attrs.alt ?? '[Bild]')\";$P"
run "V7 type=hidden zählt mit" "OLD=\"=== 'hidden' ? ''\";NEW=\"=== 'xxx' ? ''\";$P"
