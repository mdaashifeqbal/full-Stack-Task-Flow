import React, { useState } from "react";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-full w-1/2  flex justify-center items-center">
      <div className="bg-gray-700 h-[40vh] w-[40vw] rounded-lg ">
        <form className="h-full flex flex-col gap-5  justify-center items-center">
          <input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            className="bg-white text-black w-sm py-1 font-semibold outline-none rounded-md"
            type="text"
            required
            placeholder="Enter your full name"
          />
          <input
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="bg-white text-black w-sm py-1 font-semibold outline-none rounded-md"
            type="text"
            required
            placeholder="Enter username"
          />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-white text-black w-sm py-1 font-semibold outline-none rounded-md"
            type="text"
            required
            placeholder="Enter your email"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bg-white  text-black w-sm py-1 font-semibold outline-none rounded-md"
              required
              placeholder="create a password"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              className=" absolute right-4 text-black top-1 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className="bg-yellow-500 px-5 py-1 font-bold cursor-pointer hover:bg-blue-400 rounded-2xl active:scale-95">
            Register User
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
