import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Loader/Spinner";
import api from "../../api/axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("api/user/login", {
        email,
        password,
      });

      toast.success(response.data.message);
      setLoading(false);
      if (response.data.success) {
        navigate("/dashboard");
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      setLoading(false);
      if (!err.response) {
        toast.error("Internal server error try after some time");
      }
      if (err.response?.status === 404) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.data.status === 500) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-linear-to-br from-cyan-900 via-slate-800 to-black px-4">
      <div className="bg-cyan-600 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-yellow-300 text-2xl font-bold text-center mb-6">
          My-Task Flow
        </h2>
        <h2 className="text-white text-lg font-bold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={onSubmitHandle} className="flex flex-col gap-4">
          {/* EMAIL */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black px-4 py-2 font-medium outline-none rounded-lg focus:ring-2 focus:ring-yellow-400"
            type="email"
            required
            placeholder="Email address"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white text-black w-full px-4 py-2 font-medium outline-none rounded-lg focus:ring-2 focus:ring-yellow-400"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-sm font-semibold text-gray-700 hover:text-black"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* LOADER */}
          <div className="flex justify-center">
            {loading ? <Spinner /> : null}
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="mt-3 bg-yellow-400 text-black py-2 font-bold rounded-full hover:bg-yellow-300 transition-all duration-200 active:scale-95"
          >
            Login
          </button>
        </form>
        <div className="w-full flex flex-col justify-center items-center py-2 ">
            <h2 className="text-xl text-yellow-400 font-semibold">OR</h2>
            <button
            onClick={()=>{
                navigate("/signUp")
            }}
            className="cursor-pointer hover:text-blue-800 ">Create new flow account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
