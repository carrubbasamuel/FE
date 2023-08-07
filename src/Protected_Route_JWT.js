import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setEmitSocketConnection } from "./redux/reducers/LoginSlice";

export default function ProtectedRoute({ element }) {
  const { userLogged } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEmitSocketConnection(userLogged.user.userId || userLogged.user._id));
   }, []);

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
