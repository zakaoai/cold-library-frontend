import React from "react";
import { BrowserRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Routing from "./routes";
import { object } from "prop-types";

const App = () => (
  <Container>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </Container>
);

App.propTypes = {
  history: object
};

export default App;
