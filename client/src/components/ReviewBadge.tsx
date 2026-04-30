import { pageGovernance } from "@/data/pageGovernance";

export default function ReviewBadge({ path }: { path: string }) {
  const meta = pageGovernance[path];

  if (!meta) return null;

  return (
    <div className="mt-4 text-sm" style={{ color: "var(--fg-tertiary)" }}>
      {meta.lastReviewed ? (
        <>Fachlich geprüft am: {meta.lastReviewed}</>
      ) : (
        <>Noch kein Reviewdatum gesetzt</>
      )}
    </div>
  );
}
