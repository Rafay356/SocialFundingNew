import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Model from "./components/Model";
import SinglePostCard from "./components/pages/SinglePostCard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cause/socialfunding" element={<Model />} />
        <Route path="/cause/singlepost" element={<SinglePostCard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
