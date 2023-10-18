import Menu from "@/containers/Menu/Menu";
import { Box } from "@mui/system";
import { Suspense } from "react";

import { Outlet } from "react-router";

const Layout = () => (
  <Box>
    <Menu />
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  </Box>
);

export default Layout;
