// Fokusbild, Hover, erzwungene Farben und Druck der Fusszeile; Fotos. Aufruf: node fokus.cjs <siteVorher> <siteNachher> <ausgabeordner>
const fs=require('fs'),path=require('path'),http=require('http');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);
const [A,B,OUT]=process.argv.slice(2);fs.mkdirSync(OUT,{recursive:true});
const serve=root=>new Promise(r=>{const s=http.createServer((q,res)=>{let u=decodeURIComponent(q.url.split('?')[0]);const f=path.join(root,u);try{const e=path.extname(f);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'})[e]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.statusCode=404;res.end()}}).listen(0,'127.0.0.1',()=>r(s))});
(async()=>{const sa=await serve(A),sb=await serve(B);const bases={'r4-54':'http://127.0.0.1:'+sa.address().port+'/','r4-56':'http://127.0.0.1:'+sb.address().port+'/'};
 const br=await chromium.launch({args:['--no-sandbox']});
 for(const [v,base] of Object.entries(bases)){
  for(const w of [390,1440]){const c=await br.newContext({viewport:{width:w,height:900}}),p=await c.newPage();await p.goto(base+'grenzen.html');await p.evaluate(()=>document.fonts.ready);
   const f=p.locator('footer');await f.screenshot({path:`${OUT}/footer-${w}-${v}.png`});
   if(v==='r4-56'){const n=await p.locator('footer a').count();const out=[];
    for(let i=0;i<n;i++){const a=p.locator('footer a').nth(i);await a.focus();await p.keyboard.press('Shift+Tab');await p.keyboard.press('Tab');
     out.push(await a.evaluate(e=>{const s=getComputedStyle(e);return {t:e.textContent.trim(),focused:document.activeElement===e,fv:e.matches(':focus-visible'),outline:s.outlineStyle+' '+s.outlineWidth+' '+s.outlineColor,offset:s.outlineOffset,shadow:s.boxShadow}}));}
    console.log(w+'px Fokus:',JSON.stringify(out));
    await p.locator('footer a').first().focus();await p.keyboard.press('Shift+Tab');await p.keyboard.press('Tab');await f.screenshot({path:`${OUT}/footer-${w}-r4-56-fokus.png`});
    const a=p.locator('footer a').nth(1);await a.hover();console.log(w+'px Hover:',JSON.stringify(await a.evaluate(e=>{const s=getComputedStyle(e);return [s.color,s.textDecorationThickness]})));
   }
   await c.close();}
  const c=await br.newContext({viewport:{width:390,height:900},forcedColors:'active'}),p=await c.newPage();await p.emulateMedia({forcedColors:'active'});await p.goto(base+'grenzen.html');
  console.log(v,'erzwungene Farben:',JSON.stringify(await p.evaluate(()=>{const f=document.querySelector('footer'),s=getComputedStyle(f),a=getComputedStyle(f.querySelector('a'));return {border:s.borderTopWidth+' '+s.borderTopStyle+' '+s.borderTopColor,link:a.color+' '+a.textDecorationLine}})));
  await p.locator('footer').screenshot({path:`${OUT}/footer-390-${v}-erzwungene-farben.png`});await c.close();
  const c2=await br.newContext({viewport:{width:1440,height:900}}),p2=await c2.newPage();await p2.goto(base+'grenzen.html');await p2.emulateMedia({media:'print'});
  console.log(v,'Druck:',JSON.stringify(await p2.evaluate(()=>{const f=document.querySelector('footer'),s=getComputedStyle(f);return {display:s.display,color:s.color,bg:s.backgroundColor,border:s.borderTopWidth+' '+s.borderTopStyle+' '+s.borderTopColor,h:Math.round(f.getBoundingClientRect().height)}})));
  await p2.pdf({path:`${OUT}/grenzen-druck-${v}.pdf`,format:'A4'});await c2.close();
 }
 await br.close();sa.close();sb.close();})();
