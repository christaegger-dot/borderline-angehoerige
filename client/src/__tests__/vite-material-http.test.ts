// @vitest-environment node
import path from "node:path";
import { request } from "node:http";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createServer, type ViteDevServer } from "vite";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.."
);

describe("Vite material HTTP request parsing", () => {
  let server: ViteDevServer;
  let baseUrl: string;

  beforeAll(async () => {
    server = await createServer({
      configFile: path.join(repoRoot, "vite.config.ts"),
      server: { host: "127.0.0.1", port: 0, strictPort: true },
      logLevel: "silent",
    });
    await server.listen();
    const address = server.httpServer?.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected a Vite HTTP TCP listener.");
    }
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    if (server) await server.close();
  });

  it.each(["%", "%E0%A4%A"])(
    "returns 400 for malformed material encoding %s and continues serving",
    async id => {
      const response = await fetch(`${baseUrl}/api/material-download/${id}`);

      expect(response.status).toBe(400);
      expect(response.headers.get("cache-control")).toBe("no-store");
      await expect(response.text()).resolves.toBe("Ungültige Material-ID.");

      const page = await fetch(`${baseUrl}/verstehen`);
      expect(page.status).toBe(200);
      await expect(page.text()).resolves.toContain(
        "Borderline verstehen – Borderline · Hilfe für Angehörige"
      );
    }
  );

  it("still serves a known public PDF", async () => {
    const response = await fetch(
      `${baseUrl}/api/material-download/4-arten-von-grenzen`
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/pdf");
    expect(
      Buffer.from(await response.arrayBuffer())
        .subarray(0, 5)
        .toString()
    ).toBe("%PDF-");
  });

  it.each([
    ["//", "Ungültige Anfrage."],
    ["/api/material-download//%", "Ungültige Material-ID."],
  ])(
    "rejects invalid raw URL %s without stopping the Vite server",
    async (pathname, message) => {
      const { hostname, port } = new URL(baseUrl);
      const malformed = await new Promise<{ status: number; body: string }>(
        (resolve, reject) => {
          const req = request({ hostname, port, path: pathname }, res => {
            const chunks: Buffer[] = [];
            res.on("data", chunk => chunks.push(Buffer.from(chunk)));
            res.on("end", () =>
              resolve({
                status: res.statusCode ?? 0,
                body: Buffer.concat(chunks).toString("utf8"),
              })
            );
            res.on("error", reject);
          });
          req.on("error", reject);
          req.end();
        }
      );

      expect(malformed.status).toBe(400);
      expect(malformed.body).toBe(message);
      const page = await fetch(`${baseUrl}/verstehen`);
      expect(page.status).toBe(200);
      await expect(page.text()).resolves.toContain(
        "Borderline verstehen – Borderline · Hilfe für Angehörige"
      );
    }
  );

  it.each(["GET", "HEAD"])(
    "serves a known page with a trailing slash for %s",
    async method => {
      const page = await fetch(`${baseUrl}/verstehen/?from=nav`, { method });

      expect(page.status).toBe(200);
      expect(page.redirected).toBe(false);
      const body = await page.text();
      if (method === "HEAD") expect(body).toBe("");
      else
        expect(body).toContain(
          'href="https://borderline-angehoerige.netlify.app/verstehen"'
        );
    }
  );

  it("preserves query and target fragment on a trailing-slash redirect", async () => {
    const response = await fetch(`${baseUrl}/therapieangebote/?from=legacy`, {
      redirect: "manual",
    });

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe(
      "/unterstuetzen/therapie?from=legacy#therapieangebote"
    );
  });
});
