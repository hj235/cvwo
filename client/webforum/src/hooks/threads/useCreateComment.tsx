import { useState } from 'react';

import { axiosPrivate } from '../../helpers/axios.js';
import { Comment } from '../../context/CommentsContext.js';
import { useUserContext } from '../auth/useUserContext.js';
import { useCommentsContext } from './useCommentsContext.js';

const useCreateComment = () => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { userState } = useUserContext();
    const { commentsDispatcher } = useCommentsContext();

    const createComment = async (comment: Comment) => { 
        setError('');
        setLoading(true);

        const data = {
            thread_id: comment.thread_id,
            body: comment.body,
        }

        if (!data.body) {
            setError("comment cannot be empty");
            setLoading(false);
            return;
        }

        await axiosPrivate
            .post(`/comment/create/${userState.username}`, data)
            .then((res) => {
                console.log(res.data.payload.data);
                commentsDispatcher({ type: "ADD", payload: res.data.payload.data });
            })
            .catch((error) => {
                console.log(error);
                const message = error.response?.data ? `, ${error.response.data.msg}` : 'error adding comment';
                setError(error.message + message);
            });

        setLoading(false);
    };

    return { createComment, error, loading };
};

export default useCreateComment;
