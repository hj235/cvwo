import { useState, useEffect } from 'react';

import { axiosPublic } from '../../helpers/axios.js';
import { Comment, initialComment } from '../../context/CommentsContext.js';
import { useCommentsContext } from './useCommentsContext.js';

const useGetComments = (threadId: string) => {
    const [error, setError] = useState<string>('');
    const [comments, setComments] = useState<Comment>(initialComment);
    const { commentsDispatcher } = useCommentsContext();

        useEffect(() => {
            const getComments = async () => {
            await axiosPublic
                .get(`/comment/${threadId}`)
                .then((res) => {
                    console.log(res.data.payload.data);
                    commentsDispatcher({ type: "GET", payload: res.data.payload.data });
                })
                .catch((error) => {
                    console.log(error);
                    const message = error.response?.data ? `, ${error.response.data.msg}` : 'error retrieving comments';
                    setError(error.message + message);
                });
            };

            getComments();
        }, []);

    return { error };
};

export default useGetComments;
