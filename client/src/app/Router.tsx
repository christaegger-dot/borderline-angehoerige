import { Suspense, lazy } from "react";
import { Route, Switch, Redirect, useLocation } from "wouter";
import { routes } from "@/app/routes";
import NotFound from "@/pages/NotFound";

const MotionProviders = lazy(() => import("@/app/MotionProviders"));

function PageLoader({ location }: { location: string }) {
  if (location === "/") return null;

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Seite wird geladen…</p>
      </div>
    </div>
  );
}

export default function Router() {
  const [location] = useLocation();
  const currentRoute = routes.find(route => route.path === location);
  const routeContent = (
    <Switch>
      {routes.map(route =>
        route.redirectTo ? (
          <Route key={route.path} path={route.path}>
            {() => <Redirect to={route.redirectTo!} />}
          </Route>
        ) : (
          <Route
            key={route.path}
            path={route.path}
            component={route.component!}
          />
        )
      )}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );

  return (
    <Suspense fallback={<PageLoader location={location} />}>
      {currentRoute?.requiresMotion ? (
        <MotionProviders>{routeContent}</MotionProviders>
      ) : (
        routeContent
      )}
    </Suspense>
  );
}
