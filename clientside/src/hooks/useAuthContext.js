import { CurrentUserAuthContextProvider } from "../context/curentUserAuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(CurrentUserAuthContextProvider);
  if (!context) {
    throw Error("useAuth Error");
  }
  return context;
};
