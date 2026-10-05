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

  it.each([
    "notfallkarte-zuerich",
    "4-phasen",
    "im-krisenmodus",
    "notfallplan-krise",
    "spaltung",
    "wenn-worte-treffen",
    "leuchtturm",
    "eisberg",
    "alarm-modus",
    "krisenkommunikation",
    "anspannungskurve",
    "grenzen-ohne-eskalation",
    "pause-statt-streit",
    "zuhoeren-ohne-zustimmen",
    "bruecke-gelaender",
    "rolle-klaeren",
    "drei-saeulen",
    "konsistenz-prinzip",
    "beziehungs-achtsamkeit",
    "6-leitlinien",
    "4-alltags-tipps",
    "sauerstoffmaske",
    "gehirn",
    "zustands-landkarte",
    "remission-heilung",
    "5-faktoren-genesung",
    "rolle-genesungsprozess",
    "fortschritt-paradox",
    "schuld-verantwortung",
    "radikale-akzeptanz",
    "gespraeche-kippen",
    "beispiel-dialog",
  ])("returns 404 for the withdrawn visual %s", async id => {
    const response = await handler(
      new Request(`https://example.com/api/material-download/${id}`),
      { params: { id } }
    );

    expect(response.status).toBe(404);
  });

  it("passes through inline disposition for known materials", async () => {
    const response = await handler(
      new Request(
        "https://example.com/api/material-download/4-arten-von-grenzen?disposition=inline"
      ),
      { params: { id: "4-arten-von-grenzen" } }
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/pdf");
    expect(response.headers.get("Content-Disposition")).toContain("inline;");
  });

  it.each([
    "4-arten-von-grenzen",
    "grenzen-erkennen",
    "stopp-technik",
    "energie-konto",
  ])("serves the public material alias %s", async id => {
    const response = await handler(
      new Request(`https://example.com/api/material-download/${id}`),
      { params: { id } }
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/pdf");
  });

  it("falls back to attachment for non-inline disposition values", async () => {
    const response = await handler(
      new Request(
        "https://example.com/api/material-download/4-arten-von-grenzen?disposition=download"
      ),
      { params: { id: "4-arten-von-grenzen" } }
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
