#!/bin/bash
# Nachprüfung der Härtung des Suchrasters (PR #855): Läufe dieser Prüfung reproduzieren.
# Aufruf aus dem Repository: A=<arbeitsordner> bash audit-results/2026-11-27-nachpruefung-haertung-suchraster/werkzeug/lauf.sh
# Braucht PLAYWRIGHT_MODULE (z. B. /opt/borderline-browser/node_modules/playwright).
set -u
N=audit-results/2026-11-27-nachpruefung-haertung-suchraster
K49=audit-results/2026-11-26-nachpruefung-suchraster/konstruktionen
PR=claude/sharp-mendel-6ecwbi
mkdir -p "$A/st" "$A/k" "$A/wz/neu" "$A/out"
# Stände
for p in r4-73:3764d45 r4-75:e8efa78 r4-76:b529695 r4-77:9d3b7d4; do mkdir -p "$A/st/${p%%:*}"; git archive "${p##*:}" site | tar -x -C "$A/st/${p%%:*}"; done
# Werkzeug, Rasterdaten und Proben des PR (Kopf 6210121)
git archive 6210121 authoring/tools/suchraster.mjs authoring/tests | tar -x -C "$A/wz/neu"
T="$A/wz/neu/authoring/tools/suchraster.mjs"
# Konstruktionen K1 bis K9 der Nachprüfung #849 und V1 bis V9 dieser Prüfung, je gegen r4-76
for k in k1 k2 k3 k5 k9; do rm -rf "$A/k/$k"; mkdir -p "$A/k/$k"; cp -r "$A/st/r4-76/site" "$A/k/$k/"; patch -s -p2 -d "$A/k/$k/site" < "$K49/$k.diff"; done
for d in "$N"/konstruktionen/v*.diff; do k=$(basename "$d" .diff); rm -rf "$A/k/$k"; mkdir -p "$A/k/$k"; cp -r "$A/st/r4-76/site" "$A/k/$k/"; patch -s -p2 -d "$A/k/$k/site" < "$d"; done
run() { n=$1; shift; node "$T" "$@" --ausgabe="$A/out/$n" > "$A/out/$n.log" 2>&1; echo "$n rc=$?"; sed -n 2p "$A/out/$n.log"; }
for k in k1 k2 k5 k9 v1-order v2-umkehr v3-ueberlauf v4-clip v5-ausserhalb v6-leer-clip v6b-leer-ausserhalb v7-leer-sr v7b-treffer-sr; do run "$k" "$A/st/r4-76/site" "$A/k/$k/site" --nur=proben; done
run k3 "$A/st/r4-76/site" "$A/k/k3/site" --nur=saetze
run v8-rang3 "$A/st/r4-76/site" "$A/k/v8-rang3/site" --nur=proben,saetze
run v9 "$A/st/r4-76/site" "$A/k/v9/site" --immer
run umgehung "$A/st/r4-73/site" "$A/st/r4-75/site" --nur=proben --ausnahmen="$N/werkzeug/umgehung-ausnahmen.tsv"
run voll-76-77 "$A/st/r4-76/site" "$A/st/r4-77/site" --ausnahmen=keine
run voll-77-77 "$A/st/r4-77/site" "$A/st/r4-77/site" --immer
# Sicht auf dem Bildschirm gegen Sicht des Rasters
node "$N/werkzeug/sichtpruefung.cjs" "$A/out/sicht" "will sterben" r4-76="$A/st/r4-76/site" v1-order="$A/k/v1-order/site" v7b-treffer-sr="$A/k/v7b-treffer-sr/site"
node "$N/werkzeug/sichtpruefung.cjs" "$A/out/sicht" "qqxzqvwxq" r4-76="$A/st/r4-76/site" v7-leer-sr="$A/k/v7-leer-sr/site"
# Abdeckung mit dem Skript der Gegenprüfung #846 (Sätze aus suchraster.json des PR)
node audit-results/2026-11-26-gegenpruefung-r4-76-saldo/abdeckung.cjs "$N/werkzeug/raster-aus-suchraster-json.cjs" "$A/out/abdeckung-cjs.txt" r4-76="$A/st/r4-76/site" r4-77="$A/st/r4-77/site"
# V9 ausserhalb des Rasters: Handelnde «mein kollege», «meine kollegin», «mein chef», «meine chefin» statt der Handelnden des Rasters
# (Kopie von wz/neu mit geänderter suchraster.json, nur Menge «saetze»), siehe ergebnis/v9-ausserhalb-des-rasters.txt
