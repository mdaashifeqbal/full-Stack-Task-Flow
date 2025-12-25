import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../components/Dashboard/Dashboard";
import Home from "../Pages/HomePage/Home";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard", // ✅ NO leading slash
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
