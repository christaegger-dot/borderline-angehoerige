// Nachprüfung r4-74: Suche bei 375 px Breite, 100 % und 200 % Schrift, mit echter Tastatureingabe; vorher und nachher.
// Aufruf: node bedienung.cjs <vorher-site> <nachher-site> <ausgabeordner>
const fs = require('node:fs'), path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const [dirA, dirB, out] = process.argv.slice(2);
const queries = ['Suizit', 'Er sagt er will nicht mehr', 'mein Mann schlägt die Kinder', 'suizidgefährdet', 'FU', 'xyzqq'];
(async () => {
  const browser = await chromium.launch(); const lines = []; const errors = [];
  for (const [name, dir] of [['vorher', dirA], ['nachher', dirB]]) for (const scale of [100, 200]) {
    const page = await browser.newPage({ viewport: { width: 375, height: 667 } });
    page.on('pageerror', e => errors.push(`${name}: ${e}`));
    await page.goto('file://' + path.resolve(dir) + '/suche.html');
    if (scale !== 100) await page.addStyleTag({ content: `html{font-size:${scale}% !important}` });
    for (const q of queries) {
      await page.click('#site-search'); await page.fill('#site-search', ''); await page.keyboard.type(q, { delay: 5 });
      const m = await page.evaluate(() => { const i = document.querySelector('#site-search'); const r = i.getBoundingClientRect(); const vis = [...document.querySelectorAll('[data-search-results] > li:not([hidden])')]; const st = document.querySelector('[role=status], [aria-live]'); const wide = vis.filter(li => li.getBoundingClientRect().right > innerWidth + 1).length;
        return { over: document.documentElement.scrollWidth - document.documentElement.clientWidth, inputW: Math.round(r.width), inputH: Math.round(r.height), fs: getComputedStyle(i).fontSize, n: vis.length, first: vis[0] ? vis[0].querySelector('a').getAttribute('href') : '–', status: st ? st.textContent.trim().slice(0, 60) : '(kein Statusfeld gefunden)', wide, empty: !!document.querySelector('[data-search-empty]:not([hidden])') }; });
      // Tastatur: Tab vom Feld zum ersten Treffer
      let focusHref = '–'; for (let t = 0; t < 4 && m.n; t++) { await page.keyboard.press('Tab'); focusHref = await page.evaluate(() => document.activeElement && document.activeElement.getAttribute ? document.activeElement.getAttribute('href') || '–' : '–'); if (focusHref === m.first) break; }
      lines.push(`${name} | ${scale} % | «${q}» | Überlauf ${m.over} px | Feld ${m.inputW} × ${m.inputH} px, Schrift ${m.fs} | Treffer ${m.n}, erster ${m.first} | Treffer breiter als Fenster: ${m.wide} | Status: ${m.status} | mit Tab erreicht: ${m.n ? (focusHref === m.first ? 'ja' : 'nein (' + focusHref + ')') : 'entfällt'}`);
    }
    if (name === 'nachher') await page.screenshot({ path: path.join(out, `suche-375-${scale}-nachher.png`), fullPage: false });
    await page.close();
  }
  lines.push(`JS-Fehler: ${errors.length} ${errors.join(' | ')}`);
  fs.writeFileSync(path.join(out, 'bedienung-375.txt'), lines.join('\n') + '\n'); console.log(lines.join('\n'));
  await browser.close();
})();
