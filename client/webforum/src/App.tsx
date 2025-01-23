import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login';

// Components

// Dependencies
import { ToastContainer } from 'react-toastify';

function App() {
  console.log('Server hosted at: ' + import.meta.env.VITE_SERVER_URL);

  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
