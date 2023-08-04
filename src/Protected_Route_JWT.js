import jwt_decode from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element }) {
  const { userLogged } = useSelector((state) => state.login);

  if (!userLogged || userLogged.statusCode !== 200) {
    localStorage.removeItem("user");
    return <Navigate to="/login" />;
  }

  const decoded = jwt_decode(userLogged.token);
  const exp = decoded.exp;
  const now = Date.now() / 1000;

  if (exp < now) {
    localStorage.removeItem("user");
    return <Navigate to="/login" />;
  }

  return element ;
}
