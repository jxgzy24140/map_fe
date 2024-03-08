import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "mobx-react";
import initializeStores from "./stores/storeInitializer";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const stores = initializeStores();
root.render(
  <React.StrictMode>
    <Provider {...stores}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
