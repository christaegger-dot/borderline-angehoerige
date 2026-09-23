import fs from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import materialDownloadFunction from "../../../netlify/functions/material-download";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("netlify material-download function adapter", () => {
  it.each([
    ["kinder", "kinder"],
    ["genesung-zahlen", "genesung-zahlen"],
    ["selbstfuersorge-stopp-technik", "stopp-technik"],
  ])("serves %s from its matching preview deploy", async (id, slug) => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    vi.stubEnv("URL", "https://production.example.com");
    const fetchPdf = vi.fn().mockResolvedValue(
      new Response("%PDF-1.7 preview", {
        headers: { "Content-Type": "application/pdf" },
      })
    );
    vi.stubGlobal("fetch", fetchPdf);
    const response = await materialDownloadFunction(
      new Request(`https://preview.example.com/api/material-download/${id}`),
      {
        params: { id },
        deploy: { id: "abc123" },
        site: { name: "example-site" },
      }
    );
    expect(fetchPdf).toHaveBeenCalledWith(
      `https://abc123--example-site.netlify.app/infografiken/manus-${slug}-v3.pdf`,
      expect.any(Object)
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Disposition")).toContain(
      "attachment;"
    );
    expect(await response.text()).toBe("%PDF-1.7 preview");
  });
  it("returns 404 when id param is missing", async () => {
    const req = new Request("https://example.com/api/material-download");

    const response = await materialDownloadFunction(req, { params: {} });

    expect(response.status).toBe(404);
    await expect(response.text()).resolves.toContain("Material nicht gefunden");
  });

  it("uses inline disposition when requested", async () => {
    const req = new Request(
      "https://example.com/api/material-download/notfallplan-krise?disposition=inline"
    );

    const response = await materialDownloadFunction(req, {
      params: { id: "notfallplan-krise" },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-disposition")).toContain("inline;");
  });

  it("defaults to attachment disposition", async () => {
    const req = new Request(
      "https://example.com/api/material-download/notfallplan-krise"
    );

    const response = await materialDownloadFunction(req, {
      params: { id: "notfallplan-krise" },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-disposition")).toContain(
      "attachment;"
    );
  });
});
