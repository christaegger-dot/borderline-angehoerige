#!/bin/bash
# Härtung des Suchrasters: Konstruktionen der Nachprüfung #849 gegen das gehärtete Raster.
# Aufruf aus dem Repository: STAENDE=<ordner> K=<ordner> bash audit-results/2026-11-27-haertung-suchraster/werkzeug/konstruktionen.sh
# STAENDE/<r73|r75|r76>/site: per «git archive <commit> site» (r4-73 3764d45, r4-75 e8efa78, r4-76 b529695)
# K/<k1|k2|k3|k5|k9>/site: Kopie von STAENDE/r76/site mit «patch -p2 -d K/kN/site < audit-results/2026-11-26-nachpruefung-suchraster/konstruktionen/kN.diff»
set -u
A=audit-results/2026-11-27-haertung-suchraster
OUT=${OUT:-dist/haertung}
run() { name=$1; shift; node authoring/tools/suchraster.mjs "$@" --ausgabe=$OUT/$name > $OUT/log-$name.txt 2>&1; echo "$name rc=$?"; sed -n 2p $OUT/log-$name.txt; }
mkdir -p $OUT
run k1 $STAENDE/r76/site $K/k1/site --nur=proben
run k2 $STAENDE/r76/site $K/k2/site --nur=proben
run k5 $STAENDE/r76/site $K/k5/site --nur=proben
run k9 $STAENDE/r76/site $K/k9/site --nur=proben
run k6 $STAENDE/r76/site $STAENDE/r76/site --ausnahmen=audit-results/2026-11-26-nachpruefung-suchraster/konstruktionen/k6-suchraster-ausnahmen.tsv
run k6b $STAENDE/r73/site $STAENDE/r75/site --nur=proben --ausnahmen=$A/werkzeug/k6b-ausnahmen.tsv
run k6c $STAENDE/r76/site $STAENDE/r76/site --ausnahmen=$A/werkzeug/k6c-ausnahmen.tsv
run k3 $STAENDE/r76/site $K/k3/site --nur=saetze
