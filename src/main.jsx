import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { NotificationProvider } from "./helpers/NotificationContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotificationProvider>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </NotificationProvider>
  </StrictMode>
);
