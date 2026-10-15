// Wortbilanz der Inhaltsfragmente (Zählregel ab Release C, festgelegt am 15.10.2026).
//
// Gezählt werden durch Leerraum getrennte Einheiten in authoring/content/<seite>.html,
// nachdem alle Tags entfernt und HTML-Entitäten aufgelöst sind. Massgebend ist die
// Zählung MIT Quellenblock (wie im Review W1 und in den Zielwerten des Massnahmenplans);
// die Zählung ohne Quellenblock (<section … id="quellen">) wird zusätzlich ausgegeben.
// Die Gesamtsumme umfasst alle Inhaltsseiten ausser quellen, suche und 404.
// Platzhalter wie <p data-responsibility-inline></p> sind leer und zählen nicht.
//
// Aufruf: node authoring/tools/wortbilanz.mjs [--json]

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'content');
const EXCLUDED = new Set(['quellen', 'suche', '404']);
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', shy: '' };

function decode(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

function count(html) {
  const text = decode(html.replace(/<[^>]+>/g, ' '));
  return (text.match(/\S+/g) || []).length;
}

function withoutSources(html) {
  return html.replace(/<section\b[^>]*\bid="quellen"[\s\S]*?<\/section>/, '');
}

const rows = readdirSync(root).filter(f => f.endsWith('.html')).sort().map(f => {
  const html = readFileSync(join(root, f), 'utf8');
  return { page: f.slice(0, -5), mitQuellenblock: count(html), ohneQuellenblock: count(withoutSources(html)) };
});
const included = rows.filter(r => !EXCLUDED.has(r.page));
const total = {
  mitQuellenblock: included.reduce((s, r) => s + r.mitQuellenblock, 0),
  ohneQuellenblock: included.reduce((s, r) => s + r.ohneQuellenblock, 0),
};

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ rows, total }, null, 2));
} else {
  const pad = (s, n) => String(s).padEnd(n);
  const num = (s, n) => String(s).padStart(n);
  console.log(pad('Seite', 24) + num('mit Quellenblock', 18) + num('ohne', 8));
  for (const r of rows) console.log(pad(r.page + (EXCLUDED.has(r.page) ? ' (nicht in Summe)' : ''), 24) + num(r.mitQuellenblock, 18) + num(r.ohneQuellenblock, 8));
  console.log(pad('Summe', 24) + num(total.mitQuellenblock, 18) + num(total.ohneQuellenblock, 8));
}
