#!/usr/bin/env node
// Generiert WebP-Thumbnails fuer Manus-Infografiken.
// Quelle: /public/infografiken/manus-*-v*.webp
// Ziel:   /public/infografiken/extras/thumbnails/manus-*-v*.webp
// Resize: 600 px Breite, hoehe auto (aspect ratio bleibt).
// Quality: 80 (Default fuer Vorschau-Tiles).
//
// Idempotent: vorhandene Thumbnails werden ueberschrieben.

import { readdir, mkdir, stat } from "node:fs/promises";
import { join, basename } from "node:path";
import sharp from "sharp";

const SRC_DIR = "client/public/infografiken";
const DST_DIR = "client/public/infografiken/extras/thumbnails";
const TARGET_WIDTH = 600;
const QUALITY = 80;

await mkdir(DST_DIR, { recursive: true });

const files = (await readdir(SRC_DIR)).filter(
  f => f.startsWith("manus-") && f.endsWith(".webp")
);

let totalIn = 0;
let totalOut = 0;
for (const file of files) {
  const src = join(SRC_DIR, file);
  const dst = join(DST_DIR, file);
  const srcSize = (await stat(src)).size;
  await sharp(src)
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(dst);
  const dstSize = (await stat(dst)).size;
  const meta = await sharp(dst).metadata();
  totalIn += srcSize;
  totalOut += dstSize;
  console.log(
    `${file.padEnd(48)} ${Math.round(srcSize / 1024)} KB -> ${Math.round(dstSize / 1024)} KB  (${meta.width}x${meta.height})`
  );
}

console.log(
  `\nTotal: ${(totalIn / 1024 / 1024).toFixed(2)} MB -> ${(totalOut / 1024 / 1024).toFixed(2)} MB  (-${Math.round((1 - totalOut / totalIn) * 100)} %)  ${files.length} files`
);
