import { createMaterialDownloadResponse } from "../../server/material-download";

type MaterialDownloadContext = {
  params?: {
    id?: string;
  };
};

export default async (_req: Request, context: MaterialDownloadContext) => {
  const id = context.params?.id;
  if (!id) {
    return new Response("Material nicht gefunden.", { status: 404 });
  }

  return createMaterialDownloadResponse(id);
};

export const config = {
  path: "/api/material-download/:id",
};
