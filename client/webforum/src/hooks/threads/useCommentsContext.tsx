import { CommentsContext } from "../../context/CommentsContext";
import { useContext } from "react";

export const useCommentsContext = () => {
  const context = useContext(CommentsContext);

  if (!context) {
    throw Error("useCommentsContext must be used within a CommentsContextProvider");
  }

  return context;
};
