// Standalone website build — source and release artifacts live in this repository.
// Node >= 18; no third-party dependencies. The audited snapshot in site/ is not changed by default.
import { readFile, readdir, copyFile, cp, mkdir, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve, relative, isAbsolute, join, sep } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const C = require("./contract.js");
const sourceDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoDir = resolve(sourceDir, "..");
const args = process.argv.slice(2);
const production = args.includes("--production");
const verifySite = args.includes("--verify-site");
const outputFlag = args.find(arg => arg.startsWith("--out="));
const outputDir = resolve(repoDir, outputFlag ? outputFlag.slice(6) : "dist/site");
const relOut = relative(repoDir, outputDir).split(sep).join("/");
if (!relOut || relOut === "." || relOut.startsWith("../") || isAbsolute(relOut) ||
    relOut === "authoring" || relOut.startsWith("authoring/")) {
  throw new Error("Ungültiges Ausgabeziel: Ausgabe muss innerhalb des Repositorys und ausserhalb von authoring/ liegen");
}
if (relOut === "site" && !args.includes("--write-site")) {
  throw new Error("Schreiben nach site/ nur mit --write-site erlaubt");
}
if (verifySite && relOut === "site") {
  throw new Error("--verify-site prüft dist/site gegen site/ und überschreibt den geprüften Stand nicht");
}
const config = JSON.parse(await readFile(join(sourceDir, "site.config.json"), "utf8"));
const fragments = {};
for (const page of config.pages) {
  const path = join(sourceDir, "content", page.id + ".html");
  if (!existsSync(path)) throw new Error("Inhaltsfragment fehlt: " + path);
  fragments[page.id] = await readFile(path, "utf8");
}
if (existsSync(join(sourceDir, "tools", "search-index.mjs"))) {
  const { injectSearchIndex } = await import("./search-index.mjs");
  injectSearchIndex(config, fragments);
}
const pages = config.pages.filter(page => page.status === "published");
const rawPages = {};
for (const page of pages) {
  const path = C.resolve("", page.href).path;
  if (path.startsWith("..") || path.startsWith("/") || !path.endsWith(".html")) {
    throw new Error("Ungültiger Seitenpfad: " + path);
  }
  rawPages[path] = C.renderPage(config, page, fragments[page.id]);
}
const reportPath = join(sourceDir, "PRUEFBERICHT.md");
const report = existsSync(reportPath) ? await readFile(reportPath, "utf8") : null;
const gate = C.gate(config, rawPages, {
  mode: production ? "production" : "draft",
  exists: path => Object.hasOwn(rawPages, path) || existsSync(join(sourceDir, path)),
  report
});
for (const finding of gate.findings) {
  console.log([finding.level.toUpperCase(), finding.page, finding.id, finding.msg].join(" | "));
}
if (gate.blocks) {
  throw new Error("Build blockiert: " + gate.blocks + " Befund(e)");
}
// Build to an explicit destination; never silently replace the tracked release.
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
const rootUrl = config.siteUrl ? new URL(config.siteUrl).pathname.replace(/\/?$/, "/") : "/";
for (const page of pages) {
  const path = C.resolve("", page.href).path;
  let html = rawPages[path];
  if (page.role === "not-found") {
    html = html.replace(/(\s(?:href|src)=")(?!#|[a-z][a-z0-9+.-]*:|\/)/gi,
      (full, prefix) => prefix + rootUrl);
  }
  await mkdir(dirname(join(outputDir, path)), { recursive: true });
  await import("node:fs/promises").then(fs => fs.writeFile(join(outputDir, path), html));
}
for (const dir of ["css", "js", "fonts", "assets"]) {
  if (existsSync(join(sourceDir, dir))) {
    await cp(join(sourceDir, dir), join(outputDir, dir), { recursive: true });
  }
}
for (const file of ["_headers", "_redirects", "robots.txt"]) {
  if (existsSync(join(sourceDir, file))) {
    await copyFile(join(sourceDir, file), join(outputDir, file));
  }
}
if (existsSync(join(sourceDir, "sitemap.xml"))) {
  if (!config.siteUrl) throw new Error("sitemap.xml verlangt eine siteUrl");
  const base = config.siteUrl.replace(/\/$/, "");
  const urls = pages.filter(page => page.role !== "not-found").map(page =>
    "  <url><loc>" + base + "/" + C.resolve("", page.href).path + "</loc></url>");
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.join("\n") + "\n</urlset>\n";
  await import("node:fs/promises").then(fs => fs.writeFile(join(outputDir, "sitemap.xml"), sitemap));
}
async function fileMap(dir, prefix = "") {
  const result = new Map();
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const key = prefix ? prefix + "/" + item.name : item.name;
    if (item.isDirectory()) {
      for (const [name, bytes] of await fileMap(join(dir, item.name), key)) result.set(name, bytes);
    } else if (item.isFile()) {
      result.set(key, await readFile(join(dir, item.name)));
    }
  }
  return result;
}
if (verifySite) {
  const expected = await fileMap(join(repoDir, "site"));
  const actual = await fileMap(outputDir);
  const differences = [];
  for (const key of new Set([...expected.keys(), ...actual.keys()])) {
    if (!expected.has(key)) differences.push("neu: " + key);
    else if (!actual.has(key)) differences.push("fehlt: " + key);
    else if (!expected.get(key).equals(actual.get(key))) differences.push("abweichend: " + key);
  }
  if (differences.length) {
    console.error("Quell-/Export-Abgleich fehlgeschlagen (" + differences.length + " Unterschiede):\n" +
      differences.slice(0, 50).join("\n"));
    process.exitCode = 1;
  } else {
    console.log("PARITÄT BESTANDEN: " + actual.size + " Dateien byte-gleich mit site/");
  }
}
console.log("Build " + (production ? "production" : "draft") + ": " + pages.length +
  " Seiten · " + gate.blocks + " Blocker · " + gate.warns + " Hinweise · Ziel " + relOut);
