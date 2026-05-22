import handler, {
  config as materialDownloadConfig,
} from "../../../netlify/functions/material-download";
import { describe, expect, it } from "vitest";

describe("material-download netlify function adapter", () => {
  it("returns 404 when no material id is provided", async () => {
    const response = await handler(
      new Request("https://example.com/api/material-download/"),
      {}
    );

    expect(response.status).toBe(404);
    await expect(response.text()).resolves.toContain(
      "Material nicht gefunden."
    );
  });

  it("passes through inline disposition for known materials", async () => {
    const response = await handler(
      new Request(
        "https://example.com/api/material-download/notfallplan-krise?disposition=inline"
      ),
      { params: { id: "notfallplan-krise" } }
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/pdf");
    expect(response.headers.get("Content-Disposition")).toContain("inline;");
  });

  it("falls back to attachment for non-inline disposition values", async () => {
    const response = await handler(
      new Request(
        "https://example.com/api/material-download/notfallplan-krise?disposition=download"
      ),
      { params: { id: "notfallplan-krise" } }
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Disposition")).toContain(
      "attachment;"
    );
  });

  it("keeps the expected function route path", () => {
    expect(materialDownloadConfig.path).toBe("/api/material-download/:id");
  });
});
