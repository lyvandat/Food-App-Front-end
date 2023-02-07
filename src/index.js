import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ItemContext from "./store/ItemContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ItemContext>
      <App />
    </ItemContext>
  </React.StrictMode>
);
