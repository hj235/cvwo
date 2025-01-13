// dependencies
import './App.css'
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

// pages
import Login from './pages/Login';

// axios stuff to make life easier
console.log('Server hosted at: ' + import.meta.env.VITE_SERVER_URL);
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL; // simplifies having to type out the server url multiple times
axios.defaults.withCredentials = true;

function MyButton({ title }: { title: string }) {
  return (
    <button>{title}</button>
  );
}

function App() {

  return (
    <>
      <h1>App.tsx</h1>
      <MyButton title="I'm a button" />
      <Routes>
        <Route path='/login' element={<Login/>} />
      </Routes>
    </>
  )
}

export default App
