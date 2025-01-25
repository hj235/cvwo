// Dependencies
import { BrowserRouter } from 'react-router-dom';
import WebForumRoutes from './WebforumRoutes';
import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';
import './App.css'

// Components
import SideMenu from './components/SideMenu/SideMenu';

function App() {
  console.log('Server hosted at: ' + import.meta.env.VITE_SERVER_URL);

  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
        <Box sx={{ display: 'flex', flex: 1, flexGrow: 1, height: "100vh", alignItems: "center", justifyContent: "center" }}>
          <SideMenu/>
          <WebForumRoutes />
        </Box>
      </BrowserRouter>
    </>
  )
}

export default App
