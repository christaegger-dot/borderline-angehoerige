// Vorher/Nachher für die Punkte 4, 5, 7, 10 des Website-Reviews. Aufruf: PLAYWRIGHT_MODULE=… node vergleich.cjs <ausgabeordner>; vorher = Kopie von site/ (r4-69) auf Port 8771, nachher = site/ (r4-70) auf Port 8770
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const out=process.argv[2];
const srv={vorher:'http://127.0.0.1:8771/',nachher:'http://127.0.0.1:8770/'};
const go=async(p,u)=>{for(let i=0;i<20;i++){try{await p.goto(u,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);return}catch(e){await new Promise(r=>setTimeout(r,250))}}};
const chars=()=>{const cv=document.createElement('canvas').getContext('2d');const m=e=>{const cs=getComputedStyle(e);cv.font=`${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;const t=e.textContent.replace(/\s+/g,' ').trim();return Math.round((e.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight))/(cv.measureText(t).width/t.length))};
 return {vertiefung:Math.max(0,...[...document.querySelectorAll('.puk-vis-more__body p')].filter(e=>e.textContent.trim().length>120).map(m)),bildunterschrift:Math.max(0,...[...document.querySelectorAll('.puk-vis-caption p')].filter(e=>e.textContent.trim().length>120).map(m)),krisenEinleitung:Math.max(0,...[...document.querySelectorAll('.bl-crisis-intro p')].map(m))}};
(async()=>{const b=await chromium.launch();
for(const [name,base] of Object.entries(srv)){const r={};
 // Punkt 4: Absenderzeile 760–1440 px
 const split=[],indent=[];for(let w=760;w<=1440;w+=20){const p=await (await b.newContext({viewport:{width:w,height:800}})).newPage();await go(p,base+'index.html');
  const x=await p.evaluate(()=>{const lab=[...document.querySelectorAll('.puk-site-sender *')].find(e=>e.textContent.trim()==='Beratung:');const a=document.querySelector('[data-sender-email]');const s=document.querySelector('.puk-site-sender');const name=document.querySelector('.puk-site-sender__name');return {d:Math.round(a.getBoundingClientRect().top-lab.getBoundingClientRect().top),labLeft:Math.round(lab.getBoundingClientRect().left-s.getBoundingClientRect().left),wrapped:lab.getBoundingClientRect().top>name.getBoundingClientRect().bottom-2,overflow:document.documentElement.scrollWidth>innerWidth}});
  if(x.d>15)split.push(w);if(x.wrapped&&x.labLeft>2)indent.push(w+'('+x.labLeft+'px)');if(x.overflow)r.overflow=(r.overflow||[]).concat(w);await p.context().close();}
 r.p4_getrennt=split.join(',')||'nie';r.p4_eingerueckt=indent.join(',')||'nie';
 // Punkt 4 auf dem Desktop: Abstand Name → «Beratung:»
 {const p=await (await b.newContext({viewport:{width:1440,height:900}})).newPage();await go(p,base+'index.html');r.p4_abstand1440=await p.evaluate(()=>{const n=document.querySelector('.puk-site-sender__name');const lab=[...document.querySelectorAll('.puk-site-sender *')].find(e=>e.textContent.trim()==='Beratung:');return Math.round(lab.getBoundingClientRect().left-n.getBoundingClientRect().right)+' px'});
  // Punkt 7
  r.p7_abstand1440=await p.evaluate(()=>{const q=document.querySelector('.puk-site-quick-entry');return Math.round(q.getBoundingClientRect().top-q.previousElementSibling.getBoundingClientRect().bottom)+' px'});
  await p.locator('.puk-site-quick-entry').scrollIntoViewIfNeeded();const bb=await p.locator('.puk-site-quick-entry').boundingBox();await p.screenshot({path:`${out}/${name}-p7-1440.png`,clip:{x:40,y:bb.y-160,width:1360,height:230}});
  // Punkt 5
  const c5={};for(const pg of ['verstehen','selbstfuersorge','kommunizieren','genesung','krise']){await go(p,base+pg+'.html');await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));const c=await p.evaluate(chars);for(const k in c)c5[k]=Math.max(c5[k]||0,c[k]);}
  r.p5_zeichen1440=c5;await go(p,base+'krise.html');const ib=await p.locator('.bl-crisis-intro').boundingBox();await p.screenshot({path:`${out}/${name}-p5-krise-1440.png`,fullPage:true,clip:{x:0,y:ib.y-10,width:1440,height:ib.height+20}});
  await p.context().close();}
 {const p=await (await b.newContext({viewport:{width:375,height:812}})).newPage();await go(p,base+'index.html');r.p7_abstand375=await p.evaluate(()=>{const q=document.querySelector('.puk-site-quick-entry');return Math.round(q.getBoundingClientRect().top-q.previousElementSibling.getBoundingClientRect().bottom)+' px'});
  // Punkt 10
  await go(p,base+'suche.html');r.p10=await p.evaluate(()=>{const lis=[...document.querySelectorAll('.puk-site-breadcrumb li')];const lines=[...new Set(lis.map(l=>Math.round(l.getBoundingClientRect().top)))];const first=lis.find(l=>Math.round(l.getBoundingClientRect().top)===lines[1]);return {zeilen:lines.length,zweiteZeileBeginntMit:first?getComputedStyle(first,'::before').content.replace(/"/g,'')||first.textContent.trim().slice(0,12):'-'}});
  await p.screenshot({path:`${out}/${name}-p10-suche-375.png`,clip:{x:0,y:190,width:375,height:80}});await p.context().close();}
 {const p=await (await b.newContext({viewport:{width:820,height:600}})).newPage();await go(p,base+'index.html');await p.screenshot({path:`${out}/${name}-p4-820.png`,clip:{x:0,y:0,width:820,height:150}});await p.context().close();}
 console.log(name,JSON.stringify(r));}
await b.close();})();
