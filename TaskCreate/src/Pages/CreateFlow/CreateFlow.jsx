import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateFlow = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/note/create-note", {
        title,
        content,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
      }
    } catch (err) {
      if (!err.response) {
        toast.error("internal server try after some time ");
      } else if (err?.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err?.response?.status === 500) {
        toast.error("internal server error try afer some time");
      }
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center bg-linear-to-br from-indigo-900 via-slate-900 to-black px-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-white text-2xl font-bold text-center mb-6">
          Create Flow
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* TITLE */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
            className="px-4 py-2 rounded-lg bg-gray-100 text-black font-medium outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* DESCRIPTION */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter description"
            rows="4"
            required
            className="px-4 py-2 rounded-lg bg-gray-100 text-black font-medium outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />

          {/* CREATE BUTTON */}
          <button
            type="submit"
            className="mt-3 bg-indigo-500 text-white py-2 rounded-full font-bold hover:bg-indigo-400 transition-all duration-200 active:scale-95"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFlow;
