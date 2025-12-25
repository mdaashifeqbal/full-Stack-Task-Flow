import React, { useEffect } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const userAnswer = confirm("Are you sure want to logout");
    if (userAnswer) {
      await api.post("/user/logout");
      navigate("/");
    }
  };

  return (
    <div className="w-full bg-gray-500 py-3 flex justify-between px-10">
      <div>
        <h2 className="text-xl font-bold">My-Task flow</h2>
      </div>
      <div className="flex items-center gap-5">
        <h2 className=" font-semibold">Random User</h2>
        <button className="bg-blue-600 text-white  px-5 py-1 rounded-lg   cursor-pointer font-semibold">
          Create a Flow
        </button>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="bg-yellow-500 px-5 py-1 rounded-lg text-black text-lg cursor-pointer font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
