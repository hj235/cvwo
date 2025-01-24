import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Box } from '@mui/material';
import './App.css'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Threads from './pages/ThreadsNew';

// Components

// Dependencies
import { ToastContainer } from 'react-toastify';
import SideMenu from './components/SideMenu/SideMenu';

function App() {
  console.log('Server hosted at: ' + import.meta.env.VITE_SERVER_URL);

  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
        <Box sx={{ display: 'flex', flex: 1, flexGrow: 1, height: "100vh", alignItems: "center", justifyContent: "center" }}>
          <SideMenu/>

          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/thread' element={<Threads/>} />
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  )
}

export default App
