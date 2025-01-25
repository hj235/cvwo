import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Threads from './pages/Threads';
import CreateThread from './pages/CreateThread';

// Dependencies
import { useUserContext } from './hooks/auth/useUserContext';
import { useLogin } from './hooks/auth/useLogin';
import { toast } from 'react-toastify';

export default function WebForumRoutes() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userState } = useUserContext();
    const { loading } = useLogin();

    useEffect(() => {
        if ((location.pathname == '/create') && 
            !userState.isLoggedIn &&
            !loading
        ) {
          navigate('/login');
          toast.error("Please login to access that feature!");
        } else if ((
                location.pathname == '/login' ||
                location.pathname == '/signup'
            ) &&
            userState.isLoggedIn &&
            !loading
        ) {
          navigate('/');
          toast("Already logged in!");
        }
      }, [location, userState, loading]);
  
    return (
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/thread' element={<Threads/>} />
            <Route path='/create' element={<CreateThread/>} />
        </Routes>
    );
};