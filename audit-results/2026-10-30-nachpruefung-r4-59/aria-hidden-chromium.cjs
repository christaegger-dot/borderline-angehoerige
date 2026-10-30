const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage(); const cdp = await p.context().newCDPSession(p);
  console.log('Chromium', b.version());
  for (const v of ['true','TRUE','True','true ',' true',' true ','true\t','yes','0','x','false','False','FALSE','false ',' false ','undefined','']) {
    await p.setContent(`<main><nav aria-label="Direkteinstiege" aria-hidden="${v}"><a href="a">Kurz und klar</a></nav></main>`);
    const { nodes } = await cdp.send('Accessibility.getFullAXTree');
    const link = nodes.find(n => n.role && n.role.value === 'link' && !n.ignored); const navN = nodes.find(n => n.role && n.role.value === 'navigation'); const ign = nodes.filter(n=>n.ignored).map(n=>(n.ignoredReasons||[]).map(r=>r.name).join('+')).filter(Boolean).join(',');
    const snap = await p.locator('main').ariaSnapshot();
    console.log(JSON.stringify(v), ign, '=> CDP:', link ? 'sichtbar' : 'verborgen', '| ariaSnapshot:', snap.includes('link') ? 'sichtbar' : 'verborgen');
  }
  await b.close();
})();
