import { createContext, useReducer } from "react";

export const CurrentUserAuthContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    default:
      return state;
  }
};

export const CurrentUserAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  // console.log("AuthContext state", state);

  return (
    <CurrentUserAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CurrentUserAuthContext.Provider>
  );
};
