// Nachprüfung #842: KNOWN_ISSUES und Einstufung wörtlich aus layouttest.cjs gelesen und mit konstruierten Meldungen ausgeführt.
// Aufruf: node muster.cjs <layouttest.cjs>
const src=require('fs').readFileSync(process.argv[2],'utf8');
const ki=src.match(/const KNOWN_ISSUES=\[[\s\S]*?\n\];/)[0];
const a=src.indexOf(' const knownIssues=[]'),b=src.indexOf('\n',src.indexOf(' const knownNotSeen='));const cls=src.slice(a,b);
const run=new Function('issues','errors',ki+'\n'+cls+'\nreturn {knownIssues,newIssues,knownNotSeen,issues};');
const P='safety card starts in first screen ';
const cases=[
 ['heute',[P+'375x667 (top 802px)',P+'360x740 (top 863px)'],[]],
 ['Grenze 810/871',[P+'375x667 (top 810px)',P+'360x740 (top 871px)'],[]],
 ['Grenze+1 811/872',[P+'375x667 (top 811px)',P+'360x740 (top 872px)'],[]],
 ['besser 668/741',[P+'375x667 (top 668px)',P+'360x740 (top 741px)'],[]],
 ['Dezimalwert',[P+'375x667 (top 802.5px)'],[]],
 ['Zusatz hinten',[P+'375x667 (top 802px) extra'],[]],
 ['Zusatz vorn',['x '+P+'375x667 (top 802px)'],[]],
 ['ohne Klammer-Wert',[P+'375x667'],[]],
 ['negativ',[P+'375x667 (top -5px)'],[]],
 ['führende Nullen',[P+'375x667 (top 0000802px)'],[]],
 ['sehr grosse Zahl',[P+'375x667 (top 99999999999999999999px)'],[]],
 ['Zeilenumbruch hinten',[P+'375x667 (top 802px)\n'],[]],
 ['Unicode-Ziffern',[P+'375x667 (top ８０２px)'],[]],
 ['anderes Format 375x812',[P+'375x812 (top 813px)'],[]],
 ['doppelt',[P+'375x667 (top 802px)',P+'375x667 (top 802px)'],[]],
 ['doppelt, erste zu tief',[P+'375x667 (top 900px)',P+'375x667 (top 802px)'],[]],
 ['Reihenfolge vertauscht',[P+'360x740 (top 863px)',P+'375x667 (top 802px)'],[]],
 ['JS-Fehler mit genauem Text',[P+'375x667 (top 802px)',P+'360x740 (top 863px)'],[P+'375x667 (top 802px)']],
 ['JS-Fehler vor der Prüfmeldung (nur Fehler, Karte behoben)',[],[P+'375x667 (top 802px)']],
 ['verschlechtert + JS-Fehler gleichen Texts',[P+'375x667 (top 2802px)',P+'360x740 (top 863px)'],[P+'375x667 (top 2802px)']],
 ['verschlechtert',[P+'375x667 (top 2802px)',P+'360x740 (top 2863px)'],[]],
 ['behoben',[],[]],
];
for(const [n,iss,err] of cases){const r=run(iss.slice(),err.slice());
 console.log(`${n.padEnd(52)} known ${r.knownIssues.length} new ${r.newIssues.length} issues ${r.issues.length} knownNotSeen ${JSON.stringify(r.knownNotSeen)}${r.issues.length===r.knownIssues.length+r.newIssues.length?'':' ZÄHLUNG FALSCH'}`);}
