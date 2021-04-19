import React from "react";
import { Router } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Routing from "./routes";
import { object } from "prop-types";

const App = ({ history }) => (
  <Container>
    <Router history={history}>
      <Routing />
    </Router>
  </Container>
);

App.propTypes = {
  history: object
};

export default App;
