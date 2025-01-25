import { useState } from 'react';
import { axiosPrivate } from '../../helpers/axios.js';
import { useCommentsContext } from './useCommentsContext.js';
import { Comment } from '../../context/CommentsContext.js';

const useDeleteComment = () => {
    const { commentsDispatcher } = useCommentsContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const deleteComment = async (comment: Comment) => {
        setError('');
        setLoading(true);

        await axiosPrivate
            .delete(`/comment/delete/${comment.id}`)
            .then(() => {
                commentsDispatcher({ type: 'DELETE', payload: comment.id })
                console.log(`Deleted comment with id ${comment.id}`)})
            .catch((error) => {
                console.log(error.response);
                const message = error.response?.data
                    ? `, ${error.response.data.msg}`
                    : '';
                setError(error.message + ", " + message);
            });

        setLoading(false);
    }

    return { error, loading, deleteComment };

};

export default useDeleteComment;