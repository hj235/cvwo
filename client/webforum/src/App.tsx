import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login';

// Components

// Dependencies
import { useUserContext } from './hooks/auth/useUserContext'

function App() {
  console.log('Server hosted at: ' + import.meta.env.VITE_SERVER_URL);
  const { userState } = useUserContext();

  return (
    <BrowserRouter>
      <Routes>
        {!userState.isLoggedIn && <Route path='/login' element={<Login/>} />}
        
        <Route path='/' element={<Landing/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
