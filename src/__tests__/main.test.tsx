import App from "@/App"
import { render } from "@testing-library/react"

import { describe, test } from "vitest"

describe("App component", () => {
  test("Should render", () => {
    render(<App />)
  })
})
