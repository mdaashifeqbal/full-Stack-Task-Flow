import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Loader/Spinner";

import api from "../../api/axios";

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
      const response = await api.post("/user/login", {
        email,
        password,
      });

      alert(response.data.message);
      setLoading(false);
      if (response.data.success) {
        navigate("/dashboard"); // internal route
      }
    } catch (err) {
      setLoading(false);
      if (!err.response) {
        alert("Internal server error");
      }
      console.log(err.response?.data?.message);
      if (err.response?.status === 404) {
        alert(err.response.data.message);
      } else if (err.response?.status === 400) {
        alert(err.response.data.message);
      } else if (err.response?.data.status === 500) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-cyan-500 h-[40vh] w-[40vw] rounded-lg">
        <form
          onSubmit={onSubmitHandle}
          className="h-full flex flex-col gap-5 justify-center items-center"
        >
          {/* EMAIL */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black w-sm py-1 px-3 font-semibold outline-none rounded-md"
            type="email"
            required
            placeholder="Enter email"
          />

          {/* PASSWORD */}
          <div className="flex relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white text-black w-sm py-1 px-3 font-semibold outline-none rounded-md"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1 text-black cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div>{loading ? <Spinner /> : null}</div>
          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="bg-yellow-500 px-6 py-1 font-bold cursor-pointer hover:bg-blue-400 rounded-2xl active:scale-95"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
