const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage(); const cdp = await p.context().newCDPSession(p);
  const cases = {
    inertSpan: '<nav aria-label="Direkteinstiege"><a href="a"><span inert>Kurz und klar</span></a></nav>',
    inertNav: '<nav aria-label="Direkteinstiege" inert><a href="a">Kurz und klar</a></nav>',
    inertLink: '<nav aria-label="Direkteinstiege"><a href="a" inert>Kurz und klar</a></nav>',
    TrueMixed: '<nav aria-label="Direkteinstiege" aria-hidden="True"><a href="a">Kurz und klar</a></nav>',
    trailing: '<nav aria-label="Direkteinstiege" aria-hidden="true "><a href="a">Kurz und klar</a></nav>',
    decor: '<nav aria-label="Direkteinstiege"><a href="a">Kurz und klar<span aria-hidden="true"> →</span></a></nav>',
  };
  for (const [k, h] of Object.entries(cases)) {
    await p.setContent('<main>' + h + '</main>');
    const { nodes } = await cdp.send('Accessibility.getFullAXTree');
    const links = nodes.filter(n => n.role && n.role.value === 'link');
    const nav = nodes.filter(n => n.role && n.role.value === 'navigation');
    const focusable = await p.evaluate(() => { const a = document.querySelector('a'); a.focus(); return document.activeElement === a; });
    console.log(k, '| nav:', nav.map(n => (n.ignored ? 'ignored' : 'shown')).join(','), '| link:', links.map(n => `${n.ignored ? 'ignored' : 'shown'} name="${n.name && n.name.value}"` + (n.properties||[]).filter(x=>x.name==='disabled').map(x=>' disabled='+x.value.value).join('')).join(';') || 'none', '| fokussierbar:', focusable);
  }
  await b.close();
})();
