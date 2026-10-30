// Kennung r4-65 in site.config.json und contract.js prüfen (Nachprüfung r4-65)
const { execSync } = require('child_process');
for (const c of process.argv.slice(2)) {
  const j = JSON.parse(execSync(`git show ${c}:authoring/site.config.json`, { maxBuffer: 1e8 }).toString());
  const js = execSync(`git show ${c}:authoring/tools/contract.js`, { maxBuffer: 1e8 }).toString();
  const r = j.releaseApproval, w = r.independentReviewWaiver;
  const ps = r.pendingScope;
  const seq = [...ps.matchAll(/(?:^|Vorher: |\. |Zusammen mit )(r4-\d+) \(/g)].map(m => m[1]);
  console.log(`== ${c}\nBUILD=${(js.match(/const BUILD = '([^']+)'/) || [])[1]} assetVersion=${j.assetVersion} waiver.version=${w.version}`);
  console.log('pendingScope Abschnittsanfänge: ' + seq.join(' → '));
  console.log('appliedTo Länge ' + w.appliedTo.length + ', Ende: …' + w.appliedTo.slice(-420));
}
