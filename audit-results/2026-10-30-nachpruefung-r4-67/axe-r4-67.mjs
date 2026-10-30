// axe-core auf allen Seiten von dist/site bei 390 und 1280 px; axe aus eigenem Ordner, geladen mit page.addScriptTag.
// Aufruf: node axe-r4-67.mjs <dist/site> <axe.min.js>
import { createServer } from 'node:http';
import { readFile, readdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const [root, axePath] = process.argv.slice(2);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png' };
const srv = createServer(async (q, r) => { try { const p = decodeURIComponent(new URL(q.url, 'http://x').pathname); const b = await readFile(join(root, p === '/' ? 'index.html' : p)); r.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); r.end(b); } catch { r.writeHead(404); r.end(); } });
await new Promise(ok => srv.listen(0, ok)); const port = srv.address().port;
const pages = (await readdir(root)).filter(f => f.endsWith('.html')).sort();
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const b = await chromium.launch(); let runs = 0, viol = 0; const lines = [];
for (const w of [390, 1280]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } }); const pg = await ctx.newPage();
  for (const f of pages) {
    await pg.goto(`http://localhost:${port}/${f}`); await pg.addScriptTag({ path: axePath });
    const res = await pg.evaluate(async () => (await window.axe.run(document)).violations.map(v => v.id + ':' + v.nodes.length));
    runs++; viol += res.length; if (res.length) lines.push(`${w} ${f} ${res.join(' ')}`);
  }
  await ctx.close();
}
const build = (await readFile(join(root, 'index.html'), 'utf8')).match(/data-puk-site-build="([^"]+)"/)[1];
console.log(lines.join('\n') + (lines.length ? '\n' : '') + `build ${build} · Seiten: ${pages.length} · Läufe: ${runs} · Verstösse: ${viol} · axe-core ${require(axePath.replace(/axe\.min\.js$/, 'package.json')).version} · Chromium ${b.version()}`);
await b.close(); srv.close();
