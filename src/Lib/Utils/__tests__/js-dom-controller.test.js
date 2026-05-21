import { updateToState, getFromState } from "../js-dom-controller";

describe("updateToState", () => {
  it("sets a top-level key on a copy", () => {
    const input = { a: 1 };
    const out = updateToState(input, "a", 2);
    expect(out).toEqual({ a: 2 });
    expect(input).toEqual({ a: 1 }); // input not mutated
  });

  it("sets a nested key, creating intermediate objects", () => {
    const out = updateToState({}, "foo.bar.baz", "value");
    expect(out).toEqual({ foo: { bar: { baz: "value" } } });
  });

  it("overwrites existing nested values", () => {
    const out = updateToState({ foo: { bar: "old" } }, "foo.bar", "new");
    expect(out).toEqual({ foo: { bar: "new" } });
  });
});

describe("getFromState", () => {
  it("reads a top-level value", () => {
    expect(getFromState({ name: "Ada" }, "name")).toBe("Ada");
  });

  it("reads a nested value via dot path", () => {
    expect(getFromState({ a: { b: { c: 42 } } }, "a.b.c")).toBe(42);
  });

  it("returns undefined for a missing leaf", () => {
    expect(getFromState({ a: {} }, "a.b")).toBeUndefined();
  });
});
