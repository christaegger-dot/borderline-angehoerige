#!/bin/bash
# Nachprüfung #832: die fünf Gates in einem Arbeitsbaum. Aufruf: gates.sh <Arbeitsbaum> <Name>
cd "$1" || exit 2
echo "## $2 ($(git rev-parse --short HEAD)) · Node $(node -v) · Playwright $(node -e "console.log(require(process.env.PLAYWRIGHT_MODULE+'/package.json').version)") · PLAYWRIGHT_MODULE=$PLAYWRIGHT_MODULE"
for c in "node authoring/tools/selftest.mjs" "node authoring/tools/build.mjs --production --verify-site" "node authoring/tools/suchtest.mjs site" "node authoring/tools/sprachtest.mjs site" "node authoring/tools/layouttest.cjs"; do
  echo "== $c"; $c 2>&1 | tail -6; echo "exit ${PIPESTATUS[0]}"
done
echo "== git status --porcelain"; git status --porcelain; echo "(Ende)"
