// Nachprüfung r4-70/r4-71: eigene Messung. Aufruf: node messung.cjs <teil> ; Versionen auf Ports 8801 (r4-69), 8802 (r4-70), 8803 (r4-71)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const fs = require('fs');
const V = { 'r4-69': 'http://localhost:8801/', 'r4-70': 'http://localhost:8802/', 'r4-71': 'http://localhost:8803/' };
const part = process.argv[2];
const pages = fs.readdirSync(process.argv[3] || '.').filter(f => f.endsWith('.html')).sort();
const out = [];
const log = (...a) => { const s = a.map(x => typeof x === 'string' ? x : JSON.stringify(x)).join(' '); out.push(s); console.log(s); };
async function ctxFor(b, w, h, font, js = true) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, javaScriptEnabled: js, locale: 'de-CH' });
  const pg = await ctx.newPage();
  if (font && font !== 16) { const cdp = await ctx.newCDPSession(pg); await cdp.send('Page.setFontSizes', { fontSizes: { standard: font } }); }
  return { ctx, pg };
}
async function go(pg, url) { await pg.goto(url, { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready); }
(async () => {
  const b = await chromium.launch();
  if (part === 'telefon') {
    for (const [w, h] of [[390, 844], [375, 812], [360, 740], [375, 667], [320, 568]]) for (const [v, base] of Object.entries(V)) {
      const { ctx, pg } = await ctxFor(b, w, h);
      await go(pg, base + 'index.html');
      const idx = await pg.evaluate(() => { const top = s => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().top + scrollY) : null; };
        return { kopf: Math.round(document.querySelector('header.puk-web-header').getBoundingClientRect().height), karte: top('.bl-paths-cards li'), utilZeile: getComputedStyle(document.querySelector('.puk-site-subbar .puk-site-utility')).display }; });
      await go(pg, base + 'krise.html');
      const kr = await pg.evaluate(() => { const top = e => e ? Math.round(e.getBoundingClientRect().top + scrollY) : null; const a = document.querySelector('.puk-site-quick a[href="tel:144"]');
        return { n144: top(a), n144unten: a ? Math.round(a.getBoundingClientRect().bottom + scrollY) : null, hinweisUnten: Math.round(document.querySelector('.puk-site-quick [data-responsibility-inline]').getBoundingClientRect().bottom + scrollY), schritt1: top(document.querySelector('.puk-site-quick li')), schritt1unten: Math.round(document.querySelector('.puk-site-quick li').getBoundingClientRect().bottom + scrollY) }; });
      log(`${w}x${h} ${v}`, { ...idx, ...kr, ersterBildschirm: h });
      await ctx.close();
    }
  }
  if (part === 'menue') {
    for (const [v, base] of Object.entries(V)) for (const [w, font, js] of [[375, 16, true], [375, 16, false], [320, 16, true], [760, 16, true], [761, 16, true], [780, 16, true], [799, 16, true], [800, 16, true], [1280, 32, true], [390, 32, true], [390, 48, true], [700, 12, true]]) {
      const { ctx, pg } = await ctxFor(b, w, 812, font, js);
      await go(pg, base + 'index.html');
      const vor = await pg.evaluate(() => ({ util: [...document.querySelectorAll('.puk-site-utility a')].filter(a => a.getClientRects().length).map(a => a.textContent),
        menueKnopf: (() => { const k = document.querySelector('.puk-site-menu .puk-disclosure__button'); return k && k.getClientRects().length ? (k.getAttribute('aria-label') || k.textContent.trim()) + ' expanded=' + k.getAttribute('aria-expanded') : null; })(),
        sichtbareNav: [...document.querySelectorAll('.puk-web-nav a')].filter(a => a.getClientRects().length && getComputedStyle(a).visibility !== 'hidden').map(a => a.textContent) }));
      let nachOeffnen = null, tab = null, fokus = null;
      const knopf = pg.locator('.puk-site-menu .puk-disclosure__button');
      if (js && await knopf.count() && await knopf.isVisible()) {
        await knopf.click();
        nachOeffnen = await pg.evaluate(() => [...document.querySelectorAll('.puk-web-nav a')].filter(a => a.getClientRects().length).map(a => a.textContent));
        // Fokusreihenfolge ab dem Menüknopf
        await knopf.focus(); tab = [];
        for (let i = 0; i < 10; i++) { await pg.keyboard.press('Tab'); tab.push(await pg.evaluate(() => { const e = document.activeElement; return (e.textContent || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 30); })); }
        // Fokusanzeige auf dem ersten Direkteinstieg im Menü
        const ul = pg.locator('.puk-site-menu__utility-link').first();
        if (await ul.isVisible()) { await ul.focus(); await pg.keyboard.press('Shift+Tab'); await pg.keyboard.press('Tab');
          fokus = await ul.evaluate(e => { const s = getComputedStyle(e); return { outline: s.outlineStyle + ' ' + s.outlineWidth + ' ' + s.outlineColor, shadow: s.boxShadow, h: Math.round(e.getBoundingClientRect().height), fs: s.fontSize, visible: e.matches(':focus-visible') }; }); }
        await pg.keyboard.press('Escape');
        const nachEsc = await pg.evaluate(() => ({ exp: document.querySelector('.puk-site-menu .puk-disclosure__button')?.getAttribute('aria-expanded'), fokus: document.activeElement.className }));
        fokus = { ...fokus, nachEsc };
      }
      const ov = await pg.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      log(`${v} ${w}px font${font} js=${js}`, { ...vor, nachOeffnen, tab, fokus, ueberlauf: ov });
      await ctx.close();
    }
  }
  if (part === 'absender') {
    for (const [v, base] of Object.entries(V)) {
      const res = [];
      for (const font of [16, 32, 48]) for (const w of [320, 360, 375, 390, 414, 600, 760, 761, 780, 800, 820, 840, 860, 880, 900, 920, 960, 1024, 1100, 1200, 1280, 1440]) {
        const { ctx, pg } = await ctxFor(b, w, 900, font);
        await go(pg, base + 'index.html');
        const r = await pg.evaluate(() => {
          const p = document.querySelector('.puk-site-sender'); const pr = p.getBoundingClientRect();
          const items = [...p.querySelectorAll('.puk-site-sender__label,.puk-site-sender__name,.puk-site-sender__contact,a')].filter(e => e.getClientRects().length);
          const R = e => { const rs = [...e.getClientRects()]; return { t: Math.round(rs[0].top), l: Math.round(rs[0].left), lastT: Math.round(rs[rs.length - 1].top) }; };
          const lab = p.querySelector('.puk-site-sender__contact'), a = p.querySelector('a');
          const name = p.querySelector('.puk-site-sender__name');
          const lines = new Set(); items.forEach(e => [...e.getClientRects()].forEach(x => lines.add(Math.round(x.top))));
          // eingerückt: beginnt eine Zeile (ausser der ersten) rechts vom linken Rand?
          const starts = {}; items.forEach(e => [...e.getClientRects()].forEach(x => { const t = Math.round(x.top); starts[t] = Math.min(starts[t] ?? 1e9, Math.round(x.left)); }));
          const indent = Object.entries(starts).filter(([t, l]) => l > Math.round(pr.left) + 1).map(([t, l]) => l - Math.round(pr.left));
          return { zeilen: lines.size, getrennt: lab && a ? R(lab).lastT !== R(a).t : null, abstandNameBeratung: lab && name.getClientRects().length ? Math.round(lab.getBoundingClientRect().left - [...name.getClientRects()].pop().right) : null,
            eingerueckt: indent, ueberlauf: document.documentElement.scrollWidth - innerWidth, pRechts: Math.round(pr.right - innerWidth) };
        });
        res.push(`${font}/${w}: z${r.zeilen} getrennt=${r.getrennt} abst=${r.abstandNameBeratung} einr=${JSON.stringify(r.eingerueckt)} ov=${r.ueberlauf}`);
        await ctx.close();
      }
      log(v); res.forEach(x => log('  ' + x));
    }
  }
  if (part === 'zeilen') {
    // längste Zeile (Zeichen) je Bereich bei 1440 und 1024 px; Vertiefungen offen
    for (const w of [1440, 1024]) for (const [v, base] of Object.entries(V)) {
      const max = { vertiefung: [0, ''], caption: [0, ''], krisenEinleitung: [0, ''] };
      for (const p of pages) {
        const { ctx, pg } = await ctxFor(b, w, 900);
        await go(pg, base + p);
        const r = await pg.evaluate(() => {
          document.querySelectorAll('details').forEach(d => d.open = true);
          const longest = sel => { let m = 0; for (const el of document.querySelectorAll(sel)) { if (!el.getClientRects().length) continue;
            const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); const lines = {}; let n;
            while ((n = walker.nextNode())) if (!n.parentElement.closest(".puk-sr")) for (let i = 0; i < n.data.length; i++) { const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + 1); const rc = r.getClientRects()[0]; if (!rc) continue; const t = Math.round(rc.top); lines[t] = (lines[t] || 0) + 1; }
            for (const c of Object.values(lines)) m = Math.max(m, c); } return m; };
          return { vertiefung: longest('.puk-vis-more__body p'), caption: longest('.puk-vis-caption'), krisenEinleitung: longest('.bl-crisis-intro>*') };
        });
        for (const k of Object.keys(max)) if (r[k] > max[k][0]) max[k] = [r[k], p];
        await ctx.close();
      }
      log(`${w}px ${v}`, max);
    }
  }
  if (part === 'klein') {
    // Text unter 16 px am Bildschirm, alle Seiten, Vertiefungen offen; HTML-Text und SVG-Text (mit Massstab)
    for (const [v, base] of Object.entries(V)) for (const w of [320, 360, 375, 768, 1024, 1440]) {
      let html = 0, svg = 0; const wo = {};
      for (const p of pages) {
        const { ctx, pg } = await ctxFor(b, w, 900);
        await go(pg, base + p);
        const r = await pg.evaluate(() => {
          document.querySelectorAll('details').forEach(d => d.open = true);
          const res = [];
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
          while ((n = walker.nextNode())) { if (!n.data.trim()) continue; const el = n.parentElement; if (!el || !el.getClientRects().length) continue;
            const s = getComputedStyle(el); if (s.visibility === 'hidden' || el.closest('.puk-sr,.sr-only,[aria-hidden="true"]:not(svg *)')) continue;
            const r0 = document.createRange(); r0.selectNodeContents(n); const rr = r0.getBoundingClientRect(); if (rr.width < 1 || rr.height < 1) continue;
            if (el.closest('svg')) { const t = el.closest('text') || el; const m = t.getScreenCTM && t.getScreenCTM(); const fs = parseFloat(getComputedStyle(t).fontSize) * (m ? Math.hypot(m.a, m.b) : 1); if (fs < 15.95) res.push(['svg', Math.round(fs * 10) / 10, (t.getAttribute('class') || t.tagName) + ':' + n.data.trim().slice(0, 25)]); }
            else { const fs = parseFloat(s.fontSize); if (fs < 15.95) res.push(['html', fs, el.tagName + '.' + String(el.className).split(' ')[0] + ':' + n.data.trim().slice(0, 25)]); } }
          // auch Pseudo-Elemente mit Inhalt (Brotkrümel)
          return res;
        });
        for (const [k, fs, d] of r) { if (k === 'html') html++; else svg++; const key = k + ' ' + fs + ' ' + d.split(':')[0]; wo[key] = (wo[key] || 0) + 1; }
        await ctx.close();
      }
      log(`${v} ${w}px: html<16 ${html}, svg<16 ${svg}`, Object.entries(wo).sort((a, b2) => b2[1] - a[1]).slice(0, 8));
    }
  }
  if (part === 'ueberlauf') {
    for (const [v, base] of Object.entries(V)) { let runs = 0, bad = [];
      for (const font of [16, 32, 48]) for (const w of [320, 360, 375, 768]) for (const p of pages) {
        const { ctx, pg } = await ctxFor(b, w, 812, font); await go(pg, base + p);
        const ov = await pg.evaluate(() => document.documentElement.scrollWidth - innerWidth); runs++; if (ov > 0) bad.push(`${font}/${w}/${p}:${ov}`); await ctx.close(); }
      log(`${v}: Läufe ${runs}, Überlauf ${bad.length}`, bad.slice(0, 10)); }
  }
  if (part === 'misc') {
    for (const [v, base] of Object.entries(V)) for (const w of [375, 1440]) {
      const { ctx, pg } = await ctxFor(b, w, 900); await go(pg, base + 'index.html');
      const gap = await pg.evaluate(() => { const q = document.querySelector('.puk-site-quick-entry'), g = document.querySelector('.puk-site-paths'); return q && g ? { abstand: Math.round(q.getBoundingClientRect().top - g.getBoundingClientRect().bottom), mt: getComputedStyle(q).marginTop, text: q.textContent.trim().slice(0, 30) } : null; });
      await go(pg, base + 'suche.html');
      const bc = await pg.evaluate(() => { const lis = [...document.querySelectorAll('.puk-site-breadcrumb li')]; return lis.map(li => ({ t: Math.round(li.getBoundingClientRect().top), text: li.textContent, before: getComputedStyle(li, '::before').content, after: getComputedStyle(li, '::after').content })); });
      const satz = await pg.evaluate(() => (document.querySelector('main').innerText.match(/Suchen Sie mit Ihren eigenen Worten\./g) || []).length);
      await go(pg, base + 'krise.html');
      const hinweis = await pg.evaluate(() => { const e = document.querySelector('.puk-site-quick [data-responsibility-inline]'); const q = document.querySelector('.puk-site-quick'); return { text: e.textContent, html: e.outerHTML, reihenfolge: [...q.children].map(c => c.tagName + (c.hasAttribute('data-responsibility-inline') ? '[hinweis]' : '')).join(','), anzahl144: document.querySelectorAll('main a[href="tel:144"]').length }; });
      log(`${v} ${w}px`, { gap, bc, satzSuche: satz, reihenfolge: hinweis.reihenfolge, anzahl144: hinweis.anzahl144 });
      if (w === 375) fs.writeFileSync(process.env.S + `/hinweis-${v}.html`, hinweis.html);
      await ctx.close();
    }
  }
  if (part === 'cls') {
    for (const [v, base] of Object.entries(V)) for (const p of ['index.html', 'krise.html']) {
      const { ctx, pg } = await ctxFor(b, 375, 812);
      await pg.addInitScript(() => { window.__cls = 0; new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); });
      await pg.goto(base + p, { waitUntil: 'load' }); await pg.waitForTimeout(800);
      log(`${v} ${p} CLS`, await pg.evaluate(() => Math.round(window.__cls * 10000) / 10000)); await ctx.close();
    }
  }
  if (part === 'druck') {
    for (const [v, base] of Object.entries(V)) { const r = [];
      for (const p of pages) { const { ctx, pg } = await ctxFor(b, 1024, 900); await go(pg, base + p);
        await pg.emulateMedia({ media: 'print' });
        const fsz = await pg.evaluate(() => { const g = s => { const e = document.querySelector(s); return e ? getComputedStyle(e).fontSize : '-'; }; return g('.puk-vis-caption') + '/' + g('.puk-vis-more__body'); });
        const pdf = await pg.pdf({ format: 'A4', printBackground: false }); const n = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
        r.push(`${p.replace('.html', '')}:${n}`); if (p === 'verstehen.html' || p === 'krise.html') r.push(`(${p} caption/vertiefung ${fsz})`); await ctx.close(); }
      log(v, r.join(' ')); }
  }
  fs.writeFileSync(process.env.S + `/m-${part}.txt`, out.join('\n') + '\n');
  await b.close();
})();
