import { render } from "@testing-library/react"
import type { ReactNode } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockEnqueueSnackbar, mockNavigate, QueryClientMock } = vi.hoisted(() => ({
  mockEnqueueSnackbar: vi.fn(),
  mockNavigate: vi.fn(),
  QueryClientMock: vi.fn()
}))

vi.mock("notistack", () => ({
  useSnackbar: () => ({ enqueueSnackbar: mockEnqueueSnackbar })
}))

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>("react-router")

  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-query")>("@tanstack/react-query")

  return {
    ...actual,
    QueryClient: QueryClientMock,
    QueryClientProvider: ({ children }: { children: ReactNode }) => <div>{children}</div>
  }
})

import QueryClientProvider from "../QueryClientProvider"

describe("QueryClientProvider", () => {
  beforeEach(() => {
    QueryClientMock.mockClear()
    mockEnqueueSnackbar.mockClear()
    mockNavigate.mockClear()
  })

  it("creates a query client only once across rerenders", () => {
    const { rerender } = render(
      <QueryClientProvider>
        <div>child</div>
      </QueryClientProvider>
    )

    rerender(
      <QueryClientProvider>
        <div>child</div>
      </QueryClientProvider>
    )

    expect(QueryClientMock).toHaveBeenCalledTimes(1)
  })
})
