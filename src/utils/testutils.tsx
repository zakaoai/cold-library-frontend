import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import { type ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"

const queryClient = new QueryClient()

export const renderWrapperContext = (node: ReactNode) => {
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{node}</QueryClientProvider>
    </BrowserRouter>
  )
}
