import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
