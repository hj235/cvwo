import { useState, useEffect } from 'react';

import { axiosPrivate } from '../../helpers/axios.js';
import { Comment } from '../../context/CommentsContext.js';
import { useUserContext } from '../auth/useUserContext.js';
import { useCommentsContext } from './useCommentsContext.js';

const useCreateComment = (comment: Comment) => {
    const [error, setError] = useState<string>('');
    const { userState } = useUserContext();
    const { commentsDispatcher } = useCommentsContext();

        useEffect(() => {
            const createComment = async () => {
            await axiosPrivate
                .post(`/comment/create/{${userState.username}}`)
                .then((res) => {
                    console.log(res.data.payload.data);
                    commentsDispatcher({ type: "ADD", payload: comment });
                })
                .catch((error) => {
                    console.log(error);
                    const message = error.response?.data ? `, ${error.response.data.msg}` : 'error adding comment';
                    setError(error.message + message);
                });
            };

            createComment();
        }, []);

    return { error };
};

export default useCreateComment;
