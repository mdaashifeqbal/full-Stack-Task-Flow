import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../components/Dashboard/Dashboard";
import Home from "../Pages/HomePage/Home";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "../Pages/SignUp/SignUp";
import CreateFlow from "../Pages/CreateFlow/CreateFlow";
import NotesHomePage from "../Pages/DashboardPages/NotesHomePage";
import NoteDetails from "../Pages/NotesDetails/NotesDetails";

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
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <NotesHomePage />,
          },
          {
            path: "create-flow",
            element: <CreateFlow />,
          },
          {
            path:"note-details/:id",
            element:<NoteDetails/>
          }
        ],
      },
    ],
  },
]);

export default router;
