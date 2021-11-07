import React from "react";
import { BrowserRouter } from "react-router-dom";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import Routing from "./routes";
import { object } from "prop-types";

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

App.propTypes = {
  history: object
};

export default App;
