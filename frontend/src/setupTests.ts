// Adds matchers like toBeInTheDocument() and toHaveValue() to Vitest's expect.
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Remove what a test rendered before the next one starts.
afterEach(() => {
  cleanup();
});
