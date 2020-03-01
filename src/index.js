import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/base/index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ReactGA from "react-ga";

ReactGA.initialize("UA-11356612-4", {
  debug: process.env.NODE_ENV === "development"
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
