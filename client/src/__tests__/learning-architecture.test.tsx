import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Router, useLocation } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { routes } from "@/app/routes";
import LearningPath, {
  LearningExtensionNav,
  LearningGoal,
  LearningMaterials,
  LearningPathNav,
  ModelCatalogue,
} from "@/components/LearningPath";
import { getHandoutTextVersionMeta } from "@/content/handoutTextMetas";
import { getHandoutApprovalStatus } from "@/content/handoutGovernance";
import {
  canonicalTopics,
  getLearningStep,
  getLearningTransition,
  learningExtensions,
  learningModels,
  learningSteps,
} from "@/content/learningArchitecture";
import { primaryNavigationItems } from "@/domain/navigation";

afterEach(cleanup);

function LearningNavigationFixture() {
  const [location] = useLocation();
  return (
    <>
      <LearningGoal path={location} />
      <LearningPathNav path={location} />
    </>
  );
}

describe("canonical learning architecture", () => {
  it("keeps primary navigation, overview and registered pages in the same ordered path", () => {
    const paths = learningSteps.map(step => step.href);
    expect(paths).toEqual([
      "/",
      "/verstehen",
      "/unterstuetzen/uebersicht",
      "/kommunizieren",
      "/grenzen",
      "/selbstfuersorge",
      "/genesung",
      "/materialien",
    ]);
    expect(new Set(paths).size).toBe(paths.length);
    expect(primaryNavigationItems.map(item => item.href)).toEqual(
      learningSteps.filter(step => step.navigationLabel).map(step => step.href)
    );
    for (const step of learningSteps) {
      expect(
        routes.find(route => route.path === step.href)?.component
      ).toBeDefined();
      expect(step.purpose).not.toBe("");
      expect(step.goal).not.toBe("");
      for (const id of step.canonicalTopics)
        expect(canonicalTopics.some(topic => topic.id === id)).toBe(true);
      if (step.baseModelId)
        expect(
          learningModels.some(
            model => model.id === step.baseModelId && model.role === "basis"
          )
        ).toBe(true);
    }
    render(<LearningPath />);
    const overview = screen.getByRole("navigation", {
      name: "Lernweg im Überblick",
    });
    expect(
      within(overview)
        .getAllByRole("link")
        .map(link => link.getAttribute("href"))
    ).toEqual(paths);
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
  });

  it("traverses every forward and back link through the real Wouter location hook", () => {
    const memory = memoryLocation({ path: "/", record: true });
    render(
      <Router hook={memory.hook}>
        <LearningNavigationFixture />
      </Router>
    );
    for (const [index, step] of learningSteps.entries()) {
      const nav = screen.getByRole("navigation", {
        name: "Im Lernweg weitergehen",
      });
      expect(nav).toHaveTextContent(
        `Schritt ${index + 1} von ${learningSteps.length}`
      );
      expect(
        screen.getByRole("region", { name: "Ziel dieser Seite" })
      ).toHaveTextContent(step.goal);
      expect(
        within(nav).getByRole("link", {
          name: "Akute Hilfe und Notfallkontakte",
        })
      ).toHaveAttribute("href", "/soforthilfe");
      if (index < learningSteps.length - 1)
        fireEvent.click(
          within(nav).getByRole("link", {
            name: `Weiter: ${learningSteps[index + 1].title}`,
          })
        );
      else
        expect(
          within(nav).queryByRole("link", { name: /^Weiter:/ })
        ).not.toBeInTheDocument();
    }
    for (let index = learningSteps.length - 1; index > 0; index--) {
      fireEvent.click(
        screen.getByRole("link", {
          name: `Zurück: ${learningSteps[index - 1].title}`,
        })
      );
    }
    expect(memory.history).toEqual([
      ...learningSteps.map(step => step.href),
      ...learningSteps
        .slice(0, -1)
        .reverse()
        .map(step => step.href),
    ]);
    expect(
      screen.queryByRole("link", { name: /^Zurück:/ })
    ).not.toBeInTheDocument();
    expect(getLearningStep("/genesung#remission")?.id).toBe("genesung");
    expect(getLearningTransition("/soforthilfe")).toBeNull();
  });

  it("returns optional extensions to their canonical step instead of making crisis a compulsory stage", () => {
    for (const extension of learningExtensions) {
      expect(
        routes.find(route => route.path === extension.href)?.component
      ).toBeDefined();
      expect(getLearningStep(extension.parentHref)).toBeDefined();
      const { unmount } = render(
        <LearningExtensionNav path={extension.href} />
      );
      const nav = screen.getByRole("navigation", {
        name: "Von der Vertiefung zum Lernweg",
      });
      expect(
        within(nav).getByRole("link", { name: /^Zurück zum Lernschritt:/ })
      ).toHaveAttribute("href", extension.parentHref);
      expect(
        within(nav).getByRole("link", { name: /^Weiter im Lernweg:/ })
      ).toHaveAttribute(
        "href",
        getLearningTransition(extension.parentHref)!.next!.href
      );
      unmount();
    }
    expect(
      learningSteps.some(
        step =>
          step.href === "/soforthilfe" || step.href === "/unterstuetzen/krise"
      )
    ).toBe(false);
  });

  it("curates existing Web texts and retains visible draft status without publishing PDFs", () => {
    render(<LearningMaterials />);
    const list = screen.getByRole("heading", {
      name: "Materialien entlang des Lernwegs",
    }).parentElement!;
    const curated = learningSteps.flatMap(step => step.materials);
    for (const material of curated) {
      const meta = getHandoutTextVersionMeta(material.id);
      expect(meta, material.id).not.toBeNull();
      const link = within(list).getByRole("link", {
        name: `${meta!.title} – Webtext lesen`,
      });
      expect(link).toHaveAttribute("href", meta!.path);
      if (
        getHandoutApprovalStatus(material.id) ===
        "draft-editorial-review-pending"
      )
        expect(link.parentElement).toHaveTextContent(
          "Redaktioneller Entwurf · Prüfung ausstehend"
        );
    }
    expect(
      list.querySelectorAll(
        'a[href$=".pdf"], a[href^="/api/material-download"]'
      )
    ).toHaveLength(0);
  });

  it("renders every model classification, limitation and canonical explanation without claiming review approval", () => {
    render(<ModelCatalogue />);
    expect(new Set(learningModels.map(model => model.id)).size).toBe(
      learningModels.length
    );
    for (const model of learningModels) {
      const entry = document.getElementById(`modell-${model.id}`)!;
      expect(entry).not.toBeNull();
      expect(entry).toHaveTextContent(model.limitation);
      expect(entry).toHaveTextContent(
        "Fachliche Prüfung des aktuellen Katalogeintrags: offen."
      );
      expect(model.clinicalReview).toBe("unknown");
      expect(
        within(entry).getByRole("link", {
          name: `Erklärung lesen: ${model.title}`,
        })
      ).toHaveAttribute("href", model.explanationHref);
      const path = model.explanationHref.split("#")[0];
      if (path.startsWith("/materialien/text/"))
        expect(
          getHandoutTextVersionMeta(path.split("/").at(-1))
        ).not.toBeNull();
      else
        expect(
          routes.find(route => route.path === path)?.component
        ).toBeDefined();
      expect(model.sources.length).toBeGreaterThan(0);
    }
  });
});
