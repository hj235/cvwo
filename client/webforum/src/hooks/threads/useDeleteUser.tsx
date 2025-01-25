import { useState } from 'react';
import { axiosPrivate } from '../../helpers/axios.js';
import { useUserContext } from '../auth/useUserContext.js';

const useDeleteUser = () => {
    const { userState, userDispatcher } = useUserContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const deleteUser = async (password: string) => {
        setError('');
        setLoading(true);

        const data = {
            username: userState.username,
            password: password,
            date_created: userState.date,
        }

        await axiosPrivate
            .patch('/user/delete', data)
            .then(() => {
                userDispatcher({ type: 'LOGOUT' })
                console.log(`Deleted user ${userState.username}, proceeding to log out`)})
            .catch((error) => {
                console.log(error.response);
                const message = error.response?.data
                    ? `, ${error.response.data.msg}`
                    : '';
                setError(error.message + ", " + message);
            });

        setLoading(false);
    }

    return { deleteUser, error, loading };

};

export default useDeleteUser;