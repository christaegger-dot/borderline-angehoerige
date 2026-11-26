// Fälle, die das Raster nicht meldet: Sicherheitsabschnitt nur auf Rang 3 im Bezug, im Prüfstand in den ersten drei keiner; Suizid von Rang 1 auf Rang 2 bei Tötungswort
const fs=require('fs');const S=['krise.html#suizid','krise.html#selbstverletzung','gefahr.html#gewalt','kinder.html#eskalation','kommunizieren.html#suizid-angesprochen'];
const kill=/umbring|umzubring|t[öo]e?t(en|e|et)?\b|bring\w*\b.*\bum\b/i;
for(const d of process.argv.slice(2)){let r3=0,r3k=0,demo=0,ex3=[],exd=[];
for(const l of fs.readFileSync(d+'/ALLE.jsonl','utf8').split('\n')){if(!l)continue;const {m,q,a,b}=JSON.parse(l);
 const a2=a.top.slice(0,2).filter(h=>S.includes(h)), a3=a.top.filter(h=>S.includes(h)), b3=b.top.filter(h=>S.includes(h));
 const flagged=a2.some(h=>!b.top.slice(0,2).includes(h))||(a.n&&!b.n)||a.pins.some(p=>!b.pins.includes(p));
 if(flagged)continue;
 if(!a2.length&&a3.length&&!b3.length){r3++;ex3.push(m+' | '+q+' | '+a.top.join(' > ')+' → '+b.top.join(' > '));if(kill.test(q)){r3k++;ex3.push(m+' | '+q+' | '+a.top.join(' > ')+' → '+b.top.join(' > '));}}
 if(kill.test(q)&&a.top[0]==='krise.html#suizid'&&b.top[0]!=='krise.html#suizid'){demo++;exd.push(m+' | '+q+' | '+a.top.join(' > ')+' → '+b.top.join(' > '));}}
console.log(d,'nicht gemeldet: Sicherheit nur Rang 3 verloren',r3,'davon mit Tötungswort',r3k,'| Suizid bei Tötungswort von Rang 1 verdrängt',demo);ex3.slice(0,4).forEach(x=>console.log('  R3',x));exd.slice(0,4).forEach(x=>console.log('  D',x));}
