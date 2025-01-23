import { UserContext } from "../../context/UserContext.tsx";
import { useContext } from "react";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
