import fs from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import materialDownloadFunction from "../../../netlify/functions/material-download";
import { SECURITY_HEADERS } from "@shared/securityHeaders";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("netlify material-download function adapter", () => {
  it.each(["POST", "PUT", "DELETE", "PATCH", "OPTIONS"])(
    "rejects %s before reading or redirecting a PDF",
    async method => {
      const existsSync = vi.spyOn(fs, "existsSync").mockReturnValue(false);
      const fetchPdf = vi.fn();
      vi.stubGlobal("fetch", fetchPdf);
      const response = await materialDownloadFunction(
        new Request(
          "https://example.com/api/material-download/4-arten-von-grenzen",
          { method }
        ),
        { params: { id: "4-arten-von-grenzen" } }
      );

      expect(response.status).toBe(405);
      expect(response.headers.get("Allow")).toBe("GET, HEAD");
      expect(response.headers.get("Location")).toBeNull();
      expect(existsSync).not.toHaveBeenCalled();
      expect(fetchPdf).not.toHaveBeenCalled();
      for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
        expect(response.headers.get(header)).toBe(value);
      }
    }
  );

  it.each(["attachment", "inline"])(
    "returns HEAD metadata without the %s PDF body",
    async disposition => {
      const url = `https://example.com/api/material-download/4-arten-von-grenzen?disposition=${disposition}`;
      const context = { params: { id: "4-arten-von-grenzen" } };
      const getResponse = await materialDownloadFunction(
        new Request(url),
        context
      );
      const headResponse = await materialDownloadFunction(
        new Request(url, { method: "HEAD" }),
        context
      );

      expect(getResponse.status).toBe(200);
      expect((await getResponse.arrayBuffer()).byteLength).toBeGreaterThan(
        1024
      );
      expect(headResponse.status).toBe(getResponse.status);
      expect(headResponse.statusText).toBe(getResponse.statusText);
      expect(Object.fromEntries(headResponse.headers)).toEqual(
        Object.fromEntries(getResponse.headers)
      );
      expect(headResponse.body).toBeNull();
      await expect(headResponse.text()).resolves.toBe("");
    }
  );

  it("preserves the private 307 fallback for HEAD without a body", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const fetchPdf = vi.fn();
    vi.stubGlobal("fetch", fetchPdf);
    const response = await materialDownloadFunction(
      new Request("https://preview.example.com/api/material-download/kinder", {
        method: "HEAD",
      }),
      { params: { id: "kinder" } }
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(
      "/infografiken/manus-kinder-v3.pdf"
    );
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(fetchPdf).not.toHaveBeenCalled();
    for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
      expect(response.headers.get(header)).toBe(value);
    }
    expect(response.body).toBeNull();
    await expect(response.text()).resolves.toBe("");
  });

  it.each([undefined, "warnsignale", "unknown"])(
    "returns a bodyless HEAD 404 for missing or unpublished id %s",
    async id => {
      const response = await materialDownloadFunction(
        new Request("https://example.com/api/material-download/test", {
          method: "HEAD",
        }),
        { params: { id } }
      );

      expect(response.status).toBe(404);
      expect(response.body).toBeNull();
      await expect(response.text()).resolves.toBe("");
    }
  );

  it.each([
    ["kinder", "kinder"],
    ["genesung-zahlen", "genesung-zahlen"],
    ["selbstfuersorge-stopp-technik", "stopp-technik"],
  ])(
    "redirects missing local %s PDFs to their static asset",
    async (id, slug) => {
      vi.spyOn(fs, "existsSync").mockReturnValue(false);
      vi.stubEnv("URL", "https://production.example.com");
      const fetchPdf = vi.fn();
      vi.stubGlobal("fetch", fetchPdf);
      const response = await materialDownloadFunction(
        new Request(`https://preview.example.com/api/material-download/${id}`),
        { params: { id } }
      );
      expect(fetchPdf).not.toHaveBeenCalled();
      expect(response.status).toBe(307);
      expect(response.headers.get("Location")).toBe(
        `/infografiken/manus-${slug}-v3.pdf`
      );
      expect(response.headers.get("Cache-Control")).toBe("private, no-store");
      for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
        expect(response.headers.get(header)).toBe(value);
      }
    }
  );
  it("returns 404 when id param is missing", async () => {
    const req = new Request("https://example.com/api/material-download");

    const response = await materialDownloadFunction(req, { params: {} });

    expect(response.status).toBe(404);
    await expect(response.text()).resolves.toContain("Material nicht gefunden");
  });

  it("uses inline disposition when requested", async () => {
    const req = new Request(
      "https://example.com/api/material-download/4-arten-von-grenzen?disposition=inline"
    );

    const response = await materialDownloadFunction(req, {
      params: { id: "4-arten-von-grenzen" },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-disposition")).toContain("inline;");
  });

  it("defaults to attachment disposition", async () => {
    const req = new Request(
      "https://example.com/api/material-download/4-arten-von-grenzen"
    );

    const response = await materialDownloadFunction(req, {
      params: { id: "4-arten-von-grenzen" },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-disposition")).toContain(
      "attachment;"
    );
  });

  it.each([
    "notfallplan-krise",
    "notfallkarte-zuerich",
    "warnsignale",
    "selbstfuersorge-warnsignale",
    "spiegeln-statt-aufsaugen",
    "grenzen-spiegeln-statt-aufsaugen",
  ])("returns 404 when no static download is published for %s", async id => {
    const req = new Request(`https://example.com/api/material-download/${id}`);

    const response = await materialDownloadFunction(req, {
      params: { id },
    });

    expect(response.status).toBe(404);
  });
});
