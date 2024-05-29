import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ProtectedRoute = ({ children }) => {
  const { state } = useLocation();
  const token = cookies.get("adminAccessToken");

  if (!state && !token) {
    return <Navigate to="/loginadmin" />;
  }
  return children;
};

export default ProtectedRoute;
