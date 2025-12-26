import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Loader from "../../components/Loader/Spinner";
import toast from "react-hot-toast";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await api.post("/user/register", {
        fullName,
        userName,
        email,
        password,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
      }
    } catch (err) {
      if (!err.response) {
        toast.error("internal server error try after some time");
      }
      if (err.response?.status === 409) {
        toast.error(err.response.data.message);
      } else if (err?.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err?.response.status === 500) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-linear-to-br from-slate-900 via-gray-800 to-black px-4">
      <div className="bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-yellow-200 text-2xl font-bold text-center mb-6">
          My-Task Flow
        </h2>
        <h2 className="text-white text-lg font-bold text-center mb-6">
          Create Account
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            className="bg-gray-100 text-black px-4 py-2 font-medium outline-none rounded-lg focus:ring-2 focus:ring-yellow-500"
            type="text"
            required
            placeholder="Full Name"
          />

          <input
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="bg-gray-100 text-black px-4 py-2 font-medium outline-none rounded-lg focus:ring-2 focus:ring-yellow-500"
            type="text"
            required
            placeholder="Username"
          />

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-gray-100 text-black px-4 py-2 font-medium outline-none rounded-lg focus:ring-2 focus:ring-yellow-500"
            type="text"
            required
            placeholder="Email Address"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bg-gray-100 text-black w-full px-4 py-2 font-medium outline-none rounded-lg focus:ring-2 focus:ring-yellow-500"
              required
              placeholder="Create Password"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-sm font-semibold text-gray-700 hover:text-black"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
          type="submit"
          className="mt-4 bg-yellow-500 text-black py-2 font-bold rounded-full hover:bg-yellow-400 transition-all duration-200 active:scale-95">
            Register User
          </button>
        </form>
        <div className="w-full flex flex-col justify-center items-center py-2 ">
          <h2 className="text-xl text-yellow-400 font-semibold">OR</h2>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="cursor-pointer hover:text-blue-800 "
          >
            Login to your flow account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
