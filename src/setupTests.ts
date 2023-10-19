import matchers from "@testing-library/jest-dom/matchers";
import { afterAll, beforeAll, expect } from "vitest";
import { server } from "./mocks/server";
//expect.extend(matchers);

beforeAll(() => {
  // Establish requests interception layer before all tests.

  server.listen();
});

afterAll(() => {
  // Clean up after all tests are done, preventing this

  // interception layer from affecting irrelevant tests.

  server.close();
});
