import "./App.css";

import { ColorModeProvider } from "@/context/ColorModeContext";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { StyledEngineProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.ts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ColorModeProvider>
      <StyledEngineProvider injectFirst>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            minHeight: "100%",
            top: 0,
            left: 0,
            bgcolor: "background.default",
            color: "text.primary"
          }}>
          <Container sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <RouterProvider router={router} />
          </Container>
        </Box>
      </StyledEngineProvider>
    </ColorModeProvider>
  </QueryClientProvider>
);

export default App;
