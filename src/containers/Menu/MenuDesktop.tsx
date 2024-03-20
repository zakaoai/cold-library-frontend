import AppBar from "@mui/material/AppBar"
import Paper from "@mui/material/Paper"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Toolbar from "@mui/material/Toolbar"

import { NavLink, useLocation } from "react-router-dom"

import IconButton from "@mui/material/IconButton"

import Auth0AccountMenu from "@/components/Auth0Button/Auth0AccountMenu"

import { useColorModeContext } from "@/hooks/context/useColorModeContext"
import Menu from "@/interfaces/containers/Menu/Menu"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { useTheme } from "@mui/material/styles"

const MenuDesktop = ({ links }: Menu) => {
  const location = useLocation()
  const tabsValue = links.map(link => link.path).find(path => location.pathname.includes(path)) || false
  const theme = useTheme()
  const { toggleColorMode } = useColorModeContext()

  return (
    <Paper sx={{ display: { xs: "none", md: "block", marginBottom: "10px" } }}>
      <AppBar position="static">
        <Toolbar>
          <Tabs value={tabsValue} indicatorColor="secondary" textColor="inherit" sx={{ flexGrow: 1 }}>
            {links.map(link => (
              <Tab key={link.path} label={link.label} component={NavLink} to={link.path} value={link.path} />
            ))}
          </Tabs>
          <IconButton onClick={toggleColorMode}>
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Auth0AccountMenu />
        </Toolbar>
      </AppBar>
    </Paper>
  )
}

export default MenuDesktop
