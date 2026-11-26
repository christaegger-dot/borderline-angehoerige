const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
(async()=>{const b=await chromium.launch();const out={};
for(const [k,u] of [['lokal','file://'+process.argv[2]+'/suche.html'],['live','https://borderline-angehoerige.netlify.app/suche']]){
 const p=await b.newPage();await p.goto(u,{waitUntil:'load'});
 out[k]=await p.$$eval('[data-search-item]',els=>els.map(e=>[e.getAttribute('data-search-title'),e.getAttribute('data-search-text'),e.getAttribute('data-search-keywords'),(e.querySelector('a')||e).getAttribute('href')]));}
const norm=a=>a.map(r=>[r[0],r[1],r[2],(r[3]||'').replace(/^\//,'').replace(/\.html/,'').replace(/^index(?=$|#)/,'')]);
const A=JSON.stringify(norm(out.lokal)),B=JSON.stringify(norm(out.live));
console.log('Einträge lokal',out.lokal.length,'live',out.live.length,'Titel/Text/Schlüsselwörter/Ziel gleich:',A===B);
if(A!==B){for(let i=0;i<out.lokal.length;i++) if(JSON.stringify(norm([out.lokal[i]]))!==JSON.stringify(norm([out.live[i]]))){console.log(i,JSON.stringify(norm([out.lokal[i]])).slice(0,200),JSON.stringify(norm([out.live[i]])).slice(0,200));break}}
await b.close()})();
