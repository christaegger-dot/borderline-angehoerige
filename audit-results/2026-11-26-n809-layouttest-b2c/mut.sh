#!/bin/bash
# usage: mut.sh name css-or-special
S=${S:?Arbeitsordner setzen}; W=$S/wt809; M=$S/mut; n=$1   # W: Arbeitsbaum des geprüften Stands; "pr" = dessen layouttest.cjs, "main" = origin/main
R=$M/$n; mkdir -p $R/authoring/tools; cp -r $W/site $R/site; cp $W/authoring/site.config.json $R/authoring/
cp $W/authoring/tools/layouttest.cjs $R/authoring/tools/pr.cjs; git -C $W show origin/main:authoring/tools/layouttest.cjs > $R/authoring/tools/main.cjs
case $n in
 M0-grenze1500) sed -i -e 's/r.curvePhases.end>1800/r.curvePhases.end>1500/' -e 's/c.end>1800/c.end>1500/' $R/authoring/tools/pr.cjs $R/authoring/tools/main.cjs;;
 M5-in-details) python3 - $R/site/verstehen.html <<'P'
import sys;f=sys.argv[1];h=open(f,encoding='utf8').read();a=h.index('<ol class="puk-vis-build__steps bl-kurve__liste bl-phase-actions">');b=h.index('</ol>',a)+5;blk=h[a:b];h=h[:a]+'<details class="puk-vis-more"><summary>Phasen</summary>'+blk+'</details>'+h[b:];open(f,'w',encoding='utf8').write(h)
P
;;
 M8-fuenf) python3 - $R/site/verstehen.html <<'P'
import sys;f=sys.argv[1];h=open(f,encoding='utf8').read();a=h.index('<ol class="puk-vis-build__steps bl-kurve__liste bl-phase-actions">');b=h.index('</ol>',a);h=h[:b]+'<li><div><h3>Fünf</h3><p>x</p></div></li>'+h[b:];open(f,'w',encoding='utf8').write(h)
P
;;
 M10-schutz-nach-details) python3 - $R/site/verstehen.html <<'P'
import sys,re;f=sys.argv[1];h=open(f,encoding='utf8').read();m=re.search(r'<p class="bl-fig-schutz">.*?</p>',h);blk=m.group(0);h=h[:m.start()]+h[m.end():];i=h.index('<figcaption class="puk-vis-caption">',m.start());h=h[:i]+blk+h[i:];open(f,'w',encoding='utf8').write(h)
P
;;
 M11-titel-weg) python3 - $R/site/verstehen.html <<'P'
import sys;f=sys.argv[1];h=open(f,encoding='utf8').read();a=h.index('<ol class="puk-vis-build__steps bl-kurve__liste bl-phase-actions">');h=h[:a]+h[a:].replace('<h3>Es wird eng.</h3>','',1);open(f,'w',encoding='utf8').write(h)
P
;;
 *) python3 - $R/site/verstehen.html "$2" <<'P'
import sys;f=sys.argv[1];h=open(f,encoding='utf8').read();h=h.replace('</head>','<style>'+sys.argv[2]+'</style></head>',1);open(f,'w',encoding='utf8').write(h)
P
;;
esac
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
for t in pr main; do (cd $R && node authoring/tools/$t.cjs $R/out-$t > $R/$t.txt 2>&1; echo "exit $?" >> $R/$t.txt); done
echo "== $n"; for t in pr main; do echo "-- $t:"; grep -E "tension|B2c|Abweichungen|exit" $R/$t.txt; done
