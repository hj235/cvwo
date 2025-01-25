import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";

export type Comment = {
    id: string,
    author: { String: string, Valid: boolean },
    thread_id: string,
    body: string,
    time_created: string,
    time_edited: { String: string, Valid: boolean },
};

export const initialComment: Comment = {
    id: '',
    author: { String: '', Valid: false },
    thread_id: '',
    body: '',
    time_created: '',
    time_edited: { String: '', Valid: false },
};

export interface CommentsState {
  comments: Comment[],
  isLoaded: boolean,
}

export interface CommentContextType {
  commentsState: CommentsState
  commentsDispatcher: React.Dispatch<CounterAction>
}

type CounterAction = 
| { type: "GET"; payload: Comment[] }
| { type: "ADD"; payload: Comment }
| { type: "UPDATE"; payload: Comment }
| { type: "DELETE"; payload: string }

const initialCommentsState = Object.freeze({
    comments: [],
    isLoaded: false,
})

export const CommentsContext = createContext<CommentContextType | null>(null);

export function commentReducer(state: CommentsState, action: CounterAction): CommentsState {
    switch (action.type) {
        case "GET":
            console.log(`Comments retrieved`);
            return { comments: action.payload, isLoaded: true };
        case "ADD":
            console.log(`Comment created: ${action.payload}`);
            return { comments: [action.payload].concat(state.comments), isLoaded: true };
        case "UPDATE":
            console.log(`Comment updated: ${action.payload}`);
            return { comments: state.comments.map((comment) => {
                if (comment.id == action.payload.id) {
                    return action.payload;
                } else {
                    return comment;
                }
            }), isLoaded: true };
        case "DELETE":
            console.log(`Comment deleted.`);
            console.log("UNFILTERED: ", state.comments, "FILTERED: ", state.comments.filter((comment) => {
                comment.id != action.payload
            }))
            return { comments: state.comments.filter((comment) => {
                return comment.id != action.payload;
            }), isLoaded: true };
        default:
        return state;
    }
};

export const CommentContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(commentReducer, initialCommentsState);

  return (
    <CommentsContext.Provider value={{ commentsState: state, commentsDispatcher: dispatch }}>
      {children}
    </CommentsContext.Provider>
  );
};
CommentContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
