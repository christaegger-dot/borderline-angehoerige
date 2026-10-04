import { describe, expect, it } from "vitest";
import { handoutTextVersions as kommunizierenTextVersions } from "@/content/handoutTextVersionContent/kommunizieren.content";
import { materials } from "@/content/materialien";

function handoutCopy(id: string): string {
  const handout = kommunizierenTextVersions.find(item => item.id === id);
  expect(handout, id).toBeTruthy();
  return JSON.stringify(handout);
}

describe("redaktionelle Anti-Stigma-Korrekturen", () => {
  it("trennt pauschale Schuldzuweisung von konkreter Verantwortung und Entschuldigung", () => {
    const copy = handoutCopy("zuhoeren-ohne-zustimmen");

    expect(copy).toContain(
      "Wenn Sie selbst etwas Verletzendes gesagt oder getan haben, können Sie dafür Verantwortung übernehmen und sich entschuldigen."
    );
    expect(copy).toContain(
      "Das bedeutet nicht, für die Erkrankung oder Genesung der anderen Person verantwortlich zu sein."
    );
    expect(copy).toContain("Pauschale Schuld nicht übernehmen");
    expect(copy).toContain(
      "Das Gefühl ist real; die Deutung müssen Sie nicht teilen."
    );
    expect(copy).not.toContain("Ja, ich hätte anders reagieren sollen.");
    expect(copy).not.toContain("die Interpretation muss nicht stimmen");
  });

  it("macht die Gesprächsfortsetzung auch in einer stabilen Situation freiwillig", () => {
    const copy = handoutCopy("pause-statt-streit");

    expect(copy).toContain(
      "Wenn beide Seiten möchten, können Sie das Gespräch fortsetzen."
    );
    expect(copy).toContain(
      "Sie dürfen auch eine Pause machen oder es beenden, bevor es eskaliert."
    );
    expect(copy).toContain(
      "«Ich brauche jetzt eine Pause und unterbreche das Gespräch.»"
    );
    expect(copy).toContain(
      "Ich darf ein Gespräch unterbrechen oder beenden, wenn ich eine Pause oder Abstand brauche."
    );
    expect(copy).not.toContain("Bleiben Sie im Gespräch.");
    expect(copy).not.toContain("weil mir diese Beziehung wichtig ist");
  });

  it("ordnet Langzeitdaten ein, ohne einen individuellen Verlauf vorherzusagen", () => {
    const material = materials.find(item => item.id === "genesung-zahlen");

    expect(material?.description).toBe(
      "Langfristige Studien zeigen Möglichkeiten der Besserung. Der individuelle Verlauf lässt sich daraus nicht vorhersagen."
    );
    expect(material?.description).not.toMatch(/selten linear/i);
  });
});
