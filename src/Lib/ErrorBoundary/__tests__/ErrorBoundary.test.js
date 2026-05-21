import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "../index";

function Boom() {
  throw new Error("kaboom");
}

describe("ErrorBoundary", () => {
  // Silence the React error log noise these tests intentionally produce.
  let originalError;
  beforeAll(() => {
    originalError = console.error;
    console.error = () => {};
  });
  afterAll(() => {
    console.error = originalError;
  });

  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <div>safe content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("safe content")).toBeInTheDocument();
  });

  it("renders fallback UI on error and exposes a try-again button", () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });

  it("calls onError when a child throws", () => {
    const onError = jest.fn();
    render(
      <ErrorBoundary onError={onError}>
        <Boom />
      </ErrorBoundary>
    );
    expect(onError).toHaveBeenCalled();
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
  });
});
