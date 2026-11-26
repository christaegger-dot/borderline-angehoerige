// Welche Elemente ragen bei <breite>/<schrift> über den rechten Rand? Aufruf: node verursacher.cjs <url> <breite> <schrift>
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const [url, w, f] = process.argv.slice(2);
(async () => { const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: +w, height: 900 } }); const pg = await ctx.newPage();
  const cdp = await ctx.newCDPSession(pg); await cdp.send('Page.setFontSizes', { fontSizes: { standard: +f } });
  await pg.goto(url, { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready);
  console.log(JSON.stringify(await pg.evaluate(() => { const o = []; for (const e of document.querySelectorAll('body *')) { const r = e.getBoundingClientRect(); if ((r.right > innerWidth + 1) || (e.scrollWidth > e.clientWidth + 1 && e.clientWidth > 0 && getComputedStyle(e).overflowX === "visible")) o.push([e.tagName.toLowerCase() + '.' + (typeof e.className === 'string' ? e.className : ''), Math.round(r.left), Math.round(r.right), e.scrollWidth, e.clientWidth, getComputedStyle(e).whiteSpace, (e.innerText || '').trim().slice(0, 50)]); } return { sw: document.documentElement.scrollWidth, o }; }), null, 1));
  await b.close(); })();
