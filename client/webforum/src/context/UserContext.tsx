import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";

export interface UserState {
  username: string,
  date: string,
  isLoggedIn: boolean,
}

export interface UserContextType {
  userState: UserState
  userDispatcher: React.Dispatch<CounterAction>
}

type CounterAction = 
| { type: "LOGIN"; payload: UserState }
| { type: "LOGOUT" }

const initialUserState = Object.freeze({
  username: "",
  date: "",
  isLoggedIn: false,
})

export const UserContext = createContext<UserContextType | null>(null);

export function userReducer(state: UserState, action: CounterAction): UserState {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem('user', JSON.stringify(action.payload));
      console.log(`Logged in as user: ${action.payload.username}`)
      return { ...action.payload, isLoggedIn: true };
    case "LOGOUT":
      localStorage.removeItem('user');
      console.log(`User is logged out`)
      return initialUserState;
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch({ type: "LOGIN", payload: JSON.parse(user) });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userState: state, userDispatcher: dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
