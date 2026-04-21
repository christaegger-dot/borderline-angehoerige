import DeferredToaster from "@/app/DeferredToaster";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <DeferredToaster />
        <ScrollToTop />
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  );
}
