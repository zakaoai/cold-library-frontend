import { AppContainer } from "react-hot-loader";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "core-js/stable";
import "regenerator-runtime/runtime";

const [serverPath] = window.location.pathname.split(/\/app/gi);

const history = createBrowserHistory({
  basename: `${serverPath}`
});

ReactDOM.render(
  <AppContainer>
    <App history={history} />
  </AppContainer>,
  document.getElementById("app")
);

// Reload components
module.hot.accept();
