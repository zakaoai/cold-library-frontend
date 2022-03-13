import { Box } from "@mui/system";
import Menu from "containers/Menu/Menu";
import React from "react";
import { Outlet } from "react-router";

const Layout = () => (
  <Box>
    <Menu />
    <Outlet />
  </Box>
);

export default Layout;
