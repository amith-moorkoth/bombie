import { http, HttpError } from "../http";

const jsonResponse = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

describe("http", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("parses JSON responses", async () => {
    global.fetch.mockResolvedValue(jsonResponse(200, { ok: true }));
    const result = await http("/api/x");
    expect(result).toEqual({ ok: true });
  });

  it("throws HttpError on non-2xx", async () => {
    global.fetch.mockResolvedValue(jsonResponse(500, { message: "boom" }));
    await expect(http("/api/x")).rejects.toBeInstanceOf(HttpError);
    await expect(http("/api/x")).rejects.toMatchObject({ status: 500 });
  });

  it("serializes object bodies as JSON", async () => {
    global.fetch.mockResolvedValue(jsonResponse(200, {}));
    await http("/api/x", { method: "POST", body: { a: 1 } });
    const [, init] = global.fetch.mock.calls[0];
    expect(init.headers["Content-Type"]).toBe("application/json");
    expect(init.body).toBe(JSON.stringify({ a: 1 }));
  });

  it("wraps network errors in HttpError", async () => {
    global.fetch.mockRejectedValue(new TypeError("Failed to fetch"));
    await expect(http("/api/x")).rejects.toBeInstanceOf(HttpError);
  });
});
