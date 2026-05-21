import * as React from "react";
import { createPortal } from "react-dom";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider, useTheme } from "@mui/material";

/**
 * Renders children inside an isolated <iframe>.
 *
 * Why an iframe (and not just a sized div):
 *   MUI's responsive Grid + sx breakpoints look at the document's *viewport
 *   width*, not the parent container width. A 390px-wide <div> on a 1500px
 *   monitor still triggers MUI's `md` breakpoint, so `xs={12} md={4}` lays
 *   out as desktop. An iframe gets its own viewport, so the same Grid
 *   evaluates breakpoints against the iframe's width — which we set here.
 *
 * Why a dedicated emotion cache:
 *   MUI uses @emotion to inject style tags into a document's <head>. When
 *   we render MUI through a portal into the iframe body, their styles would
 *   default to the *host* document — and the iframe would look unstyled.
 *   Pointing a per-frame emotion cache at the iframe's own <head> keeps
 *   the styles where the rendered DOM lives.
 *
 * The iframe height auto-resizes via ResizeObserver to fit content.
 */
export default function PreviewFrame({ width, minHeight = 480, children }) {
  const iframeRef = React.useRef(null);
  const [doc, setDoc] = React.useState(null);
  const parentTheme = useTheme();

  // Capture iframe.contentDocument as soon as it's ready (about:blank loads
  // synchronously, but Chrome occasionally fires `load` slightly after mount).
  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const capture = () => setDoc(iframe.contentDocument || null);
    if (iframe.contentDocument?.readyState === "complete") {
      capture();
    } else {
      iframe.addEventListener("load", capture);
      return () => iframe.removeEventListener("load", capture);
    }
  }, []);

  // Reset default body margins and let backgrounds show through.
  React.useEffect(() => {
    if (!doc) return;
    doc.body.style.margin = "0";
    doc.body.style.background = "transparent";
    doc.documentElement.lang = "en";
  }, [doc]);

  // Auto-size iframe height to its content. Defer the write via rAF so
  // setting iframe.style.height doesn't reschedule the same ResizeObserver
  // synchronously — browsers warn with "ResizeObserver loop completed with
  // undelivered notifications" when an observer callback mutates layout
  // before the loop drains.
  React.useEffect(() => {
    if (!doc?.body || !iframeRef.current) return;
    let rafId = 0;
    let lastHeight = -1;
    const apply = () => {
      if (!iframeRef.current) return;
      const h = Math.max(doc.body.scrollHeight, minHeight);
      if (h !== lastHeight) {
        lastHeight = h;
        iframeRef.current.style.height = `${h}px`;
      }
    };
    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(apply);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(doc.body);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [doc, minHeight]);

  const cache = React.useMemo(() => {
    if (!doc?.head) return null;
    return createCache({
      key: "preview",
      container: doc.head,
      prepend: true,
    });
  }, [doc]);

  return (
    <iframe
      ref={iframeRef}
      title="Preview"
      style={{
        width,
        minHeight,
        border: 0,
        display: "block",
        background: "transparent",
        transition: "width 280ms ease",
      }}
    >
      {doc?.body &&
        cache &&
        createPortal(
          <CacheProvider value={cache}>
            <ThemeProvider theme={parentTheme}>
              <CssBaseline />
              <div style={{ padding: "32px 24px" }}>{children}</div>
            </ThemeProvider>
          </CacheProvider>,
          doc.body
        )}
    </iframe>
  );
}
