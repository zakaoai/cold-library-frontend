import Auth0AccountMenu from "@/components/Auth0Button/Auth0AccountMenu"
import { useColorModeContext } from "@/hooks/context/useColorModeContext"
import type Menu from "@/interfaces/containers/Menu/Menu"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router"
import MenuMobileDrawer from "./MenuMobileDrawer"

const MenuMobile = ({ links }: Menu) => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const theme = useTheme()
  const { toggleColorMode } = useColorModeContext()
  const drawerTitleFlexGrow = 1
  const previousPathnameRef = useRef(location.pathname)

  useEffect(() => {
    if (previousPathnameRef.current === location.pathname) {
      return
    }

    previousPathnameRef.current = location.pathname
    setOpen(false)
  }, [location.pathname])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Paper sx={{ display: { xs: "block", md: "none", marginBottom: "10px" } }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              setOpen(true)
            }}
            size="large">
            <MenuIcon />
          </IconButton>
          {links
            .filter(link => new RegExp(link.path, "v").test(location.pathname))
            .map(link => (
              <Typography key={link.label} variant="h6" component="div" sx={{ flexGrow: drawerTitleFlexGrow }}>
                {link.label}
              </Typography>
            ))}
          <IconButton onClick={toggleColorMode}>
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Auth0AccountMenu />
        </Toolbar>
      </AppBar>
      <MenuMobileDrawer open={open} links={links} handleClose={handleClose} />
    </Paper>
  )
}

export default MenuMobile
