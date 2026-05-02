import { createHandoutTextVersionMeta } from "../handoutTextVersionRegistry";
import type {
  HandoutTextVersion,
  HandoutTextVersionContent,
} from "../handoutTextVersionTypes";

export function createHandoutTextVersion(
  id: string,
  config: HandoutTextVersionContent
): HandoutTextVersion {
  return {
    ...createHandoutTextVersionMeta(id),
    ...config,
  };
}
