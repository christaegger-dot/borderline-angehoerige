const fs=require('fs'),path=require('path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || '/opt/npm-tools/node_modules/playwright');
const root=path.resolve(__dirname,'../..');
const out=path.resolve(process.argv[2] || root+'/dist/audit04-layout');fs.mkdirSync(out+'/screenshots',{recursive:true});
const cfgPages=JSON.parse(fs.readFileSync(root+'/authoring/site.config.json')).pages,pages=cfgPages.map(p=>p.id),rows=[],errors=[];
/* Hauptbereiche mit den freigegebenen Namen (E2, 29.10.2026; r4-47 nach Nachprüfung N46-6 fest statt aus dem Seitenvertrag) */
const navNames=['Verstehen','Im Alltag','Krisen','Familie','Für Sie'];
/* N829-2: bekannte, dokumentierte Abweichungen auf main. Jede Zeile nennt Herkunft und Stelle in der Pendenzendatei. Der Vergleich nimmt den Anfang der Meldung, ohne den Messwert. */
const KNOWN_ISSUES=[
 {id:'safety-card-375x667',match:/^safety card starts in first screen 375x667 /,ref:'r4-70/r4-71, Website-Review Punkt 2: Sicherheitskarte der Startseite unter dem ersten Bildschirm'}
];
/* B2c-Grenzen an einer Stelle, damit Prüfung und Meldungen nicht auseinanderlaufen (Code-Review nach #811, 26.11.2026). */
const B2C_PHASES=4,B2C_PHASE_END_MAX=1800,B2C_FIGURE_MAX=2400;
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
     /* B2c (A04-2014): massgebend ist, wo die vier sichtbaren Phasenkarten enden, gemessen ab dem oberen Rand der Figur, nicht die Höhe der ganzen Figur.
        N809-2: Eine Karte zählt als sichtbar nur mit Höhe, Text und ohne display:none/visibility:hidden/opacity:0; vollständig ist sie mit sichtbarer Überschrift und sichtbarem Absatz (Handlungsmöglichkeit).
        N809-3: massgebend ist die tiefste sichtbare Karte, nicht die letzte im Quelltext. N809-4: Der Schutzhinweis muss sichtbar sein und vor dem ersten Aufklappbereich stehen.
        Als Aufklappbereich zählt nur ein <details> innerhalb der Figur; ein <details> um die ganze Figur macht die Karten nicht unzählbar (Code-Review nach #811).
        N813-3 (Entscheid Christa Egger, 26.11.2026): Ein <details> um die Figur, offen oder geschlossen, ist unzulässig, weil es die Figur einklappbar macht; es wird als eigene Abweichung gemeldet. */
     const fig=document.querySelector('[data-visual-id="v-vs-anspannung"]'),vis=e=>!!e&&e.checkVisibility({opacityProperty:true,visibilityProperty:true})&&e.getBoundingClientRect().height>0&&e.textContent.trim()!=='',ft=fig?fig.getBoundingClientRect().top:0,
      inDisc=e=>{const d=e.closest('details');return !!d&&fig.contains(d);},
      cards=fig?[...fig.querySelectorAll(':scope ol.bl-phase-actions > li')].filter(li=>!inDisc(li)):[],shown=cards.filter(vis),complete=shown.filter(li=>vis(li.querySelector('h3'))&&[...li.querySelectorAll('p')].some(vis)),
      schutz=fig?fig.querySelector('.bl-fig-schutz'):null,firstDetails=fig?fig.querySelector('details'):null,
      curvePhases={wrapped:!!fig&&!!fig.parentElement&&!!fig.parentElement.closest('details'),count:cards.length,visible:shown.length,complete:complete.length,end:shown.length?Math.round(Math.max(...shown.map(li=>li.getBoundingClientRect().bottom))-ft):null,schutzVisible:vis(schutz)&&!inDisc(schutz),schutzBeforeDetails:!!schutz&&(!firstDetails||!!(schutz.compareDocumentPosition(firstDetails)&Node.DOCUMENT_POSITION_FOLLOWING))};
     return {title,curvePhases,scrollWidth:document.documentElement.scrollWidth,rootFont:getComputedStyle(document.documentElement).fontSize,header:pos('header'),input:pos('input'),quick:pos('.puk-site-quick'),firstCrisisStep:pos('.puk-site-quick li'),curve:pos('[data-visual-id="v-vs-anspannung"]'),firstQuote:pos('.bl-sicht .puk-vis-compare__col'),tableWidth:pos('.bl-tabelle'),tableRegion:pos('.puk-vis-tablewrap'),overflow:over.slice(0,10),copy:pos('.puk-longform__copy')};
    });
    rows.push({page,width,large,...result});
    if(!large&&width===375&&['krise','suche','begriffe','quellen'].includes(page))await p.screenshot({path:out+'/screenshots/'+page+'-375.png'});
    if(width===375&&['verstehen','kinder','genesung','jugendliche','selbstfuersorge','beziehungen','behandlung'].includes(page)){
     /* N813-5: Ist die erste Abbildung nicht sichtbar (zum Beispiel in einem geschlossenen <details>), wird das als Abweichung gemeldet. Vorher brach der Test hier mit einem Timeout ab, ohne ERGEBNIS.json. */
     let fig=p.locator('figure').first();if(await fig.count()){if(await fig.isVisible()){await fig.scrollIntoViewIfNeeded();await fig.screenshot({path:out+'/screenshots/'+page+'-figure-375'+(large?'-200':'')+'.png'});}else rows.push({test:`${page} 375px text200=${large}: first figure not visible, screenshot skipped (for example inside a closed <details>)`,ok:false});}
    }
    if(!large&&width===1440&&page==='index')await p.locator('#einstiege').screenshot({path:out+'/screenshots/index-einstiege-1440.png'});
   }
  }
  await p.setViewportSize({width:768,height:812});await p.goto(base+'index.html');
  const btn=p.locator('.puk-disclosure__button');await btn.focus();await p.keyboard.press('ArrowDown');
  rows.push({test:'menu arrow opens and focuses first link',large,ok:await p.locator('.puk-web-nav a').first().evaluate(e=>e===document.activeElement)});
  await p.keyboard.press('Escape');rows.push({test:'menu Escape closes and restores button focus',large,ok:await btn.evaluate(e=>e===document.activeElement&&e.getAttribute('aria-expanded')==='false')});
  await p.setViewportSize({width:1440,height:812});rows.push({test:'resize wide navigation visible',large,ok:large?await btn.isVisible():await p.locator('.puk-web-nav a').first().isVisible()});
  /* Bereinigung der Pendenzen vom 26.11.2026 (Folge von r4-71): Seit r4-71 stehen die Direkteinstiege am Telefon mit Skript nur im Menü.
     Das Gate (N51-1, N52-2) prüft nur das HTML; ob sie sichtbar erreichbar sind, entscheidet das Stylesheet. Bei 375 und 320 px müssen alle
     Direkteinstiege der Zeile entweder in der Zeile unter dem Absender oder nach dem Öffnen des Menüs sichtbar sein. */
  for(const w of [375,320]){
   await p.setViewportSize({width:w,height:812});await p.goto(base+'index.html');await p.evaluate(()=>document.fonts.ready);
   const want=await p.evaluate(()=>[...document.querySelectorAll('.puk-site-utility__link')].map(a=>a.textContent.trim()));
   const shown=()=>p.evaluate(()=>{const v=e=>e.checkVisibility({visibilityProperty:true,opacityProperty:true})&&e.getBoundingClientRect().height>0;return [...new Set([...document.querySelectorAll('.puk-site-utility__link,.puk-site-menu__utility-link')].filter(v).map(a=>a.textContent.trim()))]});
   let got=await shown();
   if(want.some(t=>!got.includes(t))){const mb=p.locator('.puk-disclosure__button');if(await mb.isVisible()){await mb.click();await p.waitForTimeout(150);got=await shown();await mb.click();}}
   const ok=want.length>0&&want.every(t=>got.includes(t));
   rows.push({test:`direct entries reachable ${w}px text200=${large}`+(ok?'':` (sichtbar: ${got.join(', ')||'keine'})`),large,ok});
  }
  for(const page of ['suche','begriffe','quellen']){
   await p.goto(base+''+page+'.html');let input=p.locator('input').first();
   for(const query of ['DBT','zzzzkeinbegriff','']){await input.fill(query);await p.waitForTimeout(220);rows.push({test:'search/filter state',large,page,query,status:await p.locator('[role="status"]').first().textContent()});}
  }
  await browser.close();
 }
 const b=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});const c=await b.newContext({javaScriptEnabled:false,viewport:{width:375,height:812}}),p=await c.newPage();await p.goto(base+'index.html');rows.push({test:'no JS five navigation links visible',ok:JSON.stringify((await p.locator('.puk-web-nav a:visible').allTextContents()).map(t=>t.trim()))===JSON.stringify(navNames)});/* r4-52 (Nachprüfung N49-1): Die Sicherheitskarte der Startseite beginnt bei 390 × 844 im ersten Bildschirm. */const c2=await b.newContext({viewport:{width:390,height:844}}),p2=await c2.newPage();await p2.goto(base+'index.html');rows.push({test:'safety card starts in first screen 390x844',ok:(await p2.locator('.bl-paths-cards li').first().evaluate(e=>e.getBoundingClientRect().top+scrollY))<844});/* r4-53 (Nachprüfung N52-1, N52-3): auch bei 1024 × 768, nach dem Laden der Schriften. */const c3=await b.newContext({viewport:{width:1024,height:768}}),p3=await c3.newPage();await p3.goto(base+'index.html');await p3.evaluate(()=>document.fonts.ready);rows.push({test:'safety card starts in first screen 1024x768',ok:(await p3.locator('.bl-paths-cards li').first().evaluate(e=>e.getBoundingClientRect().top+scrollY))<768});/* r4-70 (Website-Review vom 26.11.2026, Punkt 2): auch auf verbreiteten kleineren Telefonen, nach dem Laden der Schriften. Diese Proben
   schlagen fehl, solange die Sicherheitskarte dort unter dem ersten Bildschirm liegt (gemessen 846 px bei 375 × 812 und 375 × 667, 907 px bei 360 × 740). */for(const [pw,ph] of [[375,812],[375,667],[360,740]]){const cx=await b.newContext({viewport:{width:pw,height:ph}}),px=await cx.newPage();await px.goto(base+'index.html');await px.evaluate(()=>document.fonts.ready);const top=Math.round(await px.locator('.bl-paths-cards li').first().evaluate(e=>e.getBoundingClientRect().top+scrollY));rows.push({test:`safety card starts in first screen ${pw}x${ph}`+(top<ph?'':` (top ${top}px)`),ok:top<ph});}/* r4-72 (Nachprüfung von r4-71, N824-1): kleine Standardschrift. Unter rund 15 px liegt 50rem unter 760 px; die Regeln für das Menü
   (rem) und für die Direkteinstiege (px) dürfen sich dort nicht überschneiden. Je Standardschrift 12 bis 15 px: kein waagrechter Überlauf
   zwischen 560 und 800 px, und kein sichtbarer Direkteinstieg ausserhalb des Bildschirms. */for(const fsz of [12,13,14,15]){const bad=[];for(let w=560;w<=800;w+=20){const cx=await b.newContext({viewport:{width:w,height:800}}),px=await cx.newPage(),cdp=await cx.newCDPSession(px);await cdp.send('Page.setFontSizes',{fontSizes:{standard:fsz}});await px.goto(base+'index.html');await px.evaluate(()=>document.fonts.ready);const r=await px.evaluate(()=>{const v=e=>e.checkVisibility({visibilityProperty:true,opacityProperty:true})&&e.getBoundingClientRect().height>0;return {over:document.documentElement.scrollWidth-innerWidth,out:[...document.querySelectorAll('.puk-site-utility__link,.puk-site-menu__utility-link')].filter(v).filter(e=>{const q=e.getBoundingClientRect();return q.left<0||q.right>innerWidth+1}).length}});if(r.over>1||r.out)bad.push(`${w}px +${r.over}px`);await cx.close();}rows.push({test:`no overflow with small default font ${fsz}px, 560-800px`+(bad.length?` (${bad.join(', ')})`:''),ok:!bad.length});}await b.close();server.close();
 fs.writeFileSync(out+'/BROWSER.json',JSON.stringify({rows,errors},null,2));
 const issues=rows.filter(r=>r.width&&(r.scrollWidth>r.width+2||r.overflow?.length)).map(r=>`${r.page} ${r.width}px text200=${r.large}: horizontal overflow`),exceptions=[];
 for(const r of rows){
  if(r.ok===false)issues.push(r.test);
  if(!r.large&&r.page==='index'&&r.width===375&&r.header.h>220)issues.push('375px header exceeds 220px');
  if(!r.large&&r.page==='index'&&r.width===320&&r.header.h>250)issues.push('320px header exceeds 250px');
  if(!r.large&&r.width===375&&r.page==='krise'&&r.firstCrisisStep.y>=812)issues.push('first crisis step below first screen');
  if(!r.large&&r.width===375&&['suche','begriffe','quellen'].includes(r.page)&&r.input.y+r.input.h>812)issues.push(r.page+' input below first screen');
  /* B2c (UEBERGABE-GESTALTUNG-2026-10-21.md, NP708-N2; PR #809, Nachbesserung N809-2 bis N809-4): Die ganze Figur darf höher als 1800 px sein, solange die vier Phasen vollständig und sichtbar innerhalb von 1800 px enden
     und der Schutzhinweis ohne Aufklappen sichtbar ist. Obergrenze für die ganze Figur: 2400 px (N809-4; heute 1992 px; bestätigt von Christa Egger am 26.11.2026). */
  if(!r.large&&r.width===375&&r.page==='verstehen'){const c=r.curvePhases;
   if(c.wrapped)issues.push('tension core: figure inside a disclosure (<details>); the figure itself must not be collapsible');
   else if(c.count!==B2C_PHASES)issues.push(`tension core: ${c.count} phase cards outside disclosures instead of ${B2C_PHASES}`);
   else if(c.visible!==B2C_PHASES)issues.push(`tension core: only ${c.visible} of ${B2C_PHASES} phase cards visible`);
   else if(c.complete!==B2C_PHASES)issues.push(`tension core: ${B2C_PHASES-c.complete} phase card(s) without visible heading or text`);
   else if(c.end>B2C_PHASE_END_MAX)issues.push(`tension core: fourth phase ends at ${c.end}px, beyond ${B2C_PHASE_END_MAX}px`);
   else if(!c.schutzVisible||!c.schutzBeforeDetails)issues.push('tension core: protection note not visible before the disclosures');
   else if(r.curve.h>B2C_FIGURE_MAX)issues.push(`tension core: whole figure ${r.curve.h}px exceeds ${B2C_FIGURE_MAX}px`);
   else if(r.curve.h>B2C_PHASE_END_MAX){
    /* Die bestandene Ausnahme steht auch in ERGEBNIS.json, nicht nur auf der Konsole (Code-Review nach #811). */
    exceptions.push({id:'B2c',page:r.page,width:r.width,figureHeight:Math.round(r.curve.h),phaseEnd:c.end,phaseEndMax:B2C_PHASE_END_MAX,figureMax:B2C_FIGURE_MAX,protectionNoteVisible:true,status:'bestanden'});
    console.log(`Bekannte Ausnahme B2c bestanden: Figur ${Math.round(r.curve.h)} px hoch, vierte Phase endet bei ${c.end} px (Grenze ${B2C_PHASE_END_MAX} px, ganze Figur höchstens ${B2C_FIGURE_MAX} px), Schutzhinweis sichtbar.`);}}
  if(!r.large&&r.width===1440&&r.page==='beziehungen'&&r.firstQuote.h>150)issues.push('quote card exceeds natural height');
  if(r.large&&[768,1024].includes(r.width)&&r.page==='kommunizieren'&&r.tableWidth.width>r.tableRegion.width+2)issues.push('table fails to become labelled records');
  if(r.width&&r.title&&r.title.broken.length)issues.push(`${r.page} ${r.width}px text200=${r.large}: title word breaks without soft hyphen (${r.title.broken.join(', ')})`);
  if(r.width&&!r.large&&r.title&&r.title.hyphenated.length&&r.title.hyphens==='none')issues.push(`${r.page} ${r.width}px: title word breaks arbitrarily at default font size (${r.title.hyphenated.join(', ')})`);
 }
 if(errors.length)issues.push(...errors);
 /* N829-2: Bekannte Abweichungen stehen in KNOWN_ISSUES. ERGEBNIS.json trennt sie von neuen, damit eine neue Abweichung in der CI auffällt.
    Der Exit-Code bleibt 1, sobald es irgendeine Abweichung gibt; bekannte Abweichungen gelten nicht als bestanden. Einträge entfernen, sobald die Abweichung behoben ist. */
 const knownIssues=issues.filter(i=>KNOWN_ISSUES.some(k=>k.match.test(i))),newIssues=issues.filter(i=>!KNOWN_ISSUES.some(k=>k.match.test(i))),knownNotSeen=KNOWN_ISSUES.filter(k=>!issues.some(i=>k.match.test(i))).map(k=>k.id);
 fs.writeFileSync(out+'/ERGEBNIS.json',JSON.stringify({states:rows.filter(r=>r.width).length,interactions:rows.filter(r=>r.test).length,issues,knownIssues,newIssues,knownNotSeen,exceptions},null,2));
 console.log(`Audit-04-Layouttest: ${rows.filter(r=>r.width).length} Seitenzustände, ${rows.filter(r=>r.test).length} Bedienproben, ${issues.length} Abweichungen (${knownIssues.length} bekannt, ${newIssues.length} neu).`);
 if(knownNotSeen.length)console.log(`Bekannte Abweichung nicht mehr aufgetreten, Eintrag in KNOWN_ISSUES entfernen: ${knownNotSeen.join(', ')}`);
 if(issues.length){console.error(issues.join('\n'));process.exitCode=1;}
})().catch(e=>{console.error(e);process.exit(1)});
