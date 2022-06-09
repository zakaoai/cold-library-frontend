import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { useLocation } from "react-router-dom";
import { Box, Hidden, IconButton, Tab, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "context/ColorModeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuMobileDrawer from "./MenuMobileDrawer";

const MenuMobile = ({ links }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleClose = () => setOpen(false);

  return (
    <Hidden mdUp>
      <AppBar position="static" style={{ marginBottom: 10 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)} size="large">
            <MenuIcon />
          </IconButton>
          {links
            .filter(link => location.pathname.includes(link.path))
            .map(link => (
              <Tab key={link.path} label={link.label} />
            ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
            <IconButton onClick={toggleColorMode} color="inherit">
              {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <MenuMobileDrawer open={open} links={links} handleClose={handleClose} />
    </Hidden>
  );
};

export default MenuMobile;
