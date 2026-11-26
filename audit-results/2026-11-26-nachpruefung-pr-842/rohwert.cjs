// Nachprüfung #842: ungerundete Lage der ersten Sicherheitskarte auf der Startseite, wie im Layouttest gemessen (nach document.fonts.ready).
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const http=require('http'),fs=require('fs'),path=require('path');
const dir=path.resolve(process.argv[2]);
const srv=http.createServer((q,r)=>{let f=path.join(dir,decodeURIComponent(q.url.split('?')[0]));if(f.endsWith('/'))f+='index.html';fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':f.endsWith('.css')?'text/css':f.endsWith('.js')?'text/javascript':f.endsWith('.svg')?'image/svg+xml':'text/html; charset=utf-8'});r.end(d)})}).listen(0,async()=>{
 const base=`http://127.0.0.1:${srv.address().port}/`;const b=await chromium.launch({args:['--no-sandbox']});
 for(const [w,h] of [[375,812],[375,667],[360,740],[390,844],[1024,768]]){const c=await b.newContext({viewport:{width:w,height:h}}),p=await c.newPage();await p.goto(base+'index.html');await p.evaluate(()=>document.fonts.ready);
  const t=await p.locator('.bl-paths-cards li').first().evaluate(e=>e.getBoundingClientRect().top+scrollY);console.log(`${w}x${h} top ${t} gerundet ${Math.round(t)} Grenze ${h}`);await c.close();}
 await b.close();srv.close();});
