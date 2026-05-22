import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  isPathInsidePublicRoot,
  resolveLocalPdfPath,
} from "../../../server/material-download";

// Sicherheitstest fuer den Path-Traversal-Fix in resolveLocalPdfPath().
//
// Frueher: `absolutePath.startsWith(publicRoot)` — Prefix-Match ohne
// Boundary. /x/public2/foo.pdf passierte den Check, obwohl ausserhalb
// /x/public.
//
// Jetzt: isPathInsidePublicRoot() nutzt path.relative() mit ".."-Check.
// Die Pure-Helper-Funktion ist hier direkt testbar, ohne Filesystem-Setup.

describe("isPathInsidePublicRoot — Pure-Helper-Tests", () => {
  const publicRoot = "/repo/server/public";

  it("akzeptiert kanonische Subpfade", () => {
    expect(
      isPathInsidePublicRoot(publicRoot, "/repo/server/public/foo.pdf")
    ).toBe(true);
    expect(
      isPathInsidePublicRoot(publicRoot, "/repo/server/public/nested/foo.pdf")
    ).toBe(true);
  });

  it("akzeptiert publicRoot selbst", () => {
    expect(isPathInsidePublicRoot(publicRoot, publicRoot)).toBe(true);
  });

  it("blockiert Prefix-Kollisionen (Kern-Bug-Regression-Schutz)", () => {
    // /repo/server/public2/foo.pdf startet mit String "/repo/server/public"
    // - der frueher genutzte startsWith()-Check passierte das, jetzt blockt
    // path.relative() das mit ".."-Praefix.
    expect(
      isPathInsidePublicRoot(publicRoot, "/repo/server/public2/foo.pdf")
    ).toBe(false);
    expect(
      isPathInsidePublicRoot(publicRoot, "/repo/server/publicX/secret.pdf")
    ).toBe(false);
  });

  it("blockiert ..-Escapes", () => {
    const escapingPath = path.resolve(publicRoot, "..", "etc", "passwd");
    expect(isPathInsidePublicRoot(publicRoot, escapingPath)).toBe(false);
  });

  it("blockiert komplett externe Pfade", () => {
    expect(isPathInsidePublicRoot(publicRoot, "/etc/passwd")).toBe(false);
    expect(isPathInsidePublicRoot(publicRoot, "/var/log/secret")).toBe(false);
  });
});

// End-to-end-Tests gegen die echte Funktion mit dem Repo-Filesystem.
describe("resolveLocalPdfPath end-to-end", () => {
  it("loest existierende PDF-Quelle korrekt auf", () => {
    const result = resolveLocalPdfPath(
      "/Notfallkarte-Zuerich-Psychische-Krise.pdf"
    );
    expect(result, "echte PDF muss aufloesbar sein").not.toBeNull();
    expect(result).toMatch(/Notfallkarte-Zuerich-Psychische-Krise\.pdf$/);
    expect(result).toMatch(/[/\\]client[/\\]public[/\\]/);
  });

  it("liefert null fuer Traversal-Versuche", () => {
    expect(resolveLocalPdfPath("/../etc/passwd")).toBeNull();
    expect(resolveLocalPdfPath("/../../etc/passwd")).toBeNull();
    expect(resolveLocalPdfPath("/foo/../../../etc/passwd")).toBeNull();
  });

  it("liefert null fuer nicht-existente Dateien", () => {
    expect(resolveLocalPdfPath("/nonexistent.pdf")).toBeNull();
  });

  it("normalisiert mehrfache Slash-Prefixe", () => {
    const result = resolveLocalPdfPath(
      "///Notfallkarte-Zuerich-Psychische-Krise.pdf"
    );
    expect(
      result,
      "Trotz Slash-Pluralitaet muss echte PDF gefunden werden"
    ).not.toBeNull();
  });
});
