// Nachprüfung #855: prüft für eine Anfrage, ob die Treffer für eine Person sichtbar sind und in welcher Reihenfolge
// sie auf dem Bildschirm stehen. Vergleicht die Sicht des Suchrasters (DOM-Reihenfolge, checkVisibility, Fläche > 0)
// mit einer Sicht, die Treffpunkt (elementFromPoint), Ausschnitt (overflow, clip, clip-path) und Lage im Dokument prüft.
// Aufruf: node sichtpruefung.cjs <ausgabeordner> <anfrage> name=site [name=site ...]
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/opt/borderline-browser/node_modules/playwright');
const [out, query, ...specs] = process.argv.slice(2);
const T = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
function serve(dir) { dir = path.resolve(dir); const s = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(dir, p); if (!f.startsWith(dir) || !fs.existsSync(f) || !fs.statSync(f).isFile()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': T[path.extname(f)] || 'application/octet-stream' }); r.end(fs.readFileSync(f)); }); return new Promise(ok => s.listen(0, '127.0.0.1', () => ok(s))); }
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch(); const lines = [];
  for (const spec of specs) {
    const [name, dir] = spec.split('='); const s = await serve(dir);
    const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })).newPage();
    await page.goto(`http://127.0.0.1:${s.address().port}/suche.html`, { waitUntil: 'networkidle' });
    await page.fill('#site-search', query);
    const r = await page.evaluate(() => {
      const rasterSichtbar = el => el.checkVisibility({ opacityProperty: true, visibilityProperty: true }) && (b => b.width > 0 && b.height > 0)(el.getBoundingClientRect());
      const wirklich = el => {
        if (!rasterSichtbar(el)) return false;
        el.scrollIntoView({ block: 'center' });
        const b = el.getBoundingClientRect();
        if (b.width < 4 || b.height < 4) return false;
        const x = b.left + b.width / 2, y = b.top + b.height / 2;
        if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) return false;
        const hit = document.elementFromPoint(x, y);
        return !!hit && (hit === el || el.contains(hit));
      };
      const lis = [...document.querySelectorAll('[data-search-results] > li:not([hidden])')];
      const dom = lis.map(li => li.querySelector('a')).filter(a => a && rasterSichtbar(a)).slice(0, 6).map(a => a.getAttribute('href'));
      window.scrollTo(0, 0);
      const pos = lis.map(li => ({ a: li.querySelector('a'), top: li.getBoundingClientRect().top + scrollY }));
      const echt = pos.filter(p => p.a && wirklich(p.a)).sort((x, y) => x.top - y.top).slice(0, 6).map(p => p.a.getAttribute('href'));
      const box = document.querySelector('[data-search-empty]');
      const leer = box && !box.hidden ? { raster: [...box.querySelectorAll('a')].filter(rasterSichtbar).map(a => a.getAttribute('href')), echt: [...box.querySelectorAll('a')].filter(wirklich).map(a => a.getAttribute('href')) } : null;
      window.scrollTo(0, 0);
      return { dom, echt, leer };
    });
    const k = h => h.replace('.html', '');
    lines.push(`${name} | «${query}» | Sicht des Rasters: ${r.dom.slice(0, 3).map(k).join(' > ') || '–'} | Bildschirm: ${r.echt.slice(0, 3).map(k).join(' > ') || '–'}${r.leer ? ` | Leermeldung Raster: ${r.leer.raster.map(k).join(', ') || '–'} · Bildschirm: ${r.leer.echt.map(k).join(', ') || '–'}` : ''}`);
    await page.locator('#seitensuche').screenshot({ path: path.join(out, `${name}-${query.replace(/[^a-z0-9]+/gi, '_')}.png`) }).catch(() => {});
    s.close();
  }
  await browser.close();
  fs.appendFileSync(path.join(out, 'sichtpruefung.txt'), lines.join('\n') + '\n'); console.log(lines.join('\n'));
})();
