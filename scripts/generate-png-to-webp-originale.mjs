#!/usr/bin/env node
// Konvertiert die 10 Voll-PNG-Originale in WebP fuer Modal-/Detail-Display.
// Quelle: /public/infografiken/*-v*.png
// Ziel:   /public/infografiken/*-v*.webp  (parallel zu PNG, ueberschreibt nicht)
// Cap:    2000 px Breite (Retina-Tablet/Mobile reicht), aspect ratio bleibt.
// Quality: 85 (hoch genug fuer Modal-Vollansicht).
//
// PNG-Originale bleiben fuer PDF-Download/Print-Workflow erhalten.
// thumbnailUrl-Felder (kleine Vorschauen) sind separater Scope.

import { readdir, mkdir, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const SRC_DIR = "client/public/infografiken";
const TARGET_WIDTH = 2000;
const QUALITY = 85;

await mkdir(SRC_DIR, { recursive: true });

const files = (await readdir(SRC_DIR)).filter(
  f => f.endsWith(".png") && !f.startsWith("manus-"),
);

let totalIn = 0;
let totalOut = 0;
for (const file of files) {
  const src = join(SRC_DIR, file);
  const dst = src.replace(/\.png$/, ".webp");
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
    `${file.padEnd(50)} ${Math.round(srcSize / 1024)} KB -> ${Math.round(dstSize / 1024)} KB  (${meta.width}x${meta.height})`,
  );
}

console.log(
  `\nTotal: ${(totalIn / 1024 / 1024).toFixed(2)} MB -> ${(totalOut / 1024 / 1024).toFixed(2)} MB  (-${Math.round((1 - totalOut / totalIn) * 100)} %)  ${files.length} files`,
);
