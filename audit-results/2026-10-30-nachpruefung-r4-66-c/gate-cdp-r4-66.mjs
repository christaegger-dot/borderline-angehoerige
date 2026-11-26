// Nachprüfung r4-66: eigene Mutationen über C.gate (Eingabe wie build.mjs) und Abgleich mit Chromium über CDP.
// Aufruf: node gate-cdp-r4-66.mjs <Arbeitsbaum r4-66> <Arbeitsbaum r4-65> <Ausgabeordner für Seiten>
import { readFile, writeFile, mkdir, cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
const require = createRequire(import.meta.url);
const [, , WT66, WT65, OUT] = process.argv;
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

async function loadBuild(wt) {
  const sourceDir = join(wt, "authoring");
  const C = require(join(sourceDir, "tools", "contract.js"));
  const { injectSearchIndex } = await import(join(sourceDir, "tools", "search-index.mjs"));
  const report = existsSync(join(sourceDir, "PRUEFBERICHT.md")) ? await readFile(join(sourceDir, "PRUEFBERICHT.md"), "utf8") : null;
  async function render(mutCfg) {
    const config = JSON.parse(await readFile(join(sourceDir, "site.config.json"), "utf8"));
    if (mutCfg) mutCfg(config);
    const fragments = {};
    for (const page of config.pages) fragments[page.id] = await readFile(join(sourceDir, "content", page.id + ".html"), "utf8");
    injectSearchIndex(config, fragments);
    const raw = {};
    for (const page of config.pages.filter(p => p.status === "published")) raw[C.resolve("", page.href).path] = C.renderPage(config, page, fragments[page.id]);
    return { config, raw };
  }
  function gate(config, raw) {
    return C.gate(config, raw, { mode: "production", exists: p => Object.hasOwn(raw, p) || existsSync(join(sourceDir, p)), report });
  }
  return { C, render, gate, BUILD: C.BUILD || "" };
}

const ROW = /(<a class="puk-site-utility__link" href="[^"]+"[^>]*>)([^<]*)</;
const MENU = /(<a class="puk-web-nav__link puk-site-menu__utility-link" href="[^"]+"[^>]*>)([^<]*)</;
// $T = ursprüngliche Beschriftung
const CASES = [
  ["K0", "Kontrolle: unverändert", "$T"],
  ["I1", "img alt=\"Mehr\"", "$T<img alt=\"Mehr\" src=\"data:,\">"],
  ["I2", "img alt=\"\"", "$T<img alt=\"\" src=\"data:,\">"],
  ["I3", "img ohne alt", "$T<img src=\"data:,\">"],
  ["I4", "img alt gleich der Beschriftung, Text ersetzt", "<img alt=\"$T\" src=\"data:,\">"],
  ["I5", "img alt gleich der Beschriftung, Text bleibt", "$T<img alt=\"$T\" src=\"data:,\">"],
  ["I6", "img ohne alt mit title=\"Mehr\"", "$T<img src=\"data:,\" title=\"Mehr\">"],
  ["I7", "img alt=\"\" mit title=\"Mehr\"", "$T<img alt=\"\" src=\"data:,\" title=\"Mehr\">"],
  ["I8", "img alt=\"Mehr\" aria-hidden=\"true\"", "$T<img alt=\"Mehr\" aria-hidden=\"true\" src=\"data:,\">"],
  ["I9", "img alt=\"Mehr\" hidden", "$T<img alt=\"Mehr\" hidden src=\"data:,\">"],
  ["I10", "img alt=\"Mehr\" inert", "$T<img alt=\"Mehr\" inert src=\"data:,\">"],
  ["I11", "img alt=\"Mehr\" in span hidden", "$T<span hidden><img alt=\"Mehr\" src=\"data:,\"></span>"],
  ["I12", "img alt=\"Mehr\" in span aria-hidden", "$T<span aria-hidden=\"true\"><img alt=\"Mehr\" src=\"data:,\"></span>"],
  ["I13", "img alt=\"Mehr\" in span inert", "$T<span inert><img alt=\"Mehr\" src=\"data:,\"></span>"],
  ["I14", "img alt=\"Mehr\" role=presentation", "$T<img alt=\"Mehr\" role=\"presentation\" src=\"data:,\">"],
  ["I15", "img alt=\"Mehr\" role=none", "$T<img alt=\"Mehr\" role=\"none\" src=\"data:,\">"],
  ["I16", "img alt=\"Mehr\" style=display:none", "$T<img alt=\"Mehr\" style=\"display:none\" src=\"data:,\">"],
  ["I17", "img alt=\"Mehr\" in span (Zwischenelement, sichtbar)", "$T<span><img alt=\"Mehr\" src=\"data:,\"></span>"],
  ["I18", "img ALT in Grossbuchstaben (Attributname)", "$T<IMG ALT=\"Mehr\" src=\"data:,\">"],
  ["P1", "Text in span role=presentation", "<span role=\"presentation\">$T</span>"],
  ["P2", "span role=presentation mit «Mehr»", "$T<span role=\"presentation\">Mehr</span>"],
  ["N1", "input type=button value=Mehr", "$T<input type=\"button\" value=\"Mehr\">"],
  ["N2", "input type=submit value=Mehr", "$T<input type=\"submit\" value=\"Mehr\">"],
  ["N3", "input type=submit ohne value", "$T<input type=\"submit\">"],
  ["N4", "input type=reset ohne value", "$T<input type=\"reset\">"],
  ["N5", "input type=text value=Mehr", "$T<input type=\"text\" value=\"Mehr\">"],
  ["N6", "input type=text ohne value", "$T<input type=\"text\">"],
  ["N7", "input type=text placeholder=Mehr", "$T<input type=\"text\" placeholder=\"Mehr\">"],
  ["N8", "input type=hidden value=Mehr", "$T<input type=\"hidden\" value=\"Mehr\">"],
  ["N9", "input type=HIDDEN value=Mehr", "$T<input type=\"HIDDEN\" value=\"Mehr\">"],
  ["N10", "input type=checkbox", "$T<input type=\"checkbox\">"],
  ["N11", "input type=image alt=Mehr", "$T<input type=\"image\" alt=\"Mehr\" src=\"data:,\">"],
  ["N12", "input type=number value=5", "$T<input type=\"number\" value=\"5\">"],
  ["N13", "input hidden-Attribut value=Mehr", "$T<input hidden type=\"text\" value=\"Mehr\">"],
  ["N14", "input aria-hidden value=Mehr", "$T<input aria-hidden=\"true\" type=\"text\" value=\"Mehr\">"],
  ["N15", "input ohne type value=Mehr", "$T<input value=\"Mehr\">"],
  ["N16", "input type=button value gleich der Beschriftung, Text ersetzt", "<input type=\"button\" value=\"$T\">"],
  ["N17", "input type=range", "$T<input type=\"range\">"],
  ["B1", "button «Mehr»", "$T<button>Mehr</button>"],
  ["B2", "button leer", "$T<button></button>"],
  ["B3", "select mit option «Mehr»", "$T<select><option>Mehr</option></select>"],
  ["B4", "select zwei Optionen, «Mehr» gewählt", "$T<select><option>A</option><option selected>Mehr</option></select>"],
  ["B5", "textarea «Mehr»", "$T<textarea>Mehr</textarea>"],
  ["B6", "textarea leer", "$T<textarea></textarea>"],
  ["B7", "area alt=Mehr", "$T<area alt=\"Mehr\" href=\"kurz.html\">"],
  ["B8", "map mit area alt=Mehr", "$T<map name=\"m\"><area alt=\"Mehr\" href=\"kurz.html\"></map>"],
  ["B9", "button aria-hidden «Mehr»", "$T<button aria-hidden=\"true\">Mehr</button>"],
];
const POS = [
  ["z", "Zeile", ROW, null, "utility-nav", 1280],
  ["m", "Menü", MENU, null, "nav", 300],
  ["rz", "Zeile, Rückfall ohne utilityNav", ROW, c => { delete c.utilityNav; }, "utility-nav", 1280],
  ["rm", "Menü, Rückfall ohne utilityNav", MENU, c => { delete c.utilityNav; }, "nav", 300],
];
const norm = s => String(s || "").replace(/\s+/g, " ").trim();

const B66 = await loadBuild(WT66), B65 = await loadBuild(WT65);
await mkdir(OUT, { recursive: true });
await cp(join(WT66, "site", "css"), join(OUT, "css"), { recursive: true });
await cp(join(WT66, "site", "js"), join(OUT, "js"), { recursive: true });
await cp(join(WT66, "site", "assets"), join(OUT, "assets"), { recursive: true });
if (existsSync(join(WT66, "site", "fonts"))) await cp(join(WT66, "site", "fonts"), join(OUT, "fonts"), { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
const lines = [];
const out = s => { lines.push(s); console.log(s); };
out(`# Gate r4-66 (${B66.BUILD}) und r4-65 (${B65.BUILD}) gegen Chromium ${browser.version()} (CDP Accessibility.getPartialAXTree)`);
out("Fall|Ort|Beschreibung|Chromium-Name|Chromium weicht ab|Gate r4-66|Gate r4-65|Urteil r4-66|Änderung");
const summary = { fp: [], fn: [], ok: 0, changed: [] };
const cdp = await ctx.newCDPSession(page);

const base66 = {}, base65 = {};
for (const [pk, , , mutCfg] of POS) {
  base66[pk] = await B66.render(mutCfg); base65[pk] = await B65.render(mutCfg);
}
const keyset = g => new Set(g.findings.filter(f => f.level === "block").map(f => f.page + "|" + f.id + "|" + f.message));
for (const [pk, pdesc, rx, , gid, width] of POS) {
  const g66base = keyset(B66.gate(base66[pk].config, base66[pk].raw));
  const g65base = keyset(B65.gate(base65[pk].config, base65[pk].raw));
  if (g66base.size || g65base.size) out(`WARNUNG Grundzustand ${pk}: Blocker ${[...g66base, ...g65base].join("; ")}`);
  for (const [ck, cdesc, tpl] of CASES) {
    const run = (B, bs, baseKeys) => {
      const raw = { ...bs.raw };
      let label = null;
      const html = raw["index.html"];
      const m = html.match(rx);
      if (!m) return { applied: false };
      label = m[2];
      raw["index.html"] = html.replace(rx, (all, a, t) => a + tpl.split("$T").join(t) + "<");
      const g = B.gate(bs.config, raw);
      const nb = g.findings.filter(f => f.level === "block" && f.page === "index" ? true : f.level === "block").filter(f => !baseKeys.has(f.page + "|" + f.id + "|" + f.message));
      return { applied: true, label, html: raw["index.html"], ids: [...new Set(nb.map(f => f.id))], msgs: nb.map(f => f.id + ": " + f.message) };
    };
    const r66 = run(B66, base66[pk], g66base), r65 = run(B65, base65[pk], g65base);
    if (!r66.applied) { out(`${ck}|${pk}|${cdesc}|Mutation nicht anwendbar`); continue; }
    const file = `m-${pk}-${ck}.html`;
    await writeFile(join(OUT, file), r66.html);
    await page.setViewportSize({ width, height: 900 });
    await page.goto("file://" + join(OUT, file));
    await page.waitForLoadState("load");
    if (pk.endsWith("m")) {
      const btn = page.locator("nav[aria-label='Hauptnavigation'] [data-puk-disclosure] button, nav[aria-label='Hauptnavigation'] summary").first();
      if (await btn.count()) { await btn.click(); await page.waitForTimeout(100); }
    }
    const sel = pk.endsWith("m") ? "a.puk-site-menu__utility-link" : "a.puk-site-utility__link";
    const { root } = await cdp.send("DOM.getDocument", { depth: 0 });
    const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: sel });
    const { node } = await cdp.send("DOM.describeNode", { nodeId });
    const { nodes } = await cdp.send("Accessibility.getPartialAXTree", { backendNodeId: node.backendNodeId, fetchRelatives: false });
    const ax = nodes[0];
    const label = norm(r66.label);
    let cname, deviates;
    if (!ax || ax.ignored) { cname = "(ignoriert/nicht im Baum)"; deviates = true; }
    else { cname = (ax.role?.value || "?") + " «" + norm(ax.name?.value) + "»"; deviates = norm(ax.name?.value) !== label; }
    const hit66 = r66.ids.includes(gid), hit65 = r65.applied && r65.ids.includes(gid);
    let verdict;
    if (deviates && hit66) { verdict = "richtig blockiert"; summary.ok++; }
    else if (!deviates && !hit66) { verdict = "richtig frei"; summary.ok++; }
    else if (deviates && !hit66) { verdict = "FALSCH-NEGATIV"; summary.fn.push(`${ck}${pk}`); }
    else { verdict = "falsch-positiv (strenger)"; summary.fp.push(`${ck}${pk}`); }
    const change = hit66 === hit65 ? "gleich" : hit66 ? "NEU BLOCKIERT" : "NICHT MEHR BLOCKIERT";
    if (change !== "gleich") summary.changed.push(`${ck}${pk}: ${change}`);
    const other = r66.ids.filter(i => i !== gid);
    out(`${ck}|${pk}|${cdesc}|${cname}|${deviates ? "ja" : "nein"}|${hit66 ? gid : "–"}${other.length ? " (+" + other.join(",") + ")" : ""}|${hit65 ? gid : "–"}|${verdict}|${change}`);
  }
}
// Fehlerseite: keine Direkteinstiege, also kein accTxt
{
  const bs = base66.z; const raw = { ...bs.raw };
  const h = raw["404.html"];
  out(`404: Zeile «Direkteinstiege» ${/aria-label="Direkteinstiege"/.test(h) ? "vorhanden" : "fehlt"}, Menüeinträge puk-site-menu__utility-link: ${(h.match(/puk-site-menu__utility-link/g) || []).length}`);
  raw["404.html"] = h.replace(/(<a class="puk-web-nav__link" href="[^"]+"[^>]*>)([^<]*)</, "$1$2<img alt=\"Mehr\" src=\"data:,\"><");
  const g = B66.gate(bs.config, raw).findings.filter(f => f.level === "block");
  out(`404 mit <img alt="Mehr"> im ersten Menülink: Blocker ${g.length} ${g.map(f => f.id).join(",")}`);
  // Direkteinstieg auf der Fehlerseite künstlich ergänzt
  raw["404.html"] = h.replace(/<\/header>/, '<nav aria-label="Direkteinstiege"><a class="puk-site-utility__link" href="kurz.html">Kurz und klar<img alt="Mehr" src="data:,"></a></nav></header>');
  const g2 = B66.gate(bs.config, raw).findings.filter(f => f.level === "block");
  out(`404 mit künstlicher Zeile «Direkteinstiege» und <img alt="Mehr">: Blocker ${g2.length} ${g2.map(f => f.id + ": " + f.msg).join(" | ")}`);
}
out(`Zusammenfassung r4-66: übereinstimmend ${summary.ok}, falsch-negativ ${summary.fn.length} [${summary.fn.join(", ")}], falsch-positiv ${summary.fp.length} [${summary.fp.join(", ")}]`);
out(`Änderungen gegenüber r4-65: ${summary.changed.length} [${summary.changed.join("; ")}]`);
await browser.close();
await writeFile(join(OUT, "..", "gate-cdp-ausgabe.txt"), lines.join("\n") + "\n");
