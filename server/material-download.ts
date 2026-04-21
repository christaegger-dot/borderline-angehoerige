import {
  resolveHandoutAsset,
  type HandoutDisposition,
} from "../client/src/content/handouts";

export async function createMaterialDownloadResponse(
  id: string,
  disposition: HandoutDisposition = "attachment"
) {
  const download = resolveHandoutAsset(id);
  if (!download) {
    return new Response("Material nicht gefunden.", { status: 404 });
  }

  try {
    const upstream = await fetch(download.sourceUrl, {
      headers: {
        Accept: "application/pdf,application/octet-stream;q=0.9,*/*;q=0.1",
      },
    });

    if (!upstream.ok || !upstream.body) {
      return new Response("Download derzeit nicht verfügbar.", { status: 502 });
    }

    const headers = new Headers();
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
    return new Response("Download derzeit nicht verfügbar.", { status: 502 });
  }
}

function contentDisposition(fileName: string, disposition: HandoutDisposition) {
  const encodedName = encodeURIComponent(fileName);
  return `${disposition}; filename="${fileName}"; filename*=UTF-8''${encodedName}`;
}
