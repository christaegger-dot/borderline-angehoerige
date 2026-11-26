// gibt alle Rasteranfragen aus (Nachbau der Mengenbildung aus suchraster.mjs, ohne Browser)
import { readFileSync, existsSync } from 'node:fs'; import { join } from 'node:path';
const tests=process.argv[2]; const cfg=JSON.parse(readFileSync(join(tests,'suchraster.json'),'utf8'));
const pg=new Map(); let key=null;
for(const line of readFileSync(join(tests,'suchraster-proben.txt'),'utf8').split('\n')){const m=line.match(/^# (\S+) /);if(m){key=m[1];pg.set(key,[]);continue;}if(line.trim()&&!line.startsWith('#')&&key)pg.get(key).push(line.trim());}
const tsv=f=>existsSync(f)?readFileSync(f,'utf8').split('\n').filter(l=>l&&!l.startsWith('#')).slice(1).map(l=>l.split('\t')[0]):[];
const G=ks=>ks.flatMap(k=>pg.get(k));
const sets={saetze:cfg.saetze.handelnde.flatMap(a=>cfg.saetze.aussagen.flatMap(p=>cfg.saetze.nachsaetze.map(x=>[a,p,x].filter(Boolean).join(' ')))),
ich:cfg.ichAussagen.kerne.flatMap(k=>cfg.ichAussagen.fuellungen.flatMap(f=>cfg.ichAussagen.rahmen.map(r=>r.replace('{k}',k+f)))),
ichRahmen:cfg.ichRahmen.rahmen.flatMap(r=>cfg.saetze.handelnde.filter(h=>h&&h!=='ich').flatMap(h=>cfg.saetze.aussagen.map(a=>r.replace('{s}',`${h} ${a}`)))),
proben:[...[...pg.values()].flat(),...tsv(join(tests,'suche-ersttreffer.tsv')),...tsv(join(tests,'suche-ausbau-offen.tsv'))],
kombinationen:G(cfg.kombinationen.gruppen).flatMap(s=>[...cfg.kombinationen.zusaetze.map(z=>s+z),...cfg.kombinationen.vorsaetze.map(v=>v+s),s.toUpperCase(),s.toLowerCase().replace(/[.,!?:;«»()]/g,'')]),
tippen:G(cfg.tippen.gruppen).flatMap(s=>Array.from({length:Math.max(0,s.length-cfg.tippen.abZeichen+1)},(_,i)=>s.slice(0,cfg.tippen.abZeichen+i)))};
let t=0;for(const k of Object.keys(sets)){sets[k]=[...new Set(sets[k])];t+=sets[k].length;console.error(k,sets[k].length);}console.error('gesamt',t);
for(const k of Object.keys(sets))for(const q of sets[k])console.log(k+'\t'+q);
