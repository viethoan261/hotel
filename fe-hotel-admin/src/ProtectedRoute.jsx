import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTERS } from "./config/routers";

export const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector((state) => state).isAuth;
  const rememberAuth = localStorage.getItem("isAuth");

  if (rememberAuth || isAuth) {
    return children;
  } else {
    return <Navigate to={ROUTERS.LOGIN} />;
  }
};
