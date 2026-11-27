// Nachprüfung #855: Sichtprüfung in anderer Umgebung (Telefon, dunkler Modus). Aufruf: node sicht-umgebung.cjs <ausgabe> <anfrage> <umgebung: telefon|dunkel> name=site ...
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const pw=require(process.env.PLAYWRIGHT_MODULE||'/opt/borderline-browser/node_modules/playwright');
const [out,query,env,...specs]=process.argv.slice(2);
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml'};
const serve=dir=>{dir=path.resolve(dir);const s=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=path.join(dir,p);if(!f.startsWith(dir)||!fs.existsSync(f)||!fs.statSync(f).isFile()){r.writeHead(404);return r.end();}r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});r.end(fs.readFileSync(f));});return new Promise(ok=>s.listen(0,'127.0.0.1',()=>ok(s)));};
(async()=>{fs.mkdirSync(out,{recursive:true});const b=await pw.chromium.launch();const opts=env==='telefon'?{...pw.devices['iPhone 13']}:{viewport:{width:1280,height:900},colorScheme:'dark'};
for(const spec of specs){const[name,dir]=spec.split('=');const s=await serve(dir);const p=await(await b.newContext(opts)).newPage();await p.goto(`http://127.0.0.1:${s.address().port}/suche.html`);await p.fill('#site-search',query);
const r=await p.evaluate(()=>[...document.querySelectorAll('[data-search-results] > li:not([hidden])')].filter(li=>li.getBoundingClientRect().height>0).slice(0,3).map(li=>li.querySelector('a').getAttribute('href').replace('.html','')).join(' > ')+' | Leermeldung sichtbar: '+[...document.querySelectorAll('[data-search-empty] a')].filter(a=>a.getBoundingClientRect().height>0).map(a=>a.getAttribute('href')).join(', '));
console.log(`${name} | ${env} | «${query}» | ${r}`);await p.locator('#seitensuche').screenshot({path:path.join(out,`${name}-${env}.png`)}).catch(()=>{});s.close();}
await b.close();})();
