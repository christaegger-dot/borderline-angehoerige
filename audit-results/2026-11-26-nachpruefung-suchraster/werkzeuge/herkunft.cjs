const fs=require('fs'),path=require('path');
const S=process.argv[2];
const dirOf=g=>/^[A-P]$/.test(g)?'2026-11-26-nachpruefung-r4-74':/^[QRS]$/.test(g)?'2026-11-26-nachpruefung-r4-75':/^Z[A-M]$/.test(g)?'2026-11-26-pr713-teil2-suche-r4-74':/^Z[XY]$/.test(g)?'2026-11-26-korrektur-suche-r4-75':g==='ZZ'?'2026-11-26-rueckbau-suche-r4-76':'2026-11-26-gegenpruefung-r4-76';
const cache={};
const textOf=d=>{if(cache[d])return cache[d];let t='';const walk=p=>{for(const f of fs.readdirSync(p)){const q=path.join(p,f);if(fs.statSync(q).isDirectory())walk(q);else t+='\n'+fs.readFileSync(q,'utf8');}};walk(path.join(S,'quellen/audit-results',d));return cache[d]=t;};
let g=null,tot=0,miss={};
for(const line of fs.readFileSync(path.join(S,'tool/authoring/tests/suchraster-proben.txt'),'utf8').split('\n')){
 const m=line.match(/^# (\S+) /); if(m){g=m[1];continue;} if(!line.trim()||line.startsWith('#'))continue; tot++;
 const q=line.trim(); const t=textOf(dirOf(g));
 if(!t.includes(q)){ // also try any source dir
   const any=['2026-11-26-nachpruefung-r4-74','2026-11-26-nachpruefung-r4-75','2026-11-26-pr713-teil2-suche-r4-74','2026-11-26-korrektur-suche-r4-75','2026-11-26-rueckbau-suche-r4-76','2026-11-26-gegenpruefung-r4-76'].filter(d=>textOf(d).includes(q));
   (miss[g]=miss[g]||[]).push(q+'  ['+(any.join(',')||'nirgends')+']');}
}
console.log('Proben',tot);for(const [k,v] of Object.entries(miss)){console.log('##',k,v.length);v.forEach(x=>console.log('  ',x));}
