import React from "react";
import ReactDOM from "react-dom";
import axe from "react-axe";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

if (process.env.NODE_ENV !== "production") {
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
