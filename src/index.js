import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import store from "./store";

ReactDOM.render(
  // Using strict mode will cause an error to be thrown in development builds
  // This is a known issue with Material v4 and is thankfully addressed in v5
  // which is currently in beta
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
