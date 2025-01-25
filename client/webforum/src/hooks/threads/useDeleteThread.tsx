import { useState } from 'react';
import { axiosPrivate } from '../../helpers/axios.js';
import { useThreadsContext } from './useThreadsContext.js';
import { Thread } from '../../context/ThreadsContext.js';

const useDeleteThread = () => {
    const { threadsDispatcher } = useThreadsContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const deleteThread = async (thread: Thread) => {
        setError('');
        setLoading(true);

        await axiosPrivate
            .delete(`/thread/delete/${thread.id}`)
            .then(() => {
                threadsDispatcher({ type: 'DELETE', payload: thread.id })
                console.log(`Delete thread ${thread.title} with id ${thread.id}`)})
            .catch((error) => {
                console.log(error.response);
                const message = error.response?.data
                    ? `, ${error.response.data.msg}`
                    : '';
                setError(error.message + ", " + message);
            });

        setLoading(false);
    }

    return { error, loading, deleteThread };

};

export default useDeleteThread;