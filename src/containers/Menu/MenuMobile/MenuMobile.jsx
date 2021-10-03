import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { NavLink, useLocation } from "react-router-dom";
import { Hidden, IconButton, Tab, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuMobileDrawer from "./MenuMobileDrawer";

const MenuMobile = ({ links }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleClose = () => setOpen(false);

  return (
    <Hidden mdUp>
      <AppBar position="static" style={{ "margin-bottom": 10 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)} size="large">
            <MenuIcon />
          </IconButton>
          {links
            .filter(link => location.pathname.includes(link.path))
            .map(link => (
              <Tab key={link.path} label={link.label} component={NavLink} to={link.path} value={link.path} />
            ))}
        </Toolbar>
      </AppBar>
      <MenuMobileDrawer open={open} links={links} handleClose={handleClose} />
    </Hidden>
  );
};

export default MenuMobile;
