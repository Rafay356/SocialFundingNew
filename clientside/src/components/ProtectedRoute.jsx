import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserAuthContext } from "../context/curentUserAuthContext";
import { isTokenExpired } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const { user, dispatch } = useContext(CurrentUserAuthContext);
  const token = localStorage.getItem("token");

  if (!user || !token || isTokenExpired(token)) {
    // If token is expired or no user, log out and redirect
    if (token && isTokenExpired(token)) {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
