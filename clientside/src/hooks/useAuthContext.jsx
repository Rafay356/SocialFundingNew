import { useContext } from "react";
import { CurrentUserAuthContext } from "../context/curentUserAuthContext";

export const useAuthContext = () => {
  const context = useContext(CurrentUserAuthContext);
  if (!context) {
    throw Error("useAuth Error");
  }
  return context;
};
