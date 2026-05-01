import express from "express";
import { createServer } from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SECURITY_HEADERS } from "../shared/securityHeaders";
import {
  getStaticHtmlCandidates,
  STATIC_ROUTE_REDIRECTS,
} from "../shared/staticRouteShells";
import { createMaterialDownloadResponse } from "./material-download";

const SERVER_MODULE_FILENAME = fileURLToPath(import.meta.url);
const SERVER_MODULE_DIRNAME = path.dirname(SERVER_MODULE_FILENAME);
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
      ? path.resolve(SERVER_MODULE_DIRNAME, "public")
      : path.resolve(SERVER_MODULE_DIRNAME, "..", "dist", "public");

  const resolveStaticHtmlFile = (pathname: string) => {
    for (const candidate of getStaticHtmlCandidates(pathname)) {
      const absolutePath = path.join(staticPath, candidate);
      if (fs.existsSync(absolutePath)) {
        return absolutePath;
      }
    }

    return null;
  };

  // Serve prerendered HTML shells without directory redirects.
  app.get("/{*splat}", (req, res, next) => {
    const redirect = STATIC_ROUTE_REDIRECTS.find(
      route => route.from === req.path
    );
    if (redirect) {
      return res.redirect(redirect.status, redirect.to);
    }

    if (req.path === "/" || req.path.endsWith("/") || path.extname(req.path)) {
      return next();
    }

    const staticHtmlFile = resolveStaticHtmlFile(req.path);
    if (staticHtmlFile) {
      return res.sendFile(staticHtmlFile);
    }

    return next();
  });

  app.use(express.static(staticPath));

  // Unknown HTML-like routes resolve to the dedicated 404 shell.
  app.get("/{*splat}", (req, res, next) => {
    if (path.extname(req.path)) {
      return next();
    }

    const notFoundHtml = path.join(staticPath, "404.html");
    if (fs.existsSync(notFoundHtml)) {
      return res.status(404).sendFile(notFoundHtml);
    }

    return res.status(404).send("Seite nicht gefunden.");
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
