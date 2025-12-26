import React, { useState } from "react";
import {Toaster} from "react-hot-toast"


import { Outlet } from "react-router-dom";
import Home from "./Pages/HomePage/Home";

const App = () => {
  return (
    <div className="h-screen w-full bg-purple-500 text-white flex">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: "#1f2937",
            color: "#fff",
          },
        }}
      />
      <Outlet />
    </div>
  );
};

export default App;
