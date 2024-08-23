import { createBrowserRouter } from "react-router-dom";
import { AdminPanel, Login, Error, AddUser } from "../views";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
  {
    path: "/error",
    element: <Error />,
  },
  {
    path: "/addUser",
    element: <AddUser />,
  },
]);

export default router;
