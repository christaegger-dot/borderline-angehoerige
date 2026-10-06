import { describe, expect, it } from "vitest";
import {
  ALLE_KONTAKTE,
  KONTAKT_NACHWEISE,
  emailByIdStrict,
  fachstellenProfil,
  kontaktByIdStrict,
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
    const original = KONTAKT_NACHWEISE.GELB_PUK_ERW;
    KONTAKT_NACHWEISE.GELB_PUK_ERW = {
      ...original,
      status: "pending",
      independentCheckDate: null,
      independentCheckScope: null,
    };
    try {
      expect(validateKontakteCoverage).not.toThrow();
      const nachweis = kontaktNachweisByIdStrict("GELB_PUK_ERW");
      expect(nachweis.primarySourceUrl).toBe("https://www.pukzh.ch");
      expect(nachweis.status).toBe("pending");
      expect(nachweis.independentCheckDate).toBeNull();
      expect(nachweis.independentCheckScope).toBeNull();
    } finally {
      KONTAKT_NACHWEISE.GELB_PUK_ERW = original;
    }
  });

  it.each([
    "GELB_PUK_KJP",
    "GELB_PUK_ERW",
    "GELB_PUK_65",
    "INFO_KIZ",
    "INFO_PUK_ZENTRALE",
    "INFO_PUK_KJPP_HYPE",
    "INFO_FACHSTELLE",
    "INFO_PUK_DBT",
    "INFO_IPW",
  ])(
    "belegt %s nur als veröffentlichte Nummer, ohne menschliche Freigabe",
    id => {
      const nachweis = kontaktNachweisByIdStrict(id);
      expect(nachweis.status).toBe("number-confirmed");
      expect(nachweis.independentCheckDate).toBe("2026-10-06");
      expect(nachweis.primarySourceUrl).toMatch(
        /^https:\/\/(?:www\.pukzh\.ch|ipw\.ch)/
      );
      expect(nachweis.independentCheckScope).toContain("Erreichbarkeit");
      expect(nachweis.independentCheckScope).toContain("Publikationsfreigabe");
      expect(nachweis.namedOwner).toBeNull();
    }
  );

  it("lässt trotz gelesenem KIZ-Anbieterbeleg die kantonale Quellenabweichung offen", () => {
    const contact = kontaktByIdStrict("INFO_KIZ");
    const nachweis = kontaktNachweisByIdStrict("INFO_KIZ");
    expect(contact.nummer).toBe("058 384 65 00");
    expect(contact.tel).toBe("+41583846500");
    expect(contact.label).toContain("PUK");
    expect(contact.hinweis).toContain("Durchwahlnummer 4");
    expect(nachweis.primarySourceUrl).toContain("/krisenintervention-kiz/");
    expect(nachweis.independentCheckScope).toContain(
      "044 296 73 10 bleibt ungeklärt"
    );
    expect(nachweis.independentCheckScope).toContain(
      "keine Bestätigung einer Weiterleitung"
    );
  });

  it("ordnet die historische HYPE-ID dem belegten allgemeinen Ambulatorium zu", () => {
    const contact = kontaktByIdStrict("INFO_PUK_KJPP_HYPE");
    const nachweis = kontaktNachweisByIdStrict(contact.id);
    expect(contact.nummer).toBe("058 384 66 00");
    expect(contact.tel).toBe("+41583846600");
    expect(contact.label).toBe("KJPP Ambulatorium Zürich");
    expect(contact.hinweis).toContain(
      "keine bestätigte direkte HYPE-Programmnummer"
    );
    expect(nachweis.primarySourceUrl).toContain(
      "/standorte/zentrum-fuer-jugendpsychiatrie-ambulatorium-zuerich/"
    );
    expect(nachweis.independentCheckScope).toContain(
      "keine bestätigte direkte HYPE-Programmnummer"
    );
    expect(emailByIdStrict("EMAIL_KJPP").adresse).toBe(
      "ambulatorium.zuerich@pukzh.ch"
    );
    expect(emailByIdStrict("EMAIL_KJPP").label).toContain(
      "allgemeiner Kontakt"
    );
  });

  it("trennt den Fachstellen-Nummernabgleich von der offenen Prüfung des gesamten Profils", () => {
    expect(fachstellenProfil.telefonNachweis.status).toBe("number-confirmed");
    expect(fachstellenProfil.profilPruefung.status).toBe("pending");
    expect(fachstellenProfil.profilPruefung.datum).toBeNull();
    expect(
      fachstellenProfil.profilPruefung.namentlichVerantwortlich
    ).toBeNull();
    expect(fachstellenProfil.pruefHinweis).toContain(
      "Telefonnummer ist am 06.10.2026"
    );
    expect(fachstellenProfil.pruefHinweis).toContain(
      "nicht abschliessend geprüft"
    );
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
