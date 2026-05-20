import { describe, expect, it } from "vitest";
import { normalizeForIndex, normalizeQuery } from "@/lib/searchNormalize";

describe("searchNormalize", () => {
  describe("normalizeQuery", () => {
    it("lowercased + trimmed + whitespace-collapsed", () => {
      expect(normalizeQuery("  Foo   Bar  ")).toBe("foo bar");
    });

    it("transliteriert deutsche Umlaute", () => {
      expect(normalizeQuery("Zürich")).toBe("zuerich");
      expect(normalizeQuery("Ärztefon")).toBe("aerztefon");
      expect(normalizeQuery("Öffnung")).toBe("oeffnung");
      expect(normalizeQuery("Straße")).toBe("strasse");
    });

    it("strippt sonstige Diakritika", () => {
      expect(normalizeQuery("café")).toBe("cafe");
      expect(normalizeQuery("naïve")).toBe("naive");
      expect(normalizeQuery("résumé")).toBe("resume");
    });

    it("translit + strip kombiniert", () => {
      expect(normalizeQuery("Zürich Café")).toBe("zuerich cafe");
    });
  });

  describe("normalizeForIndex", () => {
    it("emittiert beide Formen bei Umlauten", () => {
      // "Zürich" → translit "zuerich" + bare-strip "zurich"
      const result = normalizeForIndex("Zürich");
      expect(result).toContain("zuerich");
      expect(result).toContain("zurich");
    });

    it("emittiert nur eine Form ohne Umlaute", () => {
      // "Hello" → translit "hello" === bare-strip "hello"
      expect(normalizeForIndex("Hello")).toBe("hello");
    });

    it("emittiert nur eine Form bei reinen Diakritika", () => {
      // "café" → translit "cafe" === bare-strip "cafe"
      expect(normalizeForIndex("café")).toBe("cafe");
    });
  });

  describe("query → index match", () => {
    // Index: beide Formen ("zuerich" + "zurich"). Jede User-Form muss matchen.
    const index = normalizeForIndex("Zürich");

    it("ueber Umlaut: query 'zürich' matched", () => {
      expect(index).toContain(normalizeQuery("zürich"));
    });

    it("ueber Translit: query 'zuerich' matched", () => {
      expect(index).toContain(normalizeQuery("zuerich"));
    });

    it("ueber Bare-Strip: query 'zurich' matched", () => {
      expect(index).toContain(normalizeQuery("zurich"));
    });
  });
});
