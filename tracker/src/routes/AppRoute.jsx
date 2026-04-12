

import React from "react";
//import Login from "../pages/Login";
import Login from "../pages/Login/containers/LoginContainer";

import Tracker from "../pages/Tracker";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Logout from "../pages/Logout";
import { Routes, Route, Navigate } from "react-router-dom";
import AccessDenied from "../pages/AccessDenied";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AppRoute() {
  //const currentUser = JSON.parse(localStorage.getItem("currentUser") || null);
  const { currentUser, loading } = useContext(AuthContext);
 
  if (loading)return <p>Loading...</p>;

  const permissions = currentUser?.permissions || [];

  return (
    <Routes>
     <Route
  path="/"
  element={
    currentUser ? (
      currentUser.role === "admin" || currentUser.role==="super-admin" ? (
        <Navigate to="/users" />
      ) : permissions.includes("dashboard") ? (
        <Navigate to="/dashboard" />
      ) : permissions.includes("tracker") ? (
        <Navigate to="/tracker" />
      ) : (
        <Navigate to="/access-denied" /> 
      )
    ) : (
      <Navigate to="/login" />
    )
  }
/>

<Route
  path="/login"
  element={currentUser ? <Navigate to="/" /> : <Login />}
/>

      <Route
        path="/tracker"
        element={
          <ProtectedRoute permission="tracker" >
            <Tracker />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute permission="dashboard" >
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          currentUser?.role === "admin" || currentUser?.role==="super-admin" ? <Users /> : <Navigate to="/" />
        }
      />

    <Route path="/access-denied" element={<AccessDenied />} />

      <Route
        path="/logout"
        element={currentUser ? <Logout /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
