import { createMaterialDownloadResponse } from "../../server/material-download";

type MaterialDownloadContext = {
  deploy?: { id: string };
  site?: { name: string };
  params?: {
    id?: string;
  };
};

export default async (_req: Request, context: MaterialDownloadContext) => {
  const id = context.params?.id;
  if (!id) {
    return new Response("Material nicht gefunden.", { status: 404 });
  }

  const url = new URL(_req.url);
  const disposition =
    url.searchParams.get("disposition") === "inline" ? "inline" : "attachment";

  // Netlify exposes URL as the production address even in previews. Use
  // trusted platform metadata to keep PDFs on the exact matching deploy.
  const publicOrigin =
    context.deploy?.id && context.site?.name
      ? `https://${context.deploy.id}--${context.site.name}.netlify.app`
      : undefined;
  return createMaterialDownloadResponse(id, disposition, publicOrigin);
};

export const config = {
  path: "/api/material-download/:id",
};
