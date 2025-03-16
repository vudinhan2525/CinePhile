import AdminLayout from "@layouts/AdminLayout";
import { RouteObject } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>,
    children: [],
  },
];

export default adminRoutes;