import { cleanup, render, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Router } from "wouter";
import Buchempfehlungen from "@/pages/Buchempfehlungen";

afterEach(cleanup);

describe("Buchempfehlungen content", () => {
  it("separates current recommendations from critically classified books", () => {
    const { container } = render(
      <Router>
        <Buchempfehlungen />
      </Router>
    );

    const currentSection = container.querySelector("#aktuell-empfohlen");
    const criticalSection = container.querySelector("#kritisch-eingeordnet");

    expect(currentSection).not.toBeNull();
    expect(criticalSection).not.toBeNull();
    expect(
      within(currentSection as HTMLElement).getByRole("heading", {
        name: "Aktuell empfohlen",
      })
    ).toBeInTheDocument();
    expect(
      within(criticalSection as HTMLElement).getByRole("heading", {
        name: "Historisch einflussreich oder kritisch einzuordnen",
      })
    ).toBeInTheDocument();

    for (const title of [
      "Schluss mit dem Eiertanz",
      "Ich hasse dich – verlass mich nicht",
      "Die Kunst, mit einem Vulkan zu sprechen",
      "Borderline-Mütter und ihre Kinder",
    ]) {
      expect(
        within(criticalSection as HTMLElement).getByRole("heading", {
          name: title,
        })
      ).toBeInTheDocument();
      expect(
        within(currentSection as HTMLElement).queryByRole("heading", {
          name: title,
        })
      ).not.toBeInTheDocument();
    }
  });

  it("does not offer purchase links for critically classified books", () => {
    const { container } = render(
      <Router>
        <Buchempfehlungen />
      </Router>
    );

    const currentSection = container.querySelector("#aktuell-empfohlen");
    const criticalSection = container.querySelector("#kritisch-eingeordnet");

    expect(
      within(currentSection as HTMLElement).getAllByRole("link", {
        name: "Bei Ex Libris (CH)",
      }).length
    ).toBeGreaterThan(0);
    expect(
      within(criticalSection as HTMLElement).queryByRole("link", {
        name: "Bei Ex Libris (CH)",
      })
    ).not.toBeInTheDocument();
  });
});
