import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import NoteCard from "../NoteCard/NoteCard";
import api from "../../api/axios";
import Spinner from "../Loader/Spinner";
import { Outlet } from "react-router-dom";
import NotesHomePage from "../../Pages/DashboardPages/NotesHomePage";

const Dashboard = () => {
  return (
    <div className="h-screen w-full bg-gray-600">
      <Navbar />
      <Outlet/>
    </div>
  );
};

export default Dashboard;
