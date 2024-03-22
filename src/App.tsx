import "./App.css"

import Container from "@mui/material/Container"
import { StyledEngineProvider } from "@mui/material/styles"
import { SnackbarProvider } from "notistack"
import { RouterProvider } from "react-router-dom"

import { ColorModeProvider } from "@/context/ColorModeProvider"
import Box from "@mui/material/Box"
import router from "./routes"

const App = () => (
  <SnackbarProvider>
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
  </SnackbarProvider>
)

export default App
