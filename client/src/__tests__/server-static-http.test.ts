// @vitest-environment node
import { createServer, request, type Server } from "node:http";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../../../server/index";

describe("production static HTML HTTP boundaries", () => {
  let fixtureRoot: string;
  let server: Server;
  let port: number;
  const notFoundHtml = "<!doctype html><h1>Seite nicht gefunden</h1>";
  const validPageHtml = "<!doctype html><h1>Borderline verstehen</h1>";
  const privateHtml = "<!doctype html><p>Private render source</p>";

  beforeAll(async () => {
    fixtureRoot = await mkdtemp(path.join(tmpdir(), "static-http-boundary-"));
    const publicRoot = path.join(fixtureRoot, "dist/public");
    const privatePaths = [
      "client/index.html",
      "qa/handout-render-sources/notfallplan-krise-v04.html",
      "dist/public2/secret.html",
    ];
    await mkdir(publicRoot, { recursive: true });
    await Promise.all([
      writeFile(path.join(publicRoot, "404.html"), notFoundHtml),
      writeFile(path.join(publicRoot, "verstehen.html"), validPageHtml),
      ...privatePaths.map(async relativePath => {
        const filePath = path.join(fixtureRoot, relativePath);
        await mkdir(path.dirname(filePath), { recursive: true });
        await writeFile(filePath, privateHtml);
      }),
    ]);
    server = createServer(createApp(publicRoot));
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected an HTTP TCP listener.");
    }
    port = address.port;
  });

  afterAll(async () => {
    if (server) {
      await new Promise<void>((resolve, reject) =>
        server.close(error => (error ? reject(error) : resolve()))
      );
    }
    if (fixtureRoot) await rm(fixtureRoot, { recursive: true, force: true });
  });

  // Fetch/URL would normalize literal ../ before it reaches Express. Node's
  // request path preserves the raw traversal that exposed the private HTML.
  function requestRaw(pathname: string, method = "GET") {
    return new Promise<{ status: number; body: string; location?: string }>(
      (resolve, reject) => {
        const req = request(
          { hostname: "127.0.0.1", port, path: pathname, method },
          res => {
            const chunks: Buffer[] = [];
            res.on("data", chunk => chunks.push(Buffer.from(chunk)));
            res.on("end", () =>
              resolve({
                status: res.statusCode ?? 0,
                location: res.headers.location,
                body: Buffer.concat(chunks).toString("utf8"),
              })
            );
            res.on("error", reject);
          }
        );
        req.on("error", reject);
        req.end();
      }
    );
  }

  it.each([
    "/../../client/index",
    "/../../qa/handout-render-sources/notfallplan-krise-v04",
    "/../public2/secret",
  ])(
    "does not serve a private HTML candidate through raw path %s",
    async url => {
      const response = await requestRaw(url);

      expect(response.status).toBe(404);
      expect(response.body).toBe(notFoundHtml);
      expect(response.body).not.toContain("Private render source");
    }
  );

  it.each(["/404", "/404/"])(
    "keeps %s at HTTP 404 for GET and HEAD",
    async url => {
      for (const method of ["GET", "HEAD"]) {
        const response = await requestRaw(url, method);

        expect(response.status).toBe(404);
        expect(response.body).toBe(method === "HEAD" ? "" : notFoundHtml);
      }
    }
  );

  it.each(["/verstehen", "/verstehen/", "/verstehen/?from=nav"])(
    "still serves the existing public page at %s for GET and HEAD",
    async url => {
      for (const method of ["GET", "HEAD"]) {
        const response = await requestRaw(url, method);

        expect(response.status).toBe(200);
        expect(response.body).toBe(method === "HEAD" ? "" : validPageHtml);
        expect(response.location).toBeUndefined();
      }
    }
  );

  it.each([
    "/does-not-exist",
    "/does-not-exist/",
    "/notfallkarte/erstellen/",
    "/verstehen//",
  ])("keeps the unknown or withdrawn HTML route %s at HTTP 404", async url => {
    const response = await requestRaw(url);

    expect(response.status).toBe(404);
    expect(response.body).toBe(notFoundHtml);
  });

  it.each([
    ["/notfallkarte/", "/soforthilfe"],
    ["/notfallkarte/?from=legacy", "/soforthilfe?from=legacy"],
    [
      "/therapieangebote/?from=legacy",
      "/unterstuetzen/therapie?from=legacy#therapieangebote",
    ],
  ])(
    "keeps the known redirect %s and its query/fragment",
    async (url, target) => {
      for (const method of ["GET", "HEAD"]) {
        const response = await requestRaw(url, method);

        expect(response.status).toBe(301);
        expect(response.location).toBe(target);
        if (method === "HEAD") expect(response.body).toBe("");
      }
    }
  );
});
