import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './useUserContext.ts';
import { axiosPrivate } from '../../helpers/axios.ts';
import { UserState } from '../../context/UserContext.tsx';

export const useLogin = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { userDispatcher } = useUserContext();
  const navigate = useNavigate();

  async function login(username: string, password: string) {
    setError('');
    setLoading(true);

    const data = {
      username: username,
      password: password,
    };

    await axiosPrivate
      .post('/user/login', data)
      .then((res) => {
        console.log(res.data.payload.data);
        userDispatcher({ type: 'LOGIN', payload: (res.data.payload.data as UserState) });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        userDispatcher({ type: 'LOGOUT' });
        const message = error.response?.data ? `, ${error.response.data.msg}` : 'Invalid username or password';
        setError(message);
      });

    setLoading(false);
  };

  return { login, loading, error };
};
