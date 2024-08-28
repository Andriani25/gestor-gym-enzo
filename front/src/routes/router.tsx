import { createBrowserRouter } from "react-router-dom";
import { AdminPanel, Login, Error, AddUser, ModifyUser } from "../views";

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
  {
    path: "modifyUser",
    element: <ModifyUser />,
  },
]);

export default router;
