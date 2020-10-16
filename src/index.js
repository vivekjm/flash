import React from "React";
import ReactDom from "react-dom";

import App from "./App";

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);

ServiceWorker.Unregister();
