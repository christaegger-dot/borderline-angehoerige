import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { quellenLinks } from "@/content/quellenLinks";
import Quellen from "@/pages/Quellen";

describe("quellenLinks", () => {
  it("points only to anchor ids that exist on /quellen", () => {
    render(<Quellen />);

    for (const href of Object.values(quellenLinks)) {
      const anchorId = href.split("#")[1];

      expect(anchorId).toBeTruthy();
      expect(document.getElementById(anchorId!)).not.toBeNull();
    }
  });
});
