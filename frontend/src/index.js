import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./frebase-config";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ReduxStore } from "./store/ReduxStore";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ReduxStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
