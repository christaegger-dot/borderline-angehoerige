const fs=require('fs'),path=require('path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || '/opt/npm-tools/node_modules/playwright');
const root=path.resolve(__dirname,'../..');
const out=path.resolve(process.argv[2] || root+'/dist/audit04-layout');fs.mkdirSync(out+'/screenshots',{recursive:true});
const cfgPages=JSON.parse(fs.readFileSync(root+'/authoring/site.config.json')).pages,pages=cfgPages.map(p=>p.id),rows=[],errors=[];
/* Hauptbereiche mit den freigegebenen Namen (E2, 29.10.2026; r4-47 nach Nachprüfung N46-6 fest statt aus dem Seitenvertrag) */
const navNames=['Verstehen','Im Alltag','Krisen','Familie','Für Sie'];
(async()=>{
 const server=require('http').createServer((req,res)=>{let file=root+'/site'+decodeURIComponent(req.url.split('?')[0]);try{let ext=path.extname(file);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'})[ext]||'application/octet-stream');res.end(fs.readFileSync(file));}catch(e){res.statusCode=404;res.end();}});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';
 for(const large of [false,true]){
  const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true,args:['--no-sandbox',...(large?['--blink-settings=defaultFontSize=32,defaultFixedFontSize=26']:[])]});
  const context=await browser.newContext({viewport:{width:375,height:812},locale:'de-CH'}),p=await context.newPage();
  p.on('pageerror',e=>errors.push(String(e)));
  for(const width of [320,375,768,1024,1440]){
   await p.setViewportSize({width,height:812});
   for(const page of pages){
    await p.goto(base+''+page+'.html',{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);
    const result=await p.evaluate(()=>{
     const pos=s=>{let e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return {y:Math.round(r.top+scrollY),h:Math.round(r.height),width:Math.round(r.width)}};
     const over=[...document.querySelectorAll('main *,header *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+2&&!e.closest('svg')&&!e.closest('.puk-sr')&&getComputedStyle(e).position!=='absolute'}).map(e=>({tag:e.tagName,cls:String(e.className),text:e.textContent.slice(0,55)}));
     const h1=document.querySelector('main h1'),node=h1&&[...h1.childNodes].find(n=>n.nodeType===3),title={broken:[],hyphenated:[],hyphens:h1?getComputedStyle(h1).hyphens:null};
     if(node){const text=node.data;let prev=null,wordStart=0;const word=i=>{let a=i,b=i;while(a>0&&!/\s/.test(text[a-1]))a--;while(b<text.length&&!/\s/.test(text[b]))b++;return text.slice(a,b).replace(/\u00AD/g,'|');};
      /* r4-42 (N41-W1): Jeder Zeilenwechsel innerhalb eines Wortes ist nur an einer weichen Trennstelle (U+00AD) erlaubt, nicht nur irgendwo im Wort. */
      for(let i=0;i<text.length;i++){if(/\s/.test(text[i])){prev=null;continue;}const r=document.createRange();r.setStart(node,i);r.setEnd(node,i+1);const rects=[...r.getClientRects()].filter(x=>x.width>0);if(!rects.length){continue;}const top=Math.round(Math.max(...rects.map(x=>x.top)));/* Chromium meldet für das Zeichen nach einer Trennstelle auch den Trennstrich der Vorzeile; massgebend ist das unterste Rechteck. */if(prev!==null&&Math.abs(top-prev)>2){const w=word(i);if(text[i-1]==='\u00AD'||text[i]==='\u00AD'){if(!title.hyphenated.includes(w))title.hyphenated.push(w);}else if(!title.broken.includes(w))title.broken.push(w+'@'+i);}prev=top;}}
     return {title,scrollWidth:document.documentElement.scrollWidth,rootFont:getComputedStyle(document.documentElement).fontSize,header:pos('header'),input:pos('input'),quick:pos('.puk-site-quick'),firstCrisisStep:pos('.puk-site-quick li'),curve:pos('[data-visual-id="v-vs-anspannung"]'),firstQuote:pos('.bl-sicht .puk-vis-compare__col'),tableWidth:pos('.bl-tabelle'),tableRegion:pos('.puk-vis-tablewrap'),overflow:over.slice(0,10),copy:pos('.puk-longform__copy')};
    });
    rows.push({page,width,large,...result});
    if(!large&&width===375&&['krise','suche','begriffe','quellen'].includes(page))await p.screenshot({path:out+'/screenshots/'+page+'-375.png'});
    if(width===375&&['verstehen','kinder','genesung','jugendliche','selbstfuersorge','beziehungen','behandlung'].includes(page)){
     let fig=p.locator('figure').first();if(await fig.count()){await fig.scrollIntoViewIfNeeded();await fig.screenshot({path:out+'/screenshots/'+page+'-figure-375'+(large?'-200':'')+'.png'});}
    }
    if(!large&&width===1440&&page==='index')await p.locator('#einstiege').screenshot({path:out+'/screenshots/index-einstiege-1440.png'});
   }
  }
  await p.setViewportSize({width:768,height:812});await p.goto(base+'index.html');
  const btn=p.locator('.puk-disclosure__button');await btn.focus();await p.keyboard.press('ArrowDown');
  rows.push({test:'menu arrow opens and focuses first link',large,ok:await p.locator('.puk-web-nav a').first().evaluate(e=>e===document.activeElement)});
  await p.keyboard.press('Escape');rows.push({test:'menu Escape closes and restores button focus',large,ok:await btn.evaluate(e=>e===document.activeElement&&e.getAttribute('aria-expanded')==='false')});
  await p.setViewportSize({width:1440,height:812});rows.push({test:'resize wide navigation visible',large,ok:large?await btn.isVisible():await p.locator('.puk-web-nav a').first().isVisible()});
  for(const page of ['suche','begriffe','quellen']){
   await p.goto(base+''+page+'.html');let input=p.locator('input').first();
   for(const query of ['DBT','zzzzkeinbegriff','']){await input.fill(query);await p.waitForTimeout(220);rows.push({test:'search/filter state',large,page,query,status:await p.locator('[role="status"]').first().textContent()});}
  }
  await browser.close();
 }
 const b=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});const c=await b.newContext({javaScriptEnabled:false,viewport:{width:375,height:812}}),p=await c.newPage();await p.goto(base+'index.html');rows.push({test:'no JS five navigation links visible',ok:JSON.stringify((await p.locator('.puk-web-nav a:visible').allTextContents()).map(t=>t.trim()))===JSON.stringify(navNames)});await b.close();server.close();
 fs.writeFileSync(out+'/BROWSER.json',JSON.stringify({rows,errors},null,2));
 const issues=rows.filter(r=>r.width&&(r.scrollWidth>r.width+2||r.overflow?.length)).map(r=>`${r.page} ${r.width}px text200=${r.large}: horizontal overflow`);
 for(const r of rows){
  if(r.ok===false)issues.push(r.test);
  if(!r.large&&r.page==='index'&&r.width===375&&r.header.h>220)issues.push('375px header exceeds 220px');
  if(!r.large&&r.page==='index'&&r.width===320&&r.header.h>250)issues.push('320px header exceeds 250px');
  if(!r.large&&r.width===375&&r.page==='krise'&&r.firstCrisisStep.y>=812)issues.push('first crisis step below first screen');
  if(!r.large&&r.width===375&&['suche','begriffe','quellen'].includes(r.page)&&r.input.y+r.input.h>812)issues.push(r.page+' input below first screen');
  if(!r.large&&r.width===375&&r.page==='verstehen'&&r.curve.h>1800)issues.push('tension core exceeds 1800px');
  if(!r.large&&r.width===1440&&r.page==='beziehungen'&&r.firstQuote.h>150)issues.push('quote card exceeds natural height');
  if(r.large&&[768,1024].includes(r.width)&&r.page==='kommunizieren'&&r.tableWidth.width>r.tableRegion.width+2)issues.push('table fails to become labelled records');
  if(r.width&&r.title&&r.title.broken.length)issues.push(`${r.page} ${r.width}px text200=${r.large}: title word breaks without soft hyphen (${r.title.broken.join(', ')})`);
  if(r.width&&!r.large&&r.title&&r.title.hyphenated.length&&r.title.hyphens==='none')issues.push(`${r.page} ${r.width}px: title word breaks arbitrarily at default font size (${r.title.hyphenated.join(', ')})`);
 }
 if(errors.length)issues.push(...errors);
 fs.writeFileSync(out+'/ERGEBNIS.json',JSON.stringify({states:rows.filter(r=>r.width).length,interactions:rows.filter(r=>r.test).length,issues},null,2));
 console.log(`Audit-04-Layouttest: ${rows.filter(r=>r.width).length} Seitenzustände, ${rows.filter(r=>r.test).length} Bedienproben, ${issues.length} Abweichungen.`);
 if(issues.length){console.error(issues.join('\n'));process.exitCode=1;}
})().catch(e=>{console.error(e);process.exit(1)});
