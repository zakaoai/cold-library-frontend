import React from "react";

import { NavLink } from "react-router-dom";
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
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
  }
}));

const MenuMobileDrawer = ({ handleClose, links, open }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      onClose={handleClose}
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleClose} size="large">
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
  );
};

export default MenuMobileDrawer;
