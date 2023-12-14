import Auth0ProviderWithNavigate from "@/context/Auth0ProviderWithNavigate"
import QueryClientProvider from "@/context/QueryClientContext.tsx"
import { Outlet } from "react-router-dom"

const ContextLayout = () => (
  <QueryClientProvider>
    <Auth0ProviderWithNavigate>
      <Outlet />
    </Auth0ProviderWithNavigate>
  </QueryClientProvider>
)

export default ContextLayout
