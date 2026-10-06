import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import KommunikationsUebung from "@/components/interactive/KommunikationsUebung";

const scenarioTitles = [
  "«Du bist nie für mich da!»",
  "Ein Zeitpunkt, zwei Vorstellungen",
  "Eigene Bedürfnisse ansprechen",
  "Unterstützung anbieten, Entscheidung lassen",
  "«Niemand nimmt mich ernst!»",
  "Der eigene Kommentar wurde anders verstanden",
];

function getScenario(title = scenarioTitles[0]) {
  return screen.getByRole("article", { name: title });
}

function getChoices(card: HTMLElement) {
  const group = within(card).getByRole("group", {
    name: "Welche Reaktion möchten Sie vergleichen?",
  });
  return within(group).getAllByRole("button");
}

describe("Kommunikationsübung: Perspektivenvergleich", () => {
  it("bietet sechs Szenarien mit je drei unbewerteten, bedienbaren Reaktionen", () => {
    render(<KommunikationsUebung />);

    expect(screen.getAllByRole("article")).toHaveLength(6);
    for (const title of scenarioTitles) {
      const card = getScenario(title);
      const choices = getChoices(card);
      expect(choices).toHaveLength(3);
      for (const choice of choices) {
        expect(choice).toBeEnabled();
        expect(choice).toHaveAttribute("aria-pressed", "false");
      }
      expect(within(card).queryByRole("region")).not.toBeInTheDocument();
      expect(within(card).getByRole("status")).toBeEmptyDOMElement();
    }
    expect(
      screen.queryByRole("button", { name: "Vergleich zurücksetzen" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/bevorzugte Alternative/i)
    ).not.toBeInTheDocument();
  });

  it.each(scenarioTitles)(
    "lässt in «%s» alle drei Reaktionen unmittelbar vergleichen",
    title => {
      render(<KommunikationsUebung />);
      const card = getScenario(title);
      const choices = getChoices(card);
      const status = within(card).getByRole("status");

      choices.forEach((choice, index) => {
        fireEvent.click(choice);
        const letter = String.fromCharCode(65 + index);
        const detail = within(card).getByRole("region", {
          name: `Perspektiven zur Reaktion ${letter}`,
        });
        expect(choice).toHaveAttribute("aria-pressed", "true");
        expect(choice).toHaveFocus();
        for (const other of choices.filter(item => item !== choice)) {
          expect(other).toHaveAttribute("aria-pressed", "false");
          expect(other).toBeEnabled();
        }
        for (const label of [
          "Mögliche Wirkung",
          "Voraussetzungen",
          "Eigene Grenze",
          "Andere Perspektive",
        ]) {
          const term = within(detail).getByText(label, { exact: true });
          expect(term.tagName).toBe("DT");
          expect(term.nextElementSibling?.textContent?.trim()).toBeTruthy();
        }
        expect(choice.contains(detail)).toBe(false);
        expect(status).toHaveTextContent(
          `Reaktion ${letter} angezeigt: ${title}`
        );
        expect(within(card).getByRole("status")).toBe(status);
        expect(
          screen.queryByText(/bevorzugte Alternative/i)
        ).not.toBeInTheDocument();
      });
    }
  );

  it("kündigt Änderungen in einer dauerhaften, kurzen höflichen Statusregion an", () => {
    render(<KommunikationsUebung />);
    const card = getScenario();
    const status = within(card).getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveAttribute("aria-atomic", "true");

    fireEvent.click(getChoices(card)[0]);
    expect(status).toHaveTextContent("Reaktion A angezeigt");
    expect(status).not.toHaveTextContent("Voraussetzungen");
    fireEvent.click(getChoices(card)[1]);
    expect(status).toHaveTextContent("Reaktion B angezeigt");
    expect(status).not.toHaveTextContent("Reaktion A angezeigt");
  });

  it("setzt nur den Vergleich zurück und stellt den Fokus auf die zuletzt gewählte Reaktion", () => {
    render(<KommunikationsUebung />);
    const card = getScenario();
    const choices = getChoices(card);
    const status = within(card).getByRole("status");
    fireEvent.click(choices[2]);
    const reset = within(card).getByRole("button", {
      name: "Vergleich zurücksetzen",
    });
    reset.focus();
    fireEvent.click(reset);

    expect(choices[2]).toHaveFocus();
    for (const choice of choices) {
      expect(choice).toBeEnabled();
      expect(choice).toHaveAttribute("aria-pressed", "false");
    }
    expect(within(card).queryByRole("region")).not.toBeInTheDocument();
    expect(within(card).getByRole("status")).toBe(status);
    expect(status).toHaveTextContent("Vergleich zurückgesetzt");
    expect(reset).not.toBeInTheDocument();

    fireEvent.click(choices[0]);
    expect(choices[0]).toHaveFocus();
    expect(status).toHaveTextContent("Reaktion A angezeigt");
    expect(
      within(card).getByRole("region", { name: "Perspektiven zur Reaktion A" })
    ).toBeInTheDocument();
  });

  it("hält Auswahl, Status und Reset verschiedener Szenarien unabhängig", () => {
    render(<KommunikationsUebung />);
    const first = getScenario(scenarioTitles[0]);
    const second = getScenario(scenarioTitles[1]);
    const firstChoice = getChoices(first)[0];
    const secondChoice = getChoices(second)[1];
    fireEvent.click(firstChoice);
    fireEvent.click(secondChoice);
    fireEvent.click(
      within(second).getByRole("button", { name: "Vergleich zurücksetzen" })
    );

    expect(secondChoice).toHaveFocus();
    expect(firstChoice).toHaveAttribute("aria-pressed", "true");
    expect(
      within(first).getByRole("region", { name: "Perspektiven zur Reaktion A" })
    ).toBeInTheDocument();
    expect(within(first).getByRole("status")).toHaveTextContent(
      "Reaktion A angezeigt"
    );
    expect(within(second).getByRole("status")).toHaveTextContent(
      "Vergleich zurückgesetzt"
    );
  });

  it("verknüpft beschriftete Szenarien, Auswahlgruppen und separate Erklärungsbereiche eindeutig", () => {
    const { container } = render(<KommunikationsUebung />);
    const ids = [...container.querySelectorAll("[id]")].map(item => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const card of screen.getAllByRole("article")) {
      const title = document.getElementById(
        card.getAttribute("aria-labelledby")!
      );
      expect(title?.tagName).toBe("H3");
      expect(card.contains(title)).toBe(true);
      const group = within(card).getByRole("group");
      for (const id of group.getAttribute("aria-describedby")!.split(" ")) {
        expect(card.contains(document.getElementById(id))).toBe(true);
      }
      for (const choice of getChoices(card)) {
        const detail = document.getElementById(
          choice.getAttribute("aria-controls")!
        );
        expect(detail?.tagName).toBe("SECTION");
        expect(card.contains(detail)).toBe(true);
        expect(choice.contains(detail)).toBe(false);
      }
    }
  });

  it("unterscheidet auch bei mehreren Instanzen die Auswahl- und Erklärungsbeziehungen", () => {
    const { container } = render(
      <>
        <KommunikationsUebung />
        <KommunikationsUebung />
      </>
    );
    const ids = [...container.querySelectorAll("[id]")].map(item => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("kennzeichnet didaktischen Entwurf, offene menschliche Prüfungen und einen zentralen Hilfeweg", () => {
    render(<KommunikationsUebung />);
    expect(screen.getByText("Redaktioneller Entwurf.")).toBeInTheDocument();
    expect(
      screen.getByText(/fachliche Prüfung sowie unabhängige Rückmeldungen/i)
    ).toHaveTextContent("stehen aus");
    expect(
      screen.getByText(/Reale VoiceOver- und NVDA-Prüfungen/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/eigene didaktische Ableitungen/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/kein auf Wirksamkeit geprüftes Übungsprogramm/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Sprecherposition wechselt/i)).toBeInTheDocument();
    expect(screen.getByText(/Alle Beteiligten dürfen/i)).toHaveTextContent(
      "Verantwortung für eigenes verletzendes Verhalten übernehmen"
    );
    expect(
      screen.getByRole("link", { name: "Akute Hilfe und Notfallkontakte" })
    ).toHaveAttribute("href", "/soforthilfe");
    expect(
      screen
        .getAllByRole("link")
        .filter(link => link.getAttribute("href") === "/soforthilfe")
    ).toHaveLength(1);
    expect(
      screen.queryByRole("link", { name: /^Telefon / })
    ).not.toBeInTheDocument();
  });

  it("ordnet die eigene Erfahrung als mögliche Verbindung oder Fokusverschiebung ein", () => {
    render(<KommunikationsUebung />);
    const card = getScenario("«Niemand nimmt mich ernst!»");
    const choice = within(card).getByRole("button", {
      name: /Ich kenne eine ähnliche Erfahrung/i,
    });
    fireEvent.click(choice);
    const detail = within(card).getByRole("region", {
      name: "Perspektiven zur Reaktion C",
    });
    expect(
      within(detail).getByText(/Eine eigene Erfahrung kann verbinden/i)
    ).toBeInTheDocument();
    expect(
      within(detail).getByText(
        /verbindend anfühlen oder den Fokus verschieben/i
      )
    ).toBeInTheDocument();
    expect(
      within(detail).getByText(
        /ein Lösungsvorschlag ist nicht automatisch falsch/i
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/fühlt sich dadurch erneut nicht gehört/i)
    ).not.toBeInTheDocument();
    expect(choice).toHaveAttribute("aria-pressed", "true");
  });
});
