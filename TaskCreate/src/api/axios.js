import axios from "axios";

const api = axios.create({
  baseURL: "https://my-flow-backend.onrender.com/",
  // baseURL: "http://localhost:3000/",
  withCredentials: true,
});

export default api;
