import { createBrowserRouter } from "react-router-dom";
import { AdminPanel, Login } from "../views";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
]);

export default router;
