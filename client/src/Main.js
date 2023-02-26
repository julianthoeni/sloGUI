import React from "react";
import { Routes, Route } from "react-router-dom";
import SLOs from "./pages/SLO";
import Rules from "./pages/Rules";
import Period from "./pages/Period";
import About from "./pages/About";
import Help from "./pages/Help";
import Home from "./pages/Home";

const Main = () => {
  document.title = "SLO_GUI";
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/slos" element={<SLOs />}></Route>
      <Route path="/periods" element={<Period />}></Route>
      <Route path="/rules" element={<Rules />}></Route>      
      <Route path="/about" element={<About />}></Route>
      <Route path="/help" element={<Help />}></Route>
    </Routes>
  );
};

export default Main;
