import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './useUserContext.ts';
import { axiosPrivate } from '../../helpers/axios.js';

export const useSignup = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { userDispatcher } = useUserContext();
  const navigate = useNavigate();

  async function signup(username: string, password: string) {
    setError('');
    setLoading(true);

    const data = {
        username: username,
        password: password,
    }

    await axiosPrivate
      .post('/user/signup', data)
      .then((res) => {
        console.log(res.data.payload.data)
        userDispatcher({ type: 'LOGIN', payload: res.data.payload.data });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        userDispatcher({ type: 'LOGOUT' });
        const message = error.response?.data ? `, ${error.response.data.msg}` : 'error signing up';
        setError(error.message + message);
      });

    setLoading(false);
  };

  return { signup, loading, error };
};
