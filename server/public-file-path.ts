import path from "node:path";

/** Resolve a static-file candidate only when it stays inside the public root. */
export function resolvePublicFilePath(
  publicRoot: string,
  relativeFilePath: string
): string | null {
  const absolutePath = path.resolve(publicRoot, relativeFilePath);
  const relativeFromRoot = path.relative(publicRoot, absolutePath);

  if (
    relativeFromRoot === ".." ||
    relativeFromRoot.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativeFromRoot)
  ) {
    return null;
  }

  return absolutePath;
}
