import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import AppLink from "@/components/AppLink";
import { AlertCircle, Home } from "@/icons/root-icons";

export default function NotFound() {
  return (
    <Layout>
      <SEO
        title="Seite nicht gefunden"
        description="Die gesuchte Seite existiert leider nicht."
        path="/404"
        robots="noindex, nofollow"
      />
      <div className="container flex min-h-[70vh] items-center justify-center py-16">
        <section
          className="w-full max-w-[38rem] border-t pt-8"
          style={{ borderColor: "var(--rule-color)" }}
        >
          <div className="flex justify-center sm:justify-start">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border/60 bg-background">
              <AlertCircle className="h-8 w-8 text-[color:var(--accent-primary)]" />
            </div>
          </div>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-label)]">
            404
          </p>

          <h1
            className="mt-3 font-display text-4xl text-foreground sm:text-5xl"
            style={{ fontWeight: "var(--weight-display)" }}
          >
            Seite nicht gefunden
          </h1>

          <p className="mt-4 max-w-[32rem] text-base leading-relaxed text-muted-foreground sm:text-lg">
            Die gesuchte Seite existiert leider nicht. Sie wurde möglicherweise
            verschoben oder gelöscht.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppLink
              href="/"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border/70 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)]/30 focus-visible:ring-offset-2"
            >
              <Home className="h-4 w-4" />
              Zur Startseite
            </AppLink>
            <AppLink
              href="/wegweiser"
              className="editorial-link inline-flex min-h-11 items-center justify-center"
            >
              Zum Wegweiser
            </AppLink>
          </div>
        </section>
      </div>
    </Layout>
  );
}
