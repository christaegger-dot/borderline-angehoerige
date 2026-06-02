import {
  HANDOUT_STANDARD_DISCLAIMER,
  requiresStandardDisclaimer,
} from "../handoutGovernance";
import { createHandoutTextVersionMeta } from "../handoutTextVersionRegistry";
import type {
  HandoutTextVersion,
  HandoutTextVersionContent,
} from "../handoutTextVersionTypes";

function withStandardDisclaimer(id: string, intro: string[]) {
  if (!requiresStandardDisclaimer(id)) {
    return intro;
  }

  if (intro.some(text => text.includes(HANDOUT_STANDARD_DISCLAIMER))) {
    return intro;
  }

  return [...intro, HANDOUT_STANDARD_DISCLAIMER];
}

export function createHandoutTextVersion(
  id: string,
  config: HandoutTextVersionContent
): HandoutTextVersion {
  return {
    ...createHandoutTextVersionMeta(id),
    ...config,
    intro: withStandardDisclaimer(id, config.intro),
  };
}
