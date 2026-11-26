#!/bin/bash
# Gates in einem Worktree: gates.sh <worktree> <logdatei>
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
cd "$1" || exit 2
{ for c in "node authoring/tools/selftest.mjs" "node authoring/tools/build.mjs --production --verify-site" "node authoring/tools/suchtest.mjs site" "node authoring/tools/sprachtest.mjs site" "node authoring/tools/layouttest.cjs"; do
  echo "=== $c"; $c 2>&1 | tail -6; echo "exit ${PIPESTATUS[0]}"; done; } > "$2"
