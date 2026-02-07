import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[oklch(0.98_0.01_85)] to-[oklch(0.95_0.02_145)]">
      <Card className="w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[oklch(0.92_0.05_145)] rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-[oklch(0.55_0.10_145)]" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>

          <h2 className="text-xl font-semibold text-foreground mb-4">
            Seite nicht gefunden
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            Die gesuchte Seite existiert leider nicht.
            <br />
            Sie wurde möglicherweise verschoben oder gelöscht.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-[oklch(0.55_0.10_145)] hover:bg-[oklch(0.45_0.12_145)] text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Zur Startseite
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
