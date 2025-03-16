import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  role: "user" | "admin";
  children: ReactNode;
}

const ProtectedRoute = ({ role, children }: ProtectedRouteProps) => {
  const { isLoggedIn, userRole } = {
    isLoggedIn: true,
    userRole: "admin",
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;