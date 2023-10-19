import { AppBar, Box, Paper, Tab, Tabs } from "@mui/material";

import { NavLink, useLocation } from "react-router-dom";

import IconButton from "@mui/material/IconButton";

import { useColorMode } from "@/context/ColorModeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";

const MenuDesktop = ({ links }) => {
  const location = useLocation();
  const tabsValue = links.map(link => link.path).find(path => location.pathname.includes(path)) || false;
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <Paper sx={{ display: { xs: "none", md: "block" } }}>
      <AppBar position="static" style={{ marginBottom: 10 }}>
        <Tabs aria-label="simple tabs example" value={tabsValue} indicatorColor="secondary" textColor="inherit">
          {links.map(link => (
            <Tab key={link.path} label={link.label} component={NavLink} to={link.path} value={link.path} />
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
            <IconButton onClick={toggleColorMode} color="inherit">
              {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Tabs>
      </AppBar>
    </Paper>
  );
};

export default MenuDesktop;
