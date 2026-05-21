/**
 * Minimal fetch wrapper with timeout, JSON parsing, and consistent error
 * shape. Centralises network handling so components don't each ship their
 * own try/catch + status checks.
 *
 * Usage:
 *   const data = await http("/api/things");
 *   const data = await http("/api/things", { method: "POST", body: payload });
 */

const DEFAULT_TIMEOUT_MS = 15000;

export class HttpError extends Error {
  constructor(message, { status, body } = {}) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}

export async function http(url, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    timeoutMs = DEFAULT_TIMEOUT_MS,
    signal,
    ...rest
  } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  // Compose external signal with our timeout signal.
  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  const init = {
    method,
    headers: { Accept: "application/json", ...headers },
    signal: controller.signal,
    ...rest,
  };

  if (body !== undefined && body !== null) {
    if (typeof body === "string" || body instanceof FormData) {
      init.body = body;
    } else {
      init.headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(body);
    }
  }

  let response;
  try {
    response = await fetch(url, init);
  } catch (err) {
    clearTimeout(timer);
    if (err.name === "AbortError") {
      throw new HttpError(`Request timed out after ${timeoutMs}ms: ${url}`);
    }
    throw new HttpError(`Network error: ${err.message}`);
  }
  clearTimeout(timer);

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    throw new HttpError(`HTTP ${response.status} from ${url}`, {
      status: response.status,
      body: payload,
    });
  }

  return payload;
}

export default http;
