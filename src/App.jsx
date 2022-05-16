import React from "react";
import { BrowserRouter } from "react-router-dom";
import Container from "@mui/material/Container";
import { StyledEngineProvider } from "@mui/material/styles";
import Routing from "./routes";
import { ColorModeProvider } from "context/ColorModeContext";
import Box from "@mui/material/Box";

const App = () => {
  return (
    <ColorModeProvider>
      <StyledEngineProvider injectFirst>
        <Box
          sx={{
            height: "95vh",
            display: "flex",
            width: "100%",

            bgcolor: "background.default",
            color: "text.primary"
          }}>
          <Container>
            <BrowserRouter>
              <Routing />
            </BrowserRouter>
          </Container>
        </Box>
      </StyledEngineProvider>
    </ColorModeProvider>
  );
};

export default App;
