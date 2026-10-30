// Fotos der Fusszeile vorher/nachher (390 und 1440 px, 320 px mit 200 % Schrift). Aufruf: node fotos.cjs <siteVorher> <siteNachher> <ausgabeordner>
const fs=require('fs'),path=require('path'),http=require('http');const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const [A,B,OUT]=process.argv.slice(2);fs.mkdirSync(OUT,{recursive:true});
const serve=root=>new Promise(r=>{const s=http.createServer((q,res)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]));try{const e=path.extname(f);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml'})[e]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.statusCode=404;res.end()}}).listen(0,'127.0.0.1',()=>r(s))});
(async()=>{const sa=await serve(A),sb=await serve(B);
 for(const large of [false,true]){const b=await chromium.launch({args:['--no-sandbox',...(large?['--blink-settings=defaultFontSize=32,defaultFixedFontSize=26']:[])]});
  for(const w of (large?[320]:[390,1440]))for(const [v,s] of [['vorher',sa],['nachher',sb]]){const p=await (await b.newContext({viewport:{width:w,height:900}})).newPage();await p.goto('http://127.0.0.1:'+s.address().port+'/grenzen.html');await p.evaluate(()=>document.fonts.ready);
   await p.locator('footer').screenshot({path:`${OUT}/footer-${w}${large?'-200':''}-${v}.png`});await p.context().close();}
  await b.close();}
 sa.close();sb.close();})();
