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

ReactDOM.render(<App history={history} />, document.getElementById("app"));

// Reload components
if (module.hot) {
  module.hot.accept();
}
