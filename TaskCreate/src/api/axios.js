import axios from "axios";

const api = axios.create({
  baseURL: "https://my-flow-backend.onrender.com/api",
  withCredentials: true,
});

export default api;
