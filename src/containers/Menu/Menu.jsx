import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { NavLink, useLocation } from "react-router-dom";
import SiteMap from "~/routes/SiteMap";

/**
 * Menu de l'application
 */
function Menu() {
  const location = useLocation();

  const links = [SiteMap.ACCUEIL, SiteMap.RECHERCHE, SiteMap.LIBRAIRIE, SiteMap.TORRENT];

  const tabsValue = links.some(link => link.path === location.pathname) ? location.pathname : false;

  return (
    <AppBar position="static" style={{ margin: 10 }}>
      <Tabs aria-label="simple tabs example" value={tabsValue}>
        {links.map(link => (
          <Tab key={link.path} label={link.label} component={NavLink} to={link.path} value={link.path} />
        ))}
      </Tabs>
    </AppBar>
  );
}

export default Menu;
