// Vergleicht Wortlaut, Sprungziele, Akuthinweise zwischen zwei Ständen (Argumente: Ordner A, Ordner B)
import fs from 'fs'; import path from 'path'; import crypto from 'crypto';
const [A,B]=process.argv.slice(2);
const strip=s=>s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&shy;|­/g,'').replace(/\s+/g,' ').trim();
const ids=s=>[...s.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]).sort().join(',');
const cnt=(s,re)=>(s.match(re)||[]).length;
let files=0,diffs=[],tot={resp:0,t144:0,t117:0};
for(const dir of ['authoring/content','site']){
  for(const f of fs.readdirSync(path.join(B,dir)).filter(f=>f.endsWith('.html')).sort()){
    const a=fs.readFileSync(path.join(A,dir,f),'utf8'),b=fs.readFileSync(path.join(B,dir,f),'utf8');files++;
    if(strip(a)!==strip(b))diffs.push(dir+'/'+f+' Wortlaut');
    if(ids(a)!==ids(b))diffs.push(dir+'/'+f+' ids');
    for(const [k,re] of [['resp',/data-responsibility-inline/g],['t144',/href="tel:144"/g],['t117',/href="tel:117"/g]]){if(cnt(a,re)!==cnt(b,re))diffs.push(dir+'/'+f+' '+k); if(dir==='site')tot[k]+=cnt(b,re);}
  }
}
const h=p=>{try{return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex').slice(0,12)}catch{return 'fehlt'}};
for(const p of ['authoring/tests/suche-ersttreffer.tsv','site/js/suche-index.js','site/suche-index.json','authoring/js/interaktion.js','site/js/interaktion.js']) console.log(p, h(path.join(A,p)), h(path.join(B,p)), h(path.join(A,p))===h(path.join(B,p))?'gleich':'VERSCHIEDEN');
console.log('Dateien verglichen:',files,'Abweichungen:',diffs.length,diffs.join('; '));
console.log('site/ gesamt (B):',JSON.stringify(tot));
