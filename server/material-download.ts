import {
  resolveHandoutAsset,
  type HandoutDisposition,
} from "../client/src/content/handouts";
import fs from "node:fs";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { SECURITY_HEADERS } from "../shared/securityHeaders";

const MATERIAL_DOWNLOAD_MODULE_FILENAME = fileURLToPath(import.meta.url);
const MATERIAL_DOWNLOAD_MODULE_DIRNAME = path.dirname(
  MATERIAL_DOWNLOAD_MODULE_FILENAME
);
const LOCAL_PUBLIC_ROOTS = [
  path.resolve(MATERIAL_DOWNLOAD_MODULE_DIRNAME, "public"),
  path.resolve(MATERIAL_DOWNLOAD_MODULE_DIRNAME, "..", "client", "public"),
];

export async function createMaterialDownloadResponse(
  id: string,
  disposition: HandoutDisposition = "attachment"
) {
  const download = resolveHandoutAsset(id);
  if (!download) {
    return createTextResponse("Material nicht gefunden.", 404);
  }

  if (download.sourceKind === "local") {
    return createLocalMaterialDownloadResponse(
      download.sourceUrl,
      download.fileName,
      disposition
    );
  }

  try {
    const upstream = await fetch(download.sourceUrl, {
      headers: {
        Accept: "application/pdf,application/octet-stream;q=0.9,*/*;q=0.1",
      },
    });

    if (!upstream.ok || !upstream.body) {
      return createTextResponse("Download derzeit nicht verfügbar.", 502);
    }

    const headers = createSecurityHeaders();
    headers.set(
      "Content-Type",
      upstream.headers.get("content-type") ?? "application/pdf"
    );
    headers.set(
      "Cache-Control",
      upstream.headers.get("cache-control") ?? "public, max-age=31536000"
    );
    headers.set(
      "Content-Disposition",
      contentDisposition(download.fileName, disposition)
    );
    headers.set("X-Content-Type-Options", "nosniff");

    const contentLength = upstream.headers.get("content-length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    return new Response(upstream.body, {
      status: 200,
      headers,
    });
  } catch {
    return createTextResponse("Download derzeit nicht verfügbar.", 502);
  }
}

async function createLocalMaterialDownloadResponse(
  sourceUrl: string,
  fileName: string,
  disposition: HandoutDisposition
) {
  const absolutePath = resolveLocalPdfPath(sourceUrl);
  if (!absolutePath) {
    return createTextResponse("Material nicht gefunden.", 404);
  }

  try {
    const body = await readFile(absolutePath);
    const headers = createSecurityHeaders();
    headers.set("Content-Type", "application/pdf");
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    headers.set(
      "Content-Disposition",
      contentDisposition(fileName, disposition)
    );
    headers.set("Content-Length", String(body.byteLength));
    headers.set("X-Content-Type-Options", "nosniff");

    return new Response(body, {
      status: 200,
      headers,
    });
  } catch {
    return createTextResponse("Download derzeit nicht verfügbar.", 502);
  }
}

function contentDisposition(fileName: string, disposition: HandoutDisposition) {
  const encodedName = encodeURIComponent(fileName);
  return `${disposition}; filename="${fileName}"; filename*=UTF-8''${encodedName}`;
}

function createSecurityHeaders() {
  const headers = new Headers();

  for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(header, value);
  }

  return headers;
}

function createTextResponse(body: string, status: number) {
  const headers = createSecurityHeaders();
  headers.set("Content-Type", "text/plain; charset=utf-8");

  return new Response(body, { status, headers });
}

function resolveLocalPdfPath(sourceUrl: string) {
  const relativePath = sourceUrl.replace(/^\/+/, "");

  for (const publicRoot of LOCAL_PUBLIC_ROOTS) {
    const absolutePath = path.resolve(publicRoot, relativePath);
    if (!absolutePath.startsWith(publicRoot)) {
      continue;
    }

    if (fs.existsSync(absolutePath)) {
      return absolutePath;
    }
  }

  return null;
}
