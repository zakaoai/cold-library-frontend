import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, useTheme } from "@mui/material"

import { NavLink } from "react-router-dom"

const MenuMobileDrawer = ({ handleClose, links, open }) => {
  const theme = useTheme()

  return (
    <Drawer sx={{ width: 240, flexShrink: 0, paper: { width: 240 } }} onClose={handleClose} anchor="left" open={open}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(0, 1),
          // necessary for content to be below app bar
          ...theme.mixins.toolbar,
          justifyContent: "flex-end"
        }}>
        <IconButton onClick={handleClose} size="large">
          {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
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
  )
}

export default MenuMobileDrawer
