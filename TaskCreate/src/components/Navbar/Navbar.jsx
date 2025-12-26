import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  //userName handler
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user/me", {
          withCredentials: true,
        });
        setUserName(response.data.user.userName);
      } catch (err) {
        if (!err.response) {
          toast.error("internal server error");
        } else if (err.response?.status === 404) {
          toast.error(err.response.data.message);
        } else if (err.response?.status === 500) {
          toast.error(err.response.data.message);
        }
      }
    };

    fetchUser();
  }, []);

  //logout handler
  const handleSubmit = async () => {
    try {
      const userAnswer = confirm("Are you sure want to logout");
      if (userAnswer) {
        await api.post("/user/logout");
        navigate("/");
        toast.success("logout successful");
      }
    } catch (err) {
      navigate("/");
    }
  };

  return (
    <div className="w-full h-auto bg-linear-to-r from-slate-800 via-gray-800 to-slate-900 px-4 sm:px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg">
      
     
      <div className="flex items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
          My-Task Flow
        </h2>
      </div>

      {/* NAV ITEMS */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive
              ? "text-indigo-400 font-semibold border-b-2 border-red-700"
              : "text-gray-200 hover:text-white transition"
          }
        >
          Home
        </NavLink>

        <h2 className="text-gray-200 font-medium bg-slate-700 px-3 py-1 rounded-full">
          {userName}
        </h2>

        <button className="bg-indigo-600 hover:bg-indigo-500 transition text-white px-4 py-1.5 rounded-full font-semibold active:scale-95">
          <Link to="create-flow">Create a Flow</Link>
        </button>

        <button
          onClick={() => {
            handleSubmit();
          }}
          className="bg-yellow-400 cursor-pointer hover:bg-yellow-300 transition px-4 py-1.5 rounded-full text-black font-semibold active:scale-95"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
