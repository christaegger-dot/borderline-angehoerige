#!/bin/bash
# Gegenproben zu N832-1 und N832-2. Aufruf im Repository: probe.sh <Arbeitsordner> <Name> <css|js|none> [Wert]
# Kopiert site/ in den Arbeitsordner, verändert nur dort site/index.html und lässt layouttest.cjs und layouttest-report.cjs laufen.
set -u; S=$1; n=$2; kind=$3; val=${4:-}; R=$S/$n; rm -rf $R; mkdir -p $R/authoring/tools
cp -r site $R/site; cp authoring/site.config.json $R/authoring/; cp authoring/tools/layouttest.cjs authoring/tools/layouttest-report.cjs $R/authoring/tools/
case $kind in
 css) python3 - $R/site/index.html "$val" <<'P'
import sys;f=sys.argv[1];h=open(f,encoding='utf8').read();h=h.replace('</head>','<style>'+sys.argv[2]+'</style></head>',1);open(f,'w',encoding='utf8').write(h)
P
;;
 js) python3 - $R/site/index.html "$val" <<'P'
import sys;f=sys.argv[1];h=open(f,encoding='utf8').read();h=h.replace('</head>','<script>'+sys.argv[2]+'</script></head>',1);open(f,'w',encoding='utf8').write(h)
P
;;
esac
echo "== $n"; (cd $R && node authoring/tools/layouttest.cjs $R/out 2>&1 | grep -E "Audit-04|^safety|Bekannte Abweichung" | sort | uniq -c | sed 's/^ *//'; echo "layouttest exit ${PIPESTATUS[0]}")
LAYOUT_OUTCOME=failure node $R/authoring/tools/layouttest-report.cjs $R/out/ERGEBNIS.json | grep -E "^::|^### " | cut -c1-170; echo "report exit ${PIPESTATUS[0]}"; echo
