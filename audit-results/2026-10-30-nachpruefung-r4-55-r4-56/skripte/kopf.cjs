// Kopf bei 320 px (Standard- und 200 % Schrift) als Foto. Aufruf: node kopf.cjs <site> <name> <ausgabeordner>
const fs=require('fs'),path=require('path'),http=require('http');const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const [S,N,OUT]=process.argv.slice(2);
const srv=http.createServer((q,res)=>{const f=path.join(S,decodeURIComponent(q.url.split('?')[0]));try{const e=path.extname(f);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'})[e]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.statusCode=404;res.end()}});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));
 for(const large of [false,true]){const b=await chromium.launch({args:['--no-sandbox',...(large?['--blink-settings=defaultFontSize=32,defaultFixedFontSize=26']:[])]});
  const p=await (await b.newContext({viewport:{width:320,height:900}})).newPage();await p.goto('http://127.0.0.1:'+srv.address().port+'/grenzen.html');await p.evaluate(()=>document.fonts.ready);
  await p.locator('header').screenshot({path:`${OUT}/kopf-320${large?'-200':''}-${N}.png`});await b.close();}
 srv.close();})();
