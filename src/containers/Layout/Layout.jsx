import Menu from "@/containers/Menu/Menu"
import Container from "@mui/material/Container"
import { Suspense } from "react"

import Auth0ProviderWithNavigate from "@/context/Auth0ProviderWithNavigate"
import { Outlet } from "react-router-dom"
import Footer from "../Footer/Footer"

const Layout = () => (
  <Auth0ProviderWithNavigate>
    <Menu />
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Outlet />
      </Container>
    </Suspense>
    <Footer />
  </Auth0ProviderWithNavigate>
)

export default Layout
