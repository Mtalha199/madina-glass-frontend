import { AUTHENTICATION_VALUE } from "@/Constant";
import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem(AUTHENTICATION_VALUE.AUTH_TOKEN); // Or get the token from your context/store

  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login page
  }

  return children;
};

export default AuthGuard;
