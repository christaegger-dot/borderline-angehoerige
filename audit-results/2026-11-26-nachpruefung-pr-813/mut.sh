#!/bin/bash
# Eigene Gegenproben N813: $1 Repo, $2 Arbeitsordner, $3 Name der Probe, $4 Art der Mutation (siehe mutate.py)
# Aufruf je Probe: ./mut.sh <repo> <arbeitsordner> P1-wrap-offen P1-wrap-offen (Proben P0 bis P7, Liste in mutate.py)
set -u; REPO=$1; W=$2; n=$3; kind=$4
R=$W/$n; rm -rf $R; mkdir -p $R
for c in 7d5723e 91e4ac0; do
 D=$R/$c; mkdir -p $D/authoring/tools; cp -r $REPO/site $D/site; cp $REPO/authoring/site.config.json $D/authoring/
 git -C $REPO show $c:authoring/tools/layouttest.cjs > $D/authoring/tools/layouttest.cjs
 python3 -I $(dirname $0)/mutate.py $D/site/verstehen.html $kind $D/authoring/tools/layouttest.cjs
 (cd $D && node authoring/tools/layouttest.cjs $D/out > $D/lauf.txt 2>&1; echo "exit $?" >> $D/lauf.txt)
done
echo "== $n"; for c in 7d5723e 91e4ac0; do printf -- "-- %s: " $c; grep -E "tension|Abweichungen|B2c|Error|exit" $R/$c/lauf.txt | head -5 | tr '\n' ' '; [ -f $R/$c/out/ERGEBNIS.json ] && printf ' | exceptions=%s' "$(node -e "console.log(JSON.stringify(require('$R/$c/out/ERGEBNIS.json').exceptions??'FEHLT'))")" || printf ' | kein ERGEBNIS.json'; echo; done
