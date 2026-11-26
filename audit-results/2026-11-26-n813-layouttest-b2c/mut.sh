#!/bin/bash
# Gegenproben N813-3: $1 Repo, $2 Arbeitsordner, $3 Art der Mutation (siehe mutate.py).
# Vergleich: «main» = layouttest.cjs aus 55d006e (fest), «neu» = layouttest.cjs im Arbeitsbaum.
# Aufruf: for k in P0 P1-wrap-offen P2-wrap-zu P3-wrap-zu-dummy P4-details-offen-in-figur P7-wrap-offen-plus700; do ./mut.sh <repo> <arbeitsordner> $k; done
set -u; REPO=$1; W=$2; kind=$3
R=$W/$kind; rm -rf $R; mkdir -p $R
for t in main neu; do
 D=$R/$t; mkdir -p $D/authoring/tools; cp -r $REPO/site $D/site; cp $REPO/authoring/site.config.json $D/authoring/
 if [ $t = main ]; then git -C $REPO show 55d006e:authoring/tools/layouttest.cjs > $D/authoring/tools/layouttest.cjs; else cp $REPO/authoring/tools/layouttest.cjs $D/authoring/tools/; fi
 python3 -I $(dirname $0)/mutate.py $D/site/verstehen.html $kind $D/authoring/tools/layouttest.cjs
 (cd $D && node authoring/tools/layouttest.cjs $D/out > $D/lauf.txt 2>&1; echo "exit $?" >> $D/lauf.txt)
done
echo "== $kind"; for t in main neu; do printf -- "-- %s: " $t; grep -E "tension|Abweichungen|B2c|Error|exit" $R/$t/lauf.txt | head -5 | tr '\n' ' '; echo; done
