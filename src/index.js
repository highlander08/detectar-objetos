import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import { Detector } from "./components/Detector";
import SignUp from "./components/SignUp";
// import Authentication from "./components/Authentication";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/detector" element={<Detector />}/>
        {/* <Route path="/auth" element={<Authentication />}/> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
