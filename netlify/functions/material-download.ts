import { createMaterialDownloadResponse } from "../../server/material-download";
import { SECURITY_HEADERS } from "../../shared/securityHeaders";

type MaterialDownloadContext = {
  params?: {
    id?: string;
  };
};

export default async (req: Request, context: MaterialDownloadContext) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return new Response("Methode nicht erlaubt.", {
      status: 405,
      headers: { ...SECURITY_HEADERS, Allow: "GET, HEAD" },
    });
  }

  const id = context.params?.id;
  const url = new URL(req.url);
  const disposition =
    url.searchParams.get("disposition") === "inline" ? "inline" : "attachment";
  const response = id
    ? await createMaterialDownloadResponse(id, disposition)
    : new Response("Material nicht gefunden.", { status: 404 });

  return req.method === "HEAD"
    ? new Response(null, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      })
    : response;
};

export const config = {
  path: "/api/material-download/:id",
};
