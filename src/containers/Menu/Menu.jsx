import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { NavLink, useLocation } from "react-router-dom";
import SiteMap from "~/routes/SiteMap";
import {
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  useTheme
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

/**
 * Menu de l'application
 */
function Menu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();

  const links = [SiteMap.ACCUEIL, SiteMap.RECHERCHE, SiteMap.LIBRAIRIE, SiteMap.TORRENT];

  const tabsValue = links.some(link => link.path === location.pathname) ? location.pathname : false;

  return (
    <>
      <AppBar position="static" style={{ margin: 10 }}>
        <Hidden mdUp>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
            {links
              .filter(link => link.path === location.pathname)
              .map(link => (
                <Tab key={link.path} label={link.label} component={NavLink} to={link.path} value={link.path} />
              ))}
          </Toolbar>
        </Hidden>
        <Hidden smDown>
          <Tabs aria-label="simple tabs example" value={tabsValue}>
            {links.map(link => (
              <Tab key={link.path} label={link.label} component={NavLink} to={link.path} value={link.path} />
            ))}
          </Tabs>
        </Hidden>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          className={classes.drawer}
          onClose={() => setOpen(false)}
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => setOpen(false)}>
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {links.map(link => (
              <ListItem
                button
                key={link.label}
                selected={link.path === location.pathname}
                component={NavLink}
                to={link.path}>
                <ListItemIcon>
                  <ChevronRightIcon />
                </ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Hidden>
    </>
  );
}

export default Menu;
