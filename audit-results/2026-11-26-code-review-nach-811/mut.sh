#!/bin/bash
# Gegenproben: $1 Name, $2 Art (css|wrapdetails|grenze), $3 Wert
set -u; REPO=$1; S=$2; n=$3; kind=$4; val=${5:-}
R=$S/$n; mkdir -p $R/authoring/tools; cp -r $REPO/site $R/site; cp $REPO/authoring/site.config.json $R/authoring/
cp $REPO/authoring/tools/layouttest.cjs $R/authoring/tools/neu.cjs; git -C $REPO show origin/main:authoring/tools/layouttest.cjs > $R/authoring/tools/main.cjs
case $kind in
 css) python3 -I - $R/site/verstehen.html "$val" <<'P'
import sys;f=sys.argv[1];h=open(f,encoding='utf8').read();h=h.replace('</head>','<style>'+sys.argv[2]+'</style></head>',1);open(f,'w',encoding='utf8').write(h)
P
 ;;
 wrapdetails) python3 -I - $R/site/verstehen.html $val <<'P'
import sys,re;f=sys.argv[1];h=open(f,encoding='utf8').read();m=re.search(r'<figure class="puk-vis-figure" data-visual-id="v-vs-anspannung"',h);a=m.start();b=h.index('</figure>',a)+9
h=h[:a]+('<details open>' if 'offen' in sys.argv[2:] else '<details>')+'<summary>Figur</summary>'+h[a:b]+'</details>'+h[b:];open(f,'w',encoding='utf8').write(h)
P
 ;;
 grenze) sed -i 's/B2C_PHASE_END_MAX=1800/B2C_PHASE_END_MAX=1500/' $R/authoring/tools/neu.cjs; sed -i 's/c.end>1800/c.end>1500/' $R/authoring/tools/main.cjs;;
esac
for t in neu main; do (cd $R && node authoring/tools/$t.cjs $R/out-$t > $R/$t.txt 2>&1; echo "exit $?" >> $R/$t.txt); done
echo "== $n"; for t in neu main; do printf -- "-- %s: " $t; grep -E "tension|Abweichungen|exit" $R/$t.txt | tr '\n' ' '; echo; done
