import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import { createMaterialDownloadResponse } from "./server/material-download";
import {
  getGeneratedStaticHtmlOutputPath,
  getGeneratedStaticRouteHeadMetadata,
  getStaticHtmlCandidates,
  getStaticRouteHeadMetadata,
  renderStaticRouteHtml,
  STATIC_ROUTE_REDIRECTS,
} from "./shared/staticRouteShells";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

const DEBUG_COLLECTOR_SCRIPT = `(() => {
  if (window.__manusDebugCollectorLoaded) return;
  window.__manusDebugCollectorLoaded = true;

  const queue = {
    consoleLogs: [],
    networkRequests: [],
    sessionEvents: [],
  };

  const serialize = value => {
    if (typeof value === "string") return value;
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  };

  const flush = () => {
    if (
      queue.consoleLogs.length === 0 &&
      queue.networkRequests.length === 0 &&
      queue.sessionEvents.length === 0
    ) {
      return;
    }

    const payload = {
      consoleLogs: queue.consoleLogs.splice(0),
      networkRequests: queue.networkRequests.splice(0),
      sessionEvents: queue.sessionEvents.splice(0),
    };
    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/__manus__/logs",
        new Blob([body], { type: "application/json" })
      );
      return;
    }

    fetch("/__manus__/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  };

  ["log", "warn", "error"].forEach(type => {
    const original = console[type];
    console[type] = (...args) => {
      queue.consoleLogs.push({
        type,
        message: args.map(serialize).join(" "),
        href: location.href,
      });
      flush();
      return original.apply(console, args);
    };
  });

  window.addEventListener("error", event => {
    queue.consoleLogs.push({
      type: "error",
      message: String(event.message),
      href: location.href,
    });
    flush();
  });

  window.addEventListener("unhandledrejection", event => {
    queue.consoleLogs.push({
      type: "error",
      message: serialize(event.reason),
      href: location.href,
    });
    flush();
  });

  window.addEventListener("pagehide", flush);
})();`;

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    // Keep newest lines (from end) that fit within 60% of maxSize
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  // Format entries with timestamps
  const lines = entries.map(entry => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  // Append to log file
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");

  // Trim if exceeds max size
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

function normalizeRequestPath(reqUrl?: string) {
  const pathname = new URL(reqUrl ?? "/", "http://localhost").pathname;
  return pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;
}

function resolveStaticHtmlFile(rootDir: string, pathname: string) {
  for (const candidate of getStaticHtmlCandidates(pathname)) {
    const absoluteFilePath = path.join(rootDir, candidate);
    if (fs.existsSync(absoluteFilePath)) {
      return absoluteFilePath;
    }
  }

  return null;
}

function sendHtml(
  req: { method?: string },
  res: any,
  html: Buffer | string,
  status = 200
) {
  res.writeHead(status, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-cache",
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  res.end(html);
}

function createStaticHtmlRouteMiddleware(
  rootDir: string,
  options: {
    dynamicShellRootDir?: string;
    transformIndexHtml?: (url: string, html: string) => Promise<string>;
  } = {}
) {
  return async (
    req: Parameters<ViteDevServer["middlewares"]["use"]>[1],
    res: any,
    next: (error?: unknown) => void
  ) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      return next();
    }

    const pathname = normalizeRequestPath(req.url);

    const redirect = STATIC_ROUTE_REDIRECTS.find(
      route => route.from === pathname
    );
    if (redirect) {
      res.writeHead(redirect.status, { Location: redirect.to });
      res.end();
      return;
    }

    if (!path.extname(pathname)) {
      const absoluteStaticHtmlFile = resolveStaticHtmlFile(rootDir, pathname);
      if (absoluteStaticHtmlFile) {
        return sendHtml(
          req,
          res,
          fs.readFileSync(absoluteStaticHtmlFile),
          pathname === "/404" ? 404 : 200
        );
      }
    }

    if (!path.extname(pathname) && options.dynamicShellRootDir) {
      const routeMeta = getStaticRouteHeadMetadata(pathname);
      if (routeMeta) {
        try {
          const sourceIndexHtml = fs.readFileSync(
            path.join(options.dynamicShellRootDir, "index.html"),
            "utf8"
          );
          const prerenderedHtml = renderStaticRouteHtml(
            sourceIndexHtml,
            routeMeta
          );
          const transformedHtml = options.transformIndexHtml
            ? await options.transformIndexHtml(
                req.url ?? pathname,
                prerenderedHtml
              )
            : prerenderedHtml;

          return sendHtml(
            req,
            res,
            transformedHtml,
            pathname === "/404" ? 404 : 200
          );
        } catch (error) {
          return next(error);
        }
      }
    }

    if (!path.extname(pathname)) {
      const notFoundHtml = resolveStaticHtmlFile(rootDir, "/404");
      if (notFoundHtml) {
        return sendHtml(req, res, fs.readFileSync(notFoundHtml), 404);
      }
    }

    return next();
  };
}

/**
 * Vite plugin to collect browser debug logs
 * - POST /__manus__/logs: Browser sends logs, written directly to files
 * - Files: browserConsole.log, networkRequests.log, sessionReplay.log
 * - Auto-trimmed when exceeding 1MB (keeps newest entries)
 */
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      server.middlewares.use("/__manus__/debug-collector.js", (req, res) => {
        if (req.method !== "GET") {
          res.writeHead(405, { "Content-Type": "text/plain" });
          res.end("Method Not Allowed");
          return;
        }

        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(DEBUG_COLLECTOR_SCRIPT);
      });

      server.middlewares.use(
        "/api/material-download",
        async (req, res, next) => {
          if (req.method !== "GET") {
            return next();
          }

          const requestUrl = new URL(req.url ?? "/", "http://localhost");
          const id = decodeURIComponent(
            requestUrl.pathname.replace(/^\/+/, "")
          );
          if (!id) {
            return next();
          }

          const disposition =
            requestUrl.searchParams.get("disposition") === "inline"
              ? "inline"
              : "attachment";
          const response = await createMaterialDownloadResponse(
            id,
            disposition
          );
          const headers = Object.fromEntries(response.headers.entries());
          const body = Buffer.from(await response.arrayBuffer());

          res.writeHead(response.status, headers);
          res.end(body);
        }
      );

      // POST /__manus__/logs: Browser sends logs (written directly to files)
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          // Write logs directly to files
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", chunk => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

function vitePluginStaticDirectPages(): Plugin {
  return {
    name: "static-direct-pages",

    configureServer(server) {
      server.middlewares.use(
        createStaticHtmlRouteMiddleware(
          path.join(PROJECT_ROOT, "client", "public"),
          {
            dynamicShellRootDir: path.join(PROJECT_ROOT, "client"),
            transformIndexHtml: (url, html) =>
              server.transformIndexHtml(url, html),
          }
        )
      );
    },

    configurePreviewServer(server) {
      server.middlewares.use(
        createStaticHtmlRouteMiddleware(
          path.join(PROJECT_ROOT, "dist", "public")
        )
      );
    },
  };
}

function vitePluginStaticRouteShells(): Plugin {
  return {
    name: "static-route-shells",

    closeBundle() {
      const outputDir = path.join(PROJECT_ROOT, "dist", "public");
      const baseHtmlPath = path.join(outputDir, "index.html");

      if (!fs.existsSync(baseHtmlPath)) {
        return;
      }

      const baseHtml = fs.readFileSync(baseHtmlPath, "utf8");

      for (const routeMeta of getGeneratedStaticRouteHeadMetadata()) {
        const renderedHtml = renderStaticRouteHtml(baseHtml, routeMeta);
        const outputPath = path.join(
          outputDir,
          getGeneratedStaticHtmlOutputPath(routeMeta.path)
        );

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, renderedHtml, "utf8");
      }
    },
  };
}

export default defineConfig(({ command }) => {
  const isServe = command === "serve";
  const plugins = [
    react(),
    tailwindcss(),
    jsxLocPlugin(),
    vitePluginStaticDirectPages(),
    vitePluginStaticRouteShells(),
  ];

  if (isServe) {
    plugins.push(vitePluginManusRuntime(), vitePluginManusDebugCollector());
  }

  return {
    define: {
      // Inject build date so MEDICAL_LAST_REVIEWED stays current per build
      "import.meta.env.VITE_BUILD_DATE": JSON.stringify(
        new Date().toISOString().slice(0, 10)
      ),
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    envDir: path.resolve(import.meta.dirname),
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            // Animation library – used on many pages but heavy
            "vendor-motion": ["framer-motion"],
            // Root path only needs Radix Slot via Button asChild
            "vendor-radix-slot": ["@radix-ui/react-slot"],
            // Radix UI primitives – shared across components
            "vendor-radix": [
              "@radix-ui/react-accordion",
              "@radix-ui/react-dialog",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-popover",
              "@radix-ui/react-tabs",
              "@radix-ui/react-tooltip",
              "@radix-ui/react-select",
              "@radix-ui/react-scroll-area",
              "@radix-ui/react-separator",
              "@radix-ui/react-toggle",
              "@radix-ui/react-toggle-group",
              "@radix-ui/react-collapsible",
              "@radix-ui/react-label",
              "@radix-ui/react-progress",
              "@radix-ui/react-checkbox",
            ],
            // Utility libraries
            "vendor-utils": [
              "clsx",
              "tailwind-merge",
              "class-variance-authority",
              "wouter",
              "sonner",
            ],
            // Icons – large but tree-shakeable
            "vendor-icons": ["lucide-react"],
          },
        },
      },
    },
    server: {
      port: 3000,
      strictPort: false, // Will find next available port if 3000 is busy
      host: true,
      allowedHosts: [
        ".manuspre.computer",
        ".manus.computer",
        ".manus-asia.computer",
        ".manuscomputer.ai",
        ".manusvm.computer",
        "localhost",
        "127.0.0.1",
      ],
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
