export default function TopicQuickLinks({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <nav
      aria-label="Direkt zur Hilfe auf dieser Seite"
      className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-base"
    >
      {items.map(item => (
        <a
          key={item.href}
          href={item.href}
          className="editorial-link inline-flex min-h-11 items-center"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("open-section", {
                detail: { sectionId: item.href.slice(1) },
              })
            )
          }
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
