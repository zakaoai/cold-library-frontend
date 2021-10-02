import { AppBar, Hidden, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const MenuDesktop = ({ links }) => {
  const location = useLocation();
  const tabsValue = links.map(link => link.path).find(path => location.pathname.includes(path)) || false;

  return (
    <Hidden smDown>
      <AppBar position="static" style={{ margin: 10 }}>
        <Tabs aria-label="simple tabs example" value={tabsValue}>
          {links.map(link => (
            <Tab key={link.path} label={link.label} component={NavLink} to={link.path} value={link.path} />
          ))}
        </Tabs>
      </AppBar>
    </Hidden>
  );
};

export default MenuDesktop;
