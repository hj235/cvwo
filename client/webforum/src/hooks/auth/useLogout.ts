import { useUserContext } from './useUserContext';

export const useLogout = () => {
  const { userDispatcher } = useUserContext();

  const logout = async () => {
    localStorage.removeItem('user');
    userDispatcher({ type: 'LOGOUT' });
  };

  return { logout };
};
