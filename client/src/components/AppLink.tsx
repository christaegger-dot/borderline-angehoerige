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
  { className, href, onClick, ...props },
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
        onClick={onClick}
      />
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      {...props}
      onClick={event => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          (props.target && props.target !== "_self")
        )
          return;

        const target = new URL(href, window.location.href);
        if (
          !target.hash ||
          target.pathname !== window.location.pathname ||
          target.search !== window.location.search
        )
          return;

        // Wouter observes pathname, so a same-page pushState fragment would
        // neither scroll nor notify the existing ContentSection hash listener.
        // Keep this local: native fragment navigation plus its existing opener.
        event.preventDefault();
        let sectionId = target.hash.slice(1);
        try {
          sectionId = decodeURIComponent(sectionId);
        } catch {
          /* Keep malformed fragments usable without crashing. */
        }
        window.dispatchEvent(
          new CustomEvent("open-section", { detail: { sectionId } })
        );
        if (window.location.hash !== target.hash)
          window.location.hash = target.hash;
        else
          document
            .getElementById(sectionId)
            ?.scrollIntoView?.({ behavior: "auto", block: "start" });
      }}
    />
  );
});

export default AppLink;
