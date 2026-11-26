// Waagrechter Überlauf bei 100, 200 und 300 % Schrift (CDP Page.setFontSizes), alle Seiten, 320/375/768 px, vorher (8771) und nachher (8770).
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const fs=require('fs');
const pages=fs.readdirSync('site').filter(f=>f.endsWith('.html'));
(async()=>{const b=await chromium.launch();
for(const [name,base] of [['vorher','http://127.0.0.1:8771/'],['nachher','http://127.0.0.1:8770/']]){const bad=[];let runs=0;
 for(const w of [320,375,768])for(const fs_ of [16,32,48]){const ctx=await b.newContext({viewport:{width:w,height:800}});const p=await ctx.newPage();const cdp=await ctx.newCDPSession(p);await cdp.send('Page.setFontSizes',{fontSizes:{standard:fs_}});
  for(const f of pages){await p.goto(base+f,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);runs++;const sw=await p.evaluate(()=>document.documentElement.scrollWidth);if(sw>w+1)bad.push(`${f} ${w}px ${fs_*100/16}%: ${sw}`);}
  await ctx.close();}
 console.log(`${name}: ${runs} Läufe, Überlauf ${bad.length}${bad.length?' · '+bad.slice(0,8).join(' | '):''}`);}
await b.close();})();
