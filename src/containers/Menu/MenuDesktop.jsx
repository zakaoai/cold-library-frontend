import { AppBar, Paper, Tab, Tabs, Toolbar } from "@mui/material"

import { NavLink, useLocation } from "react-router-dom"

import IconButton from "@mui/material/IconButton"

import { useColorMode } from "@/context/ColorModeContext"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { useTheme } from "@mui/material/styles"

const MenuDesktop = ({ links }) => {
  const location = useLocation()
  const tabsValue = links.map(link => link.path).find(path => location.pathname.includes(path)) || false
  const theme = useTheme()
  const { toggleColorMode } = useColorMode()

  return (
    <Paper sx={{ display: { xs: "none", md: "block", marginBottom: "10px" } }}>
      <AppBar position="static">
        <Toolbar>
          <Tabs
            aria-label="simple tabs example"
            value={tabsValue}
            indicatorColor="secondary"
            textColor="inherit"
            sx={{ flexGrow: 1 }}>
            {links.map(link => (
              <Tab key={link.path} label={link.label} component={NavLink} to={link.path} value={link.path} />
            ))}
          </Tabs>
          <IconButton onClick={toggleColorMode}>
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Paper>
  )
}

export default MenuDesktop
