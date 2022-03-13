import React from "react";
import { BrowserRouter } from "react-router-dom";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import Routing from "./routes";

const App = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Container>
          <BrowserRouter>
            <Routing />
          </BrowserRouter>
        </Container>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default App;
