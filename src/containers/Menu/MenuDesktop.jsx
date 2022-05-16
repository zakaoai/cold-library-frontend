import { AppBar, Hidden, Tab, Tabs } from "@mui/material";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import IconButton from "@mui/material/IconButton";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "context/ColorModeContext";

const MenuDesktop = ({ links }) => {
  const location = useLocation();
  const tabsValue = links.map(link => link.path).find(path => location.pathname.includes(path)) || false;
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <Hidden mdDown>
      <AppBar position="static" style={{ marginBottom: 10 }}>
        <Tabs aria-label="simple tabs example" value={tabsValue} indicatorColor="secondary" textColor="inherit">
          {links.map(link => (
            <Tab key={link.path} label={link.label} component={NavLink} to={link.path} value={link.path} />
          ))}
        </Tabs>
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </AppBar>
    </Hidden>
  );
};

export default MenuDesktop;
