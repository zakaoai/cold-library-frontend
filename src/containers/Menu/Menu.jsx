import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { NavLink, useLocation } from "react-router-dom";

/**
 * Menu de l'application
 */
function Menu() {
  const location = useLocation();

  const links = [
    {
      path: "/app/home",
      label: "Item One"
    },
    {
      path: "/app/other",
      label: "Item Two"
    },
    {
      path: "/app/two",
      label: "Item Three"
    }
  ];

  return (
    <AppBar position="static">
      <Tabs aria-label="simple tabs example" value={location.pathname}>
        {links.map(link => (
          <Tab key={link.path} label={link.label} component={NavLink} to={link.path} value={link.path} />
        ))}
      </Tabs>
    </AppBar>
  );
}

export default Menu;
