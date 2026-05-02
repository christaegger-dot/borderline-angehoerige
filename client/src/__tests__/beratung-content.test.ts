import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

describe("Beratung content", () => {
  it("keeps the currently published Stand by You help line times complete", () => {
    const pageSource = fs.readFileSync(
      path.join(repoRoot, "client/src/pages/Selbsthilfegruppen.tsx"),
      "utf8"
    );

    expect(pageSource).toContain('["Freitag", "08:30 – 14:00 Uhr"]');
  });
});
