import { describe, expect, it } from "vitest";
import materialDownloadFunction from "../../../netlify/functions/material-download";

describe("netlify material-download function adapter", () => {
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
