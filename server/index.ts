import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createMaterialDownloadResponse } from "./material-download";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Security headers (aligned with Netlify config)
  app.disable("x-powered-by");
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://forge.butterfly-effect.dev; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' https://files.manuscdn.com data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://forge.butterfly-effect.dev; media-src 'self' https://files.manuscdn.com; frame-ancestors 'none'"
    );
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(self)"
    );
    next();
  });

  app.get("/api/material-download/:id", async (req, res) => {
    const response = await createMaterialDownloadResponse(req.params.id);
    await sendResponse(res, response);
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

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
