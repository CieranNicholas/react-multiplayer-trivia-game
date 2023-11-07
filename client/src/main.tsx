import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import SocketContextComponent from "./contexts/Socket/Component.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <SocketContextComponent>
    <App />
  </SocketContextComponent>
  // </React.StrictMode>
);
