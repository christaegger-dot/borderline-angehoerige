/** Keep the incoming query before a configured redirect's fragment. */
export function getRedirectLocation(
  target: string,
  requestUrl: string
): string {
  const queryStart = requestUrl.indexOf("?");
  if (queryStart < 0) return target;

  const location = new URL(target, "http://localhost");
  location.search = requestUrl.slice(queryStart + 1);
  return `${location.pathname}${location.search}${location.hash}`;
}
