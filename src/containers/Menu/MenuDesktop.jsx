import { AppBar, Hidden, Tab, Tabs } from "@mui/material";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const MenuDesktop = ({ links }) => {
  const location = useLocation();
  const tabsValue = links.map(link => link.path).find(path => location.pathname.includes(path)) || false;

  return (
    <Hidden mdDown>
      <AppBar position="static" style={{ "margin-bottom": 10 }}>
        <Tabs aria-label="simple tabs example" value={tabsValue} indicatorColor="secondary" textColor="inherit">
          {links.map(link => (
            <Tab key={link.path} label={link.label} component={NavLink} to={link.path} value={link.path} />
          ))}
        </Tabs>
      </AppBar>
    </Hidden>
  );
};

export default MenuDesktop;
