import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Updated to import from App.jsx
import "./index.css"; // This imports your base CSS (where Tailwind directives are)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
