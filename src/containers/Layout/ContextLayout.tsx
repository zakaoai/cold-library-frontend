import Auth0ProviderWithNavigate from "@/context/Auth0ProviderWithNavigate"
import QueryClientProvider from "@/context/QueryClientContext.tsx"
import { headers } from "@/services/request/request"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const AuthenticateOutlet = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    if (!isLoading && isAuthenticated)
      void getAccessTokenSilently().then(token => {
        headers.push(["Authorization", `Bearer ${token}`])
      })
  }, [getAccessTokenSilently, isAuthenticated, isLoading])

  return <Outlet />
}

const ContextLayout = () => (
  <QueryClientProvider>
    <Auth0ProviderWithNavigate>
      <AuthenticateOutlet />
    </Auth0ProviderWithNavigate>
  </QueryClientProvider>
)

export default ContextLayout
