#!/bin/bash
# Eigene Mutationsprobe N811: mut.sh <repo> <arbeitsordner> <probe>
# Je Probe: site/ aus dec530f, Layouttest aus 5b7e799 (#809), dec530f (#811) und b72d59d (main).
set -u; REPO=$1; W=$2; n=$3; R=$W/$n; rm -rf $R; mkdir -p $R
export PLAYWRIGHT_MODULE=${PLAYWRIGHT_MODULE:-/opt/borderline-browser/node_modules/playwright}
for c in 5b7e799 dec530f b72d59d; do
 D=$R/$c; mkdir -p $D/authoring/tools $D/site
 git -C $REPO archive dec530f site | tar -x -C $D; git -C $REPO show dec530f:authoring/site.config.json > $D/authoring/site.config.json
 git -C $REPO show $c:authoring/tools/layouttest.cjs > $D/authoring/tools/layouttest.cjs
 python3 -I $(dirname $0)/mutate.py $D/site/verstehen.html $n $D/authoring/tools/layouttest.cjs || exit 2
 (cd $D && node authoring/tools/layouttest.cjs $D/out > $D/lauf.txt 2>&1; echo "exit $?" >> $D/lauf.txt)
done
echo "== $n"; for c in 5b7e799 dec530f b72d59d; do printf -- "-- %s: " $c; grep -E "tension|figure|Abweichungen|B2c|Error|exit" $R/$c/lauf.txt | head -6 | tr '\n' ' '; echo; done
