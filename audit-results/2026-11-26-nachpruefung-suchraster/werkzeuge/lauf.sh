#!/bin/bash
# lauf.sh <name> <tool> <bezug> <pruef> [optionen…]: ein Rasterlauf mit Zeit und Rückgabewert
cd "$(dirname "$0")"  # Arbeitsordner mit st/<stand>/site, tool/ und den Werkzeugkopien
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
n=$1; t=$2; a=$3; b=$4; shift 4
s=$(date +%s); node $t/authoring/tools/suchraster.mjs st/$a/site st/$b/site --ausgabe=out/$n "$@" > log-$n.txt 2>&1; rc=$?
echo "rc=$rc dauer=$(( $(date +%s)-s ))s" >> log-$n.txt
