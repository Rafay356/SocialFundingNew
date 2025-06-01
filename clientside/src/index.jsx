import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CurrentUserAuthContextProvider } from "./context/curentUserAuthContext";
import { SearchProvider } from "./context/searchPosts";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <CurrentUserAuthContextProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </CurrentUserAuthContextProvider>
    </Router>
  </React.StrictMode>
);
