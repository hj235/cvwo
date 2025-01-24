import { useState, useEffect } from 'react';

import { axiosPrivate } from '../../helpers/axios.js';
import { useThreadsContext } from './useThreadsContext.js';

const useGetThreads = () => {
  const { threadsDispatcher } = useThreadsContext();
  const [error, setError] = useState<string>('');

    useEffect(() => {
        const getThreads = async () => {
        await axiosPrivate
            .get('/thread')
            .then((res) => {
            console.log(res.data.payload.data);
            threadsDispatcher({ type: 'GET', payload: res.data.payload.data });
            })
            .catch((error) => {
            console.log(error);
            const message = error.response?.data ? `, ${error.response.data.msg}` : 'error retrieving threads';
            setError(error.message + message);
            });
        };

        getThreads();
    }, []);

  return { error };
};

export default useGetThreads;
