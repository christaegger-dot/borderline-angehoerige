// Nachprüfung r4-66: axe-core auf allen Seiten von dist/site (Build von 13f471f) bei 390 und 1280 px, über http-server.
import { createRequire } from "node:module";
import { readdirSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
const require = createRequire(import.meta.url);
const [, , SITE, AXE, OUT] = process.argv;
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const axeVer = require(AXE + "/package.json").version;
const srv = spawn(process.execPath, [require.resolve("/opt/node22/lib/node_modules/http-server/bin/http-server"), SITE, "-p", "8766", "-s", "-c-1"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 1500));
const pages = readdirSync(SITE).filter(f => f.endsWith(".html")).sort();
const b = await chromium.launch(); const lines = []; let viol = 0, runs = 0, build = "";
for (const w of [390, 1280]) for (const p of pages) {
  const pg = await b.newPage({ viewport: { width: w, height: 900 } });
  await pg.goto("http://127.0.0.1:8766/" + p, { waitUntil: "load" });
  build = await pg.getAttribute("html", "data-puk-site-build");
  await pg.addScriptTag({ path: AXE + "/axe.min.js" });
  const r = await pg.evaluate(async () => (await axe.run(document, { resultTypes: ["violations"] })).violations.map(v => v.id + "(" + v.nodes.length + ")"));
  runs++; viol += r.length; if (r.length) lines.push(`${w} ${p}: ${r.join(", ")}`);
  await pg.close();
}
await b.close(); srv.kill();
lines.unshift(`axe ${axeVer} · Build ${build} · Seiten ${pages.length} · Läufe ${runs} · Verstösse ${viol}`);
writeFileSync(OUT, lines.join("\n") + "\n"); console.log(lines.join("\n"));
