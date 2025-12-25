import React, { useState } from "react";
import SignUp from "./components/LoginSignUp/SignUp";
import Login from "./components/LoginSignUp/Login";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";

import { Outlet } from "react-router-dom";
import Home from "./Pages/HomePage/Home";

const App = () => {
  return (
    <div className="h-screen w-full bg-purple-500 text-white flex">
      <Outlet />
    </div>
  );
};

export default App;
