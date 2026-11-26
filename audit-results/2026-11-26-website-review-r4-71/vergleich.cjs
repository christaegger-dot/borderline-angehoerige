// r4-71: Vorher (Kopie von site/ r4-70, Port 8771) und nachher (site/ r4-71, Port 8770). Aufruf: PLAYWRIGHT_MODULE=… node vergleich.cjs <siteDir> <bilderordner>
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const fs=require('fs');const [site,out]=process.argv.slice(2);
const pages=fs.readdirSync(site).filter(f=>f.endsWith('.html'));
const go=async(p,u)=>{for(let i=0;i<20;i++){try{await p.goto(u,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);return}catch(e){await new Promise(r=>setTimeout(r,250))}}};
(async()=>{const b=await chromium.launch();
for(const [name,base] of [['vorher','http://127.0.0.1:8771/'],['nachher','http://127.0.0.1:8770/']]){const r={};
 for(const [w,h] of [[390,844],[375,812],[360,740],[375,667]]){const p=await (await b.newContext({viewport:{width:w,height:h}})).newPage();
  await go(p,base+'index.html');const s=await p.evaluate(()=>({kopf:Math.round(document.querySelector('header').getBoundingClientRect().height),karte:Math.round(document.querySelector('.bl-paths-cards li').getBoundingClientRect().top)}));
  await go(p,base+'krise.html');const k=await p.evaluate(()=>{const e=[...document.querySelectorAll('main p, main li')].find(x=>/\b144\b/.test(x.textContent)&&!x.querySelector('p,li'));const a=e.querySelector('a[href="tel:144"]')||e;return {n144:Math.round(a.getBoundingClientRect().bottom),schritt1:Math.round(document.querySelector('.puk-site-quick li').getBoundingClientRect().top)}});
  r[`${w}x${h}`]=`Kopf ${s.kopf} · Sicherheitskarte ${s.karte}${s.karte<h?' (im 1. Bildschirm)':''} · «144» ${k.n144}${k.n144<=h?' (im 1. Bildschirm)':''} · erster Krisenschritt ${k.schritt1}`;
  if(w===375&&h===812){await go(p,base+'krise.html');await p.screenshot({path:`${out}/${name}-krise-375x812.png`});await go(p,base+'index.html');await p.screenshot({path:`${out}/${name}-start-375x812.png`});
   if(name==='nachher'){await p.click('.puk-disclosure__button');await p.waitForTimeout(200);await p.screenshot({path:`${out}/nachher-menue-375x812.png`});
    r.menue=await p.evaluate(()=>[...document.querySelectorAll('.puk-web-nav a')].filter(a=>a.getClientRects().length&&getComputedStyle(a).visibility!=='hidden').map(a=>a.textContent.trim()).join(' | '));}}
  await p.context().close();}
 // ohne Skript bei 375 px
 {const c=await b.newContext({viewport:{width:375,height:812},javaScriptEnabled:false});const p=await c.newPage();await go(p,base+'index.html');r.ohneSkript375=await p.evaluate(()=>({kopfzeileDirekteinstiege:getComputedStyle(document.querySelector('.puk-site-subbar .puk-site-utility')).display,navLinks:[...document.querySelectorAll('.puk-web-nav a')].filter(a=>a.getClientRects().length).length}));await c.close();}
 // Schriftgrössen unter 16 px, alle Seiten, Vertiefungen offen
 const small={};for(const w of [320,360,375,768,1440]){const p=await (await b.newContext({viewport:{width:w,height:900}})).newPage();for(const f of pages){await go(p,base+f);await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
  const o=await p.evaluate(()=>{const o={};for(const e of document.querySelectorAll('body *')){if(![...e.childNodes].some(n=>n.nodeType===3&&n.data.trim()))continue;const s=parseFloat(getComputedStyle(e).fontSize);if(s<16&&e.getClientRects().length&&!e.closest('svg,.puk-sr,[aria-hidden=true]'))o[s+'px']=(o[s+'px']||0)+1}return o});for(const k in o)small[w+'px '+k]=(small[w+'px '+k]||0)+o[k];}await p.context().close();}
 r.textUnter16px=Object.keys(small).length?small:'keine';
 // Suchseite
 {const p=await (await b.newContext({viewport:{width:375,height:812}})).newPage();await go(p,base+'suche.html');r.sucheSatzAnzahl=await p.evaluate(()=>(document.querySelector('main').textContent.match(/Suchen Sie mit Ihren eigenen Worten\./g)||[]).length);await p.context().close();}
 console.log(name,JSON.stringify(r,null,1));}
await b.close();})();
