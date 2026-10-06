import { describe, expect, it } from "vitest";
import {
  ALLE_KONTAKTE,
  KONTAKT_NACHWEISE,
  kontaktNachweisByIdStrict,
  validateKontakteCoverage,
} from "@/data/kontakte";

describe("getrennte Quellen- und Prüfnachweise der Telefonkontakte", () => {
  it("deckt jede Kontakt-ID genau einmal ab", () => {
    expect(validateKontakteCoverage).not.toThrow();
    expect(Object.keys(KONTAKT_NACHWEISE).sort()).toEqual(
      ALLE_KONTAKTE.map(k => k.id).sort()
    );
  });

  it("wertet eine bekannte Anbieter-URL ohne Abgleich nicht als Bestätigung", () => {
    const nachweis = kontaktNachweisByIdStrict("GELB_PUK_ERW");
    expect(nachweis.region).toBe("Kanton Zürich");
    expect(nachweis.primarySourceUrl).toBe("https://www.pukzh.ch");
    expect(nachweis.status).toBe("pending");
    expect(nachweis.independentCheckDate).toBeNull();
    expect(nachweis.namedOwner).toBeNull();
  });

  it("weist fehlende Nachweise zurück", () => {
    const nachweis = KONTAKT_NACHWEISE.ROT_144;
    delete KONTAKT_NACHWEISE.ROT_144;
    try {
      expect(validateKontakteCoverage).toThrow(
        "Kontakt ohne Kontaktnachweis: ROT_144"
      );
    } finally {
      KONTAKT_NACHWEISE.ROT_144 = nachweis;
    }
  });

  it("weist Nummernbestätigungen ohne Primärquelle zurück", () => {
    const nachweis = KONTAKT_NACHWEISE.ROT_145;
    KONTAKT_NACHWEISE.ROT_145 = { ...nachweis, primarySourceUrl: null };
    try {
      expect(validateKontakteCoverage).toThrow(
        "Nummernbestätigung ohne Quelle, Datum oder Umfang: ROT_145"
      );
    } finally {
      KONTAKT_NACHWEISE.ROT_145 = nachweis;
    }
  });
});
