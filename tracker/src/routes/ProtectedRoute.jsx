import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, permission }) {
  const { currentUser, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isAdmin = ["admin", "super-admin"].includes(currentUser.role);

  if (isAdmin) return children;

  if (!permission) return children;

  if (currentUser.permissions?.includes(permission)) {
    return children;
  }

  return <Navigate to="/" replace />;
}
