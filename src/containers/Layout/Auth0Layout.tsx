import Auth0ProviderWithNavigate from "@/context/Auth0ProviderWithNavigate"
import { Outlet } from "react-router-dom"

const Auth0Layout = () => (
  <Auth0ProviderWithNavigate>
    <Outlet />
  </Auth0ProviderWithNavigate>
)

export default Auth0Layout
