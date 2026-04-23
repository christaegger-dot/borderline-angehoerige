import express from "express";
import { createServer } from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SECURITY_HEADERS } from "../shared/securityHeaders";
import { createMaterialDownloadResponse } from "./material-download";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATIC_DIRECT_PAGE_ROUTES = new Set(["/soforthilfe"]);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Security headers (aligned with Netlify config)
  app.disable("x-powered-by");
  app.use((_req, res, next) => {
    for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
      res.setHeader(header, value);
    }
    next();
  });

  app.get("/api/material-download/:id", async (req, res) => {
    const disposition =
      req.query.disposition === "inline" ? "inline" : "attachment";
    const response = await createMaterialDownloadResponse(
      req.params.id,
      disposition
    );
    await sendResponse(res, response);
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Serve intentional static direct-access pages without the default / -> / redirect.
  app.get("/{*splat}", (req, res, next) => {
    if (req.path === "/" || req.path.endsWith("/") || path.extname(req.path)) {
      return next();
    }

    const routeDirectoryPath = path.join(
      staticPath,
      req.path.replace(/^\/+/, "")
    );
    const directPagePath = path.join(routeDirectoryPath, "index.html");

    if (STATIC_DIRECT_PAGE_ROUTES.has(req.path)) {
      if (!fs.existsSync(directPagePath)) {
        return next();
      }

      return res.sendFile(directPagePath);
    }

    if (
      fs.existsSync(routeDirectoryPath) &&
      fs.statSync(routeDirectoryPath).isDirectory() &&
      !fs.existsSync(directPagePath)
    ) {
      return res.sendFile(path.join(staticPath, "index.html"));
    }

    return next();
  });

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all non-file routes
  app.get("/{*splat}", (_req, res) => {
    // express.static already handles existing files (notfallkarte.html etc.)
    // This catch-all is only for SPA client-side routes
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

async function sendResponse(res: express.Response, response: Response) {
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const body = Buffer.from(await response.arrayBuffer());
  res.end(body);
}
