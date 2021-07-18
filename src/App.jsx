import React from "react";
import { BrowserRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Routing from "./routes";
import { object } from "prop-types";

const App = ({ history }) => (
  <Container>
    <BrowserRouter history={history}>
      <Routing />
    </BrowserRouter>
  </Container>
);

App.propTypes = {
  history: object
};

export default App;
