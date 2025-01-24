import { ThreadsContext } from "../../context/ThreadsContext";
import { useContext } from "react";

export const useThreadsContext = () => {
  const context = useContext(ThreadsContext);

  if (!context) {
    throw Error("useThreadsContext must be used within a ThreadsContextProvider");
  }

  return context;
};
