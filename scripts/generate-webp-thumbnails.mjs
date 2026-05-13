#!/usr/bin/env node
// Konvertiert die 10 PNG-Thumbnails der Vollformat-Infografiken in WebP.
// Quelle: /public/infografiken/extras/thumbnails/*-v*.png  (600 px breit)
// Ziel:   /public/infografiken/extras/thumbnails/*-v*.webp (parallel zu PNG)
// Quality: 82 (matched mit Manus-WebPs aus PR #474).
//
// Nach erfolgreicher Konvertierung: content/*.ts-Refs auf .webp umstellen
// und PNG-Quellen entfernen (separater Schritt im PR).

import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const SRC_DIR = "client/public/infografiken/extras/thumbnails";
const QUALITY = 82;

const files = (await readdir(SRC_DIR)).filter(f => f.endsWith(".png"));

let totalIn = 0;
let totalOut = 0;
for (const file of files) {
  const src = join(SRC_DIR, file);
  const dst = src.replace(/\.png$/, ".webp");
  const srcSize = (await stat(src)).size;
  await sharp(src).webp({ quality: QUALITY }).toFile(dst);
  const dstSize = (await stat(dst)).size;
  const meta = await sharp(dst).metadata();
  totalIn += srcSize;
  totalOut += dstSize;
  console.log(
    `${file.padEnd(48)} ${Math.round(srcSize / 1024).toString().padStart(4)} KB -> ${Math.round(dstSize / 1024).toString().padStart(3)} KB  (${meta.width}x${meta.height})`,
  );
}

console.log(
  `\nTotal: ${(totalIn / 1024 / 1024).toFixed(2)} MB -> ${(totalOut / 1024 / 1024).toFixed(2)} MB  (-${Math.round((1 - totalOut / totalIn) * 100)} %)  ${files.length} files`,
);
