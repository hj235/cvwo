// import { useNavigate } from 'react-router-dom';
import { useUserContext } from './useUserContext';

export const useLogout = () => {
  const { userDispatcher } = useUserContext();
  // const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem('user');
    userDispatcher({ type: 'LOGOUT' });
    // navigate('/login');
  };

  return { logout };
};
