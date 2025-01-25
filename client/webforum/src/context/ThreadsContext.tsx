import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export interface Tag {
  body: string,
}

export interface Thread {
    id: string,
    author: { String: string, Valid: boolean },
    title: string,
    body: string,
    time_created: string,
    time_edited: { String: string, Valid: boolean },
    tags: Tag[],
    tagsAsString: string,
}

export const initialThread: Thread = {
    id: '',
    author: { String: '', Valid: false },
    title: '',
    body: '',
    time_created: '',
    time_edited: { String: '', Valid: false },
    tags: [],
    tagsAsString: '',
};

export interface ThreadsState {
  threads: Thread[],
  isLoaded: boolean,
}

export interface ThreadContextType {
  threadsState: ThreadsState
  threadsDispatcher: React.Dispatch<CounterAction>
}

type CounterAction = 
| { type: "GET"; payload: Thread[] }
| { type: "UPDATE"; payload: Thread }
| { type: "DELETE"; payload: string }

const initialThreadsState: ThreadsState = Object.freeze({
    threads: [],
    isLoaded: false,
})

export const ThreadsContext = createContext<ThreadContextType | null>(null);

export function threadReducer(state: ThreadsState, action: CounterAction): ThreadsState {
    switch (action.type) {
        case "GET":
            console.log(`Threads retrieved`);
            return { threads: action.payload, isLoaded: true };
        case "UPDATE":
            console.log(`Thread updated: ${action.payload}`);
            return { threads: state.threads.map((thread) => {
                if (thread.id == action.payload.id) {
                    return action.payload;
                } else {
                    return thread;
                }
            }), isLoaded: true };
        case "DELETE":
            console.log(`Thread deleted.`);
            return { threads: state.threads.filter((thread) => {
                thread.id != action.payload
            }), isLoaded: true };
        default:
        return state;
    }
};

export const ThreadContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(threadReducer, initialThreadsState);

  return (
    <ThreadsContext.Provider value={{ threadsState: state, threadsDispatcher: dispatch }}>
      {children}
    </ThreadsContext.Provider>
  );
};
ThreadContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
