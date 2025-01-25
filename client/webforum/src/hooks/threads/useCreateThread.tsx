import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosPrivate } from '../../helpers/axios.js';
import { useUserContext } from '../auth/useUserContext.js';

const useCreateThread = () => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { userState } = useUserContext();
    const navigate = useNavigate();

    async function createThread(title: string, body: string, tags: string) {
        setError("");
        setLoading(true);
        
        const data = {
            title: title,
            body: body,
            tags: tags
        }

        if (!data.title || !data.body) {
            setError("threads cannot have an empty title or body");
            setLoading(false);
            return;
        }
    
        const createThread = async () => {
            await axiosPrivate
                .post(`/thread/create/${userState.username}`, data)
                .then((res) => {
                    console.log(res.data.payload.data);
                    toast.success('Thread successfully created');
                    navigate("/home");
                })
                .catch((error) => {
                    console.log(error);
                    const message = error.response?.data ? `, ${error.response.data.msg}` : 'error adding thread';
                    setError(error.message + message);
                });
        };

        createThread();
        setLoading(false);
    }

    return { createThread, error, loading };
};

export default useCreateThread;
