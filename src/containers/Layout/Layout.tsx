import Menu from "@/containers/Menu/Menu"
import Container from "@mui/material/Container"
import { Suspense } from "react"

import { Outlet } from "react-router-dom"
import Footer from "../Footer/Footer"

const Layout = () => (
  <>
    <Menu />
    <Suspense fallback={<div>Loading...</div>}>
      <Container disableGutters>
        <Outlet />
      </Container>
    </Suspense>
    <Footer />
  </>
)

export default Layout
