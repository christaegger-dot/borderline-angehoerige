// Seitenende (letzter Inhalt und Fusszeile) als Foto und Hover nach Übergang. Aufruf: node seitenende.cjs <site> <name> <ausgabeordner>
const fs=require('fs'),path=require('path'),http=require('http');const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const [S,N,OUT]=process.argv.slice(2);
const srv=http.createServer((q,res)=>{const f=path.join(S,decodeURIComponent(q.url.split('?')[0]));try{const e=path.extname(f);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'})[e]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.statusCode=404;res.end()}});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch({args:['--no-sandbox']});
 for(const [pg,w] of [['grenzen',1440],['index',1440],['grenzen',390]]){const p=await (await b.newContext({viewport:{width:w,height:900}})).newPage();await p.goto('http://127.0.0.1:'+srv.address().port+'/'+pg+'.html');await p.evaluate(()=>document.fonts.ready);
  const y=await p.evaluate(()=>document.querySelector('footer').getBoundingClientRect().top+scrollY);const H=await p.evaluate(()=>document.documentElement.scrollHeight);
  await p.screenshot({path:`${OUT}/seitenende-${pg}-${w}-${N}.png`,fullPage:true,clip:{x:0,y:Math.max(0,y-380),width:w,height:Math.min(H-Math.max(0,y-380),900)}});
  if(pg==='grenzen'&&w===1440){const a=p.locator('footer a').nth(1);await a.hover();await p.waitForTimeout(600);console.log(N,'Hover nach 600 ms:',JSON.stringify(await a.evaluate(e=>{const s=getComputedStyle(e);return [s.color,s.textDecorationThickness,s.transition]})));}
  await p.context().close();}
 await b.close();srv.close();})();
