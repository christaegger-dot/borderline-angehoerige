/**
 * PDF/File Download Utility – Open-in-New-Tab Strategy
 *
 * Background: Chrome ignores the `<a download>` attribute on cross-origin URLs
 * (since Chrome v65). The CDN (files.manuscdn.com) does not send CORS headers,
 * so fetch+Blob is also blocked. This utility opens the PDF in a new tab where
 * Chrome's built-in PDF viewer provides its own download button (top-right).
 *
 * Diagnosis (2026-02-07):
 * - CDN: files.manuscdn.com (CloudFront → S3)
 * - No Access-Control-Allow-Origin header on any origin
 * - No Content-Disposition: attachment header
 * - OPTIONS preflight returns 403
 * - fetch() from browser fails with "Failed to fetch" (CORS block)
 *
 * Future fix: Add CORS headers on CDN or proxy through backend.
 */

import { toast } from "sonner";

export function downloadFile(url: string, _filename?: string): void {
  // Open PDF in new tab – Chrome's PDF viewer has a download button
  const newTab = window.open(url, "_blank", "noopener,noreferrer");

  if (newTab) {
    // Success: PDF opens in new tab
    toast.info("PDF wird in neuem Tab geöffnet", {
      description: "Nutzen Sie die Download-Schaltfläche oben rechts im PDF-Viewer.",
      duration: 5000,
    });
  } else {
    // Pop-up was blocked by browser
    toast.warning("Pop-up wurde blockiert", {
      description: "Bitte erlauben Sie Pop-ups für diese Seite und klicken Sie erneut.",
      duration: 7000,
    });
  }
}
