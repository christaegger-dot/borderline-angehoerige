import { forwardRef } from "react";
import { Link } from "wouter";

const HARD_NAVIGATION_PATHS = new Set([
  "/notfall",
  "/notfallkarte",
  "/soforthilfe",
]);
const HARD_NAVIGATION_EXTENSION = /\.(?:html|pdf|webp|png|jpe?g|svg)$/i;
const EXTERNAL_HREF_PATTERN = /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i;

type AppLinkProps = Omit<
  React.ComponentPropsWithoutRef<"a">,
  "className" | "href"
> & {
  href: string;
  className?: string | ((isActive: boolean) => string | undefined);
};

function getPathname(href: string) {
  return href.split(/[?#]/, 1)[0];
}

export function isHardNavigationHref(href: string) {
  if (EXTERNAL_HREF_PATTERN.test(href)) {
    return true;
  }

  const pathname = getPathname(href);

  return (
    HARD_NAVIGATION_PATHS.has(pathname) ||
    HARD_NAVIGATION_EXTENSION.test(pathname)
  );
}

const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(function AppLink(
  { className, href, ...props },
  ref
) {
  if (isHardNavigationHref(href)) {
    return (
      <a
        ref={ref}
        href={href}
        className={
          typeof className === "function" ? className(false) : className
        }
        {...props}
      />
    );
  }

  return <Link ref={ref} href={href} className={className} {...props} />;
});

export default AppLink;
