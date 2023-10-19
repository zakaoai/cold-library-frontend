import "@testing-library/jest-dom/vitest";
import { afterAll, beforeAll } from "vitest";
import { server } from "./mocks/server";

beforeAll(() => {
  // Establish requests interception layer before all tests.

  server.listen();
});

afterAll(() => {
  // Clean up after all tests are done, preventing this

  // interception layer from affecting irrelevant tests.

  server.close();
});
