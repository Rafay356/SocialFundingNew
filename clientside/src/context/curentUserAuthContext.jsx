import { createContext, useReducer, useEffect } from "react";
import { isTokenExpired } from "../utils/auth";
import { useNavigate } from "react-router";

export const CurrentUserAuthContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const CurrentUserAuthContextProvider = ({ children }) => {
  const initialUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (storedUser && token && !isTokenExpired(token)) {
      return storedUser;
    }
    return null;
  };
  const [state, dispatch] = useReducer(userReducer, {
    user: initialUser(),
  });

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/auth/signin");
    }
  }, [navigate, state]);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  return (
    <CurrentUserAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CurrentUserAuthContext.Provider>
  );
};
