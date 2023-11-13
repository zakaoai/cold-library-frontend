import "./App.css"

import { ColorModeProvider } from "@/context/ColorModeContext"
import QueryClientProvider from "@/context/QueryClientContext.tsx"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { StyledEngineProvider } from "@mui/material/styles"
import { SnackbarProvider } from "notistack"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/index.ts"

const App = () => (
  <SnackbarProvider>
    <QueryClientProvider>
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
  </SnackbarProvider>
)

export default App
